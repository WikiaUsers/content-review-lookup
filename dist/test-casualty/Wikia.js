/* ----------------------- CASUALTY WIKI OASIS JS ------------------------ */

/* ------------------------- REMOVABLE FEATURES -------------------------- */

/* Disable Image Upload Pop-Ups */
$(document).ready(function()
{
	$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
});

function PlaceholderLink() {
	$('.wikiaPlaceholder a').attr('href', '/wiki/Special:Upload').unbind('click');
}
$(PlaceholderLink);



/* ------------------------ EDITOR DROPDOWN ITEMS ------------------------ */

function EditorDropdown() {
	$('section#EditPage nav.wikia-menu-button ul').prepend('<li><a id="wpHistory" href="/wiki/'+ wgPageName +'?action=history"> History </a></li>');
	$('section#EditPage nav.wikia-menu-button ul').append('<li><a id="wpCancel" href="/wiki/'+ wgPageName +'"> Cancel </a></li>');
}
addOnloadHook(EditorDropdown);



/* ----------------------- NAVIGATION LAYOUT FIXES ----------------------- */

function PageHead() {
	if (wgCanonicalNamespace != 'Special' && wgCanonicalNamespace != 'Message_Wall' && wgCanonicalNamespace != 'Thread' && wgCanonicalNamespace != 'Message_Wall_Greeting' && wgCanonicalNamespace != 'Talk' && (wgCanonicalNamespace.indexOf("talk")) == -1) {
 
		if (! wgCanonicalNamespace) {
			var talknamespace = 'Talk';
		} else {
			var talknamespace = wgCanonicalNamespace + '_talk';
		}
 
		$('.WikiaPageHeader').prepend('<ul class="commentslikes"><li class="comments"></span><a href="/wiki/' + talknamespace + ':' + wgTitle + '" id="newcomments" data-id="comment" title="" accesskey="t"> Talk</a></li><li class="likes"><fb:like layout="button_count" width="50" colorscheme="light" ref="content_page" href="http://test.casualty.wikia.com/wiki/' + wgTitle + '"></fb:like></li></ul>');
 
		$('.commentsbubble').attr("id","commentsbubble");
 
		var csource = document.getElementById('commentsbubble');
		if (csource!=null) {
			var ctarget = document.getElementById('newcomments');
			csource = csource.parentNode.removeChild(csource);
			if (ctarget!=null) {
				ctarget.parentNode.insertBefore(csource,ctarget);
			}
		}
 
		if (wgPageName == 'Casualty_Test_Wiki') {
			$('.WikiaPageHeader .commentslikes').after('<div class="mainpage-add-page"><a href="/wiki/Special:CreatePage" title="Create a new page on this wiki" class="createpage"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" height="0" width="0" class="sprite new"></a><a href="/wiki/Special:CreatePage" title="Special:CreatePage" class="createpage"> Add a Page</a></div>');
		}
	}
}
 
function PageCounter() {
	if (wgPageName == 'Casualty_Test_Wiki') {
		$('.WikiaPageHeader .tally').css({"display": 'block !important'});
	} else if (wgCanonicalNamespace != 'Special') {
		$('.WikiaPageHeader .tally em').attr("id","tally");
 
		var tsource = document.getElementById('tally');
 
		if (tsource!=null) {
			$('.WikiaActivityModule').before('<section class="WikiaPagesOnWikiModule module"><h1>Pages on Casualty Wiki</h1><a href="/wiki/Special:CreatePage" title="Create a new page on this wiki" class="wikia-button createpage"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" height="0" width="0" class="sprite new"> Add a Page</a><div class="tally"><span id="newtally" class="fixedwidth">pages on this wiki</span></div></section>')
			var ttarget = document.getElementById('newtally');
			tsource = tsource.parentNode.removeChild(tsource);
			if (ttarget!=null) {
				ttarget.parentNode.insertBefore(tsource,ttarget);
			}
		}
	}
}
 
addOnloadHook(PageHead);
addOnloadHook(PageCounter);



/* -------------------------- MESSAGE WALL TOOLS ------------------------- */

function WallTools() {
	if (wgCanonicalNamespace == 'Thread') {
		$('#WallBrickHeader').append('<a href="/wiki/'+ wgPageName +'?action=history" class="wikia-button" style="margin-left:10px; margin-right:10px; float: right;" id="History">View History</a>');
	}
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a href="/wiki/'+ wgPageName +'?action=history" class="wikia-button" style="margin-left:10px; margin-right:10px;" id="History">View History</a></div>');
		$('blockquote.wallgreeting').css('margin-top', '0px');
		if (wgTitle == wgUserName) {
			$('.UserProfileActionButton').prepend('<a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit Greeting	</a>');
		}
	}
}
addOnloadHook(WallTools);