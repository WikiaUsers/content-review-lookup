// Auto-refresh Special:RecentActivity

AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];

//***************
// Adds link to Special:Contributions for "Banned From Chat" tags
//***************
 
if ($('span.tag:contains("Banned From Chat")').length == 1){
 $('span.tag:contains("Banned From Chat")').wrap("<a href='/wiki/Special:Contributions/"+wgTitle.replace(' ', '_')+"' style='color:black;'></a>");
}