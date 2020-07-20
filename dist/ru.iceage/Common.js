/* <pre><nowiki> */

importScript('MediaWiki:Functions.js');

// onload stuff
var firstRun = true;

function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;

	substUsername();
}

// для страниц редактирования
if (wgAction=='edit' || wgAction=='submit') importScript ('MediaWiki:Editpage.js')

addOnloadHook(loadFunc);

// </nowiki></pre>