/* Any JavaScript here will be loaded for all users on every page load. */

/* edit buttons */
if (mwCustomEditButtons) {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
    "speedTip": "Redirect",
    "tagOpen": "#REDIRECT [[",
    "tagClose": "]]",
    "sampleText": "Insert page"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"};
}

/* Display Timer */
importScriptPage('MediaWiki:Common.js/displayTimer.js', 'descendantswickedworld');

/* Count-down Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');

/* Title rewrite */
importScriptPage('MediaWiki:Common.js/titlerewrite.js', 'descendantswickedworld');

/* collapsible */
importScriptPage('ShowHide/code.js', 'dev');

window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog hasn\'t been commented on for over <expiryDays> days. There is no need to comment.",
    nonexpiryCategory: "Blogs that won't expire"
};
 
 
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:LockOldBlogs/code.js",
        "w:c:dev:MediaWiki:Countdown/code.js",
        "w:dev:ShowHide/code.js" /* Collapsible elements and tables */
    ]
});