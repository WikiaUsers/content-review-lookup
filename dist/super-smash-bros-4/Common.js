/* Credited to Mario Kart Racing Wiki */
$('table.collapsible').each(function(e) {
  var $t = $(this);
  var $th = $t.find('th');
  var hs = ($t.hasClass('collapsed')) ? 'show' : 'hide';
  $th.append("<span class=\"collapseLink\">[<a href=\"#\">" + hs + "</a>]</span>");
  if($t.hasClass('collapsed')) {
    $t.find('td').parent().hide();
    }
  });
 
$('.collapseLink > a').click(function(e) {
  e.preventDefault();
  collapseTable($(this));
  });
 
collapseTable = function (e) {
  $t = e.closest('table');
  $elems = $t.find('td').parent();
  if($t.hasClass('collapsed')) {
    $elems.show('fast');
    $t.removeClass('collapsed');
    e.html('hide');
    } else {
    $elems.hide('fast');
    $t.addClass('collapsed');
    e.html('show');
    }
  };
 
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
 
 /** Dynamic Navigation Bars (experimental) 
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
 
/** Archive Tool (experimental) **/

var archiveListTemplate = 'Archive'; 
importScriptPage('ArchiveTool/code.js', 'dev');
 
/*** AJAX Auto-refresh on wiki activity ****************************/
 
window.ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
window.ajaxRefresh = 60000;
window.refreshText = 'Automatically refresh this page';
window.refreshHover = 'Enable auto-refreshing page loads';
window.ajaxPages = new Array(
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Log',
    'Special:Images',
    'Special:Contributions',
    'Special:Watchlist',
    'Special:RecentChangesLinked'
);

importScriptPage("MediaWiki:AjaxRC/code.js", "dev");
 
 
//**Disable blog comments for blogs that haven't been commented on for more than 30 days.**//

window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog hasn\'t been commented on in over <expiryDays> days --" + 
                    " adding any commentary is pointless, so the blog has been archived.",
    nonexpiryCategory: "Never archived blogs"
};
 
//**DisableArchiveEdit of talk pages**//
importScriptPage('DisableArchiveEdit/code.js', 'dev');
 
//**Go Button**//
importScriptPage('SearchButtonV2/code.js', 'dev');
 
// *********************************************
// Standard edit summaries in drop-down menu
// *********************************************

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
          'Signing guestbook', // For users with guestbooks on their userpages
          'Created page'
        ]
    ]
};
 
// *********************************************
// Fixing static GIF thumbnails
// *********************************************
 
window.dev = window.dev || {};
window.dev.DynamicImages = {
	svgGallery: true,
	svgLightbox: true,
	svgIncreaseSrc: 1
}
 
importArticles({
	type: "script",
	articles: [
		"u:dev:DynamicImages/code.js"
	]
});

//=======================================================
// Adds a Block button to button dropdown on messages
// Author: Sophiedp
//=======================================================
 
if (wgNamespaceNumber === Number(1201) && !!wgUserGroups.includes("sysop")) {
    for (var i in $('.msg-toolbar')) {
        var user = $('.msg-toolbar:eq('+i+')')
            .parent()
            .find('.edited-by a')
            .text();
        $('.msg-toolbar:eq('+i+')').find('.WikiaMenuElement li')
            .last().before(
                '<li><a href="/wiki/Special:Block/' + user + '">Block</a></li>'
        );
}}

//=====================================================================
// Adds separate list of uncreated categories on Special:Categories.
//=====================================================================
 
window.ajaxCallAgain = window.ajaxCallAgain || Array();
window.ajaxCallAgain.push(function() {
    if (wgPageName === "Special:Categories") {
    var $newCats =  $('<div>')
            .css('float', 'right')
            .text('Uncreated categories:')
            .attr('id', 'EmptyCats');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li')
        .has('.newcategory')
        .clone()
        .appendTo($newCatsList);}
});
 
//============================================
// Adds a button to clear Deletion reasons
//============================================
 
if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason')
        .after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function() {$('#wpReason').val('').focus();});
}