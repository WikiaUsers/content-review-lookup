/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
  if (wgCanonicalSpecialPageName == 'Upload') {
      importScriptPage('MediaWiki:Onlyifuploading.js');
 }

 // Import [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf('action=edit') > 0 || document.URL.indexOf('action=submit') > 0) {
     importScriptPage('MediaWiki:Onlyifediting.js');
 }
 
 // END import Onlyifediting-functions
 // ============================================================
importArticles({
	type: 'script',
	articles: [
        'u:dev:ExtendedNavigation/code.js',
        'u:zh.pad.wikia.com:MediaWiki:CountDown.js'
    ]
}, {
	type: 'style',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.css'
});