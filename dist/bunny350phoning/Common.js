/* Any JavaScript here will be loaded for all users on every page load. */

/******************************************************************************
 ***
 *** Template-specific scripts here
 ***
 ******************************************************************************/

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* DO NOT ADD CODE BELOW THIS LINE */