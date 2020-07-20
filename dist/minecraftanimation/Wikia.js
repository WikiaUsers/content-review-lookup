//=======================
// Back to Top Button
//=======================

window.BackToTopModern = true;
window.BackToTopStart = 625;

//====================
// New rail modules
//====================

window.AddRailModule = [
    {page: 'Template:Railheader', prepend: true}
];

//=============================
// Cancel Edit Button
//=============================

$(function addCancel () { 
  if (typeof(wgIsEditPage) !== 'undefined') { 
  $('<span id="cancelbutton" class="button" style="margin-top:2px, ' + 
   'text-decoration:none"><a id="cancelbuttonlink" href="/wiki/' + 
   wgPageName +'"><span style="color:#FFFFFF">Cancel Edit</span></a></span>')
   .prependTo('#EditPageHeader h2');}
});

//=======================================================
// Adds a Block button to button dropdown on messages
// Author: Dorumin
//=======================================================
 
if ((wgNamespaceNumber === 1201 || wgNamespaceNumber === 1200) && 
    wgUserGroups.includes("sysop")) {
        for (var i in $('.msg-toolbar')) {
            var user = $('.msg-toolbar:eq('+i+')')
                .parent()
                .find('.edited-by a')
                .text();
            $('.msg-toolbar:eq('+i+')').find('.WikiaMenuElement li')
                .last().before(
                    '<li><a href="/wiki/Special:Block/' + user + '">Block</a></li>'
            );
        }
}

//********************************

// Adds a Rail Module that allows one to join the Minecraft Community on Steam
// Steam iFrames no longer work except for store items
//$('#WikiaRail').append('<section class="module" id="SteamGroupModule"><iframe marginheight="0" marginwidth="0" src="https://steamcommunity.com/groups/MinecraftCommunity" align="top" frameborder="0" width="275" height="300" scrolling="no"/></section>');

//======================================
// Adds a "Logs" tab to User Mastheads
//======================================

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds; $(".tabs-container > ul.tabs").html(news);
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

/*******************************************************************************
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ END CUSTOM EDIT BUTTONS \\\\\\\\\\\\\\\\\\\\\\\\\
*******************************************************************************/
//====================================================================
// VSTF Report Button
//====================================================================

if ($(".UserProfileMasthead hgroup").exists()) {
    $('<a>', {
        "id": "ReportButton",
        "href": "//vstf.wikia.com/wiki/Report:Vandalism",
        "target": "_blank",
        "title": "Please make sure to report the user at the appropriate" +
                 " page (Vandalism, spam or masthead. Defaults to Vandalism).",
        "text": "Report to VSTF",
        "css": ({
            "width": "160px",
            "font-family": "Minecraftia",
            "color": "yellow",
            "padding": "7px",
            "float": "none",
            "height": "25px",
            "border": "3px solid black",
            "background-image": "url('https://vignette.wikia.nocookie.net/minecraftanimation/images/7/78/Minecraft_Stone_Texture.jpg/revision/latest?cb=20180909083218')",
            "font-size": "15px",
            "box-shadow": "0 0 20px gray",
            "position": "relative",
            "border-radius": "0",
            "background-size": "170px",
            "padding-top": "0"
        })}).appendTo(".tabs-container");
}

//=================================
// Standard edit summaries
//=================================

window.dev.editSummaries = {
    select: [
        '(click to browse)',
        'Fixes', [
            'Cleanup',
            'Correcting spelling/grammar',
            'Rewriting page to fit standard format',
            'Fixing HTML / Wikitext',
            'Removing / replacing duplicate information / images',
            'Fixing broken link',
            'Correcting false template usage',
            'Rewording information'
         ],
         'Content', [
           'Adding new information',
           'Revising information',
           'Expanding',
           'Rewriting in neutral point of view',
           'Adding sources',
        ],
        'Reverts', [
          'Reverting vandalism',
          'Removing spam',
          'Removing hate speech',
          'Removing opinions',
          'Removing false information',
          'Removing speculation / unverified information',
          'Removing copyright violation',
          'Reverting test edit'
        ],
        'Templating', [
          'Adding a template',
          'Adding templates',
          'Removing a template',
          'Removing templates',
          'Editing a template',
          'Editing templates',
          'Adding quote',
          'Changing quote',
          'Modifying infobox values',
        ],
        'Categories', [
          'Changing category',
          'Changing categories',
          'Rearranging category',
          'Rearranging categories',
          'Removing category',
          'Removing categories'
        ],
        'CSS (admins only)', [
          'Fixing / removing broken CSS',
          'Adding CSS',
          'Changing CSS',
          'Removing customization policy violations',
          'Removing flashy / eye hurting modifications',
          "Ranked users' usernames, tags, comments or messages",
          'Fixes',
          'Changing HTTP to HTTPS',
          'Adding import',
          'Adding imports',
          'Changing import',
          'Changing imports',
          'Removing import',
          'Removing imports'
        ],
        'ImportJS (admins only)', [
          'Adding a script',
          'Adding scripts',
          'Removing a script',
          'Removing scripts',
          'Replacing a script',
          'Replacing scripts',
          'Correcting import',
          'Correcting imports'
        ],
        'Miscellaneous', [
          'Adding content to userpage', // Userpages only
          'Adding a comment to the Source editor', // <!-- stuff -->
          'Adding input', // For talk page-style public pages
          'Posting on Community Forum',
          'Signing guestbook', // For users with guestbooks on their userpages
          'Created page',
          'Updating Less'
        ]
    ]
};
 
