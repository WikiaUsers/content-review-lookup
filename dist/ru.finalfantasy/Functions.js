/*
    Makes the image on the search form, if one is present, point to the search page
    instead of the Wikia main page.
*/
function rewriteSearchFormLink() {
	if( $('#searchform').length == 0 ) {
		return;
	}
	var links = document.getElementById('searchform').getElementsByTagName('a');
 
	if( links.length > 0 ) {
		links[0].href = wgScriptPath + '/index.php?title=Special:Search&adv=1';
	}
}