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

function customizeComments() {
		var interval = setInterval(function () {
		var elements = ".Reply:not([data-user]), .Reply_body__3woA9:not([data-user]), .Message:not([data-user]), .Comment_body__7p3np:not([data-user])";
		$('#MessageWall .EntityHeader_name__2oRXg, #articleComments .EntityHeader_name__2oRXg').filter(function() {
		       $(this).parents(elements).attr('data-user', $(this).text()).addClass('user-comment');
			});
		$('.message-wall-app a > .wds-avatar__image[title="User avatar"], .article-comments-app a > .wds-avatar__image[title="User avatar"], .message-wall-app a > .wds-avatar__image[title="wds-avatar__image"], .article-comments-app a > .wds-avatar__image[title="wds-avatar__image"]').attr('title', function(){
			return $(this).parent('a').attr('href').split(':')[1].replace(/%20/g, ' ').replace(/_/g, ' ')}).attr('alt', function(){
			return $(this).parent('a').attr('href').split(':')[1].replace(/%20/g, ' ').replace(/_/g, ' ')});
		$('.message-wall-app .EntityHeader_header-details__1bZ7- a[href*="%20"], .article-comments-app .EntityHeader_header-details__1bZ7- a[href*="%20"]').each(function(){
			var site = config.wgServer;
	    	this.href = this.href.replace(/%20/g, '_').replace(site, '');
		});
		}, 100 );
}
function customizeUserList() {
	var interval = setInterval(function () {
		$('.listusers-result-table-rows td:first-child a').each(function(){
			if ($(this).text() === 'Wall') {
		    	this.href = this.href.replace("User_talk:", 'Message_Wall:');
			}this.href = this.href.replace(/%20/g, "_");
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
	username = config.wgUserName;
		var interval = setInterval(function () {
			$('#MessageWall .wds-avatar > .wds-avatar__image[alt="User avatar"], #articleComments .wds-avatar > .wds-avatar__image[alt="User avatar"]').attr('alt', username).attr('title', username);
		}, 100 );
}
function customizeUserProfileApp() {
	var username = config.profileUserName;
		var interval = setInterval(function () {
        if ($('#userProfileApp .user-identity-avatar__image').length) {
        clearInterval(interval);
	
        $('#userProfileApp .user-identity-avatar__image').attr('alt', username).attr('title', username);
        $('#userProfileApp').attr('data-user', username);
        }
    }, 100);
}
function customizeLeaderboardAvatars() {
$('td.user > a').filter(function() {
		       $(this).siblings('.wds-avatar').find('.wds-avatar__image[src="https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/50"]').attr('alt', $(this).text()).attr('title', $(this).text());
		       $(this).siblings('.wds-avatar').find('.wds-avatar__image').wrap("<a href='/wiki/User:"+$(this).text().replace(/ /g, '_')+"'></a>");
			});
}
function customizeCommunityPageAvatars() {
	var interval = setInterval(function () {
	$('svg.wds-avatar__image:not([alt])').attr('title', function(){
		return $(this).parent('a').attr('href').split(':')[1].replace(/%20/g, ' ').replace(/_/g, ' ')}).attr('alt', function(){
		return $(this).parent('a').attr('href').split(':')[1].replace(/%20/g, ' ').replace(/_/g, ' ')});
	}, 100 );
}

$(function() {
		if (config.wgCanonicalNamespace === "User" ||
            config.wgCanonicalNamespace === "Message_Wall" ||
            config.wgCanonicalNamespace === "User_blog" ) {
        	customizeUserProfileApp();
            }
        if (config.wgCanonicalNamespace === "Message_Wall" ||
    		config.wgCanonicalNamespace == "User_blog" ||
            config.wgCanonicalNamespace === "" ) {
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
    });