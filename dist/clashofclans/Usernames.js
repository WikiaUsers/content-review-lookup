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
- Spottra: original version used on Legacy
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
var month = new Date().getMonth();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function customizeComments() {
	var interval = setInterval(function () {
		var elements = '.Reply, .Message, .Comment_body__Dw-zH, .Reply_body__PM9kM';
		var attr = $(this).attr('data-user');
		var site = config.wgServer;
		$(elements).not('[data-user]').each(function () {
				var username = $(this).find('.EntityHeader_name__PAxYW').text();
				$(this).attr('data-user', username);
				$(this).find('.wds-avatar__image').attr({
					alt: username,
					title: username
				});
				$(this).addClass('user-comment');
				$(this).find('.EntityHeader_name__PAxYW[href*="%20"]').each(function(){ //Fix username links with spaces
			    	this.href = this.href.replace(/%20/g, '_').replace(site, '');
				});
		});
	}, 100);
}
function customizeUserList() {
	var interval = setInterval(function () {
		var elements = '.listusers-result-table-rows td:first-child a';
		$(elements).each(function(){
			if ($(this).text() === 'Wall') {
		    	this.href = this.href.replace("User_talk:", 'Message_Wall:');
			}
			this.href = this.href.replace(/%20/g, "_");
		});
	}, 100 );
}
function customizeContribsTools() {
		$('.mw-contributions-user-tools a[href*="User%3A"], .UserProfileActivityModeration__links a[href*="User%3A"]').each(function(){
	    	 this.href = this.href.replace(/\+/g, '_').replace("User%3A", 'User:');
		 });
		$('.mw-contributions-user-tools a[href*="Special:AbuseLog"], .UserProfileActivityModeration__links a[href*="Special:AbuseLog"]').each(function(){
		     this.href = this.href.replace(/\+/g, '_');
		 });
}
function customizeReplyBoxAvatars() {
	var username = config.wgUserName;
	var elements = '#MessageWall .wds-avatar > .wds-avatar__image[alt="User avatar"], #articleComments .wds-avatar > .wds-avatar__image[alt="User avatar"]';
	var interval = setInterval(function () {
		$(elements).attr({
					alt: username,
					title: username
			});
	}, 100 );
}
function customizeUserProfileApp() {
	var username = config.profileUserName;
	var interval = setInterval(function () {
        if ($('#userProfileApp .user-identity-avatar__image').length) {
	        clearInterval(interval);
	        $('#userProfileApp .user-identity-avatar__image').attr({
						alt: username,
						title: username
					});
			$('#userProfileApp').attr({
				'data-user': username,
				'data-month': months[month]
			});
        }
    }, 100);
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
	var interval = setInterval(function () {
		$('svg.wds-avatar__image').not('[alt]').each(function () {
			var username = $(this).parents('.wds-avatar').attr('title');
			$(this).attr({
				alt: username,
				title: username
			});
		});
	}, 100 );
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
    	customizeReplyBoxAvatars();
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