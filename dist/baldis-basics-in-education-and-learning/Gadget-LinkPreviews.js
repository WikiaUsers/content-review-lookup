// link previews for baldi's basics wiki
(function () {
	var initialized = false;

	function init() {
		if (initialized) return;
		initialized = true;

		var HOVER_DELAY = 500;
		var FADE_MS = 250;
		var EXCLUDED_NAMESPACES = ['File', 'Talk', 'User_talk', 'User', 'Message_Wall', 'File_talk', 'Template_talk', 'Special', 'MediaWiki'];
		var LOADER_SRC = 'https://static.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/6/64/Sticker_Hourglass.png';
		var GAP = 6;

		var cache = {};
		var root = document.querySelector('#content')

		var box = document.createElement('div');
		box.id = 'link-preview-box';
		document.body.appendChild(box);

		var hoverTimer, closeTimer, currentLink;

		function stripTooltips(scope) {
			var links = scope.querySelectorAll('a[title]');
			for (var i = 0; i < links.length; i++) {
				var a = links[i];
				a.dataset.title = a.getAttribute('title');
				a.removeAttribute('title');
			}
		}

		stripTooltips(root);
		var observer = new MutationObserver(function () {
			stripTooltips(root);
		});
		observer.observe(root, { childList: true, subtree: true });

		function removeBalanced(str, open, close) {
			var result = '', depth = 0, i = 0;
			while (i < str.length) {
				if (str.indexOf(open, i) === i) { depth++; i += open.length; }
				else if (depth > 0 && str.indexOf(close, i) === i) { depth--; i += close.length; }
				else if (depth > 0) { i++; }
				else { result += str[i]; i++; }
			}
			return result;
		}

		function cleanWikitext(wikitext) {
			var text = wikitext;
			text = text.replace(/<!--[\s\S]*?-->/g, '');
			text = text.replace(/<ref[^>]*\/>/gi, '');
			text = text.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '');
			text = removeBalanced(text, '{{', '}}');
			text = removeBalanced(text, '{|', '|}');
			text = text.replace(/\[\[(File|Image|Category):[^\]]*\]\]/gi, '');
			text = text.replace(/\[\[([^\]|]*)\|([^\]]+)\]\]/g, '$2');
			text = text.replace(/\[\[([^\]]+)\]\]/g, '$1');
			text = text.replace(/\[https?:\/\/[^\s\]]+\s+([^\]]+)\]/g, '$1');
			text = text.replace(/\[https?:\/\/[^\s\]]+\]/g, '');
			text = text.replace(/'''''|'''|''/g, '');
			text = text.replace(/<[^>]+>/g, '');
			text = text.replace(/\s+/g, ' ');
			text = text.replace(/^\s+|\s+$/g, '');
			return text;
		}

		function firstSentence(text) {
			var i = text.indexOf('.');
			return i === -1 ? text : text.slice(0, i + 1);
		}

		var namespacePattern = new RegExp('^(' + EXCLUDED_NAMESPACES.join('|') + '):', 'i');

		function getTitleFromLink(link) {
			if (link.hostname !== location.hostname) return null;
			if (link.search.indexOf('action=') !== -1) return null;

			var match = link.pathname.match(/\/wiki\/([^?#]+)/);
			if (!match) return null;

			var title = decodeURIComponent(match[1]);
			if (namespacePattern.test(title)) return null;

			return title;
		}

		function fetchPreview(title, callback) {
			if (Object.prototype.hasOwnProperty.call(cache, title)) {
				callback(cache[title]);
				return;
			}

			var api = mw.util.wikiScript('api');
			var url = api + '?action=query&format=json&formatversion=2&origin=*' +
				'&prop=revisions|pageimages&rvprop=content&rvslots=main' +
				'&piprop=thumbnail&pithumbsize=300&titles=' + encodeURIComponent(title);

			fetch(url)
				.then(function (res) { return res.json(); })
				.then(function (data) {
					var page = data.query && data.query.pages && data.query.pages[0];
					if (!page || page.missing) {
						cache[title] = null;
						callback(null);
						return;
					}

					var wikitext = '';
					if (page.revisions && page.revisions[0] && page.revisions[0].slots && page.revisions[0].slots.main) {
						wikitext = page.revisions[0].slots.main.content || '';
					}

					var intro = firstSentence(cleanWikitext(wikitext));
					var thumbnail = (page.thumbnail && page.thumbnail.source) || null;

					var result = { intro: intro, thumbnail: thumbnail };
					cache[title] = result;
					callback(result);
				})
				.catch(function () {
					callback(null);
				});
		}

		function positionBox(link) {
			var rect = link.getBoundingClientRect();
			var boxHeight = box.offsetHeight;

			var spaceBelow = window.innerHeight - rect.bottom;
			var spaceAbove = rect.top;r

			var placeAbove = spaceBelow < (boxHeight + GAP) && spaceAbove > spaceBelow;

			var left = rect.left + window.scrollX + (rect.width / 2) - (box.offsetWidth / 2);
			var top = placeAbove
				? rect.top + window.scrollY - boxHeight - GAP
				: rect.bottom + window.scrollY + GAP;

			var clampedLeft = Math.max(8, Math.min(left, document.documentElement.scrollWidth - box.offsetWidth - 8));
			box.style.left = clampedLeft + 'px';
			box.style.top = top + 'px';
		}

		function showBox(data, link) {
			box.classList.remove('is-closing');
			box.innerHTML = '';

			if (data.thumbnail) {
				var loader = document.createElement('img');
				loader.className = 'link-preview-loader';
				loader.src = LOADER_SRC;
				box.appendChild(loader);

				var img = document.createElement('img');
				img.style.display = 'none';
				img.addEventListener('load', function () {
					loader.remove();
					img.style.display = 'block';
					positionBox(link);
				}, { once: true });
				img.src = data.thumbnail;
				box.appendChild(img);
			}

			var p = document.createElement('p');
			p.textContent = data.intro;
			box.appendChild(p);

			box.classList.add('is-visible');
			positionBox(link);
		}

		function hideBox() {
			box.classList.remove('is-visible');
			box.classList.add('is-closing');
			clearTimeout(closeTimer);
			closeTimer = setTimeout(function () {
				box.classList.remove('is-closing');
			}, FADE_MS);
		}

		function getHoverLink(e) {
			var link = e.target.closest('a[href]');
			if (!link || link.contains(e.relatedTarget)) return null;
			return link;
		}

		root.addEventListener('mouseover', function (e) {
			var link = getHoverLink(e);
			if (!link) return;

			var title = getTitleFromLink(link);
			if (!title) return;

			clearTimeout(closeTimer);
			box.classList.remove('is-closing');
			box.classList.remove('is-visible');

			currentLink = link;
			clearTimeout(hoverTimer);
			hoverTimer = setTimeout(function () {
				fetchPreview(title, function (data) {
					if (data && currentLink === link) showBox(data, link);
				});
			}, HOVER_DELAY);
		});

		root.addEventListener('mouseout', function (e) {
			var link = getHoverLink(e);
			if (!link) return;

			clearTimeout(hoverTimer);
			if (currentLink === link) {
				currentLink = null;
				hideBox();
			}
		});
	}

	if (typeof mw !== 'undefined' && mw.hook) {
		mw.hook('wikipage.content').add(init);
	} else if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();