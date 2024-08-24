importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Grand Lord' },
		founder: { u:'Maître Stratège' },
		chat moderator: { u:'Héros' },
		rollback: { u:'Sorcier' },
		inactive: { u: 'Inactif' }
	}
};

/**
 * Vector HeadAnchors
 * @author Krinkle, 2013
 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-vector-headanchor.js
 */
 ( function ( mw, $ ) {
 
	$( '.mw-body .mw-headline' ).each( function ( i, el ) {
		var id = el.id,
			$headline = $( el ),
			$header = $headline.parent();
 
		if ( $header.find( '.mw-headline-anchor').length ) {
			return;
		}
 
		$header.addClass( 'mw-header' );
		$headline.removeAttr('id').wrap(
			$( '<a>' ).prop({
				id: id,
				href: '#' + id,
				title: 'Lien vers cette section',
				className: 'mw-headline-anchor'
			})
		);
	} );
 
}( mediaWiki, jQuery ) );

/** 
 * Boîtes déroulantes
 * Source : http://fr.wikipedia.org/wiki/MediaWiki:Common.js
 * Licence : selon source (et non la licence utilisée par Poképédia, sauf si identique)
 * Pour [[Modèle:Rouleau]]
 */
var autoCollapse = 2;
var collapseCaption = '[Enrouler]';
var expandCaption = '[Dérouler]';
 
function collapseTable( tableIndex ) {
  var Button = document.getElementById( "collapseButton" + tableIndex );
  var Table = document.getElementById( "collapsibleTable" + tableIndex );
  if ( !Table || !Button ) return false;
 
  var Rows = Table.getElementsByTagName( "tr" ); 
 
  if ( Button.firstChild.data == collapseCaption ) {
    for ( var i = 1; i < Rows.length; i++ ) {
      Rows[i].style.display = "none";
    }
    Button.firstChild.data = expandCaption;
  } else {
    for ( var i = 1; i < Rows.length; i++ ) {
      Rows[i].style.display = Rows[0].style.display;
    }
    Button.firstChild.data = collapseCaption;
  }
}
 
function createCollapseButtons() {
  var tableIndex = 0;
  var NavigationBoxes = new Object();
  var Tables = document.getElementsByTagName( "table" );
 
  for ( var i = 0; i < Tables.length; i++ ) {
    if ( hasClass( Tables[i], "collapsible" ) ) {
      NavigationBoxes[ tableIndex ] = Tables[i];
      Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
      var Button     = document.createElement( "span" );
      var ButtonLink = document.createElement( "a" );
      var ButtonText = document.createTextNode( collapseCaption );
 
      Button.style.styleFloat = "right";
      Button.style.cssFloat = "right";
      Button.style.fontWeight = "normal";
      Button.style.textAlign = "right";
      Button.style.width = "6em";
 
      ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
      ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
      ButtonLink.appendChild( ButtonText );
 
      Button.appendChild( ButtonLink );
 
      var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
      /* only add button and increment count if there is a header row to work with */
      if (Header) {
        Header.insertBefore( Button, Header.childNodes[0] );
        tableIndex++;
      }
    }
  }
 
  for (var i = 0; i < tableIndex; i++) {
    if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) collapseTable( i );
  }
}
/* $(createCollapseButtons); */
addOnloadHook(createCollapseButtons); /* deprecated */