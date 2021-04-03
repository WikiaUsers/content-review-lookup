/* Any JavaScript here will be loaded for users using the MonoBook skin */
//Create function addPortletLink
function addPortletLink(portlet, href, text, id, tooltip, accesskey, nextnode) {
	var node = document.getElementById(portlet);
	if ( !node ) return null;
	node = node.getElementsByTagName( "ul" )[0];
	if ( !node ) return null;

	var link = document.createElement( "a" );
	link.appendChild( document.createTextNode( text ) );
	link.href = href;

	var item = document.createElement( "li" );
	item.appendChild( link );
	if ( id ) item.id = id;

	if ( accesskey ) {
		link.setAttribute( "accesskey", accesskey );
		tooltip += " ["+accesskey+"]";
	}
	if ( tooltip ) {
		link.setAttribute( "title", tooltip );
	}
	if ( accesskey && tooltip ) {
		updateTooltipAccessKeys( new Array( link ) );
	}

	if ( nextnode && nextnode.parentNode == node )
		node.insertBefore( item, nextnode );
	else
		node.appendChild( item );  // IE compatibility (?)

	return item;
}

//Add node 'PvX Decode' to toolbox portlet.
addOnloadHook( function()
{
//we only want to add the rate tab if it's the build namespace.
if ( wgNamespaceNumber == 100)
{
    addPortletLink( 'p-cactions', '/index.php?title=' + wgPageName + '&action=rate', 'rate', 'n-rate', 'Rate Build', '#', 'ca-edit' );
}
addPortletLink( 'p-tb', '/Special:PvXDecode', 'PvXDecode', 'pt-pvxdecode', 'Convert build templates to PvX code' );
} );