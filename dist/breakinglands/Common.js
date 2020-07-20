/* Any JavaScript here will be loaded for all users on every page load. */
 
(function ($, mw, store) {
    "use strict";
    var articles;
 
    if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide JavaScript ' +
                    'in MediaWiki:Common.js. Please remove \'commonjs\' ' +
                    'from localStorage to re-enable site-wide JavaScript.');
        return;
    }
 
    window.UserTagsJS = {
	modules: {},
	tags:    {}
    };

    UserTagsJS.modules.inactive      = 30;
    UserTagsJS.modules.newuser       = true;
    UserTagsJS.modules.autoconfirmed = true;
 
    UserTagsJS.modules.mwGroups = [
        'bureaucrat',
        'chatmoderator',
        'patroller',
        'rollback',
        'sysop',
        'bannedfromchat',
        'bot',
        'bot-global',
    ];

    UserTagsJS.modules.metafilter = {
	sysop:         ['bureaucrat', 'founder'],
	bureaucrat:    ['founder'],
	chatmoderator: ['sysop', 'bureaucrat'],
        rollback:      ['sysop', 'bureaucrat']
    };
 
    if (typeof(window.SpoilerAlert) === 'undefined') {
        window.SpoilerAlert = {
            question: 'Chief! This page contains sneak peeks. Are you sure you ' +
                      'want to enter?',
            yes: 'Yes, please',
            no: 'No, let it be a surprise',
            isSpoiler: function () {
                return (-1 !== wgCategories.indexOf('Spoiler') &&
                    Boolean($('.spoiler').length));
            }
        };
    }

    /* Articles are interwiki links so that other wikis can use them. */
    articles = [
        'u:dev:Countdown/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'w:c:clashofclans:MediaWiki:Common.js/Sliders.js',
        'w:c:clashofclans:MediaWiki:Common.js/GemCalculators.js',
        'w:c:clashofclans:MediaWiki:Common.js/Experience.js',
        'w:c:clashofclans:MediaWiki:Common.js/Usernames.js',
        'w:c:clashofclans:MediaWiki:Common.js/TroopInfo.js',
        'w:c:clashofclans:MediaWiki:Common.js/BuildingInfo.js',
        'w:c:clashofclans:MediaWiki:Common.js/Tabber2.js',
        'w:c:clashofclans:MediaWiki:Common.js/ImageHover.js',
        'w:c:clashofclans:MediaWiki:Common.js/GorillaMan.js',
        'w:c:clashofclans:MediaWiki:Common.js/Lugia.js',
    ];
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });
    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the ' +
                'following JavaScript files:\n   ' + articles.join('\n   '));
}(jQuery, mediaWiki, window.localStorage));

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