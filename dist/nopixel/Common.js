/* Any JavaScript here will be loaded for all users on every page load. */


/* LinkPreview */
window.pPreview = $.extend(true, window.pPreview, {	RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.ilinks = [new RegExp('^[A-Za-z_ ]*:[^\/\/][^\n]*$')];
window.pPreview.RegExp.iclasses = ['no-link-preview'];
window.pPreview.RegExp.onlyinclude = [
	'.mw-parser-output > p:not(.mw-empty-elt):not(:has(> br:only-child))',
	'.mw-parser-output > div[style*="--"] > p:not(.mw-empty-elt):not(:has(> br:only-child))'
];
window.pPreview.RegExp.prep = [/(?!)/];
window.pPreview.RegExp.noinclude = ['.notice', '.navtab-container_outer'];
window.pPreview.RegExp.iparents = ['[id^=flytabs] .tabs', '.navtab-container_outer'];
window.pPreview.textAlign = 'left';
window.pPreview.delay = 450;
window.pPreview.prefetch = true;
window.pPreview.mline = 4;
window.pPreview.RegExp.iimages = ['Placeholder.jpg'];
window.pPreview.showNoImagePlaceholder = false;


/* ReadProgressBar */
window.enableReadProgressBarOnArticles = true;


/* Ripple */
/*window.ripplesConfig = {
	'normalRipples': document.querySelectorAll(''),
	'recenteredRipples': document.querySelectorAll(''),
	'unboundedRipples': document.querySelectorAll('')
};*/


/* Infobox image size */
(function () {
	function fixInfoboxImages() {
		document.querySelectorAll('.portable-infobox .pi-image-thumbnail').forEach(function (img) {
			var src = img.getAttribute('src');
			var box = img.closest('.portable-infobox');
			if (!src || !box || !/scale-to-width-down\/\d+/.test(src)) return;
			var width = box.clientWidth;
			img.srcset = src.replace(/scale-to-width-down\/\d+/, 'scale-to-width-down/' + width) + ' 1x, ' +
				src.replace(/scale-to-width-down\/\d+/, 'scale-to-width-down/' + width * 2) + ' 2x';
		});
	}
	mw.hook('wikipage.content').add(fixInfoboxImages);
	$(window).on('load', fixInfoboxImages);
})();


/* Edit notices */
(function () {
	function showEditNotices(notices, $before) {
		if (!notices || !notices.length || !$before.length || $('.np-editnotices').length) return;
		$('<div>').addClass('np-editnotices').html(notices.join('')).insertBefore($before);
	}
	mw.hook('ve.activationComplete').add(function () {
		showEditNotices(ve.init.target.editNotices, $('.ve-init-mw-target-surface, .ve-ui-surface').first());
	});
	mw.hook('ve.deactivationComplete').add(function () {
		$('.np-editnotices').remove();
	});
	if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) !== -1) {
		$(function () {
			if (!$('#wpTextbox1').length || $('.ve-init-target').length) return;
			new mw.Api().get({ action: 'visualeditor', paction: 'metadata', page: mw.config.get('wgPageName') }).then(function (data) {
				var notices = data.visualeditor && data.visualeditor.notices;
				if (!notices) return;
				var $ui = $('.wikiEditor-ui').first();
				showEditNotices(Object.keys(notices).map(function (key) { return notices[key]; }), $ui.length ? $ui : $('#wpTextbox1'));
			});
		});
	}
})();


/* MapsExtended */
if (mw.config.get('wgNamespaceNumber') === 2900) {
	importArticle({ type: 'script', article: 'u:dev:MediaWiki:MapsExtended.js' });
}

/* Colors compatibility */
(function () {
	if (mw.config.get('wgUserGroups').indexOf('sysop') === -1 || mw.config.get('wgSassParams')) return;
	function resolve(name, fallback) {
		var probe = document.createElement('span');
		probe.style.color = 'var(' + name + ', var(' + fallback + '))';
		document.body.appendChild(probe);
		var color = getComputedStyle(probe).color;
		probe.remove();
		var ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, 1, 1);
		var px = ctx.getImageData(0, 0, 1, 1).data;
		return 'rgb(' + px[0] + ', ' + px[1] + ', ' + px[2] + ')';
	}
	function setParams() {
		mw.config.set('wgSassParams', {
			'color-body': resolve('--theme-body-background-color', '--theme-page-background-color'),
			'color-body-middle': resolve('--theme-body-background-color', '--theme-page-background-color'),
			'color-page': resolve('--theme-page-background-color', '--theme-body-background-color'),
			'color-buttons': resolve('--theme-accent-color', '--theme-link-color'),
			'color-community-header': resolve('--theme-header-background-color', '--theme-body-background-color'),
			'color-links': resolve('--theme-link-color', '--theme-link-color')
		});
	}
	if (document.body) {
		setParams();
	} else {
		$(setParams);
	}
})();

