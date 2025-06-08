{var unitJSON, url, ctx, bgCtx, colorCtx, bgImg, bgColor, currentForm, sprites, spritesNow, viewer, canvas, bgCanvas, colorCanvas, toggle, formSelect, modeSelect, atkButton, kbButton, degToRad, viewerScale, viewerCenter;
var interval = {};
var images = [];

// delay to prevent issues with canvas width being wacky on mobile
$(document).ready(function () {
	if (document.getElementsByClassName('animation-viewer').length == 0) return;
	if ($('.citizen-page-container').length > 0) {
		if ($('.animation-viewer').parent().attr('hidden') != 'until-found') {
			mw.loader.using('mediawiki.api').then(function () {
				setup();
			});
		} else {
			$('.animation-viewer').parent().prev().one('click', () => {
				setup();
			});
		}
	} else {
		mw.loader.using('mediawiki.api').then(function () {
			setup();
		});
	}
});

/**
 * set up viewer and its canvas and listen to events
 * @return void
 */
function setup() {
	// constants
	degToRad = Math.PI / 180;
	const buttonRateMS = 10;
	const scrollDistance = 2;
	const zoomInFactor = 1.008;
	const zoomOutFactor = 1 / zoomInFactor;
	const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
	const pixelRatio = window.devicePixelRatio || 1;
	defaultY = 140;
	viewerScale = 0.9 * pixelRatio;
	// set up canvas and contexts
	viewer = $('.animation-viewer');
	viewer.width('100%');
	viewer.append($(`<canvas id="animation-canvas">`));
	canvas = document.getElementById('animation-canvas');
	canvas.width = viewer.width() * pixelRatio;
	canvas.height = viewer.height() * pixelRatio;
	canvas.style.width = '100%';
	canvas.style.height = '512px';
	ctx = canvas.getContext("2d");
	bgCanvas = document.createElement('canvas');
	bgCtx = bgCanvas.getContext('2d');
	bgCtx.scale(pixelRatio, pixelRatio);
	colorCanvas = document.createElement('canvas');
	colorCtx = colorCanvas.getContext('2d');
	viewerCenter = new Proxy([canvas.width / 2, canvas.height - defaultY * viewerScale], {
		'set': function (target, key, value) {
			target[key] = value;
			if (!toggle.is(':checked')) paintSprites();
		}
	});
	ctx.imageSmoothingQuality = 'high';
	ctx.translate(viewerCenter[0], viewerCenter[1]);
	ctx.scale(viewerScale, viewerScale);
	viewer.prepend(canvas);
	// parameters passed by the template
	var unit = viewer.attr('data-unit-id');
	var type = viewer.attr('data-unit-type');
	var customJSON = viewer.attr('data-custom-json');
	var customSheet = viewer.attr('data-custom-spritesheet');
	// load background image
	var bg;
	var defaultBg = viewer.attr('data-default-bg');
	if (defaultBg != '') {
		bg = defaultBg;
	} else {
		bg = ($('html').hasClass('skin-theme-clientpref-os') ? window.matchMedia('(prefers-color-scheme: light)').matches : $('html').hasClass('skin-theme-clientpref-day')) ? 'Bg000.png' : 'Bg002.png';
	}
	bgImg = new Image();
	bgImg.crossOrigin = 'anonymous';
	bgImg.onload = () => {
		bgCtx.drawImage(bgImg, 0, 0, bgCanvas.width, bgCanvas.height);
		bgColor = `rgb(${bgCtx.getImageData(0, 0, 1, 1).data.join(', ')})`;
	};
	bgImg.src = `/Special:Redirect/file/${bg}`;
	// insert UI elements
	$("#animation-toggle-div").append('<label class="switch" title="Переключить на анимацию"><input type="checkbox" id="animation-toggle"><span class="slider round"><span class="animation-off">Выкл</span><span class="animation-on">Вкл</span></span></label>');
	$("#input-bg-div").append('<input type="text" id="input-bg" placeholder="Ввести имя файла" value="' + mw.html.escape(bg) + '">');
	$("#input-form-div").append('<select class="input-element" name="Form" id="select-form" title="Выбрать форму юнита"><option id="option-normal" value="f">Обычная</option><option id="option-evolved" value="c">Эволюция</option><option id="option-true" value="s">Истинная</option><option id="option-ultra" value="u">Ультра</option></select>');
	$("#input-mode-div").append('<select class="input-element" name="Mode" id="select-mode" title="Выбрать тип анимации"><option value="00">Походка</option><option value="01">Простой</option><option value="02" id="option-attack">Атака</option><option value="03" id="option-knockback">Отскок</option></select>');
	$("#input-frame-div").append('<input class="input-element" type="number" id="input-frame" value="0" min="0" title="Ввести количество фреймов для показа">');
	$("#animation-button-div").append('<button id="animation-button-attack" type="button" title="Проиграть анимацию атаки" style="display: none;">Атака</button>');
	$("#animation-button-div").append('<button id="animation-button-knockback" type="button" title="Показать отскок" style="display: none;">Отскок</button>');
	$("#hide-elements").append('<input type="checkbox">');
	// read animation data
	var map, urls;
	api = new mw.Api();
	api.get({
		action: 'query',
		prop: 'revisions',
		titles: customJSON != '' ? customJSON : ('MediaWiki:Custom-AnimationViewer/' + leadingZeroes(unit, 3) + (type == 'enemy' ? '_e' : '') + '.json'),
		rvprop: 'content',
		rvslots: 'main',
		formatversion: '2'
	}).done(function (data) {
		var content = data.query.pages[0].revisions[0].slots.main.content;
		map = new Map(Object.entries(JSON.parse(content)));
		unitJSON = map;
		if (type == 'cat') {
			// hide unnecessary form options
			var maxForms = map.size;
			if (maxForms == 1) {
				$('#option-evolved').prop('disabled', true);
				$('#option-true').prop('disabled', true);
				$('#option-ultra').prop('disabled', true);
			} else if (maxForms == 2) {
				$('#option-evolved').prop('disabled', false);
				$('#option-true').prop('disabled', true);
				$('#option-ultra').prop('disabled', true);
			} else if (maxForms == 3) {
				$('#option-evolved').prop('disabled', false);
				$('#option-true').prop('disabled', false);
				$('#option-ultra').prop('disabled', true);
			} else if (maxForms == 4) {
				$('#option-evolved').prop('disabled', false);
				$('#option-true').prop('disabled', false);
				$('#option-ultra').prop('disabled', false);
			}
			// get form spritesheets
			if (customSheet != '') {
				var sheets = customSheet.split(',');
				for (var i = 0; i < sheets.length; i++) {
					img = new Image();
					img.crossOrigin = 'anonymous';
					if (i == 0) img.onload = () => { renderModel(0, true, true); };
					img.src = '/Special:Redirect/file/' + sheets[i];
					images.push(img);
				}
			} else {
				for (var k = 0; k <= maxForms; k++) {
					img = new Image();
					img.crossOrigin = 'anonymous';
					if (k == 0) img.onload = () => { renderModel(0, true, true); };
					if (k == 0 && unitJSON.get('f').imgcut[2][0].includes('m')) {
						img.src = `/Special:Redirect/file/${unitJSON.get('f').imgcut[2][0]}`;
					} else if (maxForms > 1 && k == 1 && unitJSON.get('c').imgcut[2][0].includes('m')) {
						img.src = `/Special:Redirect/file/${unitJSON.get('c').imgcut[2][0]}`;
					} else {
						img.src = `/Special:Redirect/file/${leadingZeroes(unit, 3)}_${(['f', 'c', 's', 'u'])[k]}.png`;
					}
					images.push(img);
				}
			}
		} else {
			img = new Image();
			img.crossOrigin = 'anonymous';
			img.onload = () => { renderModel(0, true, true); };
			if (customSheet != '') {
				img.src = '/Special:Redirect/file/' + customSheet.split(',')[0];
			} else {
				img.src = `/Special:Redirect/file/${leadingZeroes(unit, 3)}_e.png`;
			}
			images.push(img);
			$('.row-1').hide();
			$('.row-2').css('grid-row', '1');
			$('.row-3').css('grid-row', '2');
		}
		$('#unit-name').text(unitJSON.get(type == 'cat' ? formSelect.val() : 'e').name);
		setBackground();
	});
	// create references to elements
	toggle = $('#animation-toggle');
	formSelect = $('#select-form');
	modeSelect = $('#select-mode');
	atkButton = $('#animation-button-attack');
	kbButton = $('#animation-button-knockback');
	inputArea = document.getElementById('animation-input');
	hideButton = document.getElementById('hide-elements');
	// scrolling and zooming with buttons
	$("#scroll-up").on('mousedown touchstart', function () {
		interval.up = setInterval(() => { scroll(0, -scrollDistance); }, buttonRateMS);
	});
	$("#scroll-down").on('mousedown touchstart', function () {
		interval.down = setInterval(() => { scroll(0, scrollDistance); }, buttonRateMS);
	});
	$("#scroll-left").on('mousedown touchstart', function () {
		interval.left = setInterval(() => { scroll(-scrollDistance, 0); }, buttonRateMS);
	});
	$("#scroll-right").on('mousedown touchstart', function () {
		interval.right = setInterval(() => { scroll(scrollDistance, 0); }, buttonRateMS);
	});
	$("#zoom-in").on('mousedown toushstart', () => {
		interval.in = setInterval(() => { zoom(zoomInFactor); }, buttonRateMS);
	});
	$("#zoom-out").on('mousedown touchstart', () => {
		interval.out = setInterval(() => { zoom(zoomOutFactor); }, buttonRateMS);
	});
	$(window).on('mouseup touchend', function () {
		clearInterval(interval.up);
		clearInterval(interval.down);
		clearInterval(interval.left);
		clearInterval(interval.right);
		clearInterval(interval.out);
		clearInterval(interval.in);
	});
	// scrolling and zooming by mouse (only zoom on Firefox)
	let focused = false;
	viewer[0].addEventListener('wheel', function (e) {
		if (!focused || e.target !== canvas) return;
		if (!Number.isInteger(e.deltaY) || isFirefox) {
			zoom(1 / (1 + e.deltaY / 150));
		} else {
			scroll(e.wheelDeltaX / 2.5, e.wheelDeltaY / 2.5);
		}
		e.preventDefault();
	});
	// mouse dragging
	let isDraggingM = false;
	let offsetXM, offsetYM, clickX, clickY;
	let initialM = null;
	viewer[0].addEventListener('pointerdown', function (e) {
		if (e.pointerType != 'mouse' || e.target !== canvas) return;
		const rect = viewer[0].getBoundingClientRect();
		const cornerX = rect.left + viewer.width();
		const cornerY = rect.top + viewer.height();
		if (e.clientX >= cornerX - 15 && e.clientX <= cornerX && e.clientY >= cornerY - 15 && e.clientY <= cornerY) return;
		offsetXM = e.clientX - viewerCenter[0];
		offsetYM = e.clientY - viewerCenter[1];
		isDraggingM = true;
		viewer[0].style.cursor = 'grabbing';
		clickX = e.clientX;
		clickY = e.clientY;
		e.preventDefault();
	});
	viewer[0].addEventListener('pointermove', function (e) {
		if (e.pointerType != 'mouse' || !isDraggingM) return;
		scroll(e.clientX - offsetXM - viewerCenter[0], e.clientY - offsetYM - viewerCenter[1]);
		e.preventDefault();
	});
	viewer[0].addEventListener('pointerup', function (e) {
		if (e.pointerType != 'mouse') return;
		isDraggingM = false;
		viewer[0].style.cursor = 'grab';
		if (clickX == e.clientX && clickY == e.clientY) {
			focused = !focused;
			$('#inner-box-shadow').toggle();
		}
	});
	viewer[0].addEventListener('pointerleave', function (e) {
		if (e.pointerType != 'mouse') return;
		isDraggingM = false;
		viewer[0].style.cursor = 'grab';
	});
	// touch dragging
	let isDragging = false;
	let offsetX, offsetY, touchX, touchY, touchNewX, touchNewY;
	let initial = null;
	let touchCount = 1;
	viewer[0].addEventListener('touchstart', function (e) {
		if (e.touches.length == 2) {
			if (!focused) return;
			const touch1 = e.touches[0];
			const touch2 = e.touches[1];
			if (touch1.target !== canvas || touch2.target !== canvas) {
				touchX = '';
				return;
			}
			touchCount = 2;
			initial = Math.sqrt(Math.pow(touch1.clientX - touch2.clientX, 2) + Math.pow(touch1.clientY - touch2.clientY, 2));
		} else if (e.touches.length == 1) {
			const touch = e.touches[0];
			if (touch.target !== canvas) {
				touchX = '';
				return;
			}
			touchX = touch.clientX;
			touchY = touch.clientY;
			touchNewX = touch.clientX;
			touchNewY = touch.clientY;
			if (!focused) return;
			touchCount = 1;
			offsetX = touch.clientX - viewerCenter[0];
			offsetY = touch.clientY - viewerCenter[1];
			isDragging = true;
		}
	});
	viewer[0].addEventListener('touchmove', function (e) {
		if (touchCount == 2) {
			if (initial) {
				const touch1 = e.touches[0];
				const touch2 = e.touches[1];
				const current = Math.sqrt(Math.pow(touch1.clientX - touch2.clientX, 2) + Math.pow(touch1.clientY - touch2.clientY, 2));
				zoom(current / initial);
				initial = current;
				touchNewX = null;
				touchNewY = null;
			}
		} else if (touchCount == 1) {
			const touch = e.touches[0];
			touchNewX = touch.clientX;
			touchNewY = touch.clientY;
			if (!isDragging) return;
			scroll(touch.clientX - offsetX - viewerCenter[0], touch.clientY - offsetY - viewerCenter[1]);
			e.preventDefault();
		}
	});
	viewer[0].addEventListener('touchend', function (e) {
		if (touchX === touchNewX && touchY === touchNewY) {
			focused = !focused;
			$('#inner-box-shadow').toggle();
			viewer.css('touch-action', viewer.css('touch-action') == 'none' ? 'auto' : 'none');
		}
		if (e.touches.length < 1) {
			isDragging = false;
		}
		if (e.touches.length < 2) {
			initial = null;
		}
	});
	// hide button
	$('#hide-elements').click(function () {
		if ($('#hide-elements').text() == 'Hide') {
			$('#hide-elements').html('Show<input type="checkbox" checked>');
			$('#hide-elements').attr('title', 'Show Elements');
		} else {
			$('#hide-elements').html('Hide<input type="checkbox">');
			$('#hide-elements').attr('title', 'Hide Elements');
		}
	});
	$('#input-bg').on('change', setBackground);
	// input area events
	toggle.click(function () {
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
	});
	formSelect.on('change', function () {
		$('#unit-name').text(unitJSON.get(formSelect.val()).name);
		renderModel(0, true, true);
	});
	modeSelect.on('change', function () {
		renderModel(0, false, false);
		$("#input-frame").val(0);
		if (modeSelect.val() == '03') {
			$('#input-frame').prop('disabled', true);
		} else {
			$('#input-frame').prop('disabled', false);
		}
	});
	atkButton.click(function () { renderModel(1, false, false); });
	kbButton.click(function () { renderModel(2, false, false); });
	// handling viewer resize
	var previousSize = [viewer.width(), viewer.height()];
	new ResizeObserver(function () {
		if (bgImg.complete) {
			canvas.width = viewer.width();
			canvas.height = viewer.height();
			viewerCenter = new Proxy([viewerCenter[0] - (previousSize[0] - canvas.width) / 2, viewerCenter[1] - (previousSize[1] - canvas.height)], {
				'set': function (target, key, value) {
					target[key] = value;
					if (!toggle.is(':checked')) paintSprites();
				}
			});
			previousSize = [canvas.width, canvas.height];
			ctx.translate(viewerCenter[0], viewerCenter[1]);
			ctx.scale(viewerScale, viewerScale);
			ctx.imageSmoothingQuality = 'high';
			paintSprites();
		}
	}).observe(document.querySelector('.animation-viewer'));
	// remove bg loading gif
	viewer.css('background-image', 'none');

	function scroll(dx, dy) {
		ctx.translate(dx / viewerScale, dy / viewerScale);
		viewerCenter[0] += dx;
		viewerCenter[1] += dy;
	}

	function zoom(factor) {
		var newValue = viewerScale * factor;
		if (newValue > 0.2 && newValue < 5) {
			viewerScale = newValue;
			var oldCenter = [viewerCenter[0], viewerCenter[1]];
			ctx.scale(factor, factor);
			ctx.translate((factor * viewerCenter[0] + (1 - factor) * canvas.width / 2 - oldCenter[0]) / newValue, (factor * viewerCenter[1] + (1 - factor) * canvas.height - oldCenter[1]) / newValue);
			viewerCenter[0] = factor * viewerCenter[0] + (1 - factor) * canvas.width / 2;
			viewerCenter[1] = factor * viewerCenter[1] + (1 - factor) * canvas.height;
		}
	}
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
	var unitType = viewer.attr('data-unit-type');
	var customImg = viewer.attr('data-custom-spritesheet');
	var mode = modeSelect.val();
	var form = formSelect.val();
	currentForm = unitType == 'enemy' ? 0 : (['f', 'c', 's', 'u']).indexOf(form);
	if (unitType == 'enemy') form = 'e';
	var animData = unitData.get(form);
	// get each component of animation data
	var imgcut = animData.imgcut;
	var mamodel = animData.mamodel;
	var maanim = animData['maanim' + mode];
	if (type != 0) maanim = animData['maanim0' + (type + 1)];
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
	sprites = [];
	length = mamodelData.length;
	for (var j = 0; j < length; j++) {
		var row = mamodelData[j];
		var data = createSprite(j, imgcutData[row[2]], mamodelData, maxValues);
		if (row[1] == -1) data.hidden = true;
		sprites.push(data);
	}
	spritesNow = JSON.parse(JSON.stringify(sprites));
	// find animation length
	var maxF = 0;
	length = maanim.length;
	for (var k = 0; k < length; k++) {
		if (maanim[k].length >= 5 && maanim[k + 1][0] != 0) {
			var value = (maanim[k + maanim[k + 1][0] + 1][0] - maanim[k + 2][0]) * (maanim[k][2] >= 2 ? maanim[k][2] : 1);
			if (value > maxF) maxF = value;
		}
	}
	// begin walking animation or set to first frame of walking animation
	if (type == 1) {
		animate(0, maxF, animData, '02', imgcutData, maxValues);
	} else if (type == 2) {
		animate(0, 24, animData, '03', imgcutData, maxValues);
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
		if (maxF == 0) return;
		var frame = $('#input-frame').val();
		if (frame.length == 0 || frame.indexOf('.') > -1 || frame.indexOf('-') > -1) return;
		var anim = animData['maanim' + modeSelect.val()];
		frame %= maxF;
		// recreate sprites
		sprites = [];
		spritesNow = [];
		length = mamodelData.length;
		for (var j = 0; j < length; j++) {
			var row = mamodelData[j];
			var data = createSprite(j, imgcutData[row[2]], mamodelData, maxValues);
			sprites.push(data);
			if (row[1] == -1) data.hidden = true;
		}
		spritesNow = JSON.parse(JSON.stringify(sprites));
		// go through all frames from 0 to wanted frame to not miss one-time changes
		for (var f = 0; f <= frame; f++) {
			showFrame(f, anim, imgcutData, maxValues);
		}
	});
	// position unit
	if (reset) {
		var minY = Number.MAX_VALUE;
		for (const s of spritesNow) {
			if (s.hidden || getOpacity(s.id) != 1 || s.glow != 0 || s.spriteHeight * s.spriteWidth <= 16) continue;
			var scaleX = getScaleX(s.id) * getFlipX(s.id);
			var scaleY = getScaleY(s.id) * getFlipY(s.id);
			var angle = -getAngle(s.id) * degToRad;
			var sin = Math.sin(angle);
			var cos = Math.cos(angle);
			var temp = [
				s.posY + (-s.pivotX * scaleX * sin + s.pivotY * scaleY * cos),
				s.posY + ((s.spriteWidth - s.pivotX) * scaleX * sin + s.pivotY * scaleY * cos),
				s.posY + ((s.spriteWidth - s.pivotX) * scaleX * sin + (s.pivotY - s.spriteHeight) * scaleY * cos),
				s.posY + (-s.pivotX * scaleX * sin + (s.pivotY - s.spriteHeight) * scaleY * cos)
			];
			temp = Math.min(...temp);
			if (temp < minY) minY = temp;
		}
		ctx.translate((canvas.width / 2 - viewerCenter[0]) / viewerScale, (canvas.height - viewerCenter[1]) / viewerScale - defaultY + minY);
		viewerCenter[0] = canvas.width / 2;
		viewerCenter[1] = canvas.height + (minY - defaultY) * viewerScale;
	}
	// make scroll and zoom buttons usable
	$('.control-button:not(#hide-elements),.arrow-button').css('pointer-events', 'auto');
}

