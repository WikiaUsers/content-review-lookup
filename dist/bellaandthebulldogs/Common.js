importArticles({
    type: "script",
    articles: [
         "w:dev:ShowHide/code.js", /* Show and Hide code by tables */
         "w:dev:BackToTopButton/code.js", /* Back to top button */
         "w:dev:Countdown/code.js", /* Countdown timers on the wiki */
         "w:dev:DupImageList/code.js", /* Duplicate images */
         "w:dev:AutoEditDropdown/code.js", /* Auto edit dropdown */
         "w:dev:FixMultipleUpload/code.js", /* Fixes the broken Edit Tools template on Special:MultipleUpload */
         "w:dev:WallGreetingButton/code.js", /* Adds a button to Message Wall pages that allows a user to easily edit their wall greeting */
         "w:dev:FileUsageAuto-update/code.js", /* Automatically updates file links throughout the wiki upon renaming */
         "MediaWiki:Common.js/Imports.js", /* Auto-refresh, Anons */ 
    ]
});
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

//Message Wall Posts Tags
var messageWallUserTags = {
    'MamuelRoriTessie': 'Admin',
    
};
window.messageWallTagColor = 'indigo';
 
var messageWallTagColor = window.messageWallTagColor || 'indigo';
 
(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Message_Wall:' + name + '"]').after('<span style="color:' + messageWallTagColor + ';margin-left:-2px;font-size:10px;vertical-align:top;">(' + messageWallUserTags[name] + ')</span>');
    }
}(jQuery));
//