importScript('MediaWiki:Functions.js');
var firstRun = true;
function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;
	rewriteSearchFormLink();
	fixSearch();
}
function fixSearch() {
	var button = document.getElementById('searchSubmit');
 	if( button )
		button.name = 'go';
}
$( loadFunc );