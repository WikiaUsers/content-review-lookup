/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

$(function() {
 
  var possibleFavicons = [
    'https://vignette.wikia.nocookie.net/the-outstanding-remarkable-robotguy39/images/d/d4/3072621tj1kx9Oi.png/revision/latest?cb=20170330053012',
    'https://vignette.wikia.nocookie.net/the-outstanding-remarkable-robotguy39/images/b/b8/3073533JG21y27d.png/revision/latest?cb=20170330053654',
  ];
 
  var favicon = possibleFavicons[Math.floor(Math.random() * possibleFavicons.length)];
  $('link[rel="shortcut icon"]').attr('href', favicon);
});

/*** WAM ***/

window.railWAM = {
    logPage:"Project:WAM Log"
};