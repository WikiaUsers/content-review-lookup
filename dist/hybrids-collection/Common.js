/* Any JavaScript here will be loaded for all users on every page load. */



//edit buttons
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

//</nowiki> </pre>


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */

importScriptPage( 'AjaxRC/code.js', 'dev' );

var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity","Blog:Recent_posts"];

var AjaxRCRefreshText = 'Auto-refresh';

importScriptPage('DupImageList/code.js', 'dev');

importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');

importScriptPage( 'PurgeButton/code.js', 'dev' );

var PurgeButtonText = 'Refresh';

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

EditIntroButtonText = 'Intro';
importScriptPage('EditIntroButton/code.js', 'dev');

// http://dev.wikia.com/wiki/FixWantedFiles
importScriptPage('FixWantedFiles/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');