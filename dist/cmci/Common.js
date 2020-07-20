/* Any JavaScript here will be loaded for all users on every page load. */
// Archived (broken) code from original founder.
/*window.UserTagsJS = {
	modules: {},
	tags: {
	    leader: { u:'Leader of CMCI', order:-1/0 }
		primeminister: { u:'Prime Minister of CMCI', order:-1/0 }
	}
};*/

/* Tags */
/*window.UserTagsJS
            ultimatebl BLASTER', order:-1/0 }
            coder
};

UserTagsJS.modules.c
    'Withersoul 235': ['ultim
    'AngrydroidForce99': ['coder']
};*/

//=================================
// Script configurations 
//=================================

window.UserTagsJS = {
	modules: {
	    neweditor: {
	        days: 3,
	        edits: 10
	    },
	    stopblocked: false, // Keep tags of banned users
	    isblocked: true, // Determine if users are banned or not
	    inactive: 60,
	    nonuser: true,
	    userfilter: {
	        'AngrydroidForce99': ['bureaucrat', 'sysop', 'threadmoderator',
	                              'content-moderator', 'rollback', 
	                              'chatmoderator'] 
	    },
	    custom: {
	        'AngrydroidForce99': ['fhb', 'polandball', 
	                             'galacticempire', 'mspaintpicture'],
	        'Withersoul 235': ['moviestaff', 'angrys-trustees'],
	        'Godofmemez': ['moviestaff'],
	        'Awesomeclash11': ['homu'],
	        'Marc2427': ['angrys-trustees'],
	        'TheDankMaster99': ['angrys-trustees']
	    }
	},
	tags: {
	    'moviestaff': {
	        u: 'Movie Staff',
	        title: 'This user is involved within the creation and development of the fictional movie universe detailed on this wiki.'
	    },
	    'homu': {
	        u: 'Head of the Movie Universe',
	        title: 'This user created the movie universe and overlooks it and the rest of the crew.'
	    },
	    // Angry's former tags
	    'mspaintpicture': {
	        u: 'MS Paint Picture',
	        order: 3
	    },
	    'polandball': {
	        u: 'Polandball',
	        order: 1
	    },
	    'galacticempire': {
	        u: 'Galactic Empire',
	        order: 2
	    },
	    // Resume
	    'fhb': {
	        u: 'Former Head Bureaucrat',
	        order: -1/0
	    },
	    'angrys-trustees': { 
	        // Reserved for users who had this tag through ProfileTags
	        u: 'Angry\'s trustees',
	        order: 6
	    }
	},
	oasisPlaceBefore: '' // Leave this be
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

WHAMDelay = 1000;
window.BackToToTopStart = 625;
window.BackToTopModern = true;
window.SeeMoreActivityButtonOld = true;

// Lock old blogs

window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog has been archived because it hasn\'t been commented on in over <expiryDays> days.",
    nonexpiryCategory: "Never archived blogs"
};

// Send an automated message to blocked users

var MessageBlock = {
  title: "You're Out.",
  message: "Hello. I am an admin on this wiki. You have been banned for $2 for the following reason: $1. If you think you should be unbanned, let an admin know or contact the FANDOM Staff. Have a nice day.",
  autocheck: false
};

// Notiplus (notification sending system)

window.notiplus = window.notiplus || {};
notiplus.url = '/wiki/Project:Notiplus?action=render';
notiplus.cookiePrefix = 'notiplus';
notiplus.consentRequired = false;
notiplus.reverseOrder = true;
notiplus.lang = 'en';

// Fix static GIF thumbnails

window.DynamicImages = {
    gifGaleryImages: true,
    gifImages: true,
    svgGaleryImages: true
};

// AJAX Auto-Refresh

window.ajaxPages = [
    "Special:WikiActivity",
    "Special:Log",
    "Special:Images",
    "Special:ListFiles",
    "Project:ListFiles",
    "Special:Contributions",
    "Special:NewPages",
    "Blog:Recent posts"
    ];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';

// Script Imports

importArticles({
     type: 'script',
     articles: [
          'u:dev:MediaWiki:AjaxRC/code.js',
          'u:dev:Mediawiki:BackToTopButton/code.js',
          'u:dev:MediaWiki:DynamicImages/code.js',
          'u:dev:MediaWiki:LockOldBlogs/code.js',
          'u:dev:MediaWiki:MessageBlock/code.js',
          'u:dev:MediaWiki:Notiplus.js',
          'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
     ]
});

//=========================================================================
// Adds separate list of uncreated categories on Special:Categories.
// Taken from OneTwoThreeFall's Global JS 
//========================================================================
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Categories') {
    var $newCats = $('<div>').css('float', 'right').text('Uncreated categories:');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li').has('.newcategory').clone().appendTo($newCatsList);}
 
//=========================================================================
// Always open chat in a new window whenever opened through a link
//=========================================================================
 
$(".openchat a").click(function () {
    window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
    return false;
});
 
//===================================================================
// Allow styling of all threads and replies by a certain user
//===================================================================
 
$('.speech-bubble-message').each(function() {
    var $this = $(this);
    $this.attr(
        'data-user',
         $this.find('> .MiniEditorWrapper > .edited-by > a').first().text()
    );
});

 
//============================================================================
// Allow CSS to affect all pages with a certain value in Template:Topic
// For example; affect all pages with {{Topic|sonic.exe}} on it
//============================================================================
 
$('body').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));
 
//=========================================================
// Makes {{Username}} display the username of the visitor
// Requires copying of Template:Username
//=========================================================
 
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

//==================================================================
// Boost general site performance and make for better chaching
//==================================================================
 
var hasClass = (function () {
    var reCache = {}; return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] =
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
};})();
 
//==============================================================
// Sorts content on Special:WhatLinksHere alphabetically
// By Fngplg
//==============================================================
 
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

//=============================================================
// Add a button atop the editor to cancel an edit
//=============================================================
 
$(function addCancel () {
  if (typeof(wgIsEditPage) != 'undefined') { 
    $('<span id="cancelbutton" class="button" style="margin-top:2px"><a id="cancelbuttontext" href="/wiki/'+ wgPageName +'"><span style="text-decoration:none;">Cancel Edit</span></a></span>').prependTo('#EditPageHeader h2');
  }
});

//====================================
// Adds a "Logs" tab to profiles
//====================================
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});