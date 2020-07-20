// =====================================
//                Imports
//           MediaWiki:ImportJS
// =====================================
// Check the original pages for more informations.

// =====================================
//                Others
// =====================================
//File Links AutoUpdate
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   importScriptPage("FileUsageAuto-update/code.js", "dev");
}

$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value === '') {
		document.getElementById('wpUploadDescription').value = '==Source==\nFrom\n\n==Licensing==\n{{Fairuse}}\n[[Category:';
	}
});

// =====================================
//        Variables for functions
// =====================================
// Ajax auto-refresh
window.ajaxPages = [
    'Special:RecentChanges', 
    'Special:WikiActivity',
    'Special:Watchlist',
    'Special:Log',
    'Special:Contributions',
    'Special:NewFiles'
];

/* Lock Blog Script customisation */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived due to not being commented on in over <expiryDays> days.",
    nonexpiryCategory: "Open Blogs"
};