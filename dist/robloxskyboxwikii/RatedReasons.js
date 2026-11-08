mw.loader.using([
    'mediawiki.api',
    'mediawiki.util'
]).then(function () {
    'use strict';

    if (window.RatedReasonsLoaded) {
        return;
    }
    window.RatedReasonsLoaded = true;

    const config = $.extend({
        ledgerTitle: 'Project:Ratings',
        shard: false,
        namespaces: [0, 2],
        minWidth: 768,
        maxRetries: 3
    }, window.RatingSystemConfig);

    const RETRYABLE_CODES = ['editconflict', 'pagedeleted', 'articleexists'];
    const POLL_INTERVAL = 750;
    const POLL_ATTEMPTS = 20;

    const api = new mw.Api();

    const currentUser = mw.config.get('wgUserName');
    const pageName = mw.config.get('wgPageName');

    if (!currentUser || !isSupportedPage()) {
        return;
    }

    let observingVote = false;
    let lastObservedClick = 0;
    let knownVote = null;

    function isSupportedPage() {
        return mw.config.get('wgAction') === 'view' &&
            mw.config.get('wgArticleId') > 0 &&
            !mw.config.get('wgIsRedirect') &&
            [].concat(config.namespaces).indexOf(mw.config.get('wgNamespaceNumber')) !== -1 &&
            !document.body.classList.contains('is-mobile') &&
            window.innerWidth >= config.minWidth;
    }

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

    // Must stay identical to RatingSystem's ledgerTitleFor
    function ledgerTitleFor(page) {
        if (!config.shard) {
            return config.ledgerTitle;
        }

        const first = page.charAt(0).toUpperCase();
        let bucket = 'Other';

        if (/[A-Z]/.test(first)) {
            bucket = first;
        } else if (/[0-9]/.test(first)) {
            bucket = '0-9';
        }

        return config.ledgerTitle + '/' + bucket;
    }

    function normalizeUser(name) {
        return name.replace(/%2C/gi, ',').trim().replace(/_/g, ' ');
    }

    function parseLedger(content) {
        const ratings = Object.create(null);

        String(content || '')
            .split(/\r?\n/)
            .forEach(function (line) {
                const cleanLine = line
                    .replace('<p>', '')
                    .replace('</p>', '')
                    .trim();

                if (
                    !cleanLine ||
                    !cleanLine.includes('|') ||
                    cleanLine.indexOf('RatingReason |') === 0
                ) {
                    return;
                }

                const parts = cleanLine.split('|');

                if (parts.length !== 3) {
                    return;
                }

                const pName = parts[0].trim().replace(/ /g, '_');
                const secondColumn = parts[1].trim();

                if (!ratings[pName]) {
                    ratings[pName] = Object.create(null);
                }

                if (secondColumn.includes(':')) {
                    secondColumn.split(',').forEach(function (entry) {
                        const separator = entry.lastIndexOf(':');

                        if (separator === -1) {
                            return;
                        }

                        const username = normalizeUser(entry.substring(0, separator));

                        const vote = parseInt(
                            entry.substring(separator + 1).trim(),
                            10
                        );

                        if (
                            username &&
                            (vote === 1 || vote === -1)
                        ) {
                            ratings[pName][username] = vote;
                        }
                    });
                } else {
                    const username = normalizeUser(secondColumn);
                    const vote = parseInt(parts[2].trim(), 10);

                    if (
                        username &&
                        (vote === 1 || vote === -1)
                    ) {
                        ratings[pName][username] = vote;
                    }
                }
            });

        return ratings;
    }

    // A failed or malformed read rejects
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
                return {
                    content: '',
                    timestamp: null,
                    startTimestamp: data.curtimestamp,
                    ratings: parseLedger('')
                };
            }

            const revision = page && page.revisions && page.revisions[0];
            const slot = revision && revision.slots && revision.slots.main;

            if (!slot || typeof slot.content !== 'string' || !data.curtimestamp) {
                return Promise.reject({ code: 'invalid-response' });
            }

            return {
                content: slot.content,
                timestamp: revision.timestamp,
                startTimestamp: data.curtimestamp,
                ratings: parseLedger(slot.content)
            };
        });
    }

    function getCurrentVote() {
        return getLedger(ledgerTitleFor(pageName)).then(function (ledger) {
            return (
                ledger.ratings[pageName] &&
                ledger.ratings[pageName][currentUser]
            ) || 0;
        });
    }

    function askReason(vote) {
        const action = vote === 1 ? 'upvot' : 'downvot';
        const pageDisplay = pageName.replace(/_/g, ' ');

        const reason = window.prompt(
            'Why are you ' +
            action +
            'ing "' +
            pageDisplay +
            '"?',
            ''
        );

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

    function decodeReason(reason) {
        return String(reason)
            .replace(/&#(124|126|123|125);/g, function (match, code) {
                return String.fromCharCode(Number(code));
            });
    }

    function getReasonLines(content) {
        return String(content || '')
            .split('\n')
            .filter(function (line) {
                return line.trim().indexOf('RatingReason |') === 0;
            });
    }

    function updateReasonInLedger(reason, attempt) {
        const title = ledgerTitleFor(pageName);

        return getLedger(title).then(function (ledger) {
            const lines = ledger.content === '' ? [] : ledger.content.split('\n');

            const newReasonLine =
                'RatingReason | ' +
                pageName +
                ' | ' +
                currentUser +
                ' | ' +
                encodeReason(reason);

            lines.push(newReasonLine);

            const params = {
                action: 'edit',
                title: title,
                summary:
                    'Added rating reason for [[' +
                    pageName +
                    ']]',
                text: lines.join('\n'),
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
            if (RETRYABLE_CODES.indexOf(error.code) !== -1 && attempt < config.maxRetries) {
                return wait(150 + Math.random() * 350).then(function () {
                    return updateReasonInLedger(reason, attempt + 1);
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

    function getSysopUsers() {
        const users = [];

        const params = {
            action: 'query',
            list: 'allusers',
            augroup: 'sysop',
            aulimit: 'max'
        };

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

        return fetchUsers(params);
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

    function sendNotification(notification) {
        const pageDisplay =
            notification.pageName.replace(/_/g, ' ');

        const pageUrl = wikiHref(notification.pageName);
        const userUrl = wikiHref('User:' + currentUser);

        const voteText =
            notification.vote === 1 ? 'upvoted' : 'downvoted';

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
            escapeHtml(notification.reason);

        return getSysopUsers().then(function (sysops) {
            if (!sysops.length) {
                return 0;
            }

            return Promise.all(
                sysops.map(function (user) {
                    return postToWall(
                        user,
                        title,
                        bodyHtml
                    ).then(
                        function () {
                            return true;
                        },
                        function () {
                            return false;
                        }
                    );
                })
            ).then(function (results) {
                return results.filter(Boolean).length;
            });
        }).then(function (sent) {
            if (sent > 0) {
                mw.notify(
                    'Rating reason sent to ' + sent + ' sysop(s).',
                    { type: 'success' }
                );
            } else {
                mw.notify(
                    'The rating was saved, but no sysop notifications could be sent.',
                    { type: 'error' }
                );
            }
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

    function waitForVoteChange(previousVote) {
        let attempts = 0;

        function retry() {
            if (attempts >= POLL_ATTEMPTS) {
                return null;
            }

            return wait(POLL_INTERVAL).then(check);
        }

        function check() {
            attempts++;

            return getCurrentVote().then(function (currentVote) {
                return currentVote !== previousVote ? currentVote : retry();
            }, retry);
        }

        return check();
    }

    const knownVoteReady = getCurrentVote().then(function (vote) {
        knownVote = vote;
    }, function (error) {
        console.warn('RatingsNotifications: could not read the current vote', error);
    });

    function observeVote() {
        if (observingVote) {
            return;
        }

        observingVote = true;

        knownVoteReady
            .then(function () {
                return knownVote !== null ? knownVote : getCurrentVote();
            })
            .then(function (previousVote) {
                return waitForVoteChange(previousVote).then(function (currentVote) {
                    if (currentVote === null) {
                        return;
                    }

                    knownVote = currentVote;

                    if (currentVote === 0) {
                        return;
                    }

                    const reason = askReason(currentVote);

                    if (reason === null) {
                        return;
                    }

                    return updateReasonInLedger(reason, 0)
                        .then(function () {
                            dispatchReasonSaved();

                            return sendNotification({
                                pageName: pageName,
                                vote: currentVote,
                                reason: reason
                            });
                        });
                });
            })
            .catch(function (error) {
                console.error('RatingsNotifications:', error);

                mw.notify(
                    'The vote was saved, but the rating reason could not be processed.',
                    { type: 'error' }
                );
            })
            .finally(function () {
                return getCurrentVote().then(function (vote) {
                    knownVote = vote;
                }, function () {}).then(function () {
                    observingVote = false;
                });
            });
    }

    document.addEventListener(
        'click',
        function (event) {
            const button =
                event.target.closest &&
                event.target.closest('.ejt-up-btn, .ejt-down-btn');

            if (!button || button.getAttribute('aria-disabled') === 'true') {
                return;
            }

            const now = Date.now();

            if (now - lastObservedClick < 500) {
                return;
            }

            lastObservedClick = now;

            observeVote();
        },
        true
    );
});