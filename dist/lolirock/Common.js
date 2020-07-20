/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');/* Any JavaScript here will be loaded for all users on every page load. */

/*MessageBlock code from Gguigui1*/ 
var MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 due to $1.',
  autocheck : true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});

/*Custom Message Notification code from User:Jak Himself and User:Gguigui1*/
var WikiaNotificationMessage = "Before editing this wiki, please read the LoliRock's <a href='/wiki/Lolirock_Wiki:General_policies'>Rules/Guidelines</a>! <br/> <br/> Are you a LoliRock fan? Join us in our community at the <a href='/wiki/Special:Forum'>Forum</a>! :D";
var WikiaNotificationexpiry = 30;
importScriptPage('WikiaNotification/code.js', 'dev');

/* Extended Navigation for a tier 4 and 5. JavaScript by Spottra, Reveals Anon IP. Code from w:c:dev:RevealAnonIP/usercode.js, and AjaxPatrol code from Grunny*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js',
        "w:c:dev:RevealAnonIP/code.js",
        'u:dev:MediaWiki:AjaxPatrol/code.js'
    ]
});