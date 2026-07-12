/* Any JavaScript here will be loaded for all users on every page load. */
// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
// UTC clock (with custom offset)
window.DisplayClockJS = {
    offset: 480 /* Time offset from UTC in minutes - 480 changes the clock from UTC to CST (China Standard Time) */
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});