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
    'wgCanonicalSpecialPageName',
    'wgCanonicalNamespace',
    'wgPageName',
    'wgUserName',
    'wgServer',
    'profileUserName'
]);

function customiseUserProfileApp() {
	//User Profile App doesn't load on subpages of User and User blog
	if ( !$('#userProfileApp').length ) return;
	var month = new Date().getMonth();
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var username = config.profileUserName;
	new MutationObserver(function() {
		$('#userProfileApp').attr({
				'data-user': username,
				'data-month': months[month]
		}).find($('.user-identity-avatar__image')).attr({
			alt: username,
			title: username
		});
	}).observe(document.querySelector('#userProfileApp'), {
		childList: true,
		subtree: true
    });
}
function customiseComments() {
	if ( !$('#articleComments, #MessageWall').length ) return;
	new MutationObserver(function() {
		$('#articleComments, #MessageWall').each(function () {
			//Customise comments
			$(this).find('.Reply, .Message, [class^="Comment_body__"], [class^="Reply_body__"]').each(function () {
				var username = $(this).find('a[class^="EntityHeader_name__"]').text();
				$(this).attr('data-user', username).addClass('user-comment');
			}).find('a[href*="%20"]').each(function(){
		    	this.href = this.href.replace(/%20/g, '_').replace(config.wgServer, '');
			});
			//Customise avatars
			$(this).find('.wds-avatar').each(function () {
			    var attribute = $(this).children('a').length ?
			        $(this).siblings('a').text() :
			        config.wgUserName;
			    $(this).attr('title', attribute).find('.wds-avatar__image').attr({
		            alt: attribute,
		            title: attribute
		        });
			});
		});
    }).observe(document.querySelector('#articleComments, #MessageWall'), {
		childList: true,
		subtree: true
    });
}
function customiseContribsTools() {
	$('.mw-contributions-user-tools a[href*="User%3A"], .UserProfileActivityModeration__links a[href*="User%3A"]').each(function(){
    	 this.href = this.href.replace(/\+/g, '_').replace("User%3A", 'User:');
	 });
}
function customiseUserList() {
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
function customiseLeaderboardAvatars() {
	$('.wds-avatar__image').each(function() {
		var parent = $(this).parents('.wds-avatar');
		var username = parent.attr('title');
		var link = parent.siblings('a').attr('href');
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
	$('svg.wds-avatar__image').each(function () {
		var username = $(this).parents('.wds-avatar').attr('title');
		$(this).attr({
			alt: username,
			title: username
		});
	});
}
function customiseAnnouncementPageAvatars() {
	$('.wds-avatar__image').each(function () {
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
    	customiseUserProfileApp();
        }
    if (config.wgCanonicalNamespace == "Message_Wall" ||
		config.wgCanonicalNamespace == "User_blog" ||
        config.wgCanonicalNamespace == "" ) {
    	customiseComments();
        }
	if (config.wgCanonicalSpecialPageName == "Contributions" ||
    	config.wgCanonicalSpecialPageName == "UserProfileActivity") {
    	customiseUserProfileApp();
    	customiseContribsTools();
    	}
    if (config.wgPageName == "Special:ListUsers") {
    	customiseUserList();
    	}
    if (config.wgPageName == "Special:Leaderboard") {
    	customiseLeaderboardAvatars();
    	}
    if (config.wgPageName == "Special:Community") {
    	customizeCommunityPageAvatars();
    	}
    if (config.wgPageName == "Special:Announcements") {
    	customiseAnnouncementPageAvatars();
    	}
});