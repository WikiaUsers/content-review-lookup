/* Any JavaScript here will be loaded for all users on every page load. */ 

importScript('MediaWiki:Wikia.js/userRightsIcons.js');


/* auto-zebra stripe for tables */
 
var ts_alternate_row_colors = true;
 
function zebraStripe() {
if ($("table.zebra > tbody > tr").eq(1).css("background-color") == "#363636" && $("table.zebra > tbody > tr").eq(2).css("background-color") == "transparent") {
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#424242");
$(".sortheader").bind("click", function() {
$("table.zebra > tbody > tr").not(".nozebra").css("background-color","#363636");
$("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color","#424242");
});
}
}

/* Add link to message wall greeting */
function WallTools() {
	if (wgCanonicalNamespace == 'Thread') {
		$('#WallBrickHeader').append('<a href="/wiki/'+ wgPageName +'?action=history" class="wikia-button" style="margin-left:10px; margin-right:10px; float: right;" id="History">View History</a>');
	}
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a href="/wiki/'+ wgPageName +'?action=history" class="wikia-button" style="margin-left:10px; margin-right:10px;" id="History">View History</a></div>');
		if (wgTitle == wgUserName) {
			$('.UserProfileActionButton').prepend('<a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit Greeting	</a>');
		}
	}
}
addOnloadHook(WallTools);
/* End of Code */