importScriptPage('PurgeButton/code.js', 'dev' );
 
importScriptPage('ArchiveTool/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');


if (mwCustomEditButtons) {
 
/*** wrappers *****/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|reason=",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};
 
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

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
     "speedTip": "Add a Reference",
     "tagOpen": "<ref>",
     "tagClose": "</ref>",
     "sampleText": ""};
}


/* Reference Pop Ups */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});


/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');