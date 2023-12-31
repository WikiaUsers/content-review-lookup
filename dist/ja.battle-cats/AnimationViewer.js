var unitJSON, url, mamodelRows, viewer, canvas, toggle, unitInput, formSelect, modeSelect, atkButton, kbButton;
var interval = {};
var sprites = [];

mw.loader.using('mediawiki.api').then(function () {
	if (document.getElementsByClassName('animation-viewer').length == 0) return;
	viewer = $('.animation-viewer');
	canvas = $('.animation-canvas');
	// retrieve data
	var unit = viewer.attr('data-unit-id');
	var cro = leadingZeroes(unit, 3);
	// insert UI elements
	$("#animation-toggle-div").append('<label class="switch" title="Toggle Animation"><input type="checkbox" id="animation-toggle"><span class="slider round"><span class="animation-off" style="color: #000; user-select: none;">Off</span><span class="animation-on" style="color: #000; opacity: 0; user-select: none;">On</span></span></label>');
	$("#input-bg-div").append('<input type="text" id="input-bg" placeholder="Enter file name" value="Bg000.png" style="width: 118px;">');
	$("#input-unit-div").append('<input class="input-element" type="number" id="input-unit" value="' + unit + '" min="0" title="Input the unit CRO">');
	$("#input-form-div").append('<select class="input-element" name="Form" id="select-form" title="Select the unit form"><option id="option-normal" value="f">Normal</option><option id="option-evolved" value="c">Evolved</option><option id="option-true" value="s">True</option><option id="option-ultra" value="u">Ultra</option></select>');
	$("#input-mode-div").append('<select class="input-element" name="Mode" id="select-mode" title="Select the animation type"><option value="00">Walk</option><option value="01">Idle</option><option value="02" id="option-attack">Attack</option><option value="03" id="option-knockback">Knockback</option></select>');
	$("#input-frame-div").append('<input class="input-element" type="number" id="input-frame" value="0" min="0" title="Input the frame to show">');
	$("#animation-button-div").append('<button id="animation-button-attack" type="button" title="Play the attack animation" style="display: none;">Attack</button>');
	$("#animation-button-div").append('<button id="animation-button-knockback" type="button" title="Show the knockback image" style="display: none;">Knockback</button>');
	// create references to elements
	toggle = $('#animation-toggle');
	unitInput = $('#input-unit');
	formSelect = $('#select-form');
	modeSelect = $('#select-mode');
	atkButton = $('#animation-button-attack');
	kbButton = $('#animation-button-knockback');
	// allow scrolling and zooming in viewer
	viewer.on('wheel DOMMouseScroll', function (event) {
		if ($('#animation-input:hover').length != 0 || $('#unit-name:hover').length != 0) return;
		event.preventDefault();
		if (Number.isInteger(event.originalEvent.deltaY)) { // scroll
			canvas.css({'left': Number(canvas.css('left').slice(0, -2)) + event.originalEvent.wheelDeltaX / 2.5, 'bottom': viewer.height() - canvas.position().top - event.originalEvent.wheelDeltaY / 2.5});
		} else { // zoom
			var old = Number(canvas.css('scale'));
			if (!old) old = 1;
			var newValue = old / ( 1 + event.originalEvent.deltaY / 150);
			if (newValue > 0.1 && newValue < 5) {
				var scale = newValue / old;
				var pos = canvas.position();
				canvas.css({'scale': String(newValue), 'left': scale * pos.left + (1 - scale) * viewer.width() / 2, 'bottom': viewer.height() - (scale * pos.top + (1 - scale) * viewer.height())});
			}
		}
		placeBackground();
	});
	// scrolling with buttons
	$("#scroll-up").on('mousedown', function () { interval.up = setInterval(function () { canvas.css('bottom', viewer.height() - canvas.position().top + 2); placeBackground();}, 10); });
	$("#scroll-down").on('mousedown', function () { interval.down = setInterval(function () { canvas.css('bottom', viewer.height() - canvas.position().top - 2); placeBackground();}, 10); });
	$("#scroll-left").on('mousedown', function () { interval.left = setInterval(function () { canvas.css('left', canvas.position().left + 2); placeBackground();}, 10); });
	$("#scroll-right").on('mousedown', function () { interval.right = setInterval(function () { canvas.css('left', canvas.position().left - 2); placeBackground();}, 10); });
	document.getElementById("scroll-up").addEventListener('touchstart', function () { interval.up = setInterval(function () { canvas.css('bottom', viewer.height() - canvas.position().top + 2); placeBackground();}, 10); }, false);
	document.getElementById("scroll-down").addEventListener('touchstart', function () { interval.down = setInterval(function () { canvas.css('bottom', viewer.height() - canvas.position().top - 2); placeBackground();}, 10); }, false);
	document.getElementById("scroll-left").addEventListener('touchstart', function () { interval.left = setInterval(function () { canvas.css('left', canvas.position().left + 2); placeBackground();}, 10); }, false);
	document.getElementById("scroll-right").addEventListener('touchstart', function () { interval.right = setInterval(function () { canvas.css('left', canvas.position().left - 2); placeBackground();}, 10); }, false);
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
	$("#zoom-in").on('mousedown', zoomIn);
	$("#zoom-out").on('mousedown', zoomOut);
	document.getElementById("zoom-in").addEventListener('touchstart', zoomIn, false);
	document.getElementById("zoom-out").addEventListener('touchstart', zoomOut, false);
	// prevent page scroll from interfering with div content scroll
	viewer.mouseenter(function () { $('body').css('overflow', 'hidden'); });
	viewer.mouseleave(function () { $('body').css('overflow', 'auto'); });
	// hide button
	$('#hide-elements').click(function () {
		if ($('#hide-elements').text() == 'Hide') {
			$('#hide-elements').text('Show');
			$('#hide-elements').attr('title', 'Show Elements');
			$('.animation-hideable').hide();
		} else {
			$('#hide-elements').text('Hide');
			$('#hide-elements').attr('title', 'Hide Elements');
			$('.animation-hideable').show();
		}
	});
	$('#input-bg').on('change', setBackground);
	new ResizeObserver(placeBackground).observe(document.querySelector('.animation-viewer'));
	// remove for final ver
	loadUnit();
	unitInput.on('change', loadUnit);
});

