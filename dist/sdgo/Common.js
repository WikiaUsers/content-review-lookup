importScriptPage('ShowHide/code.js', 'dev');

importArticle({type:'script', article:'w:dev:DupImageList/code.js'});

importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

importArticle({type:'script', article:'w:c:dev:DISPLAYTITLE/code.js'});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* End of the {{USERNAME}} replacement */