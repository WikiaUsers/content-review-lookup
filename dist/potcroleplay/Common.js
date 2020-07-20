/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u: 'Bureaucrat / King' },
		rollback: { u: 'Rollback' },
	}
};
UserTagsJS.modules.custom = {

};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});