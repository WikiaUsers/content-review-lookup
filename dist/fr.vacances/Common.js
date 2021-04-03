/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
/* Fonctionnalités dev */
importArticles({
    type: 'script',
    articles: [
    	'u:dev:MediaWiki:ReferencePopups/code.js',
    	'u:dev:MediaWiki:RailWAM/code.js',
		'u:dev:MediaWiki:AjaxBatchDelete/code.js',
    	'u:dev:MediaWiki:CatNav/code.js',
		'u:dev:MediaWiki:UserTags/code.js',
		'u:dev:MediaWiki:AdminDashboard block/code.js',
    	'u:dev:MediaWiki:AjaxUndo/code.js',
    	'u:dev:MediaWiki:ChromeToolbarColor.js',
    	'u:dev:MediaWiki:WikiActivity.js',
    	'u:dev:MediaWiki:MassEdit/code.js'
    ]
});
/*
 * Auteur : Louky
 * Dernière révision : 6 septembre 2020
 */
 /* Personnalisation de UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: 'Réceptionniste',
		sysop: { u:'Concierge', link:'Project:Administrateur', order:'-1/0' },
		bureacrat: { u: 'Président', link:'Project:Bureacrate' },
	}
};
// Ajout des groupes custom
UserTagsJS.modules.custom = {
	'Une personne': ['helper', 'wikien-en-portrait'],
	'John Trololo': ['grandmaitreducustom'],
	'Toi': ['inactive'], // Force le groupe inactif
	'Moi': ['wikien-en-portrait', 'rollback']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 60; // Inactif au bout de 60 jours sans modifications 
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Ajoute le groupe bureaucrat aux bureaucrates
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Retire le groupe administrateur aux bureaucates
	grandmaitreducustom: ['sysop'] // retire le groupe grandmaitreducustom aux "dieu"
};
UserTagsJS.modules.userfilter = {
	'Wyz': ['inactive'] // Wyz n'est jamais inactifs, même s'il devrait l'être
};
UserTagsJS.modules.implode = {
	'dieu': ['sysop', 'grandmaîtreducustom', 'chatmoderator'] // Retire admin, grandaitreducustom et chatmoderator, puis ajoute dieu
};
UserTagsJS.modules.explode = {
	'anti-vandales': ['patroller', 'rollback'] // Ajoute "anti vandales" pour les rollbacks et patrollers
};
 /* Personnalisation de PageRenameAuto-update */
window.PRAoptions = {
    editSummary: '[[Wiki Vacances:PageRenameAuto-update|PageRenameAuto-update]] - Déplacement de liens internes suite au rennomage d\'une page'
}
 /* Personnalisation de MassEdit */
window.MassEditConfig = {
  interval: 250,
  placement: {
    element: "tools",
    type: "prepend"
  }
};
//La section suyivante est partiellement ou en totalité issu de Wikipédia (The following section is partially or entirely from Wikipedia)
/**
 * Boîtes déroulantes
 *
 * Pour [[Modèle:Méta palette de navigation]]
 */

var Palette_Derouler = '[Afficher]';
var Palette_Enrouler = '[Masquer]';

var Palette_max = 1;

function Palette_toggle( $table ) {
	$table.find( 'tr:not(:first)' ).toggleClass( 'navboxHidden' );
}

function Palette( $content ) {

	var $tables = $content.find( 'table.collapsible' );
	var groups = {};

	$tables.each( function( _, table ) {
		var group = table.dataset.autocollapseGroup || '__default__';
		groups[group] = ( groups[group] || 0 ) + 1;
	} );

	$tables.each( function( _, table ) {
		var $table = $( table );

		var group = table.dataset.autocollapseGroup || '__default__';
		var autoCollapse = groups[group] > Palette_max;
		var collapsed = $table.hasClass( 'collapsed' ) || ( autoCollapse && $table.hasClass( 'autocollapse' ) );

		// le modèle dispose d'une classe "navbox-title",
		// sauf que les palettes "inlinées" (e.g. « {| class="navbox collapsible collapsed" ») n'ont pas cette classe
		$table.find( 'tr:first th:first' ).prepend(
			$( '<span class="navboxToggle">\u00a0</span>' ).append(
				$( '<a href="javascript:">' + (collapsed ? Palette_Derouler : Palette_Enrouler) + '</a>' ).click( function ( e ) {
					e.preventDefault();
					if ( this.textContent === Palette_Enrouler ) {
						this.textContent = Palette_Derouler;
					} else {
						this.textContent = Palette_Enrouler;
					}
					Palette_toggle( $table );
				} )
			)
		);
		if ( collapsed ) {
			Palette_toggle( $table );
		}
	} );

	// permet de dérouler/enrouler les palettes en cliquant n'importe où sur l'entête
	// (utilisation de la classe "navbox-title", comme ça seules les vraies palettes utilisant le modèle sont ciblées)
	$content.find( '.navbox-title' )
		.click( function ( e ) {
			if ( $( e.target ).closest( 'a' ).length ) {
				return;
			}
			$( this ).find( '.navboxToggle a' ).click();
		} )
		.css( 'cursor', 'pointer' );
}
mw.hook( 'wikipage.content' ).add( Palette );
/**
 * Ajout d'un lien « ajouter une section » en bas de page
 */
if ( mw.config.get( 'wgAction' ) === 'view' ) {
	$( function( $ ) {
		var $newSectionLink = $( '#ca-addsection' ).find( 'a' );
		if ( $newSectionLink.length ) {
			$( '#mw-content-text' ).append(
				'<div style="text-align:right; font-size:0.9em; margin:1em 0 -0.5em">'
				+ '<a href="' + $newSectionLink.attr( 'href' ) + '" title="Commencer une nouvelle section">Ajouter un sujet</a>'
				+ '</div>'
			);
		}
	} );
}

/**
 * Projet JavaScript
 */
window.obtenir = function ( name ) {
	if ( mw.loader.getState( 'ext.gadget.' + name ) !== null ) {
		mw.loader.load( 'ext.gadget.' + name );
	} else {
		importScript( 'MediaWiki:Gadget-' + name + '.js' );
	}
};