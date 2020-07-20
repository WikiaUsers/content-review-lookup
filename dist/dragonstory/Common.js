/* Any JavaScript here will be loaded for all users on every page load. */

$(function scrollHack() {
   /* A horrible workaround for wikia's broken image load code that assumes that the position of the images on the page won't change after it's been loaded...
*/
   window.setTimeout(
    function () {
        window.scrollTo(window.scrollX, window.scrollY+1);
        window.scrollTo(window.scrollX, window.scrollY-1);
    }, 2000);
});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 });
 
/* End of the {{USERNAME}} replacement */