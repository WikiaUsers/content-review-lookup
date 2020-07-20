//************************************************
// Imported Scripts
//************************************************
 
importArticles({
	type:'script',
	articles: [
		'w:c:dev:UserTags/code.js',
                 'u:de.coc:MediaWiki:Common.js/Rating.js'
	]
});
 
//************************************************
// User Tag Config
//************************************************
 
//*** Make New Tags
 
window.UserTagsJS = {
	modules: {},
	tags: {
	bureaucrat: { u: 'Bürokrat', order:1 },
	sysop: { u: 'Admin', order:2 },
	chatmoderator: { u: 'ChatMod', order:5 },
	'rav': { u: 'Ravn', order:100 },
	'tech': { u: 'Techniker', order:200 },
	}
};
 
//***Adds tags to users
 
UserTagsJS.modules.custom = {
    'User': ['custom tag'],
    'Ravnene': ['rav'],
    'DER HELD': ['tech']
};
 
 //*** Tags New Accounts
UserTagsJS.modules.autoconfirmed = true;
 
//*** Tags New Users - <10 Days or <30 Edits
UserTagsJS.modules.newuser = {
	namespace: 0, 
	computation: function(days, edits) { return days < 10 && edits < 30; }
};
 
//*** Tags Inactive Users - >=40 Days 
UserTagsJS.modules.inactive = {
	days: 40,
	namespaces: [0]
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator', 'rollback', 'bannedfromchat', 'bot'];
 
UserTagsJS.modules.userfilter = {
	'User': ['tag you do not want to appear'],
};

/* NSFW Warnung*/
 
/*
if (wgCategories.indexOf("NSFW") != -1) {
    $("#WikiaArticle").fadeOut(0);
    $("#WikiaArticleComments").fadeOut(0);
    importScriptNC("MediaWiki:Warning.js");
}
*/
 
SpoilerAlert = {
    question: 'Diese Seite enthält Inhalte, die auf normale Menschen verstörend wirken könnten, und ist NICHT für alle Altersgruppen geeignet. Möchtest du das wirklich sehen?',
    yes: 'Ja (Wi haben dich gewarnt...)',
    no: 'Nein',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('NSFW');
    }
};
 
importScriptPage('SpoilerAlert/code.js', 'dev');
 
/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);