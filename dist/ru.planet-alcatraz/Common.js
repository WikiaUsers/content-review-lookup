/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
/* Add a talk button to pages.*/
$('<a class="wikia-button comments secondary" data-id="comment" href="/wiki/' + wgCanonicalNamespace + '_talk:' + wgTitle + '" accesskey="t">Обсуждение</a>').insertAfter('#WikiaPageHeader a[href="#WikiaArticleComments"]');


function ShowCollapsibleButton() {
    $('.mw-collapsible-toggle').show();
}
$(document).ready(setTimeout(ShowCollapsibleButton, 300));