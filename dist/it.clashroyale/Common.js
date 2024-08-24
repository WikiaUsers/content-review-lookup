/* Any JavaScript here will be loaded for all users on every page load. */
 
// UserTags
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
 
 
/* Articles are interwiki links so that other wikis can use them. */
articles = [
    'u:spottra:MediaWiki:Common.js/Storage.js',
    'u:spottra:MediaWiki:Common.js/Numeral.js',
    'Common.js/CardPriceCalc.js',
    'Common.js/Effetti.js',
    'u:dev:Countdown/code.js',
    'u:dev:ExtendedNavigation/code.js',
    'u:dev:TopEditors/code.js',
    'u:dev:UserTags/code.js',
    'u:clashofclans:MediaWiki:Common.js/Sliders.js',
    'u:boombeach:MediaWiki:Common.js/calc.js',
    'u:boombeach:MediaWiki:Common.js/insertusername.js',
    'u:boombeach:MediaWiki:Common.js/Protection.js',
    'u:boombeach:MediaWiki:Common.js/jsColor.js',
    'u:boombeach:MediaWiki:Common.js/NotificationIcon.js',
    'u:boombeach:MediaWiki:Common.js/Fire.js',
    'u:boombeach:MediaWiki:Common.js/Highcharts.js',
    'u:boombeach:MediaWiki:Common.js/Highcharts-data.js',
    'u:boombeach:MediaWiki:Common.js/Highcharts-charts-fromTable.js'
];
 
// Use Wikia's importArticles() function to load JavaScript files
importArticles({
    type: 'script',
    articles: articles
});
 
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
/* This version cannot round to a digit before the decimal, but it
always rounds without a small left-over */
function round(digit, num) {
    return Number(Math.round(num+'e'+digit)+'e-'+digit);
}
 
// Add Make an account notice to sidebar if the user is not signed in
$(window).load(function() {
    if (wgUserName === null) {
        $('section#WikiaRecentActivity').before('<section class="module" id="sidebarReaderNotice"><h2>Hey, Readers!</h2><p>Do you like the wiki but hate advertisements? <a href="http://clashroyale.wikia.com/wiki/Special:UserSignup">Creating an account</a> is quick and easy, and it removes advertisements across Wikia!</p></section>');
    }
});
 
 
// General Changes
$(document).ready(function() {
    // Move category gallery form to page header bar
    $('div.category-gallery-form').css({'display': 'inline', 'float': 'right'}).appendTo('header#WikiaPageHeader');
    // Move CoCLink (template) to page header bar
    $('#CoCLink').appendTo('header#WikiaPageHeader');
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
    $(this).siblings(".HiddenSeries").show();
        $(this).hide();
    });
});

// Pulsante per tornare a inizio pagina
function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Torna a inizio pagina</a></li>')
};
addOnloadHook(ToTop);

// Visibilità IP per gestione
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};