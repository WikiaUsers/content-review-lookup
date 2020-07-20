/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
importScriptPage('AjaxRC/code.js', 'dev');

 
/**********************/
/* Back to top button by Loleil */
/**********************/
 
importScriptPage('BackToTopButton/code.js', 'dev');

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

if (wgPageName=="Special:ListUsers") $("fieldset.lu_fieldset tr:last-child").prepend('<td valign="middle" style="padding:0px 2px 0px 1px;"><label for="checkBoxForpoweruser"><span style="vertical-align:middle"><input type="checkbox" name="lu_target" class="lu_target" value="poweruser" checked="checked" id="checkBoxForpoweruser"></span><span style="padding-bottom:5px;">Power Users</span></label></td>');