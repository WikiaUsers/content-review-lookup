/* Any JavaScript here will be loaded for all users on every page load. */
/* Ability to change full page title
 * See w:c:dev:DISPLAYTITLE for info and attribution
 */

$(function() {
	var newPageTitle = getElementsByClassName(document, 'span', 'changePageTitle')[0]; // Find the span with the new title
	if(newPageTitle == null) return; // If not found exit
	var oldPageTitle = getElementsByClassName(document, 'header', 'WikiaPageHeader')[0].getElementsByTagName( "h1" )[0]; //Find the page's title
	if(oldPageTitle == null) return; // If not found exit
	oldPageTitle.innerHTML = newPageTitle.innerHTML; // Set the title
});