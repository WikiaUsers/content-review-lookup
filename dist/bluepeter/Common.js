/* Any JavaScript here will be loaded for all users on every page load. */
	/*Adds RailWAM*/
window.railWAM = {
    logPage:"Project:WAM Log",
    top5000mode:"false"
};
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 });
 
/* End of the {{USERNAME}} replacement */