/* Qualquer JavaScript aqui será carregado com cada página acessada por qualquer usuário. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 


/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-atualização';
AjaxRCRefreshHoverText = 'Atualiza a página automaticamente';
ajaxPages = ["Especial:RecentChanges","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 

 
 // END import Onlyifediting-functions
 // ============================================================