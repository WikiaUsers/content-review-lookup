$(document).ready(function () {
	mw.loader.load('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
	mw.loader.load('https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.min.js');
	mw.loader.load('https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js');
	mw.loader.load('https://cdn.jsdelivr.net/gh/photopea/UPNG.js/UPNG.js');

	// constants
	const degToRad = Math.PI / 180;
	const defaultY = -140;
	const defaultZoom = 0.9;
	const buttonRateMS = 33;
	const scrollDistance = 6;
	const zoomInFactor = 1.024;
	const zoomOutFactor = 1 / zoomInFactor;
	const minZoom = 0.2;
	const maxZoom = 5;
	const bgScaleConst = 0.8;
	const bgStandardWidth = 770;
	const dpr = window.devicePixelRatio || 1;
	const mobile = window.matchMedia('(hover: none)').matches;
	const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
	const bgFiles = ['Bg000.png', 'Bg002.png'];
	const continuousFlag = 'continuous';
	const onceFlag = 'once';

	// will be modified later
	let bgScaleFactor = bgScaleConst;

	// Viewer class
	class Viewer {
		constructor($container) {
			this.initial = true;
			this.unitOrigins = new Set();
			// get data passed from template in data attributes
			this.$container = $container;
			this.json = $container.attr('data-json');
			// get animation data
			const api = new mw.Api();
			api.get({
				action: 'query',
				prop: 'revisions',
				titles: this.json,
				rvprop: 'content',
				rvslots: 'main',
				formatversion: '2'
			}).done((data) => {
				this.unitData = JSON.parse(data.query.pages[0].revisions[0].slots.main.content);
				this.setup();
			});
		}

		connect(viewer) {
			viewer.unitOrigins.add(this.origin);
			const viewerOrigin = viewer.getOrigin();
			if (viewerOrigin) this.unitOrigins.add(viewer.getOrigin());
		}

		getOrigin() {
			return this.origin;
		}

		setup() {
			this.static = !('maanim' in this.unitData);
			this.playing = false;
			this.spritesheet = {};
			this.spritesNow = [];
			this.glow = false;
			this.transparent = false;
			this.map, this.timeout;
			let focused = false;
			this.copyCanvas = document.createElement('canvas');
			this.copyCtx = this.copyCanvas.getContext('2d');
			// unit and background positioning [origin x, origin y, zoom, unit offset x, unit offset y]
			this.origin = new Proxy([0, 0, defaultZoom, 0, defaultY], {
				'set': (target, key, value) => {
					target[key] = value;
					this.calculateConversionMatrix();
					this.calculateTextureQuad();
					this.calculateUnitPosition();
					if (!this.playing) this.drawFrame();
					return true;
				}
			});
			this.unitOrigins.add(this.origin);
			// get other viewers for UnitViewer template
			this.$unitViewers = this.$container.parents('.unit-viewer').find('.animation-container').not(this.$container);
			this.$unitViewers.each((index, element) => {
				this.connect($(element).data('viewer'));
			});
			// get rest of data attributes
			const customSheet = this.$container.attr('data-spritesheet');
			const defaultBg = this.$container.attr('data-default-bg');
			this.bgType = this.$container.attr('data-bg-type');
			this.bgAlign = this.$container.attr('data-bg-align');
			this.initialFrame = this.$container.attr('data-initial-frame');
			// determine initial viewer background
			let wikiBg = window.getComputedStyle(document.body).getPropertyValue('--wiki-bg-image').slice(4, -1).replaceAll('\\', '');
			let bg;
			if (defaultBg != '') {
				bg = defaultBg;
			} else if (wikiBg) {
				bg = wikiBg;
			} else {
				bg = ($('html').hasClass('skin-theme-clientpref-os') ? window.matchMedia('(prefers-color-scheme: light)').matches : $('html').hasClass('skin-theme-clientpref-day')) ? bgFiles[0] : bgFiles[1];
			}
			this.bg = bg;
			// set up html
			const $bottomLeft = this.$container.find('.viewer-bottom-left');
			this.$playButton = $('<button>', {
				'class': 'animation-play viewer-button',
				'title': 'Проиграть/остановить анимацию'
			})
				.appendTo($bottomLeft)
				.on('click', () => {
					this.$container.toggleClass('animation-playing');
					this.$container.find('.option-once').toggle();
					this.playing = !this.playing;
					if (this.playing && (this.$modeSelect.val() == '02' || this.$modeSelect.val() == '03')) {
						this.$modeSelect.val('00');
					}
					this.renderModel(-1, true);
				});
			this.$infoButton = $('<button>', {
				'class': 'viewer-info viewer-button',
				'title': 'См. как использовать шаблон'
			})
				.appendTo(this.$container)
				.on('click', (e) => {
					e.stopPropagation();
					this.$container.addClass('info-shown');
					this.$container.one('click', () => {
						this.$container.removeClass('info-shown');
					});
				});
			this.$infoText = this.$container.find('.viewer-info-text');
			this.$downloadButton = $('<button>', {
				'class': 'viewer-download-button viewer-button',
				'title': 'Скачать анимацию или фрейм'
			})
				.appendTo($bottomLeft)
				.on('click', () => { this.download(); });
			this.$hideButton = $('<button>', {
				'class': 'hide-elements viewer-button',
				'title': 'Hide/Show UI elements'
			})
				.text('Скрыть')
				.appendTo(this.$container)
				.on('click', (e, trigger) => {
					this.$container.toggleClass('ui-hidden');
					this.$hideButton.text(this.$hideButton.text() == 'Hide' ? 'Show' : 'Hide');
					if (!trigger) this.$unitViewers.find('.hide-elements').trigger('click', true);
				});
			this.$zoomIn = $('<button>', {
				'class': 'zoom-in viewer-button'
			}).appendTo(this.$container);
			this.$zoomOut = $('<button>', {
				'class': 'zoom-out viewer-button'
			}).appendTo(this.$container);
			const $arrowPad = $('<div>', {
				'class': 'viewer-arrow-pad'
			}).appendTo(this.$container);
			this.$scrollRight = $('<button>', {
				'class': 'scroll-right viewer-arrow'
			}).appendTo($arrowPad);
			this.$scrollLeft = $('<button>', {
				'class': 'scroll-left viewer-arrow'
			}).appendTo($arrowPad);
			this.$scrollUp = $('<button>', {
				'class': 'scroll-up viewer-arrow'
			}).appendTo($arrowPad);
			this.$scrollDown = $('<button>', {
				'class': 'scroll-down viewer-arrow'
			}).appendTo($arrowPad);
			this.$menu = this.$container.find('.viewer-menu');
			const $bgRow = $('<div>', {
				'class': 'menu-row row-bg'
			}).appendTo(this.$menu);
			this.$bgInput = $('<input>', {
				'class': 'input-bg',
				'value': bg.includes('static.wikitide.net') ? bg.split('/').slice(-1)[0] : bg
			})
				.appendTo($bgRow)
				.on('change', () => {
					const newBg = this.$bgInput.val();
					if (this.bg == newBg) return;
					this.bg = newBg;
					this.updateBackground(newBg);
					const $unitContainer = this.$container.closest('.unit-viewer');
					if ($unitContainer.length > 0) {
						$unitContainer.find('.input-bg')
							.val(newBg)
							.trigger('change');
					}
				});
			const $modeRow = $('<div>', {
				'class': 'menu-row row-mode'
			}).appendTo(this.$menu);
			this.$modeSelect = $('<select>', {
				'class': 'select-mode',
				'name': 'Режим',
				'title': 'Выбрать тип анимации'
			})
				.appendTo($modeRow)
				.on('change', () => {
					this.renderModel(-1, false);
					this.$frameInput.val(0);
				});
			if (!this.static) {
				let i = 0;
				for (const anim of this.unitData.maanim) {
					$('<option>', {
						'class': `option-${anim.type}`,
						'value': i
					})
						.text(anim.name)
						.appendTo(this.$modeSelect);
					i++;
				}
			}
			const $frameRow = $('<div>', {
				'class': 'menu-row row-frame'
			}).appendTo(this.$menu);
			this.$frameInput = $('<input>', {
				'class': 'input-frame',
				'type': 'number',
				'value': 0,
				'min': 0,
				'title': 'Ввеcnb фрейм  для отображения'
			})
				.appendTo($frameRow);
			const $saveRow = $('<div>', {
				'class': 'menu-row row-save'
			}).appendTo(this.$menu);
			const $saveInputGroup = $('<div>')
				.text('~')
				.appendTo($saveRow);
			this.$saveInputLower = $('<input>', {
				'class': 'input-save-lower',
				'type': 'number',
				'min': 0
			})
				.prependTo($saveInputGroup);
			this.$saveInputUpper = $('<input>', {
				'class': 'input-save-upper',
				'type': 'number',
				'min': 0
			})
				.appendTo($saveInputGroup);
			const $fileRow = $('<div>', {
				'class': 'menu-row row-file'
			}).appendTo(this.$menu);
			this.$fileSelect = $('<select>', {
				'class': 'select-file-type'
			})
				.appendTo($fileRow)
				.append($('<option>', { 'value': 'zip' }).text('ZIP'))
				.append($('<option>', { 'value': 'gif' }).text('GIF'))
				.append($('<option>', { 'value': 'apng' }).text('APNG'));
			const $menuButtons = $('<div>', {
				'class': 'menu-button-div'
			}).appendTo(this.$menu);
			if (!this.static) {
				let i = 0;
				for (const anim of this.unitData.maanim) {
					if (anim.type === onceFlag) {
						$('<button>', {
							'class': 'menu-button',
							'data-anim': i
						})
							.text(anim.name)
							.appendTo($menuButtons);
					}
					i++;
				}
			}
			const obj = this;
			this.$container.find('.menu-button').on('click', function () {
				obj.renderModel(Number(this.dataset.anim));
			});
			this.$viewerShadow = this.$container.find('.inner-box-shadow');
			if (this.$unitViewers) this.$viewerShadow = this.$viewerShadow.add(this.$unitViewers.find('.inner-box-shadow'));
			// set up the canvas
			this.$canvas = $('<canvas class="animation-canvas">').prependTo(this.$container);
			this.canvas = this.$canvas[0];
			this.canvas.width = this.canvas.clientWidth * dpr;
			this.canvas.height = this.canvas.clientHeight * dpr;
			this.calculateConversionMatrix();
			this.gl = this.canvas.getContext('webgl', { alpha: true, preserveDrawingBuffer: true, premultipliedAlpha: true });
			if (this.gl === null) {
				this.$container.html('<strong class="error">Unable to initialize WebGL. Close and reopen your browser to see the animation viewer.</strong>');
				return;
			}
			this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
			this.gl.clearColor(0, 0, 0, 0);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			this.gl.enable(this.gl.BLEND);
			this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
			// sprite program
			const vsSourceSprites = `
				precision lowp float;

				attribute vec2 a_position;
				attribute vec2 a_texcoord;
				uniform mat3 u_transform;
				varying vec2 v_texcoord;

				void main() {
					gl_Position = vec4((u_transform * vec3(a_position, 1)).xy, 0, 1);
					v_texcoord = a_texcoord;
				}
			`;
			const fsSourceSprites = `
				precision lowp float;

				uniform sampler2D u_texture;
				uniform float u_opacity;
				varying vec2 v_texcoord;

				void main() {
					gl_FragColor = texture2D(u_texture, v_texcoord) * u_opacity;
				}
			`;
			this.spriteProgram = this.createProgram(vsSourceSprites, fsSourceSprites);
			this.aLocationsSprite = {
				'position': this.gl.getAttribLocation(this.spriteProgram, 'a_position'),
				'texcoord': this.gl.getAttribLocation(this.spriteProgram, 'a_texcoord')
			};
			this.uLocationsSprite = {
				'transform': this.gl.getUniformLocation(this.spriteProgram, 'u_transform'),
				'tex': this.gl.getUniformLocation(this.spriteProgram, 'u_texture'),
				'opacity': this.gl.getUniformLocation(this.spriteProgram, 'u_opacity')
			};
			const placeholder = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			this.spriteBuffers = {
				'pos': this.gl.createBuffer(),
				'texcoord': this.gl.createBuffer()
			};
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteBuffers.pos);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(placeholder), this.gl.STREAM_DRAW);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteBuffers.texcoord);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(placeholder), this.gl.STREAM_DRAW);
			// background program
			const vsSourceBackground = `
				precision lowp float;

				attribute vec2 a_position;
				attribute vec2 a_texcoord;
				varying vec2 v_texcoord;

				void main() {
					gl_Position = vec4(a_position, 0, 1);
					v_texcoord = a_texcoord;
				}
			`;
			const fsSourceBackground = `
				precision lowp float;

				uniform sampler2D u_texture;
				varying vec2 v_texcoord;

				void main() {
					gl_FragColor = texture2D(u_texture, vec2(fract(v_texcoord.x), v_texcoord.y));
				}
			`;
			this.backgroundProgram = this.createProgram(vsSourceBackground, fsSourceBackground);
			this.aLocationsBackground = {
				'position': this.gl.getAttribLocation(this.backgroundProgram, 'a_position'),
				'texcoord': this.gl.getAttribLocation(this.backgroundProgram, 'a_texcoord')
			};
			this.uLocationsBackground = {
				'tex': this.gl.getUniformLocation(this.backgroundProgram, 'u_texture')
			};
			const screen = new Float32Array([-1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, -1]);
			this.textureQuad = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
			this.backgroundBuffers = {
				'pos': this.gl.createBuffer(),
				'texcoord': this.gl.createBuffer()
			};
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.backgroundBuffers.pos);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, screen, this.gl.STATIC_DRAW);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.backgroundBuffers.texcoord);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, this.textureQuad, this.gl.STATIC_DRAW);
			// create initial background texture
			this.backgroundInfo = {
				'width': 1,
				'height': 1,
				'texture': this.gl.createTexture()
			};
			// handling resize
			const previousSize = [this.$container.width(), this.$container.height()];
			new ResizeObserver(() => {
				const currentSize = [this.$container.width(), this.$container.height()];
				this.canvas.width = currentSize[0] * dpr;
				this.canvas.height = currentSize[1] * dpr;
				this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
				[this.origin[0], this.origin[1]] = [
					this.origin[0] * (currentSize[0] / previousSize[0]),
					this.origin[1] * (currentSize[1] / previousSize[1])
				];
				this.calculateConversionMatrix();
				this.drawFrame();
				[previousSize[0], previousSize[1]] = [currentSize[0], currentSize[1]];
			}).observe(this.$container[0]);
			// scrolling and zooming with buttons [x, y, zoom]
			this.interval = {};
			if (mobile) {
				this.$scrollUp.on('touchstart', () => {
					this.interval.up = setInterval(() => { this.unitOrigins.forEach((origin) => { origin[4] += scrollDistance; }); }, buttonRateMS);
				});
				this.$scrollDown.on('touchstart', () => {
					this.interval.down = setInterval(() => { this.unitOrigins.forEach((origin) => { origin[4] -= scrollDistance; }); }, buttonRateMS);
				});
				this.$scrollLeft.on('touchstart', () => {
					this.interval.left = setInterval(() => { this.unitOrigins.forEach((origin) => { origin[3] -= scrollDistance; }); }, buttonRateMS);
				});
				this.$scrollRight.on('touchstart', () => {
					this.interval.right = setInterval(() => { this.unitOrigins.forEach((origin) => { origin[3] += scrollDistance; }); }, buttonRateMS);
				});
			} else {
				this.$scrollUp.on('mousedown', () => {
					this.interval.up = setInterval(() => { this.unitOrigins.forEach((origin) => { origin[1] -= scrollDistance; }); }, buttonRateMS);
				});
				this.$scrollDown.on('mousedown', () => {
					this.interval.down = setInterval(() => { this.unitOrigins.forEach((origin) => { origin[1] += scrollDistance; }); }, buttonRateMS);
				});
				this.$scrollLeft.on('mousedown', () => {
					this.interval.left = setInterval(() => { this.unitOrigins.forEach((origin) => { origin[0] += scrollDistance; }); }, buttonRateMS);
				});
				this.$scrollRight.on('mousedown', () => {
					this.interval.right = setInterval(() => { this.unitOrigins.forEach((origin) => { origin[0] -= scrollDistance; }); }, buttonRateMS);
				});
			}
			this.$zoomIn.on('mousedown touchstart', () => {
				this.interval.in = setInterval(() => { this.zoom(zoomInFactor); }, buttonRateMS);
			});
			this.$zoomOut.on('mousedown touchstart', () => {
				this.interval.out = setInterval(() => { this.zoom(zoomOutFactor); }, buttonRateMS);
			});
			$(window).on('mouseup touchend', () => {
				clearInterval(this.interval.up);
				clearInterval(this.interval.down);
				clearInterval(this.interval.left);
				clearInterval(this.interval.right);
				clearInterval(this.interval.out);
				clearInterval(this.interval.in);
			});
			// desktop controls
			if (!mobile) {
				// mouse scroll and zoom (only zoom on Firefox)
				this.$container[0].addEventListener('wheel', (e) => {
					if (!focused || e.target !== this.canvas) return;
					if (!Number.isInteger(e.deltaY) || isFirefox) {
						const rect = this.$container[0].getBoundingClientRect();
						const origin = [e.clientX - rect.left - this.$canvas.width() / 2, this.$canvas.height() / 2 - e.clientY + rect.top];
						this.zoom(1 / (1 + e.deltaY / 150), origin);
					} else {
						this.scroll(e.wheelDeltaX / 2.5, -e.wheelDeltaY / 2.5);
					}
					e.preventDefault();
				});
				// mouse dragging
				let isDragging = false;
				let initialX, initialY, clickX, clickY;
				this.$container[0].addEventListener('pointerdown', (e) => {
					if (e.pointerType != 'mouse' || e.target !== this.canvas) return;
					const rect = this.$container[0].getBoundingClientRect();
					const cornerX = rect.left + this.$container.width();
					const cornerY = rect.top + this.$container.height();
					if (e.clientX >= cornerX - 15 && e.clientX <= cornerX && e.clientY >= cornerY - 15 && e.clientY <= cornerY) return;
					initialX = this.origin[3];
					initialY = this.origin[4];
					clickX = e.clientX;
					clickY = e.clientY;
					isDragging = true;
					this.$container[0].style.cursor = 'grabbing';
					e.preventDefault();
				});
				this.$container[0].addEventListener('pointermove', (e) => {
					if (e.pointerType != 'mouse' || !isDragging) return;
					this.unitOrigins.forEach((origin) => {
						[origin[3], origin[4]] = [initialX + (e.clientX - clickX) / origin[2], initialY + (clickY - e.clientY) / origin[2]];
					});
					e.preventDefault();
				});
				this.$container[0].addEventListener('pointerup', (e) => {
					if (e.pointerType != 'mouse') return;
					isDragging = false;
					this.$container[0].style.cursor = 'grab';
					if (clickX == e.clientX && clickY == e.clientY) {
						focused = !focused;
						this.$viewerShadow.toggle();
					}
				});
				this.$container[0].addEventListener('pointerleave', (e) => {
					if (e.pointerType != 'mouse') return;
					isDragging = false;
					this.$container[0].style.cursor = 'grab';
				});
			}
			// mobile controls
			if (mobile) {
				let isDragging = false;
				let initialX, initialY, touchX, touchY, touchNewX, touchNewY, initial, midpoint;
				let touchCount = 1;
				this.$container[0].addEventListener('touchstart', (e) => {
					if (e.touches.length == 2) {
						if (!focused) return;
						const rect = this.$container[0].getBoundingClientRect();
						const touch1 = e.touches[0];
						const touch2 = e.touches[1];
						if (touch1.target !== this.canvas || touch2.target !== this.canvas) {
							touchX = '';
							return;
						}
						touchCount = 2;
						initial = Math.sqrt(Math.pow(touch1.clientX - touch2.clientX, 2) + Math.pow(touch1.clientY - touch2.clientY, 2));
						midpoint = [
							(touch1.clientX + touch2.clientX) / 2 - rect.x - this.$canvas.width() / 2,
							this.$canvas.height() / 2 - (touch1.clientY + touch2.clientY) / 2 + rect.y
						];
					} else if (e.touches.length == 1) {
						const touch = e.touches[0];
						if (touch.target !== this.canvas) {
							touchX = '';
							return;
						}
						touchX = touch.clientX;
						touchY = touch.clientY;
						touchNewX = touch.clientX;
						touchNewY = touch.clientY;
						if (!focused) return;
						initialX = this.origin[0];
						initialY = this.origin[1];
						touchCount = 1;
						isDragging = true;
					}
				});
				this.$container[0].addEventListener('touchmove', (e) => {
					if (touchCount == 2) {
						if (initial) {
							const rect = this.$container[0].getBoundingClientRect();
							const touch1 = e.touches[0];
							const touch2 = e.touches[1];
							const current = Math.sqrt(Math.pow(touch1.clientX - touch2.clientX, 2) + Math.pow(touch1.clientY - touch2.clientY, 2));
							this.zoom(current / initial, midpoint);
							initial = current;
							touchNewX = null;
							touchNewY = null;
						}
					} else if (touchCount == 1) {
						const touch = e.touches[0];
						touchNewX = touch.clientX;
						touchNewY = touch.clientY;
						if (!isDragging) return;
						this.unitOrigins.forEach((origin) => {
							[origin[0], origin[1]] = [initialX + touch.clientX - touchX, initialY + touchY - touch.clientY];
						});
						e.preventDefault();
					}
				});
				this.$container[0].addEventListener('touchend', (e) => {
					if (touchX === touchNewX && touchY === touchNewY) {
						focused = !focused;
						this.$viewerShadow.toggle();
						this.$container.css('touch-action', this.$container.css('touch-action') == 'none' ? 'auto' : 'none');
					}
					if (e.touches.length < 1) {
						isDragging = false;
					}
					if (e.touches.length < 2) {
						initial = null;
					}
				});
			}

			this.spritesheet = this.createTextureInfo(mw.util.getUrl('Special:Redirect/file/' + customSheet), false, true);

			// remove bg loading gif
			this.$container.css('background-image', 'none');
		}

		scroll(dx, dy) {
			this.unitOrigins.forEach((origin) => {
				[origin[0], origin[1]] = [origin[0] + dx, origin[1] + dy];
			});
		}

		zoom(factor, origin = [0, 0]) {
			const newZoom = this.origin[2] * factor;
			if (newZoom < minZoom || newZoom > maxZoom) return;
			this.unitOrigins.forEach((viewerOrigin) => {
				[viewerOrigin[0], viewerOrigin[1], viewerOrigin[2]] = [
					(viewerOrigin[0] - origin[0]) * factor + origin[0],
					(viewerOrigin[1] - origin[1]) * factor + origin[1],
					viewerOrigin[2] * factor
				];
			});
		}

		download() {
			const range = [this.$saveInputLower.val(), this.$saveInputUpper.val()];
			const nan = [isNaN(range[0]), isNaN(range[1])];
			if (nan[0] && nan[1]) return;
			if (range[0] == range[1] || (nan[0] || nan[1])) {
				const frame = nan[1] ? range[0] : range[1];
				this.$frameInput
					.val(frame)
					.trigger('input');
				const imageData = this.copyToCanvas().toDataURL();
				const $a = $('<a>').attr({
					'href': imageData,
					'download': `animation_frame_${frame}.png`
				});
				$a[0].click();
			} else {
				switch (this.$fileSelect.val()) {
					case 'zip':
						this.generateZIP(range);
						break;
					case 'gif':
						this.generateGIF(range);
						break;
					case 'apng':
						this.generateAPNG(range);
				}
			}
		}

		copyToCanvas(onlyData = false) {
			if (!(isFirefox || onlyData)) {
				return this.canvas;
			}
			const width = this.gl.drawingBufferWidth;
			const height = this.gl.drawingBufferHeight;
			const data = new Uint8Array(width * height * 4);
			this.gl.readPixels(0, 0, width, height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
			for (let i = 0; i < data.length; i += 4) {
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				const a = data[i + 3];
				if (a > 0 && a < 255) {
					data[i] = Math.min(255, Math.round(r * 255 / a));
					data[i + 1] = Math.min(255, Math.round(g * 255 / a));
					data[i + 2] = Math.min(255, Math.round(b * 255 / a));
				}
			}
			const flippedData = new Uint8Array(data.length);
			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					const originalIndex = (y * width + x) * 4;
					const flippedY = height - 1 - y;
					const flippedIndex = (flippedY * width + x) * 4;
					flippedData[flippedIndex] = data[originalIndex];
					flippedData[flippedIndex + 1] = data[originalIndex + 1];
					flippedData[flippedIndex + 2] = data[originalIndex + 2];
					flippedData[flippedIndex + 3] = data[originalIndex + 3];
				}
			}
			if (onlyData) return flippedData;
			this.copyCtx.reset();
			this.copyCanvas.width = width;
			this.copyCanvas.height = height;
			const imageData = new ImageData(new Uint8ClampedArray(flippedData), width, height);
			this.copyCtx.putImageData(imageData, 0, 0);
			return this.copyCanvas;
		}

		async generateZIP(range) {
			const zip = new JSZip();
			const folder = zip.folder('frames');
			const fList = [];
			if (range[0] > range[1]) {
				for (let i = range[0]; i >= range[1]; i--) {
					fList.push(i);
				}
			} else {
				for (let i = range[0]; i <= range[1]; i++) {
					fList.push(i);
				}
			}
			for (const f of fList) {
				this.$frameInput
					.val(f)
					.trigger('input');
				const blob = await new Promise(resolve => this.copyToCanvas().toBlob(resolve, 'image/png'));
				folder.file(`frame_${f}.png`, blob);
			}
			zip.generateAsync({ type: 'blob' }).then((content) => {
				const $a = $('<a>').attr({
					'href': URL.createObjectURL(content),
					'download': 'animation_frames.zip'
				});
				$a[0].click();
			});
		}

		generateGIF(range) {
			let gifLoading = fetch('https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.worker.js')
				.then((response) => {
					if (response.ok) return response.blob();
				})
				.then(workerBlob => {
					let gif = new GIF({
						workers: 4,
						workerScript: URL.createObjectURL(workerBlob),
						quality: 1,
						width: this.canvas.width,
						height: this.canvas.height
					});
					gif.on('finished', function (blob) {
						const $a = $('<a>').attr({
							'href': URL.createObjectURL(blob),
							'download': `animation_frame_${range[0]}-${range[1]}.gif`
						});
						$a[0].click();
					});
					return gif;
				});

			gifLoading.then(gif => {
				const fList = [];
				if (range[0] > range[1]) {
					for (let i = range[0]; i >= range[1]; i--) {
						fList.push(i);
					}
				} else {
					for (let i = range[0]; i <= range[1]; i++) {
						fList.push(i);
					}
				}
				for (const f of fList) {
					this.$frameInput
						.val(f)
						.trigger('input');
					gif.addFrame(this.canvas, { copy: true, delay: 30 });
				}
				gif.render();
			});
		}

		generateAPNG(range) {
			const frames = [];
			const fList = [];
			if (range[0] > range[1]) {
				for (let i = range[0]; i >= range[1]; i--) {
					fList.push(i);
				}
			} else {
				for (let i = range[0]; i <= range[1]; i++) {
					fList.push(i);
				}
			}
			for (const f of fList) {
				this.$frameInput
					.val(f)
					.trigger('input');
				frames.push(this.copyToCanvas(true));
			}
			const apngData = UPNG.encode(frames, this.canvas.width, this.canvas.height, 0, new Array(frames.length).fill(33));
			const blob = new Blob([apngData], { type: 'image/apng' });
			const $a = $('<a>').attr({
				'href': URL.createObjectURL(blob),
				'download': `animation_frame_${range[0]}-${range[1]}.png`
			});
			$a[0].click();
		}

		renderModel(type, inputDefault) {
			this.stopAnimation();
			let mode = this.$modeSelect.val();
			const animData = this.unitData;
			// set mode to first continuous animation type if selected is type once when turning player on
			if (this.playing && animData.maanim[mode].type === onceFlag) {
				for (let m = 0; m < animData.maanim.length; m++) {
					if (animData.maanim[m].type === continuousFlag) {
						mode = m;
						this.$modeSelect.val(m);
						break;
					}
				}
			}
			// get each component of animation data
			let imgcut = animData.imgcut;
			const mamodel = animData.mamodel;
			const animNum = type != -1 ? type : mode;
			let maanim;
			if (!this.static) maanim = animData.maanim[animNum].data;
			// clean up mamodel data
			const mamodelData = [];
			let length = mamodel.length;
			for (let z = 0; z < length; z++) {
				if (mamodel[z].length >= 13) {
					mamodelData.push(mamodel[z]);
				}
			}
			const maxValues = mamodel[3 + mamodel[2][0]];
			// prepare imgcut data
			let imgcutReal = {};
			if (Array.isArray(imgcut)) {
				let imgcutID = '0';
				for (const row of mamodelData) {
					if (row[1] != -1) {
						imgcutID = row[1].toString();
						break;
					}
				}
				imgcutReal[imgcutID] = imgcut;
			} else {
				imgcutReal = imgcut;
			}
			// take only necessary parts of imgcut and mamodel
			const imgcutData = {};
			for (const key in imgcutReal) {
				imgcutData[key] = [];
				const length = imgcutReal[key].length;
				for (let i = 0; i < length; i++) {
					if (imgcutReal[key][i].length >= 4) {
						imgcutData[key].push(imgcutReal[key][i]);
					}
				}
			}

			// create each sprite defined by mamodel
			this.sprites = [];
			length = mamodelData.length;
			for (let j = 0; j < length; j++) {
				const row = mamodelData[j];
				const imgcutRow = row[1] == -1 ? [0, 0, 0, 0] : imgcutData[row[1].toString()][row[2]];
				const data = this.createSprite(j, imgcutRow, mamodelData, maxValues);
				if (row[1] == -1) data.hidden = true;
				this.sprites.push(data);
			}
			this.spritesNow = structuredClone(this.sprites);
			this.spritesTotal = Array.from({ length: length }, () => ({}));

			// for static images without maanim files
			if (this.static) {
				this.updateSprites(true);
				return;
			}

			// find animation length
			let maxF = 0;
			if (animData.maanim[animNum].name === 'Отскок') {
				maxF = 24;
			} else {
				length = maanim.length;
				for (let k = 0; k < length; k++) {
					if (maanim[k].length >= 5 && maanim[k + 1][0] != 0) {
						const value = maanim[k + 2][0] + (maanim[k + maanim[k + 1][0] + 1][0] - maanim[k + 2][0]) * (maanim[k][2] >= 2 ? maanim[k][2] : 1);
						if (value > maxF) maxF = value;
					}
				}
			}

			// begin walking animation or set to first frame of walking animation
			if (this.playing) {
				this.animate(0, maxF, maanim, animData.maanim[animNum].type, imgcutData, maxValues);
			} else {
				this.showFrame(this.initialFrame, maanim, imgcutData, maxValues);
				this.$saveInputLower.val(0);
				this.$saveInputUpper.val(maxF);
			}

			// frame handler
			this.$frameInput.off('input');
			this.$frameInput.on('input', () => {
				if (maxF == 0) return;
				let frame = this.$frameInput.val();
				if (frame.length == 0 || frame.indexOf('.') > -1 || frame.indexOf('-') > -1) return;
				const currentMode = Number(this.$modeSelect.val());
				const anim = animData.maanim[currentMode].data;
				if (animData.maanim[animNum].type === 'once') frame %= maxF + 1;

				if (
					this.prevFrameInput
					&& this.prevFrameInput[0] === currentMode
					&& (
						[frame - 1, frame].includes(this.prevFrameInput[1]) ||
						// incrementing count/keeping it the same
						(this.prevFrameInput[1] == frame + 1 && frame > 100)
						// horrifically slow above frame ~25 (tested on Ultima
						// Galaxy Cosmo) so keep this in as a compromise
						// between accuracy and performance
						// (a lot better now that it no longer draws every
						// single frame, but still leaving it here for high
						// frame numbers just in case)
					)
				) {
					// most common use case is where you're just incrementing
					// the count, so all of the rest of this function does not
					// need to happen
					this.showFrame(frame, anim, imgcutData, maxValues);
					this.prevFrameInput = [currentMode, frame];
					return;
				}
				this.prevFrameInput = [currentMode, frame];
				// make sure to save prev frame input

				// recreate sprites
				this.sprites = [];
				const length = mamodelData.length;
				for (let j = 0; j < length; j++) {
					const row = mamodelData[j];
					const imgcutRow = row[1] == -1 ? [0, 0, 0, 0] : imgcutData[row[1].toString()][row[2]];
					const data = this.createSprite(j, imgcutRow, mamodelData, maxValues);
					if (row[1] == -1) data.hidden = true;
					this.sprites.push(data);
				}
				this.spritesNow = structuredClone(this.sprites);
				this.spritesTotal = Array.from({ length: length }, () => ({}));

				// go through all frames from 0 to wanted frame to not miss one-time changes
				for (let f = 0; f <= frame; f++) {
					this.showFrame(f, anim, imgcutData, maxValues, f == frame);
				}
			});
			if (inputDefault) this.$frameInput.val(this.initialFrame);

			// unit and background positioning for initial load
			if (this.initial) {
				let minY = 0;
				for (const s of this.spritesNow) {
					if (s.hidden || this.getOpacity(s.id) < 0.9 || s.glow != 0 || s.spriteHeight * s.spriteWidth <= 16) continue;
					const scaleX = this.getScaleX(s.id) * this.getFlipX(s.id);
					const scaleY = this.getScaleY(s.id) * this.getFlipY(s.id);
					const angle = -this.getAngle(s.id) * degToRad;
					const sin = Math.sin(angle);
					const cos = Math.cos(angle);
					let temp = [
						s.posY + (-s.pivotX * scaleX * sin + s.pivotY * scaleY * cos),
						s.posY + ((s.spriteWidth - s.pivotX) * scaleX * sin + s.pivotY * scaleY * cos),
						s.posY + ((s.spriteWidth - s.pivotX) * scaleX * sin + (s.pivotY - s.spriteHeight) * scaleY * cos),
						s.posY + (-s.pivotX * scaleX * sin + (s.pivotY - s.spriteHeight) * scaleY * cos)
					];
					temp = Math.min(...temp);
					if (temp < minY) minY = temp;
				}
				const bgMoveX = (this.canvas.clientWidth - this.backgroundInfo.width) * this.origin[2] / 2;
				const newOrigin = [bgMoveX, 0, 0, -bgMoveX / this.origin[2], defaultY - minY];
				if (this.bgAlign === 'top') {
					const bgMoveY = this.canvas.clientHeight - this.backgroundInfo.height * this.origin[2];
					[newOrigin[1], newOrigin[4]] = [bgMoveY, newOrigin[4] - bgMoveY / this.origin[2]];
				}
				[this.origin[0], this.origin[1], this.origin[3], this.origin[4]] = [newOrigin[0], newOrigin[1], newOrigin[3], newOrigin[4]];
			} else { // still call these which is initially done by the origin proxy
				this.calculateConversionMatrix();
				this.calculateTextureQuad();
				this.calculateUnitPosition();
				this.drawFrame();
			}
			this.initial = false;
		}

		createSprite(id, imgcutRow, mamodel, maxValues) {
			const mamodelRow = mamodel[id];
			if (!imgcutRow) imgcutRow = [0, 0, 0, 0];
			// read max value data
			const maxScale = maxValues[0];
			const maxAngle = maxValues[1] / 360;
			const maxOpacity = maxValues[2];
			// return sprite data for animation
			return {
				'id': id,
				'parent': mamodelRow[0],
				'spriteX': imgcutRow[0],
				'spriteY': imgcutRow[1],
				'spriteWidth': imgcutRow[2],
				'spriteHeight': imgcutRow[3],
				'z': mamodelRow[3],
				'x': id == 0 ? 0 : mamodelRow[4],
				'y': id == 0 ? 0 : mamodelRow[5],
				'pivotX': mamodelRow[6],
				'pivotY': mamodelRow[7],
				'scaleX': mamodelRow[8] / maxScale,
				'scaleY': mamodelRow[9] / maxScale,
				'angle': mamodelRow[10] / maxAngle,
				'opacity': mamodelRow[11] / maxOpacity,
				'glow': mamodelRow[12],
				'flipX': 1,
				'flipY': 1,
				'posX': 0,
				'posY': 0,
				'hidden': false
			};
		}

		animate(frame, length, maanim, type, imgcutData, maxValues) {
			if (frame < length || type === 'continuous') {
				this.timeout = setTimeout(() => { this.animate(frame + 1, length, maanim, type, imgcutData, maxValues); }, 33.33);
			} else if (frame >= length && type === 'once') {
				this.renderModel(-1, false);
				return;
			}
			this.showFrame(frame, maanim, imgcutData, maxValues);
		}

		stopAnimation() {
			clearTimeout(this.timeout);
		}

		showFrame(frame, maanim, imgcut, maxValues, updateCanvas = true) {
			const length = maanim.length;
			for (let i = 0; i < length; i++) {
				const row = maanim[i];
				if (row.length >= 5) {
					const partID = row[0];
					const mod = row[1];
					const modCount = maanim[i + 1][0];
					if (modCount == 0) continue;
					let frameNow = frame;
					if (frame == 0) {
						const firstRow = maanim[i + 2];
						if (firstRow[0] == 0 || (modCount == 1 && firstRow[0] <= 0)) {
							this.modify(partID, imgcut, mod, firstRow[1], maxValues);
							i += modCount + 1;
							continue;
						}
					}
					if (row[2] != 1) {
						const fMin = maanim[i + 2][0];
						const fMax = maanim[i + modCount + 1][0];
						frameNow = (frame - fMin) % (fMax - fMin) + fMin;
					}
					if (modCount == 1) {
						if (frameNow == maanim[i + 2][0]) {
							this.modify(partID, imgcut, mod, maanim[i + 2][1], maxValues);
							i += 2;
							continue;
						}
					}
					const last = i + modCount;
					if (frameNow >= maanim[last + 1][0]) { // case for frames past defined modifications
						this.modify(partID, imgcut, mod, maanim[last + 1][1], maxValues);
					} else {
						for (let k = i + 2; k <= last; k++) {
							const modRow = maanim[k];
							const nextRow = maanim[k + 1];
							const f = modRow[0];
							const nextF = nextRow[0];
							if (f <= frameNow && frameNow < nextF) {
								if (mod == 0) {
									this.modify(partID, imgcut, 0, modRow[1], maxValues);
									break;
								}
								const change = modRow[1];
								const nextChange = nextRow[1];
								const ease = modRow[2];
								let step;
								if (ease == 0) { // linear
									step = change + (nextChange - change) / (nextF - f) * (frameNow - f);
								} else if (ease == 1) { // step
									step = frameNow == nextF ? nextChange : change;
								} else if (ease == 2) { // semi-circle with different exponents
									const p = modRow[3];
									const x = (frameNow - f) / (nextF - f);
									step = (nextChange - change) * (p >= 0 ? 1 - Math.sqrt(1 - Math.pow(x, p)) : Math.sqrt(1 - Math.pow(1 - x, -p))) + change;
								} else if (ease == 3) { // lagrange
									const points = [];
									let frameRow;
									const min = i + 2;
									for (let a = k; a >= min; a--) {
										frameRow = maanim[a];
										if (frameRow[2] != 3) break;
										points.push([frameRow[0], frameRow[1]]);
									}
									const max = i + modCount + 2;
									for (let b = k + 1; b < max; b++) {
										frameRow = maanim[b];
										points.push([frameRow[0], frameRow[1]]);
										if (frameRow[2] != 3) break;
									}
									const deg = points.length;
									step = 0;
									for (let j = 0; j < deg; j++) {
										let prod = points[j][1];
										for (let l = 0; l < deg; l++) {
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
								this.modify(partID, imgcut, mod, step, maxValues);
								break;
							}
						}
					}
					i += modCount + 1;
				}
			}
			this.updateSprites(updateCanvas);
		}

		modify(partID, imgcut, mod, change, maxValues) {
			const spriteData = this.sprites[partID];
			const sprite = this.spritesNow[partID];
			switch (mod) {
				case 0: // parent
					sprite.parent = change;
					break;
				case 2: // sprite
					const row = imgcut[Object.keys(imgcut)[0]][change];
					sprite.spriteX = row[0];
					sprite.spriteY = row[1];
					sprite.spriteWidth = row[2];
					sprite.spriteHeight = row[3];
					break;
				case 3: // depth
					sprite.z = change;
					break;
				case 4: // x
					sprite.x = spriteData.x + change;
					break;
				case 5: // y
					sprite.y = spriteData.y + change;
					break;
				case 6: // pivot x
					sprite.pivotX = spriteData.pivotX + change;
					break;
				case 7: // pivot y
					sprite.pivotY = spriteData.pivotY + change;
					break;
				case 8: // scale
					change /= maxValues[0];
					sprite.scaleX = change * spriteData.scaleX;
					sprite.scaleY = change * spriteData.scaleY;
					break;
				case 9: // scaleX
					sprite.scaleX = change / maxValues[0] * spriteData.scaleX;
					break;
				case 10: // scaleY
					sprite.scaleY = change / maxValues[0] * spriteData.scaleY;
					break;
				case 11: // rotate
					sprite.angle = spriteData.angle + change / (maxValues[1] / 360);
					break;
				case 12: // opacity
					sprite.opacity = change / maxValues[2] * spriteData.opacity;
					break;
				case 13: // horizontal flipping
					sprite.flipX = change == 0 ? 1 : -1;
					break;
				case 14: // vertical flipping
					sprite.flipY = change == 0 ? 1 : -1;
			}
		}

		updateSprites(updateCanvas) {
			const length = this.spritesNow.length;
			this.spritesTotal = Array.from({ length: length }, () => ({}));
			for (let i = 0; i < length; i++) {
				let pos = [0, 0];
				const vectors = [];
				let data = this.spritesNow[i];
				const id = data.id;
				let parent = this.spritesNow[data.parent];
				while (data.parent != -1) {
					const a = parent.angle * degToRad * this.getFlipX(parent.id) * this.getFlipY(parent.id);
					const cos = Math.cos(a);
					const sin = Math.sin(a);
					vectors.unshift([[data.x, -data.y], [parent.scaleX * parent.flipX, 0, 0, parent.scaleY * parent.flipY], [cos, sin, -sin, cos]]);
					data = parent;
					parent = this.spritesNow[parent.parent];
				}
				const len = vectors.length;
				let row;
				for (let j = 0; j < len; j++) {
					row = vectors[j];
					for (let k = j; k < len; k++) {
						vectors[k][0] = applyMatrix(row[1], vectors[k][0]);
					}
				}
				for (let j = 0; j < len; j++) {
					row = vectors[j];
					for (let l = j; l < len; l++) {
						vectors[l][0] = applyMatrix(row[2], vectors[l][0]);
					}
					pos = addVectors(pos, row[0]);
				}
				this.spritesNow[id].posX = pos[0];
				this.spritesNow[id].posY = pos[1];
			}
			if (updateCanvas) this.drawFrame();

			function addVectors(v, u) {
				return [v[0] + u[0], v[1] + u[1]];
			}

			function applyMatrix(m, v) {
				return [m[0] * v[0] + m[1] * v[1], m[2] * v[0] + m[3] * v[1]];
			}
		}

		drawFrame() {
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			// draw background
			this.gl.useProgram(this.backgroundProgram);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.backgroundBuffers.pos);
			this.gl.enableVertexAttribArray(this.aLocationsBackground.position);
			this.gl.vertexAttribPointer(this.aLocationsBackground.position, 2, this.gl.FLOAT, false, 0, 0);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.backgroundBuffers.texcoord);
			this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.textureQuad);
			this.gl.enableVertexAttribArray(this.aLocationsBackground.texcoord);
			this.gl.vertexAttribPointer(this.aLocationsBackground.texcoord, 2, this.gl.FLOAT, false, 0, 0);
			this.gl.activeTexture(this.gl.TEXTURE0);
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.backgroundInfo.texture);
			this.gl.uniform1i(this.uLocationsBackground.tex, 0);
			this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
			// draw unit
			this.gl.useProgram(this.spriteProgram);
			this.gl.activeTexture(this.gl.TEXTURE0);
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.spritesheet.texture);
			const matrix = multiplyMat3(this.unitConvert, this.unitPosition);
			const spriteList = Object.values(this.spritesNow);
			spriteList.sort((a, b) => { return a.z - b.z; });
			for (const sprite of spriteList) {
				const id = sprite.id;
				const opacity = this.getOpacity(id);
				if (sprite.hidden || opacity === 0) continue;
				const angle = this.getAngle(id) * degToRad;
				const cos = Math.cos(angle);
				const sin = Math.sin(angle);
				const sx = this.getScaleX(id) * this.getFlipX(id);
				const sy = this.getScaleY(id) * this.getFlipY(id);
				const transform = [
					sx * cos, -sx * sin, 0,
					sy * sin, sy * cos, 0,
					sprite.posX, sprite.posY, 1
				];
				const finalMatrix = multiplyMat3(matrix, transform);
				const initial = [
					-sprite.pivotX, sprite.pivotY, sprite.spriteWidth - sprite.pivotX, sprite.pivotY, -sprite.pivotX, sprite.pivotY - sprite.spriteHeight,
					-sprite.pivotX, sprite.pivotY - sprite.spriteHeight, sprite.spriteWidth - sprite.pivotX, sprite.pivotY, sprite.spriteWidth - sprite.pivotX, sprite.pivotY - sprite.spriteHeight
				];
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteBuffers.pos);
				this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(initial));
				this.gl.enableVertexAttribArray(this.aLocationsSprite.position);
				this.gl.vertexAttribPointer(this.aLocationsSprite.position, 2, this.gl.FLOAT, false, 0, 0);
				const imgcut = [
					sprite.spriteX, sprite.spriteY, sprite.spriteX + sprite.spriteWidth, sprite.spriteY, sprite.spriteX, sprite.spriteY + sprite.spriteHeight,
					sprite.spriteX, sprite.spriteY + sprite.spriteHeight, sprite.spriteX + sprite.spriteWidth, sprite.spriteY, sprite.spriteX + sprite.spriteWidth, sprite.spriteY + sprite.spriteHeight
				];
				for (let i = 0; i < imgcut.length; i += 2) {
					imgcut[i] /= this.spritesheet.width;
				}
				for (let i = 1; i < imgcut.length; i += 2) {
					imgcut[i] /= this.spritesheet.height;
				}
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.spriteBuffers.texcoord);
				this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(imgcut));
				this.gl.enableVertexAttribArray(this.aLocationsSprite.texcoord);
				this.gl.vertexAttribPointer(this.aLocationsSprite.texcoord, 2, this.gl.FLOAT, false, 0, 0);
				this.gl.uniformMatrix3fv(this.uLocationsSprite.transform, false, finalMatrix);
				this.gl.uniform1i(this.uLocationsSprite.tex, 0);
				this.gl.uniform1f(this.uLocationsSprite.opacity, opacity);
				if (!this.glow && sprite.glow != 0) {
					this.glow = true;
					if (this.transparent) {
						this.gl.blendFuncSeparate(this.gl.ONE, this.gl.ONE, this.gl.ZERO, this.gl.ONE);
					} else {
						this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
					}
				} else if (this.glow && sprite.glow == 0) {
					this.glow = false;
					this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
				}
				this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
			}
		}

		updateBackground(bg) {
			this.bgImg = new Image();
			this.bgImg.crossOrigin = 'anonymous';
			this.bgImg.onload = () => {
				this.transparent = false;
				bgScaleFactor = this.bgType === 'stage' ? bgStandardWidth / this.bgImg.width * bgScaleConst : 1;
				this.backgroundInfo.width = this.bgImg.width;
				this.backgroundInfo.height = this.bgImg.height;
				this.gl.activeTexture(this.gl.TEXTURE0);
				this.gl.bindTexture(this.gl.TEXTURE_2D, this.backgroundInfo.texture);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.bgImg);
				this.renderModel(-1, true);
			};
			this.bgImg.onerror = () => {
				let color = [0, 0, 0, 0];
				if (bg.length === 7 && !isNaN(Number(`0x${bg.slice(1)}`))) {
					color = [Number(`0x${bg.slice(1, 3)}`), Number(`0x${bg.slice(3, 5)}`), Number(`0x${bg.slice(5)}`), 255];
					this.transparent = false;
				} else {
					this.transparent = true;
				}
				this.gl.activeTexture(this.gl.TEXTURE0);
				this.gl.bindTexture(this.gl.TEXTURE_2D, this.backgroundInfo.texture);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array(color));
				this.drawFrame();
			};
			this.bgImg.src = bg.includes('static.wikitide.net') ? bg : mw.util.getUrl(`Special:Redirect/file/${bg}`);
		}

		createTextureInfo(url, draw = true, initial = false) {
			const tex = this.gl.createTexture();
			this.gl.activeTexture(this.gl.TEXTURE0);
			this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
			this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
			const textureInfo = {
				width: 1,
				height: 1,
				texture: tex
			};
			const img = new Image();
			img.crossOrigin = 'anonymous';
			img.onload = () => {
				textureInfo.width = img.width;
				textureInfo.height = img.height;
				this.calculateTextureQuad();
				this.gl.bindTexture(this.gl.TEXTURE_2D, textureInfo.texture);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
				if (draw) this.renderModel(-1, true);
				if (initial) this.updateBackground(this.bg);
			};
			img.src = url;
			return textureInfo;
		}

		createProgram(vsSource, fsSource) {
			const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vsSource);
			const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fsSource);
			const program = this.gl.createProgram();
			this.gl.attachShader(program, vertexShader);
			this.gl.attachShader(program, fragmentShader);
			this.gl.linkProgram(program);
			return program;
		}

		createShader(type, src) {
			const shader = this.gl.createShader(type);
			this.gl.shaderSource(shader, src);
			this.gl.compileShader(shader);
			return shader;
		}

		calculateConversionMatrix() {
			this.unitConvert = [
				1 / this.canvas.width * 2 * dpr, 0, 0,
				0, 1 / this.canvas.height * 2 * dpr, 0,
				0, 0, 1
			];
		}

		calculateTextureQuad() {
			const texSpace = [1 / this.backgroundInfo.width, 1 / this.backgroundInfo.height];
			const texBounds = [this.$canvas.width() * texSpace[0], this.$canvas.height() * texSpace[1]];
			const texCenter = [texBounds[0] / 2, texBounds[1] / 2];
			const texTranslate = [
				this.origin[0] * texSpace[0] / this.origin[2] * bgScaleFactor,
				this.origin[1] * texSpace[1] / this.origin[2] * bgScaleFactor + (1 - texBounds[1])
			];
			const texOrigin = [
				texCenter[0] - texTranslate[0],
				texCenter[1] + texTranslate[1]
			];
			const texSides = [
				texOrigin[0] - texBounds[0] / 2 / this.origin[2] * bgScaleFactor, // left
				texOrigin[1] - texBounds[1] / 2 / this.origin[2] * bgScaleFactor, // bottom
				texOrigin[0] + texBounds[0] / 2 / this.origin[2] * bgScaleFactor, // right
				texOrigin[1] + texBounds[1] / 2 / this.origin[2] * bgScaleFactor // top
			];
			this.textureQuad = new Float32Array([
				texSides[0], texSides[1],
				texSides[2], texSides[1],
				texSides[0], texSides[3],
				texSides[0], texSides[3],
				texSides[2], texSides[1],
				texSides[2], texSides[3]
			]);
		}

		calculateUnitPosition() {
			this.unitPosition = [
				this.origin[2], 0, 0,
				0, this.origin[2], 0,
				this.origin[0] + this.origin[3] * this.origin[2], this.origin[1] + this.origin[4] * this.origin[2], 1
			];
		}

		getScaleX(id) {
			if (id == -1) return 1;
			if ('scaleX' in this.spritesTotal[id]) return this.spritesTotal[id].scaleX;
			this.spritesTotal[id].scaleX = this.spritesNow[id].scaleX * this.getScaleX(this.spritesNow[id].parent);
			return this.spritesTotal[id].scaleX;
		}

		getScaleY(id) {
			if (id == -1) return 1;
			if ('scaleY' in this.spritesTotal[id]) return this.spritesTotal[id].scaleY;
			this.spritesTotal[id].scaleY = this.spritesNow[id].scaleY * this.getScaleY(this.spritesNow[id].parent);
			return this.spritesTotal[id].scaleY;
		}

		getAngle(id) {
			if (id == -1) return 0;
			if ('angle' in this.spritesTotal[id]) return this.spritesTotal[id].angle;
			this.spritesTotal[id].angle = this.spritesNow[id].angle * this.getFlipX(id) * this.getFlipY(id) + this.getAngle(this.spritesNow[id].parent);
			return this.spritesTotal[id].angle;
		}

		getOpacity(id) {
			if (id == -1) return 1;
			if ('opacity' in this.spritesTotal[id]) return this.spritesTotal[id].opacity;
			this.spritesTotal[id].opacity = this.spritesNow[id].opacity * this.getOpacity(this.spritesNow[id].parent);
			return this.spritesTotal[id].opacity;
		}

		getFlipX(id) {
			if (id == -1) return 1;
			if ('flipX' in this.spritesTotal[id]) return this.spritesTotal[id].flipX;
			this.spritesTotal[id].flipX = this.spritesNow[id].flipX * this.getFlipX(this.spritesNow[id].parent);
			return this.spritesTotal[id].flipX;
		}

		getFlipY(id) {
			if (id == -1) return 1;
			if ('flipY' in this.spritesTotal[id]) return this.spritesTotal[id].flipY;
			this.spritesTotal[id].flipY = this.spritesNow[id].flipY * this.getFlipY(this.spritesNow[id].parent);
			return this.spritesTotal[id].flipY;
		}
	}

	function multiplyMat3(a, b) {
		return [
			a[0] * b[0] + a[3] * b[1] + a[6] * b[2],
			a[1] * b[0] + a[4] * b[1] + a[7] * b[2],
			a[2] * b[0] + a[5] * b[1] + a[8] * b[2],
			a[0] * b[3] + a[3] * b[4] + a[6] * b[5],
			a[1] * b[3] + a[4] * b[4] + a[7] * b[5],
			a[2] * b[3] + a[5] * b[4] + a[8] * b[5],
			a[0] * b[6] + a[3] * b[7] + a[6] * b[8],
			a[1] * b[6] + a[4] * b[7] + a[7] * b[8],
			a[2] * b[6] + a[5] * b[7] + a[8] * b[8]
		];
	}

	// create Viewer objects
	const $viewer = $('.animation-container');
	$viewer.each(function () {
		const $this = $(this);

		function waitUntilOpened() {
			return new Promise((resolve) => {
				const observer = new MutationObserver((mutations, observer) => {
					if ($this.closest('section.collapsible-block.open-block').length > 0) {
						observer.disconnect();
						resolve();
					}
				});
				observer.observe(document.body, {
					childList: true,
					subtree: true
				});
			});
		}

		if ($(this).closest('section.collapsible-block:not(.open-block)').length > 0) {
			waitUntilOpened().then(() => {
				$(this).data('viewer', new Viewer($(this)));
			});
		} else {
			$(this).data('viewer', new Viewer($(this)));
		}
	});
});