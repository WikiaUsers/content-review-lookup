$(function() {

var conf = mw.config.get([
    'wgPageName',
    'wgRestrictionMove',
    'wgUserGroups',
    'wgFormattedNamespaces',
    'wgUserName',
    'wgCanonicalNamespace'
]);

var pagename = conf.wgPageName;
var move_level = conf.wgRestrictionMove;
var user_groups = conf.wgUserGroups;
var autoconfirmed = 0;
var local_staff = 0;
var local_admin = 0;
var global_staff = 0;

if ( conf.wgCanonicalNamespace == 'File' ) {
	$('.wiki-page-header__link-container').append(
		$('<a id="wiki-page-header-edit-link" class="wiki-page-header__edit-link" href="/wiki/MobileEdittools?action=submit"><svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-pencil-small"></use></svg><span>Edit</span></a>'),
		$('<div class="wds-dropdown"><div class="wds-dropdown__toggle wds-button wds-is-text wiki-page-header__actions-toggle"><svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-more-small"></use></svg></div><div class="wds-dropdown__content wds-is-not-scrollable"><ul class="wds-list wds-is-linked"><li><a href="' + mw.util.getUrl('Special:History/'+ pagename) + '">History</a></li></ul></div></div>')
	);
}

$.each(user_groups, function( index, group ) {
	if (group == 'autoconfirmed') autoconfirmed = 1;
	else if ((group == 'content-moderator')) local_staff = 1;
	else if ((group == 'sysop')) {
		local_staff = 1;
		local_admin = 1;
	}
	else if ((group == 'content-volunteer') || (group == 'soap') || (group == 'staff') || (group == 'wiki-representative') || (group == 'wiki-specialist')) global_staff = 1;
});

if (!$('body').hasClass('ns-special')) {
	
	var moveLink = '';
		var protectLink = '';
		var deleteLink = '';

		if ($('body.skin-fandommobile').hasClass('ns-8')) {
			if (global_staff == 1) {
				moveLink = '<li><a href="' + mw.util.getUrl('Special:MovePage/'+pagename) + '">Move</a></li>';
				protectLink = '<li><a href="' + mw.util.getUrl(pagename) + '?action=protect">Protect</a></li>';
				deleteLink = '<li><a href="' + mw.util.getUrl(pagename) + '?action=delete">Delete</a></li>';
			}
			if (local_admin == 1) {
				deleteLink = '<li><a href="' + mw.util.getUrl(pagename) + '?action=delete">Delete</a></li>';
			}
		}
		else {
			if ( (move_level.length === 0) || (local_staff == 1) ||	(global_staff == 1) || ((move_level[0] == 'autoconfirmed') && (autoconfirmed == 1)) ) {
				moveLink = '<li><a href="' + mw.util.getUrl('Special:MovePage/'+pagename) + '">Move</a></li>';	
			}
			if ((local_staff == 1) || (global_staff == 1)) {
				protectLink = '<li><a href="' + mw.util.getUrl(pagename) + '?action=protect">Protect</a></li>';
				deleteLink = '<li><a href="' + mw.util.getUrl(pagename) + '?action=delete">Delete</a></li>';
			}
		}
		
		$('.wiki-page-header__link-container ul.wds-list.wds-is-linked').append(
			'<li><a href="' + mw.util.getUrl('Special:WhatLinksHere/'+pagename) + '">What links here</a></li>',
			moveLink,
			'<li><a href="' + mw.util.getUrl(pagename) + '?action=purge">Purge</a></li>',
			protectLink,
			deleteLink
		);

	
}

$('#wiki-page-header-edit-link').attr('href', mw.util.getUrl(pagename) + '?action=submit' );


});