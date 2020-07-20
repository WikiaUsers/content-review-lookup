/* Any JavaScript here will be loaded for all users on every page load. */

/* UserTags */
 
window.UserTagsJS = {
	modules: {},
	tags: {
		Founder: { u: 'Founder', order: 100 },
		sysop: { order: 1 } // Normal order is 0
	}
};
 
UserTagsJS.modules.custom = {
	'FrederickM': ['sysop'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/* Icon placement courtesy of OuaT wiki */
importArticles({
    type: "script",
    articles: [
 "MediaWiki:Common.js/icons.js",
 "w:c:dev:TopEditors/code.js"
 ]
});

importScriptPage('AjaxRC/code.js', 'dev');
var ShowHideConfig = { autoCollapse: 2 };