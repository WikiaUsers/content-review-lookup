/* <pre>
 * Any JavaScript here will be loaded for autoconfirmed users only
 */
 
/**
 * GEMW updating interface on exchange pages and item infoboxes don't load on these pages
 * To be used when GED goes down
 * Remember to update corresponding array in [[MediaWiki:Common.js]]
 * Comment out the import if the GED stops working completely
 */
var noGePage = [
	// add pages here
];
 
if ($.inArray(mw.config.get('wgPageName'), noGePage) === -1) {
	importScript('MediaWiki:Common.js/gemwupdate.js');
}
  
/* </pre> */