/**
 * create a sprite on the screen given the corresponding rows in imgcut and mamodel data
 * @param {Number} id The sprite id used by parent values
 * @param {Array[Number]} imgcutRow Row in imgcut data for the sprite
 * @param {Array[Number]} mamodel Mamodel data for the sprite
 * @param {Array[Number]} maxValues Array of numbers telling maximums for certain attributes
 * @return void
 */
function createSprite(id, imgcutRow, mamodel, maxValues) {
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
	// return sprite data for animation
	var data = {
		'id': id,
		'parent': parent,
		'spriteX': spriteX,
		'spriteY': spriteY,
		'spriteWidth': spriteWidth,
		'spriteHeight': spriteHeight,
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
		'flipY': 1,
		'posX': 0,
		'posY': 0,
		'hidden': false
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
				if (firstRow[0] == 0 || (modCount == 1 && firstRow[0] <= 0)) {
					modify(partID, imgcut, mod, firstRow[1], maxValues);
					i += modCount + 1;
					continue;
				}
			}
			if (row[2] != 1) {
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
		sprite.spriteX = row[0];
		sprite.spriteY = row[1];
		sprite.spriteWidth = row[2];
		sprite.spriteHeight = row[3];
	} else if (mod == 3) { // z depth
		sprite.z = change;
	} else if (mod == 4) { // x
		sprite.x = spriteData.x + change;
	} else if (mod == 5) { // y
		sprite.y = spriteData.y + change;
	} else if (mod == 6) { // pivot x
		sprite.pivotX = spriteData.pivotX + change;
	} else if (mod == 7) { // pivot y
		sprite.pivotY = spriteData.pivotY + change;
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
		var id = data.id;
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
		spritesNow[id].posX = pos[0][0];
		spritesNow[id].posY = pos[1][0];
	}
	paintSprites();

	function addVectors(v, u) {
		return [[v[0][0] + u[0][0]], [v[1][0] + u[1][0]]];
	}

	function applyMatrix(m, v) {
		return [[m[0][0] * v[0][0] + m[0][1] * v[1][0]], [m[1][0] * v[0][0] + m[1][1] * v[1][0]]];
	}
}

