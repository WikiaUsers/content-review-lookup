/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
/* Wiki Notification */
$(function addPageBottom() {
    $("#WikiaRail").append('<div style="position:fixed; bottom:2.5em; right:0.5em; z-index:999; width:200px; border-radius: 4px; box-shadow: 0px 0px 5px 0px rgb(122, 119, 119); background-color: rgb(213, 10, 115); background-image: -moz-linear-gradient(center top , rgb(244, 30, 141) 35%, rgb(213, 10, 115) 65%); color:white; text-align:center; padding:10px;"><b>Welcome to Sekirei Wiki! Please go through our <a href="/wiki/Sekirei_Wiki:Policies_and_guidelines">Policies And Guidelines</a> for a better stay. Failure in following them may result in blocking</b></div>');
});
 
/* Replaces {{Visitor}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
});
 
/* End of the {{Visitor}} replacement */