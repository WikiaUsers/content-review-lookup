/* Created by Dan Floyd (aka "Floydman"). */
mw.hook('wikipage.content').add(function() {
	'use strict';
	var vng = document.getElementById('VilleinNumberGenerator');
	var vn = document.getElementById('VilleinNumber');
	if (!(vng || vn)) return;

	var isGenerator = vng ? true : false;
	var data = isGenerator ? {} : vn.dataset;
	var blobColor = "#66CAD9";
	var backColor = "#345885";
	var roundCanvasTwo;
	var pi = Math.PI;
	var html = '<span id="VilleinNumber"></span><br/>' +
		'Number (0-1023): <input type="number" id="base10input" name="base10input" value="462"><br/>' +
		'Panel Width (in pixels): <input type="number" id="inputwidth" name="panelwidth" value="200"><br/>' +
		'<input type="radio" name="layercount" value="1" id="radio1">1 Layer (1 Digit)<br/>' +
		'<input type="radio" name="layercount" value="2" id="radio2" checked>2 Layers (5 Digits)<br/>' +
		'<input type="button" value="Submit" id="inputbutton">';

	if (isGenerator) vng.innerHTML = html;
	var config = {
		base10input: Number(data.base10 || 15),
		layercount: Number(data.layers || 2),
		panelwidth: Number(data.width || 150)
    },
	ele = {
		VilleinNumber: isGenerator ? document.getElementById('VilleinNumber') : vn,
		base10input: document.getElementById('base10input'),
		inputwidth: document.getElementById('inputwidth'),
		radio2: document.getElementById('radio2'),
		inputbutton: document.getElementById('inputbutton'),
		canvasFinal: document.createElement("CANVAS"),
		canvasAllDigits: document.createElement("CANVAS"),
		canvasSingleDigit: document.createElement("CANVAS")
	};
	if (isGenerator) {
		ele.base10input.addEventListener('keyup', enterPressed);
		ele.inputwidth.addEventListener('keyup', enterPressed);
		ele.inputbutton.addEventListener('click', goodNumber);
	} else {
		convert10to4();
	}
	function enterPressed(target) {
		if (target.which === 13) goodNumber();
	}

	function goodNumber() {
		if (Number(ele.base10input.value) >= 0 && Number(ele.base10input.value) <= 1023) {
			convert10to4();
		} else {
			alert("Generated number must be a whole number from 0 to 1023.");
		}
	}

	function convert10to4() {
		var element = ele.VilleinNumber;

		var canvasFinal = ele.canvasFinal;
		canvasFinal.width = isGenerator ? Number(ele.inputwidth.value) : config.panelwidth;
		canvasFinal.height = canvasFinal.width;
		element.appendChild(canvasFinal);

		var canvasAllDigits = ele.canvasAllDigits;
		canvasAllDigits.width = canvasFinal.width / 1.5;
		canvasAllDigits.height = canvasFinal.height / 1.5;

		var canvasSingleDigit = ele.canvasSingleDigit;
		if (isGenerator ? ele.radio2.checked : config.layercount) {
			canvasSingleDigit.width = canvasAllDigits.width * 0.5;
			canvasSingleDigit.height = canvasAllDigits.height * 0.5;
		} else {
			canvasSingleDigit.width = canvasAllDigits.width;
			canvasSingleDigit.height = canvasAllDigits.height;
		}

		var radiusCircle = canvasSingleDigit.width * 0.2;
		var pinch = canvasSingleDigit.width * 0.08;

		// Get the value of the input field.
		var base10 = isGenerator ? Number(ele.base10input.value) : config.base10input;
		// Convert it to base 4.
		var base4 = base10.toString(4);
		// Count the number of digits in the base 4 number.
		var digits = Math.log(base4) * Math.LOG10E + 1 || 0;
		if (base4 === 0 && digits === 0) {
			digits++;
		}
		roundCanvasTwo = 1;
		calculateLayers(digits);
		checkInteger(digits, base4, pinch, radiusCircle);
		drawCanvasFinal(base4, base10);
	}

	function checkInteger(digits, base4, pinch, rc) {
		var CurrentDigit;
		var DigitsLeft = digits;
		var CurrentDigitString;
		if (isGenerator ? ele.radio2.checked : config.layercount) {
			while (DigitsLeft >= -4) {
				CurrentDigitString = String(base4).charAt(DigitsLeft - 1);
				CurrentDigit = Number(CurrentDigitString);
				check4Value(CurrentDigit, pinch, rc);
				DigitsLeft--;
			}
		} else {
			CurrentDigitString = String(base4).charAt(DigitsLeft - 1);
			CurrentDigit = Number(CurrentDigitString);
			check4Value(CurrentDigit, pinch, rc);
		}
	}

	function check4Value(CurrentDigit, pinch, rc) {
		if (CurrentDigit === 0) {
			drawDigitZero(rc);
		} else if (CurrentDigit === 1) {
			drawDigitOne(pinch, rc);
		} else if (CurrentDigit === 2) {
			drawDigitTwo(pinch, rc);
		} else if (CurrentDigit === 3) {
			drawDigitThree(pinch, rc);
		} else {
			drawDigitZero(rc);
		}

		if (isGenerator ? ele.radio2.checked : config.layercount) {
			drawCanvasTwo5Digits();
		} else {
			drawCanvasTwo1Digit();
		}
	}

	function drawCanvasTwo5Digits() {
		var ctx = ele.canvasAllDigits.getContext("2d");
		var img = ele.canvasSingleDigit;
		var h2 = ele.canvasAllDigits.height * 0.5;
		var h4 = ele.canvasAllDigits.height * 0.25;
		var w2 = ele.canvasAllDigits.width * 0.5;
		var w4 = ele.canvasAllDigits.width * 0.25;

		// Place each digit in the correct place.
		if (roundCanvasTwo === 1) {
			ctx.drawImage(img, w4, h4, w2, h2);
		} else if (roundCanvasTwo === 4) {
			ctx.drawImage(img, 0, h2, w2, h2);
		} else if (roundCanvasTwo === 3) {
			ctx.drawImage(img, w2, h2, w2, h2);
		} else if (roundCanvasTwo === 2) {
			ctx.drawImage(img, w2, 0, w2, h2);
		} else if (roundCanvasTwo === 5) {
			ctx.drawImage(img, 0, 0, w2, h2);
		}

		roundCanvasTwo++;
	}

	function drawCanvasTwo1Digit() {
		var ctx = ele.canvasAllDigits.getContext("2d");
		var img = ele.canvasSingleDigit;

		ctx.drawImage(img, 0, 0, ele.canvasAllDigits.width, ele.canvasAllDigits.height);
	}

	function drawCanvasFinal(base4, base10) {
		var ctx = ele.canvasFinal.getContext("2d");
		var img = ele.canvasAllDigits;
		var cfw = ele.canvasFinal.width;
		var cfh = ele.canvasFinal.height;
		ctx.strokeStyle = blobColor;

		ctx.clearRect(0, 0, cfw, cfh);
		ctx.drawImage(img, (cfw - img.width) * 0.5, (cfh - img.height) * 0.5);
		ctx.translate(cfw * 0.5, cfh * 0.5);

		ctx.rotate(-pi * 0.25);

		ctx.translate(-cfw * 0.5,-cfh * 0.5);
		ctx.clearRect(0, 0, cfw, cfh);
		ctx.drawImage(img, (cfw - img.width) * 0.5, (cfh - img.height) * 0.5);
		ctx.lineWidth = ele.canvasAllDigits.width / 25;
		ctx.strokeRect((cfw - img.width) * 0.5, (cfh - img.height) * 0.5, img.width, img.height);
		ctx.globalCompositeOperation = "destination-over";
		ctx.fillStyle = backColor;
		ctx.fillRect((cfw - img.width) * 0.5, (cfh - img.height) * 0.5, img.width, img.height);

		// Add tooltip to canvas.
		ele.canvasFinal.title = "\"".concat(String(base10),"\" in Base 10","\r","\"",String(base4),"\" in Base 4");
	}

	function drawDigitZero (rc) {
		var ctx = ele.canvasSingleDigit.getContext("2d");
		var h2 = ele.canvasSingleDigit.height * 0.5;
		var w2 = ele.canvasSingleDigit.width * 0.5;

		// Clear the canvas and set settings.
		ctx.clearRect(0, 0, ele.canvasSingleDigit.width, ele.canvasSingleDigit.height);
		ctx.fillStyle = blobColor;
		ctx.strokeStyle = "rgba(0,0,0,0)";

		// Draw the middle circle.
		ctx.beginPath();
		ctx.arc(w2, h2, rc, 0, 2 * pi, true);

		// Draw the top circle.
		ctx.moveTo(w2 - rc ,0);
		ctx.arc(w2, 0, rc, pi, 2 * pi, true);

		// Draw the left circle.
		ctx.moveTo(0, w2 + rc);
		ctx.arc(0, w2, rc, pi * 0.5, 3 * (pi * 0.5), true);

		// Draw the bottom circle.
		ctx.moveTo(w2 - rc, ele.canvasSingleDigit.height);
		ctx.arc(w2, ele.canvasSingleDigit.height, rc, pi, 2 * pi, false);

		// Draw the right circle.
		ctx.moveTo(ele.canvasSingleDigit.width, w2 - rc);
		ctx.arc(ele.canvasSingleDigit.width, w2, rc, 3 * (pi * 0.5), pi * 0.5, true);

		ctx.fill();
		ctx.stroke();
	}

	function drawDigitOne(pinch, rc) {
		var ctx = ele.canvasSingleDigit.getContext("2d");
		var h2 = ele.canvasSingleDigit.height * 0.5;
		var h4 = ele.canvasSingleDigit.height * 0.25;
		var h8 = ele.canvasSingleDigit.height * 0.125;
		var w2 = ele.canvasSingleDigit.width * 0.5;

		// Clear the canvas and set settings.
		ctx.clearRect(0, 0, ele.canvasSingleDigit.width, ele.canvasSingleDigit.height);
		ctx.fillStyle = blobColor;
		ctx.strokeStyle = "rgba(0,0,0,0)";

		// Draw the number one.
		ctx.beginPath();
		ctx.moveTo(w2 - rc, 0);
		ctx.bezierCurveTo(w2 - rc, h8, (w2 - rc) + pinch, h8, (w2 - rc) + pinch, h4);
		ctx.bezierCurveTo((w2 - rc) + pinch, h8 * 3, w2 - rc, h8 * 3, w2 - rc, h2);
		ctx.arc(w2, h2, rc, pi, 0, true);
		ctx.moveTo(w2 + rc, h2);
		ctx.bezierCurveTo(w2 + rc, h8 * 3, (w2 + rc) - pinch, h8 * 3, (w2 + rc) - pinch, h4);
		ctx.bezierCurveTo((w2 + rc) - pinch, h8, w2 + rc, h8, w2 + rc, 0);
		ctx.lineTo(w2 - rc, 0);

		// Draw the left circle.
		ctx.moveTo(0, w2 + rc);
		ctx.arc(0, w2, rc, pi * 0.5, 3 * (pi * 0.5), true);

		// Draw the bottom circle.
		ctx.moveTo(w2 - rc, ele.canvasSingleDigit.height);
		ctx.arc(w2, ele.canvasSingleDigit.height, rc, pi, 2 * pi, false);

		// Draw the right circle.
		ctx.moveTo(ele.canvasSingleDigit.width, w2 - rc);
		ctx.arc(ele.canvasSingleDigit.width, w2, rc, 3 * (pi * 0.5), pi * 0.5, true);

		ctx.fill();
		ctx.stroke();
	}

	function drawDigitTwo(pinch, rc) {
		var ctx = ele.canvasSingleDigit.getContext("2d");
		var h2 = ele.canvasSingleDigit.height * 0.5;
		var h4 = ele.canvasSingleDigit.height * 0.25;
		var h8 = ele.canvasSingleDigit.height * 0.125;
		var w2 = ele.canvasSingleDigit.width * 0.5;
		var w4 = ele.canvasSingleDigit.width * 0.25;
		var w8 = ele.canvasSingleDigit.width * 0.125;

		// Clear the canvas and set settings.
		ctx.clearRect(0, 0, ele.canvasSingleDigit.width, ele.canvasSingleDigit.height);
		ctx.fillStyle = blobColor;
		ctx.strokeStyle = "rgba(0,0,0,0)";

		// Draw the number two.
		ctx.beginPath();
		ctx.moveTo(w2 - rc, ele.canvasSingleDigit.height);
		ctx.bezierCurveTo(w2 - rc, h8 * 7, (w2 - rc) + pinch, h8 * 7, (w2 - rc) + pinch, h4 * 3);
		ctx.bezierCurveTo((w2 - rc) + pinch, h8 * 5, w2 - rc, h8 * 5, w2 - rc, h2);
		ctx.arc(w2, h2, rc, pi, 3 * pi * 0.5, false);
		ctx.bezierCurveTo(w8 * 5, h2 - rc, w8 * 5, (h2 - rc) + pinch, w4 * 3, (h2 - rc) + pinch);
		ctx.bezierCurveTo(w8 * 7, (h2 - rc) + pinch, w8 * 7, (h2 - rc), ele.canvasSingleDigit.width, h2 - rc);
		ctx.lineTo(ele.canvasSingleDigit.width, h2 + rc);
		ctx.bezierCurveTo(w8 * 7, h2 + rc, w8 * 7, (h2 + rc) - pinch, w4 * 3, (h2 + rc) - pinch);
		ctx.bezierCurveTo(w8 * 5, (h2 + rc) - pinch, w8 * 5, (h2 + rc), w2, h2 + rc);
		ctx.lineTo(w2 + rc, h2);
		ctx.bezierCurveTo(w2 + rc, h8 * 5, (w2 + rc) - pinch, h8 * 5, (w2 + rc) - pinch, h4 * 3);
		ctx.bezierCurveTo((w2 + rc) - pinch, h8 * 7, w2 + rc, h8 * 7, w2 + rc, ele.canvasSingleDigit.height);
		ctx.lineTo(w2 - rc, ele.canvasSingleDigit.height);

		// Draw the left circle.
		ctx.moveTo(0, w2 + rc);
		ctx.arc(0, w2, rc, pi * 0.5, 3 * (pi * 0.5), true);

		// Draw the top circle.
		ctx.moveTo(w2 - rc, 0);
		ctx.arc(w2, 0, rc, pi, 2 * pi, true);

		ctx.fill();
		ctx.stroke();
	}
	
	function drawDigitThree(pinch, rc) {
		var ctx = ele.canvasSingleDigit.getContext("2d");
		var h2 = ele.canvasSingleDigit.height * 0.5;
		var h4 = ele.canvasSingleDigit.height * 0.25;
		var h8 = ele.canvasSingleDigit.height * 0.125;
		var w2 = ele.canvasSingleDigit.width * 0.5;
		var w4 = ele.canvasSingleDigit.width * 0.25;
		var w8 = ele.canvasSingleDigit.width * 0.125;

		// Clear the canvas and set settings.
		ctx.clearRect(0, 0, ele.canvasSingleDigit.width, ele.canvasSingleDigit.height);
		ctx.fillStyle = blobColor;
		ctx.strokeStyle = "rgba(0,0,0,0)";

		// Draw the number three.
		ctx.beginPath();
		ctx.moveTo(w2 - rc, 0);
		ctx.bezierCurveTo(w2 - rc, h8, (w2 - rc) + pinch, h8, (w2 - rc) + pinch, h4);
		ctx.bezierCurveTo((w2 - rc) + pinch, h8 * 3, w2 - rc, h8 * 3, w2 - rc, h2);
		ctx.lineTo(w2,h2-rc);
		ctx.bezierCurveTo(w8 * 3, h2 - rc, w8 * 3, (h2 - rc) + pinch, w4, (h2 - rc) + pinch);
		ctx.bezierCurveTo(w8, (h2 - rc) + pinch, w8, (h2 - rc), 0, h2 - rc);
		ctx.lineTo(0, h2 + rc);
		ctx.bezierCurveTo(w8, h2 + rc, w8, (h2 + rc) - pinch, w4 , (h2 + rc) - pinch);
		ctx.bezierCurveTo(w8 * 3, (h2 + rc) - pinch, w8 * 3, (h2 + rc), w2, h2 + rc);
		ctx.bezierCurveTo(w8 * 5, (h2 + rc), w8 * 5, (h2 + rc) - pinch, w4 * 3, (h2 + rc) - pinch);
		ctx.bezierCurveTo(w8 * 7, (h2 + rc) - pinch, w8 * 7, h2 + rc, ele.canvasSingleDigit.width, h2 + rc);
		ctx.lineTo(ele.canvasSingleDigit.width, h2 - rc);
		ctx.bezierCurveTo(w8 * 7, (h2 - rc), w8 * 7, (h2 - rc) + pinch, w4 * 3, (h2 - rc) + pinch);
		ctx.bezierCurveTo(w8 * 5, (h2 - rc) + pinch, w8 * 5, h2 - rc, w2, h2 - rc);
		ctx.lineTo(w2 + rc, h2);
		ctx.bezierCurveTo(w2 + rc, h8 * 3, (w2 + rc) - pinch, h8 * 3, (w2 + rc) - pinch, h4);
		ctx.bezierCurveTo((w2 + rc) - pinch, h8, w2 + rc, h8, w2 + rc, 0);
		ctx.lineTo(w2 - rc, 0);

		// Draw the bottom circle.
		ctx.moveTo(w2 - rc, ele.canvasSingleDigit.height);
		ctx.arc(w2, ele.canvasSingleDigit.height, rc, pi, 2 * pi, false);

		ctx.fill();
		ctx.stroke();
	}

	// This function is currently unused.
	function calculateLayers(digits) {
		/* Calculates and displays the number of layers necessary to display the number in Villein numerals.
		Layers are added from the inside out, and the number of digits added to the increase
		in digits per layer increases by 4 each time. This script will work for any positive
		whole number input, but the whole tool is capped at 1023 because that is the largest number
		that can be displayed on Obduction's Villein control panels. That means the largest output you'll
		see is 2. */

		var s1 = 1;
		var rounds = 1;
		while (s1 < digits) {
			s1 = s1 + (4 * rounds);
			rounds++;
		}
	}
});