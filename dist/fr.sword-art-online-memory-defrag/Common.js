/* Configuration de l'extension AjaxRC.js */
AjaxRCRefreshText = 'Actualisation automatique';
AjaxRCRefreshHoverText = 'Actualisation automatique de la page';
ajaxSpecialPages = ["WikiActivity","Recentchanges"];

/* Configuration pour le module Horloge personalisé: MediaWiki:ClocksModule.js */
clocksModuleLabels = ["Date & Heure UTC"];
clocksModuleTimezones = ["UTC"];
clocksModuleFormat = [
    {local : "fr", format : "%d/%m/%Y - %H:%M:%S"}
];

 
window.UserTagsJS = {
	modules: {},
	tags: {
		hello: {u: 'No Gender Set' } ,
		Rédacteur_de_commentaire: { u:'Rédacteur de commentaire'},
		Rédacteur_de_contenu: { u:'Rédacteur de contenu'},
        Graphiste: { u:'Graphiste'},
        Quality_checker: { u:'Quality checker'},
        Agent_technique: { u:'Agent technique'},
        Gérant_du_discord: { u:'Gérant du discord'},
	}
};
 
UserTagsJS.modules.custom = {
	'Ykoren': ['Rédacteur_de_commentaire'],
	'Genkay2': ['Rédacteur_de_contenu'],
	'Iiiik "King Escafag"': ['Graphiste' , 'Gérant_du_discord'],
	'Caruellej' : ['Agent_technique'],
};


/* Fonction pour créer le formulaire de recherche, et ouvrir la page selectionné dans l'onglet actif ou un nouveau onglet */
function sidebar() {
  var $rail = $('#WikiaRail');
 
  if ($rail.length === 0) return;
 
  $('<section id="wiki-custom-search" class="module">'+
        '<iframe src="https://api-defrag-ap.wrightflyer.net/webview/announcement?phone_type=2&lang=en"></iframe>'+
    '</section>')
    .appendTo($rail);
}

/* Tags utilisateurs (admins principalement) */
window.UserTagsJS = {
    modules: {},
    tags: {
        o: { u: 'Onii-san'},//Tag Bllob (cf. Dysmea pour l'origine)
        art: {u: 'Direction artistique'},
        news: {u: 'Informateur MH'},
        discord : {u: 'Admin Moga Discord'},
        bot : {u: 'Robot domestiqué'},
        film: {u: 'Cinéaste'},
 
        //Personnalisation par Houmgaor
        hunt_staff: { u: 'Hunter Programmeur'},
 
        //Tags spécial Krow - MH4U
        k: { u: 'KrowMixor'},
        m: { u: 'Krow_Quality'},
 
        //Tag anciens admins
        afk: { u: 'En vacances'},
 
    },
};
UserTagsJS.modules.custom = {
 
     //Tags admin
     'Caruellej': ['o'],
     'Dysmea': ['art','discord'],
     'Houmgaor' : ['hunt_staff', 'discord'],
     'Hutskuchi' : ['news', 'discord'],
 
     //Tags particuliers
     'Caruellej': ['k'],
     'HoumgaBot': ['bot'],
     'HutskuBot': ['bot'],
     'Mr.pyro01': ['film'],
 
     //Admins retraités
     'Caruellej': ['afk'],
     'Wrondral' : ['afk'],
     'BadBart86' : ['afk'],
     'Non0w' : ['afk'],
};