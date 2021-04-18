/* Any JavaScript here will be loaded for all users on every page load. */

// AjaxRC
window.ajaxSpecialPages = ["RecentChanges", "Log", "NewFiles", "Contributions", "AbuseLog"];
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Auto-refresh',
    'ajaxrc-refresh-hover': 'Enable page auto-refresh',
}}}}});

// AjaxBatchDelete
window.batchDeleteDelay = 1000;

// ArticleRating
window.ArticleRating = {
    title: 'Sweet Rating',
    values: ['Sweet', 'Tasty', 'Delicious', 'Divine', 'Sugar Stars'],
    starSize: [24, 24],
    starColor: ['#ccc', '#08f7ff'],
    exclude: ['Candy Crush Saga/Versions'],
    starStroke: '#000'
};

// BackToTopButton default settings
window.BackToTopSpeed = 600;
window.BackToTopStart = 800;

// Timer
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
 
    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }
 
    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
    }
    var tpm = ' ';
 
    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;
 
    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
$(function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (i in countdowns) countdowns[i].style.display = 'inline';
 
    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});
 
/* Add extra classes based on category
 * @author: UltimateSupreme (https://c.wikia.com/wiki/User:UltimateSupreme)
 */
(function ($, mw) {
    function categorycheck() {
        if ($(this).text() === ("Dreamworld levels" || "Dreamworld")) {
            $(".wikia-infobox").addClass("dreamworld");
            mw.log("Category found!");
            return;
        }
    }
    if (mw.config.get("skin") === "oasis") {
        $("li.category > span.name > a").each(categorycheck);
    } else {
        $(".mw-normal-catlinks a").each(categorycheck);
    }
}(jQuery, mediaWiki));
 
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */


/* Imports that never affect Oasis Skin (Only monobook skins) */
$(function () {
    if (skin === 'oasis' || skin === 'wikia' ) {
        /* Nothing to import */}
    else {
    importArticles({
    type: 'script',
    articles: [
        'u:dev:LastEdited/code.js'
    ]
});
    }
});