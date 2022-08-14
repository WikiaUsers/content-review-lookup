/* Link to tabber tab - by 452 */
 tabberOptions = {
   onLoad: function() {
     if (window.location.hash) {
       var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ');
       var currentTabber = this;
       $(".tabbernav li a", this.div).each(function(i) { 
         if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
       });
       delete currentTabber;
     }
   }
 };
/* LockForums */
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This thread is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this thread!",
    forumName: "Forum" 
};
 
/* MassProtect */
massProtectDelay = 300;

/* MessageBlock */
var MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 because you have $1',
  autocheck : true
};
importArticles({
 type:"script",
  articles: [
   'u:dev:FacebookLikeBox/code.js',
   'u:dev:MediaWiki:YoutubePlayer/code.js'
  ]
});

/* WikiaNotification*/
var WikiaNotificationMessage = "Congratulations T234LovelyCassie for being the user of the month!";
var WikiaNotificationexpiry = 10;
importScriptPage('WikiaNotification/code.js', 'dev');

/* External Image Loader*/
importScriptPage('ExternalImageLoader/code.js', 'dev');

/* Countdown */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* DiscussionsEmbed */
window.discussEmbedLimit = 8;
window.discussEmbedSortTrending = 1;