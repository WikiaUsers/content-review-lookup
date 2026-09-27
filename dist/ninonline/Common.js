/* World Blessing chip: the live Toad blessings on every page of the wiki.
 *
 * Reads Template:Blessing/Data (Unix end times per blessing kind), which NinWikiBot
 * rewrites from the game's #toad-news feed each time someone blesses Toad. A blessing
 * lasts one hour and a new one resets the hour.
 *
 * Same-origin, read-only API request; no external requests.
 * Hidden on the front page (its NIN NEWS ticker already shows the pills) and hidden
 * whenever no blessing is running.
 */
(function () {
	'use strict';
	if (window.ninBlessingChip) {
		return;
	}
	window.ninBlessingChip = true;

	var config = window.mw && window.mw.config;
	if (config && config.get('wgIsMainPage')) {
		return;
	}

	var scriptPath = config ? config.get('wgScriptPath') : '';
	var api = scriptPath + '/api.php?action=query&prop=revisions&titles=Template:Blessing/Data' +
		'&rvprop=content&rvslots=main&format=json&maxage=30&smaxage=30';
	var kinds = [
		{ key: 'exp', icon: '🟣', label: 'EXP', cls: 'nin-bchip-exp', name: 'Experience' },
		{ key: 'drop', icon: '🟢', label: 'DROP', cls: 'nin-bchip-drop', name: 'Drop Rate' }
	];
	var ends = {};
	var rates = {};
	var boxes = [];

	function parse(text) {
		var re = /\|(exp|drop)_(end|rate)=([\d.]+)/g;
		var m;
		while ((m = re.exec(text)) !== null) {
			if (m[2] === 'end') {
				ends[m[1]] = parseInt(m[3], 10);
			} else {
				rates[m[1]] = m[3];
			}
		}
	}

	function left(seconds) {
		var minutes = Math.max(1, Math.ceil(seconds / 60));
		return minutes >= 60 ? '1h' : minutes + 'm';
	}

	function render() {
		var now = Date.now() / 1000;
		var html = '';
		var active = 0;
		kinds.forEach(function (k) {
			var end = ends[k.key] || 0;
			if (end > now) {
				active += 1;
				html += '<a class="nin-bchip ' + k.cls + '" href="' + (config ? config.get('wgArticlePath').replace('$1', 'World_Blessing') : '/wiki/World_Blessing') +
					'" title="World Blessing: everyone online gets ' + (rates[k.key] || '') + 'x ' + k.name +
					'. Ends in ' + left(end - now) + '.">' + k.icon + '<span class="nin-bchip-label"> ' + k.label + '</span> ×' + (rates[k.key] || '') +
					' <span class="nin-bchip-time">' + left(end - now) + '</span></a>';
			}
		});
		boxes.forEach(function (box) {
			box.innerHTML = html;
			box.style.display = active ? '' : 'none';
			box.classList.toggle('is-double', active === 2);
		});
	}

	function load(attempt) {
		attempt = attempt || 0;
		// A fresh URL per attempt: once, a CDN edge answered with an HTML error page, and a
		// retry of the SAME URL was served that same cached page. 30 s buckets keep the
		// normal path cacheable; each retry gets its own URL.
		fetch(api + '&_=' + Math.floor(Date.now() / 30000) + (attempt ? '-' + attempt : ''), { credentials: 'same-origin' })
			.then(function (r) { return r.json(); })
			.then(function (data) {
				var pages = data && data.query && data.query.pages;
				var id = pages && Object.keys(pages)[0];
				var rev = id && pages[id].revisions && pages[id].revisions[0];
				var text = rev && ((rev.slots && rev.slots.main && rev.slots.main['*']) || rev['*']);
				if (!text) {
					throw new Error('Template:Blessing/Data came back empty');
				}
				parse(text);
				render();
			})
			.catch(function (err) {
				// Stay hidden, say why in the console, and try again shortly rather than
				// waiting two minutes for the next scheduled refresh.
				if (window.console) {
					window.console.warn('[World Blessing chip] load failed:', err);
				}
				if (attempt < 3) {
					setTimeout(function () { load(attempt + 1); }, 5000 * (attempt + 1));
				}
			});
	}

	function makeBox(extra) {
		var box = document.createElement('span');
		box.className = 'nin-bless-chips' + (extra ? ' ' + extra : '');
		box.style.display = 'none';
		boxes.push(box);
		return box;
	}

	function mount() {
		// FandomDesktop: next to the wiki name in the community header, and in the sticky
		// header that replaces it on scroll. Anything else: a floating chip, never nothing.
		var header = document.querySelector('.fandom-community-header__top-container');
		var sticky = document.querySelector('.fandom-sticky-header');
		// Straight after the wiki name, not at the end of the row (that is past the tool buttons).
		var name = document.querySelector('.fandom-community-header__community-name-wrapper');
		var stickyName = document.querySelector('.fandom-sticky-header__sitename');
		if (header) {
			header.insertBefore(makeBox(), name && name.parentNode === header ? name.nextSibling : null);
		}
		if (sticky) {
			sticky.insertBefore(makeBox('is-sticky'), stickyName && stickyName.parentNode === sticky ? stickyName.nextSibling : null);
		}
		if (!header && !sticky) {
			document.body.appendChild(makeBox('is-floating'));
		}
		load();
		setInterval(render, 30000);
		setInterval(function () { load(0); }, 120000);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', mount);
	} else {
		mount();
	}
}());