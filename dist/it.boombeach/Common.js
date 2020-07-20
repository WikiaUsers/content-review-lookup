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
        chatmoderator: ['sysop', 'bureaucrat', 'rollback', 'threadmoderator'],
        rollback:      ['sysop', 'bureaucrat']
    };
    
    // Imports
    /* Articles are interwiki links so that other wikis can use them. */
    articles = [
        'u:dev:UserTags/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:Countdown/code.js',
        'w:dev:WallGreetingButton/code.js',
        'w:c:dev:TopEditors/code.js',
        'w:c:spottra:MediaWiki:Common.js/Storage.js',
        'w:c:spottra:MediaWiki:Common.js/Numeral.js',
        'w:c:clashofclans:MediaWiki:Common.js/Sliders.js',
        'w:c:clashofclans:MediaWiki:Common.js/ImageHover.js',
        'w:c:boombeach:MediaWiki:Common.js/calc.js',
        'w:c:boombeach:MediaWiki:Common.js/Auto-Fill.js',
        'w:c:boombeach:MediaWiki:Common.js/CalcForms.js',
        'w:c:boombeach:MediaWiki:Common.js/insertusername.js',
        'w:c:boombeach:MediaWiki:Common.js/Lugia.js/Quiz.js',
        'w:c:boombeach:MediaWiki:Common.js/bbTroopInfo.js',
        'w:c:boombeach:MediaWiki:Common.js/EventCountdown.js',
        'w:c:boombeach:MediaWiki:Common.js/Protection.js',
        'w:c:boombeach:MediaWiki:Common.js/LinkedCollapsibleTables.js',
        'w:c:boombeach:MediaWiki:Common.js/Lugia.js',
        'w:c:boombeach:MediaWiki:Common.js/Spottra.js',
        'w:c:boombeach:MediaWiki:Common.js/jsColor.js',
        'w:c:boombeach:MediaWiki:Common.js/NotificationIcon.js',
        'w:c:boombeach:MediaWiki:Common.js/StatueStats.js',
        'w:c:boombeach:MediaWiki:Common.js/StrategyBlogs.js',
        'w:c:boombeach:MediaWiki:Common.js/Fire.js',
        'w:c:boombeach:MediaWiki:Common.js/Highcharts.js',
        'w:c:boombeach:MediaWiki:Common.js/Highcharts-data.js',
        'w:c:boombeach:MediaWiki:Common.js/Highcharts-charts-fromTable.js',
        'w:c:boombeach:MediaWiki:Common.js/Highcharts-charts-DrTerror.js',
        'w:c:boombeach:MediaWiki:Common.js/BlackguardBases.js',
        'w:c:boombeach:MediaWiki:Common.js/SectionSwitcher.js'
    ];

    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });

    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the following JavaScript files:\n   ' +
        articles.join('\n   '));
}(jQuery, mediaWiki, window.localStorage));

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

/* Use this function to round a number or result of an equation to a 
certain digit. */
function roundNum(digit, num) {
    return Math.round((num) * Math.pow(10, digit)) * Math.pow(10, -digit);
}

/* Use this function to find the sum of two values. It is used in 
the function, arrayAverage, below. */
function addNums(addValueA, addValueB) {
    return addValueA + addValueB;
}

/* Use this function to find the average of the numbers in an array. */
function arrayAverage(array) {
    return array.reduce(addNums, 0) / array.length;
}

// Find the max level of a troop
function findMaxTroopLevel(unit) {
    var troopIdArray = ["Rifleman", "Heavy", "Zooka", "Warrior", "Tank", "Medic", "Grenadier", "Scorcher"];
    var maxTroopLevelArray = [22, 22, 21, 20, 17, 13, 12, 9];
    return maxTroopLevelArray[troopIdArray.indexOf(unit)];
}

// Find the size of a troop
function findTroopSize(unit) {
    var troopIdArray = ["Rifleman", "Heavy", "Zooka", "Warrior", "Tank", "Medic", "Grenadier", "Scorcher"];
    var troopSizeArray = [1, 4, 2, 3, 8, 5, 6, 21];
    return troopSizeArray[troopIdArray.indexOf(unit)];
}

// Find the max level of a building
function findMaxBuildingLevel(unit) {
    var buildingIdArray = ["Headquarters", "Outpost", "Power Core", "Sniper Tower", "Machine Gun", "Mortar", "Cannon", "Flamethrower", "Boom Cannon", "Rocket Launcher", "Shock Launcher", "MMG 9000", "Super Mortar 3000", "Lazor Beam", "Doom Cannon", "Shock Blaster", "Damage Amplifier", "Shield Generator", "Grappler", "Hot Pot"];
    var maxBuildingLevelArray = [22, 22, 1, 22, 22, 22, 22, 19, 16, 14, 10, 5, 4, 3, 3, 3, 3, 3, 3, 3];
    return maxBuildingLevelArray[buildingIdArray.indexOf(unit)];
}

// Add Twitter timeline to sidebar
/*
$(window).load(function() {
     $('.ChatModule').after('<section class="module" id="twittermodule"><a class="twitter-timeline" href="https://twitter.com/BoomBeachWikia" data-widget-id="647162956317392896" data-chrome="transparent">Tweets by @BoomBeachWikia</a></section>');
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
});
*/


// General Changes
$(document).ready(function() {
    // Move category gallery form to page header bar
    $('div.category-gallery-form').css({'display': 'inline', 'float': 'right'}).appendTo('header#WikiaPageHeader');
    // Change Random Page button text and to only go to pages in the mainspace
    $('ul.nav li.subnav-2-item a[data-canonical=random], ul.tools li a[data-name=random]').attr("href", "/wiki/Special:Random/main");
    // Click the notification icon to reveal hidden banners (Template:Notification)
    $('#Reveal-Trigger').click(function() {
        $('.Revealable').slideToggle("slow");
    });
    // Click element with this class to bring up an alert with the element's title attribute's contents (Template:Help)
    $(".titleAlert").click(function() {
        alert($(this).attr("title"));
    });
    // Template:CollapsibleContent
    $("table.collapsing-table tr.collapsing-table-trigger td").click(function() {
        $(this).parent("tr").siblings("tr").children("td").fadeToggle(600);
        $(this).children("p.collapsing-table-trigger-messages").children("span.collapsing-table-trigger-text").toggleClass("collapsing-table-trigger-text-hidden");
    });
    // Template:HiddenSeries
    $(".HiddenSeriesButton").click(function() {
        $(this).parents(".HiddenSeriesParent").children(".HiddenSeries").show();
        $(this).hide();
    });
});