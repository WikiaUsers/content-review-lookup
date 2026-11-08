/*
Rating System
Author: [[User:!Davin012613]]
Description: Adds a rating system to every page. You can dislike or like pages.
(This script was taken from the JTOH wiki but was expanded on so it had a dislike system as well)


Optional configuration:

	window.RatingSystemConfig = {
		ledgerTitle: 'Project:Ratings',		// page where the votes are stored
		shard: false,						// true: one subpage per initial letter (Project:Ratings/A, ...)
		namespaces: [0],					// namespaces where the widget is shown
		minWidth: 768,						// narrower screens do not get the widget (px)
		maxRetries: 3,						// extra attempts after an edit conflict
		disable: false						// 'likes' or 'dislikes': hides that button and leaves those votes out of the score
	};

Hook for add-ons: mw.hook('RatingSystem.voted') is fired after each saved vote, once the widget shows the new
score, with { page, user, vote, previousVote, ledgerTitle }. vote and previousVote are 1, -1 or 0 (no vote).

*/
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