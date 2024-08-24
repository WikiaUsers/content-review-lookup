/**
 * Bo�tes d�roulantes
 *
 * Pour [[Mod�le:Navbox]]
 */

var Palette_Derouler = '[afficher]';
var Palette_Enrouler = '[masquer]';

var Palette_max = 1;

function Palette_toggle( $table ) {
	/*
	direct children, car il ne faut pas prendre les lignes des �ventuelles tables imbriqu�es
	table > tbody (peut-�tre aussi thead � l'avenir) > tr

	ensuite, on applique � toutes les lignes sauf la premi�re
	*/
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

		// le mod�le dispose d'une classe "navbox-title",
		// sauf que les palettes "inlin�es" (e.g. � {| class="navbox collapsible collapsed" �) n'ont pas cette classe
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

	// for garbage collection
	tableToGroup = null;
	groupLengths = null;
	$tables = null;

	// permet de d�rouler/enrouler les palettes en cliquant n'importe o� sur l'ent�te
	// (utilisation de la classe "navbox-title", comme �a seules les vraies palettes utilisant le mod�le sont cibl�es)
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

window.AddRailModule = [{prepend: true}];