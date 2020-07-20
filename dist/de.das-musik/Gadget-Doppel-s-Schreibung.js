// Anwenderbeschreibung siehe [[MediaWiki:Gadget-Doppel-s-Schreibung]]

/*global addOnloadHook, wgNamespaceNumber */

// Die Rechtschreibprüfung (Wikipedia:Helferlein/Rechtschreibprüfung) muss schweizerisch sein
var RP_CH = true;

/* nur in bestimmten Namensräumen (Artikel-, Bild-, Kategorie- und Portalraum) */
if ( wgNamespaceNumber === 0 || wgNamespaceNumber === 6 || wgNamespaceNumber === 14 || wgNamespaceNumber === 100 ) {
	addOnloadHook(function () {
		function text_sz_to_ss(text) {
			// Alleinstehende "ß" werden nicht geändert.
			return text.replace(/([\wäöü])ß/gi, '$1ss').replace(/ß([\wäöü])/gi, 'ss$1');
		}

		function node_sz_to_ss(node) {
			if (node.nodeType === 3) {
				node.data = text_sz_to_ss(node.data);
			} else if ((node.id !== 'editform') && (node.className !== 'Zitat')) {
				for (var i = 0 ; i < node.childNodes.length ; i++) {
					node_sz_to_ss(node.childNodes[i]);
				}
			}
		}

		document.title = text_sz_to_ss(document.title);
		node_sz_to_ss(document.getElementById('content'));
	});
}