/* Any JavaScript here will be loaded for all users on every page load. */

/*Template:Username*/
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/* End of the {{USERNAME}} replacement */
 
/* Disable comments for specified pages without disabling feature
 * by: [[User:The 888th Avatar|The 888th Avatar]], with additions by [[User:Hasdi|Hasdi]], based on code by [[User:Pecoes|Pecoes]]
 */
 
function isCategoryBlacklisted (blacklist) {
	for (var i = 0; i < wgCategories.length; i++)
		if (-1 < $.inArray(wgCategories[i], blacklist ))
			return true;
	return false;
}
 
$(function() {
	if (isCategoryBlacklisted(["No_comment_pages"]) && wgTitle !== "Partners_%26_Parachutes") {
		$('.WikiaArticleComments #article-comments').remove();
	}
});
 
$(function() {
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		if (wgTitle == wgUserName) {
			$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
		}
	}
});
//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
 
/*Heart */	
importArticles({
    type: 'script',
    articles: [
        'Mediawiki:Hearts.js'              //Hearts
    ]
});