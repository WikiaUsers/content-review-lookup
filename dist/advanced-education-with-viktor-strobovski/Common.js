/* Any JavaScript here will be loaded for all users on every page load */
 
// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
                founder: { u:'Founder' },
                bureaucrat: { u:'Veteran' },
		sysop: { u:'Head Teacher' },
                rollback: { u:'Rollback' },
                chatmoderator: { u:'Chat Moderator' },
                blocked: { u:'Kicked' },
		inactive: { u: 'Inactive' },
		      newuser: { u:'Amateur' },
              leader: { u:'Viktor' },
              developer: { u:'Game developer' },
                contributor: { u:'Helper' },
               guard: { u:'Principal' },
		novice: { u:'Beginner' },
		unstoppable: { u:'Unstoppable' },
		hated: { u:'Killed by Viktor' },
          gone: { u:'Gone But Not Forgotten' },
	}
};
UserTagsJS.modules.custom = {
    JohnnyHarden: ['guard', 'unstoppable', 'leader', 'contributor', 'developer', 'hated', 'gone', 'novice'],
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = 10;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'],
};
UserTagsJS.modules.userfilter = {
      Portalcrafter: ['bureaucrat'],
	'Wikia': ['inactive'],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
function checkVerif(){
	var users=[
	    'JohnnyHarden'];
	var name=location.href;
	name=name.split('/wiki/');
	name=name[name.length-1];
	for(var i=0;i<users.length;i++){
		if('User:'+users[i]==name||'Message_Wall:'+users[i]==name||'User_blog:'+users[i]==name||'Special:Contributions/'+users[i]==name){
			var verif=document.createElement('img');
			verif.setAttribute('src','https://vignette.wikia.nocookie.net/errored/images/0/02/T.png/revision/latest?cb=20181126130904');
			verif.setAttribute('class','verify');
			verif.setAttribute('width','35');
			verif.setAttribute('height','35');
			var a=document.createElement('a');
			a.setAttribute('href','/wiki/Verified#'+users[i]);
			a.appendChild(verif);
			var mhi=document.getElementsByClassName('masthead-info')[0];
			mhi=mhi.getElementsByTagName('hgroup')[0];
			mhi.appendChild(a);
			break;
		}
	}
}
addOnloadHook(checkVerif);

importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
 
$.getScript('/load.php?mode=articles&articles=u:dev:MediaWiki:I18n-js/code.js&only=scripts')
    .done(function() {
        // access window.dev.i18n here
    });
 
// name is the PAGENAME part of https://dev.wikia.com/wiki/Custom-PAGENAME/i18n.json
i18n.loadMessages(name).done(function (i18n) {
    // use your i18n instance here
});
 
// start with the user's language (in this case English)
i18n.msg('comment-here').plain(); // Comment Here!
 
// output French for one message only
i18n.inLang('fr').msg('comment-here').plain(); // commente ici !
 
// and back to English again
i18n.msg('comment-here').plain(); // Comment Here!
 
/* END */

/* Social Network Icons */

$('.WikiaRail').prepend('<div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="//www.youtube.com/channel/UCthmkgnVs7mohAakF4ucjlQ"><img src="//vignette.wikia.nocookie.net/battlefield/images/a/af/Youtube.png/revision/latest?cb=20180311171221&path-prefix=ru"></a></div></div>');
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FastDelete/code.js',
    ]
});
 
/* FastDelete settings */
window.fdButtons = [];
 
fdButtons[fdButtons.length] = {
	'summary': 'Spam',
	'label': 'Spam'
};
 
//fdButtons[fdButtons.length] = {
//	'summary': 'Vandalism',
//	'label': 'Vandalism'
//};
 
/* JS custom link */
$(function () {
    $('.jscustomlink').each(function () {
        var $span = $(this),
            href = $span.attr('data-href'),
            title, target, a;

        if (typeof href === "string" && href.length !== 0) {
            title = $span.attr('data-title');
            target = $span.attr('data-target');
            a = document.createElement("a");
            a.href = href;
            a.textContent = $span.text();

            console.log(title);

            if (typeof title === "string" && title.length !== 0) {
                a.setAttribute("title", title);
            }
            if (typeof target === "string" && target.length !== 0) {
                a.setAttribute("target", target);
            }

            $span.empty();
            $span.html(a);
        }
    });
});

// Avatar Insertion
(function($) {
    if (!$('.avatar_body').length) {
        return;
    }

    $('.avatar_body').each(function() {
        var $that = $(this),
            nickname = $(this).attr('data-nick'),
            width = $(this).attr('data-width') + 'px';

        $.ajax({
            url: '/wiki/Special:Contributions/' + nickname,
            type: 'GET',
            success: function(data) {
                if (data) {
                    $that.empty().append(
                        $(data).find('.masthead-avatar').children('img').css({
                            'width' : width,
                            'height': 'auto'
                        })
                    );
                }
            },
            error: function() {
                console.log('Error: Cannot obtain user avatar.');
            }
        });
    });
})(this.jQuery);

