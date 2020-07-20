/* Any JavaScript here will be loaded for all users on every page load. */
window.DisplayClockJS = {
    hoverText: 'Refresh this page',
    interval: 1000, /* How often the timer updates in milliseconds (1000=1second) */
    monofonts: 'Lucida Console, sans serif' /* The font the clock uses by default */
};
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});