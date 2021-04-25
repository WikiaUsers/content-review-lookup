/*
-------------------------------------------------------------------
 Custom Colour Usernames, Avatars, Comments and User Tags- JS Part
-------------------------------------------------------------------

-------
 About
-------
- Adds classes to some user tags and modifies the text of some, to "filter" some and add one
- Adds classes to comments of desired users, so they can be styled with css
- Changes some avatar and link attributes in Message Walls and Article Comments for the QOL

-----------------------
 COMPLEMENTARY SCRIPTS
-----------------------
- Usernames.css (Has fields to edit)
	- Used to actually style comments and tags

--------------
 INSTRUCTIONS
--------------
- Always use underscores where usernames have spaces in the comments part of this script.

---------
 AUTHORS 
---------
- Spottra: original version used on Legacy
- E12Dragon: current UCP compatible version
*/
/**********************/
/*      Comments      */
/**********************/
var interval = setInterval(function () {
	var elements = ".Reply, .Reply_body__3woA9, .Message, .Comment_body__7p3np";
	//Бюрократы
	$('.wds-avatar a[href$="Flotiliya"]').parents(elements).addClass("bureaucrat");
	//Администраторы
	$('.wds-avatar a[href$="Simon_Pikalov"]').parents(elements).addClass("administrator");
	//Модераторы
	$('.wds-avatar a[href$="Default"]').parents(elements).addClass("contentmoderator");
	//Младшие модераторы
	$('.wds-avatar a[href$="Test"]').parents(elements).addClass("discussionsmoderator");
	//Откатчики
	$('.wds-avatar a[href$="Test"]').parents(elements).addClass("rollback");
}, 100 );
/**************************/
/*    Баннер Бюрократов   */
/**************************/
var interval = setInterval(function () {
	if ($('.user-identity-header__attributes:contains("Flotiliya") h1').length > 0) {
		$(".user-identity-header__attributes:not(:has(.user-identity-header__tag.tag-bureaucrat2))").append(
            $('<span>', {
                'class': 'user-identity-header__tag tag-bureaucrat2',
                'text': "Бюрократ"
            })
        );
	}
	if ($('.user-identity-header__attributes:contains(" ") span').length > 0) {
		$('.tag-container').remove();
	}
	$('.tag-container').filter(function() {
		return $(this).text() === ' ';
	}).remove();
}, 100 );
/**************************/
/*    Баннер Откатчиков   */
/**************************/
var interval = setInterval(function () {
	if ($('.user-identity-header__attributes:contains("Test") h1').length > 0) {
		$(".user-identity-header__attributes:not(:has(.user-identity-header__tag.tag-rollback))").append(
            $('<span>', {
                'class': 'user-identity-header__tag tag-rollback',
                'text': "Откатчик"
            })
        );
	}
}, 100 );
/*------------------Nothing Beyond this point has fields to edit------------------*/
var interval = setInterval(function () {
    $(document).ready(function () { 
    $('.user-identity-header__tag:contains("Бюрократ")').addClass("tag-bureaucrat2");
    $('.user-identity-header__tag:contains("Администратор")').addClass("tag-administrator");
    $('.user-identity-header__tag:contains("Модератор")').text("Модератор").addClass("tag-contentmoderator");
    $('.user-identity-header__tag:contains("Младший модератор")').text("Младший модератор").addClass("tag-discussionsmoderator");
	if ($('.user-identity-header__tag.tag-bureaucrat2').length > 0) { 
		$('.user-identity-header__tag.tag-administrator').remove();
		$('.user-identity-header__tag.usergroup-bureaucrat.bureaucrat-user').remove();
	}
    });
}, 100 );
/***************************************************/
/*    Для Бюрократов со статусом Администратора    */
/***************************************************/
var interval = setInterval(function () {
    if ($('.user-identity-header__attributes:contains("Flotiliya") h1').length > 0) {            
        $(".user-identity-header__attributes:not(:has(.user-identity-header__tag.tag-administrator2))").append(
	        $('<span>', {
                'class': 'user-identity-header__tag tag-administrator2',
                'text': "Админиcтратор"
            })
        );
	}
}, 100 );
/********************************/
/*    Баннер Администраторов    */
/********************************/
var interval = setInterval(function () {
    if ($('.user-identity-header__attributes:contains("Simon Pikalov") h1').length > 0) {            
        $(".user-identity-header__attributes:not(:has(.user-identity-header__tag.tag-administrator3))").append(
	        $('<span>', {
                'class': 'user-identity-header__tag tag-administrator3',
                'text': "Админиcтратор"
            })
        );
	}
}, 100 );