/* Admin tools */
if (mw.config.get('wgUserGroups').indexOf('sysop') !== -1) {
	importArticle({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:AddBlockUserTag/code.js',
			'u:dev:MediaWiki:AdminDashboard_block/code.js',
			'u:dev:MediaWiki:User Admin Tools.js',
			'u:dev:MediaWiki:MassEdit/code.js',
			'u:dev:MediaWiki:MassProtect/code.js',
			'u:dev:MediaWiki:RedirectManagement/code.js',
			'u:dev:MediaWiki:DupImageList/code.js'
		]
	});
}

/* Main page: Trending Characters */
(function () {
	if (!mw.config.get('wgIsMainPage')) return;
	var CACHE_KEY = 'np-mp-trending';
	var CACHE_HOURS = 3;
	var COUNT = 12;
	var CATEGORY = 'Category:5.0/Characters';
	var SKIP = ['Dixie Renee'];

	function render($box, items) {
		if (items.length < COUNT) return;
		$box.empty();
		items.slice(0, COUNT).forEach(function (item) {
			var href = mw.util.getUrl(item.title);
			$('<div>').addClass('mp-portrait').append(
				$('<a>').attr({ href: href, title: item.title }).append(
					$('<img>').attr({ src: item.thumb, alt: item.title, loading: 'lazy', width: 130, height: 130 })
				),
				$('<div>').addClass('mp-portrait__name').append(
					$('<a>').attr({ href: href, title: item.title }).text(item.title)
				)
			).appendTo($box);
		});
	}

	function readCache() {
		try {
			var cached = JSON.parse(localStorage.getItem(CACHE_KEY));
			if (cached && Date.now() - cached.time < CACHE_HOURS * 3600000) return cached.items;
		} catch (e) {}
		return null;
	}

	function writeCache(items) {
		try {
			localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), items: items }));
		} catch (e) {}
	}

	/* Anonymous API calls take at most 50 titles, so ask in chunks. */
	function inCategory(titles) {
		var api = new mw.Api();
		var chunks = [];
		for (var i = 0; i < titles.length; i += 50) chunks.push(titles.slice(i, i + 50));
		return $.when.apply($, chunks.map(function (chunk) {
			return api.get({
				action: 'query',
				titles: chunk.join('|'),
				prop: 'categories',
				clcategories: CATEGORY,
				cllimit: 'max',
				formatversion: 2
			});
		})).then(function () {
			var results = chunks.length === 1 ? [arguments] : Array.prototype.slice.call(arguments);
			var found = {};
			results.forEach(function (res) {
				res[0].query.pages.forEach(function (page) {
					if (page.categories) found[page.title] = true;
				});
			});
			return found;
		});
	}

	mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
		$(function () {
			var $box = $('#mp-trending');
			if (!$box.length) return;
			var cached = readCache();
			if (cached) return render($box, cached);
			$.getJSON(mw.util.wikiScript('wikia'), {
				controller: 'RecirculationApi',
				method: 'getPopularPages',
				limit: 100,
				format: 'json'
			}).then(function (pages) {
				pages = pages.filter(function (page) {
					return page.thumbnail && SKIP.indexOf(page.title) === -1;
				});
				return inCategory(pages.map(function (page) { return page.title; })).then(function (found) {
					var items = pages.filter(function (page) {
						return found[page.title];
					}).slice(0, COUNT).map(function (page) {
						return {
							title: page.title,
							thumb: page.thumbnail.replace(/\/revision\/latest/, '/revision/latest/scale-to-width-down/400')
						};
					});
					if (items.length >= COUNT) writeCache(items);
					render($box, items);
				});
			});
		});
	});
})();