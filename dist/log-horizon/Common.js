/* Any JavaScript here will be loaded for all users on every page load. */
/*<pre>
importArticles({
    type: "script",
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:SignatureCheck/code.js', // Alerts users for not signing when publishing a talk page edit 
        'u:dev:ShowHide/code.js', // Collapsible 
        ]
});
*/
// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
}
$(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******