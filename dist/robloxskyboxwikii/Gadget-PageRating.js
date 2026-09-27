mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
    if (document.body.classList.contains('is-mobile') || window.innerWidth < 768) {
        return;
    }

    const pageName = mw.config.get('wgPageName');
    const userName = mw.config.get('wgUserName');
    const api = new mw.Api();
    const namespace = mw.config.get('wgNamespaceNumber');

    if (namespace !== 0) return;

    const globalLedgerTitle = 'Project:Ratings';

    let isProcessing = false;
    let userExistingVote = 0;
    let currentPageScore = 0;

    if (!document.getElementById('ejt-ratings-responsive-style')) {
        const styleBlock = document.createElement('style');

        styleBlock.id = 'ejt-ratings-responsive-style';

        styleBlock.innerHTML = `
            .ejt-rating-tab {
                margin-left: auto;
                display: inline-flex;
                align-items: center;
                padding: 0 10px;
            }

            .ejt-rating-wrapper {
                position: relative;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                font-family: 'Rubik', sans-serif;
                font-size: 13px;
                font-weight: bold;
                border: none;
                background: none;
                padding: 0 14px;
                height: 30px;
                margin-top: 6px;
                border-radius: 4px;
                overflow: hidden;
            }

            .ejt-rating-wrapper::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: radial-gradient(
                    rgba(255, 255, 255, 1) 50%,
                    transparent 50%
                );
                background-size: 4px 4px;
                opacity: 0.25;
                z-index: -1;
                transition: opacity 0.3s ease-in-out !important;
            }

            .ejt-rating-wrapper:hover::before {
                opacity: 0.6;
            }

            .ejt-up-btn,
            .ejt-down-btn {
                cursor: pointer;
                background: none;
                border: none;
                padding: 2px;
                font-weight: bold;
                transition: color 0.2s;
                font-family: 'Rubik', sans-serif;
                line-height: 30px;
            }

            .ejt-up-btn:hover {
                color: #28a745 !important;
            }

            .ejt-down-btn:hover {
                color: #dc3545 !important;
            }

            .ejt-score-val {
                min-width: 20px;
                text-align: center;
                line-height: 30px;
                font-family: 'Rubik', sans-serif;
                color: #fff;
                -webkit-text-stroke: 2px #000;
                paint-order: stroke fill;
            }

            @media screen and (max-width: 1100px) {
                .fandom-community-header__local-navigation .wds-tabs {
                    flex-wrap: wrap !important;
                    height: auto !important;
                }

                .ejt-rating-tab {
                    margin-left: 0 !important;
                    padding: 4px 10px !important;
                    width: 100%;
                    justify-content: flex-start;
                }

                .ejt-rating-tab div {
                    margin-top: 4px !important;
                    margin-bottom: 6px !important;
                }
            }
        `;

        document.head.appendChild(styleBlock);
    }

    function injectIntoMenu(tabsList) {
        if (tabsList.querySelector('.ejt-rating-tab')) return;

        const containerListItem = document.createElement('li');

        containerListItem.className =
            'wds-tabs__tab ejt-rating-tab';

        tabsList.appendChild(containerListItem);

        renderItemInterface(containerListItem);
    }

    function renderItemInterface(item) {
        if (!userName) {
            item.innerHTML = `
                <span style="
                    color: #888;
                    font-size: 11px;
                    font-family: 'Rubik', sans-serif;
                    opacity: 0.7;
                ">
                    Log in to rate
                </span>
            `;

            return;
        }

        const upActiveColor =
            userExistingVote === 1
                ? '#28a745'
                : '#bbb';

        const downActiveColor =
            userExistingVote === -1
                ? '#dc3545'
                : '#bbb';

        const displayedScore = currentPageScore;

        const formattedScore =
            displayedScore > 0
                ? '+' + displayedScore
                : displayedScore;

        item.innerHTML = `
            <div class="ejt-rating-wrapper">

                <span style="
                    color: #fff;
                    margin-right: 4px;
                    line-height: 30px;
                    font-family: 'Rubik', sans-serif;
                    -webkit-text-stroke: 2px #000;
                    paint-order: stroke fill;
                    font-weight: bold;
                ">
                    Rating:
                </span>

                <button
                    class="ejt-up-btn"
                    title="Like"
                    style="
                        color: ${upActiveColor};
                        -webkit-text-stroke: 2px #000;
                        paint-order: stroke fill;
                    "
                >
                    +1
                </button>

                <span class="ejt-score-val">
                    ${formattedScore}
                </span>

                <button
                    class="ejt-down-btn"
                    title="Dislike"
                    style="
                        color: ${downActiveColor};
                        -webkit-text-stroke: 2px #000;
                        paint-order: stroke fill;
                    "
                >
                    -1
                </button>

            </div>
        `;

        item.querySelector('.ejt-up-btn')
            .addEventListener('click', function () {
                processVote(1);
            });

        item.querySelector('.ejt-down-btn')
            .addEventListener('click', function () {
                processVote(-1);
            });
    }

    function refreshAllInterfaces() {
        document
            .querySelectorAll('.ejt-rating-tab')
            .forEach(renderItemInterface);
    }

    const observer = new MutationObserver(function () {

        document
            .querySelectorAll('.wds-tabs')
            .forEach(function (tabsList) {

                if (
                    tabsList.closest('.fandom-community-header') ||
                    tabsList.closest('.sticky-header')
                ) {
                    injectIntoMenu(tabsList);
                }
            });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    function parseLedger(content) {

        const ratings = {};

        const lines = content.split('\n');

        lines.forEach(function (line) {

            let cleanLine = line
                .replace('<p>', '')
                .replace('</p>', '')
                .trim();

            if (
                !cleanLine ||
                !cleanLine.includes('|')
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

                const users =
                    secondColumn.split(',');

                users.forEach(function (userEntry) {

                    const separator =
                        userEntry.lastIndexOf(':');

                    if (separator === -1) {
                        return;
                    }

                    const uName =
                        userEntry
                            .substring(0, separator)
                            .trim();

                    const vote =
                        parseInt(
                            userEntry
                                .substring(separator + 1)
                                .trim(),
                            10
                        );

                    if (
                        uName &&
                        (vote === 1 || vote === -1)
                    ) {
                        ratings[pName][uName] = vote;
                    }
                });

            } else {

                /*
                 * OLD FORMAT
                 *
                 * Page | User | 1
                 *
                 * This is automatically imported.
                 */

                const uName = secondColumn;

                const vote =
                    parseInt(
                        parts[2].trim(),
                        10
                    );

                if (
                    uName &&
                    (vote === 1 || vote === -1)
                ) {
                    ratings[pName][uName] = vote;
                }
            }
        });

        return ratings;
    }
    function calculateScore(pageRatings) {

        let score = 0;

        if (!pageRatings) {
            return 0;
        }

        Object.keys(pageRatings).forEach(function (user) {
            score += pageRatings[user];
        });

        return score;
    }
    api.get({
        action: 'query',
        prop: 'revisions',
        titles: globalLedgerTitle,
        rvprop: 'content',
        formatversion: 2,
        cb: Date.now()
    }).done(function (data) {

        let content = "";

        try {

            if (
                data.query &&
                data.query.pages
            ) {

                const keys =
                    Object.keys(data.query.pages);

                const page =
                    data.query.pages[keys[0]];

                if (
                    page &&
                    page.revisions &&
                    page.revisions[0]
                ) {
                    content =
                        page.revisions[0].content;
                }
            }

        } catch (e) {
            content = "";
        }

        const ratings =
            parseLedger(content);

        const pageRatings =
            ratings[pageName] || {};

        currentPageScore =
            calculateScore(pageRatings);

        userExistingVote =
            pageRatings[userName] || 0;

        refreshAllInterfaces();
    });
    function processVote(targetVote) {

        if (isProcessing) {
            return;
        }
        let newVoteValue = targetVote;

        if (userExistingVote === targetVote) {
            newVoteValue = 0;
        }

        isProcessing = true;

        document
            .querySelectorAll('.ejt-rating-tab')
            .forEach(function (el) {
                el.style.opacity = "0.5";
            });
        api.get({
            action: 'query',
            prop: 'revisions',
            titles: globalLedgerTitle,
            rvprop: 'content|timestamp',
            formatversion: 2,
            cb: Date.now()

        }).done(function (data) {

            let content = "";
            let baseTimestamp = "";

            let startTimestamp =
                data.querytime ||
                new Date().toISOString();

            try {

                if (
                    data.query &&
                    data.query.pages
                ) {

                    const keys =
                        Object.keys(data.query.pages);

                    const page =
                        data.query.pages[keys[0]];

                    if (
                        page &&
                        page.revisions &&
                        page.revisions[0]
                    ) {

                        content =
                            page.revisions[0].content;

                        baseTimestamp =
                            page.revisions[0].timestamp;
                    }
                }

            } catch (e) {
                content = "";
            }

            const ratings =
                parseLedger(content);

            if (!ratings[pageName]) {
                ratings[pageName] = {};
            }
            if (newVoteValue === 0) {

                delete ratings[pageName][userName];

            } else {

                ratings[pageName][userName] =
                    newVoteValue;
            }
            let newMatrixLines = [];

            Object.keys(ratings).forEach(function (pName) {

                const users =
                    ratings[pName];

                const userEntries = [];

                Object.keys(users).forEach(function (uName) {

                    userEntries.push(
                        `${uName}:${users[uName]}`
                    );
                });
                if (userEntries.length === 0) {
                    return;
                }
                const score =
                    calculateScore(users);
                newMatrixLines.push(
                    `${pName} | ${userEntries.join(',') } | ${score}`
                );
                newMatrixLines.push('');
            });


            const newMatrixText =
                newMatrixLines.join('\n');
            api.postWithToken('csrf', {

                action: 'edit',

                title: globalLedgerTitle,

                summary:
                    `Rating update for [[${pageName}]]`,

                text: newMatrixText,

                minor: true,

                basetimestamp:
                    baseTimestamp,

                starttimestamp:
                    startTimestamp

            }).done(function () {
                currentPageScore =
                    calculateScore(
                        ratings[pageName]
                    );

                userExistingVote =
                    ratings[pageName][userName] || 0;


                refreshAllInterfaces();


            }).fail(function (code, err) {
                if (code === "editconflict") {

                    console.warn(
                        "Edit conflict caught! Retrying..."
                    );

                    isProcessing = false;

                    processVote(targetVote);

                } else {

                    alert(
                        "Error sending vote request: " +
                        (
                            err.error
                                ? err.error.info
                                : code
                        )
                    );
                }

            }).always(function () {

                if (isProcessing) {

                    isProcessing = false;

                    document
                        .querySelectorAll('.ejt-rating-tab')
                        .forEach(function (el) {
                            el.style.opacity = "1";
                        });
                }
            });


        }).fail(function () {

            alert(
                "Could not load fresh ledger database rows."
            );

            isProcessing = false;

            document
                .querySelectorAll('.ejt-rating-tab')
                .forEach(function (el) {
                    el.style.opacity = "1";
                });
        });
    }
});