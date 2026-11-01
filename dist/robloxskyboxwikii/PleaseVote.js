
mw.loader.using([
    'mediawiki.api',
    'mediawiki.util'
]).then(function () {
    'use strict';

    if (window.RatingLeaveWarningLoaded) {
        return;
    }

    window.RatingLeaveWarningLoaded = true;

    const config = $.extend({
        ledgerTitle: 'Project:Ratings',
        shard: false,
        namespaces: [0]
    }, window.RatingSystemConfig);

    const currentUser = mw.config.get('wgUserName');
    const pageName = mw.config.get('wgPageName');
    const api = new mw.Api();

    if (
        !currentUser ||
        mw.config.get('wgAction') !== 'view' ||
        mw.config.get('wgArticleId') <= 0 ||
        mw.config.get('wgIsRedirect') ||
        [].concat(config.namespaces).indexOf(
            mw.config.get('wgNamespaceNumber')
        ) === -1
    ) {
        return;
    }

    let hasVoted = null;
    let initiallyVoted = false;
    let responseSubmitted = false;
    let reasonSaved = false;
    let pendingNavigation = null;
    let popupOpen = false;

    function normalizePage(name) {
        return name.trim().replace(/ /g, '_');
    }

    function normalizeUser(name) {
        return name.replace(/%2C/gi, ',').trim().replace(/_/g, ' ');
    }

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

    function canLeave() {
        return initiallyVoted || (
            hasVoted === true &&
            reasonSaved
        );
    }

    function fetchLedger() {
        return api.get({
            action: 'query',
            prop: 'revisions',
            titles: ledgerTitleFor(pageName),
            rvprop: 'content|timestamp',
            rvslots: 'main',
            curtimestamp: true,
            formatversion: 2,
            cb: Date.now()
        }).then(function (data) {
            const page = data.query.pages[0];
            const revision = page && page.revisions && page.revisions[0];
            const slot = revision && revision.slots && revision.slots.main;

            return {
                content: slot ? slot.content || '' : '',
                timestamp: revision ? revision.timestamp : null,
                startTimestamp: data.curtimestamp
            };
        });
    }

    function checkVoteStatus() {
        return fetchLedger().then(function (ledger) {
            hasVoted = false;

            ledger.content.split(/\r?\n/).forEach(function (line) {
                const parts = line.split('|');

                if (parts.length !== 3) {
                    return;
                }

                if (normalizePage(parts[0]) !== normalizePage(pageName)) {
                    return;
                }

                const second = parts[1].trim();

                if (second.indexOf(':') !== -1) {
                    second.split(',').forEach(function (entry) {
                        const separator = entry.lastIndexOf(':');

                        if (separator === -1) {
                            return;
                        }

                        const voter = normalizeUser(
                            entry.slice(0, separator)
                        );

                        const vote = parseInt(
                            entry.slice(separator + 1),
                            10
                        );

                        if (
                            voter === normalizeUser(currentUser) &&
                            (vote === 1 || vote === -1)
                        ) {
                            hasVoted = true;
                        }
                    });
                } else {
                    const vote = parseInt(parts[2], 10);

                    if (
                        normalizeUser(second) === normalizeUser(currentUser) &&
                        (vote === 1 || vote === -1)
                    ) {
                        hasVoted = true;
                    }
                }
            });

            initiallyVoted = hasVoted;
        }).catch(function (error) {
            hasVoted = null;
            console.error('[RatingLeaveWarning] Vote check failed:', error);
        });
    }

    function encodeResponse(response) {
        return String(response)
            .replace(/\|/g, '&#124;')
            .replace(/\r?\n/g, ' ');
    }

    function saveResponse(response) {
        return fetchLedger().then(function (ledger) {
            const lines = ledger.content.split(/\r?\n/);

            const filtered = lines.filter(function (line) {
                const parts = line.split('|');

                if (
                    parts.length < 4 ||
                    parts[0].trim() !== 'RatingLeaveResponse'
                ) {
                    return true;
                }

                return !(
                    normalizePage(parts[1]) === normalizePage(pageName) &&
                    normalizeUser(parts[2]) === normalizeUser(currentUser)
                );
            });

            filtered.push(
                'RatingLeaveResponse | ' +
                pageName +
                ' | ' +
                currentUser +
                ' | ' +
                encodeResponse(response)
            );

            const params = {
                action: 'edit',
                title: ledgerTitleFor(pageName),
                text: filtered.join('\n'),
                summary: 'Saved mandatory page-rating response',
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

            return api.postWithToken('csrf', params);
        });
    }

    function updateVoteStatus() {
        const up = document.querySelector('.ejt-up-btn');
        const down = document.querySelector('.ejt-down-btn');

        if (!up || !down) {
            return;
        }

        if (
            up.getAttribute('aria-disabled') !== 'false' ||
            down.getAttribute('aria-disabled') !== 'false'
        ) {
            return;
        }

        const previousVote = hasVoted;

        hasVoted =
            up.getAttribute('aria-pressed') === 'true' ||
            down.getAttribute('aria-pressed') === 'true';

        if (previousVote === true && hasVoted === false) {
            reasonSaved = false;
        }
    }

    function createPopup() {
        if (document.getElementById('rating-leave-warning')) {
            return;
        }

        const style = document.createElement('style');

        style.id = 'rating-leave-warning-style';

        style.textContent = `
            #rating-leave-warning {
                position: fixed;
                inset: 0;
                z-index: 999999;
                display: none;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.75);
                padding: 20px;
                box-sizing: border-box;
            }

            #rating-leave-warning.visible {
                display: flex;
            }

            #rating-leave-warning .rlw-box {
                width: 100%;
                max-width: 430px;
                padding: 25px;
                border-radius: 12px;
                background: var(--theme-page-background-color, #fff);
                color: var(--theme-page-text-color, #222);
                box-shadow: 0 8px 35px rgba(0, 0, 0, 0.3);
                box-sizing: border-box;
            }

            #rating-leave-warning .rlw-title {
                font-size: 21px;
                font-weight: bold;
                margin-bottom: 12px;
            }

            #rating-leave-warning .rlw-description {
                font-size: 14px;
                margin-bottom: 15px;
                line-height: 1.5;
            }

            #rating-leave-warning textarea {
                width: 100%;
                min-height: 110px;
                resize: vertical;
                padding: 10px;
                border: 1px solid var(--theme-border-color, #aaa);
                border-radius: 6px;
                background: var(--theme-page-background-color, #fff);
                color: inherit;
                font: inherit;
                box-sizing: border-box;
            }

            #rating-leave-warning .rlw-button {
                width: 100%;
                padding: 11px;
                margin-top: 12px;
                border: none;
                border-radius: 6px;
                background: #3b82f6;
                color: white;
                font-weight: bold;
                cursor: pointer;
            }

            #rating-leave-warning .rlw-button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            #rating-leave-warning .rlw-status {
                font-size: 13px;
                margin-top: 10px;
            }
        `;

        document.head.appendChild(style);

        const overlay = document.createElement('div');
        overlay.id = 'rating-leave-warning';

        const box = document.createElement('div');
        box.className = 'rlw-box';

        const title = document.createElement('div');
        title.className = 'rlw-title';
        title.textContent = 'Please rate the page before leaving!';

        const description = document.createElement('div');
        description.className = 'rlw-description';
        description.textContent =
            'Please provide your response below. You must submit it and rate this page before continuing.';

        const textarea = document.createElement('textarea');
        textarea.placeholder = 'Type your response here...';

        const button = document.createElement('button');
        button.className = 'rlw-button';
        button.textContent = 'Submit Response';

        const status = document.createElement('div');
        status.className = 'rlw-status';

        box.appendChild(title);
        box.appendChild(description);
        box.appendChild(textarea);
        box.appendChild(button);
        box.appendChild(status);

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        button.addEventListener('click', function () {
            if (responseSubmitted) {
                overlay.classList.remove('visible');
                popupOpen = false;
                focusRatingButtons();
                return;
            }

            const response = textarea.value.trim();

            if (!response) {
                status.textContent = 'You must enter a response.';
                textarea.focus();
                return;
            }

            button.disabled = true;
            textarea.disabled = true;
            status.textContent = 'Saving your response...';

            saveResponse(response).then(function () {
                responseSubmitted = true;

                description.textContent =
                    'Your response has been saved. Now rate this page to continue.';

                textarea.style.display = 'none';
                button.disabled = false;
                button.textContent = 'Continue to Rating';
                status.textContent = 'Response saved successfully.';

                overlay.classList.remove('visible');
                popupOpen = false;

                focusRatingButtons();
            }).catch(function (error) {
                console.error('[RatingLeaveWarning]', error);

                status.textContent =
                    'Could not save your response. Please try again.';

                button.disabled = false;
                textarea.disabled = false;
            });
        });

        overlay.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
            }
        });
    }

    function focusRatingButtons() {
        const up = document.querySelector('.ejt-up-btn');

        if (up) {
            up.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            up.focus({
                preventScroll: true
            });
        } else {
            mw.notify(
                'Please wait for the rating buttons to load.',
                { type: 'warn' }
            );
        }
    }

    function showPopup() {
        if (popupOpen || canLeave()) {
            return;
        }

        createPopup();

        const overlay = document.getElementById(
            'rating-leave-warning'
        );

        const textarea = overlay.querySelector('textarea');
        const description = overlay.querySelector('.rlw-description');
        const button = overlay.querySelector('.rlw-button');
        const status = overlay.querySelector('.rlw-status');

        if (responseSubmitted) {
            description.textContent =
                'Your response has already been saved. Please rate this page before leaving.';

            textarea.style.display = 'none';
            button.textContent = 'Continue to Rating';
            status.textContent = '';
        } else {
            textarea.style.display = '';
            textarea.disabled = false;
            button.disabled = false;
            button.textContent = 'Submit Response';

            description.textContent =
                'Please provide your response below. You must submit it and rate this page before continuing.';
        }

        overlay.classList.add('visible');
        popupOpen = true;

        if (!responseSubmitted) {
            textarea.focus();
        }
    }

    function interceptNavigation(event) {
        const link = event.target.closest &&
            event.target.closest('a[href]');

        if (!link) {
            return;
        }

        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.metaKey ||
            link.target === '_blank' ||
            link.hasAttribute('download')
        ) {
            return;
        }

        let destination;

        try {
            destination = new URL(link.href, window.location.href);
        } catch (e) {
            return;
        }

        if (
            destination.origin === window.location.origin &&
            destination.pathname === window.location.pathname &&
            destination.search === window.location.search &&
            destination.hash
        ) {
            return;
        }

        if (canLeave()) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        pendingNavigation = destination.href;

        showPopup();
    }

    function handleReasonSaved(event) {
        const detail = event.detail || {};

        if (
            normalizePage(detail.page || '') !== normalizePage(pageName) ||
            normalizeUser(detail.user || '') !== normalizeUser(currentUser)
        ) {
            return;
        }

        updateVoteStatus();

        hasVoted = true;
        reasonSaved = true;

        if (pendingNavigation) {
            const destination = pendingNavigation;

            pendingNavigation = null;

            window.location.href = destination;
        }
    }

    function observeRatingButtons() {
        const observer = new MutationObserver(function () {
            updateVoteStatus();
        });

        observer.observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: [
                'aria-pressed',
                'aria-disabled'
            ]
        });
    }

    window.addEventListener(
        'RatedReasonsSaved',
        handleReasonSaved
    );

    document.addEventListener(
        'click',
        interceptNavigation,
        true
    );

    window.addEventListener('beforeunload', function (event) {
        updateVoteStatus();

        if (!canLeave()) {
            event.preventDefault();
            event.returnValue = '';
        }
    });

    checkVoteStatus().then(function () {
        observeRatingButtons();
        updateVoteStatus();
    });
});