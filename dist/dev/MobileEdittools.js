$(function() {

var conf = mw.config.get([
    'wgPageName',
    'wgRestrictionMove',
    'wgUserGroups',
    'wgFormattedNamespaces',
    'wgUserName'
]);

var pagename = conf.wgPageName;
var move_level = conf.wgRestrictionMove;
var user_groups = conf.wgUserGroups;
var autoconfirmed = 0;
var local_staff = 0;
var local_admin = 0;
var global_staff = 0;
$.each(user_groups, function( index, group ) {
	if (group == 'autoconfirmed') autoconfirmed = 1;
	else if ((group == 'content-moderator')) local_staff = 1;
	else if ((group == 'sysop')) {
		local_staff = 1;
		local_admin = 1;
	}
	else if ((group == 'content-volunteer') || (group == 'helper') || (group == 'soap') || (group == 'staff') || (group == 'wiki-representative') || (group == 'wiki-specialist')) global_staff = 1;
});

if (!$('body').hasClass('ns-special')) {
	if (window.location.href.match('custommobtools=1') !== null ) {
		$('#wpSummary').val('[MobileEdittools] Undo revision ' + window.location.href.match(/oldid\=([0-9]+)/)[1]);
	}
	else {
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

		$.when( 
			$('.skin-fandommobile div.wiki-page-header__title-wrapper').append(
				$('<div>',{
					'style': 'width:100%; position:relative;'
				}).append(
					$('<div>', {
						id: 'm-edittools',
						'class': 'wds-dropdown wds-is-touch-device',
						'style': 'position:absolute; top:-10px; right:0;'
					}).append(
						$('<div>', {
							'class': 'wds-dropdown__toggle'
						}).append(
							'<svg class="wds-icon wds-icon-small"><path d="M9 5c1.103 0 2-.896 2-2s-.897-2-2-2-2 .896-2 2 .897 2 2 2m0 8c-1.103 0-2 .896-2 2s.897 2 2 2 2-.896 2-2-.897-2-2-2m0-6c-1.103 0-2 .896-2 2s.897 2 2 2 2-.896 2-2-.897-2-2-2"></path></svg>'
						),
						$('<div>',{
								'class': 'wds-is-right-aligned wds-dropdown__content wds-is-not-scrollable'
						}).append(
							$('<ul>', {
								'class': 'wds-list wds-is-linked'
							}).append(
								'<li><a href="' + mw.util.getUrl('Special:History/'+pagename) + '">History</a></li>',
								'<li><a href="' + mw.util.getUrl('Special:WhatLinksHere/'+pagename) + '">What links here</a></li>',
								moveLink,
								'<li><a href="' + mw.util.getUrl(pagename) + '?action=purge">Purge</a></li>',
								protectLink,
								deleteLink
							)
						)
					)
				)
			) 
		).done(function() {
			var mcheck = 0;
			$(window).on("click", function(event){
	    		if (!$("#m-edittools").get(0).contains(event.target)){
    				mcheck = 0;
        			$('#m-edittools').removeClass('wds-is-active');
				}
			});
			$('#m-edittools .wds-dropdown__toggle').click(function() {
				if (mcheck === 0) {
					mcheck = 1;
					$('#m-edittools').addClass('wds-is-active');
				} else {
					mcheck = 0;
					$('#m-edittools').removeClass('wds-is-active');
				}
			});	
		});
	}
}
else if ($('body').hasClass('mw-special-MobileDiff')) {
	revid = $('#mw-mf-diff-info > h2 > a').attr('href');
	$('.post-content').append(
		$('<div>', {
			id: 'm-modtools', 'style': 'text-align:right;'
		}).append(
			$('<a>', {
				'title': 'Undo',
				'href': revid + '&direction=prev&action=edit&useskin=fandomdesktop&custommobtools=1',
				text: 'Undo'
			})
		)
	);
}

});