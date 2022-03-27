/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

 
 // END import Onlyifediting-functions
 // ============================================================

EditIntroButtonText = 'Modifier l\'intro';
importScriptPage('EditIntroButton/code.js', 'dev');


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* End of the {{USERNAME}} replacement */