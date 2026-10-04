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