/*jshint maxerr:600, scripturl:true, laxbreak:true, sub:true, loopfunc:true, forin:false, unused:true*/
/*global mw, $*/
/**
 * N'importe quel JavaScript ici sera chargé pour n'importe quel utilisateur et pour chaque page accédée.
 *
 * ATTENTION : Avant de modifier cette page, veuillez tester vos changements avec votre propre
 * vector.js. Une erreur sur cette page peut faire bugger le site entier (et gêner l'ensemble des
 * visiteurs), même plusieurs heures après la modification !
 *
 * Prière de ranger les nouvelles fonctions dans les sections adaptées :
 * - Fonctions JavaScript
 * - Fonctions spécifiques pour MediaWiki
 * - Applications spécifiques à la fenêtre d'édition
 * - Applications qui peuvent être utilisées sur toute page
 * - Applications spécifiques à un espace de nom ou une page
 *
 * <nowiki> /!\ Ne pas retirer cette balise
 */


/**
 * Boîtes déroulantes
 *
 * Pour [[Modèle:Méta palette de navigation]]
 */

var Palette_Enrouler = '[masquer]';
var Palette_Derouler = '[afficher]';

var Palette_max = 1;

function Palette_toggle( $table ) {
	$table.find( 'tr:not(:first)' ).toggleClass( 'navboxHidden' );
}

function Palette( $element ) {
	if ( !$element ) {
		$element = $( document );
	} else if ( !$element.jquery ) {
		$element = $( $element );
	}

	var $tables = $element.find( 'table.collapsible' );
	var groups = {};

	$tables.each( function( _, table ) {
		var group = table.getAttribute('data-autocollapse-group') || '__default__';
		groups[group] = ( groups[group] || 0 ) + 1;
	} );

	$tables.each( function( _, table ) {
		var $table = $( table );

		var group = table.getAttribute('data-autocollapse-group') || '__default__';
		var autoCollapse = groups[group] > Palette_max;
		var collapsed = $table.hasClass( 'collapsed' ) || ( autoCollapse && $table.hasClass( 'autocollapse' ) );

		// le modèle dispose d'une classe "navbox-title",
		// sauf que les palettes "inlinées" (e.g. « {| class="navbox collapsible collapsed" ») n'ont pas cette classe
		$table.find( 'tr:first th:first' ).prepend(
			$( '<span class="navboxToggle">\u00a0</span>' ).append(
				$( '<a href="#">' + (collapsed ? Palette_Derouler : Palette_Enrouler) + '</a>' ).click( function() {
					var $this = $( this );
					if ( $this.text() === Palette_Enrouler ) {
						$this.text( Palette_Derouler );
					} else {
						$this.text( Palette_Enrouler );
					}
					Palette_toggle( $table );
					return false;
				} )
			)
		);
		if ( collapsed ) {
			Palette_toggle( $table );
		}
	} );

	// permet de dérouler/enrouler les palettes en cliquant n'importe où sur l'entête
	// (utilisation de la classe "navbox-title", comme ça seules les vraies palettes utilisant le modèle sont ciblées)
	$element.find( '.navbox-title' )
		.click( function ( e ) {
			if ( $( e.target ).closest( 'a' ).length ) {
				return;
			}
			$( this ).find( '.navboxToggle a' ).click();
		} )
		.css( 'cursor', 'pointer' );
}
mw.hook( 'wikipage.content' ).add( function ( $content ) {
	Palette( $content );
} );


/**
 * Pour [[Modèle:Boîte déroulante]]
 */

var BoiteDeroulante_Enrouler = '[masquer]';
var BoiteDeroulante_Derouler = '[afficher]';
var BoiteDeroulante_index = -1;

function BoiteDeroulante_toggle(indexBoiteDeroulante){
	var a, m;
	var NavFrame = document.getElementById("NavFrame" + indexBoiteDeroulante);
	var NavToggle = document.getElementById("NavToggle" + indexBoiteDeroulante);
	var CaptionContainer = document.getElementById("NavCaption" + indexBoiteDeroulante);
	if (!NavFrame || !NavToggle || !CaptionContainer) {
		return;
	}
	var caption = [];
	var CaptionSpans = CaptionContainer.getElementsByTagName('span');
	caption[0] = CaptionSpans[0].innerHTML;
	caption[1] = CaptionSpans[1].innerHTML;

	if ( NavToggle.innerHTML === caption[1] ) {
		NavToggle.innerHTML = caption[0];
		$(NavFrame).find('div.NavContent').hide();
	} else {
		NavToggle.innerHTML = caption[1];
		$(NavFrame).find('div.NavContent').show();
	}
}

