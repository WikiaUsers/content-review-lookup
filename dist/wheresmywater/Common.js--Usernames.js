/*
-------------------------------------------------------------------
 Custom Colour Usernames, Avatars, Comments and User Tags- JS Part
-------------------------------------------------------------------

-------
 About
-------
- Adds classes to some user tags and modifies the text of some, to "filter" some and add some.
- Adds classes to comments of desired users, so they can be styled with css
- Changes some avatar and link attributes in Message Walls and Article Comments for the QOL

-----------------------
 COMPLEMENTARY SCRIPTS
-----------------------
- Usernames.css (Has fields to edit)
	- Used to actually style comments and tags

---------
 AUTHORS 
---------
- E12Dragon: current and orginal UCP compatible version
*/

$(function() {
	var bureaucrats = [
		'E12Dragon'
		];
	var administrators = [
		'Jordan853'
		];
	var moderators = [
		];
	var contentmoderators = [
		];
	var discussionsmoderators = [
		'Allie-Gator and the Boys'
		];
	var rollbacks = [
		];
	var bots = [
		'WMWBot'
		];
	var formerstaff = [
		'Blitzflame99',
		'Catfan660',
		'Codebreak1',
		'Laugh Attack Videos',
		'Pinkgalaxy',
		'Sboy13'
		];
$(function addClassToComments() {
	var interval = setInterval(function () {
	$('#MessageWall .EntityHeader_name__2oRXg, #articleComments .EntityHeader_name__2oRXg').filter(function() {
		var elements = ".Reply, .Reply_body__3woA9, .Message, .Comment_body__7p3np";
	    if (bureaucrats.includes($.trim($(this).text()))) {
	       $(this).parents(elements).addClass("bureaucrat");
	    	}
	    if (administrators.includes($.trim($(this).text()))) {
	       $(this).parents(elements).addClass("administrator");
	    	}
	    if (moderators.includes($.trim($(this).text()))) {
	       $(this).parents(elements).addClass("moderator");
	    	}
	    if (contentmoderators.includes($.trim($(this).text()))) {
	       $(this).parents(elements).addClass("contentmoderator");
	    	}
	    if (discussionsmoderators.includes($.trim($(this).text()))) {
	       $(this).parents(elements).addClass("discussionsmoderator");
	    	}
	    if (rollbacks.includes($.trim($(this).text()))) {
	       $(this).parents(elements).addClass("rollback");
	    	}
	    if (bots.includes($.trim($(this).text()))) {
	       $(this).parents(elements).addClass("bot");
	    	}
		});
	}, 100 );
});
$(function CustomizeUserTags() {
	var timeout = setTimeout(function() {
	clearInterval(interval);
	}, 5000);
	var interval = setInterval(function () {
if ($('#userProfileApp .user-identity-box__wrapper').length) {
		clearInterval(interval);
		   	$('.user-identity-header__tag:not(.inactive-user)').addClass(function(){
				 return $(this).text().toLowerCase().replace(/ /g, '').replace('threadmoderator', 'discussionsmoderator').replace('sysop', 'administrator'); 
			});
		if ($('.user-identity-header__tag.bureaucrat').length > 0) { 
				$('.user-identity-header__tag.administrator').remove();
			}
		if ($('.user-identity-header__tag.discussionsmoderator').length > 0 && $('.user-identity-header__tag.contentmoderator').length > 0) {
			$('.user-identity-header__tag.discussionsmoderator').remove();
					$('.user-identity-header__tag.contentmoderator').addClass("moderator").removeClass("contentmoderator").text("Moderator");
		}
		$('.user-identity-header__tag.discussionsmoderator').text('Discussions Moderator');
		$('.user-identity-header__tag.administrator').text('Administrator');
			
	$('#userProfileApp .user-identity-header > .user-identity-header__attributes h1').filter(function () {
    if (rollbacks.includes($.trim($(this).text()))) {
       $('#userProfileApp .user-identity-header > .user-identity-header__attributes').append(
		            $('<span>', {
		                'class': 'user-identity-header__tag rollback',
		                'text': "Rollback"
		            })
		            );
    	}
    if (formerstaff.includes($.trim($(this).text()))) {
       $('#userProfileApp .user-identity-header > .user-identity-header__attributes').append(
		            $('<span>', {
		                'class': 'user-identity-header__tag formerstaff',
		                'text': "Former Staff"
		            })
		            );
			   	}
			});
		}
		}, 100 );
	});
});
$(function() {
var interval = setInterval(function () {
	var site = mw.config.get('wgServer');
$('.message-wall-app .EntityHeader_header-details__1bZ7- a, .article-comments-app .EntityHeader_header-details__1bZ7- a').each(function(){
	      this.href = this.href.replace(/%20/g, '_').replace(site, '');
  });
$('.message-wall-app .EntityHeader_header-details__1bZ7- .wds-avatar__image[alt="User avatar"], .article-comments-app .EntityHeader_header-details__1bZ7- .wds-avatar__image[alt="User avatar"]').attr('alt', function(){
 return $(this).parent('a').attr('href');
}).attr('alt', function(index, alt) {
	   return alt.replace('/wiki/User:', '').replace(/_/g, ' ').replace(/%20/g, ' ');
	});
$('.message-wall-app .EntityHeader_header-details__1bZ7- .wds-avatar__image[title="User avatar"], .article-comments-app .EntityHeader_header-details__1bZ7- .wds-avatar__image[title="User avatar"]').attr('title', function(){
 return $(this).parent('a').attr('href');
}).attr('title', function(index, title) {
	   return title.replace('/wiki/User:', '').replace(/_/g, ' ').replace(/%20/g, ' ');
	});
$('.listusers-result-table-rows td:first-child a:contains("Wall")').each(function(){
	      this.href = this.href.replace("User_talk:", 'Message_Wall:');
  });
$('.listusers-result-table-rows td:first-child a').each(function(){
	      this.href = this.href.replace("%20", "_");
  });
}, 100 );
$('.mw-contributions-user-tools a[href*="User%3A"], .UserProfileActivityModeration a[href*="User%3A"]').each(function(){
	      this.href = this.href.replace(/\+/g, '_').replace("User%3A", 'User:');
  });
$('.mw-contributions-user-tools a[href*="Special:AbuseLog"]').each(function(){
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
}	if (!$('#userProfileApp, #MessageWall, #articleComments').length || !user && !username) {
        return;
    }
    
    var interval = setInterval(function () {
        var element = $('#userProfileApp .user-identity-avatar__image');
        if (!element.length) {
            return;
        }
        element.attr('alt', user);
        element.attr('title', user);
    	clearInterval(interval);
    }, 100);
    var interval1 = setInterval(function () {
        var element1 = $('#MessageWall .wds-avatar > .wds-avatar__image, #articleComments .wds-avatar > .wds-avatar__image');
        if (!element1.length) {
            return;
        }
        element1.attr('alt', username);
        element1.attr('title', username);
    }, 100);
});