importArticles({ type: "script", articles: [ "w:c:dev:Countdown/code.js" ] });

importScriptPage('Translator/Translator.js', 'dev');


importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});


/* Usertags */
window.UserTagsJS = {
	modules: {},
	tags: {
		jurassicworldfan: { u: 'Fan of Jurassic World', order: 100 },
                dinosaur: { u: 'Dinosaur', order: 101 }
	}
};
UserTagsJS.modules.custom = {
	'LiamJaco1998lfc': ['jurassicworldfan'],
};

/* UserName Replace - Credit to gallowshill.wikia.com */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);