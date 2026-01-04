'use strict';
(() => {
	const config = mw.config.values;
	const namespaces = config.wgExtraSignatureNamespaces;
	const ns = config.wgNamespaceNumber;
	const wrongNamespace = !namespaces.includes(ns) && ns % 2 !== 1;
	window.dev = window.dev || {};
	window.dev.DisableArchivedPages = window.dev.DisableArchivedPages || {};
	window.dev.DisableArchivedPages.id = window.dev.DisableArchivedPages.id || 'archivedPage';
	
	if (
		window.DisableArchivedPagesLoaded ||
		!$(`#${window.dev.DisableArchivedPages.id}`).length ||
		wrongNamespace
	){
		return;
	}
	
	window.DisableArchivedPagesLoaded = true;
	$('#ca-move').remove();
	$('#ca-edit').remove();
	$('#ca-edit-side-tool').remove();
	$('#ca-addsection').remove();
	$('#ca-addsection-side-tool').remove();
	$('#log-in-edit').remove();
	$('#log-in-edit-side-tool').remove();
	$('.mw-editsection').remove();
	
	if ($('.page-header__page-subtitle .new').length){
		$('.page-header__page-subtitle').html($('.subpages'));
	}
})();