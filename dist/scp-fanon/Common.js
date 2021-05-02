/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/
// Input Credentials
window.addEventListener('click',function(event) {
	if (event.target == document.getElementsByClassName("cred-input")[0]) {
		document.getElementsByClassName("cred-output-hide")[0].classList.remove('cred-output-hide');
	}
});
// Track Edit Count for Simon

( function ( $, mw ) {
	    'use strict';
    importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:I18n-js/code.js',
			'u:dev:MediaWiki:Modal.js'
		]
	});
    var gEdit = {config: mw.config.get(['wgRevisionId'])};
	var SLEC = document.getElementsByClassName('user-identity-stats')[0].getElementsByTagName('strong')[0].innerHTML;
	var G_Edit_Thing = ((100 * SLEC)/ gEdit).toFixed(2);
	var i;
	for (i = 0; i < 10; i++);
	var gEditO = document.createTextNode(G_Edit_Thing + '%' );
	document.getElementsByClassName('SCP-EditCount')[i].appendChild(gEditO);
});