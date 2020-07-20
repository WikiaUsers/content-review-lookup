/* Any JavaScript here will be loaded for all users on every page load. */

/* Standard Edit Summary messages can be found at Template:Stdsummaries */


  /************/
 /* NotiPlus */
/************/
// Namespace for notiplus
window.notiplus = window.notiplus || {};
// Settings for notiplus
notiplus.url = '/wiki/Project:Notiplus?action=render';
notiplus.cookiePrefix = 'notiplus';
notiplus.consentRequired = false;
notiplus.reverseOrder = false;
notiplus.lang = 'en';

  /*************************/
 /* Social Media WikiRail */
/*************************/


$(window).load(function() {
    var SocialMedia = '<section class="module SocialMedia"></section>';
    $('#WikiaRail').append(SocialMedia);
    $.getJSON('/api.php?action=parse&text={{SocialMediaRail}}&format=json', function(n) {
        var addContent = n.parse.text['*'];
        $('.SocialMedia').append(addContent);
    });
});

  /***********************/
 /* Custom Edit Buttons */
/***********************/

if (mwCustomEditButtons.length) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/9/91/Redirect.png/revision/latest?cb=20160518220145",
		"speedTip": "Page redirect",
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "Redirect destination"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/4/49/ChangeDisplayName.png/revision/latest?cb=20161128171010",
		"speedTip": "Change page display name",
		"tagOpen": "{{DISPLAYTITLE:",
		"tagClose": "}}",
		"sampleText": "Display Name"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/4/46/StrikeThrough.png/revision/latest?cb=20160518220236",
		"speedTip": "Striked text",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Strike-through text"
	};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/1/16/Small_Text.png/revision/latest?cb=20160519195952",
		"speedTip": "Small text",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": "Small text"
	};
	
   mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/5/56/Center.png/revision/latest?cb=20160830180207",
		"speedTip": "Centered text",
		"tagOpen": "<center>",
		"tagClose": "</center>",
		"sampleText": "Centered text"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/e/e9/LineBreak.png/revision/latest?cb=20160518220158",
		"speedTip": "Line break",
		"tagOpen": "<br>",
		"tagClose": "",
		"sampleText": ""
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/d/d1/MultiLineBreak.png/revision/latest?cb=20160811154021",
		"speedTip": "Multiple line breaks",
		"tagOpen": "{{BR|",
		"tagClose": "}}",
		"sampleText": "Number of breaks"
	};
	
   mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/2/29/Add_Header_Icon.png/revision/latest?cb=20160519200029",
		"speedTip": "Header icon",
		"tagOpen": "{{Icon|",
		"tagClose": "}}",
		"sampleText": "Icon name"
	};
	
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/7/70/Add_Media_Gallery.png/revision/latest?cb=20160519200014",
		"speedTip": 'Add gallery (for "Media" headers)',
		"tagOpen": '<gallery widths="310" captionsize="medium" captiontextcolor="#8e8e8e" bordersize="none" bordercolor="transparent" captionalign="center" spacing="small" position="center">\n',
		"tagClose": "</gallery>",
		"sampleText": "File:ComingSoon.png|Caption text.\n"
	};
 
     mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/7/7c/Add_Tabber.png/revision/latest?cb=20160816160201",
		"speedTip": "Add tabber element frame",
		"tagOpen": "<tabber>\n |-|Tab 1 = ",
		"tagClose": "\n |-|Tab 2 = Tab 2 Content\n</tabber>",
		"sampleText": "Tab 1 Content"
	};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/9/9f/NOTOC.png/revision/latest?cb=20160518223039",
		"speedTip": "Disable TOC (Place at end of page)",
		"tagOpen": "__NOTOC__",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/drawntolife/images/d/db/Comment.png/revision/latest?cb=20160518220217",
		"speedTip": "Comment visible only for editors",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Insert comment here"
	};
}



  /***************/
 /* Last Edited */
/***************/

