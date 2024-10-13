// Setup

$('.mediawiki').prepend($('<div id="page-grid">'));
$('#page-grid')
	.append($('<div id="left-rail-wrapper">'))
	.append($('<div id="personal-tools">'))
	.append($('<div id="page-actions">').append($('<ul>')))
	.append($('.main-container'));

// Left rail

function portlet(name){
	return '<section role="navigation" class="portlet" id="p-' + name + '" aria-labelledby="p-' + name + '-label"><h2 class="pHeading" id="p-' + name + '-label"></h2><div class="pBody" id="p-' + name + '-body"></div></section>';
}

function portletAttr(name){
	return {
		'role':'navigation',
		'class':'portlet',
		'id':'p-' + name,
		'aria-labelledby':'p-' + name + '-label',
	};
}

function pHeadingAttr(name){
	return {
		'class':'pHeading',
		'id':'p-' + name + '-label',
	};
}

function pBodyAttr(name){
	return {
		'class':'pBody',
		'id':'p-' + name + '-body',
	};
}

$('#left-rail-wrapper')
	.append($('.fandom-community-header__image'))
	.append($(portlet('navigation')))
	.append($(portlet('search')))
	.append($(portlet('interaction')))
	.append($('.content-review__widget').removeAttr('class').attr(portletAttr('js-review')))
	.append($(portlet('my-tb')))
	.append($(portlet('global')));

$('#p-navigation-label').html('Navigation');
$('#p-navigation-body').html($('<ul>'));
$('#p-navigation-body ul')
	.append($('<li><a href="' + mw.util.getUrl('Portal:Main') + '">Main page</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:Forums') + '">Forums</a></li>'))
	.append($('<li><a href="/f">Discussions</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Special:Random') + '">Random article</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:About') + '">About Memory Alpha</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:Contact us') + '">Contact us</a></li>'));

$('#p-search-label').html('Search');
$('#p-search-body').html($('<form action="' + mw.util.getUrl('Special:Search') + '">'));
$('#p-search-body form')
	.append($('<input type="search" name="query" placeholder="Search Memory Alpha" id="searchInput">'))
	.append($('<input type="submit" class="searchButton" name="go" value="Go" title="Go to a page with this exact name if it exists">'))
	.append($('<input type="submit" class="searchButton" name="fulltext" value="Search" title="Search Memory Alpha for this text">'));