function BoiteDeroulante( $element ) {
	if ( !$element ) {
		$element = $( document );
	} else if ( !$element.jquery ) {
		$element = $( $element );
	}

	$element.find( '.NavFrame' ).each( function ( _, NavFrame ) {
		var Enrouler, Derouler, CaptionContainer, NavToggle, NavToggleText;
		BoiteDeroulante_index++;

		if (NavFrame.title && NavFrame.title.indexOf("/") !== -1) {
			Enrouler = mw.html.escape(NavFrame.title).split("/")[1];
			Derouler = mw.html.escape(NavFrame.title).split("/")[0];
		} else {
			Enrouler = BoiteDeroulante_Enrouler;
			Derouler = BoiteDeroulante_Derouler;
		}
		NavFrame.title='';
		CaptionContainer = document.createElement('span');
		CaptionContainer.id = 'NavCaption' + BoiteDeroulante_index;
		CaptionContainer.style.display = "none";
		CaptionContainer.innerHTML = '<span>' + Derouler + '</span><span>' + Enrouler + '</span>';
		NavFrame.appendChild(CaptionContainer);

		NavToggle = document.createElement("a");
		NavToggle.className = 'NavToggle';
		NavToggle.id = 'NavToggle' + BoiteDeroulante_index;
		NavToggle.href = 'javascript:BoiteDeroulante_toggle(' + BoiteDeroulante_index + ');';
		NavToggleText = document.createTextNode(Enrouler);
		NavToggle.appendChild(NavToggleText);

		NavFrame.insertBefore( NavToggle, NavFrame.firstChild );
		NavFrame.id = 'NavFrame' + BoiteDeroulante_index;

		BoiteDeroulante_toggle(BoiteDeroulante_index);
	} );

	// permet de dérouler/enrouler les boîtes en cliquant n'importe où sur l'entête
	$element.find( '.NavHead' )
		.click( function ( e ) {
			if ( $( e.target ).closest( 'a' ).length ) {
				return;
			}
			var toggle = $( this ).siblings( 'a.NavToggle' )[0];
			if ( toggle ) {
				toggle.click(); // pas du jquery, mais du vanilla js
			}
		} )
		.css( 'cursor', 'pointer' );
}

mw.hook( 'wikipage.content' ).add( function ( $content ) {
	BoiteDeroulante( $content );
} );

 /** Références Popups
 * 
 * Description : This is a re-implementation of Wikipedia's reference popup gadget, a feature which  *               allows you to hover over a citation and view the contents of the reference in a   
 *               floating box. 
 * Responsable : [[Utilisateur:Lunarity]]
 */
 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
    ]
});
 
 /** FontAwesome
 * 
 * Description : Font Awesome gives you scalable vector icons that can instantly be customized —     *               size, color, drop shadow, and anything that can be done with the power of CSS.
 * Responsable : Dave Gandy. Modified by Jose Buelvas and DarthKitty for Wikia compatibility.
 */
 
 importArticles({
    type: "style",
    articles: [
        "w:c:dev:FontAwesome/code.css"
    ]
});

/** PreloadFileDescription
 * 
 * Description : Ajout automatique d'une description en-dessous d'un fichier image, fichier audio, ou encore d'un ficher vidéo, juste avant la téléversion.
 * 
 * Responsable : [[Utilisateur:EnderHero]]
 */

if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload' || mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
    if (!$.getUrlVar('wpForReUpload') && !$('#wpUploadDescription').val()) {
        jQuery(function ($) {
            'use strict';
            $('#wpUploadDescription').val(
                  '{{Information\n' 
                + '| attention     = \n' 
                + '| description   = \n' 
                + '| source        = \n' 
                + '| date          = \n' 
                + '| auteur        = \n' 
                + '| licence       = \n' 
                + '| autre version = \n' + '}}');
        });
    }
}


/** ShowHide
 *
 * Description : Allows tables to be collapsed, showing only the header. See [[Help:Collapsing]].
 *
 * Responsable : [[Utilisateur:Dantman]]
 */

/*importScriptPage('MediaWiki:ShowHide/code.js', 'dev');*/

/** SpoilerAlert
 *
 * Description : Displays a spoiler alert.
 *
 * Responsable : [[Utilisateur:Pecoes]], [[Utilisateur:Gguigui1]]
 */

SpoilerAlert = {
    question: 'Cette page contient pas mal de spoilers. Voulez-vous toutefois continuer ?',
    yes: 'Oui s\'il vous plaît',
    no: 'Non, pas question',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

/** UserTags
 *
 * Description : Adds, removes, rearranges and modifies the tags next to User's names on User pages
 *
 * Responsable : [[Utilisateur:Lunarity]]
 */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		// FORMAT= groupe: { tag associé }
        rollback: { u:'Révocateur',m: 'Révocateur', f:'Révocatrice'},
		inactive: { u:'Inactif', m:'Inactif', f:'Inactive', order:'1/0' },
		newuser: { u:'Nouveau contributeur', order:'-1/0' },
	}
};

UserTagsJS.modules.inactive = {
	days: 30, // 30 jours
	namespaces: [0], // Modifications uniquement dans l'espace de noms principal
	zeroIsInactive: true // 0 modifications est considéré comme inactif
};

UserTagsJS.modules.newuser = {
	days: 5, // est présent depuis moins de 5 jours
	edits: 10, // à fait moins de 10 édits
	namespace: 0 // Les édits doivent être faits sur des articles
};

UserTagsJS.modules.mwGroups = ['bot', 'rollback'];

/** PreloadTemplates & Summaries
 *
 * Description : jQuery version of Sikon's fillPreloads & fillEditSummaries
 *
 * Responsable : [[Utilisateur:Grunny]]
 */

function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection){
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0'){
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	}
	else{
		myField.value += myValue;
	}
}


/** AjaxPatrol
 *
 * Description : Script for making patrol links Ajax.
 *
 * Responsable : [[Utilisateur:Grunny]]
 */

mw.hook( 'wikipage.content' ).add( createCollapseButtons );

importArticles({
    type: "script",
    articles: [
        "u:dev:AjaxPatrol/code.js"
    ]
});