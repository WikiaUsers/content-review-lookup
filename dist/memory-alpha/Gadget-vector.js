'use strict';
mw.hook('gadget.skin-setup').add(async skinConfig => {
	// Setup
	const pageGrid = $('<div>', {id: 'page-grid'});
	$(document.body).prepend(pageGrid);
	const leftNav = $('<div>', {id: 'left-navigation'});
	const rightNav = $('<div>', {id: 'right-navigation'});
	pageGrid.append(
		$('<div>', {id: 'left-rail-wrapper'}),
		$('<div>', {
			id: 'personal-tools',
			class: 'global-top-navigation',
		}).append($('<ul>')),
		$('<div>', {id: 'page-actions'}).append(leftNav, rightNav),
		$('.main-container'),
		$('<footer>', {id: 'footer'}),
	);

	// Left rail
	$('#left-rail-wrapper').append(
		$('<a id="p-logo" href="/wiki/">'),
		$(portlet('navigation', 'Navigation')),
		$(portlet('interaction', 'Contribute')),
		$('.content-review__widget').removeAttr('class').attr(portletAttr('js-review')),
		$(portlet('my-tb', 'My tools')),
		$(portlet('global', 'Fandom')),
	);

	$('#p-navigation-body').html($('<ul>'));
	$('#p-navigation-body ul').append(
		$(`<li><a href="${mw.util.getUrl('Portal:Main')}">Main page</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:Forums')}">Forums</a></li>`),
		$('<li><a href="/f">Discussions</a></li>'),
		$(`<li><a href="${mw.util.getUrl('Special:Random')}">Random article</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:About')}">About Memory Alpha</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:Contact us')}">Contact us</a></li>`),
	);

	$('#p-interaction-body').html($('<ul>'));
	$('#p-interaction-body ul').append(
		$(`<li><a href="${mw.util.getUrl('MA Help:Contents')}">Help</a></li>`),
		$(`<li><a href="${mw.util.getUrl('MA Help:Editing')}">Learn to edit</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Special:Community')}">Community portal</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:FAQ')}">FAQ</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Memory Alpha:Policies and guidelines')}">Policies</a></li>`),
		$(`<li><a href="${mw.util.getUrl('Special:RecentChanges')}">Recent changes</a></li>`),
	);

	$('.content-review__widget__title').removeAttr('class').attr(pHeadingAttr('js-review'));
	$('#p-js-review-label').html('Review status').nextAll().wrapAll($('<div>').attr(pBodyAttr('js-review')));

	pageTools();

	const myTools = $('#my-tools-menu').length ? $('#my-tools-menu') : $('<ul>');
	$('#p-my-tb-body').html(myTools);
	$('#p-my-tb-body ul').removeAttr('class').append(
		$('li:has([data-tracking="admindashboard/toolbar/admin"])'),
		$('li:has([data-tracking="admindashboard/toolbar/reported"])'),
		$('li:has([data-tracking="quickanswers/toolbar"])'),
		$('li:has(.global-shortcuts-help-entry-point)'),
	);
	$('[data-tracking="admindashboard/toolbar/admin"]').html('Admin Dashboard');

	$('#p-global-body').html($('<ul>'));
	$('#p-global-body ul').append(
		$('<li><a href="https://www.fandom.com">Fandom home</a></li>'),
		$('<li><a href="https://www.fandom.com/fancentral/home">FanCentral</a></li>'),
		$('<li><a href="https://www.fandom.com/explore">Explore other wikis</a></li>'),
		$('<li><a href="https://community.fandom.com/wiki/">Community Central</a></li>'),
		$('<li><a href="https://createnewwiki.fandom.com/wiki/Special:CreateNewWiki">Start a wiki</a></li>'),
	);

	if ($('#collapsible-content-languages').length){
		$('#collapsible-content-languages a').wrap($('<li>'));
		$('#left-rail-wrapper').append($(portlet('lang', 'Languages')));
		$('#p-lang-body').html($('<ul>').append($('#collapsible-content-languages li')));
	}

	// Personal tools
	const logoutURL = `https://auth.fandom.com/logout?source=mw&redirect=${window.location.href}`;

	$('#personal-tools ul').append(
		$(ptItem('userpage', `User:${mw.config.get('wgUserName')}`, 'Your user page', mw.config.get('wgUserName'))),
		$(ptItem('notifications')).append($('#global-top-navigation .notifications')),
		$(ptItem('mytalk', `User talk:${mw.config.get('wgUserName')}`, 'Your talk page', 'Talk')),
		$(ptItem('sandbox', `User:${mw.config.get('wgUserName')}/sandbox`, 'Your sandbox', 'Sandbox')),
		$(ptItem('preferences', 'Special:Preferences', 'Your preferences', 'Preferences')),
		$(ptItem('watchlist', 'Special:Watchlist', 'The list of pages you are monitoring for changes', 'Watchlist')),
		$(ptItem('contribs', `Special:Contributions/${mw.config.get('wgUserName')}`, 'A list of your contributions', 'Contributions')),
		$(ptItem('logout')).append($(`<a href="${logoutURL}" title="Log out">Log out</a>`)),
	);

	$('.notifications__toggle').attr('title', 'Your notifications');

	// Page actions
	await skinConfig.associatedPages(leftNav);
	await skinConfig.views(rightNav);
	const actions = await skinConfig.actions(rightNav);

	$(actions).addClass('wds-dropdown');
	$(actions).find('label').addClass('wds-dropdown__toggle');
	$(actions).find('div').addClass('wds-dropdown__content');
	$(actions).find('ul').addClass(['wds-list', 'wds-is-linked']);

	rightNav.append($('<div id="search-box">'));
	$('#search-box').append($(`<form action="${mw.util.getUrl('Special:Search')}">`));
	$('#search-box form').append(
		$('<input type="search" id="searchInput" name="query" required placeholder="Search Memory Alpha">'),
		$('<input type="submit" id="searchButton" name="go" value="🔍" title="Go to a page with this exact name if it exists">'),
	);

	// Footer
	$('#footer').append(
		$('<div id="footer-copyright">').html($('.license-description').html()),
		$('<ul id="footer-places">'),
		$('<ul id="footer-icons">'),
	);

	$('#footer-places').append(
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

	$('#footer-icons').append(
		footerIcon('hostedbyico', 'Hosting provided by Fandom', 'https://www.fandom.com'),
		footerIcon('poweredbyico', 'Powered by MediaWiki', 'https://www.mediawiki.org'),
	);
});

function portlet(name, label){
	return `<nav class="portlet" id="p-${name}" aria-labelledby="p-${name}-label"><h2 class="pHeading" id="p-${name}-label">${label}</h2><div class="pBody" id="p-${name}-body"></div></nav>`;
}

function portletAttr(name){
	return {
		'role': 'navigation',
		'class': 'portlet',
		'id': `p-${name}`,
		'aria-labelledby': `p-${name}-label`,
	};
}

function pHeadingAttr(name){
	return {
		'class': 'pHeading',
		'id': `p-${name}-label`,
	};
}

function pBodyAttr(name){
	return {
		'class': 'pBody',
		'id': `p-${name}-body`,
	};
}

function footerIcon(id, title, url){
	return $('<li>').append($('<a>', {
		'class': 'footer-icon',
		'id': `footer-${id}`,
		'title': title,
		'href': url,
	}));
}

function pageTools(){
	if ($('#p-tb').length === 1){
		$('#p-interaction').after($('#p-tb').removeAttr('class id').attr(portletAttr('tb')));
		$('#p-tb h2')
			.removeAttr('class')
			.attr(pHeadingAttr('tb'))
			.html('Page tools')
			.after($('<div>').attr(pBodyAttr('tb')).html($('#p-tb ul').removeAttr('class')));
	} else if ($('.right-rail-wrapper').length === 1 && $('#p-js-review').length === 0){
		setTimeout(pageTools, 1000);
	}
}

function ptItem(id, url, title, text){
	if (url){
		return `<li class="ptItem" id="pt-${id}"><a href="${mw.util.getUrl(url)}" title="${title}">${text}</a></li>`;
	}

	return `<li class="ptItem" id="pt-${id}">`;
}

// {{JavaScript category}}