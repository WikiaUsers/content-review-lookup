// **********************************************************************
// **                 ***WARNING! GLOBAL GADGET FILE***                **
// **********************************************************************
if( ( wgAction == 'view' || wgAction == 'purge' ) && wgNamespaceNumber >=0 )
addOnloadHook(function edittop_hook(){
	var localtitles = {
		en: 'Edit lead section',
		fr: 'Modifier le résumé introductif',
		it: 'Modifica della sezione iniziale',
		ja: '導入部を編集'
	};
	var h2s = document.getElementsByTagName('H2');
	var h2 = h2s[0];
	if( !h2 )
		return;
	if( h2.parentNode.id == 'toctitle')
		h2 = h2s[1];
	if( !h2 )
		return;
	var span = h2.firstChild;
	if( !span || span.className != 'editsection' )
		return;
	var zero = span.cloneNode( true );
	if( document.getElementById( 'featured-star' ) )
		zero.style.marginRight = '25px';
	if( document.getElementById( 'spoken-icon' ) )
		zero.style.marginRight = '45px';
	if( document.getElementById( 'protected-icon' ) && zero.style.marginRight )
		zero.style.marginRight = '70px';
	var parent = document.getElementsByTagName('H1')[0];
	parent.insertBefore(zero, parent.firstChild);
	var a = zero.getElementsByTagName('A')[0];
	if( localtitles[wgUserLanguage] ) {
		a.title = localtitles[wgUserLanguage];
	} else {
		// TODO check for content of header, to get a more precise replacement
		a.title = a.title.replace(/:.*$/, ': 0');
	}
	a.setAttribute( 'href', a.href.replace( /&section=1/, '&section=0' ) );
});