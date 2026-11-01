/*
Author: !Davin012613
Description: An Addon for RatingSystem that allows Users to send their messages to sysop members.
*/

mw.loader.using([
    'mediawiki.api',
    'mediawiki.util'
]).then(function () {
    'use strict';

    const ledgerTitle = 'Project:Ratings';
    const api = new mw.Api();

    const currentUser = mw.config.get('wgUserName');
    const pageName = mw.config.get('wgPageName');

    if (!currentUser) {
        return;
    }

    if (![0, 2].includes(mw.config.get('wgNamespaceNumber'))) {
        return;
    }

    let observingVote = false;
    let lastObservedClick = 0;

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
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

    function parseLedger(content) {
        const ratings = {};

        String(content || '')
            .split('\n')
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

                if (parts.length < 3) {
                    return;
                }

                const pName = parts[0].trim();
                const secondColumn = parts[1].trim();

                if (!ratings[pName]) {
                    ratings[pName] = {};
                }

                if (secondColumn.includes(':')) {
                    secondColumn.split(',').forEach(function (entry) {
                        const separator = entry.lastIndexOf(':');

                        if (separator === -1) {
                            return;
                        }

                        const username = entry.substring(0, separator).trim();
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
                    const username = secondColumn;
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

    function getLedger() {
        return api.get({
            action: 'query',
            prop: 'revisions',
            titles: ledgerTitle,
            rvprop: 'content|timestamp',
            formatversion: 2,
            cb: Date.now()
        }).then(function (data) {
            let content = '';
            let timestamp = '';

            try {
                const pages = data.query && data.query.pages;

                if (pages) {
                    const keys = Object.keys(pages);
                    const page = pages[keys[0]];

                    if (
                        page &&
                        page.revisions &&
                        page.revisions[0]
                    ) {
                        content = page.revisions[0].content || '';
                        timestamp = page.revisions[0].timestamp || '';
                    }
                }
            } catch (e) {
                content = '';
                timestamp = '';
            }

            return {
                content: content,
                timestamp: timestamp,
                ratings: parseLedger(content)
            };
        });
    }

    function getCurrentVote() {
        return getLedger().then(function (ledger) {
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
            .replace(/\|/g, '&#124;')
            .replace(/\r?\n/g, ' ');
    }

    function decodeReason(reason) {
        return String(reason)
            .replace(/&#124;/g, '|');
    }

    function getReasonLines(content) {
        return String(content || '')
            .split('\n')
            .filter(function (line) {
                return line.trim().indexOf('RatingReason |') === 0;
            });
    }

    function updateReasonInLedger(reason) {
        return getLedger().then(function (ledger) {
            const lines = String(ledger.content || '').split('\n');

            const newReasonLine =
                'RatingReason | ' +
                pageName +
                ' | ' +
                currentUser +
                ' | ' +
                encodeReason(reason);

            lines.push(newReasonLine);

            const newText = lines.join('\n');

            return api.postWithToken('csrf', {
                action: 'edit',
                title: ledgerTitle,
                summary:
                    'Added rating reason for [[' +
                    pageName +
                    ']]',
                text: newText,
                minor: true,
                basetimestamp: ledger.timestamp,
                starttimestamp: new Date().toISOString()
            });
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
                        text: paragraph.slice(last, match.index)
                    });
                }

                parts.push({
                    type: 'text',
                    text: match[2],
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
                    text: paragraph.slice(last)
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
            return api.get(queryParams).then(function (data) {
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
        return $.ajax({
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
        });
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

    function waitForSuccessfulVote(targetVote, previousVote) {
        let attempts = 0;

        function check() {
            attempts++;

            return getCurrentVote().then(function (currentVote) {
                if (
                    currentVote === targetVote &&
                    currentVote !== previousVote
                ) {
                    return true;
                }

                if (attempts >= 20) {
                    return false;
                }

                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(check());
                    }, 750);
                });
            });
        }

        return check();
    }

    function observeVote(targetVote) {
        if (observingVote) {
            return;
        }

        observingVote = true;

        getCurrentVote()
            .then(function (previousVote) {
                return waitForSuccessfulVote(
                    targetVote,
                    previousVote
                ).then(function (successful) {
                    if (!successful) {
                        return;
                    }

                    const reason = askReason(targetVote);

                    if (reason === null) {
                        return;
                    }

                    return updateReasonInLedger(reason)
                        .then(function () {
                            dispatchReasonSaved();

                            return sendNotification({
                                pageName: pageName,
                                vote: targetVote,
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
                observingVote = false;
            });
    }

    document.addEventListener(
        'click',
        function (event) {
            const upButton =
                event.target.closest &&
                event.target.closest('.ejt-up-btn');

            const downButton =
                event.target.closest &&
                event.target.closest('.ejt-down-btn');

            if (!upButton && !downButton) {
                return;
            }

            const now = Date.now();

            if (now - lastObservedClick < 500) {
                return;
            }

            lastObservedClick = now;

            const targetVote = upButton ? 1 : -1;

            setTimeout(function () {
                observeVote(targetVote);
            }, 100);
        },
        false
    );
});