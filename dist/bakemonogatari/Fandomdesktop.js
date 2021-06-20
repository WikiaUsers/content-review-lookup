/* Any JavaScript here will be loaded for all users on every page load. */

/* Back To Top Button Configuration */
    var Speed = 50;

/* Script Import */
importArticles({
    type: "script",
    articles: [
        "w:dev:UserTags/code.js",
        "w:dev:Countdown/code.js",
        "w:dev:LockForums/code.js",
        "w:dev:FloatingToc/code.js",
        "w:dev:RevealAnonIP/code.js",
        "w:dev:FixWantedFiles/code.js",
        "w:dev:BackToTopButton/code.js",
        "w:dev:EditIntroButton/code.js",
        "w:dev:ReferencePopups/code.js",
        "w:dev:WallGreetingButton/code.js",
        "w:medakabox:MediaWiki:Common.js/StandardEditSummaries.js",
    ]
});

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]]. Modified by Yyp for use on Bleach Wiki.
 
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
 
}
addOnloadHook (preloadUploadDesc)
 
// ****** END: JavaScript for [[Special:Upload]] ******

/* Custom Edit Buttons (ō, ū characters) */
if (mwCustomEditButtons) {
 
/*** wrappers *****/
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
     "speedTip": "Add the ō character",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Add the ū character",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
}

// Expand
var state =1;
$(function() {
   $('#collapse-global').html($('<a>', {
       'class': 'wikia-button',
       text: 'Expand/Collapse All'
   })).click(function() {
       if(state ===0){
       $('.mw-collapsible-toggle-expanded').click();
       state = 1;
       }
       else {
           $('.mw-collapsible-toggle-collapsed').click();
           state = 0;
       }
      }
)});