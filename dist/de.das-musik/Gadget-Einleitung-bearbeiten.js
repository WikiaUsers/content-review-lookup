// Anwenderbeschreibung siehe [[MediaWiki:Gadget-Einleitung-bearbeiten]]

/* Autoren:
* ursprünglich: [[:en:User:Pile0nades]]
* Erweitert von: Maciej Jaros [[:pl:User:Nux]] (siehe http://pl.wikipedia.org/wiki/MediaWiki:Monobook.js)
* Korrigiert von: [[Benutzer:TMg]] */

/*global addOnloadHook, wgIsArticle */

if (wgIsArticle) {
	addOnloadHook(function () {
		// Neither run on fully-protected pages (which lack ca-edit) nor modify the same page twice
		if ((document.getElementById("ca-edit") == null) || 
                    (document.getElementById('firstsectionedit') !== null)) {
			return;
		}

		// if there are no edit-section links then stop
		var spans = document.getElementsByTagName("span");
		for (var i = 0 ; i < spans.length ; i++) {
			if (spans[i].className === 'editsection') {
				break;
			}
		}
		if (i >= spans.length) {
			return;
		}

		// get first header element
		var fst_h1 = document.getElementsByTagName("h1")[0];

		// Creating elements
		// create span
		var span = document.createElement("SPAN");
		span.className = 'editsection';
		span.id = 'firstsectionedit';

		// create link
		var link = document.createElement("A");
		link.href = document.getElementById("ca-edit").getElementsByTagName("a")[0].href + '&section=0';
		link.title = "Abschnitt bearbeiten: Einleitung";
		link.appendChild(document.createTextNode('Bearbeiten'));
		// append link and stuff to span
		span.appendChild(document.createTextNode('['));
		span.appendChild(link);
		span.appendChild(document.createTextNode(']'));

		// Insert span container into the DOM before the h1
		fst_h1.insertBefore(document.createTextNode(" "), fst_h1.firstChild);
		fst_h1.insertBefore(span, fst_h1.firstChild);
	});
}