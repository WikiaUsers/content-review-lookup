/* Any JavaScript here will be loaded for all users on every page load. */

/* Style sheet import now via MediaWiki:Wikia.css
if (skin == "oasis") {
    importArticles({
        type: "style",
        articles: [
            "MediaWiki:OasisCustomColors.css",
            "MediaWiki:StaffHighlight.css", ]
    });
};
*/

importArticles({
    type: "script",
    articles: [
        "w:dev:Countdown/code.js", /* Countdown clock */
        "w:dev:DisableArchiveEdit/code.js", /* Discourage/disable the editing of talk page archives */
        "w:dev:PurgeButton/code.js", /* Add "purge" option to page controls */
        "w:dev:ShowHide/code.js", /* Collapsible elements and tables */
        "MediaWiki:Common.js/addnavlinks.js", /* Add "about us" and IRC links to "On the Wiki" menu */
        "MediaWiki:Common.js/appendhead.js", /* Append elements into the head section of the page */
        "MediaWiki:Common.js/customizeforums.js", /* Wikia forum feature changes (possibly more to come) */
        "MediaWiki:Common.js/disablecomments.js", /* Disable comments for specified pages at discretion */
        "MediaWiki:Common.js/disablecommentsblogs.js", /* Disable blog comments on old blog posts */
        "MediaWiki:Common.js/disableforumedit.js", /* Discourage/disable the editing of forum archives */
        "MediaWiki:Common.js/displaytitle.js", /* Ability to change full page title */
        "MediaWiki:Common.js/fanonmodule.js", /* Create WikiaRail element to advertise the fanon portal */
        "MediaWiki:Common.js/filluploadform.js", /* Fills the summary field in upload form with imagebox */
        "MediaWiki:Common.js/hubfix.js", /* Temporary fix for Wikia hubs: Gaming > Entertainment */
        "MediaWiki:Common.js/icons.js", /* Adds icons to page header bottom border */
        "MediaWiki:Common.js/imports.js", /* UserTags and AjaxRC */
        "MediaWiki:Common.js/insertmwconfig.js", /* Replace the HTML content of matching elements with mw globals */
        "MediaWiki:Common.js/insertusername.js", /* User name replace for Template:USERNAME */
        "MediaWiki:Common.js/randompagelink.js", /* Special:Random > Special:Random/main in navigation */
        "MediaWiki:Common.js/socialmedia.js", /* Add social media buttons to blog posts */
        "MediaWiki:Common.js/standardeditsummaries.js", /* Standard edit summaries */
        "MediaWiki:Common.js/talkbutton.js", /* Talk page buttons to article headers */
        "MediaWiki:Common.js/wallgreetingbutton.js", /* Add a button to edit Message Wall Greeting */ ]
});

//================================================================================
//*** http://dev.wikia.com/wiki/ShowHide
var ShowHideConfig = {
    autoCollapse: 3,
    userLang: false,
    en: {
        show: "anzeigen",
        hide: "ausblenden",
        showAll: "alle anzeigen",
        hideAll: "alle ausblenden"
    }
};

function deltaT() {
    var now = new Date();
    return (now - mw.config.get('wgNow')) + " ms";
}

$(function () {});

$().log("done after " + deltaT(), "Common.js");

/* eof */