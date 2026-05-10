'use strict';
mw.hook('gadget.skin-setup').add(skinConfig => {
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
	skinConfig.mainMenu('#left-rail-wrapper');
	$('#left-rail-wrapper').append(portlet('search', 'Search'));
	skinConfig.toolbox('#left-rail-wrapper', 'Page tools');
	$('#left-rail-wrapper').append(portlet('my-tb', 'My tools'));

	$('#p-search > div').html($(`<form action="${mw.util.getUrl('Special:Search')}">`));
	$('#p-search > div > form')
		.append($('<input type="search" id="searchInput" name="query" required placeholder="Search Memory Alpha">'))
		.append($('<input type="submit" class="searchButton" name="go" value="Go" title="Go to a page with this exact name if it exists">'))
		.append($('<input type="submit" class="searchButton" name="fulltext" value="Search" title="Search Memory Alpha for this text">'));

	const myTools = $('#my-tools-menu').length ? $('#my-tools-menu') : $('<ul>');
	$('#p-my-tb-body').html(myTools);
	$('#p-my-tb-body ul')
		.removeAttr('class')
		.append($('li:has([data-tracking="admindashboard/toolbar/admin"])'))
		.append($('li:has([data-tracking="admindashboard/toolbar/reported"])'))
		.append($('li:has([data-tracking="quickanswers/toolbar"])'))
		.append($('li:has(.global-shortcuts-help-entry-point)'));
	$('[data-tracking="admindashboard/toolbar/admin"]').html('Admin Dashboard');

	$('#collapsible-content-languages').remove();
	skinConfig.langs('#left-rail-wrapper');

	// Personal tools
	function ptItem(id, url, title, text){
		if (url){
			return `<li class="ptItem" id="pt-${id}"><a href="${mw.util.getUrl(url)}" title="${title}">${text}</a></li>`;
		}

		return `<li class="ptItem" id="pt-${id}">`;
	}

	$('#personal-tools ul')
		.append($(ptItem('userpage', `User:${mw.config.get('wgUserName')}`, 'Your user page', mw.config.get('wgUserName'))))
		.append($(ptItem('notifications')).append($('#global-top-navigation .notifications')))
		.append($(ptItem('mytalk', `User talk:${mw.config.get('wgUserName')}`, 'Your talk page', 'Talk')))
		.append($(ptItem('sandbox', `User:${mw.config.get('wgUserName')}/sandbox`, 'Your sandbox', 'Sandbox')))
		.append($(ptItem('preferences', 'Special:Preferences', 'Your preferences', 'Preferences')))
		.append($(ptItem('watchlist', 'Special:Watchlist', 'The list of pages you are monitoring for changes', 'Watchlist')))
		.append($(ptItem('contribs', `Special:Contributions/${mw.config.get('wgUserName')}`, 'A list of your contributions', 'Contributions')))
		.append($(ptItem('logout', 'Special:UserLogout', 'Log out', 'Log out')));

	$('.notifications__toggle').attr('title', 'Your notifications');

	// Page actions
	function trimmer(selector){
		return $(selector).html($(selector).text().trim());
	}

	const pageName = mw.config.get('wgRelevantPageName').replaceAll('_', ' ');
	const subjectPageName = new mw.Title(pageName).getSubjectPage();
	const talkPageName = new mw.Title(pageName).getTalkPage() ? new mw.Title(pageName).getTalkPage() : subjectPageName;
	const subjectNamespace = subjectPageName.getNamespaceId();

	skinConfig.associatedPages(pageActions);
	$(pageActions).append($('<ul>').append(
		$('<li id="ca-edit-li">'),
		$('<li id="ca-history-li">'),
		$('<li id="ca-delete-li">'),
		$('<li id="ca-undelete-li">'),
		$('<li id="ca-move-li">'),
		$('<li id="ca-protect-li">'),
		$('<li id="ca-unprotect-li">'),
		$('<li id="ca-watch-li">'),
		$('<li id="ca-unwatch-li">'),
	));

	$('#ca-edit-li').append(trimmer('#ca-edit').removeAttr('class').attr('title', 'Edit this page'));
	$('#ca-history-li').append(trimmer('#ca-history').attr('title', 'Past revisions of this page'));
	$('#ca-delete-li').append(trimmer('#ca-delete').attr('title', 'Delete this page'));
	$('#ca-undelete-li').append(trimmer('#ca-undelete').attr('title', 'Undelete this page'));
	$('#ca-move-li').append(trimmer('#ca-move').attr('title', 'Rename this page'));
	$('#ca-protect-li').append(trimmer('#ca-protect').attr('title', 'Protect this page from editing'));
	$('#ca-unprotect-li').append(trimmer('#ca-unprotect').attr('title', 'Change the protection level on this page'));
	$('#ca-watch-li').append(trimmer('#ca-watch').attr('title', 'Add this page to your watchlist'));
	$('#ca-unwatch-li').append(trimmer('#ca-unwatch').attr('title', 'Remove this page from your watchlist'));

	$('#page-actions li:empty').remove();
	$('#page-actions li:last-child').prev().addClass('ca-tab-group-bookend');

	if (pageName === subjectPageName.getPrefixedText()){
		$('#ca-nstab-main-li').addClass('selected');
	} else {
		$('#ca-talk-li').addClass('selected');
	}

	if (mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit'){
		$('#ca-edit-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'history'){
		$('#ca-history-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'delete'){
		$('#ca-delete-li').addClass('selected');
	} else if (mw.config.get('wgPageName').split('/')[0] === 'Special:MovePage'){
		$('#ca-move-li').addClass('selected');
	} else if (mw.config.get('wgAction') === 'protect' || mw.config.get('wgAction') === 'unprotect'){
		$('#ca-protect-li, #ca-unprotect-li').addClass('selected');
	}

	if (subjectNamespace === -1){
		$('#page-actions li:not(#ca-nstab-main-li)').remove();
	} else if (subjectNamespace === 110){
		$('#ca-nstab-main-li').addClass('ca-tab-group-bookend');
	}

	// Footer
	function footerIcon(id, title, url){
		return `<a class="footer-icon" id="f-${id}" title="${title}" href="${url}">`;
	}

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