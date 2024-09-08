/* <nowiki> */

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

importArticles({
 type:'script',
 articles:[
  'MediaWiki:Sm2.js', //Extension:SoundManager2Button
  'w:c:dev:AjaxBatchDelete/code.js',
  'w:c:dev:AjaxRC/code.js',
  'w:c:dev:CollapsibleInfobox/code.js',
  'w:c:dev:RevealAnonIP/code.js', //Reveal Anonymous User IP
  'w:c:dev:ShowHide/code.js'
 ]
});

/* Tout JavaScript ici sera chargé avec chaque page accédée par n'importe quel utilisateur. */

importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('AjaxBatchDelete/code.js', 'dev');

/* </nowiki> */