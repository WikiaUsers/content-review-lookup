/** Modèle : Méta palette de navigation - ©  Wikipédia
 * --> Provient de : https://fr.wikipedia.org/wiki/MediaWiki:Common.js#L-173
 * 
 * [[Catégorie:MediaWiki]] [[Catégorie:Javascript]] [[Catégorie:Modèles - Navboxes|#1]]

/**
 * Navboxes
 * Pour  : [[Modèle:Méta palette de navigation]]
 */

var Palette_Derouler = '[afficher]';
var Palette_Enrouler = '[masquer]';

var Palette_max = 1;

function Palette_toggle( $table ) {
	$table.children().children( 'tr' ).slice( 1 ).toggleClass( 'navboxHidden' );
}

function Palette( $content ) {

	function closestParent( node, selector ) {
		if ( Element.prototype.closest ) {
			return node.parentNode.closest( selector );
		} else {
			return $( node.parentNode ).closest( selector )[ 0 ];
		}
	}

	var tableToGroup = new WeakMap();
	var groupLengths = new WeakMap();

	var $tables = $content.find( '.collapsible' );

	$tables.each( function ( _, table ) {
		var group = closestParent( table, '.navbox-container, .collapsible' );
		if ( group ) {
			tableToGroup.set( table, group );
			groupLengths.set( group, ( groupLengths.get( group ) || 0 ) + 1 );
		}
	} );

	$tables.each( function ( _, table ) {
		var $table = $( table );

		var collapsed = false;
		if ( table.classList.contains( 'autocollapse' ) ) {
			var group = tableToGroup.get( table );
			if ( group && groupLengths.get( group ) > Palette_max ) {
				collapsed = true;
			}
		} else if ( table.classList.contains( 'collapsed' ) ) {
			collapsed = true;
		}
		$table.find( 'tr' ).eq( 0 ).find( 'th' ).eq( 0 ).prepend(
			$( '<span class="navboxToggle">\xA0</span>' ).append(
				$( '<a href="javascript:">' + ( collapsed ? Palette_Derouler : Palette_Enrouler ) + '</a>' ).click( function ( e ) {
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

	tableToGroup = null;
	groupLengths = null;
	$tables = null;

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