// put in body code for final ver
function loadUnit() {
	// remove for final ver
	$('select').unbind();
	$('button').unbind();
	$('#input-frame').unbind();
	var unit = unitInput.val();
	var maxForms;
	var cro = leadingZeroes(unit, 3);
	// read animation data
	var map, urls;
	api = new mw.Api();
	api.get({
		action: 'query',
		prop: 'revisions',
		titles: 'User:SweetDonut0/' + cro + '.json',
		rvprop: 'content',
		rvslots: 'main',
		formatversion: '2'
	}).done(function (data) {
		var content = data.query.pages[0].revisions[0].slots.main.content;
		map = new Map(Object.entries(JSON.parse(content)));
		unitJSON = map;
		maxForms = map.size;
		if (maxForms == 1) {
			$('#option-evolved').prop('disabled', true);
			$('#option-true').prop('disabled', true);
			$('#option-ultra').prop('disabled', true);
			if (formSelect.val() == 'c' || formSelect.val() == 's' || formSelect.val() == 'u') formSelect.val('f');
		} else if (maxForms == 2) {
			$('#option-evolved').prop('disabled', false);
			$('#option-true').prop('disabled', true);
			$('#option-ultra').prop('disabled', true);
			if (formSelect.val() == 's' || formSelect.val() == 'u') formSelect.val('c');
		} else if (maxForms == 3) {
			$('#option-evolved').prop('disabled', false);
			$('#option-true').prop('disabled', false);
			$('#option-ultra').prop('disabled', true);
			if (formSelect.val() == 'u') formSelect.val('s');
		} else if (maxForms == 4) {
			$('#option-evolved').prop('disabled', false);
			$('#option-true').prop('disabled', false);
			$('#option-ultra').prop('disabled', false);
		}
		$('#unit-name').html(unitJSON.get(formSelect.val()).name);
		renderModel(0, true, true);
	});
	// event handling
	toggle.click(function () { setTimeout( function () {
		if (toggle.is(':checked')) {
			if (modeSelect.val() == '02' || modeSelect.val() == '03') modeSelect.val('00');
			atkButton.show();
			kbButton.show();
			$('#frame-text').hide();
			$('#input-frame-div').hide();
			$('.animation-off').css('opacity', 0);
			$('.animation-on').css('opacity', 1);
			$('#option-attack').prop('disabled', true);
			$('#option-knockback').prop('disabled', true);
		} else {
			atkButton.hide();
			kbButton.hide();
			$('#frame-text').show();
			$('#input-frame-div').show();
			$('.animation-off').css('opacity', 1);
			$('.animation-on').css('opacity', 0);
			$('#option-attack').prop('disabled', false);
			$('#option-knockback').prop('disabled', false);
		}
		renderModel(0, false, false);
	}, 10); });
	formSelect.on('change', function () {
		setTimeout(function () {
			$('#unit-name').html(unitJSON.get(formSelect.val()).name);
			renderModel(0, true, true);
		}, 10);
	});
	modeSelect.on('change', function () {
		renderModel(0, false, false);
		$("#input-frame").val(0);
	});
	atkButton.click(function () { renderModel(1, false, false); });
	kbButton.click(function () { renderModel(2, false, false); });
	viewer.click(function () {
		if ($('.animation-hideable:hover').length == 0 && $('#hide-elements:hover').length == 0 && toggle.is(':checked')) renderModel(1, false, false);
	});
	viewer.on('contextmenu', function () { if ($('.animation-hideable:hover').length == 0 && $('#hide-elements:hover').length == 0 && toggle.is(':checked')) renderModel(2, false, false); });
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
	var unit = unitInput.val();
	var form = formSelect.val();
	var mode = modeSelect.val();
	var animData = unitData.get(form);
	// get each component of animation data
	var imgcut = animData.imgcut;
	var mamodel = animData.mamodel;
	var maanim = animData['maanim' + mode];
	if (type != 0) maanim = animData['maanim0' + (type + 1)];
	// file url
	var file = imgcut[2][0];
	if (!file.includes('m')) file = leadingZeroes(unit, 3) + '_' + form + '.png';
	url = '/Special:Redirect/file/' + file;
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
	mamodelRows = mamodelData;
	// create each sprite defined by mamodel
	canvas.html('<div class="animation-background-color" style="position: absolute; left: -5000000px; z-index: -100; background-color: var(--bg-color-gray); user-select: none; pointer-events: none;"></div><div class="animation-background" style="position: absolute; left: -5000000px; height: 512px; width: 10000000px; z-index: -100; background-color: var(--bg-color-gray); user-select: none; pointer-events: none;"></div>');
	var maxValues = mamodel[length - 4];
	sprites = [];
	length = mamodelData.length;
	for (var j = 0; j < length; j++) {
		var row = mamodelData[j];
		sprites.push(createSprite(j, imgcutData[row[2]], mamodelData, url, maxValues, true, j, row[3], row[12]));
		if (row[1] == -1) $("#sprite-inner-" + j).hide();
	}
	// deal with flipped sprites and their rotation angles
	sprites[0].flip = [0, 0, 0, 0];
	var notDone = true;
	length = sprites.length;
	while (notDone) {
		notDone = false;
		for (var x = 1; x < length; x++) {
			spriteData = sprites[x];
			if (spriteData.flip) continue;
			parentData = sprites[spriteData.parent];
			if (!parentData.flip) {
				notDone = true;
				continue;
			}
			var flipX = parentData.scaleX < 0 ? -parentData.flip[0] + 1 : parentData.flip[0];
			var flipY = parentData.scaleY < 0 ? -parentData.flip[1] + 1 : parentData.flip[1];
			sprites[x].flip = [flipX, flipY, 0, 0];
			var outer = $('.sprite-outer-' + x);
			if ((flipX + flipY) % 2 == 1) outer.css('rotate', -Number(outer.css('rotate').slice(0, -3)) + 'deg');
		}
	}
	// reposition image
	if (reset) {
		canvas.css('left', '50%');
		var max = Number.MIN_VALUE;
		var base = canvas.offset().top;
		var temp;
		for (var m = 0; m < length; m++) {
			if (mamodelData[m][1] == -1) continue;
			var inner = $('#sprite-inner-' + m);
			if (inner.height() <= 2 || inner.width() <= 2) continue;
			temp = inner.offset().top - base;
			if (temp > max) max = temp;
		}
		var scale = Number(canvas.css('scale'));
		if (!scale) scale = 1;
		canvas.css('bottom', (140 + max) * scale);
	}
	setBackground();
	placeBackground();
	// find animation length
	var maxF = 0;
	length = maanim.length;
	for (var k = 0; k < length; k++) {
		if (maanim[k].length >= 5 && maanim[k + 1][0] != 0) {
			var value = maanim[k + maanim[k + 1][0] + 1][0] - maanim[k + 2][0];
			if (value > maxF) maxF = value;
		}
	}
	// begin walking animation or set to first frame of walking animation
	if (type == 1) {
		animate(0, maxF, animData, '02', imgcutData, maxValues);
	} else if (type == 2) {
		animate(0, 30, animData, '03', imgcutData, maxValues);
	} else {
		if (toggle.is(':checked')) {
			animate(0, maxF, animData, mode, imgcutData, maxValues);
		} else {
			showFrame(0, maanim, imgcutData, maxValues);
		}
	}
	// set input elements to default values
	if (inputDefault) $("#input-frame").val(0);
	// event handling
	$('#input-frame').off('input');
	$('#input-frame').on('input', function () {
		var anim = animData['maanim' + modeSelect.val()];
		var frame = $('#input-frame').val();
		if (!frame) frame = 0;
		frame %= maxF;
		for (var f = 0; f <= frame; f++) {
			showFrame(f, anim, imgcutData, maxValues);
		}
	});
}

