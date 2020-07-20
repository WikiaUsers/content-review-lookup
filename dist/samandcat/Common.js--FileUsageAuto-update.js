if (wgPageName.indexOf("Special:MovePage/File:") != -1){
   LIRoptions = {
	bottomMessage: '',
	editSummary: 'Updating file link (automatic)',
	buttonText: 'Automatically update file links throughout the wiki'
   }
 
   importScriptPage("FileUsageAuto-update/code.js", "dev");
}