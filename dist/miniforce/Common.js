/* Any JavaScript here will be loaded for all users on every page load. */
// RailModule
window.AddRailModule = ['Template:Discussion moudle'];

/* The invalid "dev:ProfileTags.js" line has been removed from here. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires Template:Username. I'm just trying something real quick!*/
$(function() {
    if (window.wgUserName) {
        $('.InsertUsername').text(window.wgUserName);
    }
});