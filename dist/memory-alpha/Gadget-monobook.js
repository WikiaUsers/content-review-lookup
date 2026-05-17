'use strict';
mw.hook('gadget.skin-setup').add(async skinConfig => {
	// Setup
	$('.mediawiki').prepend($('<div id="page-grid">'));
	const pageActions = $('<div id="page-actions">');
	$('#page-grid').append(
		$('<div id="left-rail-wrapper">'),
		$('<div id="personal-tools" class="global-top-navigation">').append($('<ul>')),
		pageActions,
		$('.main-container'),
		$('<footer id="footer">'),
	);

	// Left rail
	$('#left-rail-wrapper').append($('<a id="p-logo" href="/wiki/">'));
	await skinConfig.mainMenu('#left-rail-wrapper');
	// $('#left-rail-wrapper').append(portlet('search', 'Search'));
	await skinConfig.toolbox('#left-rail-wrapper', 'Page tools');
	// $('#left-rail-wrapper').append(portlet('my-tb', 'My tools'));

	$('#p-search > div').html($(`<form action="${mw.util.getUrl('Special:Search')}">`));
	$('#p-search > div > form').append(
		$('<input type="search" id="searchInput" name="query" required placeholder="Search Memory Alpha">'),
		$('<input type="submit" class="searchButton" name="go" value="Go" title="Go to a page with this exact name if it exists">'),
		$('<input type="submit" class="searchButton" name="fulltext" value="Search" title="Search Memory Alpha for this text">'),
	);

	$('#collapsible-content-languages').remove();
	await skinConfig.langs('#left-rail-wrapper');

	// Personal tools
	function ptItem(id, url, title, text){
		if (url){
			return `<li class="ptItem" id="pt-${id}"><a href="${mw.util.getUrl(url)}" title="${title}">${text}</a></li>`;
		}

		return `<li class="ptItem" id="pt-${id}">`;
	}

	$('#personal-tools ul').append(
		$(ptItem('userpage', `User:${mw.config.get('wgUserName')}`, 'Your user page', mw.config.get('wgUserName'))),
		$(ptItem('notifications')).append($('#global-top-navigation .notifications')),
		$(ptItem('mytalk', `User talk:${mw.config.get('wgUserName')}`, 'Your talk page', 'Talk')),
		$(ptItem('sandbox', `User:${mw.config.get('wgUserName')}/sandbox`, 'Your sandbox', 'Sandbox')),
		$(ptItem('preferences', 'Special:Preferences', 'Your preferences', 'Preferences')),
		$(ptItem('watchlist', 'Special:Watchlist', 'The list of pages you are monitoring for changes', 'Watchlist')),
		$(ptItem('contribs', `Special:Contributions/${mw.config.get('wgUserName')}`, 'A list of your contributions', 'Contributions')),
		$(ptItem('logout', 'Special:UserLogout', 'Log out', 'Log out')),
	);

	$('.notifications__toggle').attr('title', 'Your notifications');

	// Page actions
	await skinConfig.associatedPages(pageActions);
	await skinConfig.views(pageActions);
	await skinConfig.actions(pageActions);

	// Footer
	function footerIcon(id, title, url){
		return `<a class="footer-icon" id="f-${id}" title="${title}" href="${url}">`;
	}

	$('#footer').append(
		$(footerIcon('hostedbyico', 'Hosting provided by Fandom', 'https://www.fandom.com')),
		$(footerIcon('poweredbyico', 'Powered by MediaWiki', 'https://www.mediawiki.org')),
		$('<ul id="f-list">'),
	);

	$('#f-list').append(
		$('<li class="license-description">').html($('.license-description').html()),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:About')}">About Memory Alpha</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:Copyrights')}">Copyright</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Special:Statistics')}">Statistics</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:Contact us')}">Contact Memory Alpha</a></li>`),
		$('<li><a href="https://www.fandom.com/privacy-policy">Privacy Policy</a></li>'),
		$('<li><a href="https://www.fandom.com/terms-of-use">Terms of Use</a></li>'),
		$('<li><a href="https://www.fandom.com/terms-of-sale">Terms of Sale</a></li>'),
		$('<li><a href="https://www.fandom.com/community-creation-policy">Community Creation Policy</a></li>'),
		$('<li><a href="https://about.fandom.com/about">About Fandom</a></li>'),
	);

	$('#f-list li:empty').remove();
});

// {{JavaScript category}}