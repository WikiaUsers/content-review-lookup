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
 
    if (typeof(window.SpoilerAlert) === 'undefined') {
        window.SpoilerAlert = {
            question: 'Commander! This page contains sneak peeks. Are you sure you ' +
                      'want to enter?',
            yes: 'Yes, please!',
            no: 'No, let it be a surprise',
            isSpoiler: function () {
                return (-1 !== wgCategories.indexOf('Spoiler') &&
                    Boolean($('.spoiler').length));
            }
        };
    }
 
    /* Articles are interwiki links so that other wikis can use them. */
    articles = [
        'u:dev:UserTags/code.js',
        'u:dev:Countdown/code.js',
        'w:dev:WallGreetingButton/code.js',
        'w:c:spottra:MediaWiki:Common.js/Storage.js',
        'w:c:spottra:MediaWiki:Common.js/Numeral.js',
        'w:c:clashofclans:MediaWiki:Common.js/Sliders.js',
        'w:c:clashofclans:MediaWiki:Common.js/ImageHover.js',
        'MediaWiki:Common.js/calc.js',
        'MediaWiki:Common.js/Auto-Fill.js',
        'MediaWiki:Common.js/CalcForms.js',
        'MediaWiki:Common.js/insertusername.js',
        'MediaWiki:Common.js/Lugia.js/Quiz.js',
        'MediaWiki:Common.js/bbTroopInfo.js',
        'MediaWiki:Common.js/EventCountdown.js',
        'MediaWiki:Common.js/Protection.js',
        'MediaWiki:Common.js/LinkedCollapsibleTables.js',
        'MediaWiki:Common.js/Lugia.js',
        'MediaWiki:Common.js/Spottra.js',
        'MediaWiki:Common.js/jsColor.js',
        'MediaWiki:Common.js/NotificationIcon.js',
        'MediaWiki:Common.js/StatueStats.js',
        'MediaWiki:Common.js/StrategyBlogs.js',
        'MediaWiki:Common.js/Fire.js',
        'MediaWiki:Common.js/Highcharts.js',
        'MediaWiki:Common.js/Highcharts-data.js',
        'MediaWiki:Common.js/Highcharts-charts-fromTable.js',
        'MediaWiki:Common.js/Highcharts-charts-DrTerror.js',
        'MediaWiki:Common.js/BlackguardBases.js',
        'MediaWiki:Common.js/SectionSwitcher.js',
		'MediaWiki:Common.js/GemCalculators.js',
		'MediaWiki:Common.js/Experience.js',
		'MediaWiki:Common.js/ModeToggle.js'
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

/* Configurations for WikiActivity: */
window.rwaOptions.limit = 50;
window.rwaOptions.namespaces = [0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829];
window.rwaOptions.autoInit = true;

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

// Add Make an account notice to sidebar if the user is not signed in
$(window).load(function() {
    if (wgUserName === null) {
        $('section#wikia-recent-activity').before('<section class="rail-module" id="sidebarReaderNotice"><h2 class="has-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="18" height="18" viewBox="0 0 43.028 43.028" xml:space="preserve"><g><path d="M39.561,33.971l-0.145,0.174c-4.774,5.728-11.133,8.884-17.902,8.884c-6.77,0-13.128-3.155-17.903-8.884l-0.144-0.174   l0.034-0.223c0.922-6.014,4.064-10.845,8.847-13.606l0.34-0.196l0.271,0.284c2.259,2.37,5.297,3.674,8.554,3.674   s6.295-1.305,8.554-3.674l0.271-0.284l0.34,0.196c4.783,2.761,7.925,7.592,8.848,13.606L39.561,33.971z M21.514,21.489   c5.924,0,10.744-4.82,10.744-10.744C32.258,4.821,27.438,0,21.514,0S10.77,4.821,10.77,10.744S15.59,21.489,21.514,21.489z"></path></g></svg>Remove Advertisements</h2><p>Do you love the wiki but hate advertisements? Creating an account is quick and easy, and it removes advertisements across Fandom!</p></section>');
    }
});


// General Changes
$(document).ready(function() {
    // Change Random Page button to only go to pages in the mainspace
    $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/wiki/Special:Random/main");
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
    // Change header on Category:Strategy Blogs page from "blog posts"
    $('.page-Category_Strategy_Blogs div#mw-blogs h2').text("All Strategy Blogs");
    // Template:HiddenSeries
    $(".HiddenSeriesButton").click(function() {
        $(this).parents(".HiddenSeriesParent").children(".HiddenSeries").show();
        $(this).hide();
    });
    // Community Spotlight modules
    $("#PixelCruxModule a").removeClass("external");
});