/* Any JavaScript here will be loaded for all users on every page load. */

  if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/c/c4/Small_Icon.png/revision/latest?cb=20150606072417",
     "speedTip": "Small Text",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Small Text"};
 
  }
 
      if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/test-wiki4/images/d/dc/Big_Icon.png/revision/latest?cb=20150530121654",
     "speedTip": "Big Text",
     "tagOpen": "<big>",
     "tagClose": "</big>",
     "sampleText": "Big Text"};
 
  }
  
  
importArticles({
     type: 'script',
     articles: [
         'u:dev:AutoEditPages/code.js'
     ]
 });
  
 importScriptPage('PowerPageMaker/code.js', 'dev');
  
 importArticles({
     type: 'script',
     articles: [
         // ...
         'u:dev:ListUsers/code.js',
         // ...
     ]
 });
 
importScriptPage('MediaWiki:AdminDashboard JS-Button/code.js', 'dev');

SpoilerAlert = {
  pages: ["Spoiler","User:PawzFan"],
}
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.2.js"
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});