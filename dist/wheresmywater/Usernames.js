/*
------------------------------------------------------
 Custom Colour Usernames, Avatars, Comments - JS Part
------------------------------------------------------

-----------------------
 COMPLEMENTARY SCRIPTS
-----------------------
- Usernames.css

---------
 AUTHORS 
---------
- E12Dragon: current and orginal UCP compatible version
*/

var config = mw.config.get([
    'wgCanonicalNamespace',
    'wgPageName',
    'wgCanonicalSpecialPageName',
    'profileUserName',
    'wgUserName',
    'wgServer'
]);

function customizeUserProfileApp() {
	if ( !$('#userProfileApp').length ) return; //On User blog it only exists if not a subpage
	var month = new Date().getMonth();
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var username = config.profileUserName;
	new MutationObserver(function() {
		$('#userProfileApp').attr({
				'data-user': username,
				'data-month': months[month]
		}).find(
			$('.user-identity-avatar__image')).attr({
			alt: username,
			title: username
		});
	}).observe(document.querySelector('#userProfileApp'), {
		childList: true,
		subtree: true
    });
}
function customizeComments() {
	var site = config.wgServer;
	var user = config.wgUserName;
	new MutationObserver(function() {
		//Comments
		$('.Reply, .Message, .Comment_body__Dw-zH, .Reply_body__PM9kM').each(function () {
			var username = $(this).find('a[class^="EntityHeader_name__"]').text();
			$(this).attr('data-user', username);
			$(this).find('.wds-avatar__image').attr({
				alt: username,
				title: username
			});
			$(this).find('a[class^="EntityHeader_name__"][href*="%20"]').each(function(){
		    	this.href = this.href.replace(/%20/g, '_').replace(site, '');
			});
			$(this).addClass('user-comment');
		});
		//Reply box avatars
		$('#MessageWall .wds-avatar > .wds-avatar__image, #articleComments .wds-avatar > .wds-avatar__image').attr({
			alt: user,
			title: user
		});
    }).observe(document.querySelector('#articleComments, #MessageWall'), {
		childList: true,
		subtree: true
    });
}
function customizeContribsTools() {
	$('.mw-contributions-user-tools a[href*="User%3A"], .UserProfileActivityModeration__links a[href*="User%3A"]').each(function(){
    	 this.href = this.href.replace(/\+/g, '_').replace("User%3A", 'User:');
	 });
	$('.mw-contributions-user-tools a[href*="Special:AbuseLog"], .UserProfileActivityModeration__links a[href*="Special:AbuseLog"]').each(function(){
	     this.href = this.href.replace(/\+/g, '_');
	 });
}
function customizeUserList() {
	new MutationObserver(function() {
		$('.listusers-result-table-rows td:first-child a').each(function(){
			if ($(this).text() === 'Wall') {
		    	this.href = this.href.replace('User_talk:', 'Message_Wall:');
			}else if ($(this).text() === 'Contribs') {
				this.href = this.href.replace('?target=', '/');
			}
			this.href = this.href.replace(/%20/g, "_");
		});
	}).observe(document.querySelector('.listusers-result-container'), {
		childList: true,
		subtree: true
    });
}
function customizeLeaderboardAvatars() {
	$('.wds-avatar__image').each(function() {
		var username = $(this).parents('.wds-avatar').attr('title');
		var link = $(this).parents('.wds-avatar').siblings('a').attr('href');
		if (this.tagName == 'svg') {
			$(this).attr({
				alt: username,
				title: username
			});
		}
		$(this).wrap("<a href='" + link + "'></a>");
	});
}
function customizeCommunityPageAvatars() {
	new MutationObserver(function() {
		$('svg.wds-avatar__image').not('[alt]').each(function () {
			var username = $(this).parents('.wds-avatar').attr('title');
			$(this).attr({
				alt: username,
				title: username
			});
		});
	}).observe(document.querySelector('#mw-content-text, .community-page__contributors-modal-curtain, body:not(.community-page__contributors-modal-curtain)'), {
		childList: true,
		subtree: true
    });
}
function customizeAnnouncementPageAvatars() {
	$('.wds-avatar__image').not('[title]').each(function () {
		var username = $(this).parents('.wds-avatar').attr('title');
		$(this).attr({
			alt: username,
			title: username
		});
	});
}

$(function() {
	if (config.wgCanonicalNamespace == "User" ||
        config.wgCanonicalNamespace == "Message_Wall" ||
        config.wgCanonicalNamespace == "User_blog" ) {
    	customizeUserProfileApp();
        }
    if (config.wgCanonicalNamespace == "Message_Wall" ||
		config.wgCanonicalNamespace == "User_blog" ||
        config.wgCanonicalNamespace == "" ) {
    	customizeComments();
        }
	if (config.wgCanonicalSpecialPageName == "Contributions" ||
    	config.wgCanonicalSpecialPageName == "UserProfileActivity") {
    	customizeUserProfileApp();
    	customizeContribsTools();
    	}
    if (config.wgPageName == "Special:ListUsers") {
    	customizeUserList();
    	}
    if (config.wgPageName == "Special:Leaderboard") {
    	customizeLeaderboardAvatars();
    	}
    if (config.wgPageName == "Special:Community") {
    	customizeCommunityPageAvatars();
    	}
    if (config.wgPageName == "Special:Announcements") {
    	customizeAnnouncementPageAvatars();
    	}
});