(function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') return;
    var sorted_list,
        $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > $(b).find('a:first').attr('title')) ? 1 : -1;
    });
    $list.children('li').remove();
    $list.append(sorted_list);
})(jQuery);

 
function BgImage() {
    if ($('#BgImage').text().length > 3 && ($('#BgImage').text().match("(((http://www)|(http://)|(www))[-a-zA-Z0-9@:%_\+.~#?&//=]+)\.(jpg|jpeg|gif|png|bmp|tiff|tga|svg)"))) {
        $('#BgImage').hide();
         $('body').css("background-image", "url(" + $('#BgImage').text() + ") !important").css("backgroundPosition", "top center").css("backgroundRepeat", "no-repeat").css("background", "none");
    }
}
 
$(document).ready(BgImage);

// Just doing it fine 

if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();
    });
}

// Prevent bumping and overall posting on Wall of inactive user.

if(wgPageName === "Message_Wall:Woin_Portalny") {
	$('.Wall').remove();
}

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AntiUnicruft/code.js',
        'u:dev:MediaWiki:RailWAM/code.js',
        'u:dev:MediaWiki:LastEdited/code.js',
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
        'u:dev:MediaWiki:WikiaNotification/code.js',
    ]
});

// Test if an element has a certain class.
// Increases general performance.
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js',
    ]
});

$('.page-Achievements #WikiaArticleComments, .page-Achievements .wds-button[href=#WikiaArticleComments]').remove();

// **********************************
// FIND DUPLICATE IMAGES
// THANKS TO WORLD WAR II WIKI
// **********************************

dil = new Array();

function findDupImages(gf) {
    output = "";
    url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
    if (gf) url += "&gaifrom=" + gf;
    $.getJSON(url, function (data) {
        if (data.query) {
            pages = data.query.pages;
            for (pageID in pages) {
                dils = "," + dil.join();
                if (dils.indexOf("," + pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles) {
                    output += "<h3><a href='/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
                    for (x = 0; x < pages[pageID].duplicatefiles.length; x++) {
                        output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                        dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                    }
                    output += "</ul>\n\n"
                }
            }
            $("#mw-dupimages").append(output);
            if (data["query-continue"]) setTimeout("findDupImages('" + data["query-continue"].allimages.gaifrom + "');", 5000);
        }
    });
}

$(function () {
    if ($("#mw-dupimages").length) findDupImages();
});

importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

// Create the "dev" namespace:
// Courtesy to World War II Wiki where the code comes from

window.dev = window.dev || {};

window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: [
        '(click to browse)',
        '1.Improving', [
            'Clean up',
            'Corrected spelling/grammar',
            'Updating',
            'Rename',
            'Incorrect information',
            'Adding Information',
            'Adding Links',
            'Adding Infobox',
            'Adding Navbox',
            'Adding Category',
            'Removing Category',
            'Adding Photo',
            'Removing Photo',
            'Tagging as Stub', 
            'Tagging as Needs Expansion',
            'Tagging as Plagiarized',
            'Tagging as Needs Clean up',
            'Removing Spam',
            'Removing Vandalism',
            'Removing Plagiarized information',
            'Unneeded Content',
            /* etc. */
         ]
         /* etc. */
    ]
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EditcountTag/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SpoilerAlert/code.js',
    ]
});

window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};

var bureaucrats = [
];
 
var admins = [
   'JohnnyHarden',
];
 
var moderators = [
];
 
var threadmoderators = [
];
 
var imageeditors = [
];
 
