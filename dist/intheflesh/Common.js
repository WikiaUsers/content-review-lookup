/* Any JavaScript here will be loaded for all users on every page load. */
//<nowiki>
 
var PurgeButtonText = 'Refresh',
    ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Special:WikiActivity", "Blog:Recent_posts"],
    AjaxRCRefreshText = 'Auto-refresh';
 
//preload line to add user category for special:upload and special:multipleupload
function preloadUploadDesc() {
    // check wgCanonicalSpecialPageName for upload page
    if ( [ 'MultipleUpload', 'Upload' ].indexOf( mw.config.get( 'wgCanonicalSpecialPageName' ) ) > -1 ) {
        // append Category:USERNAME to upload desc textarea
        $( '#wpUploadDescription').val( $( '#wpUploadDescription').val() + '[[Category:' + mw.config.get( 'wgUserName' ) + ']]' );
    }
}
 
$( preloadUploadDesc );
 
//edit buttons
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
            "speedTip": "Redirect",
            "tagOpen": "#REDIRECT [[",
            "tagClose": "]]",
            "sampleText": "Insert page"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
            "speedTip": "Strike",
            "tagOpen": "<s>",
            "tagClose": "</s>",
            "sampleText": "Strike-through text"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
            "speedTip": "Line break",
            "tagOpen": "<br />",
            "tagClose": "",
            "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
            "speedTip": "Comment visible only for editors",
            "tagOpen": "<!-- ",
            "tagClose": " -->",
            "sampleText": "Insert comment here"
    };
}
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
// </nowiki>

// Imports
EditIntroButtonText = 'Intro';
importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:EditIntroButton/code.js',
        'u:dev:FixWantedFiles/code.js',
        'u:dev:MiniComplete/code.js',
        'u:dev:DupImageList/code.js',
        'u:deadisland:User:Jgjake2/js/DISPLAYTITLE.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:AjaxRC/code.js']
});