mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
    'use strict';

    if (window.RatingMilestonesLoaded) {
        return;
    }

    window.RatingMilestonesLoaded = true;

    const config = $.extend({
        ledgerTitle: 'Project:Ratings',
        shard: false,
        namespaces: [0],
        minWidth: 768,
        leaderboardTitle: 'Project:RatingMilestones'
    }, window.RatingSystemConfig);

    const milestones = [
        { name: 'Bronze', score: 3 },
        { name: 'Silver', score: 6 },
        { name: 'Gold', score: 9 },
        { name: 'Platinum', score: 12 },
        { name: 'Diamond', score: 18 },
        { name: 'Legendary', score: 30 }
    ];

    const api = new mw.Api();
    const pageName = mw.config.get('wgPageName');
    const isLeaderboard = pageName === config.leaderboardTitle.replace(/ /g, '_');

    if (typeof importArticle === 'function') {
        importArticle({
            type: 'style',
            article: 'MediaWiki:RatingMilestones.css'
        });
    }

    function normalizePage(name) {
        return name.trim().replace(/ /g, '_');
    }

    function normalizeUser(name) {
        return name.replace(/%2C/gi, ',').trim().replace(/_/g, ' ');
    }

    function parseVote(value) {
        const vote = parseInt(value, 10);
        return vote === 1 || vote === -1 ? vote : 0;
    }

    function parseLedger(text) {
        const votes = Object.create(null);

        text.split(/\r?\n/).forEach(function (line) {
            const parts = line.split('|');

            if (parts.length !== 3) {
                return;
            }

            const page = normalizePage(parts[0]);
            const second = parts[1].trim();

            if (!page) {
                return;
            }

            const pageVotes = Object.create(null);

            if (second.indexOf(':') !== -1) {
                second.split(',').forEach(function (token) {
                    const separator = token.lastIndexOf(':');

                    if (separator === -1) {
                        return;
                    }

                    const user = normalizeUser(
                        token.slice(0, separator)
                    );

                    const vote = parseVote(
                        token.slice(separator + 1)
                    );

                    if (user && vote) {
                        pageVotes[user] = vote;
                    }
                });
            } else {
                const user = normalizeUser(second);
                const vote = parseVote(parts[2]);

                if (user && vote) {
                    pageVotes[user] = vote;
                }
            }

            if (!votes[page]) {
                votes[page] = Object.create(null);
            }

            Object.keys(pageVotes).forEach(function (user) {
                votes[page][user] = pageVotes[user];
            });
        });

        return votes;
    }

    function calculateScore(pageVotes) {
        let score = 0;

        Object.keys(pageVotes || {}).forEach(function (user) {
            score += pageVotes[user];
        });

        return score;
    }

    function getMilestone(score) {
        let current = null;
        let next = null;

        milestones.forEach(function (milestone) {
            if (score >= milestone.score) {
                current = milestone;
            } else if (!next) {
                next = milestone;
            }
        });

        let progress = 0;

        if (next) {
            const previousScore = current ? current.score : 0;
            const range = next.score - previousScore;

            progress = Math.max(
                0,
                Math.min(100, ((score - previousScore) / range) * 100)
            );
        } else {
            progress = 100;
        }

        return {
            current: current,
            next: next,
            progress: progress
        };
    }

    function formatScore(score) {
        return score > 0 ? '+' + score : String(score);
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

    function fetchLedger(title) {
        return api.get({
            action: 'query',
            prop: 'revisions',
            titles: title,
            rvprop: 'content',
            rvslots: 'main',
            formatversion: 2,
            cb: Date.now()
        }).then(function (data) {
            const page = data.query &&
                data.query.pages &&
                data.query.pages[0];

            if (!page || page.missing) {
                return '';
            }

            const revision = page.revisions &&
                page.revisions[0];

            const slot = revision &&
                revision.slots &&
                revision.slots.main;

            return slot && typeof slot.content === 'string'
                ? slot.content
                : '';
        });
    }

    function fetchPageScore() {
        return fetchLedger(ledgerTitleFor(pageName)).then(function (text) {
            const votes = parseLedger(text);
            const pageVotes = votes[normalizePage(pageName)];

            return calculateScore(pageVotes);
        });
    }

    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined) {
            element.textContent = text;
        }

        return element;
    }

    function createProgressBar(progress) {
        const track = createElement(
            'div',
            'rating-milestones-progress'
        );

        const fill = createElement(
            'div',
            'rating-milestones-progress-fill'
        );

        fill.style.width = progress + '%';

        track.appendChild(fill);

        return track;
    }

    function createMilestoneDisplay(score) {
        const data = getMilestone(score);

        const container = createElement(
            'div',
            'rating-milestones-card'
        );

        const top = createElement(
            'div',
            'rating-milestones-top'
        );

        const badge = createElement(
            'span',
            'rating-milestones-badge',
            data.current ? data.current.name : 'Unranked'
        );

        if (data.current) {
            badge.classList.add(
                'rating-milestones-badge--' +
                data.current.name.toLowerCase()
            );
        }

        const scoreText = createElement(
            'span',
            'rating-milestones-score',
            formatScore(score) + ' points'
        );

        top.appendChild(badge);
        top.appendChild(scoreText);

        const progressText = createElement(
            'div',
            'rating-milestones-next'
        );

        if (data.next) {
            progressText.textContent =
                'Next milestone: ' +
                data.next.name +
                ' (+' + data.next.score + ')';
        } else {
            progressText.textContent =
                'All milestones achieved!';
        }

        container.appendChild(top);
        container.appendChild(progressText);
        container.appendChild(createProgressBar(data.progress));

        return container;
    }

    function updatePageDisplay(score) {
        const tab = document.querySelector('.ejt-rating-tab');

        if (!tab) {
            return;
        }

        const oldDisplay = tab.querySelector(
            '.rating-milestones-card'
        );

        const newDisplay = createMilestoneDisplay(score);

        if (oldDisplay) {
            oldDisplay.replaceWith(newDisplay);
        } else {
            const wrapper = tab.querySelector(
                '.ejt-rating-wrapper'
            );

            if (wrapper) {
                wrapper.insertAdjacentElement(
                    'afterend',
                    newDisplay
                );
            } else {
                tab.appendChild(newDisplay);
            }
        }
    }

    function loadPageMilestone() {
        fetchPageScore().then(function (score) {
            updatePageDisplay(score);
        }).catch(function (error) {
            console.warn(
                '[RatingMilestones] Could not load page score:',
                error
            );
        });
    }

    function watchRatingWidget() {
        let queued = false;

        function queueUpdate() {
            if (queued) {
                return;
            }

            queued = true;

            requestAnimationFrame(function () {
                queued = false;

                const display = document.querySelector(
                    '.ejt-rating-tab .rating-milestones-card'
                );

                if (!display) {
                    loadPageMilestone();
                }
            });
        }

        new MutationObserver(function (mutations) {
            for (let i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes.length) {
                    queueUpdate();
                    return;
                }
            }
        }).observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function getShardTitles() {
        if (!config.shard) {
            return [config.ledgerTitle];
        }

        const titles = [];

        for (let i = 0; i < 26; i++) {
            titles.push(
                config.ledgerTitle + '/' +
                String.fromCharCode(65 + i)
            );
        }

        titles.push(config.ledgerTitle + '/0-9');
        titles.push(config.ledgerTitle + '/Other');

        return titles;
    }

    function fetchAllRatings() {
        const titles = getShardTitles();

        return Promise.all(
            titles.map(function (title) {
                return fetchLedger(title);
            })
        ).then(function (contents) {
            const allVotes = Object.create(null);

            contents.forEach(function (content) {
                const votes = parseLedger(content);

                Object.keys(votes).forEach(function (page) {
                    if (!allVotes[page]) {
                        allVotes[page] = Object.create(null);
                    }

                    Object.keys(votes[page]).forEach(function (user) {
                        allVotes[page][user] = votes[page][user];
                    });
                });
            });

            return allVotes;
        });
    }

    function renderLeaderboard(allVotes) {
        const target =
            document.querySelector('#mw-content-text .mw-parser-output') ||
            document.querySelector('#mw-content-text');

        if (!target) {
            return;
        }

        const existing = target.querySelector(
            '.rating-milestones-leaderboard'
        );

        if (existing) {
            existing.remove();
        }

        const container = createElement(
            'div',
            'rating-milestones-leaderboard'
        );

        const heading = createElement(
            'h2',
            '',
            'Page Rating Milestones'
        );

        const description = createElement(
            'p',
            '',
            'Pages ranked by their current net rating score.'
        );

        const table = createElement(
            'table',
            'rating-milestones-table'
        );

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        ['Rank', 'Page', 'Milestone', 'Net Score'].forEach(function (label) {
            headerRow.appendChild(
                createElement('th', '', label)
            );
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        const pages = Object.keys(allVotes).map(function (page) {
            return {
                page: page,
                score: calculateScore(allVotes[page])
            };
        });

        pages.sort(function (a, b) {
            if (b.score !== a.score) {
                return b.score - a.score;
            }

            return a.page.localeCompare(b.page);
        });

        if (!pages.length) {
            const row = document.createElement('tr');
            const cell = createElement(
                'td',
                '',
                'No ratings have been recorded yet.'
            );

            cell.colSpan = 4;
            row.appendChild(cell);
            tbody.appendChild(row);
        }

        pages.forEach(function (entry, index) {
            const row = document.createElement('tr');
            const data = getMilestone(entry.score);

            row.appendChild(
                createElement('td', '', String(index + 1))
            );

            const pageCell = document.createElement('td');
            const link = createElement(
                'a',
                '',
                entry.page.replace(/_/g, ' ')
            );

            link.href = mw.util.getUrl(
                entry.page.replace(/_/g, ' ')
            );

            pageCell.appendChild(link);
            row.appendChild(pageCell);

            row.appendChild(
                createElement(
                    'td',
                    '',
                    data.current ? data.current.name : 'Unranked'
                )
            );

            row.appendChild(
                createElement(
                    'td',
                    '',
                    formatScore(entry.score)
                )
            );

            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        container.appendChild(heading);
        container.appendChild(description);
        container.appendChild(table);

        target.appendChild(container);
    }

    function loadLeaderboard() {
        fetchAllRatings().then(function (allVotes) {
            renderLeaderboard(allVotes);
        }).catch(function (error) {
            console.warn(
                '[RatingMilestones] Could not load leaderboard:',
                error
            );

            const target =
                document.querySelector('#mw-content-text .mw-parser-output') ||
                document.querySelector('#mw-content-text');

            if (target) {
                target.appendChild(
                    createElement(
                        'p',
                        'rating-milestones-error',
                        'Could not load the rating milestones leaderboard.'
                    )
                );
            }
        });
    }

    function start() {
        if (mw.config.get('wgAction') !== 'view') {
            return;
        }

        if (isLeaderboard) {
            loadLeaderboard();
            return;
        }

        if (
            mw.config.get('wgArticleId') <= 0 ||
            mw.config.get('wgIsRedirect') ||
            [].concat(config.namespaces).indexOf(
                mw.config.get('wgNamespaceNumber')
            ) === -1 ||
            document.body.classList.contains('is-mobile') ||
            window.innerWidth < config.minWidth
        ) {
            return;
        }

        loadPageMilestone();
        watchRatingWidget();
    }

    $(start);
});