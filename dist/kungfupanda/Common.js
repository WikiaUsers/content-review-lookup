/* ANY JAVASCRIPT HERE WILL BE LOADED FOR ALL USERS ON EVERY PAGE LOAD */
      
importArticles({
   type: 'script',
   articles: [
      "u:dev:MediaWiki:InactiveUsers/code.js", /* Inactive users label */
      "u:dev:MediaWiki:FixWantedFiles/code.js", /* Fix red links to files */
      "u:dev:MediaWiki:DupImageList/code.js", /* Duplicate image list */
      "u:dev:MediaWiki:ReferencePopups/code.js", /* Reference popups */
      "u:dev:MediaWiki:Countdown/code.js", /* Countdown timer 
      "u:dev:MediaWiki:RailWAM/code.js", /* WAM display on rail (DISABLED until UCP adds back)
      "u:dev:MediaWiki:DiscussionsRailModule/code.js", /* DiscussionsRailModule (DISABLED until UCP adds back) */
      "u:dev:MediaWiki:PurgeButton/code.js", /* Purge button
      "u:avatar:MediaWiki:Common.js/icons.js", /* Add icons to page header bottom border (DISABLED, looking for alternative)*/
      "MediaWiki:Common.js/Stdsummaries.js", /* Summary filler */

    ]
});

/* 'RailWAM' variables
 * DISABLED
window.railWAM = {
    logPage:"Project:WAM Log"
};
 */

/* Inactive users list */
InactiveUsers = { 
   days: 30,
   gone: ['Bigmanrob'],
};

/* Embed Twitter tweets */
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}(document, "script", "twitter-wjs"));

/* Wiki message pop-up box
 * Obtained from Wikia Developers Wiki @ w:c:dev:WikiaNotification
 * STATUS: INACTIVE as of June 18, 2015
var WikiaNotificationMessage = "We have a special announcement to our community regarding the recently released Chinese teaser trailer for Kung Fu Panda 3. Please read through our new procedures to help us keep our wiki spoiler-free. Thanks!<br /><br /><a href='/wiki/Thread:23352'>View announcement</a>";
var WikiaNotificationexpiry = 5;
importScriptPage('WikiaNotification/code.js', 'dev');
 */