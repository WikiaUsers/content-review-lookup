/* T‰m‰n sivun JavaScript-koodi liitet‰‰n jokaiseen sivulataukseen */
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Automaattinen p‰ivitys';
 AjaxRCRefreshHoverText = 'P‰ivitt‰‰ automaattisesti sivua';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:ReferencePopups/code.js',
		]
});