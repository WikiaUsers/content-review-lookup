// Quelle: https://de.wikipedia.org/wiki/MediaWiki:Gadget-Doppel-s-Schreibung.js

/* nur in bestimmten Namensräumen (Artikel-, Bild- und Kategorienamensraum) */
if ( mw.config.get( 'wgNamespaceNumber' ) === 0
  || mw.config.get( 'wgNamespaceNumber' ) === 6
  || mw.config.get( 'wgNamespaceNumber' ) === 14
) {
	$( function() {
		function text_sz_to_ss(text) {
			// Alleinstehende "ß" werden nicht geändert.
			text = text.replace(/([\wäöü])ß/gi, '$1ss').replace(/ß([\wäöü])/gi, 'ss$1');
			text = text.replace(/([\wäöü])ẞ/gi, '$1SS').replace(/ẞ([\wäöü])/gi, 'SS$1');
			return text;
		}

		function node_sz_to_ss(node) {
			if (node.nodeType === 3) { // Node.TEXT_NODE
				var text = text_sz_to_ss(node.data);
				if (text !== node.data) { // odd Gecko rendering error
					node.data = text;
				}
			} else if ( node.nodeType === 1		// Node.ELEMENT_NODE
				 && node.id !== 'editform'	// Nicht das Bearbeitenfeld
				 && node.className !== 'Vorlage_Zitat'	// keine Zitate
				) {
				for (var i = 0 ; i < node.childNodes.length ; i++) {
					node_sz_to_ss(node.childNodes[i]); // rekursives Ablaufen des DOM
				}
			}
		}

		document.title = text_sz_to_ss( document.title );
		node_sz_to_ss( $( '.page-content' ).get(0) ); //with firstHeader, sitenotice and so on
	});
}