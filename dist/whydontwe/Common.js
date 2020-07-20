/* Any JavaScript here will be loaded for all users on every page load. */

// Collapsibles 
window.autoCollapse = 2;
window.collapseCaption = "hide";
window.expandCaption = "show";
window.maxHeight = 300;

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
   permissions: [
      'rollback',
      'sysop',
      'bureaucrat',
   ]
};

// Title rewrite - copied from the Harry Potter Wiki.
// * Rewrites the page's title, used by Template:Title
// * By Sikon, jQuery version and new wikia skin fixes by Grunny

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}

	if( $('#title-meta').length == 0 ) {
		return;
	}

	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}

// Replaces {{USERNAME}} with the name of the user browsing the page. Requires copying Template:USERNAME.
function substUsername() {
	$('.insertusername').text(wgUserName);
}

function substUsernameTOC() {
	if(typeof getElementsByClass != 'function') {
		return;
	}

	var toc = document.getElementById('toc');
	var userpage = document.getElementById('pt-userpage');

	if( !userpage || !toc )
		return;

	var username = userpage.firstChild.firstChild.nodeValue;
	var elements = getElementsByClass('toctext', toc, 'span');

	for( var i = 0; i < elements.length; i++ )
		elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}

$( loadFunc );