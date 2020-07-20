/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
/* End of the {{USERNAME}} replacement */

$("#hidr").click(function () {
    $("span:last-child").hide("fast", function () {
        // use callee so don't have to name the function
        $(this).prev().hide("fast", arguments.callee); 
     });
});

$("#showr").click(function () {
    $("span").show(2000);
});