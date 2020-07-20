//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/UserRightsIcons.js');


// Namespaces in header
$(function NamespacesInHeader() {
	if(wgCanonicalNamespace != '' && wgCanonicalNamespace != 'Talk') {
		$('#WikiaPageHeader h1').html(wgFormattedNamespaces[wgNamespaceNumber] + ':' + wgTitle);
	}
});
 
 
//Social icons
 
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px"
};
importScriptPage('SocialIcons/code.js','dev');