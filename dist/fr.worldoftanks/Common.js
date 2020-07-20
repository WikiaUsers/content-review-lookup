/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
// Texte d'information, de fr.lego.wikia.com/wiki/MediaWiki:Common.js
var disclaimerNs=[0,1,4,5,6,7,14,15,110,111,400,401,500,502,503,-1];
if (disclaimerNs.indexOf(wgNamespaceNumber) !== -1) {
var legaltext="World Of Tanks est un jeu disponible sur PC ainsi que sur tablette. Ce wikia a été conçu pour donner des informations sur World Of Tanks sur PC et non sur tablette.";
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
window.UserTagsJS = {
	modules: {},
	tags: {
		// FORMAT= groupe: { tag associé }
		'Bloqué partiellement': { u:'Bloqué partiellement' },
		'Modificateur de la semaine': { u:'Modificateur de la semaine' },
		'Inactif': { u:'Inactif ' },
		'1er utilisateur du Wiki': { u:'1er utilisateur du Wiki' }
	}
};


UserTagsJS.modules.custom = {
	'Maxx86': ['1er utilisateur du Wiki'], // ajoute "Assistant du Wiki" plus "1er utilisateur du Wiki"
	'Utilisateur2': ['css'], // Add Codeur CSS
	'Utilisateur3': ['modele', 'css'], // Ajoute modèle+css
	'Utilisateur4': ['inactive'] // Toujours indiqué comme inactif, même s'il modifie.
};


UserTagsJS.modules.inactive = 31; // 31 jours

UserTagsJS.modules.stopblocked = false; // Stoppe le module

UserTagsJS.modules.autoconfirmed = true; // L'active
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});