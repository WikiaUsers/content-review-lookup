/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
    $('.username').text(mw.config.get('wgUserName'));
});

// Home/Back-to-top button

window.BackToTopModern = true;

// RailWAM

window.railWAM = {
     logPage: 'The_Rooster_Teeth_Wiki:WAM/log',
     loadOnPage: 'The_Rooster_Teeth_Wiki:WAM',
     lang: 'en'
};

// Ajax Batch Delete

importScriptPage('AjaxBatchDelete/code.js', 'dev');
 
// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];