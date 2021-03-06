/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
  if ( wgCanonicalSpecialPageName == "Upload" ) {
      importScriptPage('MediaWiki:Onlyifuploading.js');
 }

 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     importScriptPage('MediaWiki:Onlyifediting.js');
 }
 
 // END import Onlyifediting-functions
 // ============================================================

/* Prévisualisation des articles */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LinkPreview/code.js',
    ]
});