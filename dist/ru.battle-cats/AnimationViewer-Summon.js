mw.loader.using('mediawiki.api').then(function () {
	if (document.getElementsByClassName('animation-summon-viewer').length == 0) return;

var unitJSON, url, sprites, spritesNow, spriteNodes, viewer, canvas, summonButton, degToRad;
var interval = {};

	degToRad = Math.PI / 180;
	viewer = $('.animation-summon-viewer');
	canvas = $('.animation-summon-canvas');
	var unit = viewer.attr('data-unit-id');
	var bg = $('body').hasClass('theme-fandomdesktop-dark') ? 'Bg002.png' : 'Bg000.png';
	var defaultBg = viewer.attr('data-default-bg');
	if (defaultBg != '') bg = defaultBg;
	// insert UI elements
	$("#summon-input-bg-div").append('<input type="text" id="summon-input-bg" placeholder="Введите название файла" value="' + bg + '" style="width: 118px; background-color: #eef;">');
	$("#summon-input-frame-div").append('<input class="summon-input-element" type="number" id="summon-input-frame" value="65" min="0" title="Введите фрейм, чтобы показать">');
	$("#animation-summon-button-div").append('<button id="animation-button-summon" type="button" title="Summon the spirit">Дух</button>');
	$("#summon-hide-elements").append('<input type="checkbox">');
	$("#summon-unit-name").text(unit);
	// read animation data
	var map, urls;
	api = new mw.Api();
	api.get({
		action: 'query',
		prop: 'revisions',
		titles: 'MediaWiki:Custom-AnimationViewer/' + leadingZeroes(unit, 3) + '.json',
		rvprop: 'content',
		rvslots: 'main',
		formatversion: '2'
	}).done(function (data) {
		var content = data.query.pages[0].revisions[0].slots.main.content;
		map = new Map(Object.entries(JSON.parse(content)));
		unitJSON = map;
		renderModel(0, true, true);
	});
	// create references to elements
	summonButton = $('#animation-button-summon');
	// allow scrolling and zooming in viewer
	var focused = false;
	viewer.click(function () {
		if ($('.animation-summon-hideable:hover').length == 0 && $('#summon-hide-elements:hover').length == 0) {
			focused = !focused;
			if (focused) {
				$('#animation-summon-input').css('box-shadow', '0 0 4px #000');
				$('#summon-inner-box-shadow').show();
				viewer.on('mouseenter', function () { $('body').css('overflow', 'hidden'); });
				viewer.on('mouseleave', function () { $('body').css('overflow', 'auto'); });
				viewer.on('wheel DOMMouseScroll', function (event) {
					if ($('.animation-summon-hideable:hover').length != 0 || $('#hide-elements:hover').length != 0 || !focused) return;
					event.preventDefault();
					if (Number.isInteger(event.originalEvent.deltaY)) { // scroll
						canvas.css({'left': canvas.position().left + event.originalEvent.wheelDeltaX / 2.5, 'bottom': viewer.height() - canvas.position().top - event.originalEvent.wheelDeltaY / 2.5});
					} else { // zoom
						var old = Number(canvas.css('scale'));
						if (!old) old = 1;
						var newValue = old / ( 1 + event.originalEvent.deltaY / 150);
						if (newValue > 0.2 && newValue < 5) {
							var scale = newValue / old;
							var pos = canvas.position();
							canvas.css({'scale': String(newValue), 'left': scale * pos.left + (1 - scale) * viewer.width() / 2, 'bottom': viewer.height() - (scale * pos.top + (1 - scale) * viewer.height())});
						}
					}
					placeBackground();
				});
			} else {
				$('#animation-summon-input').css('box-shadow', '0 0 2px rgba(0, 0, 0, 0.5)');
				$('#summon-inner-box-shadow').hide();
				viewer.off('wheel DOMMouseScroll');
				viewer.off('mouseenter');
				viewer.off('mouseleave');
				$('body').css('overflow', 'auto');
			}
		}
	});
	// scrolling with buttons
	$("#summon-scroll-up").on('mousedown', function () { interval.up = setInterval(function () { canvas.css('bottom', viewer.height() - canvas.position().top + 2); placeBackground();}, 10); });
	$("#summon-scroll-down").on('mousedown', function () { interval.down = setInterval(function () { canvas.css('bottom', viewer.height() - canvas.position().top - 2); placeBackground();}, 10); });
	$("#summon-scroll-left").on('mousedown', function () { interval.left = setInterval(function () { canvas.css('left', canvas.position().left + 2); placeBackground();}, 10); });
	$("#summon-scroll-right").on('mousedown', function () { interval.right = setInterval(function () { canvas.css('left', canvas.position().left - 2); placeBackground();}, 10); });
	document.getElementById("summon-scroll-up").addEventListener('touchstart', function () { interval.up = setInterval(function () { canvas.css('bottom', viewer.height() - canvas.position().top + 2); placeBackground();}, 10); }, false);
	document.getElementById("summon-scroll-down").addEventListener('touchstart', function () { interval.down = setInterval(function () { canvas.css('bottom', viewer.height() - canvas.position().top - 2); placeBackground();}, 10); }, false);
	document.getElementById("summon-scroll-left").addEventListener('touchstart', function () { interval.left = setInterval(function () { canvas.css('left', canvas.position().left + 2); placeBackground();}, 10); }, false);
	document.getElementById("summon-scroll-right").addEventListener('touchstart', function () { interval.right = setInterval(function () { canvas.css('left', canvas.position().left - 2); placeBackground();}, 10); }, false);
	$(window).on('mouseup', function () {
		clearInterval(interval.up);
		clearInterval(interval.down);
		clearInterval(interval.left);
		clearInterval(interval.right);
		clearInterval(interval.out);
		clearInterval(interval.in);
	});
	document.addEventListener('touchend', function () {
		clearInterval(interval.up);
		clearInterval(interval.down);
		clearInterval(interval.left);
		clearInterval(interval.right);
		clearInterval(interval.out);
		clearInterval(interval.in);
	}, false);
	// zooming with buttons
	$("#summon-zoom-in").on('mousedown', zoomIn);
	$("#summon-zoom-out").on('mousedown', zoomOut);
	document.getElementById("summon-zoom-in").addEventListener('touchstart', zoomIn, false);
	document.getElementById("summon-zoom-out").addEventListener('touchstart', zoomOut, false);
	// hide button
	$('#summon-hide-elements').click(function () {
		if ($('#summon-hide-elements').text() == 'Hide') {
			$('#summon-hide-elements').html('Show<input type="checkbox" checked>');
			$('#summon-hide-elements').attr('title', 'Show Elements');
		} else {
			$('#summon-hide-elements').html('Hide<input type="checkbox">');
			$('#summon-hide-elements').attr('title', 'Hide Elements');
		}
	});
	$('#input-bg').on('change', setBackground);
	new ResizeObserver(placeBackground).observe(document.querySelector('.animation-summon-viewer'));
	// input area events
	summonButton.click(function () { renderModel(1, false, false); });

	function zoomIn() {
		interval.in = setInterval(function () {
			var old = Number(canvas.css('scale'));
			if (!old) old = 1;
			var newValue = old * 1.015;
			if (newValue < 5) {
				var scale = newValue / old;
				var pos = canvas.position();
				canvas.css({'scale': String(newValue), 'left': scale * pos.left + (1 - scale) * viewer.width() / 2, 'bottom': viewer.height() - (scale * pos.top + (1 - scale) * viewer.height())});
				placeBackground();
			}
		}, 20);
	}

	function zoomOut() {
		interval.out = setInterval(function () {
			var old = Number(canvas.css('scale'));
			if (!old) old = 1;
			var newValue = old / 1.015;
			if (newValue > 0.2) {
				var scale = newValue / old;
				var pos = canvas.position();
				canvas.css({'scale': String(newValue), 'left': scale * pos.left + (1 - scale) * viewer.width() / 2, 'bottom': viewer.height() - (scale * pos.top + (1 - scale) * viewer.height())});
				placeBackground();
			}
		}, 20);
	}

/**
 * put together spritesheets to form the walking animation image
 * @param {Number} type Type of animation (0 for walk/idle, 1 for attack, 2 for knockback)
 * @param {Boolean} reset Whether image position should be reset
 * @param {Boolean} inputDefault Whether input fields should be set to default values
 * @return void
 */
function renderModel(type, reset, inputDefault) {
	var unitData = unitJSON;
	var unit = viewer.attr('data-unit-id');
	var animData = unitData.get('f');
	// get each component of animation data
	var imgcut = animData.imgcut;
	var mamodel = animData.mamodel;
	var maanim = animData.maanim02;
	url = '/Special:Redirect/file/' + leadingZeroes(unit, 3) + '_f.png';
	// take only necessary parts of imgcut and mamodel
	var imgcutData = [];
	var length = imgcut.length;
	for (var i = 0; i < length; i++) {
		if (imgcut[i].length >= 4) {
			imgcutData.push(imgcut[i]);
		}
	}
	var mamodelData = [];
	length = mamodel.length;
	for (var z = 0; z < length; z++) {
		if (mamodel[z].length >= 13) {
			mamodelData.push(mamodel[z]);
		}
	}
	var maxValues = mamodel[3 + mamodel[2][0]];
	// create each sprite defined by mamodel
	canvas.html('<div class="summon-animation-background-color" style="position: absolute; left: -5000000px; z-index: -100; background-color: var(--bg-color-gray); user-select: none; pointer-events: none;"></div><div class="summon-animation-background" style="position: absolute; left: -5000000px; height: 512px; width: 10000000px; z-index: -100; background-color: var(--bg-color-gray); user-select: none; pointer-events: none; scale: 1.25;"></div>');
	sprites = [];
	spritesNow = [];
	spriteNodes = [];
	length = mamodelData.length;
	for (var j = 0; j < length; j++) {
		var row = mamodelData[j];
		var data = createSprite(j, imgcutData[row[2]], mamodelData, url, maxValues);
		sprites.push(data);
		if (row[1] == -1) $("#summon-sprite-inner-" + j).hide();
	}
	spritesNow = JSON.parse(JSON.stringify(sprites));
	// find animation length
	var maxF = 0;
	length = maanim.length;
	for (var k = 0; k < length; k++) {
		if (maanim[k].length >= 5 && maanim[k + 1][0] != 0) {
			var value = maanim[k + maanim[k + 1][0] + 1][0] - maanim[k + 2][0];
			if (value > maxF) maxF = value;
		}
	}
	// set to first frame of attack animation
	if (type == 1) {
		animate(0, maxF, maanim, imgcutData, maxValues);
	} else {
		showFrame($('#summon-input-frame').val(), maanim, imgcutData, maxValues);
	}
	// set input elements to default values
	if (inputDefault) $("#summon-input-frame").val(65);
	// event handling
	$('#summon-input-frame').off('input');
	$('#summon-input-frame').on('input', function () {
		var frame = $('#summon-input-frame').val();
		if (!frame) frame = 0;
		frame %= maxF;
		for (var f = 0; f <= frame; f++) {
			showFrame(f, animData.maanim02, imgcutData, maxValues);
		}
	});
	// reposition image
	if (reset) {
		var scale = Number(canvas.css('scale'));
		if (!scale) scale = 1;
		canvas.css({'left': '50%', 'bottom': 210 * scale});
	}
	setBackground();
}

/**
 * create a sprite on the screen given the corresponding rows in imgcut and mamodel data
 * @param {Number} id The sprite id used by parent values
 * @param {Array[Number]} imgcutRow Row in imgcut data for the sprite
 * @param {Array[Number]} mamodel Mamodel data for the sprite
 * @param {String} url Image url of spritesheet file
 * @param {Array[Number]} maxValues Array of numbers telling maximums for certain attributes
 * @return void
 */
function createSprite(id, imgcutRow, mamodel, url, maxValues) {
	var mamodelRow = mamodel[id];
	// read max value data
	var maxScale = maxValues[0];
	var maxAngle = maxValues[1] / 360;
	var maxOpacity = maxValues[2];
	// get values from imgcut data
	if (!imgcutRow) imgcutRow = [0, 0, 0, 0];
	var spriteX = imgcutRow[0];
	var spriteY = imgcutRow[1];
	var spriteWidth = imgcutRow[2];
	var spriteHeight = imgcutRow[3];
	// get values from mamodel data
	var parent = mamodelRow[0];
	var z = mamodelRow[3];
	var x = id == 0 ? 0 : mamodelRow[4];
	var y = id == 0 ? 0 : mamodelRow[5];
	var pivotX = mamodelRow[6];
	var pivotY = mamodelRow[7];
	var scaleX = mamodelRow[8] / maxScale;
	var scaleY = mamodelRow[9] / maxScale;
	var angle = mamodelRow[10] / maxAngle;
	var opacity = mamodelRow[11] / maxOpacity;
	var glow = mamodelRow[12];
	// make sprite
	canvas.append('<div class="summon-sprite-outer" id="summon-sprite-outer-' + id + '" style="position: absolute; z-index: ' + z + '; top: ' + y + 'px; left: ' + x + 'px; rotate: ' + angle + 'deg; scale: ' + scaleX + ' ' + scaleY + '; opacity: ' + opacity + ';"><div class="summon-sprite-inner" id="summon-sprite-inner-' + id + '" style="top: ' + -pivotY + 'px; left: ' + -pivotX + 'px; width: ' + spriteWidth + 'px; height: ' + spriteHeight + 'px; background-image: url(\'' + url + '\'); background-position: ' + (-spriteX) + 'px ' + (-spriteY) + 'px;"></div></div>');
	spriteNodes.push({'outer': $('#summon-sprite-outer-' + id), 'inner': $('#summon-sprite-inner-' + id)});
	if (glow != 0) {
		$('#summon-sprite-outer-' + id).css({'mix-blend-mode': 'screen', 'transform': 'translate3d(0, 0, 0)'});
		opacity = 1;
	}
	// return sprite data for animation
	var data = {
		'width': spriteWidth,
		'height': spriteHeight,
		'id': id,
		'unit': mamodelRow[1],
		'parent': parent,
		'z': z,
		'x': x,
		'y': y,
		'pivotX': pivotX,
		'pivotY': pivotY,
		'scaleX': scaleX,
		'scaleY': scaleY,
		'angle': angle,
		'opacity': opacity,
		'glow': glow,
		'flipX': 1,
		'flipY': 1
	};
	return data;
}

/**
 * show an animation in the animation viewer
 * @param {Number} frame Frame number
 * @param {Number} length Length of animation in frames
 * @param {Array} maanim Attack maanim data for unit
 * @param {Array[Array[Number]]} imgcutData Data for imgcut data as 2D array
 * @param {Array[Number]} maxValues Array of values telling max values of sprite attributes
 * @return void
 */
function animate(frame, length, maanim, imgcutData, maxValues) {
	if (frame < length) {
		var timeout = setTimeout(function () { animate(frame + 1, length, maanim, imgcutData, maxValues); }, 33.33);
		summonButton.click(function () { clearTimeout(timeout); });
	} else {
		renderModel(0, false, false);
		return;
	}
	showFrame(frame, maanim, imgcutData, maxValues);
}

/**
 * change sprites given a specific frame number of an animation
 * @param {Number} frame Frame number
 * @param {Array[Array[Number]]} maanim 2D array of maanim data
 * @param {Array[Array[Number]]} imgcut 2D array of imgcut data
 * @param {Array[Number]} maxValues Array of numbers telling maximums for certain attributes
 * @return void
 */
function showFrame(frame, maanim, imgcut, maxValues) {
	var length = maanim.length;
	for (var i = 0; i < length; i++) {
		var row = maanim[i];
		if (row.length >= 5) {
			var partID = row[0];
			var mod = row[1];
			var modCount = maanim[i + 1][0];
			if (modCount == 0) continue;
			var frameNow = frame;
			if (frame == 0) {
				var firstRow = maanim[i + 2];
				if (firstRow[0] == 0 || (modCount == 1 && firstRow[0] <= 0)) {
					modify(partID, imgcut, mod, firstRow[1], maxValues);
					i += modCount + 1;
					continue;
				}
			}
			if (row[2] == -1) {
				var fMin = maanim[i + 2][0];
				var fMax = maanim[i + modCount + 1][0];
				frameNow = (frame - fMin) % (fMax - fMin) + fMin;
			}
			if (modCount == 1) {
				if (frameNow == maanim[i + 2][0]) {
					modify(partID, imgcut, mod, maanim[i + 2][1], maxValues);
					i += 2;
					continue;
				}
			}
			var last = i + modCount;
			for (var k = i + 2; k <= last; k++) {
				var modRow = maanim[k];
				var nextRow = maanim[k + 1];
				var f = modRow[0];
				var nextF = nextRow[0];
				if (frameNow == f) {
					modify(partID, imgcut, mod, modRow[1], maxValues);
					break;
				} else if (frameNow == nextF) {
					modify(partID, imgcut, mod, nextRow[1], maxValues);
					break;
				} else if (f < frameNow && frameNow < nextF) {
					if (mod == 0) {
						modify(partID, imgcut, 0, modRow[1], maxValues);
						break;
					}
					var change = modRow[1];
					var nextChange = nextRow[1];
					var ease = modRow[2];
					var step;
					if (ease == 0) { // linear
						step = change + (nextChange - change) / (nextF - f) * (frameNow - f);
					} else if (ease == 1) { // step
						step = frameNow == nextF ? nextChange : change;
					} else if (ease == 2) { // semi-circle with different exponents
						var p = modRow[3];
						var x = (frameNow - f) / (nextF - f);
						step = (nextChange - change) * (p > 0 ? 1 - Math.sqrt(1 - Math.pow(x, p)) : Math.sqrt(1 - Math.pow(1 - x, -p))) + change;
					} else if (ease == 3) { // lagrange
						var points = [];
						var frameRow;
						var min = i + 2;
						for (var a = k; a >= min; a--) {
							frameRow = maanim[a];
							if (frameRow[2] != 3) break;
							points.push([frameRow[0], frameRow[1]]);
						}
						var max = i + modCount + 2;
						for (var b = k + 1; b < max; b++) {
							frameRow = maanim[b];
							points.push([frameRow[0], frameRow[1]]);
							if (frameRow[2] != 3) break;
						}
						var deg = points.length;
						step = 0;
						for (var j = 0; j < deg; j++) {
							var prod = points[j][1];
							for (var l = 0; l < deg; l++) {
								if (l == j) continue;
								prod *= (frameNow - points[l][0]) / (points[j][0] - points[l][0]);
							}
							step += prod;
						}
					}
					if (mod == 2) {
						if (nextChange - change < 0) {
							step = Math.ceil(step);
						} else {
							step = Math.floor(step);
						}
					} else if (mod == 13 || mod == 14) {
						step = change;
					}
					modify(partID, imgcut, mod, step, maxValues);
					break;
				}
				if (row[2] == 1 && k == last && frameNow > maanim[k + 1][0]) modify(partID, imgcut, mod, maanim[k + 1][1], maxValues);
			}
			i += modCount + 1;
		}
	}
	updateSprites();
}

/**
 * change an attribute of a sprite
 * @param {Number} partID ID of sprite to modify
 * @param {Array[Array[Number]]} imgcut 2D array of imgcut data
 * @param {Number} mod Value telling what attribute to change
 * @param {Number} change Value to change the attribute by
 * @param {Array[Number]} maxValues Array of numbers telling maximums for certain attributes
 * @return void
 */
function modify(partID, imgcut, mod, change, maxValues) {
	var spriteData = sprites[partID];
	var sprite = spritesNow[partID];
	if (mod == 0) { // parent
		sprite.parent = change;
	} else if (mod == 2) { // sprite
		var row = imgcut[change];
		spriteNodes[partID].inner.css({'width': row[2], 'height': row[3], 'background-position': -row[0] + 'px ' + -row[1] + 'px'});
	} else if (mod == 3) { // z depth
		sprite.z = change;
	} else if (mod == 4) { // x
		sprite.x = spriteData.x + change;
	} else if (mod == 5) { // y
		sprite.y = spriteData.y + change;
	} else if (mod == 6) { // pivot x
		spriteNodes[partID].inner.css('left', -spriteData.pivotX - change);
	} else if (mod == 7) { // pivot y
		spriteNodes[partID].inner.css('top', -spriteData.pivotY - change);
	} else if (mod == 8) { // scale
		change = change / maxValues[0];
		sprite.scaleX = change * spriteData.scaleX;
		sprite.scaleY = change * spriteData.scaleY;
	} else if (mod == 9) { // scale x
		sprite.scaleX = change / maxValues[0] * spriteData.scaleX;
	} else if (mod == 10) { // scale y
		sprite.scaleY = change / maxValues[0] * spriteData.scaleY;
	} else if (mod == 11) { // rotate
		sprite.angle = spriteData.angle + change / (maxValues[1] / 360);
	} else if (mod == 12) { // opacity
		sprite.opacity = change / maxValues[2] * spriteData.opacity;
	} else if (mod == 13) { // horizontal flipping
		sprite.flipX = change == 0 ? 1 : -1;
	} else if (mod == 14) { // vertical flipping
		sprite.flipY = change == 0 ? 1 : -1;
	}
}

/**
 * calculate positions, orientations, and scaling factors of sprites and update sprites
 * @return void
 */
function updateSprites() {
	var length = spritesNow.length;
	for (var i = 0; i < length; i++) {
		var pos = [[0], [0]];
		var vectors = [];
		var data = spritesNow[i];
		var parent = spritesNow[data.parent];
		while (data.parent != -1) {
			var a = parent.angle * degToRad * getFlipX(parent.id) * getFlipY(parent.id);
			var cos = Math.cos(a);
			var sin = Math.sin(a);
			vectors.unshift([[[data.x], [-data.y]], [[parent.scaleX * parent.flipX, 0], [0, parent.scaleY * parent.flipY]], [[cos, sin], [-sin, cos]]]);
			data = parent;
			parent = spritesNow[parent.parent];
		}
		var len = vectors.length;
		var row;
		for (var j = 0; j < len; j++) {
			row = vectors[j];
			for (var k = j; k < len; k++) {
				vectors[k][0] = applyMatrix(row[1], vectors[k][0]);
			}
		}
		for (j = 0; j < len; j++) {
			row = vectors[j];
			for (var l = j; l < len; l++) {
				vectors[l][0] = applyMatrix(row[2], vectors[l][0]);
			}
			pos = addVectors(pos, row[0]);
		}
		spriteNodes[i].outer.css({'z-index': spritesNow[i].z, 'left': pos[0][0], 'top': -pos[1][0], 'scale': (getScaleX(i) * getFlipX(i)) + ' ' + (getScaleY(i) * getFlipY(i)), 'rotate': getAngle(i) + 'deg', 'opacity': getOpacity(i)});
	}

	function addVectors(v, u) {
		return [[v[0][0] + u[0][0]], [v[1][0] + u[1][0]]];
	}

	function applyMatrix(m, v) {
		return [[m[0][0] * v[0][0] + m[0][1] * v[1][0]], [m[1][0] * v[0][0] + m[1][1] * v[1][0]]];
	}
}

/**
 * sets background image
 * @return void
 */
function setBackground() {
	var imgURL = '/Special:Redirect/file/' + $('#summon-input-bg').val();
	$(".summon-animation-background").css('background', 'url("' + imgURL + '")');
	$(".summon-animation-background-color").html('<img src="' + imgURL + '" height="10000px" width="10000000px">');
	var img = new Image();
	img.src = imgURL;
	img.onload = function () {
		$('.summon-animation-background').css('height', this.height);
	};
	placeBackground();
}

/**
 * repositions background image div
 * @return void
 */
function placeBackground() {
	var pos = canvas.position().top;
	var scale = Number(canvas.css('scale'));
	if (!scale) scale = 1;
	$('.summon-animation-background').css('bottom', (pos - viewer.height()) / scale);
	$('.summon-animation-background-color').css('top', -pos / scale);
	$('.summon-animation-background-color img').attr('height', (viewer.height() - $('.summon-animation-background').height() * scale) * 256 / scale);
}

/**
 * adds leading zeroes to the given number with the maximum digits specified
 * @param {Number} num Number to pad
 * @param {Number} digits The resulting number of digits
 * @return {String} The padded number
 */
function leadingZeroes(num, digits) {
	return ("000" + num).slice(-1 * digits);
}

/**
 * get resultant scale x of a sprite
 * @param {Number} id
 * @return {Number} Scale x
 */
function getScaleX(id) {
	if (id == -1) return 1;
	return spritesNow[id].scaleX * getScaleX(spritesNow[id].parent);
}

/**
 * get resultant scale y of a sprite
 * @param {Number} id
 * @return {Number} Scale y
 */
function getScaleY(id) {
	if (id == -1) return 1;
	return spritesNow[id].scaleY * getScaleY(spritesNow[id].parent);
}

/**
 * get resultant angle of a sprite
 * @param {Number} id
 * @return {Number} Angle
 */
function getAngle(id) {
	if (id == -1) return 0;
	return spritesNow[id].angle * getFlipX(id) * getFlipY(id) + getAngle(spritesNow[id].parent);
}

/**
 * get resultant opacity of a sprite
 * @param {Number} id
 * @return {Number} Opacity
 */
function getOpacity(id) {
	if (id == -1) return 1;
	return spritesNow[id].opacity * getOpacity(spritesNow[id].parent);
}

/**
 * get resultant flip x of a sprite
 * @param {Number} id
 * @return {Number} Flip x
 */
function getFlipX(id) {
	if (id == -1) return 1;
	return spritesNow[id].flipX * getFlipX(spritesNow[id].parent);
}

/**
 * get resultant flip y of a sprite
 * @param {Number} id
 * @return {Number} Flip y
 */
function getFlipY(id) {
	if (id == -1) return 1;
	return spritesNow[id].flipY * getFlipY(spritesNow[id].parent);
}
});