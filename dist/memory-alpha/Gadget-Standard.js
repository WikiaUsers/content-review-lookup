// Setup

$('.mediawiki').prepend($('<div id="page-grid">'));
$('#page-grid')
	.append($('<div id="left-rail-wrapper">'))
	.append($('<div id="topbar">'))
	.append($('<div id="personal-tools">'))
	.append($('.main-container'))
	.append($('<footer id="footer">'));

// Left rail

function portlet(id, label){
	return '<nav class="portlet" id="p-' + id + '" aria-label="' + label + '">';
}

function portletAttr(id, label){
	return {
		'class':'portlet',
		'id':'p-' + id,
		'aria-label':label,
	};
}

function trimmer(selector){
	return $(selector).html($(selector).text().trim());
}

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
var tabLabel = 'View ' + ((subjectPageName.getPrefixedText() === 'Portal:Main') ? 'Main page' : subjectNamespaceName[subjectNamespace]).toLowerCase();

$('#left-rail-wrapper')
	.append($('<a id="p-logo" href="/wiki/">'))
	.append($(portlet('navigation', 'Navigation')))
	.append($(portlet('page-actions', 'Page actions')).append($('<ul>')))
	.append($(portlet('interaction', 'Contribute')))
	.append($('.content-review__widget').removeAttr('class').attr(portletAttr('js-review', 'Review status')))
	.append($(portlet('my-tb', 'My tools')))
	.append($(portlet('global', 'Fandom')));

$('#p-navigation').html($('<ul>'));
$('#p-navigation ul')
	.append($('<li><a href="' + mw.util.getUrl('Portal:Main') + '">Main page</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:Forums') + '">Forums</a></li>'))
	.append($('<li><a href="/f">Discussions</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Special:Random') + '">Random article</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:About') + '">About Memory Alpha</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:Contact us') + '">Contact us</a></li>'));

$('#p-page-actions ul')
	.append($('<li id="ca-nstab-main-li"><a id="ca-nstab-main" href="' + mw.util.getUrl(subjectPageName.getPrefixedText()) + '" title="View the content page">' + tabLabel + '</a></li>'))
	.append($('<li id="ca-talk-li"><a id="ca-talk" href="' + mw.util.getUrl(talkPageName.getPrefixedText()) + '" title="Discuss improvements to the content page">Discuss</a></li>'))
	.append($('<li id="ca-edit-li">'))
	.append($('<li id="ca-history-li">'))
	.append($('<li id="ca-delete-li">'))
	.append($('<li id="ca-undelete-li">'))
	.append($('<li id="ca-move-li">'))
	.append($('<li id="ca-protect-li">'))
	.append($('<li id="ca-unprotect-li">'))
	.append($('<li id="ca-watch-li">'))
	.append($('<li id="ca-unwatch-li">'));

$('#ca-edit-li').append(trimmer('#ca-edit').removeAttr('class').attr('title', 'Edit this page'));
$('#ca-history-li').append(trimmer('#ca-history').attr('title', 'Past revisions of this page'));
$('#ca-delete-li').append(trimmer('#ca-delete').attr('title', 'Delete this page'));
$('#ca-undelete-li').append(trimmer('#ca-undelete').attr('title', 'Undelete this page'));
$('#ca-move-li').append(trimmer('#ca-move').attr('title', 'Rename this page'));
$('#ca-protect-li').append(trimmer('#ca-protect').attr('title', 'Protect this page from editing'));
$('#ca-unprotect-li').append(trimmer('#ca-unprotect').attr('title', 'Change the protection level on this page'));
$('#ca-watch-li').append(trimmer('#ca-watch').attr('title', 'Add this page to your watchlist'));
$('#ca-unwatch-li').append(trimmer('#ca-unwatch').attr('title', 'Remove this page from your watchlist'));

$('#p-page-actions li:empty').remove();

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
	$('#p-page-actions').remove();
}

