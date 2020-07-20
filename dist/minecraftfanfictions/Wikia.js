//=======================================================
// Prevent users from messaging global bots
// E.g. Default, Wikia, CreateWiki script, etc.
//=======================================================
 
$(function (config) { config = config || {};
    var PageName = mw.config.get('wgTitle'), 
    Namespace = mw.config.get('wgCanonicalNamespace'),
    exceptions = config.exceptions || []; if (Namespace === "Message_Wall") {
        $.getJSON('/api.php?action=query&list=groupmembers&gmgroups=bot-global\
                   &gmlimit=max&format=json', 
        function(data) { var globalBotList = data.users;
            for (var i = 0; i < globalBotList.length; i++) {
                if (globalBotList[i].name === PageName) {
                    if (exceptions.indexOf(PageName) === -1 ) 
                    {$('.Wall.Board').remove();$('.UserProfileActionButton')
                    .remove();$('#mw-content-text').prepend
                         ('<p id="gbmw-greeting" style="margin-top: 8px;">\
                         This account is a global bot operated by FANDOM for\
                         various tasks and purposes. There is no need to \
                         message it.</p>'
);} break;}}});}}(window.DisableGlobalBotMessageWalls));

//=============================================================
// Add a button atop the editor to cancel an edit
//=============================================================
 
$(function addCancel () {
  if (typeof(wgIsEditPage) !== 'undefined') { 
    $('<span id="cancelbutton" class="button" style="margin-top:2px"><a id="cancelbuttontext" href="/wiki/'+ wgPageName +'"><span style="color:#FFFFFF;text-decoration:none;">Cancel Edit</span></a></span>').prependTo('#EditPageHeader h2');
}});

//==============================================================================
// Spoiler Alert configuration
//==============================================================================
 
window.SpoilerAlertJS = {
    question: "Warning! This page contains spoilers for fanfictions on this site\
    , or otherwise important information initially concealed. Are you sure want\
    to see them?",
    yes: 'Yes',
    no: 'No',
    fadeDelay: 625
};
 
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