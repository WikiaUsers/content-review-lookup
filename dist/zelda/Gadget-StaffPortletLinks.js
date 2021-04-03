//// --------------------------------------------------------
//// Staff Portlet Links
//// This script adds additional/custom links to the sidebar, 
//// and additional/custom tabs at the top-right next to the Search Box.
//// https://www.mediawiki.org/wiki/ResourceLoader/Core_modules#addPortletLink
//// https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.util-method-addPortletLink
//// --------------------------------------------------------

$(document).ready(function(){
	
	mw.util.addPortletLink(
		"p-tb",                              //Where? Sidebar (Tools)
		"/Special:ExpandTemplates", //Dest. url
		"Expand templates",                  //Name of Tab
		"ca-exptem",                         //id
		"Special:ExpandTemplates"            //Tooltip
	);
	console.log("Expand Templates link added");
	
	mw.util.addPortletLink(
		"p-tb",
		"/Special:ReplaceText",
		"Replace text",
		"ca-reptex",
		"Special:ReplaceText"
	);
	console.log("Replace Text link added");
	
});