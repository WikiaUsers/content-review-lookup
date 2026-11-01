
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
    'use strict';

    var targetPage = 'Project:VoterContributionStatistics';
    var ledgerPage = 'Project:Ratings';
    var containerId = 'ejt-voter-statistics';
    var pageSize = 30;

    if (mw.config.get('wgPageName') !== targetPage.replace(/ /g, '_')) {
        return;
    }

    function addStyles() {
        if (document.getElementById('ejt-voter-statistics-style')) {
            return;
        }

        var style = document.createElement('style');
        style.id = 'ejt-voter-statistics-style';
        style.textContent = [
            '#ejt-voter-statistics{margin:16px 0;font-size:14px}',
            '#ejt-voter-statistics .ejt-vs-controls{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0}',
            '#ejt-voter-statistics input,#ejt-voter-statistics select{box-sizing:border-box;max-width:100%;padding:9px;border:1px solid #a2a9b1;border-radius:4px;background:var(--theme-page-background-color,#fff);color:var(--theme-page-text-color,#202122)}',
            '#ejt-voter-statistics .ejt-vs-search{flex:1;min-width:180px}',
            '#ejt-voter-statistics .ejt-vs-table{width:100%;border-collapse:collapse;margin:12px 0}',
            '#ejt-voter-statistics .ejt-vs-table th,#ejt-voter-statistics .ejt-vs-table td{padding:10px;border-bottom:1px solid #a2a9b1;text-align:left;overflow-wrap:anywhere}',
            '#ejt-voter-statistics .ejt-vs-table th{background:var(--theme-page-background-color--secondary,#f8f9fa)}',
            '#ejt-voter-statistics .ejt-vs-number{font-weight:bold;white-space:nowrap}',
            '#ejt-voter-statistics .ejt-vs-positive{color:#14804a}',
            '#ejt-voter-statistics .ejt-vs-negative{color:#d1242f}',
            '#ejt-voter-statistics .ejt-vs-status{margin:8px 0;color:var(--theme-page-text-color--secondary,#54595d)}',
            '#ejt-voter-statistics .ejt-vs-pagination{display:flex;align-items:center;justify-content:center;gap:12px;margin:14px 0}',
            '#ejt-voter-statistics .ejt-vs-pagination button{padding:7px 13px;cursor:pointer}',
            '#ejt-voter-statistics .ejt-vs-pagination button:disabled{opacity:.5;cursor:default}',
            '@media(max-width:650px){#ejt-voter-statistics .ejt-vs-controls{flex-direction:column}#ejt-voter-statistics .ejt-vs-controls input,#ejt-voter-statistics .ejt-vs-controls select{width:100%}}'
        ].join('');

        document.head.appendChild(style);
    }

    function parseContributions(content) {
        var users = Object.create(null);

        function recordVote(username, vote) {
            username = username.trim();

            if (!username || (vote !== 1 && vote !== -1)) {
                return;
            }

            if (!Object.prototype.hasOwnProperty.call(users, username)) {
                users[username] = {
                    username: username,
                    total: 0,
                    upvotes: 0,
                    downvotes: 0,
                    net: 0
                };
            }

            var user = users[username];

            user.total++;

            if (vote === 1) {
                user.upvotes++;
            } else {
                user.downvotes++;
            }

            user.net += vote;
        }

        content.split(/\r?\n/).forEach(function (line) {
            var parts = line.split('|').map(function (part) {
                return part.trim();
            });

            if (
                parts.length < 3 ||
                !parts[0] ||
                parts[0] === 'RatingReason'
            ) {
                return;
            }

            var voterData = parts[1];
            var recordedScore = parts[2];

            if (!/^[+-]?\d+$/.test(recordedScore)) {
                return;
            }

            if (voterData.indexOf(':') !== -1) {
                voterData.split(',').forEach(function (entry) {
                    entry = entry.trim();

                    var separator = entry.lastIndexOf(':');

                    if (separator < 1) {
                        return;
                    }

                    var username = entry.slice(0, separator).trim();
                    var voteText = entry.slice(separator + 1).trim();

                    if (!/^[+-]?\d+$/.test(voteText)) {
                        return;
                    }

                    recordVote(username, parseInt(voteText, 10));
                });
            } else {
                var legacyVote = parseInt(recordedScore, 10);

                if (legacyVote === 1 || legacyVote === -1) {
                    recordVote(voterData, legacyVote);
                }
            }
        });

        return Object.keys(users).map(function (username) {
            return users[username];
        });
    }

    function createElement(tag, className, text) {
        var element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined) {
            element.textContent = text;
        }

        return element;
    }

    function buildStatistics(container, users) {
        container.textContent = '';

        var heading = createElement(
            'h2',
            '',
            'Voter Contribution Statistics'
        );

        var description = createElement(
            'p',
            '',
            'Explore rating contributions from users across the wiki.'
        );

        var summary = createElement('div', 'ejt-vs-status');

        var controls = createElement('div', 'ejt-vs-controls');
        var search = createElement('input', 'ejt-vs-search');

        search.type = 'search';
        search.placeholder = 'Search usernames...';
        search.setAttribute('aria-label', 'Search usernames');

        var sort = createElement('select');
        sort.setAttribute('aria-label', 'Sort users');

        [
            ['total', 'Most ratings'],
            ['upvotes', 'Most upvotes'],
            ['downvotes', 'Most downvotes'],
            ['net', 'Highest net contribution'],
            ['username', 'Username A–Z']
        ].forEach(function (item) {
            var option = document.createElement('option');
            option.value = item[0];
            option.textContent = item[1];
            sort.appendChild(option);
        });

        controls.appendChild(search);
        controls.appendChild(sort);

        var status = createElement('div', 'ejt-vs-status');
        status.setAttribute('aria-live', 'polite');

        var table = createElement('table', 'ejt-vs-table');
        var thead = document.createElement('thead');
        var header = document.createElement('tr');

        [
            'User',
            'Total ratings',
            'Upvotes',
            'Downvotes',
            'Net contribution'
        ].forEach(function (label) {
            header.appendChild(createElement('th', '', label));
        });

        thead.appendChild(header);

        var tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        var pagination = createElement('div', 'ejt-vs-pagination');
        var previous = createElement('button', '', 'Previous');
        var pageLabel = createElement('span', '', '');
        var next = createElement('button', '', 'Next');

        previous.type = 'button';
        next.type = 'button';

        pagination.appendChild(previous);
        pagination.appendChild(pageLabel);
        pagination.appendChild(next);

        container.appendChild(heading);
        container.appendChild(description);
        container.appendChild(summary);
        container.appendChild(controls);
        container.appendChild(status);
        container.appendChild(table);
        container.appendChild(pagination);

        var currentPage = 0;

        var totalRatings = users.reduce(function (sum, user) {
            return sum + user.total;
        }, 0);

        var totalUpvotes = users.reduce(function (sum, user) {
            return sum + user.upvotes;
        }, 0);

        var totalDownvotes = users.reduce(function (sum, user) {
            return sum + user.downvotes;
        }, 0);

        summary.textContent =
            'Contributors: ' + users.length +
            ' | Ratings: ' + totalRatings +
            ' | Upvotes: ' + totalUpvotes +
            ' | Downvotes: ' + totalDownvotes;

        function getFilteredUsers() {
            var query = search.value.trim().toLowerCase();
            var sortMode = sort.value;

            var filtered = users.filter(function (user) {
                return user.username.toLowerCase().indexOf(query) !== -1;
            });

            filtered.sort(function (a, b) {
                if (sortMode === 'username') {
                    return a.username.localeCompare(b.username);
                }

                return b[sortMode] - a[sortMode] ||
                    a.username.localeCompare(b.username);
            });

            return filtered;
        }

        function renderResults() {
            var filtered = getFilteredUsers();
            var totalPages = Math.ceil(filtered.length / pageSize);

            if (totalPages === 0) {
                currentPage = 0;
            } else if (currentPage >= totalPages) {
                currentPage = totalPages - 1;
            }

            var start = currentPage * pageSize;
            var visible = filtered.slice(start, start + pageSize);

            tbody.textContent = '';

            visible.forEach(function (user) {
                var row = document.createElement('tr');
                var nameCell = document.createElement('td');
                var link = document.createElement('a');

                link.href = mw.util.getUrl('User:' + user.username);
                link.textContent = user.username;

                nameCell.appendChild(link);
                row.appendChild(nameCell);

                row.appendChild(createElement(
                    'td',
                    'ejt-vs-number',
                    String(user.total)
                ));

                row.appendChild(createElement(
                    'td',
                    'ejt-vs-number ejt-vs-positive',
                    String(user.upvotes)
                ));

                row.appendChild(createElement(
                    'td',
                    'ejt-vs-number ejt-vs-negative',
                    String(user.downvotes)
                ));

                var netClass = 'ejt-vs-number';

                if (user.net > 0) {
                    netClass += ' ejt-vs-positive';
                } else if (user.net < 0) {
                    netClass += ' ejt-vs-negative';
                }

                row.appendChild(createElement(
                    'td',
                    netClass,
                    (user.net > 0 ? '+' : '') + user.net
                ));

                tbody.appendChild(row);
            });

            status.textContent = filtered.length ?
                'Showing ' + (start + 1) + '–' +
                    (start + visible.length) + ' of ' +
                    filtered.length + ' contributors.' :
                'No matching contributors found.';

            pageLabel.textContent = totalPages ?
                'Page ' + (currentPage + 1) + ' of ' + totalPages :
                'Page 0 of 0';

            previous.disabled = currentPage <= 0;
            next.disabled = totalPages === 0 ||
                currentPage >= totalPages - 1;

            pagination.style.display = totalPages > 1 ? 'flex' : 'none';
            table.style.display = filtered.length ? 'table' : 'none';
        }

        search.addEventListener('input', function () {
            currentPage = 0;
            renderResults();
        });

        sort.addEventListener('change', function () {
            currentPage = 0;
            renderResults();
        });

        previous.addEventListener('click', function () {
            if (currentPage > 0) {
                currentPage--;
                renderResults();
            }
        });

        next.addEventListener('click', function () {
            var totalPages = Math.ceil(
                getFilteredUsers().length / pageSize
            );

            if (currentPage < totalPages - 1) {
                currentPage++;
                renderResults();
            }
        });

        renderResults();
    }

    function loadStatistics() {
        var container = document.getElementById(containerId);

        if (!container || container.getAttribute('data-loading') === '1') {
            return;
        }

        container.setAttribute('data-loading', '1');
        container.textContent = 'Loading voter statistics...';

        new mw.Api().get({
            action: 'query',
            prop: 'revisions',
            titles: ledgerPage,
            rvprop: 'content',
            rvslots: 'main',
            formatversion: 2
        }).then(function (data) {
            var page = data.query &&
                data.query.pages &&
                data.query.pages[0];

            var revision = page &&
                page.revisions &&
                page.revisions[0];

            var content = revision &&
                revision.slots &&
                revision.slots.main &&
                (revision.slots.main.content !== undefined ?
                    revision.slots.main.content :
                    revision.slots.main['*']);

            if (typeof content !== 'string') {
                container.textContent =
                    'Unable to read Project:Ratings. Check that the ledger exists and is readable.';
                return;
            }

            buildStatistics(container, parseContributions(content));
        }).catch(function () {
            container.textContent =
                'Unable to load voter statistics. Please refresh and try again.';
        }).finally(function () {
            container.removeAttribute('data-loading');
        });
    }

    function initialize() {
        var container = document.getElementById(containerId);

        if (!container) {
            var target = document.querySelector('.mw-parser-output');

            if (!target) {
                return;
            }

            container = document.createElement('div');
            container.id = containerId;
            target.appendChild(container);
        }

        addStyles();
        loadStatistics();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
});