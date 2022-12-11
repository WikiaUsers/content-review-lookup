/* ANY JAVASCRIPT HERE WILL BE LOADED FOR ALL USERS ON EVERY PAGE LOAD */
      
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

/* DiscussionsEmbed variables */
window.discussEmbedLimit = 4;
window.discussEmbedForum = "4400000000000011071";
window.discussEmbedSortTrending = 1;

/* Imports */
importArticles({
   type: 'script',
   articles: [
      "u:dev:MediaWiki:InactiveUsers/code.js", /* Inactive users label */
      "u:dev:MediaWiki:FixWantedFiles/code.js", /* Fix red links to files */
      "u:dev:MediaWiki:DupImageList/code.js", /* Duplicate image list */
      "u:dev:MediaWiki:ReferencePopups/code.js", /* Reference popups */
      "u:dev:MediaWiki:Countdown/code.js", /* Countdown timer */
      "u:dev:MediaWiki:DiscussionsRailModule/UCP.js", /* Discussions rail module */
      "u:dev:MediaWiki:PurgeButton/code.js", /* Purge button
      "u:avatar:MediaWiki:Common.js/icons.js", /* Add icons to page header bottom border (DISABLED, looking for alternative)*/
      "MediaWiki:Common.js/Stdsummaries.js", /* Summary filler */

    ]
});