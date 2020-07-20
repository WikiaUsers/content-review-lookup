/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Log","Special:Contributions"];
importScriptPage('AjaxRC/code.js', 'dev');
/* Auto Refresh Ends */

/* Message Wall Posts Tags */
var messageWallUserTags = {
    'Miyanlove': 'Administrator' 
};
window.messageWallTagColor = 'navy';
 
var messageWallTagColor = window.messageWallTagColor || 'navy';
 
(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Message_Wall:' + name + '"]').after('<span style="color:' + messageWallTagColor + ';margin-left:-2px;font-size:10px;vertical-align:top;">(' + messageWallUserTags[name] + ')</span>');
    }
}(jQuery));
 
/* Message Wall Posts Tags Ends */