/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];

addOnloadHook(UserNameReplace);
/* Adds a spoiler alert to pages that have the category 'Upcoming Content' */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Upcoming Content');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');