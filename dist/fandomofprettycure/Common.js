/* Any JavaScript here will be loaded for all users on every page load. */

/* UTC Clock */
window.DisplayClockJS = {
    format: '%2d %{Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sep;Oct;Nov;Dec}m %2Y %2H:%2M (UTC)',
    hoverText: 'UTC Clock',
    interval: 500, /* How often the timer updates in milliseconds (1000=1 second) */
    monofonts: 'Consolas, monospace', /* The font the clock uses by default */
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});