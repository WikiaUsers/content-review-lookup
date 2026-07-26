'use strict';

// Setup
$('.mediawiki').prepend($('<div id="page-grid">'));
const pageActions = $('<div id="page-actions">');
const personalTools = $('<div id="personal-tools" class="global-top-navigation">');
const leftRailWrapper = $('<div id="left-rail-wrapper">');
$('#page-grid').append(
	leftRailWrapper,
	personalTools,
	pageActions,
	$('.main-container'),
	$('<footer id="footer">'),
);
leftRailWrapper.append($('<a id="p-logo" href="/wiki/">'));

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

mw.hook('gadget.skin-setup').add(async skinConfig => {
	// Personal tools
	skinConfig.personalTools(personalTools);

	// Page actions
	await skinConfig.associatedPages(pageActions);
	skinConfig.views(pageActions);
	skinConfig.actions(pageActions);

	// Left rail
	await skinConfig.mainMenu(leftRailWrapper);
	// leftRailWrapper.append(portlet('search', 'Search'));
	skinConfig.toolbox(leftRailWrapper);
	// leftRailWrapper.append(portlet('my-tb', 'My tools'));
	/*
	$('#p-search > div').html($(`<form action="${mw.util.getUrl('Special:Search')}">`));
	$('#p-search > div > form').append(
		$('<input type="search" id="searchInput" name="query" required placeholder="Search Memory Alpha">'),
		$('<input type="submit" class="searchButton" name="go" value="Go" title="Go to a page with this exact name if it exists">'),
		$('<input type="submit" class="searchButton" name="fulltext" value="Search" title="Search Memory Alpha for this text">'),
	);
	*/
	$('#collapsible-content-languages').remove();
	skinConfig.langs(leftRailWrapper);
});

// {{JavaScript category}}