$('#p-interaction-label').html('Contribute');
$('#p-interaction-body').html($('<ul>'));
$('#p-interaction-body ul')
	.append($('<li><a href="' + mw.util.getUrl('MA Help:Contents') + '">Help</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('MA Help:Editing') + '">Learn to edit</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Special:Community') + '">Community portal</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:FAQ') + '">FAQ</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Memory Alpha:Policies and guidelines') + '">Policies</a></li>'))
	.append($('<li><a href="' + mw.util.getUrl('Special:Recent changes') + '">Recent changes</a></li>'));

$('.content-review__widget__title').removeAttr('class').attr(pHeadingAttr('js-review'));
$('#p-js-review-label')
	.html('Review status')
	.nextAll()
	.wrapAll($('<div>').attr(pBodyAttr('js-review')));

pageTools();

function pageTools(){
	if ($('#p-tb').length === 1){
		$('#p-interaction').after($('#p-tb').removeAttr('class id').attr(portletAttr('tb')));
		$('#p-tb h2')
			.removeAttr('class')
			.attr(pHeadingAttr('tb'))
			.html('Page tools')
			.after($('<div>').attr(pBodyAttr('tb')).html($('#p-tb ul').removeAttr('class')));
	} else if ($('.right-rail-wrapper').length === 1 && $('#p-js-review').length === 0){
		setTimeout(function(){
			pageTools();
		}, 1000);
	}
}

var myTools = $('#my-tools-menu').length ? $('#my-tools-menu') : $('<ul>');
$('#p-my-tb-label').html('My tools');
$('#p-my-tb-body').html(myTools);
$('#p-my-tb-body ul')
	.removeAttr('id class')
	.append($('li:has([data-tracking="admindashboard/toolbar/admin"])'))
	.append($('li:has([data-tracking="admindashboard/toolbar/reported"])'))
	.append($('li:has([data-tracking="quickanswers/toolbar"])'))
	.append($('li:has(.global-shortcuts-help-entry-point)'));
$('[data-tracking="admindashboard/toolbar/admin"]').html('Admin Dashboard');

$('#p-global-label').html('Fandom');
$('#p-global-body').html($('<ul>'));
$('#p-global-body ul')
	.append($('<li><a href="https://www.fandom.com">Fandom home</a></li>'))
	.append($('<li><a href="https://www.fandom.com/fancentral/home">FanCentral</a></li>'))
	.append($('<li><a href="https://www.fandom.com/explore">Explore other wikis</a></li>'))
	.append($('<li><a href="https://community.fandom.com/wiki/">Community Central</a></li>'))
	.append($('<li><a href="https://createnewwiki.fandom.com/wiki/Special:CreateNewWiki">Start a wiki</a></li>'));

if ($('#collapsible-content-languages').length){
	$('#collapsible-content-languages a').wrap($('<li>'));
	$('#left-rail-wrapper').append($(portlet('lang')));
	$('#p-lang-label').html('Languages');
	$('#p-lang-body').html($('<ul>').append($('#collapsible-content-languages li')));
}

// Personal tools

$('#personal-tools').append($('[data-testid="global-navigation-user-options"] .wds-dropdown__content ul'));
$('#personal-tools ul').append($('<li>').append($('.notifications')));
$('#global-navigation-user-signout').after($('<li><a href="' + mw.util.getUrl('Special:Watchlist') + '">My Watchlist</a></li>'));

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

$('#page-actions ul')
	.append($('<li id="ca-nstab-main-li"><a id="ca-nstab-main" href="' + mw.util.getUrl(subjectPageName.getPrefixedText()) + '" title="View the content page">' + tabLabel + '</a></li>'))
	.append($('<li id="ca-talk-li" class="ca-tab-group-bookend"><a id="ca-talk" href="' + mw.util.getUrl(talkPageName.getPrefixedText()) + '" title="Discuss improvements to the content page">Talk</a></li>'))
	.append($('<li id="ca-edit-li">'))
	.append($('<li id="ca-history-li">'))
	.append($('<li id="ca-delete-li">'))
	.append($('<li id="ca-undelete-li">'))
	.append($('<li id="ca-move-li">'))
	.append($('<li id="ca-protect-li">'))
	.append($('<li id="ca-unprotect-li">'))
	.append($('<li id="ca-watch-li">'))
	.append($('<li id="ca-unwatch-li">'));

$('#ca-edit-li').append($('#ca-edit').removeAttr('class').attr('title', 'Edit this page'));
$('#ca-history-li').append($('#ca-history').attr('title', 'Past revisions of this page'));
$('#ca-delete-li').append($('#ca-delete').attr('title', 'Delete this page'));
$('#ca-undelete-li').append($('#ca-undelete').attr('title', 'Undelete this page'));
$('#ca-move-li').append($('#ca-move').attr('title', 'Rename this page'));
$('#ca-protect-li').append($('#ca-protect').attr('title', 'Protect this page from editing'));
$('#ca-unprotect-li').append($('#ca-unprotect').attr('title', 'Change the protection level on this page'));
$('#ca-watch-li').append($('#ca-watch').attr('title', 'Add this page to your watchlist'));
$('#ca-unwatch-li').append($('#ca-unwatch').attr('title', 'Remove this page from your watchlist'));

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
} else if (mw.config.get('wgAction') === 'protect'){
	$('#ca-protect-li').addClass('selected');
}

if (subjectNamespace === -1){
	$('#page-actions li:not(#ca-nstab-main-li)').remove();
}