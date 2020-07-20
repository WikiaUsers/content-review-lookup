/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */
 
// Pages along with their namespace (if any) will go here.
var pages = ['User_talk:Dolan da duk', 'User:Dolan da duk', 'Dolan'];
 
// URL of the images will go here.
// Remember URL of the logo of 'My Page 1' will be the first, 'My Page 2' will be the second and so on.
var wordmarks = ['https://vignette.wikia.nocookie.net/suicide-mousegeepedia/images/8/8e/Latest.png/revision/latest?cb=20150219202551'];
// Iterate for all the pages in the above array
for (i = 0; i < pages.length; i++) {
  /* check for the name of the page */
  if (mw.config.get('wgPageName') == pages[i]) {
    /* replace the image */
    $('#WikiHeader .wordmark a img').attr('src', wordmarks[i]);
  }
}