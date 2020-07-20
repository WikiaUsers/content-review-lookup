/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
 
/* Ajax Auto-Refresh (courtesy pcj) */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* Falling Wikia Ws*/
importScript('MediaWiki:Common.js/falling.js');
 
 
/* Display Timer */
importScript('MediaWiki:Common.js/DisplayTimer.js');
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<a href="http://community.wikia.com/wiki/Community_Central">Wiki Rules</a>').apendTo('#CorporateFooter');
});
 
 
//////////STATUS CHANGER
// Creator: Misza13
// Credits: Voyagerfan5761 for some minor improvements
// Modified by Xenocidic to simply use /Status as a one word indicator,
// Modified by Kraftlos to include Sleep status
// compatible with {{Statustop}} for display
 
addOnloadHook(function (){
  //Check if the config is defined
  if (typeof(statusChangerConfig) == 'undefined') {
    statusChangerConfig = {}
  }
 
  if (typeof(statusChangerConfig.statusList) == 'undefined') {
      statusChangerConfig.statusList = [ 'online', 'busy', 'around', 'offline', 'sleep' ];
  }
 
  if (typeof(statusChangerConfig.statusPage) == 'undefined') {
      statusChangerConfig.statusPage = 'User:' + wgUserName + '/Status';
  }
 
  //Add the links
  for (var i=0; i<statusChangerConfig.statusList.length; i++) {
    var stat = statusChangerConfig.statusList[i];
    var message = (stat === "sleep") ?  link = "asleep" : link = stat;
    addPortletLink(
      "p-personal", //target tab - personal links
      wgServer + wgScript + "?title=" + statusChangerConfig.statusPage + "&action=edit&newstatus=" + stat, //link URL
      stat, //link text
      "pt-status-" + stat, //id of new button
      "I'm " + message + "!", //hover text
      "", //???
      document.getElementById("pt-logout")); //add before logout button
  }
 
  if (location.href.indexOf("&action=edit&newstatus=") == -1) return; //Are we here to auto-edit the status?
  //Get new status
  statusRegExp = /&action=edit&newstatus=(.*)/;
  var status = statusRegExp.exec(location.href)[1];
  //Modify the form
  document.getElementById('wpTextbox1').value = status;
  if (status == "sleep")
  { status = "sleeping"; }
  document.getElementById('wpSummary').value = wgUserName + " is now " + status +".";
  document.getElementById('wpMinoredit').checked = true;
  //Submit it!
  document.getElementById('editform').submit();
});
 
//[[Category:Wikipedia scripts|statusChanger]]