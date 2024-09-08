//************************************************
// User Tag Config
//************************************************
 
//*** Make New Tags
 
window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: { u: 'Master of Büro'},
        bot: { link:'Schinkenbot', order:1 },
		sysop: { u: 'Pappnase vom Dienst (Admin)', order:2 },
		rollback: { u: 'Fast-Sternträger', order:4 },
		chatmoderator: { u: 'Hilfspappnase (ChatMod)', order:5 },
		'MG': { u: 'Mitschinken', order:10 },
		'inactive': { u: 'Desertiert', order:11 },
		'new': { U: 'Frischfleisch', order:7 },
		'fired': { u: 'Desertiert', order:12 },
		'leader': { u: 'Suchti', order:-1/0 },
        'founder': { u: 'Oberschinken', order: -1000 },
        'blocked': { u: 'Schwarz gefahren und aus dem Zug geschmissen/ getreten', order: 25},
        'zeichnerC': { u: 'Königin der Bleistifte', order:20 },
        'zeichnerN': { u: 'Picasso', order:30 },
        'zeichnerB': { u: 'Blazi (Zeichnerin)', order:60 },
        'zeichnerX': { u: 'Hippie', order:70 },
        'G': { u: 'Gangstaaa', order:50 },
        'hellje': { u: 'Der einzig wahre Hellje', order:3 },
        'Au': { u: 'Aurora', order:6 },
        'Master': { u: 'IAYM (allein das verdient eine Auszeichnung)', order: 10005 },
	}
};
 
//***Adds tags to users
 
UserTagsJS.modules.custom = {
	'User': ['custom tag'],
	'FoxTheCat': ['hellje'],
	'Flatinka': ['MG'],
	'Trelliw': ['MG'],
	'BroniePastaStudios': ['MG'],
	'Coulerie': ['zeichnerC'],
	'Gentian.S': ['zeichnerN'],
	'Princess Blaze the Cat': ['zeichnerB'],
	'XXHippieEndermanXx': ['zeichnerX'],
	'Nickstar109': ['G'],
	'MafiaCosaNostra': ['G'],
	'Asulanka': ['Au'],
	'IAmYourMaser': ['Master'],
	'FischiMcFischFisch~': ['Hippie']
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
    question: 'Diese Seite enthält Inhalte, die auf normale Nutzer (also auch dich) verstörend wirken könnten, und ist NICHT unbedingt für alle Altersgruppen geeignet - möchtest du sie wirklich sehen? (und nein, diese Seite wird dich nicht fressen...)',
    yes: 'Ja! (So muss das!)',
    no: 'Nein! (*hust* Pussy *hust*)',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('NSFW');
    }
};

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
 }
 addOnloadHook(UserNameReplace);