/* Any JavaScript here will be loaded for all users on every page load. */

function timeStamp_Common_js() {
  return "2015.02.16 18:06 (UTC-8)";
}

(function ($, mw, store) {
    "use strict";
    var articles;
 
    if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide ' +
                    'JavaScript in MediaWiki:Common.js. Please ' +
                    'remove \'commonjs\' from localStorage to ' +
                    're-enable site-wide JavaScript.');
        return;
    }

    window.UserTagsJS = {
	modules: {},
	tags: {
           heroicuser: { u:'Most Heroic Contributor' }
        }
    };
    UserTagsJS.modules.custom = {};
    UserTagsJS.modules.inactive = 30;
    UserTagsJS.modules.newuser = true;
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
 
    window.SpoilerAlert = {
        question: 'Chief! This page contains sneak peeks. ' +
            'Are you sure you want to enter?',
        yes: 'Yes, please',
        no: 'No, let it be a surprise',
        isSpoiler: function () {
            return (-1 !== wgCategories.indexOf('Spoiler') &&
                Boolean($('.spoiler').length));
        }
    };

    window.SocialMediaButtons = {
        position:    "top",
        colorScheme: "color"
    };

    window.LockForums = {
        expiryDays:    180,
        warningDays:   30,
        ignoreDeletes: true,
        warningPopup:  true,
        banners:       true,
    };

    articles = [
//        'ExtendedNavigation/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:SocialIcons/code.js',
        'u:dev:Countdown/code.js',
//        'u:dev:LockForums/code.js',
        'LockForums/code.js',
        'MediaWiki:Common.js/Usernames.js', // Must come before UserTags
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:TopEditors/code.js',
        'MediaWiki:Common.js/Modernizr.js',
        'MediaWiki:Common.js/Numeral.js',
        'MediaWiki:Common.js/Sliders.js',
        'MediaWiki:Common.js/Quiz.js',
        'u:clashofclans:MediaWiki:Common.js/GemCalculators.js',
        'MediaWiki:Common.js/Experience.js',
        'MediaWiki:Common.js/Version.js',
        'MediaWiki:Common.js/Clashingtools.js',
        'MediaWiki:Common.js/Cookies.js',
        'MediaWiki:Common.js/Storage.js',
        'MediaWiki:Common.js/Tabber2.js',
        'MediaWiki:Common.js/Rateit.js',
        'MediaWiki:Common.js/Clock.js',
        'MediaWiki:Common.js/ImageHover.js',
        'MediaWiki:Common.js/Protection.js',
//        'MediaWiki:Common.js/DrTerror.js',
        'u:clashofclans:MediaWiki:Common.js/TroopInfo.js',
        'u:clashofclans:MediaWiki:Common.js/BuildingInfo.js',
        'MediaWiki:Common.js/bbTroopInfo.js',
        'MediaWiki:Common.js/UnitComparator.js',
        'u:clashofclans:MediaWiki:Common.js/CumulativeCosts.js',
        'MediaWiki:Common.js/ModeToggle.js',
        'MediaWiki:Common.js/AjaxGallery.js',
//        'MediaWiki:Common.js/Chart.js',
        'MediaWiki:Common.js/Test.js',
    ];
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });

    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the following JavaScript files:\n   ', articles.join('\n   '));
}(jQuery, mediaWiki, window.localStorage));
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */

var autoCollapse    = 2;
var collapseCaption = 'hide';
var expandCaption   = 'show';
 
function collapseTable(tableIndex, force) {
    var behavior = 0;

    if (force === 'expand')
        behavior = 1;
    else if (force === 'collapse')
        behavior = -1;

    var Button = document.getElementById('collapseButton' + tableIndex);
    var Table  = document.getElementById('collapsibleTable' + tableIndex);
 
    if (!Table || !Button)
        return false;
 
    var collapsetext = $(Table).attr('data-collapsetext');
    collapsetext     = (collapsetext ? collapsetext : collapseCaption);
    var expandtext   = $(Table).attr('data-expandtext');
    expandtext       = (expandtext ? expandtext : expandCaption);

    var Rows = Table.rows;
 
    if (Button.firstChild.data === collapsetext || behavior === -1) {
        for (var i = 1; i < Rows.length; i ++)
            Rows[i].style.display = 'none';

        Button.firstChild.data = expandtext;
        force = 'collapse';
    }
    else {
        for (var i = 1; i < Rows.length; i ++)
            Rows[i].style.display = Rows[0].style.display;

        Button.firstChild.data = collapsetext;
        force = 'expand';
    }

    // If we've been forced, stop right here
    if (arguments.length > 1)
        return false;

    // If this table has a data-name, find other tables with the same name and expand/collapse them too
    if (Table.getAttribute('data-name').length < 1)
        return false;

    var Tables = document.getElementsByTagName('table');

    for (var i = 0; i < Tables.length; i ++) {
        // Make sure to ignore this table (we've already handled it)
        if (Tables[i].hasClassName('collapsible') &&
            Tables[i].id !== 'collapsibleTable' + tableIndex &&
            Tables[i].getAttribute('data-name') === Table.getAttribute('data-name'))
            collapseTable(Tables[i].id.substr(16), force);
    }
}

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( 'table' );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], 'collapsible' ) ) {
            /* only add button and increment count if there is a header
               row to work with */
            var HeaderRow = Tables[i].getElementsByTagName('tr')[0];

            if (!HeaderRow)
                continue;

            var Header = HeaderRow.getElementsByTagName( 'th' )[0];

            if (!Header)
                continue;
 
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute('id', 'collapsibleTable' + tableIndex);
 
            var collapsetext = $(Tables[i]).attr('data-collapsetext');
            var Button       = document.createElement('span');
            var ButtonLink   = document.createElement('a');
            var ButtonText   = document.createTextNode((collapsetext ? collapsetext : collapseCaption));
 
            // Styles are declared in [[MediaWiki:Common.css]]
            Button.className = 'collapseButton mw-collapsible-toggle';
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute('id', 'collapseButton' + tableIndex);
            ButtonLink.setAttribute('href',
                "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild(document.createTextNode('['));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode(']'));
 
            HeaderRow.lastChild.insertBefore(Button, HeaderRow.lastChild.childNodes[0]);
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
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 *
 * Element.prototypes added based on code by Om Shankar via StackOverflow.
 */
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] :
            (reCache[className] = new RegExp( "(?:\\s|^)" + className +
            "(?:\\s|$)"))).test(element.className);
        };
})();

Element.prototype.hasClassName = function(name) {
    return hasClass(this, name);
};

Element.prototype.addClassName = function(name) {
    if (!this.hasClassName(name)) {
        this.className = this.className ? [this.className, name].join(' ') : name;
    }
};

Element.prototype.removeClassName = function(name) {
    if (this.hasClassName(name)) {
        var c = this.className;
        this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "").trim();
    }
};

/* For internal compatibility -- older defined method, now uses new method */
function hasClassTest(element, className) {
   return hasClass(element, className);
}