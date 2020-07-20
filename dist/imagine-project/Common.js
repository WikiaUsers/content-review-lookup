/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

importScriptPage('ChatTags/code.js', 'dev');

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		elderuser: { u:'Elder User', order:-1/0 }
	}
};

UserTagsJS.modules.custom = {
	'The Darkwolf': ['elderuser'],
	'Nikolai Banks': ['elderuser']
};