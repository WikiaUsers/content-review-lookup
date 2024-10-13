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
	.append($('<div id="fandom-logo-page-top">'))
	.append($('[data-tracking-label="start-a-wiki"]'))
	.append($('<ul id="personal-tools">'));

$('#fandom-logo-page-top').append($('<a href="https://www.fandom.com">'));

$('.theme-fandomdesktop-dark #fandom-logo-page-top a').append($('<img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Fandom_logo_-_light_version.svg" height="44px">'));
$('.theme-fandomdesktop-light #fandom-logo-page-top a').append($('<img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Fandom.svg" height="44px">'));

$('#personal-tools')
	.append($('<li>').append($('.notifications')))
	.append($('li:has([data-tracking-label="account.profile"])'))
	.append($('li:has([data-tracking-label="account.talk"])'))
	.append($('<li><a href="' + mw.util.getUrl('Special:Watchlist') + '">Watchlist</a></li>'))
	.append($('<li>').append($('<div id="user-options-more-list" class="wds-dropdown">')))
	.append($('#global-navigation-user-signout'));

$('#user-options-more-list')
	.append($('<span class="wds-dropdown__toggle">More</span>'))
	.append($('[data-testid="global-navigation-user-options"] .wds-dropdown__content ul').addClass('wds-dropdown__content'));

$('[data-tracking-label="account.profile"]').html(mw.config.get('wgUserName'));
$('[data-tracking-label="account.talk"]').html($('[data-tracking-label="account.talk"]').html().trim());
$('.notifications .global-navigation__icon').attr('title', 'Your notifications');

// Left rail

$('#left-rail-wrapper')
	.append($('.fandom-community-header__image'))
	.append($('<div id="navigation_widget" class="rail-module">'))
	.append($('.content-review__widget'));

$('#navigation_widget')
	.append($('<div id="search_box">'))
	.append($('.fandom-sticky-header .fandom-community-header__local-navigation .wds-tabs'))
	.append($('.fandom-sticky-header #wiki-tools-menu .wds-list'));

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