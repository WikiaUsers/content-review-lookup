/* Any JavaScript here will be loaded for all users on every page load. */

// **************************************************
//  Spoiler Alert
// **************************************************
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilery');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');