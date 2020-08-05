/* Tämän sivun JavaScript-koodi liitetään jokaiseen sivulataukseen */
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Automaattinen päivitys';
 AjaxRCRefreshHoverText = 'Päivittää automaattisesti sivua';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');