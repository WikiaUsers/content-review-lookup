/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
$('div#mw-panel div.portal').addClass('persistent');
});


/* == Templates == */
if ($('#template_item_list_nav').length>0) {
    mw.loader.load('/MediaWiki:Item_list_nav.js?action=raw&ctype=text/javascript');
}