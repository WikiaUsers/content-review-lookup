/* Any JavaScript here will be loaded for all users on every page load. */
function fixPageName(){
	var newPageTitle = getElementsByClassName(document, 'span', 'changePageTitle')[0];
	if(newPageTitle == null) return;
	var oldPageTitle = getElementsByClassName(document, 'header', 'WikiaPageHeader')[0].getElementsByTagName( "h1" )[0];
	if(oldPageTitle == null) return;
	oldPageTitle.innerHTML = newPageTitle.innerHTML;
}
addOnloadHook(fixPageName);