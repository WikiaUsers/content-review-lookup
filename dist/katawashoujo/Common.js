/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');

// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// </syntax>


/* Adds {{CreativeCommons}} template to all uploads in [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]]. */

function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload' && wgPageName.toLowerCase() != 'special:multipleupload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("<!--For official Katawa Shoujo images and other images licensed under Creative Commons-->\r{{CreativeCommons}}"));
 
}
addOnloadHook (preloadUploadDesc)

importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

/* Replaces {{Visitor}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{Visitor}} replacement */

importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
                'u:dev:Standard_Edit_Summary/code.js',
                'u:dev:UserTags/code.js'
		// ...
	]
});

/***User Tags***/
window.UserTagsJS = {
    modules: {},
    tags: {
        // group: { associated tag data }
        sysop: { u:'Administrator', link:'Katawa Shoujo Wiki:Administrators' },
        bureaucrat: { u:'Administrator', link:'Katawa Shoujo Wiki:Administrators' }
    }
};

UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat', 'autoconfirmed-user'],
        'new-user': ['sysop', 'bureaucrat', 'autoconfirmed-user'],
        'new-editor': ['sysop', 'bureaucrat', 'autoconfirmed-user']
};

/* Link to Game Download */
$('ul.tools li:first-child').after('<li><a href="http://katawa-shoujo.com/download.php">Download Katawa Shoujo</a></li>');