//Imports
importArticles({
    type: "script",
    articles: [
        "w:c:dev:EditcountTag/code.js",
        "w:c:dev:UserTags/code.js"
    ]
});

//User tags
window.UserTagsJS = {
	modules: {},
	tags: {
		editmaster: { u:'Editor', title:'This user has the highest number of edits in the wiki!' },
                techno: {u:'Technical Expert', title:'This user is the technical expert of the wiki!'},
	}
};
 
UserTagsJS.modules.custom = {
	'AdventureWriter28': ['editmaster'], 
        'Fubuki風吹': ['techno'],
};

// insertusername
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
 }
 addOnloadHook(UserNameReplace);