/**
 * draw background and sprites on the canvas
 * @return void
 */
function paintSprites() {
	// draw background color and background image
	if ($('#input-bg').val() === '') {
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
	} else {
		bgCanvas.width = bgImg.width * viewerScale;
		bgCanvas.height = bgImg.height * viewerScale;
		bgCtx.drawImage(bgImg, 0, 0, bgCanvas.width, bgCanvas.height);
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.globalAlpha = 1;
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.translate(canvas.width / 2, canvas.height - bgCanvas.height);
		ctx.fillStyle = ctx.createPattern(bgCanvas, 'repeat-x');
		ctx.fillRect(-canvas.width / 2, 0, canvas.width, bgCanvas.height);
		ctx.restore();
	}
	// paint sprites in order of z-index
	var spriteList = structuredClone(spritesNow);
	spriteList.sort((a, b) => { return a.z - b.z; });
	for (const sprite of spriteList) {
		if (sprite.hidden) continue;
		i = sprite.id;
		if (sprite.glow != 0) {
			ctx.globalCompositeOperation = "lighter";
		} else {
			ctx.globalCompositeOperation = "source-over";
		}
		ctx.globalAlpha = getOpacity(i);
		ctx.save();
		ctx.translate(sprite.posX, -sprite.posY);
		ctx.rotate(getAngle(i) * degToRad);
		ctx.scale(getScaleX(i) * getFlipX(i), getScaleY(i) * getFlipY(i));
		ctx.drawImage(images[currentForm], sprite.spriteX, sprite.spriteY, sprite.spriteWidth, sprite.spriteHeight, -sprite.pivotX, -sprite.pivotY, sprite.spriteWidth, sprite.spriteHeight);
		ctx.restore();
	}
}

/**
 * sets background image and retrieves the viewer's background color from it
 * @return void
 */
function setBackground() {
	if ($('#input-bg').val() === '') {
		paintSprites();
	} else {
		var img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = function () {
			bgImg = img;
			colorCtx.drawImage(img, 0, 0, colorCanvas.width, colorCanvas.height);
			bgColor = `rgb(${colorCtx.getImageData(0, 0, 1, 1).data.join(', ')})`;
			if (spritesNow) paintSprites();
		};
		img.src = '/Special:Redirect/file/' + $('#input-bg').val();
	}
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
}