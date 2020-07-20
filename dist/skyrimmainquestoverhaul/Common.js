/*Imports - Full credits on imported pages*/

//Collapsible tables (added by JibstaMan | 06-08-2012)
//Makes tables collapsible with the use of certain classes.
importScriptPage('ShowHide/code.js', 'dev');

//Standard edit summaries (added by JibstaMan | 23-07-2012)
//This code adds the dropdown box when editing a page, which let the user select a summary, so writing isn't necessary.
importScript("MediaWiki:Common.js/Summaries.js");

//masthead entries (added by JibstaMan | 23-07-2012)
//This code changes the color of links to specified users. This code is used to make admins show up green etc.
importScript("MediaWiki:Common.js/Masthead.js");

/* Navigation "On the Wiki" Upgrade (added by JibstaMan | 06-08-2012)
/* Add "About", "Policies" and "Maintenance" to the "On the Wiki" navigation menu */
importScript('MediaWiki:Common.js/AddNavLinks.js');

//Upload FileSummary (added by JibstaMan | 05-08-2012)
//Code from Assassins Creed Wiki, adjusted to fit this wiki
//This code puts the FileSummary template use in the Summary field when uploading images.
function Upload() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{FileSummary\r|Type = \n|Description = \n|Specs = \n|Uploader = \n|Uploadercat = \n|Infobox = \n|Alternatives = \n|Author = \n|Website = \n|Source = \n|License = \n}}';
	}
}
addOnloadHook(Upload);