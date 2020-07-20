/* Any JavaScript here will be loaded for users using the Oasis skin */

//=======================
// Cancel Edit Button
//=======================

$(function addCancel () { 
  if (typeof(wgIsEditPage) != 'undefined') { 
  $('<span id="cancelbutton" class="button" style="margin-top:2px"><a id="CancelButtonText" href="/wiki/'+ wgPageName +'"><span style="color:#FFFFFF">Cancel Edit</span></a></span>').prependTo('#EditPageHeader h2');
  }
});

//========================================
// Adds a "Logs" tab to User Mastheads
//========================================

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

//============================
// RailWAM Configuration
//============================

window.railWAM = {logPage:"Project:WAM Log"};

// DiscordIntegrator setup

/* There is no Discord for the wiki yet and it will only be made once there
are sufficient users. The code is here in advance so that when the server is
made and the ID is defined, everything will be set and loaded right away. */

window.DiscordIntegratorConfig = {
    siderail: {
        theme: "dark",
        footer: 'Please do not purposely misbehave in this Discord (accidents are understandable). If you have a Wikia account, unacceptable behaviour on this Discord can lead to on-wiki bans if deemed necessary.'
    }
};

//===============================================================
// Add new buttons to the toolbar atop the Source Editor
//===============================================================
 
if (mwCustomEditButtons.length) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/c/c8/Button_redirect.png",
	"speedTip": "Add redirect",
	"tagOpen": "#REDIRECT [" + "[",
	"tagClose": "]]",
	"sampleText": "Insert text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/c/c9/Button_strike.png",
	"speedTip": "Strike through text",
	"tagOpen": "<s>",
	"tagClose": "</s>",
	"sampleText": "Strike-through text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/1/13/Button_enter.png",
	"speedTip": "Line break",
	"tagOpen": "<br />",
	"tagClose": "",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/7/74/Button_comment.png",
	"speedTip": "Add text only visible in the Source Editor",
	"tagOpen": "<!-- ",
	"tagClose": " -->",
	"sampleText": "Insert comment here"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "//images.wikia.com/central/images/f/fd/Button_underline.png",
	"speedTip": "Underline text",
	"tagOpen": "<u>",
	"tagClose": "</u>",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/4/43/Button-template.png",
	"speedTip": "Add template tags",
	"tagOpen": "{{",
	"tagClose": "}}",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/2/28/Button_wikilink.png",
	"speedTip": "Add link to category or file page",
	"tagOpen": "[[:",
	"tagClose": "]]",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/c/cb/Button_wikipedia.png",
	"speedTip": "Quick link to Wikipedia",
	"tagOpen": "[[wikipedia:",
	"tagClose": "]]",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/3/3c/Button_pre.png",
	"speedTip": "Show literal content in gray box and code font",
	"tagOpen": "<pre>",
	"tagClose": "</pre>",
	"sampleText": ""
	};
}

//=======================================================
// Prevent users from messaging global bots
// E.g. Default, Wikia, CreateWiki script, etc.
//=======================================================
 
$(function (config) { config = config || {};
    var PageName = mw.config.get('wgTitle'), 
    Namespace = mw.config.get('wgCanonicalNamespace'),
    exceptions = config.exceptions || []; if (Namespace === "Message_Wall") {
        $.getJSON('/api.php?action=query&list=groupmembers&gmgroups=bot-global&gmlimit=max&format=json', 
        function(data) { var globalBotList = data.users;
            for (var i = 0; i < globalBotList.length; i++) {
                if (globalBotList[i].name === PageName) {
                    if (exceptions.indexOf(PageName) === -1 ) 
                    {$('.Wall.Board').remove();$('.UserProfileActionButton')
                    .remove();$('#mw-content-text').prepend
                         ('<p id="gbmw-greeting" style="margin-top: 8px;">This account is a global bot operated by FANDOM for various tasks and purposes. There is no need to message it.</p>'
);}break;}}});}}(window.DisableGlobalBotMessageWalls));
 
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

/****** ARCHIVE ******/
/*
//=======================================
// Back to Top Button Configuration
//=======================================

window.BackToTopStart = 450;
window.BackToTopSpeed = 700;
window.BackToTopModern = true; 

(function(window, mw, $) {
    "use strict";
    var tru = {
        condition: "false"
    };
    var tt = setInterval(function() {
        if ($('.DiscordIntegratorModule')[0] !== undefined && tru.condition == "false") {
            var preDiscordText = '<div id="discordTitleModule"><span style="font-family:Ubuntu;font-size:17px;font-weight:bold;text-shadow:20px purple;color:crimson;text-transform:uppercase">Flash Gaming Wiki Discord Server</span></div><br />';
            $(".DiscordIntegratorModule").prepend(preDiscordText);
            clearInterval(tt);
            return tru.condition = "true";
        }
    }, 2000);
}(window, mw, $));

window.DiscordModuleSettings = {
  //id: '', Commented out until Discord is set up
    customDescription: "The Flash Gaming Wiki has a Discord Server! Click on the \" Join \" button to enter.<br>It is important to know that if you have a Wikia account, unacceptable behaviour on this Discord can lead to on-wiki bans if deemed necessary.",
    railPosition: "prepend",
    showGuideline: true,
    showForAnonym: true,
    showServerName: true,
    useSvg: true  
};


//===============================================================================
// Adds a tab to User Masthead that links to the Archived Talk Page if existant
// Broken / not working. Thereby disabled completely
//===============================================================================

$.ajax({
url: "https://flashgaming.wikia.com/wiki/" + "Message_Wall_" + wgTitle + "/" + "User talk archive",
method: "GET",
success: function(s) { 
    if(e.readyState == 4 && e.status != 404) {
		var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Message Wall:" + wgTitle + "/" + "User talk archive";
    var adds = "<li data-id='editcount'><a href='" + address + "'>Archived talk page</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
	}
  },
error: function(e) { 
	console.log('There is an error with Wikia.js. Please check the code or contact a knowledgeable user if need be.');
 }
});

*/