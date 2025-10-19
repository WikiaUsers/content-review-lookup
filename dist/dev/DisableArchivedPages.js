/* global importArticle */
'use strict';
(($, mw) => {
	const config = mw.config.values;
	const namespaces = config.wgExtraSignatureNamespaces;
	const ns = config.wgNamespaceNumber;
	
	window.dev = window.dev || {};
	window.dev.DisableArchivedPages = window.dev.DisableArchivedPages || {};
	window.dev.DisableArchivedPages.id = window.dev.DisableArchivedPages.id || 'archivedPage';
	
	if (
		window.DisableArchivedPagesLoaded ||
		!$(`#${window.dev.DisableArchivedPages.id}`).length ||
		(namespaces.indexOf(ns) === -1 && ns % 2 !== 1)
	){
		return;
	}
	
	window.DisableArchivedPagesLoaded = true;
	mw.hook('dev.i18n').add((i18n) => {
		i18n.loadMessages('DisableArchivedPages').done((i18n) => {
			const archived = i18n.msg('archived').escape();
			$('#ca-edit').html(archived).removeAttr('href');
			$('#ca-addsection').html(archived).removeAttr('href');
			$('#log-in-edit').html(archived).removeAttr('href');
		});
	});
	
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
	
	$('#ca-edit-side-tool').remove();
	$('#ca-addsection-side-tool').remove();
	$('#log-in-edit-side-tool').remove();
	$('.mw-editsection').remove();
	$('#ca-move').parent().remove();
	$('#ca-edit[data-tracking-label="ca-edit-dropdown"]').parent().remove();
	
	if ($('.page-header__page-subtitle .new').length === 1){
		$('.page-header__page-subtitle').html($('.subpages'));
	}
})(jQuery, mediaWiki);