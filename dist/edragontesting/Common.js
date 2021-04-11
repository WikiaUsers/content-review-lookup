importArticles({
    type: "script",
    articles: [
		"MediaWiki:Common.js/Avatars.js",
		"MediaWiki:Common.js/Masthead.js",
		"MediaWiki:Common.js/HeroSkins.js",
		"MediaWiki:Common.js/Walkthrough.js",
    ]
});
/*
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat'},
		sysop: { u: 'Administrator' },
		'content-moderator': { u: 'Content Moderator' },
		threadmoderator : { u: 'Discussions Moderator'},
		rollback: { u: 'Rollback'},
		imageeditor : { u: 'Image Editor'},
		moderator: { u: 'Moderator'},
	}
};

UserTagsJS.modules.custom = {
	'WMWBot': ['threadmoderator', 'content-moderator'], // Add featured
};

UserTagsJS.modules.implode = {
	'moderator': ['content-moderator', 'threadmoderator'],
};
*/
/*
$(function () {
var bureaucrats = [
   'Brady55',
   'Spottra',
   'MagamHound',
   'GorillaMan'
];

var administrators = [
   'King_Dragonhoff',
   'E12Dragon'
];

var contentmoderators = [
   'Pkukiss',
];

	var bRegex = [];
	var aRegex = [];
	var cmRegex = [];
	
	for (var i = 0; i < bureaucrats.length; i ++)
      bRegex.push(bureaucrats[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));

   for (i = 0; i < administrators.length; i ++)
      aRegex.push(administrators[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));

   for (i = 0; i < contentmoderators.length; i ++)
      cmRegex.push(contentmoderators[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));

   bRegex = (bRegex.length ? bRegex.join('|') : 0);
   aRegex = (aRegex.length ? aRegex.join('|') : 0);
   cmRegex = (cmRegex.length ? cmRegex.join('|') : 0);
	
$(function addClassToLinks() {
	var interval = setInterval(function () {
    var paths = [
         '/wiki/Special:Contributions/',
         '/wiki/Special:UserProfileActivity/',
         '/wiki/User:',
         '/wiki/Message_Wall:',
         '/wiki/User_Blog:',
      ];
    var tabs = [
    	'\\?tab\\=posts',
    	'\\?tab\\=messages',
    	'\\?tab\\=comments'
      ];
    var server = mw.config.get('wgServer');
	if (bRegex) {
         var regexes = bRegex.split('|');
         var exprs   = [];

         for (var i = 0; i < regexes.length; i ++) {
            exprs[i] = [];

            for (var j = 0; j < paths.length; j ++)
            for (var d = 0; d < tabs.length; d ++)
               exprs[i].push(paths[j] + regexes[i], paths[j] + regexes[i] + tabs[d], server + paths[j] + regexes[i], server + paths[j] + regexes[i] + tabs[d]);

            exprs[i] = exprs[i].join('|');
         }

         exprs     = exprs.join('|');
         var regex = new RegExp('^(?:' + exprs + ')$', 'i');

         $('a')
         .filter(function() {
            return regex.test(
               $(this).attr('href')
            );
         })
         .addClass('bureaucrat');
      }

      if (aRegex) {
         var regexes = aRegex.split('|');
         var exprs   = [];

         for (var i = 0; i < regexes.length; i ++) {
            exprs[i] = [];

            for (var j = 0; j < paths.length; j ++)
            for (var d = 0; d < tabs.length; d ++)
               exprs[i].push(paths[j] + regexes[i], paths[j] + regexes[i] + tabs[d], server + paths[j] + regexes[i], server + paths[j] + regexes[i] + tabs[d]);

            exprs[i] = exprs[i].join('|');
         }

         exprs = exprs.join('|');
         console.log(exprs);

         var regex = new RegExp('^(?:' + exprs + ')$', 'i');

         $('a')
         .filter(function() {
            return regex.test(
               $(this).attr('href')
            );
         })
         .addClass('administrator');
      }

      if (cmRegex) {
         var regexes = cmRegex.split('|');
         var exprs   = [];

         for (var i = 0; i < regexes.length; i ++) {
            exprs[i] = [];

            for (var j = 0; j < paths.length; j ++)
            for (var d = 0; d < tabs.length; d ++)
               exprs[i].push(paths[j] + regexes[i], paths[j] + regexes[i] + tabs[d], server + paths[j] + regexes[i], server + paths[j] + regexes[i] + tabs[d]);

            exprs[i] = exprs[i].join('|');
         }

         exprs = exprs.join('|');
         console.log(exprs);

         var regex = new RegExp('^(?:' + exprs + ')$', 'i');

         $('a')
         .filter(function() {
            return regex.test(
               $(this).attr('href')
            );
         })
         .addClass('contentmoderator');
      }
	}, 100 );
});
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
	    if (contentmoderators.includes($.trim($(this).text()))) {
	       $(this).parents(elements).addClass("contentmoderator");
	    	}
		});
	}, 100 );
});
$(function addClassToAvatars() {
	for (var i = 0; i < administrators.length; i ++)
	administrators[i] = []; {
	administrators.push(administrators[i].replace(/_/g, ' '));
	}
	var interval = setInterval(function () {
	$('img[class$="-avatar__image"]').filter(function() {
	    if (bureaucrats.includes($.trim($(this).attr('alt')))) {
	       $(this).addClass("bureaucrat");
	    	}
	    if (administrators.includes($.trim($(this).attr('alt')))) {
	       $(this).addClass("administrator");
	    	}
	    if (contentmoderators.includes($.trim($(this).attr('alt')))) {
	       $(this).addClass("contentmoderator");
	    	}
		});
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
*/