$(function() {
var interval = setInterval(function () {
	var site = mw.config.get('wgServer');
$('.message-wall-app .EntityHeader_header-details__1bZ7- a, .article-comments-app .EntityHeader_header-details__1bZ7- a').each(function(){
	      this.href = this.href.replace(/%20/g, '_').replace(site, '');
  });
$('.message-wall-app .EntityHeader_header-details__1bZ7- .wds-avatar__image[alt="User avatar"], .article-comments-app .EntityHeader_header-details__1bZ7- .wds-avatar__image[alt="User avatar"]').attr('alt', function(){
 return $(this).parent('a').attr('href');
}).attr('alt', function(index, alt) {
	   return alt.replace('/ru/wiki/%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA:', '').replace(/_/g, ' ').replace(/%20/g, ' ');
	});
$('.message-wall-app .EntityHeader_header-details__1bZ7- .wds-avatar__image[title="User avatar"], .article-comments-app .EntityHeader_header-details__1bZ7- .wds-avatar__image[title="User avatar"]').attr('title', function(){
 return $(this).parent('a').attr('href');
}).attr('title', function(index, title) {
	   return title.replace('/ru/wiki/%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA:', '').replace(/_/g, ' ').replace(/%20/g, ' ');
	});
$('.listusers-result-table-rows td:first-child a:contains("Wall")').each(function(){
	      this.href = this.href.replace("User_talk:", 'Message_Wall:');
  });
$('.listusers-result-table-rows td:first-child a').each(function(){
	      this.href = this.href.replace("%20", "_");
  });
}, 100 );
$('.mw-contributions-user-tools a[href*="%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%3A"], .UserProfileActivityModeration a[href*="%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%3A"]').each(function(){
	      this.href = this.href.replace(/\+/g, '_').replace("%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%3A", 'User:');
  });
$('.mw-contributions-user-tools a[href*="Special:AbuseLog"], .UserProfileActivityModeration a[href*="Special:AbuseLog"]').each(function(){
	      this.href = this.href.replace(/\+/g, '_');
  });
});
$(function () {
	var username = mw.config.get('wgUserName');
	var user = mw.config.get('wgTitle');
	var target = mw.util.getParamValue('target');
    var parts = user.split("/");
if (
            wgCanonicalSpecialPageName === 'Contributions' ||
            wgCanonicalSpecialPageName === 'UserProfileActivity'
        ){if (target) {
                user = decodeURIComponent(target).replace(/_/g, ' ');
            }else if (parts.length > 1 && parts[1] !== '') {
                user = parts[1];}else {
                	user = username;
                	if (user === null) {
                		user = '';
                	}
                }
}	if (!$('#userProfileApp, #MessageWall, #articleComments').length || !user) {
        return;
    }
    
    var interval = setInterval(function () {
        var elementa = $('#userProfileApp .user-identity-avatar__image');
        elementa.attr('alt', user);
        elementa.attr('title', user);
        
        var element = $('#MessageWall .wds-avatar > .wds-avatar__image, #articleComments .wds-avatar > .wds-avatar__image');
        element.attr('alt', username);
		element.attr('title', username);
    }, 100);
});