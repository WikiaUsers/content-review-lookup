function ParseNamespace()
{
	if(wgNamespaceNumber!=112 && wgNamespaceNumber!=114 && wgNamespaceNumber!=116) return;
	$('#WikiaPageHeader h1').text(wgTitle);
	if($('#WikiaPageHeader h2').length)
		$('#WikiaPageHeader h2').prepend($('<span>').text(wgCanonicalNamespace+' | '));
	else
		$('<h2>').appendTo('#WikiaPageHeader').text(wgCanonicalNamespace);
}
ParseNamespace();