/**
 * create a sprite on the screen given the corresponding rows in imgcut and mamodel data
 * @param {Number} id The sprite id used by parent values
 * @param {Array[Number]} imgcutRow Row in imgcut data for the sprite
 * @param {Array[Number]} mamodel Mamodel data for the sprite
 * @param {String} url Image url of spritesheet file
 * @param {Array[Number]} maxValues Array of numbers telling maximums for certain attributes
 * @param {Boolean} withImage If element should have image or not
 * @param {Number} initialID ID of parent sprite
 * @param {Number} zDepth Z depth of sprite
 * @param {Number} glowVal Sprite glow effect type
 * @return void
 */
function createSprite(id, imgcutRow, mamodel, url, maxValues, withImage, initialID, zDepth, glowVal) {
	var mamodelRow = mamodel[id];
	// read max value data
	var maxScale = maxValues[0];
	var maxAngle = maxValues[1];
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
	var angle = mamodelRow[10] / (maxAngle / 360);
	var opacity = mamodelRow[11] / maxOpacity;
	var glow = mamodelRow[12];
	// make image
	var pivotDiv;
	if (withImage) {
		var imageDiv = '<div class="sprite-inner" id="sprite-inner-' + id + '" style="top: ' + -pivotY + 'px; left: ' + -pivotX + 'px; width: ' + spriteWidth + 'px; height: ' + spriteHeight + 'px; background-image: url(\'' + url + '\'); background-position: ' + (-spriteX) + 'px ' + (-spriteY) + 'px;"></div>';
		pivotDiv = '<div class="sprite-outer-' + id + '" id="sprite-' + id + '-parent-' + initialID + '" style="position: absolute; top: ' + y + 'px; left: ' + x + 'px; rotate: ' + angle + 'deg; scale: ' + scaleX + ' ' + scaleY + '; opacity: ' + opacity + ';">' + imageDiv + '</div>';
	} else {
		pivotDiv = '<div class="sprite-outer-' + id + '" id="sprite-' + id + '-parent-' + initialID + '" style="position: absolute; top: ' + y + 'px; left: ' + x + 'px; rotate: ' + angle + 'deg; scale: ' + scaleX + ' ' + scaleY + '; opacity: ' + opacity + ';"></div>';
	}
	if (parent >= 0) {
		createSprite(parent, imgcutRow, mamodel, url, maxValues, false, initialID, zDepth, glowVal);
		$('#sprite-' + parent + '-parent-' + initialID).append(pivotDiv);
	} else {
		canvas.append(pivotDiv);
		$('#sprite-' + id + '-parent-' + initialID).css('z-index', zDepth);
	}
	if (glowVal != 0) {
		$('#sprite-' + id + '-parent-' + initialID).css({'mix-blend-mode': 'screen', 'transform': 'translate3d(0, 0, 0)'});
		if (withImage) {
			$('#sprite-inner-' + id).css('mix-blend-mode', 'screen');
		}
	}
	// return sprite data for animation
	if (glow != 0) opacity = 1;
	var data = {
		'id': id,
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
	};
	return data;
}

