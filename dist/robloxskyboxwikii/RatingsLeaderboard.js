mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
    'use strict';

    var leaderboardPage = 'Project:RatingsLeaderboard';
    var ratingsPage = 'Project:Ratings';
    var containerId = 'ejt-ratings-leaderboard';

    function getPageUrl(title) {
        return mw.util.getUrl(title);
    }

    function parseRatings(content) {
        var scores = {};

        content.split(/\r?\n/).forEach(function (line) {
            var parts = line.split('|').map(function (part) {
                return part.trim();
            });

            if (parts.length < 3 || parts[0] === 'RatingReason' || !parts[0]) {
                return;
            }

            var pageName = parts[0];
            var voterData = parts[1];
            var score = 0;

            if (/^[+-]?\d+$/.test(parts[2])) {
                score = parseInt(parts[2], 10);
            } else {
                voterData.split(',').forEach(function (entry) {
                    var match = entry.trim().match(/^[^:]+:\s*([+-]?\d+)\s*$/);

                    if (match) {
                        score += parseInt(match[1], 10);
                    }
                });
            }

            if (!scores[pageName]) {
                scores[pageName] = 0;
            }

            scores[pageName] = score;
        });

        return scores;
    }

    function renderLeaderboard(scores) {
        var container = document.getElementById(containerId);

        if (!container) {
            return;
        }

        container.textContent = '';

        var heading = document.createElement('h2');
        heading.textContent = 'Page Ratings Leaderboard';
        container.appendChild(heading);

        var pages = Object.keys(scores).map(function (page) {
            return {
                title: page,
                score: scores[page]
            };
        });

        pages.sort(function (a, b) {
            return b.score - a.score || a.title.localeCompare(b.title);
        });

        if (!pages.length) {
            container.appendChild(document.createTextNode('No ratings found.'));
            return;
        }

        var list = document.createElement('ol');

        pages.slice(0, 30).forEach(function (page) {
            var item = document.createElement('li');
            var link = document.createElement('a');
            var score = document.createElement('span');

            link.href = getPageUrl(page.title);
            link.textContent = page.title;

            score.textContent = ' ' + (page.score > 0 ? '+' : '') + page.score;
            score.className = 'ejt-leaderboard-score';

            item.appendChild(link);
            item.appendChild(score);
            list.appendChild(item);
        });

        container.appendChild(list);
    }

    function loadLeaderboard() {
        var container = document.getElementById(containerId);

        if (!container) {
            return;
        }

        container.textContent = 'Loading ratings...';

        var api = new mw.Api();

        api.get({
            action: 'query',
            prop: 'revisions',
            titles: ratingsPage,
            rvprop: 'content',
            rvslots: 'main',
            formatversion: 2
        }).then(function (data) {
            var pages = data.query && data.query.pages;
            var page = pages && pages[0];
            var content = page && page.revisions &&
                page.revisions[0] &&
                page.revisions[0].slots &&
                page.revisions[0].slots.main &&
                page.revisions[0].slots.main.content;

            if (typeof content !== 'string') {
                container.textContent = 'Unable to load the ratings ledger.';
                return;
            }

            renderLeaderboard(parseRatings(content));
        }).catch(function () {
            container.textContent = 'Error loading ratings. Please try again later.';
        });
    }

    if (mw.config.get('wgPageName') !== leaderboardPage.replace(/ /g, '_')) {
        return;
    }

    mw.hook('wikipage.content').add(function () {
        if (document.getElementById(containerId)) {
            loadLeaderboard();
            return;
        }

        var target = document.querySelector('.mw-parser-output');

        if (!target) {
            return;
        }

        var container = document.createElement('div');
        container.id = containerId;
        target.appendChild(container);

        loadLeaderboard();
    });
});