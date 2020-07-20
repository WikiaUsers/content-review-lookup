/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');
 
// **************************************************************
// RevealAnonIP settings -- MUST be before the script is imported
// **************************************************************
 
window.RevealAnonIP = {
    permissions : ["rollback", "sysop", "bureaucrat"]
};
 
// ****************************
// End of RevealAnonIP settings 
//