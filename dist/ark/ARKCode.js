// Used by [[Template:ARKCode]]
mw.hook('wikipage.content').add(function() {
	'use strict';
	var main = document.getElementById('ARKCode');
	if (!main) return;

	window.ARKCode = window.ARKCode || {
		text: 'Input',
		visualisation: 'Visualization',
		decodeText: 'Decoded text',
		decode: 'Decode'
	};
	var i18n = window.ARKCode;

	var CSS =
	'#ARKCode #acVisu{' +
		'background-color:black;' +
		'min-width: 10em;' +
		'min-height: 27em;' +
		'display: inline-block;' +
		'vertical-align: top;' +
		'writing-mode: vertical-lr;' +
		'padding: 3px;' +
		'padding-bottom: 8px;' +
	'}' +
	'#ARKCode #acVisu img{' +
		'margin-bottom: -5px;' +
	'}';

	main.innerHTML = '<style>' + CSS + '</style>' +
	'<div style="display:inline-block;margin:0 0.5em;vertical-align:top">' +
		'<div style="font-weight:bold;">' + i18n.text + '</div>' +
		'<textarea id="acText" style="writing-mode: vertical-lr; text-orientation:upright;width: 7em; height: 27em">dasadsdddswadswadsww daadddasdasw dddwdswwdwasdswadsdaasws</textarea>' +
	'</div>' +
	'<div style="display:inline-block;margin:0 0.5em;vertical-align:top">' +
		'<div style="font-weight:bold">' + i18n.visualisation + '</div>' +
		'<div id="acVisu"></div>' +
	'</div>' +
	'<div style="display:inline-block;margin:0 0.5em;vertical-align:top">' +
		'<div style="font-weight:bold">' + i18n.decodeText + '</div>' +
		'<div id="acOutput" style="border:solid 1px darkgreen;background-color:#ccffcc;padding: 1em;margin: 0.5em 0"></div>' +
		'<button type="button" id="acDecode">' + i18n.decode + '</button>' +
	'</div>';

	var acText = document.getElementById('acText');
	var codeRep = document.getElementById('acVisu');
	var acOutput = document.getElementById('acOutput');
	var acDecode = document.getElementById('acDecode');

	acText.addEventListener('keyup', ARKCodeDecode);
	acDecode.addEventListener('click', ARKCodeDecode);

	var ARKCodeImages = [
		'6/6f/ARKCode0.png',
		'b/b3/ARKCode1.png',
		'a/aa/ARKCode2.png',
		'4/40/ARKCode3.png'
	];
	function ARKCodeDecode() {
		var code = acText.value;

		//codeRep.innerHTML = '';

		code = code.replace(/[^wasd \n]/g, '');
		var output = '';
		var codeRepOutput = '';
		var ii = 0;
		var c = 0;
		for (var i = 0; i < code.length; i++) {
			if (code[i] == ' ' || code[i] == '\n') {
				output += ' ';
				ii = 0;
				if (code[i] == '\n') {
					codeRepOutput += '<br/>';
				}
				continue;
			}
			var add = 0;
			switch (code[i]) {
				case 'd':
					add = 1;
					break;
				case 's':
					add = 2;
					break;
				case 'w':
					add = 3;
					break;
			}
			c = c * 4 + add;
	
			codeRepOutput += '<img alt="' + add + '" src="https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/' + ARKCodeImages[add] + '" width="46" height="24">';
	
			if (ii == 3 || i == code.length - 1) {
				ii = 0;
				if (c > 31 && c < 127)
					output += String.fromCharCode(c);
				c = 0;
			} else {
				ii++;
			}
		}
		acOutput.textContent = output;
		codeRep.innerHTML = codeRepOutput;
	}
});