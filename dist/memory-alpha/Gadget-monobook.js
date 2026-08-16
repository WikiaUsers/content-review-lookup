'use strict';

// Setup
const leftRailWrapper = $('<div id="left-rail-wrapper">');
const personalTools = $('<div id="personal-tools" class="global-top-navigation">');
const pageActions = $('<div id="page-actions">');
const pageGrid = $('<div id="page-grid">').append(
	leftRailWrapper,
	personalTools,
	pageActions,
	$('.main-container'),
);
leftRailWrapper.append($('<a id="p-logo" href="/wiki/">'));
$('.mediawiki').prepend(pageGrid);

mw.hook('gadget.skin-setup').add(async skinConfig => {
	// Personal tools
	skinConfig.personalTools(personalTools);

	// Footer
	skinConfig.footer(pageGrid);

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