/**
 * show an animation in the animation viewer
 * @param {Number} frame Frame number
 * @param {Number} length Length of animation in frames
 * @param {Map} animData Animation data for unit
 * @param {String} type String ID for animation type
 * @param {Array[Array[Number]]} imgcutData Data for imgcut data as 2D array
 * @param {Array[Number]} maxValues Array of values telling max values of sprite attributes
 * @return void
 */
function animate(frame, length, animData, type, imgcutData, maxValues) {
	var maanim = animData['maanim' + type];
	if (frame < length || (type != '02' && type != '03')) {
		var timeout = setTimeout(function () { animate(frame + 1, length, animData, type, imgcutData, maxValues); }, 33.33);
		toggle.click(function () { clearTimeout(timeout); });
		formSelect.on('change', function () { clearTimeout(timeout); });
		modeSelect.on('change', function () { clearTimeout(timeout); });
		atkButton.click(function () { clearTimeout(timeout); });
		kbButton.click(function () { clearTimeout(timeout); });
		viewer.click(function () { if ($('.animation-hideable:hover').length == 0 && $('#hide-elements:hover').length == 0) clearTimeout(timeout); });
		viewer.on('contextmenu', function () { clearTimeout(timeout); });
		unitInput.on('change', function () { if ($('.animation-hideable:hover').length == 0 && $('#hide-elements:hover').length == 0) clearTimeout(timeout); }); // to be removed for final ver
	} else if (frame >= length && (type == '02' || type == '03')) {
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
				var lastRow = maanim[i + modCount + 1];
				if (firstRow[0] == 0 || (modCount == 1 && firstRow[0] <= 0 && firstRow[2] == 0)) {
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
					} else {
						console.log('Unknown easing value: ' + ease);
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
			}
			i += modCount + 1;
		}
	}
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
	var outer;
	if (mod == 0) { // parent
		if (change == spriteData.parent) return;
		spriteData.parent = change;
		var chain = [change];
		var next = change;
		while (next > 0) {
			next = sprites[next].parent;
			chain.unshift(next);
		}
		var canvas = document.querySelector('.animation-canvas');
		var baseNode = document.querySelector('.sprite-outer-0');
		var spriteLength = sprites.length;
		for (var j = 0; j < spriteLength; j++) {
			var copy = document.getElementById('sprite-' + partID + '-parent-' + j);
			if (copy) {
				var spriteTemp = sprites[j];
				var self = copy.cloneNode(true);
				var baseId = 'sprite-0-parent-' + j;
				var toRemove = document.getElementById(baseId);
				toRemove.parentNode.removeChild(toRemove);
				var baseClone = baseNode.cloneNode(false);
				canvas.appendChild(baseClone);
				Array.from(document.getElementsByClassName('sprite-outer-0')).slice(-1)[0].id = baseId;
				if (spriteTemp.glow != 0) {
					var base = document.getElementById(baseId);
					base.style['mix-blend-mode'] = 'screen';
					base.transform = 'translate3d(0, 0, 0)';
				}
				var length = chain.length;
				for (var i = 1; i < length; i++) {
					Array.from(document.getElementsByClassName('sprite-outer-' + chain[i - 1])).slice(-1)[0].appendChild(document.querySelector('.sprite-outer-' + chain[i]).cloneNode(false));
					Array.from(document.getElementsByClassName('sprite-outer-' + chain[i])).slice(-1)[0].id = 'sprite-' + chain[i] + '-parent-' + j;
					document.getElementById('sprite-' + chain[i] + '-parent-' + j).innerHTML = '';
					if (spriteTemp.glow != 0) document.getElementById('sprite-' + chain[i] + '-parent-' + j).style['mix-blend-mode'] = 'screen';
				}
				document.getElementById('sprite-' + chain[chain.length - 1] + '-parent-' + j).appendChild(self);
				document.getElementById(baseId).style.zIndex = spriteTemp.z;
			}
		}
	} else if (mod == 2) { // sprite
		var row = imgcut[change];
		$('#sprite-inner-' + partID).css({'width': row[2], 'height': row[3], 'background-position': -row[0] + 'px ' + -row[1] + 'px'});
	} else if (mod == 3) { // z depth
		$('#sprite-0-parent-' + partID).css('z-index', change);
	} else if (mod == 4) { // x
		$('.sprite-outer-' + partID).css('left', spriteData.x + change);
	} else if (mod == 5) { // y
		$('.sprite-outer-' + partID).css('top', spriteData.y + change);
	} else if (mod == 6) { // pivot x
		$('#sprite-inner-' + partID).css('left', -spriteData.pivotX - change);
	} else if (mod == 7) { // pivot y
		$('#sprite-inner-' + partID).css('top', -spriteData.pivotY - change);
	} else if (mod == 8) { // scale
		change = change / maxValues[0];
		$('.sprite-outer-' + partID).css('scale', (change * spriteData.scaleX) + ' ' + (change * spriteData.scaleY));
	} else if (mod == 9) { // scale x
		outer = $('.sprite-outer-' + partID);
		var prevScaleX = outer.css('scale');
		if (prevScaleX == 'none') prevScaleX = '1';
		var newX = change / maxValues[0] * spriteData.scaleX;
		var oldX;
		if (prevScaleX.includes(' ')) {
			outer.css('scale', newX + prevScaleX.slice(prevScaleX.indexOf(' ')));
			oldX = prevScaleX.slice(0, prevScaleX.indexOf(' '));
		} else {
			outer.css('scale', newX + ' ' + prevScaleX);
			oldX = prevScaleX;
		}
		if (Math.sign(oldX * newX) == -1) {
			spriteData.flip[0] = 1 - spriteData.flip[0];
			updateFlipX(partID);
		}
	} else if (mod == 10) { // scale y
		outer = $('.sprite-outer-' + partID);
		var prevScaleY = outer.css('scale');
		if (prevScaleY == 'none') prevScaleY = '1';
		var newY = change / maxValues[0] * spriteData.scaleY;
		var oldY;
		if (prevScaleY.includes(' ')) {
			outer.css('scale', prevScaleY.slice(0, prevScaleY.indexOf(' ') + 1) + newY);
			oldY = prevScaleY.slice(prevScaleY.indexOf(' ') + 1);
		} else {
			outer.css('scale', prevScaleY + ' ' + newY);
			oldY = prevScaleY;
		}
		if (Math.sign(oldY * newY) == -1) {
			spriteData.flip[1] = 1 - spriteData.flip[1];
			updateFlipY(partID);
		}
	} else if (mod == 11) { // rotate
		var reverse = sum(spriteData.flip) % 2 == 1;
		$('.sprite-outer-' + partID).css('rotate', (spriteData.angle + change / (maxValues[1] / 360)) * (reverse ? -1 : 1) + 'deg');
	} else if (mod == 12) { // opacity
		$('.sprite-outer-' + partID).css('opacity', change / maxValues[2] * spriteData.opacity);
	} else if (mod == 13) { // horizontal flipping
		outer = $('.sprite-outer-' + partID);
		outer.css('transform', 'scaleX(' + (change == 0 ? 1 : -1) + ')');
		if (change != 0) {
			if (spriteData.flip[2] == 0) outer.css('rotate', -Number(outer.css('rotate').slice(0, -3)) + 'deg');
			spriteData.flip[2] = 1;
		} else {
			if (spriteData.flip[2] == 1) outer.css('rotate', -Number(outer.css('rotate').slice(0, -3)) + 'deg');
			spriteData.flip[2] = 0;
		}
	} else if (mod == 14) { // vertical flipping
		outer = $('.sprite-outer-' + partID);
		outer.css('transform', 'scaleY(' + (change == 0 ? 1 : -1) + ')');
		if (change != 0) {
			if (spriteData.flip[3] == 0) outer.css('rotate', -Number(outer.css('rotate').slice(0, -3)) + 'deg');
			spriteData.flip[3] = 1;
		} else {
			if (spriteData.flip[3] == 1) outer.css('rotate', -Number(outer.css('rotate').slice(0, -3)) + 'deg');
			spriteData.flip[3] = 0;
		}
	} else {
		console.log('Unknown modification id', partID, mod, change);
	}
}

