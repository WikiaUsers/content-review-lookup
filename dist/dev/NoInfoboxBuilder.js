;(function () {
	'use strict';
	
	window.dev = window.dev || {};
	if ( window.dev.NoInfoboxBuilder ) {
		return;
	}
	window.dev.NoInfoboxBuilder = true;
	
	var config = mw.config.get( [ 'wgArticleId', 'wgArticlePath', 'wgNamespaceNumber', 'wgPageName', 'wgServer' ] );
	if ( config.wgNamespaceNumber !== 10 || config.wgArticleId !== 0 ) {
		return;
	}

	var api;

	function createInfobox() {
		api = new mw.Api();
		
		api.postWithToken( 'csrf', {
			action: 'edit',
			text: '',
			title: config.wgPageName
		} ).then( updateTemplateType ).then( redirectToEdit );
	}
	
	function updateTemplateType( editObject ) {
		var url = config.wgServer + config.wgArticlePath.replace( '/wiki/$1', '' );
		api.getToken( 'csrf' ).then( function ( token ) {
			$.post( url + '/wikia.php?controller=Fandom\\TemplateClassification\\Api\\ClassificationController&method=classifyTemplate', {
				articleId: editObject.edit.pageid,
				pageName: editObject.edit.title,
				token: token,
				type: 'infobox'
			} ).then( function () {
				var editUrl = config.wgServer + config.wgArticlePath.replace( '$1', editObject.edit.title ) + '?action=edit';
				window.location.href = editUrl;
			} );
		} );
	}

	mw.hook( 'dev.ct' ).add( function ( addButton ) {
		addButton( {
			click: createInfobox,
			i18n: 'NoInfoboxBuilder',
			icon: 'preformat',
			placement: 'page-actions',
			position: 1,
			text: 'create-infobox'
		} );
	} );
	
	importArticles( {
		type: 'script',
		articles: [
			'u:dev:MediaWiki:CustomTools.js'
		]
	} );
} )();