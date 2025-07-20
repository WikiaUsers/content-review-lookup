'use strict';
$(() => {
	// Setup
	$('.mediawiki').prepend($('<div id="page-grid">'));
	$('#page-grid')
		.append($('<div id="left-rail-wrapper">'))
		.append($('<div id="personal-tools" class="global-top-navigation">').append($('<ul>')))
		.append($('<div id="page-actions">'))
		.append($('.main-container'))
		.append($('<footer id="footer">'));
	
	// Left rail
	$('#left-rail-wrapper')
		.append($('<a id="p-logo" href="/wiki/">'))
		.append($(portlet('navigation', 'Navigation')))
		.append($(portlet('interaction', 'Contribute')))
		.append($('.content-review__widget').removeAttr('class').attr(portletAttr('js-review')))
		.append($(portlet('my-tb', 'My tools')))
		.append($(portlet('global', 'Fandom')));
	
	$('#p-navigation-body').html($('<ul>'));
	$('#p-navigation-body ul')
		.append($(`<li><a href="${mw.util.getUrl('Portal:Main')}">Main page</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:Forums')}">Forums</a></li>`))
		.append($('<li><a href="/f">Discussions</a></li>'))
		.append($(`<li><a href="${mw.util.getUrl('Special:Random')}">Random article</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:About')}">About Memory Alpha</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:Contact us')}">Contact us</a></li>`));
	
	$('#p-interaction-body').html($('<ul>'));
	$('#p-interaction-body ul')
		.append($(`<li><a href="${mw.util.getUrl('MA Help:Contents')}">Help</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('MA Help:Editing')}">Learn to edit</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Special:Community')}">Community portal</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:FAQ')}">FAQ</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:Policies and guidelines')}">Policies</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Special:RecentChanges')}">Recent changes</a></li>`));
	
	$('.content-review__widget__title').removeAttr('class').attr(pHeadingAttr('js-review'));
	$('#p-js-review-label')
		.html('Review status')
		.nextAll()
		.wrapAll($('<div>').attr(pBodyAttr('js-review')));
	
	pageTools();
	
	const myTools = $('#my-tools-menu').length ? $('#my-tools-menu') : $('<ul>');
	$('#p-my-tb-body').html(myTools);
	$('#p-my-tb-body ul')
		.removeAttr('class')
		.append($('li:has([data-tracking="admindashboard/toolbar/admin"])'))
		.append($('li:has([data-tracking="admindashboard/toolbar/reported"])'))
		.append($('li:has([data-tracking="quickanswers/toolbar"])'))
		.append($('li:has(.global-shortcuts-help-entry-point)'));
	$('[data-tracking="admindashboard/toolbar/admin"]').html('Admin Dashboard');
	
	$('#p-global-body').html($('<ul>'));
	$('#p-global-body ul')
		.append($('<li><a href="https://www.fandom.com">Fandom home</a></li>'))
		.append($('<li><a href="https://www.fandom.com/fancentral/home">FanCentral</a></li>'))
		.append($('<li><a href="https://www.fandom.com/explore">Explore other wikis</a></li>'))
		.append($('<li><a href="https://community.fandom.com/wiki/">Community Central</a></li>'))
		.append($('<li><a href="https://createnewwiki.fandom.com/wiki/Special:CreateNewWiki">Start a wiki</a></li>'));
	
	if ($('#collapsible-content-languages').length){
		$('#collapsible-content-languages a').wrap($('<li>'));
		$('#left-rail-wrapper').append($(portlet('lang', 'Languages')));
		$('#p-lang-body').html($('<ul>').append($('#collapsible-content-languages li')));
	}
	
	// Personal tools
	const logoutURL = `https://auth.fandom.com/logout?source=mw&redirect=${window.location.href}`;
	
	$('#personal-tools ul')
		.append($(ptItem('userpage', `User:${mw.config.get('wgUserName')}`, 'Your user page', mw.config.get('wgUserName'))))
		.append($(ptItem('notifications')).append($('#global-top-navigation .notifications')))
		.append($(ptItem('mytalk', `User talk:${mw.config.get('wgUserName')}`, 'Your talk page', 'Talk')))
		.append($(ptItem('sandbox', `User:${mw.config.get('wgUserName')}/sandbox`, 'Your sandbox', 'Sandbox')))
		.append($(ptItem('preferences', 'Special:Preferences', 'Your preferences', 'Preferences')))
		.append($(ptItem('watchlist', 'Special:Watchlist', 'The list of pages you are monitoring for changes', 'Watchlist')))
		.append($(ptItem('contribs', `Special:Contributions/${mw.config.get('wgUserName')}`, 'A list of your contributions', 'Contributions')))
		.append($(ptItem('logout')).append($(`<a href="${logoutURL}" title="Log out">Log out</a>`)));
	
	$('.notifications__toggle').attr('title', 'Your notifications');
	
	// Page actions
	const subjectNamespaceName = {
		'-1': 'Special page',
		'0': 'Article',
		'2': 'User page',
		'4': 'Project page',
		'6': 'File',
		'8': 'Interface page',
		'10': 'Template',
		'14': 'Category',
		'102': 'Portal',
		'110': 'Forum',
		'112': 'Help page',
		'828': 'Module',
		'2900': 'Map',
	};
	
	const pageName = mw.config.get('wgPageName').replace(/^Special:MovePage\//, '').replace(/_/g, ' ');
	const subjectPageName = new mw.Title(pageName).getSubjectPage();
	const talkPageName = new mw.Title(pageName).getTalkPage() ? new mw.Title(pageName).getTalkPage() : subjectPageName;
	
	const subjectNamespace = subjectPageName.getNamespaceId();
	const tabLabel = (subjectPageName.getPrefixedText() === 'Portal:Main') ? 'Main Page' : subjectNamespaceName[subjectNamespace];
	
	$('#page-actions').append($('<ul id="left-navigation">'));
	$('#left-navigation')
		.append($(`<li id="ca-nstab-main-li"><a id="ca-nstab-main" href="${mw.util.getUrl(subjectPageName.getPrefixedText())}" title="View the content page">${tabLabel}</a></li>`))
		.append($(`<li id="ca-talk-li"><a id="ca-talk" href="${mw.util.getUrl(talkPageName.getPrefixedText())}" title="Discuss improvements to the content page">Talk</a></li>`));
	
	$('#page-actions').append($('<ul id="right-navigation">'));
	$('#right-navigation')
		.append($('<li id="ca-view-li">'))
		.append($('<li id="ca-edit-li">'))
		.append($('<li id="ca-history-li">'))
		.append($('<li id="ca-watch-li">'))
		.append($('<li id="ca-unwatch-li">'))
		.append($('<li id="more-page-actions" class="wds-dropdown">'))
		.append($('<li id="search-box">'));
	
	$('#search-box').append($(`<form action="${mw.util.getUrl('Special:Search')}">`));
	$('#search-box form')
		.append($('<input type="search" id="searchInput" name="query" required placeholder="Search Memory Alpha">'))
		.append($('<input type="submit" id="searchButton" name="go" value="🔍" title="Go to a page with this exact name if it exists">'));
	
	$('#more-page-actions').append($('<a class="wds-dropdown__toggle">More</a>'));
	$('#more-page-actions').append($('<div class="wds-dropdown__content">').append($('<ul class="wds-list wds-is-linked">')));
	$('#more-page-actions .wds-list')
		.append($('<li id="ca-delete-li">'))
		.append($('<li id="ca-undelete-li">'))
		.append($('<li id="ca-move-li">'))
		.append($('<li id="ca-protect-li">'))
		.append($('<li id="ca-unprotect-li">'));
	
	$('#ca-view-li').append($(`<a href="${mw.util.getUrl(subjectPageName.getPrefixedText())}">Read</a>`));
	$('#ca-edit-li').append(trimmer('#ca-edit').removeAttr('class').attr('title', 'Edit this page'));
	$('#ca-history-li').append($('#ca-history').html('View history').attr('title', 'Past revisions of this page'));
	$('#ca-watch-li').append(trimmer('#ca-watch').attr('title', 'Add this page to your watchlist'));
	$('#ca-unwatch-li').append(trimmer('#ca-unwatch').attr('title', 'Remove this page from your watchlist'));
	
	$('#ca-delete-li').append(trimmer('#ca-delete').attr('title', 'Delete this page'));
	$('#ca-undelete-li').append(trimmer('#ca-undelete').attr('title', 'Undelete this page'));
	$('#ca-move-li').append(trimmer('#ca-move').attr('title', 'Rename this page'));
	$('#ca-protect-li').append(trimmer('#ca-protect').attr('title', 'Protect this page from editing'));
	$('#ca-unprotect-li').append(trimmer('#ca-unprotect').attr('title', 'Change the protection level on this page'));
	
	$('#page-actions li:empty').remove();
	
	if (pageName === subjectPageName.getPrefixedText()){
		$('#ca-nstab-main-li').addClass('selected');
	} else {
		$('#ca-talk-li').addClass('selected');
	}
	
	if (mw.config.get('wgPageName').split('/')[0] === 'Special:MovePage'){
		$('#ca-move-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'view'){
		$('#ca-view-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit'){
		$('#ca-edit-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'history'){
		$('#ca-history-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'delete'){
		$('#ca-delete-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'protect' || mw.config.get('wgAction') === 'unprotect'){
		$('#ca-protect-li, #ca-unprotect-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'watch' || mw.config.get('wgAction') === 'unwatch'){
		$('#ca-watch-li, #ca-unwatch-li').addClass('selected');
	}
	
	if (subjectNamespace === -1){
		$('#page-actions li:not(#ca-nstab-main-li)').remove();
	}
	
	updateWatchButtons();
	
	// Footer
	$('#footer')
		.append($(footerIcon('hostedbyico', 'Hosting provided by Fandom', 'https://www.fandom.com')))
		.append($(footerIcon('poweredbyico', 'Powered by MediaWiki', 'https://www.mediawiki.org')))
		.append($('<ul id="f-list">'));
	
	$('#f-list')
		.append($('<li class="license-description">').html($('.license-description').html()))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:About')}">About Memory Alpha</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:Copyrights')}">Copyright</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Special:Statistics')}">Statistics</a></li>`))
		.append($(`<li><a href="${mw.util.getUrl('Memory Alpha:Contact us')}">Contact Memory Alpha</a></li>`))
		.append($('<li><a href="https://www.fandom.com/privacy-policy">Privacy Policy</a></li>'))
		.append($('<li><a href="https://www.fandom.com/terms-of-use">Terms of Use</a></li>'))
		.append($('<li><a href="https://www.fandom.com/terms-of-sale">Terms of Sale</a></li>'))
		.append($('<li><a href="https://www.fandom.com/community-creation-policy">Community Creation Policy</a></li>'))
		.append($('<li><a href="https://about.fandom.com/about">About Fandom</a></li>'));
	
	$('#f-list li:empty').remove();
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
	return `<a class="footer-icon" loading="lazy" id="f-${id}" title="${title}" href="${url}">`;
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

function trimmer(selector){
	return $(selector).html($(selector).text().trim());
}

function updateWatchButtons(){
	$('#ca-watch').on('click', () => {
		$('#ca-watch-li').attr('id', 'ca-unwatch-li');
		$('#ca-watch').attr('id', 'ca-unwatch');
		updateWatchButtons();
	});
	
	$('#ca-unwatch').on('click', () => {
		$('#ca-unwatch-li').attr('id', 'ca-watch-li');
		$('#ca-unwatch').attr('id', 'ca-watch');
		updateWatchButtons();
	});
}