(function (bureaucrats, admins, moderators, threadmoderators, imageeditors) {
   if (!bureaucrats.length && !admins.length && !moderators.length && !threadmoderators.length && !imageeditors.length) return;
   if ('view' !== ($.getUrlVar('action') || 'view')) return;
 
   /* Regex arrays for: */
   var bRegex = [],  /* bureaucrats */
       aRegex = [],  /* admins */
       mRegex = [],  /* moderators */
       tmRegex = [], /* threadmoderators */
       ieRegex = []; /* imageeditors */
 
   for (var i = 0; i < bureaucrats.length; i ++)
      bRegex.push(bureaucrats[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
   for (var i = 0; i < admins.length; i ++)
      aRegex.push(admins[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
   for (var i = 0; i < moderators.length; i ++)
      mRegex.push(moderators[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
   for (var i = 0; i < threadmoderators.length; i ++)
      tmRegex.push(threadmoderators[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
   for (var i = 0; i < imageeditors.length; i ++)
      ieRegex.push(imageeditors[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
   bRegex = (bRegex.length ? bRegex.join('|') : 0);
   aRegex = (aRegex.length ? aRegex.join('|') : 0);
   mRegex = (mRegex.length ? mRegex.join('|') : 0);
   tmRegex = (tmRegex.length ? tmRegex.join('|') : 0);
   ieRegex = (ieRegex.length ? ieRegex.join('|') : 0);
 
   function addClassToComments() {
      if (bRegex) {
         var regex = new RegExp('^(?:' + bRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('bureaucrat');
      }
 
      if (aRegex) {
         var regex = new RegExp('^(?:' + aRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('admin');
      }
 
      if (mRegex) {
         var regex = new RegExp('^(?:' + mRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('moderator');
      }
 
      if (tmRegex) {
         var regex = new RegExp('^(?:' + tmRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('threadmoderator');
      }
 
      if (ieRegex) {
         var regex = new RegExp('^(?:' + ieRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('imageeditor');
      }
   }
 
   function addClassToWall() {
      var path     = wgServer + '/wiki/Message_Wall:';
 
      if (bRegex) {
         var tmpRegex = path + bRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).children('.speech-bubble-avatar')
               .children('a').attr('href')
            );
         })
         .addClass('bureaucrat');
      }
 
      if (aRegex) {
         var tmpRegex = path + aRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).children('.speech-bubble-avatar')
               .children('a').attr('href')
            );
         })
         .addClass('admin');
      }
 
      if (mRegex) {
         var tmpRegex = path + mRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).children('.speech-bubble-avatar')
               .children('a').attr('href')
            );
         })
         .addClass('moderator');
      }
 
      if (tmRegex) {
         var tmpRegex = path + tmRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).children('.speech-bubble-avatar')
               .children('a').attr('href')
            );
         })
         .addClass('threadmoderator');
      }
 
      if (ieRegex) {
         var tmpRegex = path + ieRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).children('.speech-bubble-avatar')
               .children('a').attr('href')
            );
         })
         .addClass('imageeditor');
      }
   }
 
   function addClassToProfilePage() {
      if (bRegex) {
         var regex = new RegExp('(?:' + bRegex + ')(?:/|$)', 'i');
 
         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('bureaucrat');
      }
 
      if (aRegex) {
         var regex = new RegExp('(?:' + aRegex + ')(?:/|$)', 'i');
 
         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('admin');
      }
 
      if (mRegex) {
         var regex = new RegExp('(?:' + mRegex + ')(?:/|$)', 'i');
 
         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('moderator');
      }
 
      if (tmRegex) {
         var regex = new RegExp('(?:' + tmRegex + ')(?:/|$)', 'i');
 
         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('threadmoderator');
      }
 
      if (ieRegex) {
         var regex = new RegExp('(?:' + ieRegex + ')(?:/|$)', 'i');
 
         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('imageeditor');
      }
   }
 
   function addClassToLinks() {
      var paths = [
         '/wiki/Special:Contributions/',
         '/wiki/User:',
         '/wiki/Message_Wall:',
         '/wiki/User_Blog:',
      ];
 
      if (bRegex) {
         var regexes = bRegex.split('|');
         var exprs   = [];
 
         for (var i = 0; i < regexes.length; i ++) {
            exprs[i] = [];
 
            for (var j = 0; j < paths.length; j ++)
               exprs[i].push(wgServer + paths[j] + regexes[i]);
 
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
               exprs[i].push(wgServer + paths[j] + regexes[i]);
 
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
         .addClass('admin');
      }
 
      if (mRegex) {
         var regexes = mRegex.split('|');
         var exprs   = [];
 
         for (var i = 0; i < regexes.length; i ++) {
            exprs[i] = [];
 
            for (var j = 0; j < paths.length; j ++)
               exprs[i].push(wgServer + paths[j] + regexes[i]);
 
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
         .addClass('moderator');
      }
 
      if (tmRegex) {
         var regexes = tmRegex.split('|');
         var exprs   = [];
 
         for (var i = 0; i < regexes.length; i ++) {
            exprs[i] = [];
 
            for (var j = 0; j < paths.length; j ++)
               exprs[i].push(wgServer + paths[j] + regexes[i]);
 
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
         .addClass('threadmoderator');
      }
 
      if (ieRegex) {
         var regexes = ieRegex.split('|');
         var exprs   = [];
 
         for (var i = 0; i < regexes.length; i ++) {
            exprs[i] = [];
 
            for (var j = 0; j < paths.length; j ++)
               exprs[i].push(wgServer + paths[j] + regexes[i]);
 
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
         .addClass('imageeditor');
      }
   }
 
   $(function() {
      if (wgCanonicalNamespace == "Thread" ||
          wgCanonicalNamespace == "Message_Wall")
         addClassToWall();
      else if ($('ul.comments li').length)
         addClassToComments();
 
      if ($('#UserProfileMasthead').length)
         addClassToProfilePage();
 
      // Works, but unfortunately has some limitations..using CSS instead
      // addClassToLinks();
    });
 
}(bureaucrats, admins, moderators, threadmoderators, imageeditors));

window.LockOldBlogs = {
    expiryDays: 30,
};
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:NoImageLightbox/code.js',
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PurgeButton/code.js'
    ]
});

// USERNAME
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/* "Username" template - from Wiki */
$(function() {
  if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
  $('span.insertusername').html(mw.config.get('wgUserName'));
});
/* End */

// Reveal AnonIP
 
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

//RailWam
window.railWAM = {
    logPage:"Project:WAM Log"
};