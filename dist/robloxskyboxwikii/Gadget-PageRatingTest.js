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
            .ejt-rating-tab { margin-left: auto; display: inline-flex; align-items: center; padding: 0 10px; }
            .ejt-rating-wrapper { position: relative; display: inline-flex; align-items: center; gap: 8px; font-family: 'Rubik', sans-serif; font-size: 13px; font-weight: bold; border: none; background: none; padding: 0 14px; height: 30px; margin-top: 6px; border-radius: 4px; overflow: hidden; }
            .ejt-rating-wrapper::before { content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(rgba(255, 255, 255, 1) 50%, transparent 50%); background-size: 4px 4px; opacity: 0.25; z-index: -1; transition: opacity 0.3s ease-in-out !important; }
            .ejt-rating-wrapper:hover::before { opacity: 0.6; }
            @media screen and (max-width: 1100px) {
                .fandom-community-header__local-navigation .wds-tabs { flex-wrap: wrap !important; height: auto !important; }
                .ejt-rating-tab { margin-left: 0 !important; padding: 4px 10px !important; width: 100%; justify-content: flex-start; }
                .ejt-rating-tab div { margin-top: 4px !important; margin-bottom: 6px !important; }
            }
        `;
        document.head.appendChild(styleBlock);
    }

    function injectIntoMenu(tabsList) {
        if (tabsList.querySelector('.ejt-rating-tab')) return;
        const containerListItem = document.createElement('li');
        containerListItem.className = 'wds-tabs__tab ejt-rating-tab';
        tabsList.appendChild(containerListItem);
        renderItemInterface(containerListItem);
    }

    function renderItemInterface(item) {
        if (!userName) {
            item.innerHTML = "<span style='color: #888; font-size: 11px; font-family: \"Rubik\", sans-serif; opacity: 0.7;'>Log in to rate</span>";
            return;
        }

        const upActiveColor = userExistingVote === 1 ? '#28a745' : '#bbb';
        const displayedScore = currentPageScore < 0 ? 0 : currentPageScore;
        const formattedScore = displayedScore > 0 ? '+' + displayedScore : displayedScore;

        item.innerHTML = `
            <div class="ejt-rating-wrapper">
                <span style="color: #fff; font-weight: normal; margin-right: 4px; line-height: 30px; font-family: 'Rubik', sans-serif; -webkit-text-stroke: 2px #000; paint-order: stroke fill; font-weight: bold;">Rating:</span>
                <button class="ejt-up-btn" style="cursor:pointer; background:none; border:none; padding:2px; font-weight:bold; color: ${upActiveColor}; transition: color 0.2s; font-family: 'Rubik', sans-serif; line-height: 30px; -webkit-text-stroke: 4px #000; paint-order: stroke fill;">+1</button>
                <span class="ejt-score-val" style="color: #fff; min-width: 14px; text-align: center; line-height: 30px; font-family: 'Rubik', sans-serif; -webkit-text-stroke: 2px #000; paint-order: stroke fill;">${formattedScore}</span>
            </div>
        `;

        item.querySelector('.ejt-up-btn').addEventListener('click', function() {
            processVote(1);
        });
    }

    function refreshAllInterfaces() {
        document.querySelectorAll('.ejt-rating-tab').forEach(renderItemInterface);
    }

    const observer = new MutationObserver(function () {
        document.querySelectorAll('.wds-tabs').forEach(function (tabsList) {
            if (tabsList.closest('.fandom-community-header') || tabsList.closest('.sticky-header')) {
                injectIntoMenu(tabsList);
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Internal utility to parse the new aggregated "Page | Votes | User1, User2" syntax
    function parseAggregatedLedger(content) {
        let lines = content.split('\n');
        let fullDatabase = {}; // structure: { PageName: [User1, User2...] }

        lines.forEach(function(line) {
            let cleanLine = line.replace("<p>", "").replace("</p>", "").trim();
            if (!cleanLine || !cleanLine.includes('|')) return;
            let parts = cleanLine.split('|');
            if (parts.length < 2) return;

            let pName = parts[0].trim();
            let votersStr = parts[2] ? parts[2].trim() : "";
            
            // Turn voter list back into an array
            let votersArray = votersStr ? votersStr.split(',').map(u => u.trim()).filter(u => u.length > 0) : [];
            fullDatabase[pName] = votersArray;
        });
        return fullDatabase;
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
            if (data.query && data.query.pages && data.query.pages[0]) {
                const page = data.query.pages[0];
                if (page.revisions && page.revisions[0]) {
                    content = page.revisions[0].content;
                }
            }
        } catch (e) {
            content = "";
        }

        let db = parseAggregatedLedger(content);
        let currentPageVoters = db[pageName] || [];

        currentPageScore = currentPageVoters.length;
        userExistingVote = currentPageVoters.includes(userName) ? 1 : 0;
        refreshAllInterfaces();
    });

    function processVote(targetVote) {
        if (isProcessing) return;
        let newVoteValue = targetVote;
        if (userExistingVote === targetVote) {
            newVoteValue = 0; // Toggle vote off
        }

        isProcessing = true;
        document.querySelectorAll('.ejt-rating-tab').forEach(el => {
            el.style.opacity = "0.5";
        });

        api.get({
            action: 'query',
            prop: 'revisions',
            titles: globalLedgerTitle,
            rvprop: 'content|timestamp',
            formatversion: 2,
            cb: Date.now()
        }).done(function(data) {
            let content = "";
            let baseTimestamp = "";
            let startTimestamp = data.querytime || new Date().toISOString();
            try {
                if (data.query && data.query.pages && data.query.pages[0]) {
                    const page = data.query.pages[0];
                    if (page.revisions && page.revisions[0]) {
                        content = page.revisions[0].content;
                        baseTimestamp = page.revisions[0].timestamp;
                    }
                }
            } catch (e) {
                content = "";
            }

            let db = parseAggregatedLedger(content);
            let currentVoters = db[pageName] || [];

            // Strip user out if they are clearing their vote; add if voting fresh
            currentVoters = currentVoters.filter(u => u !== userName);
            if (newVoteValue === 1) {
                currentVoters.push(userName);
            }

            if (currentVoters.length === 0) {
                delete db[pageName]; // Wipe row clean if nobody is voting for it
            } else {
                db[pageName] = currentVoters;
            }

            // Build structural text lines back into aggregated format
            let newMatrixLines = [];
            for (let p in db) {
                if (db.hasOwnProperty(p)) {
                    let totalVotes = db[p].length;
                    let votersListString = db[p].join(', ');
                    newMatrixLines.push(`${p} | ${totalVotes} | ${votersListString}`);
                }
            }

            newMatrixLines.sort(); // Keeps database page organized alphabetically
            let newMatrixText = newMatrixLines.join("\n");

            api.postWithToken('csrf', {
                action: 'edit',
                title: globalLedgerTitle,
                summary: `Rating update for [[${pageName}]]`,
                text: newMatrixText,
                minor: true,
                nocreate: true,
                basetimestamp: baseTimestamp,
                starttimestamp: startTimestamp,
                formatversion: 2
            }).done(function () {
                currentPageScore = currentVoters.length;
                userExistingVote = newVoteValue;
                refreshAllInterfaces();
                isProcessing = false;
                document.querySelectorAll('.ejt-rating-tab').forEach(el => {
                    el.style.opacity = "1";
                });
            }).fail(function (code, err) {
                if (code === "editconflict") {
                    console.warn("Edit conflict caught! Retrying calculation immediately...");
                    isProcessing = false;
                    processVote(targetVote);
                } else {
                    alert("Error sending vote request: " + (err && err.error ? err.error.info : code));
                    isProcessing = false;
                    document.querySelectorAll('.ejt-rating-tab').forEach(el => {
                        el.style.opacity = "1";
                    });
                }
            });
        }).fail(function() {
            alert("Could not load fresh ledger database rows.");
            isProcessing = false;