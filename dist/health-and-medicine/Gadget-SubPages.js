addOnloadHook( function() {
	var NSWithoutSubpages = new Array( -1, 6, 8, 12, 13, 14, 15, 104, 105);
	if ( document.getElementById( 'p-tb' ) && NSWithoutSubpages.indexOf( wgNamespaceNumber ) == -1 ) {
		var subpagesLink = '/wiki/Special:PrefixIndex/' + wgPageName + '/';
		addPortletLink( 'p-tb', subpagesLink, 'Subpages', 't-subpages', 'Subpages of this page' );
	}
});