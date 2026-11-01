
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
    'use strict';

    if (window.ejtRatingVoterMenuLoaded) {
        return;
    }

    window.ejtRatingVoterMenuLoaded = true;

    var config = window.RatingSystemConfig || {};
    var baseLedgerTitle = config.ledgerTitle || 'Project:Ratings';
    var useShards = config.shard === true;
    var allowedNamespaces = config.namespaces || [0];
    var minWidth = config.minWidth || 768;
    var pageName = mw.config.get('wgPageName');
    var namespaceNumber = mw.config.get('wgNamespaceNumber');
    var api = new mw.Api();

    if (
        allowedNamespaces.indexOf(namespaceNumber) === -1 ||
        document.documentElement.clientWidth < minWidth ||
        document.body.classList.contains('is-mobile')
    ) {
        window.ejtRatingVoterMenuLoaded = false;
        return;
    }

    function normalizePage(name) {
        return String(name || '')
            .replace(/^\s+|\s+$/g, '')
            .replace(/ /g, '_')
            .replace(/_/g, '_')
            .toLowerCase();
    }

    function normalizeUser(name) {
        return String(name || '')
            .replace(/%2C/gi, ',')
            .replace(/^\s+|\s+$/g, '')
            .replace(/_/g, ' ');
    }

    function normalizeVote(value) {
        value = String(value || '').trim();

        if (value === '1') {
            return 1;
        }

        if (value === '-1') {
            return -1;
        }

        return 0;
    }

    function getShardTitle(page) {
        var first = String(page || '')
            .replace(/ /g, '_')
            .charAt(0)
            .toUpperCase();

        var bucket = /^[A-Z0-9]$/.test(first) ? first : 'Other';

        return baseLedgerTitle + '/' + bucket;
    }

    function decodeReason(reason) {
        reason = String(reason || '')
            .replace(/&#124;|&#x7c;/gi, '|')
            .replace(/&amp;/g, '&')
            .replace(/&#10;|&#xA;/gi, '\n')
            .replace(/&#13;|&#xD;/gi, '\r');

        try {
            reason = decodeURIComponent(reason);
        } catch (e) {
            // Keep the original text if it is not URI-encoded.
        }

        return reason;
    }

    function getRevisionContent(page) {
        if (!page || !page.revisions || !page.revisions.length) {
            return '';
        }

        var revision = page.revisions[0];

        if (revision.slots && revision.slots.main) {
            if (typeof revision.slots.main.content === 'string') {
                return revision.slots.main.content;
            }

            if (typeof revision.slots.main['*'] === 'string') {
                return revision.slots.main['*'];
            }
        }

        if (typeof revision.content === 'string') {
            return revision.content;
        }

        if (typeof revision['*'] === 'string') {
            return revision['*'];
        }

        return '';
    }

    function parseLedger(content, data) {
        String(content || '').split(/\r?\n/).forEach(function (line) {
            if (!line.trim()) {
                return;
            }

            var parts = line.split('|');
            var firstColumn = (parts[0] || '').trim();

            if (firstColumn === 'RatingReason' && parts.length >= 4) {
                var reasonPage = normalizePage(parts[1]);
                var reasonUser = normalizeUser(parts[2]);
                var reasonText = decodeReason(parts.slice(3).join('|'));

                if (!data.reasons[reasonPage]) {
                    data.reasons[reasonPage] = {};
                }

                if (!data.reasons[reasonPage][reasonUser]) {
                    data.reasons[reasonPage][reasonUser] = [];
                }

                if (reasonText) {
                    data.reasons[reasonPage][reasonUser].push(reasonText);
                }

                return;
            }

            if (parts.length < 3) {
                return;
            }

            var entryPage = normalizePage(parts[0]);
            var voterText = (parts[1] || '').trim();

            if (!entryPage || !voterText) {
                return;
            }

            if (!data.votes[entryPage]) {
                data.votes[entryPage] = {};
            }

            var voteMap = data.votes[entryPage];

            if (voterText.indexOf(':') !== -1) {
                voterText.split(',').forEach(function (token) {
                    token = token.trim();

                    var separator = token.lastIndexOf(':');

                    if (separator < 1) {
                        return;
                    }

                    var voter = normalizeUser(token.substring(0, separator));
                    var vote = normalizeVote(token.substring(separator + 1));

                    if (voter && vote) {
                        voteMap[voter] = vote;
                    }
                });
            } else {
                var legacyUser = normalizeUser(voterText);
                var legacyVote = normalizeVote(parts[2]);

                if (legacyUser && legacyVote) {
                    voteMap[legacyUser] = legacyVote;
                }
            }
        });
    }

    var cachedData = null;
    var cacheTime = 0;
    var cacheDuration = 15000;
    var loadingPromise = null;

    function loadLedgerData() {
        var now = Date.now();

        if (cachedData && now - cacheTime < cacheDuration) {
            return Promise.resolve(cachedData);
        }

        if (loadingPromise) {
            return loadingPromise;
        }

        var voteLedgerTitle = useShards
            ? getShardTitle(pageName)
            : baseLedgerTitle;

        var titles = [voteLedgerTitle];

        if (useShards && voteLedgerTitle !== baseLedgerTitle) {
            titles.push(baseLedgerTitle);
        }

        loadingPromise = api.get({
            action: 'query',
            prop: 'revisions',
            titles: titles.join('|'),
            rvprop: 'content',
            rvslots: 'main',
            formatversion: 2
        }).then(function (response) {
            var data = {
                votes: {},
                reasons: {},
                error: false
            };

            var pages = response.query && response.query.pages
                ? response.query.pages
                : [];

            pages.forEach(function (page) {
                var content = getRevisionContent(page);

                if (content) {
                    parseLedger(content, data);
                }
            });

            cachedData = data;
            cacheTime = Date.now();
            loadingPromise = null;

            return data;
        }).catch(function (error) {
            loadingPromise = null;

            if (window.console && console.error) {
                console.error('[Rating Voter Menu] Ledger request failed:', error);
            }

            return {
                votes: {},
                reasons: {},
                error: true
            };
        });

        return loadingPromise;
    }

    var style = document.createElement('style');
    style.id = 'ejt-rating-voter-menu-style';
    style.textContent =
        '.ejt-voter-menu{' +
            'position:fixed;z-index:999999;display:none;box-sizing:border-box;' +
            'width:300px;max-width:calc(100vw - 20px);max-height:350px;' +
            'overflow-y:auto;padding:12px;background:#fff;color:#222;' +
            'border:1px solid #aaa;border-radius:8px;' +
            'box-shadow:0 4px 14px rgba(0,0,0,.22);font:14px/1.45 sans-serif;' +
        '}' +
        '.ejt-voter-menu-title{font-weight:bold;font-size:15px;margin-bottom:8px;}' +
        '.ejt-voter-menu-user{padding:7px 0;border-top:1px solid #e5e5e5;overflow-wrap:anywhere;}' +
        '.ejt-voter-menu-reason{margin-top:3px;padding-left:8px;color:#555;white-space:pre-wrap;overflow-wrap:anywhere;}' +
        '.ejt-voter-menu-empty{color:#666;}';

    if (!document.getElementById(style.id)) {
        document.head.appendChild(style);
    }

    var menu = document.createElement('div');
    menu.className = 'ejt-voter-menu';
    menu.setAttribute('role', 'tooltip');
    menu.setAttribute('aria-live', 'polite');
    document.body.appendChild(menu);

    var hideTimer = null;
    var activeButton = null;
    var activeRequest = 0;

    function cancelHide() {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
    }

    function scheduleHide() {
        cancelHide();

        hideTimer = setTimeout(function () {
            menu.style.display = 'none';
            activeButton = null;
        }, 250);
    }

    function positionMenu(button) {
        var rect = button.getBoundingClientRect();
        var menuWidth = menu.offsetWidth;
        var menuHeight = menu.offsetHeight;
        var left = rect.left;
        var top = rect.bottom + 6;
        var margin = 10;

        if (left + menuWidth > window.innerWidth - margin) {
            left = window.innerWidth - menuWidth - margin;
        }

        if (left < margin) {
            left = margin;
        }

        if (top + menuHeight > window.innerHeight - margin) {
            top = rect.top - menuHeight - 6;
        }

        if (top < margin) {
            top = margin;
        }

        menu.style.left = left + 'px';
        menu.style.top = top + 'px';
    }

    function clearMenu() {
        while (menu.firstChild) {
            menu.removeChild(menu.firstChild);
        }
    }

    function addTextElement(parent, className, text) {
        var element = document.createElement('div');
        element.className = className;
        element.textContent = text;
        parent.appendChild(element);
        return element;
    }

    function renderMenu(button, vote, data, requestId) {
        if (requestId !== activeRequest || activeButton !== button) {
            return;
        }

        clearMenu();

        addTextElement(
            menu,
            'ejt-voter-menu-title',
            vote === 1 ? 'Upvoted by' : 'Downvoted by'
        );

        if (data.error) {
            addTextElement(
                menu,
                'ejt-voter-menu-empty',
                'Could not load the rating ledger.'
            );
            menu.style.display = 'block';
            positionMenu(button);
            return;
        }

        var pageKey = normalizePage(pageName);
        var votes = data.votes[pageKey] || {};
        var reasons = data.reasons[pageKey] || {};
        var users = Object.keys(votes).filter(function (user) {
            return votes[user] === vote;
        });

        users.sort(function (a, b) {
            return a.localeCompare(b);
        });

        if (!users.length) {
            addTextElement(
                menu,
                'ejt-voter-menu-empty',
                'No voters found for this rating.'
            );
        } else {
            users.forEach(function (voter) {
                var userBlock = document.createElement('div');
                var userReasons = reasons[voter] || [];

                userBlock.className = 'ejt-voter-menu-user';
                addTextElement(userBlock, '', voter);

                if (userReasons.length) {
                    userReasons.forEach(function (reason) {
                        addTextElement(
                            userBlock,
                            'ejt-voter-menu-reason',
                            'Reason: ' + reason
                        );
                    });
                } else {
                    addTextElement(
                        userBlock,
                        'ejt-voter-menu-reason',
                        'No saved reason.'
                    );
                }

                menu.appendChild(userBlock);
            });
        }

        menu.style.display = 'block';
        positionMenu(button);
    }

    function showMenu(button, vote) {
        cancelHide();

        activeButton = button;
        activeRequest++;

        var requestId = activeRequest;

        clearMenu();
        addTextElement(menu, 'ejt-voter-menu-title', 'Loading voters…');
        menu.style.display = 'block';
        positionMenu(button);

        loadLedgerData().then(function (data) {
            renderMenu(button, vote, data, requestId);
        });
    }

    function attachButton(button, vote) {
        if (button.getAttribute('data-ejt-voter-menu-attached') === '1') {
            return;
        }

        button.setAttribute('data-ejt-voter-menu-attached', '1');

        button.addEventListener('mouseenter', function () {
            showMenu(button, vote);
        });

        button.addEventListener('mouseleave', scheduleHide);

        button.addEventListener('focus', function () {
            showMenu(button, vote);
        });

        button.addEventListener('blur', scheduleHide);
    }

    menu.addEventListener('mouseenter', cancelHide);
    menu.addEventListener('mouseleave', scheduleHide);

    function scanButtons(root) {
        var scope = root || document;

        if (scope.nodeType === 1 && scope.matches) {
            if (scope.matches('.ejt-up-btn')) {
                attachButton(scope, 1);
            }

            if (scope.matches('.ejt-down-btn')) {
                attachButton(scope, -1);
            }
        }

        if (!scope.querySelectorAll) {
            return;
        }

        Array.prototype.forEach.call(
            scope.querySelectorAll('.ejt-up-btn'),
            function (button) {
                attachButton(button, 1);
            }
        );

        Array.prototype.forEach.call(
            scope.querySelectorAll('.ejt-down-btn'),
            function (button) {
                attachButton(button, -1);
            }
        );
    }

    scanButtons(document);

    if (window.MutationObserver && document.body) {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                Array.prototype.forEach.call(mutation.addedNodes, function (node) {
                    if (node.nodeType === 1) {
                        scanButtons(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    window.ejtRatingVoterMenu = {
        refresh: function () {
            cachedData = null;
            cacheTime = 0;
            loadingPromise = null;
        }
    };
});