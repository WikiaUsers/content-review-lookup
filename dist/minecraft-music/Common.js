/* Any JavaScript here will be loaded for all users on every page load. */
// Begin below this line
//---------------------------------------------------------------------------------------

// ************************
// Script configurations
// ************************

/** User Tags **/

window.UserTagsJS = {
    modules: {
        
        implode: {
            'moderator': ['content-moderator', 'chatmoderator', 'threadmoderator']
        },
        
        explode: {
            'sysop': ['bureaucrat']
        },
        
        newuser: {
            computation: function(days, edits) {return days < 8 && edits < 30}
        },
        
        inactive: {
            days: 80,
            zeroIsInactive: false
        },
        
        custom: {
            
            'SyzygySoldier': ['exburo', 'founder'],
            'Supertoastfairy': ['exadmin'],
            'GoodbyeEveryone': ['exadmin']
            
        },
        
        autoconfirmed: true,
        
        mwGroups: new Array("bannedfromchat", "bot", "rollback", "util")
        
    },
    
    tags: {
        
        'founder': {order: -1/0},
        'blocked': {u: 'Banned', order: -1/0},
        'bannedfromchat': {u: 'Banned from Chat', order: -1/0},
        'bureaucrat': {order: 1},
        'sysop': {order: 2},
        'moderator': {u: 'Moderator', order: 3},
        'content-moderator': {order: 4},
        'rollback': {order: 5},
        'threadmoderator': {order: 6},
        'chatmoderator': {order: 7},
        
        'exburo': {u: 'Former Bureaucrat', order: 9},
        'exadmin': {u: 'Former Admin', order: 10},
        
    }
};

/** AJAX Auto-Refresh **/

window.ajaxPages = new Array(
    "Special:WikiActivity",
    "Special:WikiActivity/watchlist",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Log",
    "Special:Images",
    "Special:ListFiles",
    "Special:Contributions",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:DoubleRedirects",
    "Special:WhatLinksHere",
    "Special:Categories",
    "Special:Videos",
    "Special:Watchlist",
    "Special:LonelyPages",
    "Special:BrokenRedirects",
    "Special:DeadendPages",
    "Special:Disambiguation",
    "Special:Withoutimages",
    "Special:BlockList",
    "Special:ChatBanList",
    "Blog:Recent_posts");
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';

/** RevealAnonIP **/

window.RevealAnonIP = {
    permissions : [
        'rollback',
        'sysop',
        'bureaucrat',
        'content-moderator',
        'threadmoderator',
        'chatmoderator'
    ]
};

window.ajaxCallAgain = [RevealAnonIP.reveal];

/** Prevent Deezer widget and YouTube player from autoplaying **/

jQuery.extend(true, window, {
    DeezerWidgetDisableAutoplay: true,
    YoutubePlayerDisableAutoplay: true
});

/** SpoilerAlert **/

window.SpoilerAlertJS = {
    question: "Warning! This section contains spoilers, important plot details \
    and information regarding plot twists or the ending of an song. \
    Are you sure you want to see the article?",
    yes: 'Yes.',
    no: 'No.',
    fadeDelay: 545
};

/** MassCategorization **/

jQuery.extend(true, window, {
    massCategorizationDelay: 2500,
    MassCategorizationGroups: [
        'bot',
        'bureaucrat', 
        'content-moderator', 
        'rollback',
        'sysop'
    ]
});

// ************************
// Staff tools
// ************************

if (wgUserGroups.includes("rollback") || wgUserGroups.includes("content-moderator") ||
    wgUserGroups.includes("sysop")) {
        importArticles({
            type: 'script',
            articles: [
                "u:dev:MediaWiki:AjaxRename/code.js",
                "u:dev:MediaWiki:AjaxRedirect/code.js"
            ]
        });
}

// ******************************************************
// Makes {{Username}} display the username of the vistor
// Requires copying of Template:Username
// ******************************************************
 
$(function UserNameReplace() {
    if (
        typeof(disableUsernameReplace) !== 'undefined' && 
        disableUsernameReplace || wgUserName === null
    ) return;
    $(".Username").text(wgUserName);
});

