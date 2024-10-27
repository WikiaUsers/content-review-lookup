// Setup

$('#p-cactions').attr('id', 'p-cactions-old');
$('.page-footer').removeAttr('class').attr('id', 'page-footer');
$('#mw-content-text').after($('#page-footer .wds-collapsible-panel'));

$('#page-footer')
	.append($('<div id="p-cactions"><h5 class="p-heading">Views</h5><ul></ul></div>'))
	.append($('<div id="p-personal"><h5 class="p-heading">Personal tools</h5><ul></ul></div>'))
	.append($('<a id="p-logo" title="Main page" href="/wiki/">'))
	.append($('<div id="p-nav"><h5 class="p-heading">Navigation</h5><ul></ul></div>'))
	.append($('<div id="p-search"><h5 class="p-heading">Search</h5></div>'))
	.append($('.notifications'))
	.append($('<div id="f-icons">'))
	.append($('<ul id="f-list">'));

// Views

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
var tabLabel = (subjectPageName.getPrefixedText() === 'Portal:Main') ? 'Main page' : subjectNamespaceName[subjectNamespace];

$('#p-cactions ul')
	.append($('<li id="ca-nstab-main-li"><a id="ca-nstab-main" href="' + mw.util.getUrl(subjectPageName.getPrefixedText()) + '" title="View the content page">' + tabLabel + '</a></li>'))
	.append($('<li id="ca-talk-li" class="ca-tab-group-bookend"><a id="ca-talk" href="' + mw.util.getUrl(talkPageName.getPrefixedText()) + '" title="Discuss improvements to the content page">Discussion</a></li>'))
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

$('#p-cactions li:empty').remove();

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
	$('#p-cactions li:not(#ca-nstab-main-li)').remove();
}

// Personal tools

function ptItem(id, url, title, text){
	if (url){
		return '<li id="pt-' + id + '"><a href="' + mw.util.getUrl(url) + '" title="' + title + '">' + text + '</a></li>';
	}
	
	return '<li id="pt-' + id + '">';
}

$('#p-personal ul')
	.append($(ptItem('userpage', 'User:' + mw.config.get('wgUserName'), 'Your user page', mw.config.get('wgUserName'))))
	.append($(ptItem('mytalk', 'User talk:' + mw.config.get('wgUserName'), 'Your talk page', 'My talk')))
	.append($(ptItem('sandbox', 'User:' + mw.config.get('wgUserName') + '/sandbox', 'Your sandbox', 'Sandbox')))
	.append($(ptItem('preferences', 'Special:Preferences', 'Your preferences', 'My preferences')))
	.append($(ptItem('watchlist', 'Special:Watchlist', 'The list of pages you are monitoring for changes', 'My watchlist')))
	.append($(ptItem('contribs', 'Special:Contributions/' + mw.config.get('wgUserName'), 'A list of your contributions', 'My contributions')))
	.append($(ptItem('logout')).append($('#global-navigation-logout-form')));

$('.global-navigation__signout-button').html('Log out').attr('title', 'Log out');

// Navigation

$('#p-nav ul')
	.append($('<li id="n-mainpage"><a href="/wiki/" title="Visit the main page">Main page</a></li>'))
	.append($('<li id="n-portal"><a href="' + mw.util.getUrl('Special:Community') + '" title="About the project, what you can do, where to find things">Community portal</a></li>'))
	.append($('<li id="n-recentchanges"><a href="' + mw.util.getUrl('Special:RecentChanges') + '" title="The list of recent changes in the wiki">Recent changes</a></li>'))
	.append($('<li id="n-randompage"><a href="' + mw.util.getUrl('Special:Random') + '" title="Load a random page">Random article</a></li>'))
	.append($('<li id="n-help"><a href="' + mw.util.getUrl('MA Help:Contents') + '" title="The place to find out">Help</a></li>'));

// Search

$('#p-search').append($('<form action="' + mw.util.getUrl('Special:Search') + '">'));
$('#p-search form')
	.append($('<input type="search" id="searchInput" name="query" required placeholder="Search Memory Alpha">'))
	.append($('<input type="submit" class="searchButton" name="go" value="Go" title="Go to a page with this exact name if it exists">'))
	.append($('<input type="submit" class="searchButton" name="fulltext" value="Search" title="Search Memory Alpha for this text">'));

// Toolbox

toolbox();

function toolbox(){
	if ($('#p-tb').length === 1){
		$('#p-search').after($('#p-tb').removeAttr('class'));
		$('#p-tb').prepend('<h5 class="p-heading">Toolbox</h5>');
		$('#p-tb ul').removeAttr('class');
	} else if ($('.right-rail-wrapper').length === 1 && $('#p-js-review').length === 0){
		setTimeout(function(){
			toolbox();
		}, 1000);
	}
}

// Notifications

$('.notifications__toggle').html('<h5 class="p-heading">Notifications (click to view)</h5>');

// Icons

function footerIcon(id, title, url){
	return '<a class="footer-icon" loading="lazy" id="f-' + id + '" title="' + title + '" href="' + url + '">';
}

$('#f-icons')
	.append($(footerIcon('hostedbyico', 'Hosting provided by Fandom', 'https://www.fandom.com')))
	.append($(footerIcon('poweredbyico', 'Powered by MediaWiki', 'https://www.mediawiki.org')))
	.append($(footerIcon('copyrightico', 'Community content available under the CC BY-NC 4.0', mw.util.getUrl('Memory Alpha:Copyrights'))));

// List

$('.license-description').wrap($('<li>'));
$('#f-list')
	.append($('li:has(.license-description)'))
	.append($('<li><a href="https://www.fandom.com/terms-of-use" title="Fandom Terms of Use">Terms of Use</a></li>'))
	.append($('<li><a href="https://www.fandom.com/privacy-policy" title="Fandom Privacy Policy">Privacy Policy</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:About') + '" title="Memory Alpha:About">About Memory Alpha</a></li>'));