(function(mw) {
	'use strict';

	var coloblindSelect;
	var html = '<select id="coloblindSelect" style="font-size:10px;">' +
		'<option>Colorvision</option>' +
		'<option value="deuteranopia">Prota- / Deuteranopia</option>' +
		'<option>Tritanopia</option>' +
	'</select>' +
	'<svg width="0" height="0">' +
		'<defs>' +
			'<filter id="blur" x="-30%" y="-30%" width="160%" height="160%">' +
				'<feGaussianBlur stdDeviation="3" />' +
			'</filter>' +
			'<pattern id="pattern-untameable" width="10" height="10" patternTransform="rotate(135)" patternUnits="userSpaceOnUse">' +
				'<rect width="4" height="10" fill="black"></rect>' +
			'</pattern>' +
			'<filter id="groupStroke">' +
				'<feFlood result="outsideColor" flood-color="black" />' +
				'<feMorphology in="SourceAlpha" operator="dilate" radius="2" />' +
				'<feComposite result="strokeoutline1" in="outsideColor" operator="in" />' +
				'<feComposite result="strokeoutline2" in="strokeoutline1" in2="SourceAlpha" operator="out" />' +
				'<feGaussianBlur in="strokeoutline2" result="strokeblur" stdDeviation="1" />' +
			'</filter>' +
		'</defs>' +
	'</svg>';

	function replaceSVGWithInline() {
		/*
		* Replace all SVG images with inline SVG. source: https://stackoverflow.com/a/43015413/1523086
		*/
		document.querySelectorAll('.svgCreatureMap img').forEach(function(img) {
			var imgID = img.id;
			var imgClass = img.className;
			var imgURL = img.src.substring(0, img.src.indexOf('.svg', 74) + 4);
			fetch(imgURL, {cache:'reload'}).then(function(response) {
				return response.text();
			}).then(function(text) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(text, "text/xml");
				// Get the SVG tag, ignore the rest
				var svg = xmlDoc.getElementsByTagName('svg')[0];
				// Add replaced image's ID to the new SVG
				if (svg !== null && typeof imgID !== 'undefined') {
					svg.setAttribute('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if (typeof imgClass !== 'undefined') {
					svg.classList.add('replaced-svg');
				}
			
				// Remove any invalid XML tags as per http://validator.w3.org
				svg.removeAttribute('xmlns:a');
			
				svg.setAttribute('width', img.getAttribute('width'));
				svg.setAttribute('height', img.getAttribute('height'));
			
				// Unset the absolute positioning of the SVG. Force the element to occupy
				// only as much width as its parent allows, and determine the height automatically
				// using SVG's viewbox.
				svg.setAttribute('style', 'max-width:100%; height: auto');
			
				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
					svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'));
				}
			
				// remove the style-definitions (they're defined on the page), so they're not ambigious when multiple files are on one page
				svg.removeChild(svg.children[0]);
			
				// Replace image with new SVG
				img.parentNode.replaceChild(svg, img);
			});
		});
	}

	function setColorblind() {
		var mode = coloblindSelect.value.toLowerCase();
		var svgMaps = document.getElementsByClassName('replaced-svg');
		if (svgMaps.length === 0) {
			// if svg-files are not yet replaced with inline-code
			replaceSVGWithInline();
		}
		var colorBlindEls = document.getElementsByClassName('colorBlindToggleable');
		Array.from(colorBlindEls).forEach(function(el) {
			// remove other colorblind-classes				
			el.classList.remove('spawningMap-deuteranopia', 'spawningMap-tritanopia');
			if (mode !== 'colorvision')
				el.classList.add('spawningMap-' + mode);
		});
	}

	mw.hook('wikipage.content').add(function($content) {
		var main = $content.find('#colorblind:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
		main.innerHTML = html;
		coloblindSelect = $content.find('#coloblindSelect')[0];
		coloblindSelect.addEventListener('change', setColorblind);
	});
})(window.mediaWiki);