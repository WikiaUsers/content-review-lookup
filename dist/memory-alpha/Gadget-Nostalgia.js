// Setup

$('.page-footer').removeAttr('class').attr('id', 'page-footer');
$('#mw-content-text').after($('#page-footer .wds-collapsible-panel'));
$('.page-header')
	.before($('<a id="ma-logo-main" href="/wiki/">'))
	.after($('<div id="topbar">'));

// Top bar

function link(target, text, id){
	if (id){
		return '<a id="' + id + '" href="' + mw.util.getUrl(target) + '" title="' + target + '">' + text + '</a>';
	}
	
	return '<a href="' + mw.util.getUrl(target) + '" title="' + target + '">' + text + '</a>';
}

function trimmer(selector){
	return $(selector).html($(selector).text().trim());
}

var pageName = mw.config.get('wgPageName').replace(/^Special:MovePage\//, '').replace(/_/g, ' ');
var subjectPageName = new mw.Title(pageName).getSubjectPage();
var talkPageName = new mw.Title(pageName).getTalkPage() ? new mw.Title(pageName).getTalkPage() : subjectPageName;
var subjectNamespace = subjectPageName.getNamespaceId();
var associatedPageLink = (pageName === subjectPageName.getPrefixedText()) ?
	'<li class="ca-talk-li">' + link(talkPageName.getPrefixedText(), 'Discuss this page', 'ca-talk') + '</li>' :
	'<li class="ca-nstab-main-li">' + link(subjectPageName.getPrefixedText(), 'View content page', 'ca-nstab-main') + '</li>';

$('#topbar')
	.append($('<ul class="wire-list" id="tb-list-one">'))
	.append($('<ul class="wire-list" id="tb-list-two">'));

$('#tb-list-one')
	.append($('<li><a href="/wiki/" title="Main page">Main page</a></li>'))
	.append($('<li>').append($(link('Special:RecentChanges', 'Recent changes'))))
	.append($('<li id="ca-edit-li">'))
	.append($(associatedPageLink))
	.append($('<li id="ca-history-li">'))
	.append($('<li>').append($(link('User:' + mw.config.get('wgUserName'), 'My page'))))
	.append($('<li>').append($(link('User talk:' + mw.config.get('wgUserName'), 'My talk'))))
	.append($('<li>').append($(link('User:' + mw.config.get('wgUserName') + '/sandbox', 'My sandbox'))))
	.append($('<li>').append($(link('Special:Watchlist', 'My watchlist'))))
	.append($('<li>').append($(link('Special:Contributions/' + mw.config.get('wgUserName'), 'My contributions'))))
	.append($('<li>').append($(link('Special:Preferences', 'Preferences'))))
	.append($('<li>').append($(link('Special:Upload', 'Upload file'))))
	.append($('<li>').append($('#global-navigation-logout-form')))
	.append($('<li>').append($('.notifications')));

$('#tb-list-two')
	.append($('<li><a href="javascript:print();" title="Print this page">Printable version</a></li>'))
	.append($('<li>').append($(link('Memory Alpha:About', 'About Memory Alpha'))))
	.append($('<li>').append($(link('Memory Alpha:Copyrights', 'Copyrights'))));

$('#ca-edit-li').append(trimmer('#ca-edit').removeAttr('class').attr('title', 'Edit this page'));
$('#ca-history-li').append(trimmer('#ca-history').attr('title', 'Past revisions of this page'));
$('.notifications__toggle').attr('title', 'Your notifications');
$('.global-navigation__signout-button').html('Log out').attr('title', 'Log out');

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

// Footer

$('#page-footer')
	.append($('<ul class="wire-list" id="f-list-one">'))
	.append($('.license-description'))
	.append($('<ul class="wire-list" id="f-list-two">'));

$('#f-list-one')
	.append($('<li id="f-item-edit">'))
	.append($('<li id="ca-watch-li">'))
	.append($('<li id="ca-unwatch-li">'))
	.append($(associatedPageLink))
	.append($('<li id="f-item-history">'))
	.append($('<li>').append($(link('Special:WhatLinksHere/' + pageName, 'What links here'))))
	.append($('<li>').append($(link('Special:RecentChangesLinked/' + pageName, 'Related changes'))))
	.append($('<li id="ca-delete-li">'))
	.append($('<li id="ca-undelete-li">'))
	.append($('<li id="ca-protect-li">'))
	.append($('<li id="ca-unprotect-li">'))
	.append($('<li id="ca-move-li">'));

$('#f-list-two')
	.append($('<li><a href="/wiki/" title="Main page">Main page</a></li>'))
	.append($('<li>').append($(link('Memory Alpha:About', 'About Memory Alpha'))))
	.append($('<li>').append($(link('Memory Alpha:Forums', 'Forums'))))
	.append($('<li><a href="/f">Discussions</a></li>'))
	.append($('<li>').append($(link('Special:Random', 'Random article'))))
	.append($('<li>').append($(link('Memory Alpha:Contact us', 'Contact us'))))
	.append($('<li>').append($(link('MA Help:Contents', 'Help'))))
	.append($('<li>').append($(link('MA Help:Editing', 'Learn to edit'))))
	.append($('<li>').append($(link('Special:Community', 'Community portal'))))
	.append($('<li>').append($(link('Memory Alpha:FAQ', 'FAQ'))))
	.append($('<li>').append($(link('Memory Alpha:Policies and guidelines', 'Policies'))))
	.append($('<li><a href="https://www.fandom.com/privacy-policy" title="Fandom Privacy Policy">Privacy Policy</a></li>'))
	.append($('<li><a href="https://www.fandom.com/terms-of-use" title="Fandom Terms of Use">Terms of Use</a></li>'))
	.append($('<li>').append($('<form class="searchform" action="' + mw.util.getUrl('Special:Search') + '">')));

$('.searchform')
	.append($('<input type="search" class="searchInput" name="query" required placeholder="Search Memory Alpha">'))
	.append($('<input type="submit" class="searchButton" name="go" value="Go" title="Go to a page with this exact name if it exists">'))
	.append($('<input type="submit" class="searchButton" name="fulltext" value="Search" title="Search Memory Alpha for this text">'));

$('#f-item-edit').append($('#ca-edit').clone().removeAttr('id'));
$('#ca-watch-li').append(trimmer('#ca-watch').attr('title', 'Add this page to your watchlist'));
$('#ca-unwatch-li').append(trimmer('#ca-unwatch').attr('title', 'Remove this page from your watchlist'));
$('#f-item-history').append($('#ca-history').clone().removeAttr('id'));
$('#ca-delete-li').append(trimmer('#ca-delete').attr('title', 'Delete this page'));
$('#ca-undelete-li').append(trimmer('#ca-undelete').attr('title', 'Undelete this page'));
$('#ca-protect-li').append(trimmer('#ca-protect').attr('title', 'Protect this page from editing'));
$('#ca-unprotect-li').append(trimmer('#ca-unprotect').attr('title', 'Change the protection level on this page'));
$('#ca-move-li').append(trimmer('#ca-move').attr('title', 'Rename this page'));

$('li:empty').remove();

// Special pages

if (subjectNamespace === -1){
	var pageActions = [
		'#ca-edit-li',
		'.ca-talk-li',
		'.ca-nstab-main-li',
		'#ca-history-li',
		'#f-list-one',
	];
	
	$(pageActions.join(', ')).remove();
}