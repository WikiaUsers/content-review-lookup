/* <pre> */
/* smth like mw:Extension:Popups */
/* popup on link:hover + viewport prefetch */
/* maintainer: user:fngplg */
/* classes: main: npage-preview, image not found: npage-preview-noimage */
/* img: <img>, text: <div> */
(function wrapper($) {
	const urlVars = new URLSearchParams(location.search);
	const Settings = window.pPreview || {},
		mwc = mw.config.get(['wgSassParams', 'wgArticlePath']);
	Settings.debug = urlVars.get('debug') || urlVars.get('debug1') || (Settings.debug !== undefined ? Settings.debug : false);

	// killswitch
	Settings.dontrun = urlVars.get('nolp');
	if (Settings.dontrun) return;

	// default values
	const Defaults = {
		dock: '#mw-content-text, #article-comments',
		defimage:
			'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru',
		noimage:
			'https://vignette.wikia.nocookie.net/borderlands/images/f/f5/%D0%97%D0%B0%D0%B3%D0%BB%D1%83%D1%88%D0%BA%D0%B0.png/revision/latest/scale-to-width-down/200?cb=20160122074659&path-prefix=ru',
	}; // defaults
	const pp = {};
	pp.sync = []; // synchronization element
	const ncache = new Map(); // Map: href -> {href, data}
	const loc = {lefts: 5, tops: 5}; // left: x, top: y, lefts: left-shift, clientx
	const currentEl = {}; // {href, ?data}
	let apiUri;
	const prefetchTimers = new WeakMap();
	let activePrefetch = 0;
	const currentRequests = new Set(); // active hover
	const prefetchRequests = new Set(); // background prefetch
	const ilinksSet = new Set(); // O(1) memoized cache of confirmed-ignored link hrefs (see nignoreLink)
	let hideTimer = null; // sticky timer
	let hoverTimer = null; // hover timer
	let resizeTimer = null; // window resize debounce timer

	// exports
	Settings.wrapper = wrapper;
	Settings.context = this;
	Settings.f = {
		init: init,
		main: main,
		createuri: createUri,
		getpreview: ngetPreview,
		showpreview: nshowPreview,
		hidepreview: nhidePreview,
		cache: ncache,
		ignoreimage: nignoreImage,
		ignorepage: nignorePage,
		ignorelink: nignoreLink,
		cacheof: ncacheOf,
		chkimagesrc: chkImageSrc,
		preprocess: preprocess,
		elvalidate: elValidate,
	};

	mw.loader.using(['mediawiki.util', 'mediawiki.Uri'], init);

	function log(...a) {
		if (!Settings.debug) return;
		a.unshift('pp');
		console.log.apply(this, a);
	} // log

	pp.start = (e, isPrefetch) => {
		const hasKey = e !== undefined && e !== null;
		if (hasKey && pp.sync.indexOf(e) > -1) {
			return false;
		}
		if (!isPrefetch) {
			Settings.process = true;
		}
		pp.sync.push(hasKey ? e : Settings.process);
		return true;
	}; // start

	pp.stop = (e, isPrefetch) => {
		hlpaHover();
		const epos = pp.sync.indexOf(e);
		if (epos !== -1) {
			// remove e from sync array
			pp.sync.splice(epos, 1);
		} else {
			log('pp.stop: key not found in sync stack, skipping', e);
		}
		if (pp.sync.length === 0 || !isPrefetch) {
			Settings.process = false;
		}
	}; // stop

	function init() {
		if (window.pPreview && window.pPreview.version) {
			log('init dbl run protection triggered');
			return;
		}
		Settings.version = '1.94';
		log('init vrsn:', Settings.version);
		apiUri = new URL(mw.util.wikiScript('api'), location.href);
		function setDefault(key, defaultValue) {
			// Collapses the repeated "Settings.x !== undefined ? Settings.x : y" pattern
			if (Settings[key] === undefined) Settings[key] = defaultValue;
		} // setDefault

		// use api.v1/article/details
		setDefault('apid', false);
		// show preview delay, ms
		setDefault('delay', 350);
		// suppress hover events for x ms
		// Settings.throttling = timeout until x
		setDefault('throttle', 100);
		Settings.throttling = false;
		Settings.process = false; // processing data
		// max lines of preview text to show (min 1). Drives
		// -webkit-line-clamp in CSS via --pp-mline (only affects
		// the default/withtext-landscape layout - pp-withtext-portrait keeps
		// its own fixed 12-line clamp, unaffected by this).
		setDefault('mline', 5);
		Settings.mline = Math.max(Settings.mline, 1);
		document.documentElement.style.setProperty('--pp-mline', Settings.mline);
		// do not remove portable infobox on preprocess stage
		setDefault('pibox', false);
		// do not remove infobox siblings
		setDefault('piboxkeepprev', false);
		// cache size
		setDefault('csize', 100);
		setDefault('defimage', Defaults.defimage); // default image path
		// prefetch cache config
		setDefault('prefetch', false); // enable prefetch
		setDefault('prefetchDelay', 80); // delay before starting to prefetch
		setDefault('prefetchMax', 3); // max number of pages to prefetch
		setDefault('viewportPrefetch', false); // enable viewport prefetch
		// warning: viewportPrefetch depends on prefetch being enabled; without it, nothing happens
		if (Settings.viewportPrefetch && !Settings.prefetch) {
			log('warning: viewportPrefetch is enabled but prefetch is disabled — no viewport prefetching will occur');
		}
		// warning: viewportPrefetch requires browser support for IntersectionObserver
		if (Settings.viewportPrefetch && !('IntersectionObserver' in window)) {
			log('viewportPrefetch requested, but IntersectionObserver is not supported in this browser — feature disabled');
		}
		// no image found. class: npage-preview-noimage
		setDefault('noimage', Defaults.noimage);
		// show 'No Image' placeholder when no thumbnail is available
		setDefault('showNoImagePlaceholder', true);
		// request to perform scaling
		// note: default width is 450; installs with an already-saved Settings.scale are no longer overwritten
		setDefault('scale', {r: '?', t: '/scale-to-width-down/450?'});
		// container (#WikiaMainContent, #mw-content-text etc)
		Settings.dock = Settings.dock ? Settings.dock : Defaults.dock;
		// parse whole page. debug purposes mainly
		Settings.wholepage = urlVars.get('wholepage') || (Settings.wholepage !== undefined ? Settings.wholepage : false);
		// suppress native browser title
		setDefault('suppressTitle', false);
		// click to navigate
		setDefault('clickToNavigate', false);
		// sticky config
		setDefault('stickyPreview', true);
		setDefault('stickyDelay', 350); // Hold time
		// debounce delay for repositioning the open preview on window resize, ms
		setDefault('resizeDebounce', 150);
		// fade-out duration, ms - MUST match the CSS animation-duration for
		// .npage-preview / .npage-preview.is-hiding (LinkPreview.css, currently 0.18s)
		setDefault('animationDuration', 180);
		// text align
		Settings.textAlign = Settings.textAlign || 'justify'; // 'justify', 'left', or 'right'
		// adaptive layout
		setDefault('adaptiveLayout', true);
		// Center short text (0 = disabled)
		setDefault('centerShortText', 0);
		// cache empty results (no image + no text) to avoid re-hitting the API
		setDefault('cacheEmpty', true);
		// regexps
		Settings.RegExp = Settings.RegExp || {};
		function setRegExpDefault(key, defaultValue) {
			// Same idea as setDefault(), but for the nested Settings.RegExp.* group
			Settings.RegExp[key] = Settings.RegExp[key] || defaultValue;
		} // setRegExpDefault
		// images 2 ignore
		setRegExpDefault('iimages', []);
		// pages 2 ignore
		setRegExpDefault('ipages', []);
		// links 2 ignore
		setRegExpDefault('ilinks', []);
		// parents to ignore
		setRegExpDefault('iparents', ['[id^=flytabs] .tabs']);
		// classes to ignore
		setRegExpDefault('iclasses', []);
		// content to process. non-exclusive inclusion
		setRegExpDefault('onlyinclude', []);
		// content to remove (css-style targets)
		setRegExpDefault('noinclude', []);
		// Settings.RegExp.hash = Settings.RegExp.hash || /#.*/;
		setRegExpDefault('wiki', /^.*?\/wiki\//i);
		// delete tags
		setRegExpDefault('dtag', /<.*>/gm);
		// preprocess data (remove scripts)
		setRegExpDefault('prep', []);
		// ensure #mw-content-text is processed
		setDefault('fixContentHook', true);
		window.pPreview = Settings;
		const thisPageUri = createUri(location);
		const thisPage = thisPageUri ? thisPageUri.truepath : undefined;
		// should i ignore this page
		if (!thisPage || nignorePage(thisPage)) {
			mw.hook('wikipage.content').remove(main);
			log('ignore', thisPage);
			return;
		}
		// run once
		// dump sass params
		let sasses = '';
		$.each(mwc.wgSassParams, (k, v) => {
			sasses = `${sasses}--sass-${k}:${v};\n`;
		}); // each sassparam
		if (sasses.length) {
			sasses = `:root {\n${sasses}}`;
			mw.util.addCSS(sasses);
		}
		log('sasses', {sasses: sasses});
		importArticle({
			type: 'style',
			article: 'u:dev:MediaWiki:LinkPreview.css',
		});
		log('rmain');
		if (Settings.debug) {
			Settings.cache = ncache;
		}
		Settings.RegExp.ilinks.push(thisPage); // ignore this page
		Settings.RegExp.ilinks.push(new RegExp(escapeRegExp(apiUri.pathname))); // ignore unknown
		let r;
		if (Settings.RegExp.prep instanceof RegExp) {
			r = Settings.RegExp.prep;
			Settings.RegExp.prep = [r];
		} // if regexp.prep is regexp
		if (!Array.isArray(Settings.RegExp.prep)) {
			Settings.RegExp.prep = [];
		} // if regexp.prep is not array
		Settings.RegExp.prep.push(/<script>[\s\S]*?<\/script>/gim);
		Settings.RegExp.prep.push(/<ref>[\s\S]*?<\/ref>/gim);
		Settings.defimage = chkImageSrc(Settings.defimage) ? Settings.defimage : Defaults.defimage;
		Settings.noimage = chkImageSrc(Settings.noimage) ? Settings.noimage : Defaults.noimage;
		Settings.f.pp = pp;
		// ajaxrc support
		window.ajaxCallAgain = window.ajaxCallAgain || [];
		window.ajaxCallAgain.push(main);
		mw.hook('wikipage.content').add(main);
		mw.hook('ppreview.ready').fire(Settings);

		// Reposition an open preview after the window is resized (debounced)
		$(window).on('resize.pp', () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(repositionOpenPreview, Settings.resizeDebounce);
		});

		// load localization, if no local (wiki\user-specific) noimage defined
		if (Settings.noimage === Defaults.noimage) {
			log('i18n load');
			mw.hook('dev.i18n').add((i18n) => {
				i18n.loadMessages('LinkPreview').done((i18n) => {
					log('i18n loaded', i18n);
					i18n.useContentLang();
					const img = i18n.msg('no-image').plain();
					Settings.noimage = chkImageSrc(img) ? img : Settings.noimage;
					log('i18n noimage', Settings.noimage, img);
				});
			});
			importArticle({
				type: 'script',
				article: 'u:dev:MediaWiki:I18n-js/code.js',
			});
		}
	} // init

	function main($cont) {
		// main
		log('main', $cont);
		if (Settings.fixContentHook && $cont && $cont.length) {
			Settings.fixContentHook = false;
			if (!$cont.is('#mw-content-text')) {
				log('main fixcontent', $cont);
				main($('#mw-content-text'));
			}
		}
		const arr = [];
		// gather dock sites to one array
		Settings.dock.split(',').forEach((v) => {
			v = v.trim();
			let $c = $();
			if ($cont) {
				$c = ($cont.is(v) || $cont.parents(v).length) ? $cont : $();
			} else {
				$c = $(v);
			}
			$.merge(arr, $c);
		}); // each dock
		const $content = $(arr);
		log('main.c:', $content);

		if ('IntersectionObserver' in window && Settings.prefetch && Settings.viewportPrefetch) {
			// recreate the observer on every main(): avoids keeping observers
			// pinned to elements that already left the DOM (content swapped via AJAX)
			if (window.ppViewportObserver) {
				window.ppViewportObserver.disconnect();
			}
			window.ppViewportObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const el = entry.target;
							prefetchPreview(el);
							window.ppViewportObserver.unobserve(el); // cache only once per link
						}
					});
				},
				{rootMargin: '150px'}
			); // prefetch when link is 150px from screen
		}

		$content.find('a').each(function () {
			const $el = $(this);
			if (elValidate($el)) {
				// internal link
				if (window.ppViewportObserver && Settings.viewportPrefetch) {
					window.ppViewportObserver.observe(this);
				}

				$el.off('.pp');
				$el.on('mouseenter.pp', function (e) {
					if (Settings.suppressTitle) {
						const titleAttr = $el.attr('title');
						if (titleAttr) {
							$el.data('pp-saved-title', titleAttr);
							$el.removeAttr('title');
						}
					}
					if (Settings.prefetch) {
						clearTimeout(prefetchTimers.get(this));
						prefetchTimers.set(
							this,
							setTimeout(() => {
								prefetchPreview(e.currentTarget);
							}, Settings.prefetchDelay)
						);
					}
					aHover(e);
				});
				$el.on('mouseleave.pp', function () {
					// Clear hover timer on mouseleave
					if (hoverTimer) {
						clearTimeout(hoverTimer);
						hoverTimer = null;
					}
					// Restore tooltip
					if (Settings.suppressTitle) {
						const savedTitle = $el.data('pp-saved-title');
						if (savedTitle) {
							$el.attr('title', savedTitle);
						}
					}

					clearTimeout(prefetchTimers.get(this));
					nhidePreview(false);
				});
			} // if internal link
		}); // each dock element
	} // main

	function elValidate($el) {
		// returns false if element should be ignored
		let ahref = $el.attr('href');
		if (!ahref) return false;
		ahref = createUri(ahref);
		if (!ahref || !ahref.truepath || ahref.hostname !== apiUri.hostname || nignoreLink(ahref.truepath)) {
			return false;
		}
		// chk classes
		if (Array.isArray(Settings.RegExp.iclasses)) {
			const bstop = Settings.RegExp.iclasses.some((v) => {
				const found = $el.hasClass(v);
				if (found) log('elValidate classes', v, ahref.truepath);
				return found;
			});
			if (bstop) return false;
		}
		// chk parents
		if (Array.isArray(Settings.RegExp.iparents)) {
			const parent = Settings.RegExp.iparents.find((v) => $el.parents(v).length);
			if (parent) {
				log('elValidate parents', parent, ahref.truepath);
				return false;
			}
		}
		return true;
	} // elValidate

	function chkImageSrc(src) {
		// is src belongs to wikia
		if (!src) return false;
		try {
			const url = new URL(src);
			return /(\.wikia\.(com|org)|\.fandom\.com|\.wikia\.nocookie\.net)$/.test(url.hostname);
		} catch (_e) {
			return false;
		}
	} // chkimagesrc

	function applyPreviewImage($imgEl, src) {
		if (src) {
			$imgEl.attr('src', src).removeClass('npage-preview-noimage');
			return true;
		}
		if (Settings.showNoImagePlaceholder) {
			$imgEl.attr('src', Settings.noimage).addClass('npage-preview-noimage');
			return true;
		}
		$imgEl.remove();
		return false;
	} // applyPreviewImage

	function preprocess(text) {
		if (!Array.isArray(Settings.RegExp.prep) || Settings.RegExp.prep.length < 1) return text || '';
		let s = text,
			$s = $('<div>').html(s);
		$s.find('style, link[rel="stylesheet"]').remove();
		// remove noinclude items
		if (Settings.RegExp.noinclude && Array.isArray(Settings.RegExp.noinclude)) {
			Settings.RegExp.noinclude.forEach((v) => {
				$s.find(v).remove();
			});
		} // if RegExp.noinclude
		s = $s.html();
		// process exclusive items
		// must be done before trash tag processing. because of reasons
		if (Settings.RegExp.onlyinclude && Array.isArray(Settings.RegExp.onlyinclude)) {
			/* exclusive
			Settings.RegExp.onlyinclude.forEach(function (v) {
				var $v = $s.find(v);
				if ($v.length) $s = $v;// call it exclusive
			});
			s = $s.html();
			*/
			/* non-exclusive set */
			s =
				Settings.RegExp.onlyinclude
					.map((v) => {
						const $v = $s.find(v);
						if ($v.length) {
							$s.find(v).remove();
							return $v
								.map(function () {
									return this.outerHTML;
								})
								.toArray()
								.join('');
						} else {
							return false;
						}
					})
					.filter(Boolean)
					.join('') || s;
		} // if RegExp.onlyinclude
		Settings.RegExp.prep.forEach((v) => {
			s = s.replace(v, '');
		});
		return s;
	} // preprocess

	function createUri(href) {
		let h;
		try {
			h = new mw.Uri(href.toString());
			h.pathname = h.path;
			h.hostname = h.host;
		} catch (e) {
			h = undefined;
			log('createUrl.e', e);
		}
		if (h) {
			try {
				h.truepath = decodeURIComponent(h.pathname.replace(Settings.RegExp.wiki, ''));
				h.interwiki = h.path.split('/wiki/')[0];
				h.islocal = mwc.wgArticlePath.split('/wiki/')[0] === h.interwiki;
			} catch (e) {
				log('createuri decode.e', e, h, String(h));
				h = undefined;
			}
		}
		return h;
	} // createUri

	function escapeRegExp(str) {
		return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
	} // escapeRegExp

	function hlpaHover() {
		// aHover helper
		if (Settings.throttling) {
			clearTimeout(Settings.throttling);
			Settings.throttling = false;
		}
	} // hlpaHover

	function cancelCurrentRequests() {
		const reqs = Array.from(currentRequests);
		currentRequests.clear();
		reqs.forEach((req) => {
			if (req && typeof req.abort === 'function') {
				req.abort();
			}
		});
		// Note: Prefetch Requests are not cleared to keep the background coaching process running.
	}

	const prefetchQueue = new Map();

	function prefetchPreview(el) {
		if (!Settings.prefetch) {
			return;
		}
		const uri = createUri($(el).attr('href'));
		if (!uri || !uri.truepath || prefetchQueue.has(uri.truepath) || ncacheOf(uri.truepath)) {
			return;
		}
		prefetchQueue.set(uri.truepath, el);
		processPrefetchQueue();
	}

	function processPrefetchQueue() {
		while (activePrefetch < Settings.prefetchMax && prefetchQueue.size > 0) {
			const href = prefetchQueue.keys().next().value;
			const el = prefetchQueue.get(href);
			prefetchQueue.delete(href);

			if (ncacheOf(href)) {
				continue;
			}

			activePrefetch++;
			const fakeEvent = {
				currentTarget: el,
				pageX: -9999,
				pageY: -9999,
				clientX: -9999,
				clientY: -9999,
			};
			const request = ngetPreview(fakeEvent, href, false, true);
			if (request && typeof request.always === 'function') {
				request.always(() => {
					activePrefetch--;
					processPrefetchQueue();
				});
			} else {
				activePrefetch--;
			}
		}
	}

	function aHover(ev) {
		// aHover helper
		ev.stopPropagation();
		log('ahover ', Settings.throttling, currentEl.href);
		const hel = createUri($(ev.currentTarget).attr('href')) || {};

		// Clear preview (Clear delayed hide timer if user re-hovers)
		if (hideTimer) {
			clearTimeout(hideTimer);
			hideTimer = null;
			if (currentEl.href && currentEl.href !== hel.truepath) {
				executeHide();
			}
		}

		if (Settings.throttling) {
			return false;
		}
		Settings.throttling = setTimeout(hlpaHover, Settings.throttle);
		// if link already in process
		if (currentEl.href === hel.truepath) {
			return false;
		}
		cancelCurrentRequests();
		currentEl.href = hel.truepath;
		currentEl.islocal = hel.islocal;
		currentEl.interwiki = hel.interwiki;
		// if link determined be ignored
		if (nignoreLink(currentEl.href)) {
			return true;
		} // if ignore link
		// set coords
		loc.left = ev.pageX;
		loc.top = ev.pageY;
		loc.clientX = ev.clientX;
		loc.clientY = ev.clientY;
		log('ahover ev:', ev, 'cel:', currentEl);
		// clear existing timer, if any
		if (hoverTimer) clearTimeout(hoverTimer);
		hoverTimer = setTimeout(() => {
			hoverTimer = null;
			ngetPreview(ev);
		}, Settings.delay);
		return false;
	} // ahover

	function getObj(data, key) {
		// traverse through object tree
		let ret = [],
			r;
		for (const k in data) {
			if (data[k] instanceof Object) {
				if (k === key) {
					ret.push(data[k]);
				}
				r = getObj(data[k], key);
				if (r) ret = ret.concat(r);
			} // if obj
		} // for k in data
		return ret;
	} // getObj

	function getVal(data, key) {
		// travers through object tree
		let ret = [],
			r;
		for (const k in data) {
			if (data[k] instanceof Object) {
				r = getVal(data[k], key);
				if (r) {
					ret = ret.concat(r);
				}
			} else {
				if (k === key) {
					ret.push(data[k]);
				}
			} // if obj
		} // for k in data
		return ret;
	} // getVal

	// Adaptive layout
	function calcPreviewPosition($box, gapX, gapY) {
		const boxWidth = $box.outerWidth();
		const boxHeight = $box.outerHeight();
		const overflowX = loc.clientX + boxWidth > $(window).width();
		const overflowY = loc.clientY + boxHeight > $(window).height();
		const left = overflowX ? loc.left - boxWidth - gapX : loc.left + gapX;
		const top = overflowY ? loc.top - boxHeight - gapY : loc.top + gapY;
		return {
			left: Math.max(0, left),
			top: Math.max(0, top),
			overflowX: overflowX,
			overflowY: overflowY,
		};
	} // calcPreviewPosition

	function applyBoxPosition($box, pos) {
		if (pos.overflowX) $box.css('left', pos.left);
		if (pos.overflowY) $box.css('top', pos.top);
	} // applyBoxPosition

	function repositionOpenPreview() {
		// Re-clamp the currently open preview box to the viewport
		const $box = $('.npage-preview');
		if (!$box.length) return;
		applyBoxPosition($box, calcPreviewPosition($box, 0, 0));
	} // repositionOpenPreview

	function applyAdaptiveLayout(imgEl, containerDiv, onReady) {
		if (!Settings.adaptiveLayout) {
			if (onReady) onReady();
			return;
		}

		function applyLayout(w, h) {
			const $textDiv = containerDiv.find('.npage-preview-text');
			const hasText = $textDiv.length > 0 && $.trim($textDiv.text()).length > 0;

			// Flex container (see .pp-adaptive in LinkPreview.css)
			containerDiv.removeClass('pp-imgonly-landscape pp-imgonly-portrait pp-withtext-landscape pp-withtext-portrait').addClass('pp-adaptive');

			// Image-only layout (see .pp-imgonly-landscape
			// and .pp-imgonly-portrait in CSS)
			if (!hasText) {
				if ($textDiv.length) {
					$textDiv.hide();
				}
				containerDiv.addClass(w > h * 1.15 ? 'pp-imgonly-landscape' : 'pp-imgonly-portrait');
				// Landscape / Banner layout (see .pp-withtext-landscape in CSS)
			} else if (w > h * 1.15) {
				if ($textDiv.length) {
					$textDiv.show();
				}
				containerDiv.addClass('pp-withtext-landscape');
			} else {
				// Portrait / Square layout, image on right, text on left
				// (see .pp-withtext-portrait in CSS)
				if ($textDiv.length) {
					$textDiv.show();
				}
				containerDiv.addClass('pp-withtext-portrait');
				const charCount = $textDiv.length ? $.trim($textDiv.text()).length : 0;
				$textDiv.toggleClass('pp-text-centered', Settings.centerShortText > 0 && charCount < Settings.centerShortText);
			}
			if (onReady) onReady();
		}

		function handleImageError() {
			// Image failed to load (404, bad URL, network error, etc).
			imgEl.remove();
			if (onReady) onReady();
		} // handleImageError

		// Image already cached
		const node = imgEl[0];
		if (node && node.complete && node.naturalWidth) {
			applyLayout(node.naturalWidth, node.naturalHeight);
		} else if (node && node.complete) {
			// complete but naturalWidth is 0 -> already failed to load (e.g.
			// a broken image URL the browser had cached from an earlier visit)
			handleImageError();
		} else if (node) {
			node.onload = function () {
				applyLayout(this.naturalWidth || this.width, this.naturalHeight || this.height);
			};
			node.onerror = handleImageError;
		} else if (onReady) {
			onReady();
		}
	} //applyLayout

	function hlpPreview(uri, div, img, force, withD, prefetch) {
		// preview helper
		// load img and add to div
		const im = $('img', div);
		// check whether the preview contains any text
		const hasText = $.trim(div.text()).length > 0;
		const hasImage = typeof img === 'string' ? $.trim(img).length > 0 : !!img;
		if (!hasImage && !hasText && !Settings.showNoImagePlaceholder) {
			// re-hovering the same link doesn't keep re-hitting the API every single time
			if (Settings.cacheEmpty) {
				ncacheSet(uri.truepath, {href: uri.truepath, data: $(), uri: uri});
			}
			pp.stop(uri.truepath, prefetch);
			return;
		}
		if (!Settings.apid && !withD) {
			// let vignette do scale, if there's an image
			const scaledSrc = img && Settings.scale ? img.replace(Settings.scale.r, Settings.scale.t) : img;
			applyPreviewImage(im, scaledSrc);
		} // if !apid

		pp.stop(uri.truepath, prefetch);

		const reveal = () => {
			const d = {href: uri.truepath, data: div, uri: uri};
			ncacheSet(uri.truepath, d);
			if (Settings.debug) window.pPreview.pdiv = d.data;
			if (!prefetch || currentEl.href === uri.truepath) {
				nshowPreview(d.data, d.uri, force);
			}
		};

		const $liveImg = div.find('img');
		if (Settings.adaptiveLayout && $liveImg.length && $liveImg.attr('src')) {
			applyAdaptiveLayout($liveImg, div, reveal);
		} else {
			reveal();
		}
	} // hlpPreview

	function ngetPreview(ev, forcepath, withD, prefetch) {
		const nuri = createUri($(ev.currentTarget).attr('href')) || {};
		nuri.truepath = forcepath || nuri.truepath;
		if (!nuri.truepath) {
			log('gp no href', ev, forcepath);
			return;
		}
		if (!pp.start(nuri.truepath, prefetch)) {
			// this href already started to process
			log('gp suppressed dbl processing for', nuri);
			return;
		}
		// save bandwith
		log('gp uri: ', nuri, ' curel.href: ', currentEl.href, nuri.truepath === currentEl.href, 'd:', withD);
		// withd means fallback request, that should not be cancelled early
		if (!forcepath && !withD && nuri.truepath !== currentEl.href && !prefetch) {
			pp.stop(nuri.truepath, prefetch);
			return;
		}
		const ndata = ncacheOf(nuri.truepath);
		log('gp x:', loc.left, 'y:', loc.top);
		if (ndata) {
			log('gp show preview', ndata);
			if (ndata.data && ndata.data.length) {
				if (!prefetch || currentEl.href === nuri.truepath) {
					nshowPreview(ndata.data, nuri, forcepath && !prefetch);
				}
			}
			pp.stop(nuri.truepath, prefetch);
			return false;
		} // if data

		const targetQueue = prefetch ? prefetchRequests : currentRequests;

		// get data
		let apipage,
			request,
			requestImg,
			requestRedir,
			iwrap = $('<img>', {src: Settings.defimage}),
			twrap = $('<div>', {class: 'npage-preview-text'}), // Added class for styling
			div = $('<div>', {class: 'npage-preview'});

		// Text styling
		twrap.css('text-align', Settings.textAlign); // User alignment

		if (Settings.apid || withD) {
			apipage = new mw.Uri(`${nuri.interwiki}/api/v1/Articles/Details`);
			apipage.extend({titles: nuri.truepath, abstract: 500});
			log('gp apid', apipage);
			request = $.getJSON(apipage)
				.done(function (data) {
					if (!data || data.error) {
						log('gp apid.error', nuri, data);
						Settings.RegExp.ilinks.push(nuri.truepath); // and ignore it
						pp.stop(nuri.truepath, prefetch);
						return this;
					}
					const item = data.items ? data.items[Object.keys(data.items)[0]] : undefined;
					if (!item) {
						log('gp apid.noitem', nuri, data);
						Settings.RegExp.ilinks.push(nuri.truepath); // and ignore it
						pp.stop(nuri.truepath, prefetch);
						return this;
					}
					if (applyPreviewImage(iwrap, item.thumbnail)) {
						div.append(iwrap);
					}
					twrap.text(item.abstract);
					div.append(twrap);
					hlpPreview(nuri, div, item.thumbnail, forcepath && !prefetch, withD, prefetch);
					return;
				}) // apid.done
				.fail((_xhr, status) => {
					if (status === 'abort') {
						pp.stop(nuri.truepath, prefetch);
						return;
					}
					log('gp apid.fail', nuri);
					Settings.RegExp.ilinks.push(nuri.truepath); // and ignore it
					pp.stop(nuri.truepath, prefetch);
				})
				.always(() => {
					targetQueue.delete(request);
				});
			targetQueue.add(request);
			return request;
		}

		apipage = new mw.Uri({path: `${nuri.interwiki}/api.php`});
		apipage.extend({
			action: 'parse',
			page: nuri.truepath,
			prop: 'images|text',
			format: 'json',
			disablepp: '',
			redirects: '',
			// Cache link previews on the CDN for 10 minutes for anonymous users
			smaxage: 600,
			maxage: 600,
		});
		if (!Settings.wholepage) apipage.extend({section: 0});
		log('gp apip: ', apipage.toString());

		request = $.getJSON(apipage)
			.done(function (data) {
				// parse: {text: {*: text}, images: []}
				if (!data || !data.parse) {
					log('gp apip. no valid data in', data);
					Settings.RegExp.ilinks.push(nuri.truepath); // and ignore it
					pp.stop(nuri.truepath, prefetch);
					return this;
				}
				const img = (data.parse.images || [])
					.map((value, _index) => {
						if (nignoreImage(value)) {
							return false;
						} else {
							return value;
						}
					})
					.filter(Boolean)[0];

				let text = data.parse.text ? data.parse.text['*'] : undefined;
				log('gp apip img:', img, 'text:', {text: text});
				if (!img && !text) {
					pp.stop(nuri.truepath, prefetch);
					if (Settings.apid || withD) {
						Settings.RegExp.ilinks.push(nuri.truepath); // and ignore it
						return this;
					} else {
						// last try; via api.v1
						return ngetPreview(ev, null, true, prefetch);
					}
				}
				// preprocess (cleanup)
				text = preprocess(text);
				text = $('<div>', {
					class: 'tmpdivclass',
					style: 'visibility:hidden;display:none;',
				}).html(text);
				if (!Settings.pibox) {
					// remove portable infobox
					// assume infobox as 1st item
					// and remove all preceding info- templates if needed
					if (!Settings.piboxkeepprev) text.find('aside').prevAll().remove();
					text.find('aside').remove();
				}
				// convert 2 text
				text = text.text();
				// text clean up
				text = text ? text.replace(Settings.RegExp.dtag, '') : '';
				if (Settings.debug) {
					Settings.pptext = text;
					Settings.ppdata = data;
					log('gp img: ', img, ' text: ', {text: text});
				}
				if (text.length > 0) {
					twrap.text(text);
					div.append(twrap);
				} // if text
				div.prepend(iwrap);

				if (img) {
					const im = `file:${img.trim()}`;
					const apiimage = new mw.Uri({path: `${nuri.interwiki}/api.php`});
					apiimage.extend({
						action: 'query',
						redirects: '',
						titles: im,
						iiprop: 'url',
						prop: 'imageinfo',
						format: 'json',
						smaxage: 600,
						maxage: 600,
					});
					log('gp apii: ', apiimage.toString());
					requestImg = $.getJSON(apiimage.toString())
						.done(function (data) {
							log('gp apii done:', data);
							if (data && data.error) {
								// API returned an explicit error object
								log('gp apii api-error', data.error);
								hlpPreview(nuri, div, false, forcepath && !prefetch, withD, prefetch);
								return;
							}
							const d1 = data.query || {};
							let im;
							if (d1.redirects) {
								let imRed = getVal(getObj(d1, 'redirects'), 'to');
								log('gp img redir to', imRed);
								if (imRed.length > 0) {
									imRed = imRed[0];
								} else {
									// no url found
									hlpPreview(nuri, div, false, forcepath && !prefetch, withD, prefetch);
									return;
								}
								const apiim = apiimage.clone().extend({titles: imRed});
								// resolve redirect
								log('gp resolv redir:', apiim.toString());
								requestRedir = $.getJSON(apiim.toString(), (data) => {
									let im = getVal(getObj(data, 'pages'), 'url');
									if (im.length > 0) {
										im = im[0];
									} else {
										// no url found
										im = false;
									}
									hlpPreview(nuri, div, im, forcepath && !prefetch, withD, prefetch);
								})
									.fail((xhr, status, err) => {
										if (status === 'abort') {
											pp.stop(nuri.truepath, prefetch);
											return;
										}
										log('gp img redir api fail', xhr, status, err);
										hlpPreview(nuri, div, false, forcepath && !prefetch, withD, prefetch);
									})
									.always(() => {
										targetQueue.delete(requestRedir);
									});
								targetQueue.add(requestRedir);
								return requestRedir;
							} else {
								im = getVal(getObj(d1, 'imageinfo'), 'url');
								if (im.length > 0) {
									im = im[0];
								} else {
									im = false;
								}
								hlpPreview(nuri, div, im, forcepath && !prefetch, withD, prefetch);
							}
							return this;
						})
						.fail((obj, stat, err) => {
							if (stat === 'abort') {
								pp.stop(nuri.truepath, prefetch);
								return;
							}
							log('gp img api fail', obj, stat, err);
							hlpPreview(nuri, div, false, forcepath && !prefetch, withD, prefetch);
						})
						.always(() => {
							targetQueue.delete(requestImg);
						});
					targetQueue.add(requestImg);
					return requestImg;
				} else {
					hlpPreview(nuri, div, false, forcepath && !prefetch, withD, prefetch);
				}
			})
			.fail((obj, stat, err) => {
				if (stat === 'abort') {
					pp.stop(nuri.truepath, prefetch);
					return;
				}
				log('pg get page data fail', obj, stat, err);
				pp.stop(nuri.truepath, prefetch);
			})
			.always(() => {
				targetQueue.delete(request);
			});
		targetQueue.add(request);
		return request;
	} // getpreview

	function nshowPreview(data, target, force) {
		log('sp', data, target, force);
		if (!force && currentEl.href !== target.truepath) {
			return false;
		}
		log('sp data:', data);

		const $previewBox = $(data); // wrap in variable for interactive binding
		$('.npage-preview').not($previewBox).remove();
		$previewBox.removeClass('is-hiding'); // Reset class to allow fade-in animation
		// Bind preview (Sticky & Clickable Box)
		$previewBox.off('.pp');
		$previewBox.on('mouseenter.pp', () => {
			// Cancel hide
			if (hideTimer) {
				clearTimeout(hideTimer);
				hideTimer = null;
			}
		});

		$previewBox.on('mouseleave.pp', () => {
			// Immediate hide
			nhidePreview(true);
		});

		if (Settings.clickToNavigate) {
			$previewBox.on('click.pp', (e) => {
				// Ignore links inside the preview box
				if ($(e.target).closest('a').length) return;
				// Navigate to article
				if (target) {
					window.location.href = target.toString();
				}
			});
			$previewBox.css('cursor', 'pointer');
		}

		$('body').append($previewBox);

		$previewBox.css({left: -10000, top: -10000});
		$previewBox.show(0, () => {
			const pos = calcPreviewPosition($previewBox, loc.lefts, loc.tops);
			log('sp loc', {left: pos.left, top: pos.top});

			// Prevent (0,0) jump during scroll
			const isUserHovering = currentEl.href === target.truepath;
			const useForceCoord = force && !isUserHovering;

			$previewBox.css({
				left: useForceCoord ? $('body').scrollLeft() : pos.left,
				top: useForceCoord ? $('body').scrollTop() : pos.top,
			});

			mw.hook('ppreview.show').fire(data);
		});
	} // showpreview

	function nhidePreview(immediate) {
		// Delay hide (Sticky timer logic)
		if (Settings.stickyPreview && !immediate) {
			if (hideTimer) clearTimeout(hideTimer);
			hideTimer = setTimeout(() => {
				executeHide();
			}, Settings.stickyDelay);
		} else {
			executeHide();
		}
	} // hidepreview

	// Execute hide helper
	function executeHide() {
		if (hideTimer) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}
		currentEl.href = '';
		cancelCurrentRequests();

		const $previewBox = $('.npage-preview');
		if ($previewBox.length) {
			if (!$previewBox.hasClass('is-hiding')) {
				$previewBox.addClass('is-hiding');
				setTimeout(() => {
					$previewBox.remove();
					hlpaHover();
				}, Settings.animationDuration);
			} else {
				$previewBox.remove();
				hlpaHover();
			}
		} else {
			hlpaHover();
		}
	} // executeHide

	function nignoreImage(name) {
		for (let i = 0, len = Settings.RegExp.iimages.length; i < len; i++) {
			if (Settings.RegExp.iimages[i] instanceof RegExp) {
				if (Settings.RegExp.iimages[i].test(name)) return true;
			} else {
				if (name === Settings.RegExp.iimages[i]) return true;
			}
		}
		return false;
	} // ignoreImage

	function nignorePage(name) {
		const a = Settings.RegExp.ipages;
		for (let i = 0, len = a.length; i < len; i++) {
			if (a[i] instanceof RegExp) {
				if (a[i].test(name)) return true;
			} else {
				if (name === a[i]) return true;
			}
		}
		return false;
	} // ignorePage

	function nignoreLink(name) {
		if (ilinksSet.has(name)) return true; // fast path for repeat lookups
		const a = Settings.RegExp.ilinks;
		for (let i = 0, len = a.length; i < len; i++) {
			if (a[i] instanceof RegExp) {
				if (a[i].test(name)) return true;
			} else if (name === a[i]) {
				ilinksSet.add(name); // memoize so future lookups are O(1)
				return true;
			}
		}
		return false;
	} // ignoreLink

	function ncacheOf(href) {
		if (ncache.has(href)) {
			const entry = ncache.get(href);
			ncache.delete(href);
			ncache.set(href, entry);
			log('cache found:', href, 'data:', entry.data);
			return entry;
		}
		return null;
	} // cacheOf

	function ncacheSet(href, data) {
		if (!ncache.has(href)) {
			while (ncache.size >= Settings.csize) {
				ncache.delete(ncache.keys().next().value);
			}
		}
		ncache.set(href, data);
	} // cacheSet
})(jQuery);