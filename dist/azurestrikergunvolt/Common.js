/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');
window.SpoilerAlertJS = {	
	question: 'Images in this gallery may qualify as not safe for work.',
    yes: 'View',
    no: 'Don’t view',
    fadeDelay: 500
}