window.BackToTopModern = true;
window.BackToTopSpeed = 450;
window.BackToTopStart = 700;

(function (window, $, mw) {
	'use strict';

	var ANA = window.ANAWikiUI = window.ANAWikiUI || {};

	if (ANA.loaded) {
		return;
	}
	ANA.loaded = true;

	/* ◢◤ ◢◤ ◢◤        Utilities        ◥◣ ◥◣ ◥◣ */
	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	function getRoot($content) {
		return $content && $content.length ? $content[0] : document;
	}

	function queryAll(root, selector) {
		return Array.prototype.slice.call(root.querySelectorAll(selector));
	}

	function writeClipboard(text) {
		if (navigator.clipboard && window.isSecureContext) {
			return navigator.clipboard.writeText(text);
		}

		return new Promise(function (resolve, reject) {
			var textarea = document.createElement('textarea');
			textarea.value = text;
			textarea.setAttribute('readonly', '');
			textarea.style.position = 'fixed';
			textarea.style.opacity = '0';
			document.body.appendChild(textarea);
			textarea.select();

			try {
				if (document.execCommand('copy')) {
					resolve();
				} else {
					reject(new Error('Copy command failed.'));
				}
			} catch (error) {
				reject(error);
			} finally {
				document.body.removeChild(textarea);
			}
		});
	}

	/* ◢◤ ◢◤ ◢◤        Code Copy Panels        ◥◣ ◥◣ ◥◣ */
	function getCopyText(button) {
		var selector = button.getAttribute('data-copy-target');
		var target;
		var panel;

		if (selector) {
			try {
				target = document.querySelector(selector);
			} catch (error) {
				target = null;
			}
		}

		if (!target) {
			panel = button.closest('.ana-code-panel');
			target = panel && panel.querySelector('pre, code');
		}

		return target ? target.textContent.replace(/^\n+|\n+$/g, '') : '';
	}

	function flashCopyState(button, success) {
		var original = button.getAttribute('data-mw-original-html');

		if (original === null) {
			button.setAttribute('data-mw-original-html', button.innerHTML);
			original = button.innerHTML;
		}

		button.textContent = success ? 'Copied' : 'Copy failed';
		button.setAttribute('aria-live', 'polite');
		button.classList.toggle('is-copied', success);
		button.classList.toggle('is-copy-error', !success);

		window.setTimeout(function () {
			button.innerHTML = original;
			button.classList.remove('is-copied', 'is-copy-error');
		}, 1400);
	}

	/* ◢◤ ◢◤ ◢◤        Slideshows        ◥◣ ◥◣ ◥◣ */
	function initSlideshows(root) {
		queryAll(root, '.ana-slideshow').forEach(function (slideshow) {
			var slides;
			var nav;
			var controls;
			var previous;
			var next;
			var dots = [];
			var index = 0;

			if (slideshow.getAttribute('data-ana-slideshow-ready') === '1') {
				return;
			}

			slides = queryAll(slideshow, '.ana-slideshow__slide');

			if (!slides.length) {
				return;
			}

			slideshow.setAttribute('data-ana-slideshow-ready', '1');
			slideshow.setAttribute(
				'role',
				slideshow.getAttribute('role') || 'region'
			);
			slideshow.setAttribute('aria-roledescription', 'carousel');

			if (!slideshow.hasAttribute('tabindex')) {
				slideshow.setAttribute('tabindex', '0');
			}

			function showSlide(nextIndex, focusDot) {
				index = (nextIndex + slides.length) % slides.length;

				slides.forEach(function (slide, slideIndex) {
					var current = slideIndex === index;

					slide.hidden = !current;
					slide.classList.toggle('is-current', current);
					slide.setAttribute(
						'aria-hidden',
						current ? 'false' : 'true'
					);
				});

				dots.forEach(function (dot, dotIndex) {
					var current = dotIndex === index;

					dot.classList.toggle('is-current', current);
					dot.setAttribute(
						'aria-current',
						current ? 'true' : 'false'
					);
				});

				if (focusDot && dots[index]) {
					dots[index].focus();
				}
			}

			if (slides.length > 1) {
				controls = slideshow.querySelector('.ana-slideshow__controls');

				if (!controls) {
					controls = document.createElement('div');
					controls.className = 'ana-slideshow__controls';
					controls.setAttribute('aria-label', 'Slideshow controls');
					slideshow.appendChild(controls);
				}

				previous = controls.querySelector('.ana-slideshow__prev');
				next = controls.querySelector('.ana-slideshow__next');

				if (!previous) {
					previous = document.createElement('button');
					previous.type = 'button';
					previous.className = 'ana-slideshow__prev';
					previous.setAttribute('aria-label', 'Previous slide');
					previous.textContent = '‹';
					controls.appendChild(previous);
				}

				if (!next) {
					next = document.createElement('button');
					next.type = 'button';
					next.className = 'ana-slideshow__next';
					next.setAttribute('aria-label', 'Next slide');
					next.textContent = '›';
					controls.appendChild(next);
				}

				previous.addEventListener('click', function () {
					showSlide(index - 1, false);
				});

				next.addEventListener('click', function () {
					showSlide(index + 1, false);
				});

				nav = slideshow.querySelector('.ana-slideshow__nav');

				if (!nav) {
					nav = document.createElement('div');
					nav.className = 'ana-slideshow__nav';
					nav.setAttribute('aria-label', 'Slideshow pagination');
					slideshow.appendChild(nav);
				}

				nav.innerHTML = '';

				slides.forEach(function (slide, slideIndex) {
					var dot = document.createElement('button');

					dot.type = 'button';
					dot.className = 'ana-slideshow__dot';
					dot.setAttribute(
						'aria-label',
						'Show slide ' + (slideIndex + 1)
					);

					dot.addEventListener('click', function () {
						showSlide(slideIndex, false);
					});

					nav.appendChild(dot);
					dots.push(dot);
				});
			}

			slideshow.addEventListener('keydown', function (event) {
				if (event.key === 'ArrowLeft') {
					event.preventDefault();
					showSlide(index - 1, false);
				} else if (event.key === 'ArrowRight') {
					event.preventDefault();
					showSlide(index + 1, false);
				} else if (event.key === 'Home') {
					event.preventDefault();
					showSlide(0, false);
				} else if (event.key === 'End') {
					event.preventDefault();
					showSlide(slides.length - 1, false);
				}
			});

			showSlide(0, false);
		});
	}

	/* ◢◤ ◢◤ ◢◤        Inline Spoilers        ◥◣ ◥◣ ◥◣ */
	function initInlineSpoilers(root) {
		queryAll(root, '.ana-spoiler-inline').forEach(function (spoiler) {
			if (spoiler.getAttribute('data-ana-spoiler-ready') === '1') {
				return;
			}

			spoiler.setAttribute('data-ana-spoiler-ready', '1');
			spoiler.setAttribute(
				'role',
				spoiler.getAttribute('role') || 'button'
			);
			spoiler.setAttribute(
				'tabindex',
				spoiler.getAttribute('tabindex') || '0'
			);
			spoiler.setAttribute(
				'aria-expanded',
				spoiler.classList.contains('is-revealed')
					? 'true'
					: 'false'
			);

			function toggle() {
				var revealed =
					spoiler.classList.toggle('is-revealed');

				spoiler.setAttribute(
					'aria-expanded',
					revealed ? 'true' : 'false'
				);
			}

			spoiler.addEventListener('click', toggle);

			spoiler.addEventListener('keydown', function (event) {
				if (
					event.key === 'Enter' ||
					event.key === ' '
				) {
					event.preventDefault();
					toggle();
				}
			});
		});
	}

	/* ◢◤ ◢◤ ◢◤        Progress Meters        ◥◣ ◥◣ ◥◣ */
	function initProgressMeters(root) {
		queryAll(root, '[data-ana-progress]').forEach(function (meter) {
			var raw = meter.getAttribute('data-value');
			var value = clamp(parseFloat(raw) || 0, 0, 100);
			var valueLabel =
				meter.querySelector('.ana-progress__value');

			meter.style.setProperty(
				'--ana-progress-value',
				value + '%'
			);

			meter.setAttribute(
				'role',
				meter.getAttribute('role') || 'progressbar'
			);

			meter.setAttribute(
				'aria-valuemin',
				meter.getAttribute('aria-valuemin') || '0'
			);

			meter.setAttribute(
				'aria-valuemax',
				meter.getAttribute('aria-valuemax') || '100'
			);

			meter.setAttribute(
				'aria-valuenow',
				String(value)
			);

			if (
				valueLabel &&
				!valueLabel.getAttribute('data-static-value')
			) {
				valueLabel.textContent = value + '%';
			}
		});
	}

	/* ◢◤ ◢◤ ◢◤        Index Filtering        ◥◣ ◥◣ ◥◣ */
	function applyIndexFilter(container) {
		var filter =
			container.getAttribute('data-ana-active-filter') ||
			'all';

		var letter =
			container.getAttribute('data-ana-active-letter') ||
			'all';

		var items =
			queryAll(container, '[data-ana-index-item]');

		items.forEach(function (item) {
			var tags =
				(item.getAttribute('data-tags') || '')
					.toLowerCase()
					.split(/\s+/)
					.filter(Boolean);

			var itemLetter =
				(item.getAttribute('data-letter') || '')
					.toLowerCase();

			var filterMatch =
				filter === 'all' ||
				tags.indexOf(filter.toLowerCase()) !== -1;

			var letterMatch =
				letter === 'all' ||
				itemLetter === letter.toLowerCase();

			item.hidden = !(filterMatch && letterMatch);
		});
	}

	function updateCurrentControl(group, selector, current) {
		queryAll(group, selector).forEach(function (control) {
			var active = control === current;

			control.classList.toggle('is-current', active);

			if (control.tagName === 'BUTTON') {
				control.setAttribute(
					'aria-pressed',
					active ? 'true' : 'false'
				);
			} else if (active) {
				control.setAttribute('aria-current', 'true');
			} else {
				control.removeAttribute('aria-current');
			}
		});
	}

	/* ◢◤ ◢◤ ◢◤        Archive Sorting        ◥◣ ◥◣ ◥◣ */
	function sortArchive(control) {
		var targetSelector =
			control.getAttribute('data-sort-target');

		var mode =
			control.getAttribute('data-sort');

		var target;
		var items;

		if (!targetSelector || !mode) {
			return;
		}

		try {
			target = document.querySelector(targetSelector);
		} catch (error) {
			target = null;
		}

		if (!target) {
			return;
		}

		items =
			Array.prototype.slice
				.call(target.children)
				.filter(function (item) {
					return item.hasAttribute(
						'data-ana-archive-item'
					);
				});

		items.sort(function (a, b) {
			var aKey;
			var bKey;

			var direction =
				mode.indexOf('-desc') !== -1
					? -1
					: 1;

			if (mode.indexOf('title-') === 0) {
				aKey =
					(
						a.getAttribute('data-title') ||
						a.textContent
					)
						.trim()
						.toLowerCase();

				bKey =
					(
						b.getAttribute('data-title') ||
						b.textContent
					)
						.trim()
						.toLowerCase();
			} else {
				aKey =
					a.getAttribute('data-date') || '';

				bKey =
					b.getAttribute('data-date') || '';
			}

			return aKey.localeCompare(bKey) * direction;
		});

		items.forEach(function (item) {
			target.appendChild(item);
		});
	}

	/* ◢◤ ◢◤ ◢◤        Active TOC Tracking        ◥◣ ◥◣ ◥◣ */
	function initTocTracking(root) {
		var toc = root.querySelector('.toc');
		var links;
		var pairs;

		if (
			!toc ||
			toc.getAttribute('data-ana-toc-tracking-ready') === '1' ||
			!('IntersectionObserver' in window)
		) {
			return;
		}

		links = queryAll(toc, 'a[href^="#"]');

		pairs = links.map(function (link) {
			var href = link.getAttribute('href') || '';
			var id;
			var heading;

			if (href.length < 2) {
				return null;
			}

			try {
				id = decodeURIComponent(href.slice(1));
			} catch (error) {
				id = href.slice(1);
			}

			heading = document.getElementById(id);

			return heading ? {
				link: link,
				heading: heading
			} : null;
		}).filter(Boolean);

		if (!pairs.length) {
			return;
		}

		toc.setAttribute('data-ana-toc-tracking-ready', '1');

		function activate(link) {
			links.forEach(function (tocLink) {
				tocLink.classList.toggle(
					'is-active',
					tocLink === link
				);
			});
		}

		pairs.forEach(function (pair) {
			pair.link.addEventListener('click', function () {
				activate(pair.link);
			});
		});

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				var pair;

				if (!entry.isIntersecting) {
					return;
				}

				pair = pairs.find(function (candidate) {
					return candidate.heading === entry.target;
				});

				if (pair) {
					activate(pair.link);
				}
			});
		}, {
			rootMargin: '0px 0px -72% 0px',
			threshold: 0
		});

		pairs.forEach(function (pair) {
			observer.observe(pair.heading);
		});
	}

	/* ◢◤ ◢◤ ◢◤        Global Events        ◥◣ ◥◣ ◥◣ */
	if (!ANA.eventsBound) {
		ANA.eventsBound = true;

		$(document).on(
			'click.anaWikiUI',
			'.ana-code-panel__copy',
			function (event) {
				var button = event.currentTarget;
				var text = getCopyText(button);

				event.preventDefault();

				if (!text) {
					flashCopyState(button, false);
					return;
				}

				writeClipboard(text)
					.then(function () {
						flashCopyState(button, true);
					})
					.catch(function () {
						flashCopyState(button, false);
					});
			}
		);

		$(document).on(
			'click.anaWikiUI',
			'.ana-index-filter[data-filter]',
			function (event) {
				var control = event.currentTarget;
				var container =
					control.closest('.ana-index');

				if (!container) {
					return;
				}

				event.preventDefault();

				container.setAttribute(
					'data-ana-active-filter',
					control.getAttribute('data-filter') ||
						'all'
				);

				updateCurrentControl(
					container,
					'.ana-index-filter[data-filter]',
					control
				);

				applyIndexFilter(container);
			}
		);

		$(document).on(
			'click.anaWikiUI',
			'.ana-index-alpha [data-letter]',
			function (event) {
				var control = event.currentTarget;
				var container =
					control.closest('.ana-index');

				if (!container) {
					return;
				}

				event.preventDefault();

				container.setAttribute(
					'data-ana-active-letter',
					control.getAttribute('data-letter') ||
						'all'
				);

				updateCurrentControl(
					container,
					'.ana-index-alpha [data-letter]',
					control
				);

				applyIndexFilter(container);
			}
		);

		$(document).on(
			'click.anaWikiUI',
			'.ana-archive-control[data-sort][data-sort-target]',
			function (event) {
				var control = event.currentTarget;
				var controls =
					control.closest('.ana-archive-controls');

				event.preventDefault();

				sortArchive(control);

				if (controls) {
					updateCurrentControl(
						controls,
						'.ana-archive-control[data-sort]',
						control
					);
				}
			}
		);
	}

	/* ◢◤ ◢◤ ◢◤        Content Initialization        ◥◣ ◥◣ ◥◣ */
	mw.hook('wikipage.content').add(function ($content) {
		var root = getRoot($content);

		initSlideshows(root);
		initInlineSpoilers(root);
		initProgressMeters(root);
		initTocTracking(root);

		queryAll(root, '.ana-index').forEach(function (index) {
			if (
				index.querySelector(
					'[data-ana-index-item]'
				)
			) {
				applyIndexFilter(index);
			}
		});
	});
}(window, jQuery, mediaWiki));