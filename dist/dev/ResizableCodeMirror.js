/**
 * ResizableCodeMirror by zsotroav. Developed for the Fandom dev wiki.
 * Please do not modify the live script without prior permission.
 * 
 */

(function () {
    'use strict';

	/* Config options */
	window.dev = window.dev || {};
	var conf = window.dev.resizableCM || {"S": "300px", "M": "525px", "L": "625px", "XL": "800px"};

	/* Generate button HTML */
	var html = '<div class="group" style="float: right">';
	for (var item in conf) { 
		html += '<span class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement">' +
			'<a class="oo-ui-buttonElement-button" role="button" onclick="resizeCM("'+ item +'")">' +
			'<span class="oo-ui-iconElement-icon" style="background: none; text-align: center">'+item+'</span></a></span>'; 
	}

	/* Insert sizing buttons */
	setTimeout(function() {
		if (document.getElementsByClassName("CodeMirror").length > 0) {
			document.getElementsByClassName("wikiEditor-ui-toolbar")[0].getElementsByClassName("tabs")[0].outerHTML += html + "</div>";
		}
	}, 2000); // Hack - Wait until CM loads

	/* Resizable Code Mirror */
	window.resizeCM = function(size){
		document.getElementsByClassName("CodeMirror")[0].style.height = conf[size] || "525px"; // Default is M which is the UI default
		window.location.hash = "#random-nonexistent-crap-to-actually-reset-the-location-of-the-window-in-case-it-was-already-set"; 
		window.location.hash = "#wikiEditor-ui-toolbar";
	};
})();