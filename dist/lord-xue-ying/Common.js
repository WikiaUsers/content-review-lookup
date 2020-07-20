/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});

/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/

if ( window.mwCustomEditButtons ) {
  mwCustomEditButtons.push( {
     "imageFile": "https://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anf%C3%BChrung.png",
     "speedTip": "Quote",
     "tagOpen": "{{Quote|",
     "tagClose": "|}}",
     "sampleText": ""} );
     
}