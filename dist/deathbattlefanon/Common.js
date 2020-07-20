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

////////////////////////////////////////////////////////////////////////////////
///////////////// START CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS ///////////
////////////////////////////////////////////////////////////////////////////////

//======================================================================
// Adds separate list of uncreated categories on Special:Categories.
//======================================================================

function unCats() {
    var $newCats = $('<div>').css('float', 'right').text('Uncreated categories:');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li').has('.newcategory').clone().appendTo($newCatsList);
} 
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Categories') {
    unCats();
    mw.hook('wikipage.content').add(unCats);
}

//====================================================
// Adds a button to clear Deletion reasons
//====================================================

if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();
    });
}

////////////////////////////////////////////////////////////////////////////////
///////////////// END CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS /////////////
////////////////////////////////////////////////////////////////////////////////

//===================================================
// Test if an element has a certain class.
// Increases general performance.
//===================================================

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

//==============================================================================
// Collapsible tables; allows tables to be collapsed, showing only the header.
// See [[Wikipedia:NavFrame]]. Taken from Wikipedia's Common.js.
//==============================================================================

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
 
//=====================================================
// Dynamic Navigation Bars
// Description: See [[Wikipedia:NavFrame]].
// Taken from Wikipedia's Common.js.
//=====================================================

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

//========================
// AJAX Auto-Refresh
//========================

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
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/b/ba/Snake_throbber_dark-bg.gif/revision/latest?cb=20140519203615';

//========================================================================
// Allows text to be hidden in other text and revealed with a click
//========================================================================

$(".container").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});

/*******************************************************************************             
 * Import scripts for specific usergroups only 
*******************************************************************************/



// Import scripts if user has one of the following ranks:
/* Rollback, Content Moderator, Admin, Bureaucrat, Content Volunteer,
VSTF, FANDOM Helper, FANDOM Staff */
/* For more info on those groups; refer to 
https://community.wikia.com/wiki/Help%3AUser_rights */

if(wgUserGroups.includes('rollback') || 
   wgUserGroups.includes('content-moderator') ||
   wgUserGroups.includes('sysop') ||
   wgUserGroups.includes('bureaucrat') ||
   wgUserGroups.includes('content-volunteer') ||
   wgUserGroups.includes('vstf') ||
   wgUserGroups.includes('helper') ||
   wgUserGroups.includes('staff')){
      importArticles({
            type: 'script',
            articles: [
            'u:dev:MediaWiki:AjaxUndo/code.js',
            'u:dev:MediaWiki:AjaxRename/code.js'
        ]
    });
}

// Mass Categorization

window.MassCategorizationGroups = [
    'bot',
    'bureaucrat', 
    'content-moderator', 
    'rollback',
    'sysop'
];
 
window.massCategorizationDelay = 2500; // 2.5 second interval

// Mass Rename Revert

window.MassRenameRevertGroups = [
    'bureaucrat', 
    'content-moderator', 
    'rollback',
    'sysop'
];

/*******************************************************************************             
 * End usergroup-specific scripts 
*******************************************************************************/

// -------------------------------------------
// Disable YouTube Player's autoplay feature
// -------------------------------------------

window.YoutubePlayerDisableAutoplay = true;