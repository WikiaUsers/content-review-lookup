/**
 * ResizableCodeMirror by zsotroav. Developed for the Fandom dev wiki.
 * Please do not modify the live script without prior permission.
 * 
 */

(function () {
    'use strict';

	/* Config options */
	window.dev = window.dev || {};
	window.dev.resizableCM = window.dev.resizableCM || {"S": "300px", "M": "525px", "L": "625px", "XL": "800px"};

	/* Generate button HTML */
	var html = '<div class="group" style="border: 0">';
	for (var item in window.dev.resizableCM) { 
		html += '<span class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement">' +
			'<a class="oo-ui-buttonElement-button" role="button" onclick="resizeCM(\''+ item +'\')">' +
			'<span class="oo-ui-iconElement-icon" style="background: none; text-align: center">'+item+'</span></a></span>'; 
	}

	/* Insert sizing buttons */
	setTimeout(function() {
		if (document.getElementsByClassName("CodeMirror").length > 0) {
			window.dev.resizableCM.mode = "OLD";
			document.getElementById("wikiEditor-section-secondary").innerHTML = html + "</div>";
		} else if (document.getElementsByClassName("cm-scroller").length > 0) {
			window.dev.resizableCM.mode = "NEW";
			document.getElementById("wikiEditor-section-secondary").innerHTML = html + "</div>";
		}
	}, 2000); // Hack - Wait until CM loads

	/* Resizable Code Mirror */
	window.resizeCM = function(size){
		var cm = window.dev.resizableCM.mode == "OLD" ? "CodeMirror" : "cm-scroller";
		
		document.getElementsByClassName(cm)[0].style.height = window.dev.resizableCM[size] || "525px"; // UI default
		window.location.hash = "#random-nonexistent-crap-to-actually-reset-the-location-of-the-window-in-case-it-was-already-set"; 
		window.location.hash = "#wikiEditor-ui-toolbar";
	};
})();