// *********************************************************
// Allows CSS to target pages with a specific template. 
// Made by KockaAdmiralac upon request.
// *********************************************************
 
$('body').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));

// ********************************
// Bureaucrat certainity messages
// ********************************
 
var BuroWarning = "Do you truly want to promote this user to bureaucrat?" + 
    " This is irreversible through conventional means!";
!function () {
  if (wgCanonicalSpecialPageName !== 'Userrights') {return}
  $('#mw-content-text').on('change', '#wpGroup-bureaucrat', function() {
    if (
      !!$('#wpGroup-bureaucrat').attr('checked') &&
      !confirm(String(BuroWarning)) ) {
          $('#wpGroup-bureaucrat').attr('checked', null);}
    });
}();

// *************************************
// Adds a "Logs" tab to User Mastheads
// *************************************
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds; $(".tabs-container > ul.tabs").html(news);
});

// ********************************************************
// Add new buttons to the toolbar atop the Source Editor
// ********************************************************
 
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

// ****************************************************
// Adds a Block button to button dropdown on messages
// Author: Dorumin
// ****************************************************
 
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

// *******************************************************
// Sorts content on Special:WhatLinksHere alphabetically
// *******************************************************
 
!function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') return;
    var sorted_list, $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > 
        $(b).find('a:first').attr('title')) ? 1 : -1;});
    $list.children('li').remove(); $list.append(sorted_list);
}(jQuery);

// ******************************************
// Test if an element has a certain class.
// Increases general performance.
// ******************************************
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className]: (reCache[className] = 
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

// ****************************************************************************
// Collapsible tables; allows tables to be collapsed, showing only the header.
// See [[Wikipedia:NavFrame]]. Taken from Wikipedia's Common.js.
// *****************************************************************************
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);
 
    if (!Table || !Button) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");
 
    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;
 
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);
 
            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));
 
            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }
 
    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}
 
addOnloadHook(createCollapseButtons);

// ****************************************** 
// Dynamic Navigation Bars
// Description: See [[Wikipedia:NavFrame]].
// Taken from Wikipedia's Common.js.
// ******************************************
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild !== null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass( NavChild, 'NavPic')) {
                 NavChild.style.display = 'none';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild !== null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i = 0; 
             i < divs.length; 
             i++
         ) {
             NavFrame = divs[i];
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 
                'javascript:toggleNavigationBar(' + indexNavigationBar + ');'
             );
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             for (
                  var NavChild = NavFrame.firstChild;
                  NavChild !== null;
                  NavChild = NavChild.nextSibling
                 ) {
                 if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
                     if (NavChild.style.display == 'none') {
                         NavToggleText = document.createTextNode(NavigationBarShow);
                         break;
                     }
                 }
             }
 
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for (
               var j = 0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
  }
 
addOnloadHook(createNavigationBarToggleButton);

// *****************************************
// Add direct links on YouTube file pages
// *****************************************

if (window.playerParams && playerParams.provider === 'youtube') {
    var $ytLink = $('<a>').attr(
        'href',
        'https://www.youtube.com/watch?v=' +  playerParams.jsParams.videoId
    ).text(mw.config.get('wgTitle'));
    $('.video-provider').prepend($ytLink, ' – ');
    $('div[id^="youtubeVideoPlayer"]').removeAttr('style');
}

// **************************************************
// Experimental JavaScript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">JavaScript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff < 0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }
 
  // calculate the diff
  var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
  if(diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
  if(diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
  if(diff > 0) left = diff + ' days ' + left;
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer('+i+')', 1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline';
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length === 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
 
addOnloadHook(checktimers);

// *****************************************************************************
// Fixes undo bug with no summary if certain options in Preferences are enabled
// ******************************************************************************
 
$(function() {
    if (document.location.search.indexOf("undo=") !== -1 && 
        document.getElementsByName('wpAutoSummary')[0]) {
          document.getElementsByName('wpAutoSummary')[0].value = '1';}
});

// ---------------------------------------------------
// END JavaScript code. Do not write below this line.
// ---------------------------------------------------