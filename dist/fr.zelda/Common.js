/*Petit bouton "spoiler" qu'on ouvre en cliquant dessus*/

// **************************************************
// Infobox spoilers
// **************************************************
 
$(function spoilerLoad(){
    $("[title='Cliquer pour faire apparaître']").click(function(){$(this.nextSibling).fadeIn()});
});
 
// **************************************************
// - end - Infobox spoilers
// **************************************************

/*Paramètres UserTags : noms ...*/
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: {
            u:'GRAND SAGE',
            order: 100,
            link:'ZeldaWiki:Administrateurs',
            title:'Cet utilisateur est bureaucrate' 
        },
		inactive: {u: 'CONTRIBUTEUR INACTIF' },
		sysop: { u:'SAGE', order: -1/0, link:'ZeldaWiki:Administrateurs' },
		'content-moderator': { u:'GARDE HYLIEN' },
		apprenti: { u: 'APPRENTI HÉROS', order: -1/0 },
		bot: { u:'ROBOT' },
		blocked: { u: 'BLOQUÉ(E)' },
		user: { u:'CONTRIBUTEUR ACTIF' },
		'admin-inactif': { u:'ADMIN INACTIF' },
		'rollback-inactif': { u:'MODO INACTIF' }
	}
};
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.inactive = 30; //Ajoute "Inactif" si aucun edit en 1 mois (30 jours)
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'content-moderator',
    'chatmoderator',
    'inactive',
    'bot',
    'user',
    'council',
    'threadmoderator',
    'vanguard',
];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	'content-moderator': ['sysop', 'bureaucrat', 'apprenti'], // Retire le tag "content-moderator" de ceux ayant "Admin", "Bureaucrate" et "Apprenti"
	chatmoderator: ['rollback'], 
	threadmoderator: ['content-moderator'],
	bureaucrat: ['founder'],
	user: ['bureaucrat', 'sysop', 'helper', 'inactive', 'content-moderator', 'apprenti', 'bot', 'admin-inactif', 'modo-inactif', 'chatmoderator', 'founder', 'newuser']
};
UserTagsJS.modules.userfilter = {
	'Récupix': ['inactive'] // Récupix n'est jamais affiché inactif, même s'il devrait l'être
};
UserTagsJS.modules.implode = {
	'admin-inactif': ['sysop', 'inactive'], // Retire Admin et inactifs, s'ils sont présents, et ajoute "Admin Inactif"
	'rollback-inactif': ['apprenti', 'inactif'] //Idem (spécificité des modos "apprenti héros")
};


/*Texte "rafraîchir"*/
PurgeButtonText = 'Rafraîchir';


/* Remplace la commande {{USERNAME}} par le nom de la personne qui regarde la page
   Nécessite le modèle USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 });
 
/* Fin de la commande USERNAME */

/* Config AjaxRC */
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
/* Fin config AjaxRC*/

/* Permet d'ajouter le sigle d'un boss au-dessous du nom. Exemple : page [[Daidagos, Monstre Marin Antique|Daidagos]] */

function sousTitreH1( $content ) {
	$( 'h1 > #sous_titre_h1' ).remove();
	var $span = $content.find( '#sous_titre_h1' );
	if ( $span.length ) {
		$span.prepend( ' ' );
		$( 'h1' ).append( $span );
	}
}
mw.hook( 'wikipage.content' ).add( sousTitreH1 );

/* Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',   /* compte à rebours */
        'u:dev:UserTags/code.js',    /* permet l'ajout de rôles / modification de noms de rôles pour les membres */
        'u:dev:PurgeButton/code.js', /* ajout de l'option "rafraîchir" à une page */
    ]
});