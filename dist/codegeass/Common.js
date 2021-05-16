/* Any JavaScript here will be loaded for all users on every page load. */
/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&smaxage=86400&templates=expand');

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
	if((wgPageName == 'Special:Upload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = Code Geass Anime by Sunrise \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
}
$(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******

// =====================================
//                Imports
// =====================================
// Check the original pages for more informations.
 
importArticles({
    type: 'script',
    articles: [
        // Test if an Element has a Certain Class
        'MediaWiki:Common.js/elementClass.js',
        // Togglers (toggles the display of elements on a page)
        'MediaWiki:Common.js/togglers.js',
        // Recent Changes Auto Refresh
        'w:dev:AjaxRC/code.js',
        // Duplicate Image List
        'w:dev:DupImageList/code.js',
        // List Admins
        'w:dev:ListAdmins/code.js',
        // Standard Edit Summary
        'w:dev:Standard_Edit_Summary/code.js',
    ]
});

/* 
////////////////////////////////////////////////////////////////////
// Facebook box
////////////////////////////////////////////////////////////////////
*/

function fBox() {
    $('#fbox').append('<iframe scrolling="no" height="550" frameborder="0" align="top" width="330" src="http://www.facebook.com/connect/connect.php?id=127387304076053&amp;connections=29" marginwidth="0" marginheight="0"></iframe>');
}

$(fBox);