
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
    let reasonSaved = false;
    let pendingNavigation = null;
    let popupOpen = false;

    function normalizePage(name) {
        return String(name).trim().replace(/ /g, '_');
    }

    function normalizeUser(name) {
        return String(name)
            .replace(/%2C/gi, ',')
            .trim()
            .replace(/_/g, ' ');
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
        return hasVoted === true && reasonSaved === true;
    }

    function fetchLedger() {
        return api.get({
            action: 'query',
            prop: 'revisions',
            titles: ledgerTitleFor(pageName),
            rvprop: 'content|timestamp',
            rvslots: 'main',
            formatversion: 2,
            cb: Date.now()
        }).then(function (data) {
            const page = data.query.pages[0];
            const revision =
                page && page.revisions && page.revisions[0];
            const slot =
                revision && revision.slots && revision.slots.main;

            return {
                content: slot ? slot.content || '' : ''
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

                if (
                    normalizePage(parts[0]) !==
                    normalizePage(pageName)
                ) {
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
                        normalizeUser(second) ===
                            normalizeUser(currentUser) &&
                        (vote === 1 || vote === -1)
                    ) {
                        hasVoted = true;
                    }
                }
            });

            if (hasVoted) {
                reasonSaved = true;
            }
        }).catch(function (error) {
            hasVoted = null;

            console.error(
                '[RatingLeaveWarning] Vote check failed:',
                error
            );
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

        const newVote =
            up.getAttribute('aria-pressed') === 'true' ||
            down.getAttribute('aria-pressed') === 'true';

        if (hasVoted === true && !newVote) {
            reasonSaved = false;
        }

        if (!newVote) {
            reasonSaved = false;
        }

        hasVoted = newVote;
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
                background: rgba(0, 0, 0, 0.72);
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
                margin-bottom: 18px;
                line-height: 1.5;
            }

            #rating-leave-warning .rlw-button {
                display: block;
                width: 100%;
                padding: 11px;
                margin-top: 10px;
                border: none;
                border-radius: 6px;
                font-weight: bold;
                font-size: 14px;
                cursor: pointer;
            }

            #rating-leave-warning .rlw-rate {
                background: #3b82f6;
                color: white;
            }

            #rating-leave-warning .rlw-leave {
                background: var(--theme-button-background-color, #777);
                color: var(--theme-button-text-color, white);
            }

            #rating-leave-warning .rlw-button:focus-visible {
                outline: 3px solid var(--theme-accent-color, #3b82f6);
                outline-offset: 3px;
            }
        `;

        document.head.appendChild(style);

        const overlay = document.createElement('div');
        overlay.id = 'rating-leave-warning';

        const box = document.createElement('div');
        box.className = 'rlw-box';

        const title = document.createElement('div');
        title.className = 'rlw-title';
        title.textContent = 'You haven’t rated this page!';

        const description = document.createElement('div');
        description.className = 'rlw-description';
        description.textContent =
            'Would you like to go back and rate this page, or leave without rating?';

        const rateButton = document.createElement('button');
        rateButton.className = 'rlw-button rlw-rate';
        rateButton.textContent = 'Go back and rate';

        const leaveButton = document.createElement('button');
        leaveButton.className = 'rlw-button rlw-leave';
        leaveButton.textContent = 'Leave page';

        rateButton.addEventListener('click', function () {
            pendingNavigation = null;

            overlay.classList.remove('visible');
            popupOpen = false;

            focusRatingButtons();
        });

        leaveButton.addEventListener('click', function () {
            const destination = pendingNavigation;

            pendingNavigation = null;
            overlay.classList.remove('visible');
            popupOpen = false;

            if (destination) {
                window.location.href = destination;
            }
        });

        box.appendChild(title);
        box.appendChild(description);
        box.appendChild(rateButton);
        box.appendChild(leaveButton);

        overlay.appendChild(box);
        document.body.appendChild(overlay);
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

    function showPopup(destination) {
        if (popupOpen) {
            return;
        }

        createPopup();

        pendingNavigation = destination;

        const overlay = document.getElementById(
            'rating-leave-warning'
        );

        overlay.classList.add('visible');
        popupOpen = true;

        const rateButton = overlay.querySelector('.rlw-rate');
        rateButton.focus();
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
            destination = new URL(
                link.href,
                window.location.href
            );
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

        updateVoteStatus();

        if (canLeave()) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        showPopup(destination.href);
    }

    function handleReasonSaved(event) {
        const detail = event.detail || {};

        if (
            normalizePage(detail.page || '') !==
                normalizePage(pageName) ||
            normalizeUser(detail.user || '') !==
                normalizeUser(currentUser)
        ) {
            return;
        }

        updateVoteStatus();

        hasVoted = true;
        reasonSaved = true;
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

    checkVoteStatus().then(function () {
        observeRatingButtons();
        updateVoteStatus();
    });
});