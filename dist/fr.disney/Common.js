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

/* Prévisualisation des articles (import du script) */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LinkPreview/code.js',
    ]
});

/* Prévisualisation des articles (paramètres de personnalisation) */
window.pPreview = $.extend(true, window.pPreview, {
    defimage: 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest?cb=20170626182120&path-prefix=ru',
    noimage: 'https://vignette.wikia.nocookie.net/lemondededisney/images/e/e6/Site-logo.png/revision/latest?cb=20210511194537&path-prefix=fr',
    window.pPreview.scale: {r: '?', t: '/scale-to-width-down/350?'}
});