mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {

    if (mw.config.get('wgPageName') !== 'Project:RatingsLeaderboard') {
        return;
    }

    mw.hook('wikipage.content').add(function (content) {

        if (document.getElementById('ejt-ratings-leaderboard')) {
            return;
        }

        const ratingsPage = 'Project:Ratings';
        const leaderboardLimit = 30;
        const api = new mw.Api();

        if (!document.getElementById('ejt-ratings-leaderboard-style')) {

            const style = document.createElement('style');

            style.id = 'ejt-ratings-leaderboard-style';

            style.textContent = `
                #ejt-ratings-leaderboard {
                    width: 100%;
                    max-width: 800px;
                    margin: 20px auto;
                    font-family: 'Rubik', sans-serif;
                }

                .ejt-leaderboard-title {
                    background: #222;
                    color: #fff;
                    padding: 14px 18px;
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    border-radius: 8px 8px 0 0;
                }

                .ejt-leaderboard-entry {
                    display: flex;
                    align-items: center;
                    min-height: 52px;
                    padding: 8px 14px;
                    box-sizing: border-box;
                    background: #fff;
                    border-bottom: 1px solid #ddd;
                }

                .ejt-leaderboard-entry:last-child {
                    border-radius: 0 0 8px 8px;
                }

                .ejt-leaderboard-rank {
                    width: 50px;
                    flex-shrink: 0;
                    text-align: center;
                    font-size: 18px;
                    font-weight: bold;
                }

                .ejt-leaderboard-page {
                    flex: 1;
                    padding: 0 12px;
                    font-size: 15px;
                    font-weight: bold;
                    overflow-wrap: anywhere;
                }

                .ejt-leaderboard-page a {
                    color: inherit;
                    text-decoration: none;
                }

                .ejt-leaderboard-page a:hover {
                    text-decoration: underline;
                }

                .ejt-leaderboard-score {
                    width: 70px;
                    flex-shrink: 0;
                    text-align: right;
                    font-size: 18px;
                    font-weight: bold;
                }

                .ejt-positive-score {
                    color: #28a745;
                }

                .ejt-negative-score {
                    color: #dc3545;
                }

                .ejt-zero-score {
                    color: #777;
                }

                .ejt-leaderboard-loading {
                    padding: 20px;
                    text-align: center;
                    background: #f1f1f1;
                    color: #777;
                    border-radius: 0 0 8px 8px;
                }

                .ejt-leaderboard-empty {
                    padding: 25px;
                    text-align: center;
                    background: #f1f1f1;
                    color: #777;
                    border-radius: 0 0 8px 8px;
                }

                .ejt-rank-1 {
                    font-size: 22px;
                }

                .ejt-rank-2 {
                    font-size: 21px;
                }

                .ejt-rank-3 {
                    font-size: 20px;
                }
            `;

            document.head.appendChild(style);
        }

        const container = document.createElement('div');

        container.id = 'ejt-ratings-leaderboard';

        container.innerHTML = `
            <div class="ejt-leaderboard-title">
                Page Ratings Leaderboard
            </div>

            <div class="ejt-leaderboard-loading">
                Loading ratings...
            </div>
        `;

        content.prepend(container);

        api.get({
            action: 'query',
            prop: 'revisions',
            titles: ratingsPage,
            rvprop: 'content',
            rvslots: 'main',
            formatversion: 2
        }).done(function (data) {

            let contentText = '';

            try {

                const pages = data.query.pages;

                if (
                    pages &&
                    pages.length &&
                    pages[0].revisions &&
                    pages[0].revisions.length
                ) {

                    const revision = pages[0].revisions[0];

                    if (
                        revision.slots &&
                        revision.slots.main
                    ) {
                        contentText =
                            revision.slots.main.content || '';
                    } else {
                        contentText =
                            revision.content || '';
                    }
                }

            } catch (error) {
                contentText = '';
            }

            const pages = [];

            contentText.split(/\r?\n/).forEach(function (line) {

                const cleanLine = line
                    .replace(/<p>/g, '')
                    .replace(/<\/p>/g, '')
                    .trim();

                if (!cleanLine || !cleanLine.includes('|')) {
                    return;
                }

                const parts = cleanLine.split('|');

                if (parts.length < 3) {
                    return;
                }

                const pageName = parts[0].trim();

                const score = parseInt(
                    parts[2].trim(),
                    10
                );

                if (!pageName || isNaN(score)) {
                    return;
                }

                pages.push({
                    name: pageName,
                    score: score
                });
            });

            pages.sort(function (a, b) {

                if (b.score !== a.score) {
                    return b.score - a.score;
                }

                return a.name.localeCompare(b.name);
            });

            const topPages = pages.slice(
                0,
                leaderboardLimit
            );

            let html = `
                <div class="ejt-leaderboard-title">
                    Page Ratings Leaderboard
                </div>
            `;

            if (topPages.length === 0) {

                html += `
                    <div class="ejt-leaderboard-empty">
                        No ratings yet.
                    </div>
                `;

            } else {

                topPages.forEach(function (entry, index) {

                    const rank = index + 1;

                    let scoreClass = 'ejt-zero-score';

                    if (entry.score > 0) {
                        scoreClass = 'ejt-positive-score';
                    }

                    if (entry.score < 0) {
                        scoreClass = 'ejt-negative-score';
                    }

                    const formattedScore =
                        entry.score > 0
                            ? '+' + entry.score
                            : String(entry.score);

                    const pageUrl =
                        mw.util.getUrl(entry.name);

                    let rankClass = '';

                    if (rank === 1) {
                        rankClass = 'ejt-rank-1';
                    }

                    if (rank === 2) {
                        rankClass = 'ejt-rank-2';
                    }

                    if (rank === 3) {
                        rankClass = 'ejt-rank-3';
                    }

                    html += `
                        <div class="ejt-leaderboard-entry">

                            <div class="ejt-leaderboard-rank ${rankClass}">
                                ${rank}
                            </div>

                            <div class="ejt-leaderboard-page">
                                <a href="${pageUrl}">
                                    ${escapeHtml(entry.name)}
                                </a>
                            </div>

                            <div class="ejt-leaderboard-score ${scoreClass}">
                                ${formattedScore}
                            </div>

                        </div>
                    `;
                });
            }

            container.innerHTML = html;

        }).fail(function () {

            container.innerHTML = `
                <div class="ejt-leaderboard-title">
                    Page Ratings Leaderboard
                </div>

                <div class="ejt-leaderboard-empty">
                    Could not load ratings.
                </div>
            `;
        });
    });

    function escapeHtml(text) {

        const element = document.createElement('div');

        element.textContent = text;

        return element.innerHTML;
    }

});