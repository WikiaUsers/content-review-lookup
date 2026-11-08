mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
	'use strict';

	if (window.RatingSystemLoaded) {
		return;
	}
	window.RatingSystemLoaded = true;

	const config = $.extend({
		ledgerTitle: 'Project:Ratings',
		shard: false,
		namespaces: [0],
		minWidth: 768,
		maxRetries: 3,
		disable: false
	}, window.RatingSystemConfig);

	// Vote value that is turned off: 1 (likes), -1 (dislikes) or 0 (none)
	let disabledVote = 0;

	if (config.disable === 'likes') {
		disabledVote = 1;
	} else if (config.disable === 'dislikes') {
		disabledVote = -1;
	} else if (config.disable) {
		console.warn('[RatingSystem] Unknown value for "disable":', config.disable, '(expected "likes" or "dislikes")');
	}

	const MESSAGES_NAME = 'RatingSystem';
	const TAB_SELECTOR = '.fandom-community-header .wds-tabs, .sticky-header .wds-tabs';
	const RETRYABLE_CODES = ['editconflict', 'pagedeleted', 'articleexists'];

	const pageName = mw.config.get('wgPageName');
	const displayName = pageName.replace(/_/g, ' ');
	const userName = mw.config.get('wgUserName'); // null when logged out
	const api = new mw.Api();

	let i18n = null;

	function t(key) {
		const args = Array.prototype.slice.call(arguments, 1);
		return i18n.msg.apply(i18n, [key].concat(args)).plain();
	}

	// Edit summaries use the wiki's content language
	function editSummary() {
		return i18n.inContentLang().msg('summary', displayName).plain();
	}

	function loadMessages() {
		const deferred = $.Deferred();

		mw.hook('dev.i18n').add(function (lib) {
			// Increase cacheVersion whenever a message is added to i18n
			lib.loadMessages(MESSAGES_NAME, { cacheVersion: 1 }).done(function (loaded) {
				i18n = loaded;
				deferred.resolve();
			});
		});

		if (typeof importArticle === 'function') {
			importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
		}

		return deferred.promise();
	}

	// Ledger format:  Page_name | User one:1,User two:-1 | score

	function normalizePage(name) {
		return name.trim().replace(/ /g, '_');
	}

	function normalizeUser(name) {
		return name.replace(/%2C/gi, ',').trim().replace(/_/g, ' ');
	}

	function encodeUser(name) {
		return name.replace(/,/g, '%2C');
	}

	function parseVote(text) {
		const value = parseInt(text, 10);
		return value === 1 || value === -1 ? value : 0;
	}

	// Returns { page, votes } for a vote line, or null for any other line.
	// Legacy single-vote format:  Page | User | 1
	function parseEntryLine(line) {
		const parts = line.split('|');

		if (parts.length !== 3) {
			return null;
		}

		const page = normalizePage(parts[0]);
		const second = parts[1].trim();
		const votes = Object.create(null);
		let count = 0;

		if (!page) {
			return null;
		}

		if (second.indexOf(':') !== -1) {
			second.split(',').forEach(function (token) {
				const separator = token.lastIndexOf(':');

				if (separator === -1) {
					return;
				}

				const user = normalizeUser(token.slice(0, separator));
				const vote = parseVote(token.slice(separator + 1));

				if (user && vote) {
					votes[user] = vote;
					count++;
				}
			});
		} else {
			const user = normalizeUser(second);
			const vote = parseVote(parts[2]);

			if (user && vote) {
				votes[user] = vote;
				count++;
			}
		}

		return count ? { page: page, votes: votes } : null;
	}

	function parseLedger(text) {
		const votes = Object.create(null);
		const layout = [];
		const placed = Object.create(null);

		text.split(/\r?\n/).forEach(function (line) {
			const entry = parseEntryLine(line);

			if (!entry) {
				layout.push({ raw: line });
				return;
			}

			if (!votes[entry.page]) {
				votes[entry.page] = Object.create(null);
			}

			Object.keys(entry.votes).forEach(function (user) {
				votes[entry.page][user] = entry.votes[user];
			});

			if (!placed[entry.page]) {
				placed[entry.page] = true;
				layout.push({ page: entry.page });
			}
		});

		return { votes: votes, layout: layout };
	}

	function scoreOf(pageVotes, ignoredVote) {
		let score = 0;

		Object.keys(pageVotes || {}).forEach(function (user) {
			if (pageVotes[user] !== ignoredVote) {
				score += pageVotes[user];
			}
		});

		return score;
	}

	function formatEntryLine(page, pageVotes) {
		const users = Object.keys(pageVotes || {});

		if (!users.length) {
			return null;
		}

		const entries = users.map(function (user) {
			return encodeUser(user) + ':' + pageVotes[user];
		});

		return page + ' | ' + entries.join(',') + ' | ' + scoreOf(pageVotes);
	}

	function serializeLedger(ledger) {
		const lines = [];
		const written = Object.create(null);

		ledger.layout.forEach(function (item) {
			if (item.page === undefined) {
				lines.push(item.raw);
				return;
			}

			written[item.page] = true;

			const line = formatEntryLine(item.page, ledger.votes[item.page]);
			if (line) {
				lines.push(line);
			}
		});

		Object.keys(ledger.votes).forEach(function (page) {
			if (written[page]) {
				return;
			}

			const line = formatEntryLine(page, ledger.votes[page]);
			if (line) {
				lines.push('', line);
			}
		});

		return lines.join('\n')
			.replace(/\n{3,}/g, '\n\n')
			.replace(/^\n+|\n+$/g, '');
	}

	// Voting the same way twice removes the vote
	function applyVote(ledger, page, user, target) {
		if (!ledger.votes[page]) {
			ledger.votes[page] = Object.create(null);
		}

		const pageVotes = ledger.votes[page];
		const next = pageVotes[user] === target ? 0 : target;

		if (next === 0) {
			delete pageVotes[user];
		} else {
			pageVotes[user] = next;
		}

		return next;
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

	function request(promise, phase) {
		return new Promise(function (resolve, reject) {
			promise.then(resolve, function (code, result) {
				reject({ phase: phase, code: code, result: result });
			});
		});
	}

	function wait(milliseconds) {
		return new Promise(function (resolve) {
			setTimeout(resolve, milliseconds);
		});
	}

	function fetchLedger(title) {
		return request(api.get({
			action: 'query',
			prop: 'revisions',
			titles: title,
			rvprop: 'content|timestamp',
			rvslots: 'main',
			curtimestamp: true,
			formatversion: 2,
			cb: Date.now()
		}), 'load').then(function (data) {
			const page = data.query && data.query.pages && data.query.pages[0];

			if (page && page.missing) {
				return { text: '', baseTimestamp: null, startTimestamp: data.curtimestamp };
			}

			const revision = page && page.revisions && page.revisions[0];
			const slot = revision && revision.slots && revision.slots.main;

			if (!slot || typeof slot.content !== 'string' || !data.curtimestamp) {
				return Promise.reject({ phase: 'load', code: 'invalid-response' });
			}

			return {
				text: slot.content,
				baseTimestamp: revision.timestamp,
				startTimestamp: data.curtimestamp
			};
		});
	}

	function saveLedger(title, fetched, text) {
		const params = {
			action: 'edit',
			title: title,
			text: text,
			summary: editSummary(),
			minor: true,
			watchlist: 'nochange',
			assert: 'user',
			starttimestamp: fetched.startTimestamp
		};

		if (fetched.baseTimestamp) {
			params.basetimestamp = fetched.baseTimestamp;
		} else {
			params.createonly = true;
		}

		return request(api.postWithToken('csrf', params), 'save');
	}

	function submitVote(target, attempt) {
		const title = ledgerTitleFor(pageName);

		return fetchLedger(title).then(function (fetched) {
			const ledger = parseLedger(fetched.text);

			const previousVote = (ledger.votes[pageName] && ledger.votes[pageName][userName]) || 0;
			const newVote = applyVote(ledger, pageName, userName, target);

			return saveLedger(title, fetched, serializeLedger(ledger)).then(function () {
				return {
					votes: ledger.votes[pageName],
					vote: newVote,
					previousVote: previousVote,
					ledgerTitle: title
				};
			});
		}).then(null, function (error) {
			if (RETRYABLE_CODES.indexOf(error.code) !== -1 && attempt < config.maxRetries) {
				console.warn('[RatingSystem] ' + error.code + ', retrying (' + (attempt + 1) + '/' + config.maxRetries + ')');

				return wait(150 + Math.random() * 350).then(function () {
					return submitVote(target, attempt + 1);
				});
			}

			return Promise.reject(error);
		});
	}

	const state = {
		status: 'loading', // loading | ready | error
		score: 0,
		userVote: 0,
		busy: false
	};

	function setCounts(pageVotes) {
		state.score = scoreOf(pageVotes, disabledVote);
		state.userVote = (userName && pageVotes && pageVotes[userName]) || 0;
	}

	function loadRatings() {
		fetchLedger(ledgerTitleFor(pageName)).then(function (fetched) {
			setCounts(parseLedger(fetched.text).votes[pageName]);
			state.status = 'ready';
		}).then(null, function (error) {
			console.warn('[RatingSystem] Could not load the ratings:', error);
			state.status = 'error';
		}).then(refreshAll);
	}

	function errorInfo(error) {
		const apiError = error.result && error.result.error;
		return (apiError && apiError.info) || error.code || error.message || 'unknown error';
	}

	function notifyError(error) {
		let text;

		if (error.phase === 'load') {
			text = t('error-load');
		} else if (RETRYABLE_CODES.indexOf(error.code) !== -1) {
			text = t('error-conflict');
		} else {
			text = t('error-save', errorInfo(error));
		}

		mw.notify(text, { type: 'error', tag: 'rating-system' });
	}

	function vote(target) {
		if (!userName || state.busy || state.status !== 'ready' || target === disabledVote) {
			return;
		}

		state.busy = true;
		refreshAll();

		let saved = null;

		submitVote(target, 0).then(function (result) {
			saved = result;
			setCounts(result.votes);
		}).then(null, function (error) {
			console.warn('[RatingSystem] Could not save the vote:', error);
			notifyError(error);
		}).then(finish, finish);

		function finish() {
			state.busy = false;
			refreshAll();

			if (saved) {
				announceVote(saved);
			}
		}
	}

	function announceVote(result) {
		try {
			mw.hook('RatingSystem.voted').fire({
				page: pageName,
				user: userName,
				vote: result.vote,
				previousVote: result.previousVote,
				ledgerTitle: result.ledgerTitle
			});
		} catch (error) {
			console.error('[RatingSystem] A RatingSystem.voted handler failed:', error);
		}
	}

	const widgets = new WeakMap();

	function el(tag, className, text) {
		const node = document.createElement(tag);

		node.className = className;

		if (text !== undefined) {
			node.textContent = text;
		}

		return node;
	}

	// RatedReasons depends on the names of the CSS classes
	function createButton(className, symbol, target) {
		const button = el('button', className, symbol);

		button.type = 'button';
		button.addEventListener('click', function () {
			vote(target);
		});

		return button;
	}

	function buildWidget(item) {
		const refs = {
			wrapper: el('div', 'ejt-rating-wrapper'),
			label: el('span', 'ejt-rating-label'),
			score: el('span', 'ejt-score-val')
		};

		refs.score.setAttribute('aria-live', 'polite');
		refs.wrapper.appendChild(refs.label);

		if (userName) {
			if (disabledVote !== 1) {
				refs.up = createButton('ejt-up-btn', '+1', 1);
				refs.wrapper.appendChild(refs.up);
			}

			refs.wrapper.appendChild(refs.score);

			if (disabledVote !== -1) {
				refs.down = createButton('ejt-down-btn', '-1', -1);
				refs.wrapper.appendChild(refs.down);
			}
		} else {
			// Logged-out visitors see the score but cannot vote
			refs.login = el('a', 'ejt-rating-login');
			refs.login.href = mw.util.getUrl('Special:UserLogin', { returnto: pageName });

			refs.wrapper.appendChild(refs.score);
			refs.wrapper.appendChild(refs.login);
		}

		item.appendChild(refs.wrapper);
		widgets.set(item, refs);
	}

	function setButton(button, label, active, locked) {
		button.title = label;
		button.setAttribute('aria-label', label);
		button.setAttribute('aria-pressed', active ? 'true' : 'false');
		button.setAttribute('aria-disabled', locked ? 'true' : 'false');
		button.classList.toggle('is-active', active);
	}

	function updateWidget(item) {
		const refs = widgets.get(item);

		if (!refs) {
			return;
		}

		let scoreText = state.score > 0 ? '+' + state.score : String(state.score);
		let tooltip = '';

		if (state.status === 'loading') {
			scoreText = '…';
			tooltip = t('loading');
		} else if (state.status === 'error') {
			scoreText = '–';
			tooltip = t('error-load');
		}

		refs.label.textContent = t('label');
		refs.score.textContent = scoreText;
		refs.score.title = tooltip;
		refs.wrapper.classList.toggle('is-busy', state.busy);

		if (refs.login) {
			refs.login.textContent = t('login');
			return;
		}

		const locked = state.status !== 'ready' || state.busy;

		if (refs.up) {
			setButton(refs.up, t('like'), state.userVote === 1, locked);
		}

		if (refs.down) {
			setButton(refs.down, t('dislike'), state.userVote === -1, locked);
		}
	}

	function refreshAll() {
		document.querySelectorAll('.ejt-rating-tab').forEach(function (item) {
			updateWidget(item);
		});
	}

	function injectAll() {
		document.querySelectorAll(TAB_SELECTOR).forEach(function (tabsList) {
			if (tabsList.querySelector('.ejt-rating-tab')) {
				return;
			}

			const item = document.createElement('li');
			item.className = 'wds-tabs__tab ejt-rating-tab';
			tabsList.appendChild(item);

			buildWidget(item);
			updateWidget(item);
		});
	}

	function watchHeader() {
		let queued = false;

		function queueInject() {
			if (queued) {
				return;
			}

			queued = true;
			requestAnimationFrame(function () {
				queued = false;
				injectAll();
			});
		}

		new MutationObserver(function (mutations) {
			for (let i = 0; i < mutations.length; i++) {
				if (mutations[i].addedNodes.length) {
					queueInject();
					return;
				}
			}
		}).observe(document.body, { childList: true, subtree: true });
	}

	function isSupportedPage() {
		return mw.config.get('wgAction') === 'view' &&
			mw.config.get('wgArticleId') > 0 &&
			!mw.config.get('wgIsRedirect') &&
			[].concat(config.namespaces).indexOf(mw.config.get('wgNamespaceNumber')) !== -1 &&
			!document.body.classList.contains('is-mobile') &&
			window.innerWidth >= config.minWidth;
	}

	function start() {
		if (!isSupportedPage()) {
			return;
		}

		if (typeof importArticle === 'function') {
			importArticle({ type: 'style', article: 'u:dev:MediaWiki:RatingSystem.css' });
		}

		loadRatings();

		loadMessages().then(function () {
			injectAll();
			watchHeader();
		});
	}

	$(start);
});
/*
Name: WhoVoted
Author: !Davin012613
Description: An addon for RatingSystem - hovering over either "+1" or "-1" will show a list of people who upvoted or downvoted depending on which number you clicked on.
*/
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
/*
Authors: !Davin012613 and Eroll5
Description: An Addon for RatingSystem that allows Users to send their messages to sysop members.

It reads the optional window.RatingSystemConfig of RatingSystem (ledgerTitle, shard, namespaces,
minWidth, maxRetries), so both scripts always work on the same ledger.

    window.RatedReasonsConfig = {
        notify: true,       // false: only save the reason, do not send it to anyone
        group: 'sysop'      // user group(s) that receive the reason: 'sysop' or ['sysop', 'bureaucrat']
    };

*/
mw.loader.using([
    'mediawiki.api',
    'mediawiki.util'
]).then(function () {
    'use strict';

    if (window.RatedReasonsLoaded) {
        return;
    }
    window.RatedReasonsLoaded = true;

    const config = $.extend({
        ledgerTitle: 'Project:Ratings',
        shard: false,
        namespaces: [0],
        minWidth: 768,
        maxRetries: 3
    }, window.RatingSystemConfig);

    const reasonsConfig = $.extend({
        notify: true,
        group: 'sysop'
    }, window.RatedReasonsConfig);

    const targetGroups = (function () {
        const raw = Array.isArray(reasonsConfig.group)
            ? reasonsConfig.group
            : [reasonsConfig.group || 'sysop'];

        const groups = raw
            .map(function (group) {
                return String(group).trim();
            })
            .filter(function (group, index, list) {
                return group && list.indexOf(group) === index;
            });

        return groups.length ? groups : ['sysop'];
    }());

    const RETRYABLE_CODES = ['editconflict', 'pagedeleted', 'articleexists'];
    const POLL_INTERVAL = 750;
    const POLL_ATTEMPTS = 20;
    const BATCH_SIZE = 5;

    const api = new mw.Api();

    const currentUser = mw.config.get('wgUserName');
    const pageName = mw.config.get('wgPageName');

    if (!currentUser || !isSupportedPage()) {
        return;
    }

    let observingVote = false;
    let lastObservedClick = 0;
    let knownVote = null;

    function isSupportedPage() {
        return mw.config.get('wgAction') === 'view' &&
            mw.config.get('wgArticleId') > 0 &&
            !mw.config.get('wgIsRedirect') &&
            [].concat(config.namespaces).indexOf(mw.config.get('wgNamespaceNumber')) !== -1 &&
            !document.body.classList.contains('is-mobile') &&
            window.innerWidth >= config.minWidth;
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function unescapeHtml(text) {
        return String(text)
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, '&');
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

    function request(promise) {
        return new Promise(function (resolve, reject) {
            promise.then(resolve, function (code, result) {
                reject({ code: code, result: result });
            });
        });
    }

    function wait(milliseconds) {
        return new Promise(function (resolve) {
            setTimeout(resolve, milliseconds);
        });
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

    function normalizeUser(name) {
        return name.replace(/%2C/gi, ',').trim().replace(/_/g, ' ');
    }

    function parseLedger(content) {
        const ratings = Object.create(null);

        String(content || '')
            .split(/\r?\n/)
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

                if (parts.length !== 3) {
                    return;
                }

                const pName = parts[0].trim().replace(/ /g, '_');
                const secondColumn = parts[1].trim();

                if (!ratings[pName]) {
                    ratings[pName] = Object.create(null);
                }

                if (secondColumn.includes(':')) {
                    secondColumn.split(',').forEach(function (entry) {
                        const separator = entry.lastIndexOf(':');

                        if (separator === -1) {
                            return;
                        }

                        const username = normalizeUser(entry.substring(0, separator));

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
                    const username = normalizeUser(secondColumn);
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

    function getLedger(title) {
        return request(api.get({
            action: 'query',
            prop: 'revisions',
            titles: title,
            rvprop: 'content|timestamp',
            rvslots: 'main',
            curtimestamp: true,
            formatversion: 2,
            cb: Date.now()
        })).then(function (data) {
            const page = data.query && data.query.pages && data.query.pages[0];

            if (page && page.missing) {
                return {
                    content: '',
                    timestamp: null,
                    startTimestamp: data.curtimestamp,
                    ratings: parseLedger('')
                };
            }

            const revision = page && page.revisions && page.revisions[0];
            const slot = revision && revision.slots && revision.slots.main;

            if (!slot || typeof slot.content !== 'string' || !data.curtimestamp) {
                return Promise.reject({ code: 'invalid-response' });
            }

            return {
                content: slot.content,
                timestamp: revision.timestamp,
                startTimestamp: data.curtimestamp,
                ratings: parseLedger(slot.content)
            };
        });
    }

    function getCurrentVote() {
        return getLedger(ledgerTitleFor(pageName)).then(function (ledger) {
            return (
                ledger.ratings[pageName] &&
                ledger.ratings[pageName][currentUser]
            ) || 0;
        });
    }

    function askReason(vote) {
        const action = vote === 1 ? 'upvot' : 'downvot';
        const pageDisplay = pageName.replace(/_/g, ' ');

        let question = 'Why are you ' + action + 'ing "' + pageDisplay + '"?';

        if (reasonsConfig.notify) {
            question += '\n\nYou will be able to choose which administrator(s) receive your reason.';
        }

        const reason = window.prompt(question, '');

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
            .replace(/\r?\n/g, ' ')
            .replace(/[|~{}]/g, function (character) {
                return '&#' + character.charCodeAt(0) + ';';
            });
    }

    function decodeReason(reason) {
        return String(reason)
            .replace(/&#(124|126|123|125);/g, function (match, code) {
                return String.fromCharCode(Number(code));
            });
    }

    function getReasonLines(content) {
        return String(content || '')
            .split('\n')
            .filter(function (line) {
                return line.trim().indexOf('RatingReason |') === 0;
            });
    }

    function updateReasonInLedger(reason, attempt) {
        const title = ledgerTitleFor(pageName);

        return getLedger(title).then(function (ledger) {
            const lines = ledger.content === '' ? [] : ledger.content.split('\n');

            const newReasonLine =
                'RatingReason | ' +
                pageName +
                ' | ' +
                currentUser +
                ' | ' +
                encodeReason(reason);

            let replaced = false;

            const updatedLines = lines.map(function (line) {
                const cleanLine = line.trim();

                if (cleanLine.indexOf('RatingReason |') !== 0) {
                    return line;
                }

                const parts = cleanLine.split('|');

                if (parts.length < 4) {
                    return line;
                }

                const samePage = parts[1].trim().replace(/ /g, '_') === pageName;
                const sameUser = normalizeUser(parts[2]) === normalizeUser(currentUser);

                if (!samePage || !sameUser) {
                    return line;
                }

                if (!replaced) {
                    replaced = true;
                    return newReasonLine;
                }

                return null;
            }).filter(function (line) {
                return line !== null;
            });

            if (!replaced) {
                updatedLines.push(newReasonLine);
            }

            const params = {
                action: 'edit',
                title: title,
                summary:
                    'Added rating reason for [[' +
                    pageName +
                    ']]',
                text: updatedLines.join('\n'),
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

            return request(api.postWithToken('csrf', params));
        }).then(null, function (error) {
            if (RETRYABLE_CODES.indexOf(error.code) !== -1 && attempt < config.maxRetries) {
                return wait(150 + Math.random() * 350).then(function () {
                    return updateReasonInLedger(reason, attempt + 1);
                });
            }

            return Promise.reject(error);
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
                        text: unescapeHtml(paragraph.slice(last, match.index))
                    });
                }

                parts.push({
                    type: 'text',
                    text: unescapeHtml(match[2]),
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
                    text: unescapeHtml(paragraph.slice(last))
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

    function getGroupMembers(group) {
        const users = [];

        function fetchUsers(queryParams) {
            return request(api.get(queryParams)).then(function (data) {
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

        return fetchUsers({
            action: 'query',
            list: 'allusers',
            augroup: group,
            aulimit: 'max',
            auprop: 'groups'
        }).then(null, function (error) {
            console.warn('RatingsNotifications: could not list the members of "' + group + '"', error);
            return [];
        });
    }

    function isExempt(username, groups) {
        const norm = String(username).replace(/_/g, ' ').trim().toLowerCase();

        if (norm === 'abuse filter') {
            return true;
        }

        if (norm === String(currentUser).replace(/_/g, ' ').trim().toLowerCase()) {
            return true;
        }

        return Array.isArray(groups) && groups.indexOf('bot') !== -1;
    }

    function getRecipients() {
        return Promise.all(targetGroups.map(getGroupMembers)).then(function (results) {
            const byName = Object.create(null);

            results.forEach(function (list) {
                list.forEach(function (user) {
                    byName[user.name] = user;
                });
            });

            const recipients = Object.keys(byName)
                .map(function (name) {
                    return byName[name];
                })
                .filter(function (user) {
                    return !isExempt(user.name, user.groups);
                });

            if (typeof window.RatedReasonsRecipientSelector === 'function') {
                return Promise.resolve(window.RatedReasonsRecipientSelector(recipients)).then(function (selected) {
                    if (!Array.isArray(selected)) {
                        return null;
                    }

                    const allowed = Object.create(null);
                    recipients.forEach(function (user) {
                        allowed[user.name] = user;
                    });

                    return selected.map(function (name) {
                        return allowed[String(name)] || null;
                    }).filter(Boolean);
                });
            }

            return recipients;
        });
    }

    function postToWall(user, title, bodyHtml) {
        return Promise.resolve($.ajax({
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
        }));
    }

    function postInBatches(users, title, bodyHtml) {
        let sent = 0;
        let chain = Promise.resolve();

        for (let i = 0; i < users.length; i += BATCH_SIZE) {
            const batch = users.slice(i, i + BATCH_SIZE);

            chain = chain.then(function () {
                return Promise.all(
                    batch.map(function (user) {
                        return postToWall(user, title, bodyHtml).then(
                            function () {
                                sent++;
                            },
                            function () {}
                        );
                    })
                );
            });
        }

        return chain.then(function () {
            return sent;
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

        return getRecipients().then(function (recipients) {
            if (recipients === null) {
                mw.notify('Rating reason saved. Notification skipped.', { type: 'success' });
                return;
            }

            if (!recipients.length) {
                mw.notify(
                    'The rating was saved, but there is nobody to notify in the group(s): ' +
                    targetGroups.join(', ') + '.',
                    { type: 'warn' }
                );

                return;
            }

            return postInBatches(recipients, title, bodyHtml).then(function (sent) {
                if (sent === 0) {
                    mw.notify(
                        'The rating was saved, but no notifications could be sent.',
                        { type: 'error' }
                    );
                } else if (sent === recipients.length) {
                    mw.notify(
                        'Rating reason sent to ' + sent + ' user(s).',
                        { type: 'success' }
                    );
                } else {
                    mw.notify(
                        'Rating reason sent to ' + sent + ' of ' + recipients.length + ' users.',
                        { type: 'warn' }
                    );
                }
            });
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

    function waitForVoteChange(previousVote) {
        let attempts = 0;

        function retry() {
            if (attempts >= POLL_ATTEMPTS) {
                return null;
            }

            return wait(POLL_INTERVAL).then(check);
        }

        function check() {
            attempts++;

            return getCurrentVote().then(function (currentVote) {
                return currentVote !== previousVote ? currentVote : retry();
            }, retry);
        }

        return check();
    }

    const knownVoteReady = getCurrentVote().then(function (vote) {
        knownVote = vote;
    }, function (error) {
        console.warn('RatingsNotifications: could not read the current vote', error);
    });

    function observeVote() {
        if (observingVote) {
            return;
        }

        observingVote = true;

        knownVoteReady
            .then(function () {
                return knownVote !== null ? knownVote : getCurrentVote();
            })
            .then(function (previousVote) {
                return waitForVoteChange(previousVote).then(function (currentVote) {
                    if (currentVote === null) {
                        return;
                    }

                    knownVote = currentVote;

                    if (currentVote === 0) {
                        return;
                    }

                    const reason = askReason(currentVote);

                    if (reason === null) {
                        return;
                    }

                    return updateReasonInLedger(reason, 0)
                        .then(function () {
                            dispatchReasonSaved();

                            if (!reasonsConfig.notify) {
                                mw.notify('Rating reason saved.', { type: 'success' });
                                return;
                            }

                            return sendNotification({
                                pageName: pageName,
                                vote: currentVote,
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
                return getCurrentVote().then(function (vote) {
                    knownVote = vote;
                }, function () {}).then(function () {
                    observingVote = false;
                });
            });
    }

    document.addEventListener(
        'click',
        function (event) {
            const button =
                event.target.closest &&
                event.target.closest('.ejt-up-btn, .ejt-down-btn');

            if (!button || button.getAttribute('aria-disabled') === 'true') {
                return;
            }

            const now = Date.now();

            if (now - lastObservedClick < 500) {
                return;
            }

            lastObservedClick = now;

            observeVote();
        },
        true
    );
});
(function () {
    'use strict';

    if (window.RatedReasonsAdminSelectorLoaded) {
        return;
    }
    window.RatedReasonsAdminSelectorLoaded = true;

    window.RatedReasonsRecipientSelector = function (users) {
        return new Promise(function (resolve) {
            const overlay = document.createElement('div');
            overlay.id = 'ratedreasons-admin-selector';
            overlay.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:16px';

            const panel = document.createElement('div');
            panel.style.cssText = 'box-sizing:border-box;width:min(460px,100%);max-height:80vh;overflow:auto;background:var(--theme-page-background-color,#fff);color:var(--theme-page-text-color,#222);border:1px solid var(--theme-border-color,#aaa);border-radius:10px;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,.35);font:14px/1.45 sans-serif';

            const heading = document.createElement('h2');
            heading.textContent = 'Choose administrators to notify';
            heading.style.cssText = 'margin:0 0 8px;font-size:20px';

            const description = document.createElement('p');
            description.textContent = 'Select one or more administrators who should receive this rating reason.';
            description.style.cssText = 'margin:0 0 14px';

            const list = document.createElement('div');
            list.style.cssText = 'display:flex;flex-direction:column;gap:8px;margin:0 0 18px';
            const checkboxes = [];

            users.forEach(function (user) {
                const label = document.createElement('label');
                label.style.cssText = 'display:flex;align-items:center;gap:9px;padding:7px 9px;border:1px solid var(--theme-border-color,#ccc);border-radius:6px;cursor:pointer';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = user.name;
                const name = document.createElement('span');
                name.textContent = user.name;
                label.appendChild(checkbox);
                label.appendChild(name);
                list.appendChild(label);
                checkboxes.push(checkbox);
            });

            const actions = document.createElement('div');
            actions.style.cssText = 'display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap';
            const cancel = document.createElement('button');
            cancel.type = 'button';
            cancel.textContent = 'Skip notification';
            cancel.style.cssText = 'padding:8px 12px;border:1px solid #888;border-radius:6px;background:transparent;color:inherit;cursor:pointer';
            const send = document.createElement('button');
            send.type = 'button';
            send.textContent = 'Send to selected';
            send.style.cssText = 'padding:8px 12px;border:0;border-radius:6px;background:#3578c8;color:#fff;cursor:pointer';

            function finish(value) {
                overlay.remove();
                resolve(value);
            }

            cancel.addEventListener('click', function () {
                finish(null);
            });
            send.addEventListener('click', function () {
                const selected = checkboxes.filter(function (box) {
                    return box.checked;
                }).map(function (box) {
                    return box.value;
                });
                if (!selected.length) {
                    window.alert('Select at least one administrator, or choose Skip notification.');
                    return;
                }
                finish(selected);
            });
            overlay.addEventListener('click', function (event) {
                if (event.target === overlay) {
                    finish(null);
                }
            });

            if (!users.length) {
                const empty = document.createElement('p');
                empty.textContent = 'No eligible administrators were found.';
                list.appendChild(empty);
                send.disabled = true;
                send.style.opacity = '0.5';
            }

            actions.appendChild(cancel);
            actions.appendChild(send);
            panel.appendChild(heading);
            panel.appendChild(description);
            panel.appendChild(list);
            panel.appendChild(actions);
            overlay.appendChild(panel);
            document.body.appendChild(overlay);
        });
    };
}());
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