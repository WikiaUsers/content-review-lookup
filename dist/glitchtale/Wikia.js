// RailWAM Configuration

window.railWAM = {
    logPage: "Project:WAM Log"  
};

$('#railwam-rail-mod').insertAfter('.discussions-rail-theme');

// Discussions Rail Module Config

window.discussionsModuleConfig = {
    'columns' : 1,
	'size' : 6,
	'mostrecent' : true
};

// Jump to bottom button. By Fngplg and Fandyllic.

(function(window, $, mw) {
    'use strict';
 
    var translations = { en: 'Jump to bottom' },
 
    buttonStart = typeof window.JumpToBottomStart === 'number' ?
        window.JumpToBottomStart :
        0,
    scrollSpeed = typeof window.JumpToBottomSpeed === 'number' ?
        window.JumpToBottomSpeed :
        600,
    fadeSwitch = typeof window.JumpToBottomFade === 'number' ?
        window.JumpToBottomFade :
        600,
 
    theText = (typeof window.JumpToBottomText === 'string' && window.JumpToBottomText) ||
    translations['.en'] || translations.en;
 
    if (window.JumpToBottomLoaded) {return}
    window.JumpToBottomLoaded = true;
 
    $(addJumpToBottom);
 
    function hideFade() {
        $("#jumptobottom").hide();
 
        $(window).scroll(function() {
            if (($(this).scrollTop() > buttonStart) && ($(this).scrollTop() < ($('#mw-content-text').height() - $('.wds-global-footer').height()))) {
                switch (fadeSwitch) {
                    case 0:
                        $('#jumptobottom').show();
                        break;
                    default:
                        $('#jumptobottom').fadeIn();
                        break;
                }
            } else {
                switch (fadeSwitch) {
                    case 0:
                        $('#jumptobottom').hide();
                        break;
                    default:
                        $('#jumptobottom').fadeOut();
                        break;
                }
            }
        });
    }
 
    $('body').on('click', '#jumptobottom', function() {
        $('body,html').animate({
            scrollTop: $('#mw-content-text').height() - $('.wds-global-footer').height() + 250
            }, scrollSpeed);return Boolean;
    });
 
    function addJumpToBottom() {
        $('<li />', {
            id: 'jumptobottom',
            style: 'float: right; margin-top: -1px; border-right: none'
        })
        .append(
            $('<button />', {
                type: 'button',
                style: 'height: 20px;',
                text: theText
            })
        )
        .appendTo('#WikiaBarWrapper .toolbar > .tools');

        hideFade();
    }
}(this, jQuery, mediaWiki));

// Back To Top Button Config

window.BackToTopText = "Jump to top";
window.BackToTopSpeed = 600;
window.BackToTopStart = 800;

// Cancel Edit button
 
$(function addCancel () {
  if (typeof(wgIsEditPage) !== 'undefined') { 
    $('<span id="cancelbutton" class="button" style="margin-top:2px; text-decoration: none;"><a id="cancelbuttontext" href="/wiki/'+ wgPageName +'"><span style="color:#FFFFFF;text-decoration:none;">Cancel Edit</span></a></span>').prependTo('#EditPageHeader h2');
  }
});

//=======================================================
// Prevent users from messaging global bots
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

/*******************************************************************************
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ START CUSTOM EDIT BUTTONS \\\\\\\\\\\\\\\\\\\\\\
*******************************************************************************/

/* Adds some new button shortcuts to the Source Editor */

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

/*******************************************************************************
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ END CUSTOM EDIT BUTTONS \\\\\\\\\\\\\\\\\\\\\\\\\
*******************************************************************************/

// Adds a "Logs" tab to User Mastheads
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

// Adds a new tag to permabanned users

window.addEventListener('load', function() {
    // Timeouts are always a terrible way to go, but UserTags has no event dispatched when it finished loading.
    setTimeout(function() {
        if (document.getElementById('UserProfileMasthead') === null) return;
        var blockTag = document.querySelector(
            '.tag.usergroup-blocked.blocked-user'
        );
        if (blockTag === null)
            return;
        new mw.Api().get({
            action: 'query',
            list: 'blocks',
            bkprop: 'expiry',
            bktimestamp: new Date().getTime(),
            bkusers: wgTitle
        }).done(function(d) {
            if (
                d.query.blocks[Number] &&
                d.query.blocks[Number].expiry === 'infinity') {
                    blockTag.innerHTML = 'Erased';
            }
        });
    }, 250);
});
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
$(".portal_metro .portal_body > div").on("click", function() {
    window.scrollBy(0, 10);
});