/**
 * updates flipped status of sprites in x direction
 * @param {Number} id ID of sprite that was changed
 * @return void
 */
function updateFlipX(id) {
	var length = sprites.length;
	for (var i = 1; i < length; i++) {
		if (document.getElementById('sprite-' + id + '-parent-' + i)) {
			var spriteData = sprites[i];
			var parentData = sprites[spriteData.parent];
			var flipX = 1 - spriteData.flip[0];
			sprites[i].flip = [flipX, spriteData.flip[1], spriteData.flip[2], spriteData.flip[3]];
		}
	}
}

/**
 * updates flipped status of sprites in y direction
 * @param {Number} id ID of sprite that was changed
 * @return void
 */
function updateFlipY(id) {
	var length = sprites.length;
	for (var i = 1; i < length; i++) {
		if (document.getElementById('sprite-' + id + '-parent-' + i)) {
			var spriteData = sprites[i];
			var parentData = sprites[spriteData.parent];
			var flipY = 1 - spriteData.flip[1];
			sprites[i].flip = [spriteData.flip[0], flipY, spriteData.flip[2], spriteData.flip[3]];
		}
	}
}

/**
 * sets background image
 * @return void
 */
function setBackground() {
	var imgURL = '/Special:Redirect/file/' + $('#input-bg').val();
	$(".animation-background").css('background', 'url("' + imgURL + '")');
	$(".animation-background-color").html('<img src="' + imgURL + '" height="10000000px" width="10000000px">');
	var img = new Image();
	img.src = imgURL;
	img.onload = function () {
		$('.animation-background').css('height', this.height);
	};
}

/**
 * repositions background image div
 * @return void
 */
function placeBackground() {
	var pos = canvas.position();
	var scale = Number(canvas.css('scale'));
	if (!scale) scale = 1;
	$('.animation-background').css('bottom', (pos.top - viewer.height()) / scale);
	$('.animation-background-color').css('top', -pos.top / scale);
}

/**
 * zooms in the viewer
 * @return void
 */
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

/**
 * zooms out the viewer
 * @return void
 */
function zoomOut() {
	interval.out = setInterval(function () {
		var old = Number(canvas.css('scale'));
		if (!old) old = 1;
		var newValue = old / 1.015;
		if (newValue > 0.1) {
			var scale = newValue / old;
			var pos = canvas.position();
			canvas.css({'scale': String(newValue), 'left': scale * pos.left + (1 - scale) * viewer.width() / 2, 'bottom': viewer.height() - (scale * pos.top + (1 - scale) * viewer.height())});
			placeBackground();
		}
	}, 20);
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
 * get sum of numbers in array
 * @param {Array[Number]} arr
 * @return Sum of elements
 */
function sum(arr) {
	var sum = 0;
	var length = arr.length;
	for (var i = 0; i < length; i++) {
		sum += arr[i];
	}
	return sum;
}