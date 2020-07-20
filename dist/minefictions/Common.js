importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

var MessageBlock = {
  title : 'You have been blocked',
  message : 'You have been blocked from editing on this wiki. Reason given: $1. Your block will expire in $2. Please take this time to review the wiki rules.  Do not attempt to evade a ban.  If you believe you were wrongfully blocked, you can leave the blocking admin a message on your message wall.',
  autocheck : true
};/* Any JavaScript here will be loaded for all users on every page load. */

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massCategorizationDelay = 1000;
  importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}