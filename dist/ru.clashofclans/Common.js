/* Any JavaScript here will be loaded for all users on every page load. */

    window.LockForums = {
        expiryDays:    90,  // Number of days until forum is locked to new replies
        expiryMessage: 'Forums are automatically locked when the most recent post is older than <expiryDays> days.',
        warningDays:   14,   // Number of days until a warning is given to potential replies
        ignoreDeletes: true, // Ignore deleted messages when calculating age of last post
        warningPopup:  true, // Pop up a warning dialog that must be confirmed for posts on older forums
        banners:       true, // Add a banner to the top of aged forums
    };

importScript("MediaWiki:Common.js/Usernames.js");
importScript("MediaWiki:Common.js/ModeToggle.js");

// Rail WAM
window.railWAM = {
    logPage:"Project:WAM Log",
    lang: 'ru',
    
};

// Change Random Page button to only go to pages in the mainspace
    $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/ru/wiki/Special:Random/main");

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *  http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
var autoCollapse    = 2;
var collapseCaption = 'hide';
var expandCaption   = 'show';
 
function collapseTable(tableIndex) {
   var Button = document.getElementById('collapseButton'   + tableIndex);
   var Table  = document.getElementById('collapsibleTable' + tableIndex);
 
   if (!Table || !Button)
      return false;
 
   var Rows = Table.rows;
 
   if (Button.firstChild.data == collapseCaption) {
      for (var i = 1; i < Rows.length; i ++)
         Rows[i].style.display = 'none';

      Button.firstChild.data = expandCaption;
   }
   else {
      for (var i = 1; i < Rows.length; i ++)
         Rows[i].style.display = Rows[0].style.display;

      Button.firstChild.data = collapseCaption;
   }
}
 
function createCollapseButtons() {
   var tableIndex      = 0;
   var NavigationBoxes = new Object();
   var Tables          = document.getElementsByTagName('table');
 
   for (var i = 0; i < Tables.length; i ++) {
      if (hasClass(Tables[i], 'collapsible')) {
         /* only add button and increment count if there is a header row
            to work with */
         var HeaderRow = Tables[i].getElementsByTagName('tr')[0];

         if (!HeaderRow)
            continue;

         var Header = HeaderRow.getElementsByTagName('th')[0];

         if (!Header)
            continue;

         NavigationBoxes[tableIndex] = Tables[i];
         Tables[i].setAttribute('id', 'collapsibleTable' + tableIndex);
 
         var Button     = document.createElement('span');
         var ButtonLink = document.createElement('a');
         var ButtonText = document.createTextNode(collapseCaption);
 
         // Styles are declared in [[MediaWiki:Common.css]]
         Button.className = 'collapseButton';
 
         ButtonLink.style.color = Header.style.color;
         ButtonLink.setAttribute('id', 'collapseButton' + tableIndex);
         ButtonLink.setAttribute('href',
            "javascript:collapseTable(" + tableIndex + ");" );
         ButtonLink.appendChild(ButtonText);
 
         Button.appendChild(document.createTextNode('['));
         Button.appendChild(ButtonLink);
         Button.appendChild(document.createTextNode(']'));
 
         Header.insertBefore(Button, Header.childNodes[0]);
         tableIndex ++;
      }
   }
 
   for (var i = 0; i < tableIndex; i ++) {
      if (hasClass(NavigationBoxes[i], 'collapsed') ||
         (tableIndex >= autoCollapse &&
          hasClass(NavigationBoxes[i], 'autocollapse')))
         collapseTable(i);
      else if (hasClass(NavigationBoxes[i], 'innercollapse')) {
         var element = NavigationBoxes[i];

         while (element = element.parentNode) {
            if (hasClass(element, 'outercollapse')) {
               collapseTable(i);
               break;
            }
         }
      }
   }
}

addOnloadHook(createCollapseButtons);
 
/** Test if an element has a certain class ********************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function() {
   var reCache = {};
   return function(element, className) {
      return ( reCache[className] ? reCache[className] :
         (reCache[className] = new RegExp( "(?:\\s|^)" + className +
         "(?:\\s|$)" ) ) ).test(element.className);
   };
})();

function hasClassTest(element, className) {
   // No reason to have two functions that do the same thing
   // return element.className.indexOf(className) != -1;
   return hasClass(element, className);
}