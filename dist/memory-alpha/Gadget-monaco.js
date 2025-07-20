// Setup

$('.mediawiki').prepend($('<div id="page-grid">'));
$('#page-grid')
	.append($('<div id="top_header">'))
	.append($('<div id="left-rail-wrapper">'))
	.append($('<div id="page_bar"><ul id="page_controls"></ul><ul id="page_tabs"></ul></div>'))
	.append($('.main-container'));

// Personal tools

$('#top_header')
	.append($('<div id="top_header__backing">'))
	.append($('<a id="fandom-logo-page-top" href="https://www.fandom.com">'))
	.append($(`<a href="${mw.util.getUrl('Special:CreateNewWiki')}" id="new-wiki-button" title="Create a new wiki">Create a new wiki</a>`))
	.append($('<ul id="personal-tools">'));

const logoutURL = `https://auth.fandom.com/logout?source=mw&redirect=${window.location.href}`;

$('#personal-tools')
	.append($('<li class="global-top-navigation">').append($('#global-top-navigation .notifications')))
	.append($('<li>').append($('<a>', {
		'href': mw.util.getUrl(`User:${mw.config.get('wgUserName')}`),
		'title': 'Your user page',
		'text': mw.config.get('wgUserName'),
	})))
	.append($(`<li><a href="${mw.util.getUrl(`User talk:${mw.config.get('wgUserName')}`)}" title="Your talk page">My talk</a></li>`))
	.append($(`<li><a href="${mw.util.getUrl('Special:Watchlist')}" title="The list of pages you are monitoring for changes">Watchlist</a></li>`))
	.append($('<li id="user-options-more-list" class="wds-dropdown">'))
	.append($('<li><a href="' + logoutURL + '" title="Log out">Log out</a></li>'));

$('#user-options-more-list')
	.append($('<div class="wds-dropdown__toggle">More</div>'))
	.append($('<div class="wds-dropdown__content">').append($('<ul class="wds-list wds-is-linked">')
		.append($('<li>').append($('<a>', {
			'href': mw.util.getUrl(`Special:Contributions/${mw.config.get('wgUserName')}`),
			'title': 'A list of your contributions',
			'text': 'Contributions',
		})))
		.append($('<li>').append($(`<a href="${mw.util.getUrl('Special:Preferences')}" title="Your preferences">Preferences</a>`)))
		.append($('<li>').append($('<a>', {
			'href': mw.util.getUrl(`User:${mw.config.get('wgUserName')}/sandbox`),
			'title': 'Your sandbox',
			'text': 'Sandbox',
		})))
	));

$('.global-top-navigation .notifications').attr('title', 'Your notifications');

// Left rail

$('#left-rail-wrapper')
	.append($('<a id="p-logo" href="/wiki/">'))
	.append($('<div id="navigation_widget" class="rail-module">'))
	.append($('.content-review__widget'));

$('#navigation_widget')
	.append($('<div id="search_box">'))
	.append($('#community-navigation .fandom-community-header__local-navigation .wds-tabs'))
	.append($('#community-navigation #wiki-tools-menu .wds-list'));

if ($('#collapsible-content-languages').length){
	$('#left-rail-wrapper').append($('<section id="languages_widget" class="rail-module">'));
	$('#languages_widget')
		.append($('<h2 class="rail-module__header">Languages</2>'))
		.append($('#collapsible-content-languages'));
}

$('#search_box').append($('<form id="searchform" action="' + mw.util.getUrl('Special:Search') + '">'));

$('#searchform')
	.append($('<input type="search" name="query" placeholder="Search Memory Alpha" id="searchInput">'))
	.append($('<input type="submit" name="fulltext" value="🔍" title="Search Memory Alpha for this text" id="searchButton">'));

recentWikiActivity();

function recentWikiActivity(){
	if ($('#wikia-recent-activity').length === 1){
		$('#navigation_widget').after($('#wikia-recent-activity'));
		$('.activity-items').before($('.page-counter__value').html($('.page-counter__value').html()+' articles on Memory Alpha'));
	} else if ($('.right-rail-wrapper').length === 1){
		setTimeout(function(){
			recentWikiActivity();
		}, 1000);
	}
}

// Page actions

var subjectNamespaceName = {
	'-1':'Special page',
	'0':'Article',
	'2':'User page',
	'4':'Project page',
	'6':'File',
	'8':'Interface page',
	'10':'Template',
	'14':'Category',
	'102':'Portal',
	'110':'Forum',
	'112':'Help page',
	'828':'Module',
	'2900':'Map',
};

var pageName = mw.config.get('wgPageName').replace(/^Special:MovePage\//, '').replace(/_/g, ' ');
var subjectPageName = new mw.Title(pageName).getSubjectPage();
var talkPageName = new mw.Title(pageName).getTalkPage() ? new mw.Title(pageName).getTalkPage() : subjectPageName;

var subjectNamespace = subjectPageName.getNamespaceId();
var tabLabel = (subjectPageName.getPrefixedText() === 'Portal:Main') ? 'Main page' : subjectNamespaceName[subjectNamespace];

$('#page_controls')
	.append($('<li id="ca-edit-li">'))
	.append($('<li id="ca-history-li">'))
	.append($('<li id="ca-delete-li">'))
	.append($('<li id="ca-undelete-li">'))
	.append($('<li id="ca-move-li">'))
	.append($('<li id="ca-protect-li">'))
	.append($('<li id="ca-unprotect-li">'))
	.append($('<li id="ca-watch-li">'))
	.append($('<li id="ca-unwatch-li">'));

$('#page_tabs')
	.append($('<li id="ca-nstab-main-li"><a id="ca-nstab-main" href="' + mw.util.getUrl(subjectPageName.getPrefixedText()) + '" title="View the content page">' + tabLabel + '</a></li>'))
	.append($('<li id="ca-talk-li"><a id="ca-talk" href="' + mw.util.getUrl(talkPageName.getPrefixedText()) + '" title="Discuss improvements to the content page">Discussion</a></li>'));

$('#ca-edit-li').append(button('#ca-edit', 'Edit this page').removeAttr('class'));
$('#ca-history-li').append(button('#ca-history', 'Past revisions of this page'));
$('#ca-delete-li').append(button('#ca-delete', 'Delete this page'));
$('#ca-undelete-li').append(button('#ca-undelete', 'Undelete this page'));
$('#ca-move-li').append(button('#ca-move', 'Rename this page'));
$('#ca-protect-li').append(button('#ca-protect', 'Protect this page from editing'));
$('#ca-unprotect-li').append(button('#ca-unprotect', 'Change the protection level on this page'));
$('#ca-watch-li').append(button('#ca-watch', 'Add this page to your watchlist'));
$('#ca-unwatch-li').append(button('#ca-unwatch', 'Remove this page from your watchlist'));

$('#page_bar li:empty').remove();

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
} else if (mw.config.get('wgAction') === 'protect'){
	$('#ca-protect-li').addClass('selected');
}

if (subjectNamespace === -1){
	$('#page_bar li:not(#ca-nstab-main-li)').remove();
}

$('.mw-watchlink').click(function(){
	if ($('#ca-watch').length === 1){
		$('#ca-watch').attr('id', 'ca-unwatch');
		$('#ca-watch-li').attr('id', 'ca-unwatch-li');
	} else {
		$('#ca-unwatch').attr('id', 'ca-watch');
		$('#ca-unwatch-li').attr('id', 'ca-watch-li');
	}
});

function button(selector, title){
	return $(selector).attr('title', title).text($(selector).text().trim());
}