/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

// Texte d'information, de fr.lego.wikia.com/wiki/MediaWiki:Common.js
var disclaimerNs=[0,1,4,5,6,7,14,15,110,111,400,401,500,502,503,-1];
if (disclaimerNs.indexOf(wgNamespaceNumber) !== -1) {
var legaltext="World Of Tanks Blitz est un jeu disponible sur mobile. Ce wikia a été conçu pour donner des informations sur World Of Tanks sur mobile et non sur PC.";
var legaldiv='<div id="lcowiki_legal"><div style="clear:both"></div><br><center><div class="legaldisclaimer">'+legaltext+"</div></center></div>";
$(".WikiaArticle").append(legaldiv);
$(".legaldisclaimer").css({
fontSize:"80%",
border:"1px solid #F6A938",
backgroundColor:"#F2F2F2",
borderRadius:"8px",
color: "black"
})};
// Fin du texte d'information

/** UserTags **/
window.UserTagsJS = {
	modules: {},
	tags: {
        rollback: { u:'Lieutenant'},
		sysop: { u:'Capitaine' },
		bureaucrat: { u:'Colonel' },
		chatmoderator: { u:'Commandant' },
		founder: { u:'Général' }
	}
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 31; // Inactif au bout de 31 jours sans modifications 
UserTagsJS.modules.mwGroups = 
                 ['Colonel']; // Ajoute le groupe Colonel aux bureaucrates
                 ['Capitaine']; // Ajoute le groupe Capitaine aux administrateurs
                 ['Lieutenant']; // Ajoute le groupe Lieutenant aux rollbacks
                 ['Commandant']; // Ajoute le groupe Commandant aux modérateurs du chat
UserTagsJS.modules.metafilter = {
	Capitaine: ['Colonel'], // Retire le groupe Capitaine aux "Colonel"
	Lieutenant: ['Capitaine'] // retire le groupe Lieutenant aux "Capitaine"
};
UserTagsJS.modules.userfilter = {
	'Alex02089': ['inactive'] // Alex02089 n'est jamais inactif, même s'il devrait l'être
};
UserTagsJS.modules.implode = {
	'Colonel': ['Commandant', 'Lieutenant'] // Retire Commandant et Lieutenant, puis ajoute Colonel
};

/** Importations **/
importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js'
    ]
});

var WikiaNotificationMessage = "Bienvenue sur le Wiki World Of Tanks Blitz ! Ce Wiki est tout nouveau donc n' hésitez pas à contribuer !";
var WikiaNotificationexpiry = 30;
importScriptPage('WikiaNotification/code.js', 'dev');