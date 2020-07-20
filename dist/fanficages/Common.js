// Allows CSS to target pages with a specific template. Made by KockaAdmiralac upon request.
 
$('body').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));

// Anonymous user IP revealing tool

window.RevealAnonIP = {
    permissions : ['rollback', 'chatmoderator', 'sysop', 'bureaucrat', 'staff', 'util', 'helper']
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

// Test if an element has a certain class.
// Increases general performance

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] =
        new RegExp("(?:\\s|^)" + className + "(?:\\s|$)")))
        .test(element.className);};})
();
 
// Collapsible tables; allows tables to be collapsed, showing only the header.
// See [[Wikipedia:NavFrame]]. Taken from Wikipedia's Common.js.
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );

// Dynamic Navigation Bars
// Description: See [[Wikipedia:NavFrame]].
// Taken from Wikipedia's Common.js.
 
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
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
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
             var i=0; 
             i< divs.length; 
             i++
         ) {
             NavFrame = divs[i];
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             for (
                  var NavChild = NavFrame.firstChild;
                  NavChild !== null;
                  NavChild = NavChild.nextSibling
                 ) {
                 if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                     if (NavChild.style.display == 'none') {
                         NavToggleText = document.createTextNode(NavigationBarShow);
                         break;
                     }
                 }
             }
 
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
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
 
  addOnloadHook( createNavigationBarToggleButton );
  
//=========================================================
// Makes {{Username}} display the username of the vistor
// Requires copying of Template:Username
//=========================================================
 
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});
 
// **************************************************
// Experimental JavaScript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }
 
  // calculate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left;
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
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

// Adds separate list of uncreated categories on Special:Categories.
// Author: OneTwoThreeFall

if (mw.config.get('wgCanonicalSpecialPageName') === 'Categories') {
    var $newCats = $('<div>').css('float', 'right').text('Uncreated categories:');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li').has('.newcategory').clone().appendTo($newCatsList);
}

// Adds a button to clear Deletion reasons
// Author: OneTwoThreeFall

if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after('<span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();});
}

// AJAX Auto-Refresh

window.ajaxPages = [
    "Special:WikiActivity",
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
    "Special:Watchlist",
    "Special:LonelyPages",
    "Special:BrokenRedirects",
    "Special:DeadendPages",
    "Special:Disambiguation",
    "Special:Withoutimages",
    "Blog:Recent posts"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';
 
if(//If user is on any talk/Forum namespace or Message Wall
   wgNamespaceNumber == 110 || 
   wgNamespaceNumber == 111 ||
   wgNamespaceNumber == 3 ||
   wgNamespaceNumber == 1 ||
   wgNamespaceNumber == 5 ||
   wgNamespaceNumber == 7 ||
   wgNamespaceNumber == 9 ||
   wgNamespaceNumber == 11 ||
   wgNamespaceNumber == 13 ||
   wgNamespaceNumber == 15 ||
   wgNamespaceNumber == 503 ||
   wgNamespaceNumber == 829 ||
   wgNamespaceNumber == 1200 ||
   wgNamespaceNumber == 1201 ||
   wgNamespaceNumber == 2000 ||
   wgNamespaceNumber == 2001)
{window.ajaxPages.push(wgPageName);}

// Spoiler Alert settings

window.SpoilerAlertJS = {
    question: "Warning! This page contains spoilers for fanfictions on this site, or otherwise important information initially concealed. Are you sure want to see them?",
    yes: 'Yes',
    no: 'No',
    fadeDelay: 625
};


// Signature Check
//------------------
//<nowiki>
// This prevents MediaWiki parsing in JS (e.g. ~~~~ into a signature)

window.i = window.i || 0; //Necessary for SignatureCheck to work
 
window.SignatureCheckJS = {
	preamble: 'Hold up a sec...',
	noSignature: 'Please sign your post with three or four consecutive tilde (~~~ or ~~~~) or, if applicable, your custom signature template. It is important and required that you do so. It makes it easier to find out  who sent the message.',
	noForumHeader: 'There is no forum header on this page. You may not create pages without the header or remove it from existing posts since they will not actually show up in the forum list.',
	epilogue: 'Please correct your message. Proceeding regardless will incur a warning or other action by the admins.',
	forumheader: 'Forumheader',
	checkSignature: true, // Enable the signature check function
        extraNamespaces: [{    // Enable signature checking on other namespaces and subpages can be omitted
                        namespace: 5,
                        patterns: [
                            '/Wiki Discussion',
                            '/Project Discussion',
                            '/Helpdesk',
                            '/Off-Topic',
                            '/Fun and Games',
                            '/Staff Discussion',
                            '/The Idea Corner',
                            '/Questions and Answers'],
                    },{
                        namespace: 9,
                        patterns: ['/Archive'],
                    },{
                        namespace: 11,
                        patterns: ['/Archive'],
                    },{
                        namespace: 13,
                        patterns: ['/Archive'],
                    },{
                        namespace: 15,
                        patterns: ['/Archive']
                    },{
                        namespace: 7,
                        patterns: ['/Archive']
                    }    
 
]};

/* Fixes a bug caused by undoing an edit and leaving no summary if 
"Prompt me when entering a blank edit summary" is checked in one's Preferences */

$(function () {
    if (document.location.search.indexOf("undo=") != 
    -1 && document.getElementsByName('wpAutoSummary')[0]) {
        document.getElementsByName('wpAutoSummary')[0].value='1';
    }
});