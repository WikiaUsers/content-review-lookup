mw.hook('wikipage.content').add(function($content) {
	'use strict';
	var main = $content.find('#GauntletMazeSolver')[0];
	if (!main) return;
	main.innerHTML = '<div id="leftDiv" style="float:left">' +
		'<div id="mainDiv"></div>' +
		'<div id="pathDiv">' +
			'<label><div class="radioButton" id="leftPathDiv"><input id="radioPath0" type="radio" name="path" checked></input></div></label>' +
			'<label><div class="radioButton" id="middlePathDiv"><input id="radioPath1" type="radio" name="path"></input></div></label>' +
			'<label><div class="radioButton" id="rightPathDiv"><input id="radioPath2" type="radio" name="path"></input></div></label>' +
		'</div>' +
	'</div>' +
	'<div id="middleDiv" style="float:left; width:20px">&nbsp;</div>' +
	'<div id="rightDiv" style="float:left">' +
	'<textarea id="solutionarea" rows="4" cols="50">Your solution will be generated here.</textarea>' +
	'<p><span id="solutionTD"></span></p>' +
	'</div>';
	var allInstructions = {
		rotateMazeClockwise: "Rotate whole maze once clockwise.",
		rotateMaze2Times: "Rotate whole maze twice either clockwise or counterclockwise.",
		rotateMazeCounterclockwise: "Rotate whole maze once counterclockwise.",
		rotateInsertClockwise: "Rotate insert once clockwise.",
		rotateInsert2Times: "Rotate insert twice either clockwise or counterclockwise.",
		rotateInsertCounterclockwise: "Rotate insert once counterclockwise.",
		swapToMaray: "Swap insert to Maray.",
		swapToHunrath: "Swap insert to Hunrath.",
		tripleSwapToMaray: "Go to triple-swap area and swap to Maray. Return to the Maze.",
		tripleSwapToHunrath: "Go to triple-swap area and swap to Hunrath. Return to insert rotator."
	};
	var error = {
		pathError: "Path Error!\nPath value is not between 0 and 2",
		baseRotationError: "Base Rotation Error!\nBase Rotation value is not between 0 and 3",
		insertRotationError: "Insert Rotation Error!\nInsert Rotation value is not between 0 and 3",
		rotateBaseError: "Error in function \"rotateBase\"",
		correctSolveRotationError: "Error in function \"correctSolveRotation\"",
		rotateInsertToError: "Error in function \"rotateInsertTo\"",
		rotateBaseToError: "Error in function \"rotateBaseTo\""
	};
	var finalCanvas, finalCanvasCenter, finalCanvasThird, baseCanvas, baseCanvasCenter, baseDiameter, baseRadius, insertRadius, insertDistance, baseAngle, insertAngle, insertDiameter, base, path, rotateIconX, rotateIconY, rotateIconWidth, rotateIconHeight, swapIconX, swapIconY, swapIconWidth, swapIconHeight, lineWidthValue, swapSphere0, swapSphere1, ctx, stepNumber, resFinal, currentInstruction, stepImage;
	var insertCanvas = [];
	var insert = [];
	var locale = [];
	var absoluteLocale = [];
	var rotateIconAlreadyClicked = 1;
	var swapIconAlreadyClicked = 0;
	var swapSphere0Selected = 0;
	var rotateIcon = [
		new Image(),
		new Image()
	];
	var swapIcon = [
		new Image(),
		new Image()
	];
	/* [[File:MarayMazeRotateIcon.png]] [[File:MarayMazeRotateIconInv.png]] */
	/* [[File:MarayMazeSwapIcon.png]] [[File:MarayMazeSwapIconInv.png]] */
	rotateIcon[0].src = 'https://static.wikia.nocookie.net/obduction_gamepedia/images/a/ae/MarayMazeRotateIcon.png';
	rotateIcon[1].src = 'https://static.wikia.nocookie.net/obduction_gamepedia/images/4/4a/MarayMazeRotateIconInv.png';
	swapIcon[0].src = 'https://static.wikia.nocookie.net/obduction_gamepedia/images/5/5f/MarayMazeSwapIcon.png';
	swapIcon[1].src = 'https://static.wikia.nocookie.net/obduction_gamepedia/images/1/1c/MarayMazeSwapIconInv.png';

	var element = {
		mainDiv: $content.find('#mainDiv')[0],
		solutionarea: $content.find('#solutionarea')[0],
		solutionTD: $content.find('#solutionTD')[0]
	};

	pageLoad();

	//window.onfocus = drawCanvases();
	$content.find('#leftPathDiv')[0].addEventListener('click', drawCanvases);
	$content.find('#middlePathDiv')[0].addEventListener('click', drawCanvases);
	$content.find('#rightPathDiv')[0].addEventListener('click', drawCanvases);

	function pageLoad() {
		// Start canvas info.
		finalCanvas = document.createElement("canvas");
		finalCanvas.addEventListener("click", canvasClicked);
		finalCanvas.width = 600;
		finalCanvas.height = finalCanvas.width * (2 / 3);
		finalCanvasCenter = finalCanvas.width / 2;
		finalCanvasThird = finalCanvas.width / 3;
	
		baseCanvas = document.createElement("canvas");
		baseCanvas.width = finalCanvas.height;
		baseCanvas.height = baseCanvas.width;
		baseCanvasCenter = baseCanvas.width / 2;
	
		for (var i = 0; i < 5; i++) {
			insertCanvas[i] = document.createElement("canvas");
			insertCanvas[i].height = insertCanvas[i].width = baseCanvas.width / 3;
	
			insertCanvas[i].center = insertCanvas[i].width / 2;
		}
		// End canvas info.
	
		baseDiameter = baseCanvas.width * 0.9;
		baseRadius = baseDiameter / 2;
		//var baseX = finalCanvasThird;
		//var baseY = finalCanvasCenter;
		insertDiameter = baseDiameter / 3;
		insertRadius = insertDiameter / 2;
		insertDistance = baseDiameter * (19 / 75);
		baseAngle = Math.asin(18 / 375);
		insertAngle = Math.asin(18 / 125);
		//var squareLength = insertDiameter / Math.sqrt(2);
		//var squareStartPoint = (insertCanvas[0].width - squareLength) / 2;
	
		// Start input variable creation.
		base = { rotation: 0 };
		path = 0;
		absoluteLocale[0] = { x: finalCanvasThird - insertCanvas[0].width / 2, y: finalCanvas.height / 2 - insertDistance - insertCanvas[0].width / 2 };
		absoluteLocale[1] = { x: finalCanvas.height / 2 + insertDistance - insertCanvas[1].width / 2, y: finalCanvasThird - insertCanvas[1].width / 2 };
		absoluteLocale[2] = { x: finalCanvasThird - insertCanvas[2].width / 2, y: finalCanvas.height / 2 + insertDistance - insertCanvas[2].width / 2 };
		absoluteLocale[3] = { x: finalCanvas.height / 2 - insertDistance - insertCanvas[3].width / 2, y: finalCanvasThird - insertCanvas[3].width / 2 };
		absoluteLocale[0].end = { x: finalCanvasThird - insertCanvas[0].width / 2 + insertCanvas[0].width, y: finalCanvas.height / 2 - insertDistance - insertCanvas[0].width / 2 + insertCanvas[0].width };
		absoluteLocale[1].end = { x: finalCanvas.height / 2 + insertDistance - insertCanvas[1].width / 2 + insertCanvas[1].width, y: finalCanvasThird - insertCanvas[1].width / 2 + insertCanvas[1].width };
		absoluteLocale[2].end = { x: finalCanvasThird - insertCanvas[2].width / 2 + insertCanvas[2].width, y: finalCanvas.height / 2 + insertDistance - insertCanvas[2].width / 2 + insertCanvas[2].width };
		absoluteLocale[3].end = { x: finalCanvas.height / 2 - insertDistance - insertCanvas[3].width / 2 + insertCanvas[3].width, y: finalCanvasThird - insertCanvas[3].width / 2 + insertCanvas[3].width };
		absoluteLocale[0].center = { x: (absoluteLocale[0].end.x + absoluteLocale[0].x) / 2, y: (absoluteLocale[0].end.y + absoluteLocale[0].y) / 2 };
		absoluteLocale[1].center = { x: (absoluteLocale[1].end.x + absoluteLocale[1].x) / 2, y: (absoluteLocale[1].end.y + absoluteLocale[1].y) / 2 };
		absoluteLocale[2].center = { x: (absoluteLocale[2].end.x + absoluteLocale[2].x) / 2, y: (absoluteLocale[2].end.y + absoluteLocale[2].y) / 2 };
		absoluteLocale[3].center = { x: (absoluteLocale[3].end.x + absoluteLocale[3].x) / 2, y: (absoluteLocale[3].end.y + absoluteLocale[3].y) / 2 };
		calculateLocations();
		locale[4] = { x: finalCanvasThird * 2 + insertDistance - insertCanvas[0].width / 2, y: finalCanvas.height / 2 + insertDistance - insertCanvas[0].width / 2 };
		locale[4].end = { x: finalCanvasThird * 2 + insertDistance - insertCanvas[0].width / 2 + insertCanvas[0].width, y: finalCanvas.height / 2 + insertDistance - insertCanvas[0].width / 2 + insertCanvas[0].width };
		locale[4].center = { x: (locale[4].end.x + locale[4].x) / 2, y: (locale[4].end.y + locale[4].y) / 2 };
		insert[0] = { location: 4, rotation: 1, solveLocation: 4, solveRotation: 1, x: 0, y: 0 };
		insert[1] = { location: 0, rotation: 2, solveLocation: 0, solveRotation: 2, x: 0, y: 0 };
		insert[2] = { location: 2, rotation: 1, solveLocation: 2, solveRotation: 1, x: 0, y: 0 };
		insert[3] = { location: 1, rotation: 3, solveLocation: 1, solveRotation: 3, x: 0, y: 0 };
		insert[4] = { location: 3, rotation: 2, solveLocation: 3, solveRotation: 2, x: 0, y: 0 };
	
		updateSphereCoordinates();
		// End input variable creation.
	
		rotateIconX = locale[4].x;
		rotateIconY = finalCanvas.height / 10;
		rotateIconWidth = insertDiameter;
		rotateIconHeight = insertDiameter / 2.5;
		swapIconX = rotateIconX;
		swapIconY = rotateIconY + finalCanvas.height / 7.5;
		swapIconWidth = insertDiameter;
		swapIconHeight = insertDiameter / 2.5;
	
		lineWidthValue = 1;
	
		drawCanvases();
	
	}
	
	function calculateLocations() {
		var map = [
			[0, 1, 2, 3],
			[1, 2, 3, 0],
			[2, 3, 0, 1],
			[3, 0, 1, 2]
		];
		var m = map[base.rotation];
		locale[0] = absoluteLocale[m[0]];
		locale[1] = absoluteLocale[m[1]];
		locale[2] = absoluteLocale[m[2]];
		locale[3] = absoluteLocale[m[3]];
	}
	
	function updateSphereCoordinates() {
		calculateLocations();
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				if (insert[i].location == j) {
					insert[i].x = locale[j].x;
					insert[i].y = locale[j].y;
				}
			}
		}
	}
	
	function drawCanvases() {
		element.mainDiv.innerHTML = "";
	
		drawInsert0();
		drawInsert1();
		drawInsert2();
		drawInsert3();
		drawInsert4();
		drawBase();
		drawFinal();

		rotateIcon[1].addEventListener("load", function() {
			ctx.drawImage(rotateIcon[1], rotateIconX, rotateIconY, rotateIconWidth, rotateIconHeight);
		});
		swapIcon[0].addEventListener("load", function() {
			ctx.drawImage(swapIcon[0], swapIconX, swapIconY, rotateIconWidth, rotateIconHeight);
		});

		element.mainDiv.removeChild(baseCanvas);
		element.mainDiv.removeChild(insertCanvas[0]);
		element.mainDiv.removeChild(insertCanvas[1]);
		element.mainDiv.removeChild(insertCanvas[2]);
		element.mainDiv.removeChild(insertCanvas[3]);
		element.mainDiv.removeChild(insertCanvas[4]);
	
		initialize();
	}
	
	function canvasClicked(evt) {
		var mouseX = evt.clientX - finalCanvas.getBoundingClientRect().left;
		var mouseY = evt.clientY - finalCanvas.getBoundingClientRect().top;
	
		clickedOnLocation(mouseX, mouseY);
	}
	
	
	function clickedOnLocation(mouseX, mouseY) {
		if (Math.sqrt((mouseX - absoluteLocale[0].center.x) * (mouseX - absoluteLocale[0].center.x) + (mouseY - absoluteLocale[0].center.y) * (mouseY - absoluteLocale[0].center.y)) < insertRadius) {
			absoluteLocationClicked(0);
		} else if (Math.sqrt((mouseX - absoluteLocale[1].center.x) * (mouseX - absoluteLocale[1].center.x) + (mouseY - absoluteLocale[1].center.y) * (mouseY - absoluteLocale[1].center.y)) < insertRadius) {
			absoluteLocationClicked(1);
		} else if (Math.sqrt((mouseX - absoluteLocale[2].center.x) * (mouseX - absoluteLocale[2].center.x) + (mouseY - absoluteLocale[2].center.y) * (mouseY - absoluteLocale[2].center.y)) < insertRadius) {
			absoluteLocationClicked(2);
		} else if (Math.sqrt((mouseX - absoluteLocale[3].center.x) * (mouseX - absoluteLocale[3].center.x) + (mouseY - absoluteLocale[3].center.y) * (mouseY - absoluteLocale[3].center.y)) < insertRadius) {
			absoluteLocationClicked(3);
		} else if (Math.sqrt((mouseX - locale[4].center.x) * (mouseX - locale[4].center.x) + (mouseY - locale[4].center.y) * (mouseY - locale[4].center.y)) < insertRadius) {
			absoluteLocationClicked(4);
		} else if (mouseX >= rotateIconX && mouseX <= rotateIconX + rotateIconWidth && mouseY >= rotateIconY && mouseY <= rotateIconY + rotateIconHeight) {
			rotateIconClicked();
		} else if (mouseX >= swapIconX && mouseX <= swapIconX + swapIconWidth && mouseY >= swapIconY && mouseY <= swapIconY + swapIconHeight) {
			swapIconClicked();
		} else if (Math.sqrt((mouseX - baseCanvasCenter) * (mouseX - baseCanvasCenter) + (mouseY - baseCanvasCenter) * (mouseY - baseCanvasCenter)) < baseRadius) {
			baseClicked();
		}
	}
	
	function swapSpheres(sphere0, sphere1) {
		var firstLocation = sphere0.location;
		sphere0.location = sphere1.location;
		sphere1.location = firstLocation;
		swapSphere0Selected = 0;
		updateSphereCoordinates();
		drawCanvases();
	}
	
	function absoluteLocationClicked(index) {
		var map = [
			[0, 3, 2, 1],
			[1, 0, 3, 2],
			[2, 1, 0, 3],
			[3, 2, 1, 0],
			[4, 4, 4, 4]
		];
		if (rotateIconAlreadyClicked === 1) {
			for (var i = 0; i < 5; i++) {
				if (insert[i].location == map[index][base.rotation]) {
					insert[i].rotation++;
					correctRotation(insert[i]);
				}
			}
		}
	
		if (swapIconAlreadyClicked === 1) {
			for (var j = 0; j < 5; j++) {
				if (insert[j].location == map[index][base.rotation]) {
					if (swapSphere0Selected === 0) {
						swapSphere0 = insert[j];
						swapSphere0Selected = 1;
						return;
					} else if (swapSphere0Selected === 1) {
						swapSphere1 = insert[j];
						swapSpheres(swapSphere0, swapSphere1);
						return;
					}
				}
			}
		}
		updateSphereCoordinates();
		drawCanvases();
	}
	
	function baseClicked() {
		if (rotateIconAlreadyClicked === 1) {
			var map = [3, 0, 1, 2, 4];
			base.rotation++;
			correctRotation(base);
			for (var i = 0; i < 5; i++) {
				insert[i].location = map[insert[i].location];
			}
			drawCanvases();
		}
	}
	
	function rotateIconClicked() {
		if (rotateIconAlreadyClicked === 0) {
			swapSphere0Selected = 0;
			rotateIconAlreadyClicked = 1;
			swapIconAlreadyClicked = 0;
			drawFinal();
		}
	}
	
	function swapIconClicked() {
		if (swapIconAlreadyClicked === 0) {
			rotateIconAlreadyClicked = 0;
			swapIconAlreadyClicked = 1;
			drawFinal();
		}
	}
	
	function checkRotation(item, ctx) {
		for (var i = 0; i < 4; i++) {
			if (item.rotation == i) {
				return ctx.rotate(Math.PI * (i / 2));
			}
		}
	}
	
	function uncheckRotation(item, ctx) {
		for (var i = 0; i < 4; i++) {
			if (item.rotation == i) {
				return ctx.rotate(Math.PI * (-i / 2));
			}
		}
	}
	
	function drawBase() {
		baseCanvas.width = baseCanvas.width;
		element.mainDiv.appendChild(baseCanvas);
		var ctx = baseCanvas.getContext("2d");
		ctx.translate(baseCanvasCenter, baseCanvasCenter);
		checkRotation(base, ctx);
		ctx.lineWidth = lineWidthValue;
	
		// Draw right base piece.
		ctx.beginPath();
		ctx.arc(0, 0, baseRadius, baseAngle - Math.PI / 2, (Math.PI / 2) - baseAngle);
		ctx.arc(0, insertDistance, insertRadius, (Math.PI / 2) - insertAngle, insertAngle, true);
		ctx.lineTo(baseDiameter * (214.807 / 750), baseDiameter * (208.24 / 750));
		ctx.arcTo(baseDiameter * (247.323 / 750), baseDiameter * (208.24 / 750), baseDiameter * (273.899 / 750), baseDiameter * (181.664 / 750), baseDiameter * (78.5 / 750));
		ctx.lineTo(baseDiameter * (302.132 / 750), baseDiameter * (150.261 / 750));
		ctx.arcTo(baseDiameter * (332.234 / 750), baseDiameter * (116.778 / 750), baseDiameter * (300.348 / 750), baseDiameter * (84.99 / 750), baseDiameter * (47.51 / 750));
		ctx.arc(insertDistance, 0, insertRadius, (Math.PI / 4) - insertAngle, insertAngle - (Math.PI / 2), true);
		ctx.lineTo(baseDiameter * (207.906 / 750), baseDiameter * (-145.164 / 750));
		ctx.arcTo(baseDiameter * (207.906 / 750), baseDiameter * (-208.235 / 750), baseDiameter * (144.87 / 750), baseDiameter * (-208.235 / 750), baseDiameter * (63.04 / 750));
		ctx.arc(0, -insertDistance, insertRadius, -insertAngle, insertAngle - (Math.PI / 2), true);
		ctx.closePath();
		ctx.stroke();
	
		// Draw bottom-left base piece.
		ctx.beginPath();
		ctx.arc(0, 0, baseRadius, Math.PI / 2 + baseAngle, Math.PI - baseAngle);
		ctx.arc(-insertDistance, 0, insertRadius, Math.PI - insertAngle, insertAngle, true);
		ctx.arcTo(baseDiameter * (-18 / 750), baseDiameter * (18 / 750), baseDiameter * (-18 / 750), baseDiameter * (66.362 / 750), (baseDiameter * (66.362 / 750)) - (baseDiameter * (18 / 750)));
		ctx.arc(0, insertDistance, insertRadius, (-Math.PI / 2) - insertAngle, (Math.PI / 2) + insertAngle, true);
		ctx.closePath();
		ctx.stroke();
	
		// Draw top-left base piece.
		ctx.beginPath();
		ctx.arc(0, 0, baseRadius, Math.PI + baseAngle, (-Math.PI / 2) - baseAngle);
		ctx.arc(0, -insertDistance, insertRadius, (-Math.PI / 2) - insertAngle, Math.PI + insertAngle, true);
		ctx.lineTo(baseDiameter * (-215.095 / 750), baseDiameter * (-208.235 / 750));
		ctx.arcTo(baseDiameter * (-250.221 / 750), baseDiameter * (-208.235 / 750), baseDiameter * (-273.705 / 750), baseDiameter * (-181.879 / 750), baseDiameter * (79.1 / 750));
		ctx.lineTo(baseDiameter * (-302.26 / 750), baseDiameter * (-150.117 / 750));
		ctx.arcTo(baseDiameter * (-332.234 / 750), baseDiameter * (-116.778 / 750), baseDiameter * (-300.642 / 750), baseDiameter * (-84.968 / 750), baseDiameter * (47.42 / 750));
		ctx.arc(-insertDistance, 0, insertRadius, (-Math.PI * (3 / 4)) - insertAngle, Math.PI + insertAngle, true);
		ctx.closePath();
		ctx.stroke();
	
		// Draw middle base piece.
		ctx.beginPath();
		ctx.arc(0, -insertDistance, insertRadius, Math.PI - insertAngle, insertAngle, true);
		ctx.lineTo(baseDiameter * (144.87 / 705), baseDiameter * (-172.195 / 750));
		ctx.arcTo(baseDiameter * (171.885 / 750), baseDiameter * (-172.195 / 750), baseDiameter * (171.885 / 750), baseDiameter * (-145.164 / 750), baseDiameter * (25.29 / 750));
		ctx.arc(insertDistance, 0, insertRadius, (-Math.PI / 2) - insertAngle, (Math.PI / 4) + insertAngle, true);
		ctx.lineTo(baseDiameter * (278.75 / 750), baseDiameter * (114.245 / 750));
		ctx.arcTo(baseDiameter * (282.64 / 750), baseDiameter * (118.096 / 750), baseDiameter * (278.981 / 750), baseDiameter * (122.165 / 750), baseDiameter * (5.71 / 750));
		ctx.lineTo(baseDiameter * (239.837 / 750), baseDiameter * (165.704 / 750));
		ctx.arcTo(baseDiameter * (234.177 / 750), baseDiameter * (172.195 / 750), baseDiameter * (225.711 / 750), baseDiameter * (172.195 / 750), baseDiameter * (19.41 / 750));
		ctx.arc(0, insertDistance, insertRadius, -insertAngle, insertAngle - (Math.PI / 2), true);
		ctx.arcTo(baseDiameter * (18 / 750), baseDiameter * (-18 / 750), baseDiameter * (-66.362 / 750), baseDiameter * (-18 / 750), (baseDiameter * (66.362 / 750)) + (baseDiameter * (18 / 750)));
		ctx.arc(-insertDistance, 0, insertRadius, -insertAngle, insertAngle - (Math.PI * (3 / 4)), true);
		ctx.lineTo(baseDiameter * (-276.502 / 750), baseDiameter * (-111.871 / 750));
		ctx.arcTo(baseDiameter * (-282.639 / 750), baseDiameter * (-118.095 / 750), baseDiameter * (-276.795 / 750), baseDiameter * (-124.595 / 750), baseDiameter * (9.2 / 750));
		ctx.lineTo(baseDiameter * (-238.898 / 750), baseDiameter * (-166.748 / 750));
		ctx.arcTo(baseDiameter * (-234.176 / 750), baseDiameter * (-172.195 / 750), baseDiameter * (-227.115 / 750), baseDiameter * (-172.195 / 750), baseDiameter * (16.21 / 750));
		ctx.closePath();
		ctx.stroke();
		uncheckRotation(base, ctx);
		ctx.translate(-baseCanvasCenter, -baseCanvasCenter);
	}
	
	function cleanCanvas(num) {
		insertCanvas[num].width = insertCanvas[num].width; // Cleans canvas.
		element.mainDiv.appendChild(insertCanvas[num]);
		var ctx = insertCanvas[num].getContext("2d");
		ctx.translate(insertCanvas[0].center, insertCanvas[0].center);
		if (num == 3)
			ctx.rotate(Math.PI * (-3 / 4));
		checkRotation(insert[num], ctx);
		ctx.lineWidth = lineWidthValue;
		return ctx;
	}
	
	function drawInsert0() {
		var ctx = cleanCanvas(0);
		ctx.beginPath();
		ctx.arc(0, 0, insertRadius, insertAngle - (Math.PI / 2), (Math.PI / 2) - insertAngle);
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0, 0, insertRadius, (-Math.PI / 2) - insertAngle, (Math.PI / 2) + insertAngle, true);
		ctx.closePath();
		ctx.stroke();
		uncheckRotation(insert[0], ctx);
		ctx.translate(-insertCanvas[0].center, -insertCanvas[0].center);
	}
	
	function drawInsert1() {
		var ctx = cleanCanvas(1);
		ctx.beginPath();
		ctx.arc(0, 0, insertRadius, -insertAngle, insertAngle - (Math.PI / 2), true);
		ctx.lineTo(insertDiameter * (18 / 250), insertDiameter * (-32.375 / 250));
		ctx.arcTo(insertDiameter * (18 / 250), insertDiameter * (-18 / 250), insertDiameter * (32.375 / 250), insertDiameter * (-18 / 250), (insertDiameter * (32.375 / 250)) - (insertDiameter * (18 / 250)));
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0, 0, insertRadius, insertAngle, -insertAngle - (Math.PI / 2));
		ctx.lineTo(insertDiameter * (-18 / 250), insertDiameter * (-13.625 / 250));
		ctx.arcTo(insertDiameter * (-18 / 250), insertDiameter * (18 / 250), insertDiameter * (13.625 / 250), insertDiameter * (18 / 250), (insertDiameter * (18 / 250)) + (insertDiameter * (13.625 / 250)));
		ctx.closePath();
		ctx.stroke();
		uncheckRotation(insert[1], ctx);
		ctx.translate(-insertCanvas[0].center, -insertCanvas[0].center);
	}
	
	function drawInsert2() {
		var ctx = cleanCanvas(2);
		ctx.beginPath();
		ctx.arc(0, 0, insertRadius, -insertAngle, insertAngle - (Math.PI / 2), true);
		ctx.lineTo(insertDiameter * (18 / 250), insertDiameter * (-32.375 / 250));
		ctx.arcTo(insertDiameter * (18 / 250), insertDiameter * (-18 / 250), insertDiameter * (32.375 / 250), insertDiameter * (-18 / 250), (insertDiameter * (32.375 / 250)) - (insertDiameter * (18 / 250)));
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0, 0, insertRadius, insertAngle, -insertAngle - (Math.PI / 2));
		ctx.lineTo(insertDiameter * (-18 / 250), insertDiameter * (-13.625 / 250));
		ctx.arcTo(insertDiameter * (-18 / 250), insertDiameter * (18 / 250), insertDiameter * (13.625 / 250), insertDiameter * (18 / 250), (insertDiameter * (18 / 250)) + (insertDiameter * (13.625 / 250)));
		ctx.closePath();
		ctx.stroke();
		uncheckRotation(insert[2], ctx);
		ctx.translate(-insertCanvas[0].center, -insertCanvas[0].center);
	}
	
	function drawInsert3() {
		var ctx = cleanCanvas(3);
		ctx.beginPath();
		ctx.arc(0, 0, insertRadius, (Math.PI / 4) - insertAngle, insertAngle - (Math.PI / 2), true);
		ctx.lineTo(insertDiameter * (18 / 250), insertDiameter * (-29.819 / 250));
		ctx.arcTo(insertDiameter * (18 / 250), insertDiameter * (-7.456 / 250), insertDiameter * (33.813 / 250), insertDiameter * (8.358 / 250), insertDiameter * (54.25 / 250));
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0, 0, insertRadius, (Math.PI / 4) + insertAngle, -insertAngle - (Math.PI / 2));
		ctx.arcTo(insertDiameter * (-18 / 250), insertDiameter * (7.456 / 250), insertDiameter * (-1.449 / 250), insertDiameter * (24.007 / 250), insertDiameter * (56.46 / 250));
		ctx.closePath();
		ctx.stroke();
		uncheckRotation(insert[3], ctx);
		ctx.rotate(Math.PI * (3 / 4));
		ctx.translate(-insertCanvas[0].center, -insertCanvas[0].center);
	}
	
	function drawInsert4() {
		var ctx = cleanCanvas(4);
		ctx.beginPath();
		ctx.arc(0, 0, insertRadius, (Math.PI / 4) - insertAngle, insertAngle - (Math.PI / 2), true);
		ctx.lineTo(insertDiameter * (18 / 250), insertDiameter * (-29.819 / 250));
		ctx.arcTo(insertDiameter * (18 / 250), insertDiameter * (-7.456 / 250), insertDiameter * (33.813 / 250), insertDiameter * (8.358 / 250), insertDiameter * (54.25 / 250));
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0, 0, insertRadius, (Math.PI / 4) + insertAngle, -insertAngle - (Math.PI / 2));
		ctx.arcTo(insertDiameter * (-18 / 250), insertDiameter * (7.456 / 250), insertDiameter * (-1.449 / 250), insertDiameter * (24.007 / 250), insertDiameter * (56.46 / 250));
		ctx.closePath();
		ctx.stroke();
		uncheckRotation(insert[4], ctx);
		ctx.translate(-insertCanvas[0].center, -insertCanvas[0].center);
	}
	
	function drawFinal() {
	
		element.mainDiv.appendChild(finalCanvas);
		ctx = finalCanvas.getContext("2d");
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
		ctx.strokeRect(0, 0, finalCanvas.width, finalCanvas.height);
		ctx.drawImage(baseCanvas, 0, 0, baseCanvas.width, baseCanvas.width);
		ctx.drawImage(insertCanvas[0], insert[0].x, insert[0].y, insertCanvas[0].width, insertCanvas[0].width);
		ctx.drawImage(insertCanvas[1], insert[1].x, insert[1].y, insertCanvas[1].width, insertCanvas[1].width);
		ctx.drawImage(insertCanvas[2], insert[2].x, insert[2].y, insertCanvas[2].width, insertCanvas[2].width);
		ctx.drawImage(insertCanvas[3], insert[3].x, insert[3].y, insertCanvas[3].width, insertCanvas[3].width);
		ctx.drawImage(insertCanvas[4], insert[4].x, insert[4].y, insertCanvas[4].width, insertCanvas[4].width);
		ctx.drawImage(rotateIcon[rotateIconAlreadyClicked], rotateIconX, rotateIconY, rotateIconWidth, rotateIconHeight);
		ctx.drawImage(swapIcon[swapIconAlreadyClicked], swapIconX, swapIconY, swapIconWidth, swapIconHeight);
	}
	
	/*==============================================================================
	================================================================================
	================================================================================
	================================================================================
	================================================================================
	================================================================================
	================================================================================
	================================================================================
	================================================================================
	==============================================================================*/
	
	function initialize() {
	
		// Clears instruction area.
		element.solutionarea.value = "";
	
		// Assign value for path.
		for (i = 0; i < 3; i++) {
			if ($content.find('#radioPath' + i)[0].checked) {
				path = i;
			}
		}
	
		// Assign other values.
		base.solveRotation = base.rotation;
		for (var i=0; i<5; i++) {
			insert[i].solveLocation = insert[i].location;
			insert[i].solveRotation = insert[i].rotation;
		}
	
		// Solve for the chosen path.
		solvePuzzlelisimo();
	
		// Cleanup instructions. (Remove groups of instructions that essentially do nothing.)
		for (i = 0; i < 20; i++) {
			cleanupTextArea();
		}
	
		// Draw graphics.
		drawGraphics();
	}
	
	function drawGraphics() {
	
		element.solutionTD.innerHTML = "";
	
		stepNumber = 1;
		//var originalInstructions = resFinal;
		var startPlace = 2;
		var fullInstructions = resFinal;
		var restOfInstructions = resFinal;
	
		for (var i = 0; i < 50; i++) {
	
			var breakPlace = fullInstructions.indexOf("\n");
			currentInstruction = fullInstructions.slice(startPlace, breakPlace);
	
			var images = {
				rotateMazeClockwise: '0/0e/MarayMazeBaseC.png', /* [[File:MarayMazeBaseC.png]] */
				rotateMazeCounterclockwise: '7/7b/MarayMazeBaseCC.png', /* [[File:MarayMazeBaseCC.png]] */
				rotateMaze2Times: '1/12/MarayMazeBase2.png', /* [[File:MarayMazeBase2.png]] */
				swapToHunrath: 'c/c9/MarayMazeInsertH.png', /* [[File:MarayMazeInsertH.png]] */
				swapToMaray: 'e/ee/MarayMazeInsertM.png', /* [[File:MarayMazeInsertM.png]] */
				rotateInsertClockwise: '9/99/MarayMazeInsertC.png', /* [[File:MarayMazeInsertC.png]] */
				rotateInsertCounterclockwise: '1/19/MarayMazeInsertCC.png', /* [[File:MarayMazeInsertCC.png]] */
				rotateInsert2Times: '5/59/MarayMazeInsert2.png', /* [[File:MarayMazeInsert2.png]] */
				tripleSwapToMaray: '9/9e/MarayMazeTripleM.png', /* [[File:MarayMazeTripleM.png]] */
				tripleSwapToHunrath: '4/4c/MarayMazeTripleH.png' /* [[File:MarayMazeTripleH.png]] */
			};
			for (var j in allInstructions) {
				if (currentInstruction == allInstructions[j]) {
					stepImage = document.createElement("img");
					stepImage.src = "https://static.wikia.nocookie.net/obduction_gamepedia/images/" + images[j];
					stepImage.width = 100;
					stepImage.height = 100;
					buildDiv();
				}
			}
	
			restOfInstructions = fullInstructions.slice(breakPlace + 1);
			fullInstructions = restOfInstructions;
		}
	}
	
	function buildDiv() {
		var stepString = "Step " + String(stepNumber) + ": ";
		var instructionP = document.createElement("p");
		instructionP.innerHTML = stepString.bold() + currentInstruction;
	
		var leftCell = document.createElement("div");
		leftCell.style = "width:25%;";
		leftCell.appendChild(stepImage);
	
		var rightCell = document.createElement("div");
		rightCell.style = "width:75%;";
		rightCell.className = "instructions";
		rightCell.appendChild(instructionP);
	
		var bigCell = document.createElement("div");
		bigCell.style = "width:400px";
		if (stepNumber == 1) {
			bigCell.style = "width:400px; border-top: 1px solid black;";
		}
		bigCell.className = "step";
		bigCell.appendChild(leftCell);
		bigCell.appendChild(rightCell);
	
		element.solutionTD.appendChild(bigCell);
		stepNumber = stepNumber + 1;
	}
	
	function solvePuzzlelisimo() {
		// Choose which path to solve. Error checking enabled for invalid paths.
		if (path === 0) {
			solvePath0();
		} else if (path === 1) {
			solvePath1();
		} else if (path === 2) {
			solvePath2();
		} else {
			alert(error.pathError);
		}
	}
	
	function solvePath0() {
		// Solve Path 0.
		solvePath0Insert1(insert[1]);
		solvePath0Insert4(insert[4]);
		solvePath0Insert2(insert[2]);
		solvePath0Insert0(insert[0]);
	}
	
	function solvePath1() {
		// Solve Path 1.
		solvePath1Insert1(insert[1]);
		solvePath1Insert4(insert[4]);
		solvePath1Insert2(insert[2]);
	}
	
	function solvePath2() {
		// Solve Path 2.
		solvePath2Insert1(insert[1]);
		solvePath2Insert3(insert[3]);
		solvePath2Insert0(insert[0]);
	}
	
	// Start of functions that solve for a specific path and insert.
	function solvePathXInsertX(item, to_clear, rValue) {
		var map = [2, 1, 0, 3];
		map[to_clear] = null; 
		var remaining = [0, 1, 2, 3].filter(function(b) {return !map.includes(b);});
		if (item.solveLocation == map.indexOf(null)) {
			rotateBaseTo(remaining[0]);
			swapToHunrath(item);
			rotateInsertTo(item, rValue);
			swapToMaray(item);
		} else if (item.solveLocation == 4) {
			rotateBaseTo(remaining[0]);
			marayGauntletHunrath();
			rotateInsertTo(item, rValue);
			swapToMaray(item);
		} else {
			rotateBaseTo(map[item.solveLocation]);
			swapToHunrath(item);
			rotateInsertTo(item, rValue);
			hunrathGauntletMaray();
			rotateBaseTo(remaining[0]);
			swapToHunrath(item);
			hunrathGauntletMaray();
		}
	}
	function solvePath0Insert0(item) {
		solvePathXInsertX(item, 3, 0);
	}
	function solvePath0Insert1(item) {
		solvePathXInsertX(item, 0, 2);
	}
	function solvePath0Insert2(item) {
		solvePathXInsertX(item, 2, 0);
	}
	function solvePath0Insert4(item) {
		solvePathXInsertX(item, 1, 1);
	}
	var solvePath1Insert1 = solvePath0Insert1;
	function solvePath1Insert2(item) {
		solvePathXInsertX(item, 2, 1);
	}
	var solvePath1Insert4 = solvePath0Insert4;
	var solvePath2Insert0 = solvePath0Insert2;
	function solvePath2Insert1(item) {
		solvePathXInsertX(item, 0, 1);
	}
	var solvePath2Insert3 = solvePath0Insert0;
	
	// End of functions that solve for a specific path and insert.
	
	function rotateBase(rotationvalue) {
	
		// Rotate base and, consequently, each insert, except for the one in Hunrath. Does not rotate the insert in Hunrath.
		base.solveRotation = Number(base.solveRotation) + Number(rotationvalue);
		for (var i = 0; i < 5; i++) {
			if (insert[i].solveLocation >= 0 && insert[i].solveLocation <= 3) {
				insert[i].solveRotation = Number(insert[i].solveRotation) + Number(rotationvalue);
			}
		}
	
		// Add readable instructions.
		if (rotationvalue == 1) {
			element.solutionarea.value = element.solutionarea.value.concat('- ' + allInstructions.rotateMazeClockwise + '\n');
		} else if (rotationvalue == -1) {
			element.solutionarea.value = element.solutionarea.value.concat('- ' + allInstructions.rotateMazeCounterclockwise + '\n');
		} else if (rotationvalue == 2) {
			element.solutionarea.value = element.solutionarea.value.concat('- ' + allInstructions.rotateMaze2Times + '\n');
		} else {
			alert(error.rotateBaseError);
		}
	
		// Correct rotation values if they are too high or too low.
		correctSolveRotation(base);
		correctSolveRotation(insert[0]);
		correctSolveRotation(insert[1]);
		correctSolveRotation(insert[2]);
		correctSolveRotation(insert[3]);
		correctSolveRotation(insert[4]);
	}
	
	function correctRotation(item) {
		// Keep rotation values between 0 and 3, inclusive.
		if (item.rotation >= 4) {
			item.rotation = Number(item.rotation) - 4;
		} else if (item.rotation <= -1) {
			item.rotation = Number(item.rotation) + 4;
		}
	}
	
	
	function correctSolveRotation(item) {
		// Keep rotation values between 0 and 3, inclusive.
		if (item.solveRotation >= 4) {
			item.solveRotation = Number(item.solveRotation) - 4;
		} else if (item.solveRotation <= -1) {
			item.solveRotation = Number(item.solveRotation) + 4;
		}
		if (item == insert[0]) {
			if (item.solveRotation >= 2) {
				item.solveRotation = Number(item.solveRotation) - 2;
			}
		}
	}
	
	function swapToHunrath(item) {
	
		// Swaps an insert from Maray to Hunrath. Also swaps the insert already in Hunrath to Maray.
	
		element.solutionarea.value = element.solutionarea.value.concat('- ' + allInstructions.swapToHunrath + '\n');
	
		var map = [2, 1, 0, 3];
		if (item.solveLocation == 4) {
			for (var i=0; i<5; i++) {
				if (insert[i].solveLocation == map[item.solveLocation]) {
					insert[i].solveLocation = 4;
					item.solveLocation = map[item.solveLocation];
					break;
				}
			}
			return;
		}
	
		for (var j=0; j<5; j++) {
			if (insert[j].solveLocation == 4) {
				insert[j].solveLocation = Number(item.solveLocation);
				break;
			}
		}
	
		item.solveLocation = 4;
	}
	
	function swapToMaray(item) {
	
		// Swaps an insert from Hunrath to Maray. Also swaps the insert already in Maray to Hunrath.
	
		element.solutionarea.value = element.solutionarea.value.concat('- ' + allInstructions.swapToMaray + '\n');
	
		var map = [2, 1, 0, 3];
		for (var i=0; i<5; i++) {
			if (insert[i].solveLocation == map[base.solveRotation]) {
				insert[i].solveLocation = 4;
				item.solveLocation = map[base.solveRotation];
				break;
			}
		}
	}
	
	function hunrathGauntletMaray() {
	
		// Prints instructions on how to return to Maray without swapping an insert.
		element.solutionarea.value = element.solutionarea.value.concat('- ' + allInstructions.tripleSwapToMaray + '\n');
	}
	
	function marayGauntletHunrath() {
	
		// Prints instructions on how to return to Hunrath without swapping an insert.
		element.solutionarea.value = element.solutionarea.value.concat('- ' + allInstructions.tripleSwapToHunrath + '\n');
	}
	
	function rotateInsert(item, rotationvalue) {
	
		// Rotates an insert in Hunrath.
	
		item.solveRotation = Number(item.solveRotation) + Number(rotationvalue);
	
		if (rotationvalue === 1) {
			element.solutionarea.value = element.solutionarea.value.concat('- ' + allInstructions.rotateInsertClockwise + '\n');
		} else if (rotationvalue === -1) {
			element.solutionarea.value = element.solutionarea.value.concat('- ' + allInstructions.rotateInsertCounterclockwise + '\n');
		} else if (rotationvalue === 2) {
			element.solutionarea.value = element.solutionarea.value.concat('- ' + allInstructions.rotateInsert2Times + '\n');
		} else {
			alert(error.rotateBaseError);
		}
	
		// Correct rotation values if they are too high or too low.
		correctSolveRotation(base);
		correctSolveRotation(insert[0]);
		correctSolveRotation(insert[1]);
		correctSolveRotation(insert[2]);
		correctSolveRotation(insert[3]);
		correctSolveRotation(insert[4]);
	}
	
	function rotateInsertTo(item, rotationvalue) {
		//Determines how many times to rotate an insert to have it reach a specific rotation.
		var map = [
			[null,    1,    2,   -1],
			[  -1, null,    1,    2],
			[   2,   -1, null,    1],
			[   1,    2,   -1, null]
		];
		var mapValue = map[base.solveRotation][rotationvalue];
		if (!map[base.solveRotation]) alert(error.rotateInsertToError);
		var _ = mapValue ? rotateInsert(item, mapValue) : false;
	}
	
	//function addLineBreak() {
		// Used to add space between groups of instructions.
	//	element.solutionarea.value = element.solutionarea.value.concat("\n");
	//}
	
	function rotateBaseTo(rotationvalue) {
		//Determines how many times to rotate the base to have it reach a specific rotation.
		var map = [
			[null,    1,    2,   -1],
			[  -1, null,    1,    2],
			[   2,   -1, null,    1],
			[   1,    2,   -1, null]
		];
		var mapValue = map[base.solveRotation][rotationvalue];
		var _ = mapValue ? rotateBase(mapValue) : false;
	}
	
	function cleanupTextArea() {
		// Remove groups of instructions that essentially do nothing.
		var str = element.solutionarea.value;
		var res1 = str.replace('- ' + allInstructions.rotateInsert2Times + '\n- ' + allInstructions.rotateInsertCounterclockwise, '- ' + allInstructions.rotateInsertClockwise);
		var res2 = res1.replace('- ' + allInstructions.rotateInsert2Times + '\n- ' + allInstructions.rotateInsertClockwise, '- ' + allInstructions.rotateInsertCounterclockwise);
		var res3 = res2.replace('- ' + allInstructions.rotateInsertCounterclockwise + '\n- ' + allInstructions.rotateInsert2Times, '- ' + allInstructions.rotateInsertClockwise);
		var res4 = res3.replace('- ' + allInstructions.rotateInsertClockwise + '\n- ' + allInstructions.rotateInsert2Times, '- ' + allInstructions.rotateInsertCounterclockwise);
		var res5 = res4.replace('- ' + allInstructions.rotateInsertClockwise + '\n- ' + allInstructions.rotateInsertCounterclockwise, "");
		var res6 = res5.replace('- ' + allInstructions.rotateInsertCounterclockwise + '\n- ' + allInstructions.rotateInsertClockwise, "");
		var res7 = res6.replace('- ' + allInstructions.rotateMaze2Times + '\n- ' + allInstructions.rotateMazeCounterclockwise, '- ' + allInstructions.rotateMazeClockwise);
		var res8 = res7.replace('- ' + allInstructions.rotateMaze2Times + '\n- ' + allInstructions.rotateMazeClockwise, '- ' + allInstructions.rotateMazeCounterclockwise);
		var res9 = res8.replace('- ' + allInstructions.rotateMazeCounterclockwise + '\n- ' + allInstructions.rotateMaze2Times, '- ' + allInstructions.rotateMazeClockwise);
		var res10 = res9.replace('- ' + allInstructions.rotateMazeClockwise + '\n- ' + allInstructions.rotateMaze2Times, '- ' + allInstructions.rotateMazeCounterclockwise);
		var res11 = res10.replace('- ' + allInstructions.rotateMazeClockwise + '\n- ' + allInstructions.rotateMazeCounterclockwise, "");
		var res12 = res11.replace('- ' + allInstructions.rotateMazeCounterclockwise + '\n- ' +allInstructions.rotateMazeClockwise, "");
		var res13 = res12.replace('- ' + allInstructions.swapToMaray + '\n- ' +allInstructions.swapToHunrath, "");
		var res14 = res13.replace('- ' + allInstructions.swapToHunrath + '\n- ' +allInstructions.swapToMaray, "");
		var res15 = res14.replace('- ' + allInstructions.rotateMazeClockwise + '\n- ' +allInstructions.rotateMazeClockwise, '- ' + allInstructions.rotateMaze2Times);
		var res16 = res15.replace('- ' + allInstructions.rotateMazeCounterclockwise + '\n- ' + allInstructions.rotateMazeCounterclockwise, '- ' + allInstructions.rotateMaze2Times);
		var res17 = res16.replace('- ' + allInstructions.rotateInsert2Times + '\n- ' + allInstructions.rotateInsert2Times, "");
		resFinal = res17.replace("\n\n", "\n");
		element.solutionarea.value = resFinal;
	
		// Remove extra line breaks at beginnning.
		var str2 = element.solutionarea.value;
		//var strLength = element.solutionarea.value.length;
		if (str2.indexOf("\n") == 0) {
			var str3 = str2.slice(1);
			element.solutionarea.value = str3;
		}
	
		removeSingleRotations('- ' + allInstructions.rotateInsert2Times);
		removeSingleRotations('- ' + allInstructions.rotateInsertCounterclockwise);
		removeSingleRotations('- ' + allInstructions.rotateInsertClockwise);
		removeSingleRotations('- ' + allInstructions.rotateMaze2Times);
		removeSingleRotations('- ' + allInstructions.rotateMazeCounterclockwise);
		removeSingleRotations('- ' + allInstructions.rotateMazeClockwise);
		removeSingleRotations('- ' + allInstructions.swapToMaray);
		removeSingleRotations('- ' + allInstructions.swapToHunrath);
	}
	
	function removeSingleRotations(item) {
		var value = element.solutionarea.value;
		if (value == item + "\n" || value == item + "\n\n" || value == item + "\n\n\n") {
			element.solutionarea.value = "";
		}
	}
});