window.lastEdited = {
    avatar: false,
    size: false,
    diff: true,
    comment: true,
    time: 'timeago',
    namespaces: {
        // 0 - Mainspace
        // 1 - Talk
        // 2 - User
        // 3 - User talk
        // 4 - Project
        // 5 - Project talk
        // 6 - Image/File
        // 7 - Image talk/ File talk
        // 8 - MediaWiki
        // 9 - MediaWiki talk
        // 10 - Template
        // 11 - Template talk
        // 12 - Help
        // 13 - Help talk
        // 14 - Category
        // 15 - Category talk
        // 110 - Forum
        // 111 - Forum talk
        // 828 - Module
        // 829 - Module talk
        // 1202 - Message Wall Greeting
        exclude: [2, 3, 4, 6, 8, 12, 14, 110, 111, 828, 1202]
    }
};


  /***********/
 /* Buttons */
/***********/


$(window).load(function(){
 
    'use strict';
    
    /* Adds option to refresh page to edit dropdown */
    var url = '//' + location.host + location.pathname + '?action=purge';
    $('.WikiaMenuElement').append('<li><a id="refresh-button" href="' + url + '" title="Refresh page">Refresh</a></li>');
 
    /* Adds option to hide spoilers to the row of buttons */
    if ($.inArray('Spoilers', mw.config.get('wgCategories')) > -1) {
        $('#WikiaPageHeader').append('<a id="reset-spoilers" class="wikia-button secondary" style="margin-right: 10px;">Rehide spoilers</a>');
        $('#reset-spoilers').click(function() {
            localStorage.removeItem('spoilerCache');
            location.reload();
        });
    }
 
});

/* Code modified from Attack on Titan Wikia */

  /*************/
 /* UTC Clock */
/*************/
// Current setup displays: Month Day, Year - (Hour:Minute:Second)PM/AM (UTC)
window.DisplayClockJS = '%{January;February;March;April;May;June;July;August;September;October;November;December}m %d, %Y - %I:%2M:%2S%p (UTC)';




  /***********************/
 /* Mass Categorization */
/***********************/
/* Locks MassCategorization to admins and content mods */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1 ||
    mw.config.get("wgUserGroups").indexOf('content-moderator') > -1 ||
    mw.config.get("wgUserGroups").indexOf('rollback') > -1
) {
  massCategorizationDelay = 1000;
  importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}


  /************/
 /* Redirect */
/************/
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1 ||
    mw.config.get("wgUserGroups").indexOf('content-moderator') > -1 )
  importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev');



  /**********************/
 /* Back To Top Button */
/**********************/
/* Sets scroll distance until shown (0px - always shown)  */
var Start = 0;




  /*************************/
 /* {{USERNAME}} Template */
/*************************/
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.config.get('wgUserName'));
});




  /****************/
 /* Auto Refresh */
/****************/
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Log"];
ajaxRefresh = 45000; /* 45 seconds */
AjaxRCRefreshText = 'Auto Refresh';
AjaxRCRefreshHoverText = 'Automaticly refresh this page every 45 seconds?';
 



  /*****************/
 /* Userpage Tags */
/*****************/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
        custodian: { u:'Custodian' },
        chatmoderator: { u:'Chat Moderator' },
        'bot-global': { link: 'Project:Bots' },   
        'content-moderator': {u:'Content Moderator'},
        rollback: {u:'Rollback'},
        //These below are just for fun and shouldn't be taken seriously.
        tech: {u:'Technician'},
        baki: {u:'Bäkî'},
        lab: {u:'Lab Member 001'},
        potato: {u:'Potato Princess'},
        yuno: {u:'Employee of the Month'}
	}
};
UserTagsJS.modules.custom = {
	'Manere': ['tech'],
	'BreGee': ['potato'],
	'Evalinge': ['yuno','baki'],
	'Clayblob': ['lab']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'custodian', 'content-moderator', 'chatmoderator'];
UserTagsJS.modules.inactive = 30; // 30 days
 

  //------------------------(!!!)----------------------------//
 /*            Import Scripts - Place Configs Above         */
//--------------------------(!!!)--------------------------//
 
// See MediaWiki:ImportJS