// Requires VSCode and the Wikitext extension to be installed locally
// https://marketplace.visualstudio.com/items?itemName=RoweWilsonFrederiskHolme.wikitext

mw.loader.using('mediawiki.util').then(function() {
    'use strict';
	if (!(mw.config.get('wgIsProbablyEditable') || ($('#ca-viewsource').length > 0))) return;

	var config = $.extend({
		scheme: 'vscode',
		extensionId: 'rowewilsonfrederiskholme.wikitext',
		actionPath: '/PullPage'
	}, window.VSCodeEditLink);

	var url = new URL(config.scheme + '://' + config.extensionId + config.actionPath + '?' + new URLSearchParams({
		RemoteBot: 'true',
		TransferProtocol: window.location.protocol,
		SiteHost: mw.config.get('wgServer').replace(/^[\w-]*?:(?=\/\/)/, ''),
		APIPath: mw.util.wikiScript('api'),
		Title: mw.config.get('wgPageName')
	}));

	function addButton(i18n) {
		$('.page-header__actions .wds-dropdown__content .wds-list').prepend($('<li>').append(
			$('<a>', {
				id: 'ca-vscode',
				href: url.href.toString(),
				text: i18n.msg('text').escape(),
				title: i18n.msg('tooltip').escape()
			})
		));
	}

	mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('VSCodeEditLink').then(addButton);
	});

	importArticles({
		type: 'script',
		articles: ['u:dev:MediaWiki:I18n-js/code.js']
	});
});