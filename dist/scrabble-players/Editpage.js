// <nowiki>
// dynamically load Commons-style Edittools
function createEdittoolsLink(){
	// get div.mw-editTools
	var box = document.getElementById('wpTextbox1');
	while( box && box.className != 'mw-editTools' )
		box = box.nextSibling;
	if( !box )
		return;
	// create a link
	var lnk = document.createElement('a');
	lnk.href = 'javascript:loadCommonsTools()';
	lnk.title = 'Load Commons-style Edittools';
	lnk.id = 'loadCommonsEdittoos';
	lnk.appendChild(document.createTextNode('[load edittools]'));
	lnk.style.cssText = 'float:right';
	box.appendChild(lnk);
}

function loadCommonsTools(){
	var lnk = document.getElementById('loadCommonsEdittoos');
	if( lnk )
		lnk.parentNode.removeChild(lnk);
}

if( doneOnloadHook )
	createEdittoolsLink();
else
	addOnloadHook( createEdittoolsLink );

// Add Insert Buttons
function addInsertButton( img, speedTip, tagOpen, tagClose, sampleText ){
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		'imageFile': '//upload.wikimedia.org/' + img,
		'speedTip': speedTip,
		'tagOpen': tagOpen,
		'tagClose': tagClose,
		'sampleText': sampleText
	};
}

addInsertButton( 'wikipedia/commons/c/c8/Button_redirect.png', 'Redirect', '#REDIRECT [[', ']]', '' ); //+ buttons
addInsertButton( 'wikisource/ru/a/a9/Button-dash.png', ' — ', '—', '', '' );
addInsertButton( 'wikipedia/commons/2/2a/Button_category_plus.png', 'Category', '[[Category:', ']]', '' );

// </nowiki>