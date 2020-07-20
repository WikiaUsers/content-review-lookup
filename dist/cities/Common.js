/* Any JavaScript here will be loaded for all users on every page load. */

/* tooltips and access keys */

ta['ca-nstab-forum'] = new Array('c','View the forum page');

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});