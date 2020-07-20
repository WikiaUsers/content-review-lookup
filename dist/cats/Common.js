/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
/* Auto Refresh Ends */

/* Randomize Wordmark*/
$(function() {
    var images = [
 'https://images.wikia.nocookie.net/__cb20150115054620/cats/en/images/e/ee/Cats_logo1.png',
 'https://images.wikia.nocookie.net/__cb20150115054620/cats/en/images/9/94/Cats_logo2.png',
 'https://images.wikia.nocookie.net/__cb20150115054620/cats/en/images/b/b1/Cats_logo3.png',
 'https://images.wikia.nocookie.net/__cb22/cats/en/images/8/89/Wiki-wordmark.png'
];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});
 
/* Randomized Wordmark Ends*/

/* Message Wall Posts Tags */
var messageWallUserTags = {
    'Miyanlove': 'Admin',
    'Remiaw': 'Admin'
 
};
window.messageWallTagColor = 'Black';
 
var messageWallTagColor = window.messageWallTagColor || 'Black';
 
(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Message_Wall:' + name + '"]').after('<span style="color:' + messageWallTagColor + ';margin-left:-2px;font-size:10px;vertical-align:top;">(' + messageWallUserTags[name] + ')</span>');
    }
}(jQuery));
/* Message Wall Posts Tags Ends */