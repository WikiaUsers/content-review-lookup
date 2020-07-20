/* Any JavaScript here will be loaded for all users on every page load. */
//Replaces {{USERNAME}} with the name of the user browsing the page.
//For use with [[Template:Username]]
$(function() { if (wgUserName) { $('.insertusername').text(wgUserName); } });

window.railWAM = {
    logPage:"Project:WAM Log"
};
// dev:GlobalEditcount/code.js