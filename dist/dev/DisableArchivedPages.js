(($, mw) => {
	'use strict';
	const namespaces = [4, 110],
		ns = mw.config.get('wgNamespaceNumber');
	
	if (
		window.DisableArchivedPagesLoaded ||
		$('#archivedPage').length !== 1 ||
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