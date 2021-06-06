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
	
	/* Articles are interwiki links so that other wikis can use them. */
    importArticles({
        type: 'script',
        articles: [
        'w:c:spottra:MediaWiki:Common.js/Numeral.js', // Defines num.format('<fmt>')
        'w:c:spottra:MediaWiki:Common.js/AjaxGallery.js',
        'u:dev:Countdown/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:UserTags/code.js',
        'MediaWiki:Common.js/RGBColor.js',
        'MediaWiki:Common.js/Usernames.js',
        'MediaWiki:Common.js/Sliders.js',
        'MediaWiki:Common.js/GemCalculators.js',
        'MediaWiki:Common.js/Experience.js',
        'MediaWiki:Common.js/Tabber2.js',
        'MediaWiki:Common.js/ImageHover.js',
        'MediaWiki:Common.js/CumulativeCosts.js',
        'MediaWiki:Common.js/ModeToggle.js',
        'MediaWiki:Common.js/PageVerify.js',
        'MediaWiki:Common.js/GorillaMan.js',
        'MediaWiki:Common.js/Lugia.js',
        'MediaWiki:Common.js/BadgeGenerator.js',
        'MediaWiki:Common.js/Protection.js',
        'MediaWiki:Common.js/AvailableBuildings.js',
        'MediaWiki:Common.js/GoldPass.js',
        'MediaWiki:Common.js/HeroSkins.js',
        'MediaWiki:Common.js/Toggle.js'
    	]
    });
	
	/*Remove Edit Wall Greeting button unless it's your own or if you're staff*/
	$(function() {
		var config = mw.config.get([
	   'wgCanonicalNamespace',
	   'wgUserName',
	   'wgTitle',
	   'wgUserGroups'
		]);
		if (config.wgCanonicalNamespace == "Message_Wall" && config.wgTitle != config.wgUserName && !config.wgUserGroups.includes("sysop", "bureaucrat", "content-moderator", "threadmoderator", "rollback")) {
		    var interval = setInterval(function() {
				if ($('.MessageWallButtons').length) {
		   			clearInterval(interval);
					$(this).remove();
				}
			}, 10);
	    }
	});

    // Customize tags on user profiles
    window.UserTagsJS = {
        modules: {},
        tags: {
            heroicuser:  { u: 'Most Heroic Contributor' },
            imageeditor: { u: 'Image Editor' },
            sysop: { u: 'Administrator' },
        	threadmoderator: { u: 'Discussions Moderator' },
            retiredstaff: { u: 'Retired Staff', title: 'This former staff member is inactive.' },
            inactive: { u: 'Retired Clasher', title: 'This user is inactive.' }
        }
    };
    
    UserTagsJS.modules.inactive      = 30;
    UserTagsJS.modules.newuser       = true;
    UserTagsJS.modules.autoconfirmed = true;
    UserTagsJS.modules.mwGroups = [
        'bureaucrat',
        'sysop',
        'content-moderator',
        'threadmoderator',
        'rollback',
        'bot',
        'bot-global',
        'blocked', 
        'checkuser',
        'council',
        'helper',
        'staff',
        'vanguard',
        'soap',
    ];
    
    UserTagsJS.modules.metafilter = {
        sysop:           ['bureaucrat'],
        'content-moderator': ['bureaucrat', 'sysop'],
        threadmoderator: ['bureaucrat', 'sysop'],
        rollback:        ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator'],
        inactive:        ['retiredstaff']
    };
    
    UserTagsJS.modules.custom = {
        'FaceBound': ['imageeditor', 'retiredstaff'],
        
        'Tonkaty': ['retiredstaff'],
        'GorillaMan': ['retiredstaff'],
        'Spottra': ['retiredstaff'],
        'Badw0lf007': ['retiredstaff'],
        'BlazedDragon': ['retiredstaff'],
        'Dahimi': ['retiredstaff'],
        'DarkDracolth': ['retiredstaff'],
        'ElementalChaos': ['retiredstaff'],
        'Eurus Allen': ['retiredstaff'],
        'Infinity323': ['retiredstaff'],
        'Japster': ['retiredstaff'],
        'Jeager117': ['retiredstaff'],
        'Kk9199': ['retiredstaff'],
        'Lugia101101': ['retiredstaff'],
        'Misso5': ['retiredstaff'],
        'Misssupersal': ['retiredstaff'],
        'Moseezator': ['retiredstaff'],
        'O8el1x': ['retiredstaff'],
        'Spirits of nature': ['retiredstaff'],
        'Stan890': ['retiredstaff'],
        'SynergyShade3624': ['retiredstaff'],
        'Tparry': ['retiredstaff'],
        'Utkar22': ['retiredstaff'],
		'WitchHealer': ['retiredstaff'],
		'Zazme Yakuza': ['retiredstaff'],
        'Zegaloft12': ['retiredstaff'],
        '2442cc': ['retiredstaff'],
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
    
    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the ' +
                'following JavaScript files:\n   ' + articles.join('\n   '));

}(jQuery, mediaWiki, window.localStorage));


$(document).ready(function() {

    // Change Random Page button to only go to pages in the mainspace
    $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/wiki/Special:Random/main");

    // Clash Royale and Brawl Stars topic interwiki links
	$("#ClashRoyaleLink, #BrawlStarsLink").prependTo(".page-header__languages, .page-header__contribution > div:first-child").css({"display": "inline-block"});
});


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