/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
   type: "script",
   articles: [
       "w:c:dev:Countdown/code.js"
   ]
});

$(function() {

   $('.username').text(mw.config.get('wgUserName'));

})

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'This refreshes the page automatically';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('InactiveUsers/code.js', 'dev');

InactiveUsers = { months: 1 };