/*
Authors: !Davin012613 and Eroll5
Description: An Addon for RatingSystem that allows Users to send their messages to sysop members.

It listens to mw.hook('RatingSystem.voted'), which RatingSystem fires after each saved vote, and saves
the reasons in the same ledger. It also uses the maxRetries option of window.RatingSystemConfig.

    window.RatedReasonsConfig = {
        notify: true,              // false: only save the reason, do not send it to anyone
        selectRecipients: false,   // true: the voter chooses who receives the reason (loads AdminSelect);
                                   // false: it is sent to everyone in the groups below
        group: 'sysop',            // user group(s) that receive the reason: 'sysop' or ['sysop', 'bureaucrat']
        exempt: []                 // extra user names that never receive it, e.g. ['Some bot']
    };

*/
mw.loader.using([
    'mediawiki.api',
    'mediawiki.util'
]).then(function () {
    'use strict';

    if (window.RatedReasonsLoaded) {
        return;
    }
    window.RatedReasonsLoaded = true;

    const reasonsConfig = $.extend({
        notify: true,
        selectRecipients: false,
        group: 'sysop',
        exempt: []
    }, window.RatedReasonsConfig);

    function normalizeName(name) {
        return String(name).replace(/_/g, ' ').trim().toLowerCase();
    }

    const exemptNames = [].concat(reasonsConfig.exempt || []).map(normalizeName).filter(Boolean);

    const targetGroups = (function () {
        const raw = Array.isArray(reasonsConfig.group)
            ? reasonsConfig.group
            : [reasonsConfig.group || 'sysop'];

        const groups = raw
            .map(function (group) {
                return String(group).trim();
            })
            .filter(function (group, index, list) {
                return group && list.indexOf(group) === index;
            });

        return groups.length ? groups : ['sysop'];
    }());

    const maxRetries = $.extend({ maxRetries: 3 }, window.RatingSystemConfig).maxRetries;

    function usesSelector() {
        return Boolean(reasonsConfig.notify && reasonsConfig.selectRecipients) &&
            typeof window.RatedReasonsRecipientSelector === 'function';
    }

    if (reasonsConfig.notify && reasonsConfig.selectRecipients && typeof importArticles === 'function') {
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:RatedReasons/AdminSelect.js'
            ]
        });
    }

    const RETRYABLE_CODES = ['editconflict', 'pagedeleted', 'articleexists'];
    const BATCH_SIZE = 5;

    const api = new mw.Api();

    const currentUser = mw.config.get('wgUserName');
    const pageName = mw.config.get('wgPageName');

    let queue = Promise.resolve();

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function unescapeHtml(text) {
        return String(text)
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, '&');
    }

    function wikiHref(title) {
        const base = mw.config.get('wgServer');
        const path = mw.config.get('wgArticlePath') || '/wiki/$1';

        return base + path.replace(
            '$1',
            function () {
                return mw.util.wikiUrlencode(title);
            }
        );
    }

    function request(promise) {
        return new Promise(function (resolve, reject) {
            promise.then(resolve, function (code, result) {
                reject({ code: code, result: result });
            });
        });
    }

    function wait(milliseconds) {
        return new Promise(function (resolve) {
            setTimeout(resolve, milliseconds);
        });
    }

    // Same normalisation as RatingSystem
    function normalizeUser(name) {
        return name.replace(/%2C/gi, ',').trim().replace(/_/g, ' ');
    }

    function getLedger(title) {
        return request(api.get({
            action: 'query',
            prop: 'revisions',
            titles: title,
            rvprop: 'content|timestamp',
            rvslots: 'main',
            curtimestamp: true,
            formatversion: 2,
            cb: Date.now()
        })).then(function (data) {
            const page = data.query && data.query.pages && data.query.pages[0];

            if (page && page.missing) {
                return { content: '', timestamp: null, startTimestamp: data.curtimestamp };
            }

            const revision = page && page.revisions && page.revisions[0];
            const slot = revision && revision.slots && revision.slots.main;

            if (!slot || typeof slot.content !== 'string' || !data.curtimestamp) {
                return Promise.reject({ code: 'invalid-response' });
            }

            return {
                content: slot.content,
                timestamp: revision.timestamp,
                startTimestamp: data.curtimestamp
            };
        });
    }

    function askReason(vote) {
        const action = vote === 1 ? 'upvot' : 'downvot';
        const pageDisplay = pageName.replace(/_/g, ' ');

        let question = 'Why are you ' + action + 'ing "' + pageDisplay + '"?';

        if (reasonsConfig.notify) {
            question += usesSelector()
                ? '\n\nYou will be able to choose which administrator(s) receive your reason.'
                : '\n\nYour reason will be sent to: ' + targetGroups.join(', ') + '.';
        }

        const reason = window.prompt(question, '');

        if (reason === null) {
            return null;
        }

        const cleaned = reason.trim();

        if (!cleaned) {
            mw.notify(
                'A reason is required for the rating.',
                { type: 'warn' }
            );

            return askReason(vote);
        }

        return cleaned;
    }

    function encodeReason(reason) {
        return String(reason)
            .replace(/\r?\n/g, ' ')
            .replace(/[|~{}]/g, function (character) {
                return '&#' + character.charCodeAt(0) + ';';
            });
    }

    function updateReasonInLedger(title, reason, attempt) {
        return getLedger(title).then(function (ledger) {
            const lines = ledger.content === '' ? [] : ledger.content.split('\n');

            const newReasonLine =
                'RatingReason | ' +
                pageName +
                ' | ' +
                currentUser +
                ' | ' +
                encodeReason(reason);

            let replaced = false;

            const updatedLines = lines.map(function (line) {
                const cleanLine = line.trim();

                if (cleanLine.indexOf('RatingReason |') !== 0) {
                    return line;
                }

                const parts = cleanLine.split('|');

                if (parts.length < 4) {
                    return line;
                }

                const samePage = parts[1].trim().replace(/ /g, '_') === pageName;
                const sameUser = normalizeUser(parts[2]) === normalizeUser(currentUser);

                if (!samePage || !sameUser) {
                    return line;
                }

                if (!replaced) {
                    replaced = true;
                    return newReasonLine;
                }

                return null;
            }).filter(function (line) {
                return line !== null;
            });

            if (!replaced) {
                updatedLines.push(newReasonLine);
            }

            const params = {
                action: 'edit',
                title: title,
                summary:
                    'Added rating reason for [[' +
                    pageName +
                    ']]',
                text: updatedLines.join('\n'),
                minor: true,
                watchlist: 'nochange',
                assert: 'user',
                starttimestamp: ledger.startTimestamp
            };

            if (ledger.timestamp) {
                params.basetimestamp = ledger.timestamp;
            } else {
                params.createonly = true;
            }

            return request(api.postWithToken('csrf', params));
        }).then(null, function (error) {
            if (RETRYABLE_CODES.indexOf(error.code) !== -1 && attempt < maxRetries) {
                return wait(150 + Math.random() * 350).then(function () {
                    return updateReasonInLedger(title, reason, attempt + 1);
                });
            }

            return Promise.reject(error);
        });
    }

    function jsonModelFromHtml(html) {
        const paragraphs = String(html).split(/\n{2,}/);

        const model = {
            type: 'doc',
            content: []
        };

        paragraphs.forEach(function (paragraph) {
            const parts = [];
            const regex = /<a\s+href="([^"]+)">([^<]+)<\/a>/gi;

            let match;
            let last = 0;

            while ((match = regex.exec(paragraph)) !== null) {
                if (match.index > last) {
                    parts.push({
                        type: 'text',
                        text: unescapeHtml(paragraph.slice(last, match.index))
                    });
                }

                parts.push({
                    type: 'text',
                    text: unescapeHtml(match[2]),
                    marks: [{
                        type: 'link',
                        attrs: {
                            href: match[1]
                        }
                    }]
                });

                last = regex.lastIndex;
            }

            if (last < paragraph.length) {
                parts.push({
                    type: 'text',
                    text: unescapeHtml(paragraph.slice(last))
                });
            }

            model.content.push({
                type: 'paragraph',
                content: parts.length ? parts : [{
                    type: 'text',
                    text: ''
                }]
            });
        });

        return JSON.stringify(model);
    }

    function getGroupMembers(group) {
        const users = [];

        function fetchUsers(queryParams) {
            return request(api.get(queryParams)).then(function (data) {
                const batch =
                    data.query && data.query.allusers
                        ? data.query.allusers
                        : [];

                batch.forEach(function (user) {
                    if (user.userid && user.name) {
                        users.push(user);
                    }
                });

                if (data.continue) {
                    return fetchUsers(
                        Object.assign({}, queryParams, data.continue)
                    );
                }

                return users;
            });
        }

        return fetchUsers({
            action: 'query',
            list: 'allusers',
            augroup: group,
            aulimit: 'max',
            auprop: 'groups'
        }).then(null, function (error) {
            console.warn('RatingsNotifications: could not list the members of "' + group + '"', error);
            return [];
        });
    }

    let abuseFilterName = null;

    function getAbuseFilterName() {
        if (!abuseFilterName) {
            abuseFilterName = request(api.get({
                action: 'query',
                meta: 'allmessages',
                ammessages: 'abusefilter-blocker',
                amlang: mw.config.get('wgContentLanguage'),
                formatversion: 2
            })).then(function (data) {
                const message = data.query && data.query.allmessages && data.query.allmessages[0];

                return message && typeof message.content === 'string' ? normalizeName(message.content) : '';
            }, function (error) {
                console.warn('RatingsNotifications: could not read the name of the Abuse filter account', error);
                return '';
            });
        }

        return abuseFilterName;
    }

    // Users who must not receive the message
    function isExempt(username, groups, filterName) {
        const norm = normalizeName(username);

        if (norm === 'abuse filter' || (filterName && norm === filterName)) {
            return true;
        }

        if (norm === normalizeName(currentUser)) {
            return true;
        }

        if (exemptNames.indexOf(norm) !== -1) {
            return true;
        }

        return Array.isArray(groups) && groups.indexOf('bot') !== -1;
    }

    function getRecipients() {
        return Promise.all([
            Promise.all(targetGroups.map(getGroupMembers)),
            getAbuseFilterName()
        ]).then(function (loaded) {
            const results = loaded[0];
            const filterName = loaded[1];
            const byName = Object.create(null);

            results.forEach(function (list) {
                list.forEach(function (user) {
                    byName[user.name] = user;
                });
            });

            const recipients = Object.keys(byName)
                .map(function (name) {
                    return byName[name];
                })
                .filter(function (user) {
                    return !isExempt(user.name, user.groups, filterName);
                });

            if (recipients.length && usesSelector()) {
                return Promise.resolve(window.RatedReasonsRecipientSelector(recipients)).then(function (selected) {
                    if (!Array.isArray(selected)) {
                        return null;
                    }

                    const allowed = Object.create(null);
                    recipients.forEach(function (user) {
                        allowed[user.name] = user;
                    });

                    return selected.map(function (name) {
                        return allowed[String(name)] || null;
                    }).filter(Boolean);
                });
            }

            return recipients;
        });
    }

    function postToWall(user, title, bodyHtml) {
        return Promise.resolve($.ajax({
            type: 'POST',
            url:
                mw.util.wikiScript('wikia') +
                '?controller=Fandom%5CMessageWall%5CMessageWall&method=createThread&format=json',
            data: {
                token: mw.user.tokens.get('csrfToken'),
                wallOwnerId: user.userid,
                title: title,
                rawContent: bodyHtml,
                jsonModel: jsonModelFromHtml(bodyHtml),
                attachments:
                    '{"contentImages":[],"openGraphs":[],"atMentions":[]}'
            },
            xhrFields: {
                withCredentials: true
            }
        }));
    }

    function postInBatches(users, title, bodyHtml) {
        let sent = 0;
        let chain = Promise.resolve();

        for (let i = 0; i < users.length; i += BATCH_SIZE) {
            const batch = users.slice(i, i + BATCH_SIZE);

            chain = chain.then(function () {
                return Promise.all(
                    batch.map(function (user) {
                        return postToWall(user, title, bodyHtml).then(
                            function () {
                                sent++;
                            },
                            function () {}
                        );
                    })
                );
            });
        }

        return chain.then(function () {
            return sent;
        });
    }

    function sendNotification(vote, reason) {
        const pageDisplay = pageName.replace(/_/g, ' ');

        const pageUrl = wikiHref(pageName);
        const userUrl = wikiHref('User:' + currentUser);

        const voteText = vote === 1 ? 'upvoted' : 'downvoted';

        const title = 'Rating received: ' + pageDisplay;

        const bodyHtml =
            '<a href="' +
            userUrl +
            '">' +
            escapeHtml(currentUser) +
            '</a> ' +
            voteText +
            ' <a href="' +
            pageUrl +
            '">' +
            escapeHtml(pageDisplay) +
            '</a>.' +
            '\n\n' +
            'Reason:\n' +
            escapeHtml(reason);

        return getRecipients().then(function (recipients) {
            if (recipients === null) {
                mw.notify('Rating reason saved. Notification skipped.', { type: 'success' });
                return;
            }

            if (!recipients.length) {
                mw.notify(
                    'The rating was saved, but there is nobody to notify in the group(s): ' +
                    targetGroups.join(', ') + '.',
                    { type: 'warn' }
                );

                return;
            }

            return postInBatches(recipients, title, bodyHtml).then(function (sent) {
                if (sent === 0) {
                    mw.notify(
                        'The rating was saved, but no notifications could be sent.',
                        { type: 'error' }
                    );
                } else if (sent === recipients.length) {
                    mw.notify(
                        'Rating reason sent to ' + sent + ' user(s).',
                        { type: 'success' }
                    );
                } else {
                    mw.notify(
                        'Rating reason sent to ' + sent + ' of ' + recipients.length + ' users.',
                        { type: 'warn' }
                    );
                }
            });
        });
    }

    function dispatchReasonSaved() {
        window.dispatchEvent(new CustomEvent('RatedReasonsSaved', {
            detail: {
                page: pageName,
                user: currentUser
            }
        }));
    }

    // { vote, ledgerTitle, ... } from the RatingSystem.voted hook
    function handleVote(data) {
        if (!data || !data.vote) {
            return Promise.resolve();
        }

        return wait(100).then(function () {
            const reason = askReason(data.vote);

            if (reason === null) {
                return;
            }

            return updateReasonInLedger(data.ledgerTitle, reason, 0).then(function () {
                dispatchReasonSaved();

                if (!reasonsConfig.notify) {
                    mw.notify('Rating reason saved.', { type: 'success' });
                    return;
                }

                return sendNotification(data.vote, reason);
            });
        });
    }

    mw.hook('RatingSystem.voted').add(function (data) {
        queue = queue.then(function () {
            return handleVote(data);
        }).then(null, function (error) {
            console.error('RatingsNotifications:', error);

            mw.notify(
                'The vote was saved, but the rating reason could not be processed.',
                { type: 'error' }
            );
        });
    });
});