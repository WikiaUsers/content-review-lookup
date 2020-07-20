addOnloadHook(function() {
	if ( wgNamespaceNumber != "2" && wgNamespaceNumber != "3" ) {
		return;  // restrict to User and User talk
	}

	var title = wgTitle;

	addPortletLink(
		'p-cactions',
		'/wiki/Special:Block/' + title,
		'block', 't-blockip', 'Block "' + title + '"'
	);
 
});