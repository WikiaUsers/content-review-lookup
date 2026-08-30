/* =======================================================
   1. CONFIGURATION VARIABLES
   ======================================================= */
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This thread is considered archived because it hasn't been commented on in over <expiryDays> days, please don't bump this thread!",
    forumName: "Forum" 
};

window.massProtectDelay = 300;

window.MessageBlock = {
    title: 'Block',
    message: 'You have been blocked for $2 because you have $1',
    autocheck: true
};

window.WikiaNotificationMessage = "Congratulations T234LovelyCassie for being the user of the month!";
window.WikiaNotificationexpiry = 10;

window.railWAM = {
    logPage: "Project:WAM Log"
};

window.discussEmbedLimit = 8;
window.discussEmbedSortTrending = 1;
window.BackToTopModern = true;

/* =======================================================
   2. DEV EXTENSION IMPORTS
   ======================================================= */
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:YoutubePlayer/code.js",
        "u:dev:MediaWiki:WikiaNotification/code.js",
        "u:dev:MediaWiki:ExternalImageLoader/code.js",
        "u:dev:MediaWiki:Countdown/code.js"
    ]
});

/* =======================================================
   3. FAIR USE POLICY
   ======================================================= */
PFD_license = 'Fairuse';