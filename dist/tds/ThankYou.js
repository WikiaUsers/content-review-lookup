/**
 * Name:        ThankYou
 * Version:     v1.0ae
 * Author:      bitomic [[User:Arzerk]]
 *              t7ru [[User:Gabonnie]]
 * Description: Forked version to tailor it for Alterpedia.
 */
(() => {
	'use strict';

	window.dev = window.dev || {};
	window.dev.thankyou = window.dev.thankyou || {
		maxDays: window.tyMaxDays || 30,
		mode: window.tyMode || 'latest',
		position: window.tyPosition || -1
	};

	if (window.dev.thankyou.enabled) return;
	window.dev.thankyou.enabled = true;

	const config = mw.config.get([
		'wgAction',
		'wgArticleId',
		'wgNamespaceNumber',
		'wgPageName',
		'wgUserName'
	]);

	if (!config.wgUserName || config.wgAction !== 'view' || config.wgNamespaceNumber !== 0 || config.wgArticleId === 0) {
		return;
	}

	const options = window.dev.thankyou;
	let api;

	function initialize(CustomTools) {
		queryUsers()
			.then(filterUsers)
			.then(loadAvatars)
			.then(() => {
				CustomTools({
					classes: 'thankyou__button',
					icon: 'heart',
					placement: 'page-tools-left',
					position: options.position,
					text: 'Give your thanks to the TDS wikilings!'
				});
			})
			.then(findSelector.bind(undefined, '.thankyou__button'))
			.then(buttonHandler);
	}

	function isThanksEnabled() {
		const promise = $.Deferred();

		api.get({
			action: 'query',
			format: 'json',
			formatversion: 2,
			meta: 'siteinfo',
			siprop: 'extensions'
		}).then(result => {
			const thanks = result.query.extensions.find(item => item.name === 'Thanks');
			promise.resolve(thanks);
		});

		return promise;
	}

	function queryUsers() {
		const promise = $.Deferred();

		api.get({
			action: 'query',
			format: 'json',
			formatversion: 2,
			maxage: 300,
			prop: 'revisions',
			rvlimit: 100,
			rvprop: ['ids', 'user', 'userid', 'size', 'timestamp'].join('|'),
			smaxage: 300,
			titles: config.wgPageName
		}).then(result => {
			const revisions = result.query.pages[0].revisions;
			const users = [];
			const ipRegex = /^\d+\.\d+\.\d+\.\d+$/;

			for (let i = 0; i < revisions.length; i++) {
				if (users.length >= 50) break;
				const revision = revisions[i];
				if (ipRegex.test(revision.user)) continue;

				const alreadyStored = users.some(item => item.user === revision.user);
				if (!alreadyStored) users.push(revision);
			}

			options.editorsCount = users.length;
			promise.resolve(users);
		});

		return promise;
	}

	function filterUsers(users) {
		const promise = $.Deferred();

		const usernames = users.map(item => item.user);

		api.get({
			action: 'query',
			format: 'json',
			formatversion: 2,
			list: 'users',
			maxage: 600,
			smaxage: 600,
			usprop: 'blockinfo|groups',
			ususers: usernames.join('|')
		}).then(result => {
			const validNames = result.query.users
				.filter(item => !item.invalid && !item.missing && !item.blockid && !item.groups.some(g => g === 'bot' || g === 'bot-global'))
				.map(item => item.name);

			const list = [];
			for (let i = 0; i < users.length; i++) {
				const user = users[i].user;
				if (validNames.includes(user)) list.push(users[i]);
				if (list.length >= 8) break;
			}

			promise.resolve(list);
		});

		return promise;
	}

	function loadAvatars(users) {
		const promise = $.Deferred();
		const ids = users.map(u => u.userid).join('&id=');

		$.ajax({
			url: `https://services.fandom.com/user-attribute/user/bulk?id=${ids}`,
			method: 'GET',
			success: result => {
				const data = result.users || {};

				for (const user of users) {
					const profile = data[user.userid];
					if (!profile) {
						user.avatar = 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg';
						continue;
					}

					user.avatar = profile.avatar || 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg';
					if (/\/[0-9a-f-]+$/.test(user.avatar)) {
						user.avatar += '/thumbnail/width/50/height/50';
					}
				}

				options.users = users;
				promise.resolve(users);
			},
			error: () => {
				for (const user of users) {
					user.avatar = 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg';
				}
				options.users = users;
				promise.resolve(users);
			}
		});

		return promise;
	}

	function buttonHandler(button) {
		const messages = {
			description: count => {
				const noun = count === 1 ? 'wikiling' : 'wikilings';
				const verb = count === 1 ? 'has' : 'have';
				return `${count} ${noun} ${verb} contributed to this article!`;
			},
			user: user => `Show your appreciation to <b>${user}</b>?`,
			thankUser: 'Thank you!',
			yourself: "You cannot thank yourself!",
			tooOld: "This edit is too old to thank!",
			sent: user => `Thank sent to ${user}!`,
			success: user => `Thank you sent successfully to <b>${user}</b>!`,
			fail: user => `Failed to thank <b>${user}</b>`
		};

		const content = document.createElement('div');
		content.classList.add('thankyou__container');

		const description = document.createElement('div');
		description.classList.add('thankyou__description');
		description.innerText = messages.description(options.editorsCount);
		content.append(description);

		const avatars = document.createElement('div');
		avatars.classList.add('thankyou__users');
		content.append(avatars);

		const action = document.createElement('div');
		action.classList.add('thankyou__action');
		content.append(action);

		const text = document.createElement('p');
		text.classList.add('thankyou__text');
		text.innerText = 'Hover on an avatar!';
		action.append(text);

		const thanksButton = document.createElement('button');
		thanksButton.classList.add('wds-button');
		thanksButton.disabled = true;
		thanksButton.innerText = messages.thankUser;
		action.append(thanksButton);

		for (let i = 0; i < options.users.length; i++) {
			const item = options.users[i];
			const avatar = document.createElement('img');
			avatar.classList.add('thankyou__avatar');
			avatar.title = item.user;
			avatar.src = item.avatar;
			avatar.width = 30;
			avatar.dataset.revid = item.revid;
			avatar.dataset.timestamp = item.timestamp;
			avatar.dataset.user = item.user;
			avatar.dataset.userid = item.userid;

			avatars.append(avatar);

			avatar.addEventListener('mouseenter', function () {
				document.querySelectorAll('.thankyou__avatar').forEach(a => {
					a.classList.remove('is-selected');
				});
				this.classList.add('is-selected');

				text.innerHTML = messages.user(this.dataset.user);

				if (thanksButton.disabled && thanksButton.dataset.revid) {
					thanksButton.innerText = messages.thankUser;
				}

				const isTooOld = Date.now() - new Date(this.dataset.timestamp).getTime() > 1000 * 60 * 60 * 24 * options.maxDays;
				const isYourself = this.dataset.user === config.wgUserName;

				thanksButton.disabled = this.dataset.thanked || isYourself || isTooOld;
				thanksButton.dataset.revid = this.dataset.revid;
				thanksButton.dataset.user = this.dataset.user;

				if (isYourself) {
					text.innerText = messages.yourself;
				} else if (isTooOld) {
					text.innerText = messages.tooOld;
				}
			});
		}

		button.addEventListener('click', function () {
			const box = document.querySelector('#tooltip-thankyou-wrapper');
			if (box) {
				box.remove();
				return;
			}

			const tooltip = $('<div>', {
				class: 'wds-tooltip is-right',
				css: {
					left: ($(this).offset().left + 50) + 'px',
					top: ($(this).offset().top - $(document).scrollTop() + 20) + 'px',
					'z-index': 999
				},
				id: 'tooltip-thankyou-wrapper',
				html: content
			}).appendTo('body');

			document.addEventListener('click', function handler(e) {
				if (!tooltip[0].contains(e.target) && !button.contains(e.target)) {
					tooltip[0].remove();
					document.removeEventListener('click', handler);
				}
			});
		});

		thanksButton.addEventListener('click', function thanksUser() {
			this.disabled = true;
			const revid = this.dataset.revid;
			const user = this.dataset.user;

			const avatar = document.querySelector(`.thankyou__avatar[data-user="${user}"]`);
			if (avatar) avatar.dataset.thanked = true;

			this.innerText = messages.sent(user);

			const textEl = document.querySelector('.thankyou__text');

			api.postWithToken('csrf', {
				action: 'thank',
				rev: revid,
				source: 'dev-thankyou'
			}).then(() => {
				textEl.innerHTML = messages.success(user);
			}).catch(() => {
				textEl.innerHTML = messages.fail(user);
			});
		});
	}

	function findSelector(selector) {
		const promise = $.Deferred();
		const interval = setInterval(() => {
			const element = document.querySelector(selector);
			if (element) {
				clearInterval(interval);
				promise.resolve(element);
			}
		}, 300);
		return promise;
	}

	mw.hook('dev.ct').add(CustomTools => {
		api = new mw.Api();

		isThanksEnabled().then(enabled => {
			if (enabled) initialize(CustomTools);
		});
	});

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:CustomTools.js'
	});
	importArticle({
		type: 'style',
		article: 'MediaWiki:ThankYou.css'
	});
})();