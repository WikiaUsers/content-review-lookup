//=================================================================================================
//
//                                             USERTAG
//
//=================================================================================================

//ajout des groupes custom
// window.UserTagsJS = {
//	modules: {},
//	tags: {
//		// groupe: { tag associé }
//		dieu: { u:'Divinité', m:'Dieu', f:'Déesse' order:'1/10' },
//		css: { u:'Codeur CSS', order:'2/0' },
//		modeles: { u:'Codeur modèles', order:'-1/0' },
//		codeur: { u:'Codeur Général', f:'Codeuse Générale' },
//		bureaucrat: { u:'Super tag de chef', link:'Centre des communautés:Bureaucrates' },
//		inactive: { u: 'N\'édite plus, RIP' }
//	}
// };

//Ajout des groupes custom
//UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
//UserTagsJS.modules.custom = {
//	'Oeil de Givre': ['dieu', 'codeur', 'inactive'], // ajoute "Divinité" plus "Codeur CSS"
//};

//UserTagsJS.modules.inactive = 50; // 50 jours
//UserTagsJS.modules.newuser = {
//	days: 5, // est présent depuis moins de 5 jours
//	edits: 10, // à fait moins de 10 édits
//	namespace: 0 // Les édits doivent être faits sur des articles
//};

//===========================================================================
//=================================================
//                             COMPTE À REBOURS
//===============================================================================
//============================================================================
// pour utiliser, insérer <span class="countdown">20xx-xx-xxT14:00:00+02:00</span>
// où 20xx-xx-xx est la date (an, mois, jour), ce qui suit T est l'heure et
//+00:00 est le décalage horaire
$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});

// Usertag? //
window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'Codeur JavaScript', order: 100 },
		csshelper: { u: 'Codeur CSS', order: 101 },
		templatehelper: { u: 'Codeur', order: 102 },
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Oeil de Givre': ['templatehelper'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];