//=======================================================
// Prevent users from messaging global bots
//=======================================================
 
$(function (config) {config = config || {};
    var PageName = mw.config.get('wgTitle'), 
    Namespace = mw.config.get('wgCanonicalNamespace'),
    exceptions = config.exceptions || []; if (Namespace === "Message_Wall") {
        $.getJSON('/api.php?action=query&list=groupmembers&gmgroups=bot-\
        global&gmlimit=max&format=json', 
        function(data) {var globalBotList = data.users;
            for (var i = 0; i < globalBotList.length; i++) {
                if (globalBotList[i].name === PageName) {
                    if (exceptions.indexOf(PageName) === -1 ) 
                    {$('.Wall.Board').remove();$('.UserProfileActionButton')
                    .remove();$('#mw-content-text').prepend
                         ('<p id="gbmw-greeting" style="margin-top: 8px;">\
                         This account is a global bot operated by FANDOM for \
                         various tasks and purposes. There is no need to \
                         message it.</p>'
);} break;}}});}}(window.DisableGlobalBotMessageWalls));

//===================================================================
// Allow styling of all threads and replies by a certain user
//===================================================================
 
$('.speech-bubble-message').each(function() {
    var $this = $(this); $this.attr('data-user',
        $this.find('> .MiniEditorWrapper > .edited-by > a').first().text());
});

// **************************************************
// Hide namespaces in categories (Splarka)
// **************************************************
// A quick script to hide namespace prefixes in category lists. Just add 
// <div id="catnoprefix" style="display:none;"></div>
// to the category description page to  activate it. 
 
function catprefix() {
  if(!document.getElementById('catnoprefix')) return;
  var anchors = document.getElementById('mw-pages').getElementsByTagName('a');
  for(var i=0;i < anchors.length;i++) {
    if(anchors[i].firstChild.nodeValue.indexOf(':') !== -1) {
      anchors[i].firstChild.nodeValue = anchors[i].firstChild
      .nodeValue.substring(anchors[i].firstChild.nodeValue.indexOf(':')+1);}}
} addOnloadHook(catprefix);

//============================================================================
// @desc: Adds a button for showing what pages are linked on current page. 
//       (Opposite of What links here)
// Compiled from CoffeeScript for no good reason ☺
// @author: UltimateSupreme (http://dev.wikia.com/wiki/User:UltimateSupreme)
// @License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
//============================================================================

(function(mw, $) {
    'use strict';
 
    var addButton, elem, getLinks, showPopup, val, _ref;
    _ref = [mw.html, '<ul>'], elem = _ref[0], val = _ref[1];
 
	if ($('.ca-wlh').length)
		return false;
 
    addButton = function() {
        var $link;
        $link = $('<li><a>').find("a").attr({
                href: 'javascript: void 0',
                title: 'See what pages are linked on this page',
                'class': 'ca-wlh'
            }).text("What leaves here").click(showPopup)
            .end().addClass('overflow');
 
        if (mw.config.get('skin') === 'oasis')
            return $('#my-tools-menu').append($link);
        return $('#t-whatlinkshere').append($link);
    };
 
    getLinks = function() {
        return new mw.Api().get({
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'links',
            pllimit: 'max',
            format: 'json'
        }).done(function(data) {
            var q, v, _i, _len;
            addButton();
            q = data.query.pages[mw.config.get('wgArticleId')].links;
            if (q) {
                for (_i = 0, _len = q.length; _i < _len; _i++) {
                    v = q[_i];
                    val += '<li><a href="' 
                        + mw.util.wikiGetlink(v.title) 
                        + ' " title="'
                        + mw.util.wikiUrlencode(v.title)
                        + '">'
                        + v.title
                        + '</a></li>';
                }return val += '</ul>';
            }
        });
    };
    
    showPopup = function() {
        $.showCustomModal(
            "What leaves here",
            "The following pages are linked on this page:" + val, {
                id: "whlpop",
                width: 400,
                buttons: [{
                    id: "cancelCode",
                    message: "Close",
                    handler: function() {
                        return $("#whlpop").closeModal();
                }
            }]
        });
    };
    
    if (mw.config.get('wgArticleId') !== 0) {
        mw.loader.using(['mediawiki.api', 'mediawiki.util'], getLinks);}
    return true;
}).call(this, mediaWiki, jQuery);