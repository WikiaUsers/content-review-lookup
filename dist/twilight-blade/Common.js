(function () {
	'use strict';

	mw.loader.using('mediawiki.api').then(function () {
		$(function () {
			if (document.getElementById('tb-character-tooltip')) return;

			var api = new mw.Api();
			var cache = Object.create(null);
			var active = null;
			var timer;
			var suppressed = false;

			var card = document.createElement('div');
			card.id = 'tb-character-tooltip';
			card.className = 'tb-character-tooltip';
			card.setAttribute('role', 'tooltip');
			card.hidden = true;
			document.body.appendChild(card);

			function hide() {
				clearTimeout(timer);
				if (active) {
					var ids = (active.getAttribute('aria-describedby') || '')
						.split(/\s+/)
						.filter(function (id) {
							return id && id !== card.id;
						});
					if (ids.length) {
						active.setAttribute('aria-describedby', ids.join(' '));
					} else {
						active.removeAttribute('aria-describedby');
					}
				}
				active = null;
				card.hidden = true;
			}

			function getDescription(title) {
				if (!cache[title]) {
					cache[title] = api.get({
						action: 'parse',
						page: title,
						prop: 'text',
						redirects: 1,
						formatversion: 2
					}).then(function (data) {
						var doc = new DOMParser().parseFromString(
							data.parse.text, 'text/html'
						);
						var description = doc.querySelector(
							'.tb-character-description'
						);
						return description ? {
							name: data.parse.title,
							text: description.textContent.trim()
						} : null;
					}, function () {
						delete cache[title];
						return null;
					});
				}
				return cache[title];
			}

			function show(link, preview) {
				if (active !== link || suppressed || !preview || !preview.text) return;

				var heading = document.createElement('strong');
				var text = document.createElement('p');
				heading.textContent = preview.name;
				text.textContent = preview.text;
				card.textContent = '';
				card.appendChild(heading);
				card.appendChild(text);

				/* Avoid a second, native browser tooltip. */
				if (link.hasAttribute('title')) {
					link.setAttribute('data-tb-original-title', link.title);
					link.removeAttribute('title');
				}

				var ids = link.getAttribute('aria-describedby') || '';
				link.setAttribute('aria-describedby', (ids + ' ' + card.id).trim());
				card.hidden = false;

				var rect = link.getBoundingClientRect();
				var left = Math.max(12, Math.min(
					rect.left,
					window.innerWidth - card.offsetWidth - 12
				));
				var top = rect.bottom + 9;

				if (top + card.offsetHeight > window.innerHeight - 12) {
					top = rect.top - card.offsetHeight - 9;
				}

				card.style.left = left + 'px';
				card.style.top = Math.max(12, top) + 'px';
			}

			var selector = '.mw-parser-output a[href]';

			$(document).on('mouseenter focusin', selector, function (event) {
				if (event.type === 'mouseenter' &&
					!window.matchMedia('(hover: hover)').matches) return;

				var link = this;
				var url;
				try {
					url = new URL(link.href, location.href);
				} catch (error) {
					return;
				}

				if (url.origin !== location.origin ||
					link.classList.contains('new') ||
					link.classList.contains('external')) return;

				var title = link.getAttribute('data-tb-original-title') ||
					link.getAttribute('title');
				if (!title || title.indexOf(':') !== -1) return;

				hide();
				suppressed = false;
				active = link;

				timer = setTimeout(function () {
					getDescription(title).then(function (preview) {
						show(link, preview);
					});
				}, 300);
			});

			$(document).on('mouseleave focusout', selector, function () {
				if (active === this) hide();
			});

			document.addEventListener('keydown', function (event) {
				if (event.key === 'Escape') {
					suppressed = true;
					hide();
				}
			});

			window.addEventListener('scroll', hide, true);
			window.addEventListener('resize', hide);
		});
	});
}());