$('#p-interaction').html($('<ul>'));
$('#p-interaction ul')
	.append($('<li><a href="' + mw.util.getUrl('MA Help:Contents') + '">Help</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('MA Help:Editing') + '">Learn to edit</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Special:Community') + '">Community portal</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:FAQ') + '">FAQ</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:Policies and guidelines') + '">Policies</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Special:RecentChanges') + '">Recent changes</a></li>'));

pageTools();

function pageTools(){
	if ($('#p-tb').length === 1){
		$('#p-interaction').after($('#p-tb').removeAttr('class id').attr(portletAttr('tb', 'Page tools')));
		$('#p-tb ul').removeAttr('class');
	} else if ($('.right-rail-wrapper').length === 1 && $('#p-js-review').length === 0){
		setTimeout(function(){
			pageTools();
		}, 1000);
	}
}

var myTools = $('#my-tools-menu').length ? $('#my-tools-menu') : $('<ul>');
$('#p-my-tb').html(myTools);
$('#p-my-tb ul')
	.removeAttr('id class')
	.append($('li:has([data-tracking="admindashboard/toolbar/admin"])'))
	.append($('li:has([data-tracking="admindashboard/toolbar/reported"])'))
	.append($('li:has([data-tracking="quickanswers/toolbar"])'))
	.append($('li:has(.global-shortcuts-help-entry-point)'));
$('[data-tracking="admindashboard/toolbar/admin"]').html('Admin Dashboard');

$('#p-global').html($('<ul>'));
$('#p-global ul')
	.append($('<li><a href="https://www.fandom.com">Fandom home</a></li>'))
	.append($('<li><a href="https://www.fandom.com/fancentral/home">FanCentral</a></li>'))
	.append($('<li><a href="https://www.fandom.com/explore">Explore other wikis</a></li>'))
	.append($('<li><a href="https://community.fandom.com/wiki/">Community Central</a></li>'))
	.append($('<li><a href="https://createnewwiki.fandom.com/wiki/Special:CreateNewWiki">Start a wiki</a></li>'));

if ($('#collapsible-content-languages').length){
	$('#collapsible-content-languages a').wrap($('<li>'));
	$('#left-rail-wrapper').append($(portlet('lang', 'Languages')));
	$('#p-lang').html($('<ul>').append($('#collapsible-content-languages li')));
}

// Top bar

$('#topbar')
	.append($('<ul class="wire-list" id="tb-list-one">'))
	.append($('<ul class="wire-list" id="tb-list-two">'));

$('#ca-edit')
	.clone()
	.removeAttr('id')
	.wrap($('<li id="tb-item-edit">'));

$('#ca-history')
	.clone()
	.removeAttr('id')
	.wrap($('<li id="tb-item-history">'));

$('#tb-list-one')
	.append($('<li><a href="/wiki/" title="Portal:Main">Main page</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Special:RecentChanges') + '" title="Special:RecentChanges">Recent changes</a></li>'))
	.append($('#tb-item-edit'))
	.append($('#tb-item-history'))
	.append($('<li><a href="javascript:print();" title="Print this page">Printable version</a></li>'));

$('#tb-list-two')
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:Copyrights') + '" title="Memory Alpha copyright information">Copyrights</a></li>'))
	.append($('<li><a href="https://www.fandom.com/privacy-policy" title="Fandom Privacy Policy">Privacy Policy</a></li>'))
	.append($('<li><a href="https://www.fandom.com/terms-of-use" title="Fandom Terms of Use">Terms of Use</a></li>'))
	.append($('<li><a href="https://www.fandom.com/terms-of-sale" title="Fandom Terms of Sale">Terms of Sale</a></li>'));

// Personal tools

function ptItem(id, url, title, text){
	if (url){
		return '<li class="ptItem" id="pt-' + id + '"><a href="' + mw.util.getUrl(url) + '" title="' + title + '">' + text + '</a></li>';
	}
	
	return '<li class="ptItem" id="pt-' + id + '">';
}

$('#personal-tools')
	.append($('<ul id="pt-list-one">'))
	.append($('<ul id="pt-list-two" class="wire-list">'))
	.append($('<form class="searchform" action="' + mw.util.getUrl('Special:Search') + '">'));

$('#pt-list-one')
	.append($('<li>').append($('.notifications')))
	.append($('<li><a href="' + mw.util.getUrl('User:' + mw.config.get('wgUserName')) + '" title="Your user page">' + mw.config.get('wgUserName') + '</a> (<a href="' + mw.util.getUrl('User talk:' + mw.config.get('wgUserName')) + '" title="Your talk page">talk</a>)</li>'));

$('#pt-list-two')
	.append($(ptItem('logout')).append($('#global-navigation-logout-form')))
	.append($(ptItem('preferences', 'Special:Preferences', 'Your preferences', 'Preferences')))
	.append($(ptItem('sandbox', 'User:' + mw.config.get('wgUserName') + '/sandbox', 'Your sandbox', 'Sandbox')))
	.append($(ptItem('watchlist', 'Special:Watchlist', 'The list of pages you are monitoring for changes', 'Watchlist')))
	.append($(ptItem('contribs', 'Special:Contributions/' + mw.config.get('wgUserName'), 'A list of your contributions', 'Contributions')));

$('.notifications__toggle').attr('title', 'Your notifications');
$('.global-navigation__signout-button').html('Log out').attr('title', 'Log out');

$('.searchform')
	.append($('<input type="search" required name="query" placeholder="Search Memory Alpha" class="searchInput">'))
	.append($('<input type="submit" class="searchButton" name="go" value="Go" title="Go to a page with this exact name if it exists">'))
	.append($('<input type="submit" class="searchButton" name="fulltext" value="Search" title="Search Memory Alpha for this text">'));

// Footer

$('#footer')
	.append($('#p-page-actions ul').clone().attr({'id':'f-action-list', 'class':'wire-list'}))
	.append($('<ul id="f-nav-list" class="wire-list">'))
	.append($('.license-description'));

$('#f-nav-list')
	.append($('<li><a href="/wiki/" title="Portal:Main">Main page</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:About') + '" title="Memory Alpha:About">About Memory Alpha</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Special:RecentChanges') + '" title="Special:RecentChanges">Recent changes</a></li>'))
	.append($('<li>').append($('.searchform').clone()));