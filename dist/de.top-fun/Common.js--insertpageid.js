/* Page-ID replace for Template:PAGEID (for mw version < 1.20)
*  2012-11-14 [[User:PerryH]]
*/
 
var pageId = mw.config.get('wgArticleId');
 
if (pageId != null) {
	$('.wgArticleId').html(pageId);
}