/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
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
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
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
                 NavChild != null;
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
                 NavChild != null;
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
             NavFrame = divs[i]; 
             i++
         ) {
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
                  NavChild != null;
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

/* </pre> */

/* Popups */
importScriptPage('User:Mroosa/js/Popups.js', 'counterstrike');

/* Chat Tags */
importScriptPage('ChatTags/code.js', 'dev');
 
/* External Image Loader */
importScriptPage('ExternalImageLoader/code.js', 'dev');

/* Automatic signature */
importScriptPage('Sine/code.js', 'dev');
 
/* Voice Dictation */
importScriptPage('Voice_Dictation/voice.js', 'dev');
 
/* Search Suggest */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});
 
/* Timed Slider */
importArticles({
    type: 'script',
    articles: [
        'u:dev:TimedSlider/code.js'
    ]
});
 
/* Chat Options */
importScriptPage('ChatOptions/code.js', 'dev');
 
/* Code */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Code/code.js'
    ]
});
 
/* Visual Spell Check */
importScriptPage('VisualSpellCheck/code.js','dev');
 
/* Floating TOC */
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js'
    ]
});
 
/* Reveal Anonymous IP */
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

 
/* Auto-Refresh for Wiki Activity */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
 
/* Back to top button */
importScriptPage('BackToTopButton/code.js', 'dev');
 
/* Spoilers */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
/* Admin List */
importScriptPage('ListAdmins/code.js', 'dev');

/* Allow external image linking */
importScriptPage('ExternalImageLoader/code.js', 'dev');
 
/* Collapsible Tables */
importScriptPage('ShowHide/code.js', 'dev');
 
/* Collapsible Infobox */
importScriptPage('CollapsibleInfobox/code.js', 'dev'); 
 
/* Clock */
importScriptPage('DisplayClock/code.js', 'dev');
 
/* Adds Purge button */
var PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');
 
/* Lists of Duplicate images */
importScriptPage('DupImageList/code.js', 'dev');
 
/* Top Contributor */
importArticles({
    type: 'script',
    articles: [
        'w:dev:TopEditors/code.js'
    ]
});

/* User Tags */
// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 90,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: false,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
tags: {		}
};

UserTagsJS.modules.custom = {
	'ConTraZ VII': ['sysop'],
	'Irv1n3': ['sysop', 'bureaucrat'],
	'Mroosa': ['sysop'],
	'TheNeXusCore': ['sysop', 'bureaucrat'],
	'Yong_feng': ['sysop', 'bureaucrat'],
	'HEADSHOTDEALER': ['sysop'],
};

UserTagsJS.modules.userfilter = {
};

UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

window.MessageWallUserTags = {
    tagColor: '#000000',
    users: {
        'username': 'usergroup',
        'Mroosa': 'Admin',
        'ConTraZ_VII': 'Admin',
        'Irv1n3': 'Inactive Bureaucrat',
        'TheNeXusCore': 'Bureaucrat',
        'Yong_feng': 'Bureaucrat',
        'Wuzh': 'Bureaucrat',
        'Elite_Abyssal': 'Bureaucrat',
        'GameZone1': 'Admin',
        'HEADSHOTDEALER': 'Admin',
    }
};

importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});


importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});
 
//Auto Message Blocked
var MessageBlock = {
  title : 'Block.',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : false
};

importArticles({
	type: "script",
	articles: [
		"u:dev:DynamicImages/code.js"
	]
});

importScriptPage('CleanWantedFiles/code.js', 'dev');