;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.main && window.SpriteEditorModules.main.loaded) return;
	window.SpriteEditorModules.main = window.SpriteEditorModules.main || {};
	var myData = window.SpriteEditorModules.main;
	myData.loaded = true;
	var spriteutils = window.SpriteEditorModules.spriteutils;
	var contextMenuTemplate = document.createElement('div');
	contextMenuTemplate.className = 'spriteedit-tooltip spriteedit-tooltip-controls spriteedit-tooltip-horizontal';
	contextMenuTemplate.innerHTML = '<div class="spriteedit-tooltip-text"></div><div class="spriteedit-tooltip-arrow"></div>';
	const config = mw.config.get([
		'wgArticleId',
		'wgArticlePath',
		'wgFormattedNamespaces',
		'wgPageName',
		'wgSiteName'
	]);
	var preloads = 2;
	var oclick;
	var root = document.getElementById('sprite-root') || document.getElementById('mw-content-text');
	spriteutils.setRootElement(root);
	var highestID = 0;
	var loadedSpriteName = {full: ''};
	var backgroundSprites = [];
	var buttons;
	var imgEle;
	var hasEditPermission = true;
	var hasTagPermission = false;
	var hasNewTagPermission = false;
	var tagExists = false;
	var tagActive = false;
	var lastSaved;
	var tbExpanded = false;
	var history = [];
	var historyPos = 0;
	var output;
	var OO;
	var skipClose = false;
	var api;
	var options = {
		cleanupSectionIDs: false,
		createSampleSection: true, // Create a sample section on new sprite-creation (Open > New).
		defaultSpriteSize: 16,
		removeUnusedSprites: false,
		removeDeprecatedNames: false,
		spritesPerRow: 10,
		isNew: false,
		spacing: 0
	};
	var blankJSON = {
		settings: {},
		sections: [],
		ids: {}
	};
	var toShare = {
		highestPos: 0
	};
	var oldImageAsCanvas;
	var msg;
	var imgHeight;
	var imgWidth;
	var imgSpacingOrg;
	window.addEventListener('beforeunload', function (e) {
		if (lastSaved !== history[historyPos - 1]) {
			e.preventDefault();
			e.returnValue = '';
		}
	}, {capture: true});
	var isPopstate = false;
	window.addEventListener('popstate', function (e) {
		if (isPopstate) {
			isPopstate = false;
			return;
		}
		if (lastSaved !== history[historyPos - 1] && !window.confirm(msg('unsaved-changes').plain())) {
			e.preventDefault();
			isPopstate = true;
			window.history.forward();
			return;
		}
		if (document.getElementById('sprite-root')) return; // Don't recreate the view if the editor is used as a previewer.
		myData.run();
	});
	myData.filepath = function(name) {
		if (window.hex_md5) {
			if (myData.noMD5) {
				return myData.imageURL + '/' + encodeURIComponent(name) + '?format=original&version=' + Date.now();
			}
			var hash = window.hex_md5(name);
			return myData.imageURL + '/' + hash.substring(0,1) + '/' + hash.substring(0,2) + '/' + encodeURIComponent(name) + '?format=original&version=' + Date.now();
		}
		return '';
	};
	myData.processDialog = function(data) { // also creates MessageDialog
		var modal = {};
		var OO = myData.OO;
		var wm = myData.windowManager;
		if (data.isSubdialog) {
			wm = new OO.ui.WindowManager();
			$('body').append(wm.$element);
		} else if (!wm) {
			wm = new OO.ui.WindowManager();
			myData.windowManager = wm;
			$('body').append(wm.$element);
		}
		function SpriteEditorDialog(config) {
			SpriteEditorDialog.super.call(this, config);
		}
		OO.inheritClass(SpriteEditorDialog, data.messageDialog && OO.ui.MessageDialog || OO.ui.ProcessDialog);

		SpriteEditorDialog.static.name = data.name;
		SpriteEditorDialog.static.title = data.title;
		SpriteEditorDialog.static.actions = data.actions;

		// initialise dialog, append content
		var pInitialize = function () { // ProcessDialog
			SpriteEditorDialog.super.prototype.initialize.apply(this, arguments);
			this.content = new OO.ui.PanelLayout({
				expanded: false
			});
			this.content.$element.append(data.content());
			this.$body.append(this.content.$element);
			this.$content.addClass('spriteedit-ui-Dialog spriteedit-ui-hiddenFooter');
		};
		var mInitialize = function () { // MessageDialog
			SpriteEditorDialog.super.prototype.initialize.apply(this, arguments);
			var b = this.$body.get(0);
			// Adjusting styling
			var mdText = b.querySelector('.oo-ui-messageDialog-text');
			mdText.style.paddingLeft = 0;
			mdText.style.paddingRight = 0;
			b.querySelector('.oo-ui-messageDialog-message').innerHTML = data.content();
			this.$content.addClass('spriteedit-ui-Dialog');
		};
		
		SpriteEditorDialog.prototype.initialize = data.messageDialog && mInitialize || pInitialize;

		// Handle actions
		SpriteEditorDialog.prototype.getActionProcess = function (action) {
			data.action(action);
			if (action === 'close')
				return new OO.ui.Process( function () {
					modal.seDialog.close( { action: action } );
				} );
			return SpriteEditorDialog.super.prototype.getActionProcess.call(this, action);
		};

		// Create a new dialog window.
		modal.seDialog = new SpriteEditorDialog({
			size: data.size
		});
		
		// Add window
		wm.addWindows([modal.seDialog]);
		modal.windowManager = wm;
		// Close dialog when clicked outside the dialog
		modal.seDialog.$frame.parent().on('click', function (e) {
			if (!$(e.target).closest('.spriteedit-ui-Dialog').length) {
				if (data.onclose)
					data.onclose();
				modal.seDialog.close();
			}
		});
		return modal;
	};
	function sortSection(id) {
		// https://stackoverflow.com/questions/32199368/sorting-a-list-by-data-attribute
		Array.prototype.slice.call(root.querySelectorAll('div[data-section-id="' + id + '"] .spritedoc-box')).sort(function(a, b) {
			if (!a.dataset.sortKey) return 1;
			if (!b.dataset.sortKey) return -1;
			return a.dataset.sortKey.localeCompare(b.dataset.sortKey);
		}).forEach(function(node) {
			node.parentNode.appendChild(node);
		});
	}
	function sortSpriteNames(id) {
		// https://stackoverflow.com/questions/32199368/sorting-a-list-by-data-attribute
		Array.prototype.slice.call(root.querySelectorAll('li[data-pos="' + id + '"] .spritedoc-name')).sort(function(a, b) {
			var a_ = a.children[0].textContent;
			var b_ = b.children[0].textContent;

			if (a.children[0].getAttribute('data-placeholder') && !b.children[0].getAttribute('data-placeholder'))
				return 1;
			if (!a.children[0].getAttribute('data-placeholder') && b.children[0].getAttribute('data-placeholder'))
				return -1;

			return a_.localeCompare(b_);
		}).forEach(function(node) {
			node.parentNode.appendChild(node);
		});
		var codes = root.querySelectorAll('li[data-pos="' + id + '"] .spritedoc-name code');
		if (codes.length)
			root.querySelector('li[data-pos="' + id + '"]').setAttribute('data-sort-key', codes[0].textContent);
	}
	function newCanvas() {
		var c = document.createElement('canvas');
		c.width = imgWidth;
		c.height = imgHeight;
		var ctx = c.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		return c;
	}
	function rotateSprite(sprite) {
		var c = newCanvas();
		var ctx = c.getContext('2d');
		for (var i = 0; i < imgHeight; i++) {
			for (var j = 0; j < imgHeight; j++) {
				ctx.drawImage(sprite,
					j, imgHeight - i - 1, 1, 1, // Source coords.
					i, j, 1, 1 // Canvas coords.
				);
			}
		}
		return c;
	}
	function mirrorSprite(vertical, sprite) {
		var c = newCanvas();
		var ctx = c.getContext('2d');
		for (var i = 0; i < imgHeight; i++) {
			for (var j = 0; j < imgWidth; j++) {
				if (vertical) {
					ctx.drawImage(sprite,
						imgWidth - j - 1, i, 1, 1, // Source coords.
						j, i, 1, 1 // Canvas coords.
					);
				} else {
					ctx.drawImage(sprite,
						j, imgHeight - i - 1, 1, 1, // Source coords.
						j, i, 1, 1 // Canvas coords.
					);
				}
			}
		}
		return c;
	}
	function indexNames(name) {
		return Array.from(document.querySelectorAll('code[isSprite]')).filter(function(ele) {
			return ele.innerText === name;
		});
	}
	function markDuplicateNames(list) {
		var names = list.length && list || Object.keys(list);
		for (var i = 0; i < names.length; i++) {
			var eleList = indexNames(names[i]);
			var length = eleList.length;
			for (var j = 0; j < length; j++) {
				eleList[j].classList.toggle('spriteedit-dupe', length > 1);
			}
		}
		var disable = root.querySelectorAll('.spriteedit-dupe').length ? true : false;
		buttons.changes.setDisabled(disable);
		buttons.save.setDisabled(disable);
	}
	function generateJSON() {
		var a = Object.assign({}, blankJSON, {ids: {}, sections: []});
		a.settings = Object.assign({}, output.settings);
		if (a.settings.pos) {a.settings.pos = Number(a.settings.pos);}
		delete a.settings.spacing;
		if (a.settings.version) {
			a.settings.version = 'version=' + Date.now();
		} else if (a.settings.url || options.isNew) {
			a.settings.url = 'require( [[' + config.wgFormattedNamespaces[828] + ':Sprite]] ).getUrl( \'' + (a.settings.image || loadedSpriteName.name + '.png') + '\', \'format=original&version=' + Date.now() + '\', \'' + loadedSpriteName.module.toLowerCase().substring(0, loadedSpriteName.module.length - 6) + '-sprite\' ),';
		}
		a.settings.sheetsize = options.spritesPerRow * (imgWidth + options.spacing) - options.spacing;
		if (options.spacing > 0)
			a.settings.spacing = options.spacing;
		var sections = root.querySelectorAll('div.spritedoc-section');
		for (var i = 0; i < sections.length; i++) {
			var secId = options.cleanupSectionIDs ? String(i) : sections[i].dataset.sectionId;
			a.sections.push( {
				name: sections[i].querySelector('code').textContent,
				id: Number(secId)
			} );
			var names = sections[i].querySelectorAll('.spritedoc-name');
			for (var k = 0; k < names.length; k++) {
				var dataset = names[k].closest('.spritedoc-box').dataset;
				var name = names[k].children[0];
				if (options.removeDeprecatedNames && name.classList.contains('spritedoc-deprecated')) continue;
				if (!dataset.pos) continue;
				var p = options.removeUnusedSprites && options.removeWhitespace && dataset.posTmp || dataset.pos;
				a.ids[name.textContent] = {
					pos: Number(p),
					section: Number(secId)
				};
				
				var flags = myData.flags;
				for (var l = 0; l < flags.length; l++) {
					if (name.classList.contains('spritedoc-' + flags[l][0])) {
						a.ids[name.textContent][flags[l][0]] = true;
					}
				}
			}
		}
		return a;
	}
	// Serialize JSON
	function _needQuotes(a) {
		return a !== (a.match(/(\d|\w)+/gm) || [])[0];
	}
	function _serialize(data) { // Without linebreaks
		var keys = Object.keys(data);
		var a = ['{'];
		var l = keys.length - 1;
		for (var i = 0; i <= l; i++) {
			var q = _needQuotes(keys[i]) && '\'' || '';
			var u = !['boolean', 'number'].includes(typeof(data[keys[i]])) && '\'' || '';
			a.push(' ' + q + keys[i] + q + ' = ' + u + data[keys[i]] + u + (i < l && ',' || ''));
		}
		a.push(' }');
		return a.join('');
	}
	function processData(data, indent) {
		if (!indent) {indent = 0;}
		var indent_ = ('\t').repeat(indent + 1);
		var output = ['{'];
		var visited = {};
		if (indent === 1) {
			for (var j = 0; j < data.length; j++) {
				output.push(indent_ + _serialize(data[j]) + ',');
				visited[data[j]] = true;
			}
		}
		var keys = Object.keys(data);
		if (indent > 0) {
			keys = keys.sort(function(a, b) {
				var dataA = a.toLowerCase();
				var dataB = b.toLowerCase();
				if (dataA > dataB) return 1;
				if (dataA < dataB) return -1;
				return 0;
			});
		}
		for (var i = 0; i < keys.length; i++) {
			var entry = data[keys[i]];
			var q = _needQuotes(keys[i]) && '\'' || '';
			var quotes = q && ['[\'', '\']'] || ['', ''];
			if (indent === 0 && keys[i] === 'settings') {
				output.push(indent_ + keys[i] + ' = {');
				var names = Object.keys(entry);
				names = names.sort();
				for (var k = 0; k < names.length; k++) {
					var u = !['boolean', 'number'].includes(typeof(entry[names[k]])) && '\'' || '';
					var is_require = names[k] === 'url' && String(entry[names[k]]).substring(0,7) === 'require';
					if (is_require) {u = '';}
					output.push(indent_ + '\t' + quotes[0] + names[k] + quotes[1] + ' = ' + u + entry[names[k]] + u + (!is_require && ',' || ''));
				}
				output.push(indent_ + '},');
			} else if (indent === 0) {
				var b = processData(entry, indent + 1);
				b[0] = indent_ + keys[i] + ' = ' + b[0];
				output = output.concat(b);
			} else {
				if (visited[entry]) continue;
				output.push(indent_ + quotes[0] + keys[i] + quotes[1] + ' = ' + _serialize(entry) + ',');
			}
		}
		output.push(indent === 0 && '}' || ('\t').repeat(indent) + '},');
		return indent == 0 && output.join('\n') || output;
	}
	function addDummyPos() {
		var allPos = [];
		var allSprites = root.querySelectorAll('li[class="spritedoc-box"]');
		for (var i = 0; i < allSprites.length; i++) {
			if (allSprites[i].dataset.pos === 'null') continue;
			if (options.removeUnusedSprites && options.removeDeprecatedNames && allSprites[i].querySelectorAll('code[class="spritedoc-deprecated"]').length === allSprites[i].querySelectorAll('code').length) {
				continue;
			}
			allPos.push(Number(allSprites[i].dataset.pos));
		}
		allPos.sort(function(a, b) {
			return a - b;
		});
		var extraIncrement = 0;
		allPos.forEach(function(item, index) {
			if (!extraIncrement && (!output.settings.pos || ((index + 1) === Number(output.settings.pos) && !document.querySelector('li[data-pos=\'' + (index + 1) + '"]')) ) ) // If no defaultSprite exists, the pos 1 shouldn't be blocked.
				extraIncrement++;
			document.querySelector('li[data-pos=\'' + item + '\']').dataset.posTmp = index + 1 + extraIncrement;
		});
	}
	function getPosCoords(pos, useOrg) {
		var sPR = useOrg && options.spritesPerRowOrg || options.spritesPerRow;
		var s = useOrg && imgSpacingOrg || options.spacing;
		var cordY = Math.ceil(pos / sPR);
		return {
			x: (pos - (cordY - 1) * sPR - 1) * (imgWidth + s),
			y: (cordY - 1) * (imgHeight + s)
		};
	}
	function generateImage() {
		var c = newCanvas();
		var ctx = c.getContext('2d');
		var keepOldSprites = !options.removeUnusedSprites && !options.isNew && !options.removeWhitespace;
		var needDummy = options.removeUnusedSprites && options.removeWhitespace;
		if (needDummy) {
			addDummyPos();
		}
		var defaultSprite = document.querySelector('li[data-default]');
		if (defaultSprite) {
			output.settings.pos = needDummy && defaultSprite.dataset.posTmp || defaultSprite.dataset.pos;
			spriteutils.setPosSprite(output.settings.pos);
		}
		var spritesPerRow = options.spritesPerRow;
		c.width = (imgWidth + options.spacing) * spritesPerRow - options.spacing;
		c.height = 0;
		if (keepOldSprites)
			c.height = Math.ceil(Math.ceil((imgEle.naturalHeight + imgSpacingOrg) / (imgHeight + imgSpacingOrg)) * options.spritesPerRowOrg / spritesPerRow) * (imgHeight + options.spacing) - options.spacing;
		c.height = Math.max(c.height, Math.ceil(Math.max((output.settings.pos || 0), toShare.highestPos) / spritesPerRow) * (imgHeight + options.spacing) - options.spacing);
		var i;
		var sID;
		var drawn = [];
		var coords;
		var allSprites = root.querySelectorAll('li[class="spritedoc-box"]');
		for (i = 0; i < allSprites.length; i++) {
			if (options.removeUnusedSprites && options.removeDeprecatedNames && allSprites[i].querySelectorAll('code[class="spritedoc-deprecated"]').length === allSprites[i].querySelectorAll('code').length) {
				continue;
			}
			sID = options.removeUnusedSprites && options.removeWhitespace && allSprites[i].dataset.posTmp || allSprites[i].dataset.pos;
			if (sID === 'null') continue;
			coords = getPosCoords(sID, false);
			drawn[sID] = true;
			ctx.drawImage(allSprites[i].querySelector('canvas'),
				0, 0, imgWidth, imgHeight, // Source coords.
				coords.x, coords.y, imgWidth, imgHeight // Canvas coords.
			);
		}
		var coordsOld;
		if (keepOldSprites) { // Copy old sprites to new canvas
			var list = Object.keys(backgroundSprites);
			for (i = 0; i < list.length; i++) {
				coords = getPosCoords(list[i], false);
				ctx.drawImage(backgroundSprites[list[i]].sprite,
					0, 0, imgWidth, imgHeight, // Source coords.
					coords.x, coords.y, imgWidth, imgHeight // Canvas coords.
				);
			}
		}
		sID = output.settings.pos || 1;
		coordsOld = getPosCoords(sID, true);
		coords = getPosCoords(sID, false);
		ctx.drawImage(imgEle,
			coordsOld.x, coordsOld.y, imgWidth, imgHeight, // Source coords.
			coords.x, coords.y, imgWidth, imgHeight // Canvas coords.
		);
		return [c, oldImageAsCanvas, oldImageAsCanvas.toDataURL() !== c.toDataURL()];
	}
	function setupOldCanvas(imgData) {
		oldImageAsCanvas = document.createElement('canvas');
		oldImageAsCanvas.width = imgData.width || imgData.naturalWidth;
		oldImageAsCanvas.height = imgData.height || imgData.naturalHeight;
		if (options.isNew) return;
		oldImageAsCanvas.getContext('2d').drawImage(imgData, 0, 0);
	}
	function updateTitle(changesMade) {
		if (window.SpriteEditorModules.openButton) return;
		document.title = (loadedSpriteName.full.length && (loadedSpriteName.name + (changesMade && '*' || '') + ' – ') || '') + msg('title').plain() + ' – ' + config.wgSiteName;
		document.getElementById('firstHeading').textContent = msg('title').plain() + (loadedSpriteName.full.length && (' – ' + loadedSpriteName.name + (options.isNew && ' (' + msg('dialog-button-new').plain() + ')' || '') + (changesMade && '*' || '')) || '');
	}
	function toggleTBButtons(active) {
		buttons.changes.setDisabled(!active);
		buttons.deprecated.setDisabled(!active);
		buttons.deprecated2.setDisabled(!(active && buttons.deprecated.getValue()));
		buttons.newSection.setDisabled(!active);
		buttons.reorder.setDisabled(!active);
		buttons.save.setDisabled(!active);
		buttons.settings.setDisabled();
		buttons.sortSections.setDisabled(!active);
	}
	function saveJSON(summary, data, generatedJSON) {
		api.postWithEditToken({
			action: 'edit',
			contentformat: 'text/plain',
			contentmodel: 'Scribunto',
			formatversion: 2,
			notminor: true,
			recreate: true,
			summary: summary,
			tags: tagActive && tagExists && hasTagPermission && 'spriteeditor' || undefined,
			text: 'return ' + data,
			title: 'Module:' + loadedSpriteName.full
		}).always(function(d) {
			toggleTBButtons(hasEditPermission);
			buttons.open.setDisabled(false);
			buttons.undo.setDisabled(historyPos === 0);
			buttons.redo.setDisabled(historyPos === history.length);
			if (d.edit.result !== 'Success') {
				alert(msg('json-error').plain());
				return;
			}
			alert(msg('json-success').plain());
			if (options.isNew) {
				options.isNew = false;
				output = generatedJSON;
			}
			lastSaved = history[historyPos - 1];
			updateTitle(false);
		});
	}
	function addMissingTag(summary, data, generatedJSON) {
		if (!tagExists && hasNewTagPermission) {
			api.postWithEditToken({
				action: 'managetags',
				format: 'json',
				formatversion: '2',
				operation: 'create',
				reason: 'Add missing tag for [[w:c:dev:SpriteEditor|SpriteEditor]]',
				tag: 'spriteeditor'
			}).always(function(e) {
				if (!e.error) {
					tagExists = true;
				}
				saveJSON(summary, data, generatedJSON);
			});
		} else {
			saveJSON(summary, data, generatedJSON);
		}
	}
	function saveToFile(s) {
		toggleTBButtons(false);
		buttons.open.setDisabled(true);
		buttons.undo.setDisabled(true);
		buttons.redo.setDisabled(true);
		var gIVars = generateImage();
		var generatedJSON = generateJSON();
		var data = processData(generatedJSON);
		if (!gIVars[2]) { // If nothing changed
			addMissingTag(s, data, generatedJSON);
			return;
		}
		gIVars[0].toBlob(function(blob) {
			api.upload(blob, {
				comment: s,
				filename: output.settings.image || loadedSpriteName.name + '.png',
				formatversion: 2,
				ignorewarnings: true
			}).always(function(d) {
				if (!d) {
					toggleTBButtons(hasEditPermission);
					alert(msg('image-error').plain());
					return;
				}
				setupOldCanvas(gIVars[0]);
				addMissingTag(s, data, generatedJSON);
			});
		});
	}
	function addHistory(data) {
		if (history.length > historyPos) {
			history.length = historyPos;
		}
		historyPos = history.push( data );
		buttons.undo.setDisabled(false);
		buttons.redo.setDisabled(true);
		updateTitle(true);
	}
	function moveHistory(dir) { // !dir = Backwards; dir = Forwards
		historyPos += dir;
		var offset = Number(dir > 0);
		history[historyPos - offset][offset]();
		buttons.undo.setDisabled(historyPos === 0);
		buttons.redo.setDisabled(historyPos === history.length);
		updateTitle(lastSaved !== history[historyPos - 1]);
	}
	function createContextButton(icon, lbl, tooltip) {
		return new OO.ui.ButtonInputWidget( {
			flags: [
				'primary',
				'progressive'
			],
			framed: false,
			icon: icon,
			invisibleLabel: false,
			label: lbl,
			title: tooltip
		} );
	}
	function closeTooltip() {
		var menu = document.getElementsByClassName('spriteedit-tooltip')[0];
		if (!menu) return;
		document.body.removeChild(menu);
	}
	function getEditPermission() {
		return hasEditPermission;
	}
	spriteutils.addNotifier(function(name, data) {
		console.log(name, data);
		var names = [];
		if (name === 'spritename-click') { // setting flags
			if (!hasEditPermission) return;
			const btnValue = buttons.deprecated2.getMenu().findSelectedItem().getData();
			const _func = function() {
				data.element.classList.toggle('spritedoc-' + btnValue);
			};
			_func();
			addHistory([_func, _func]);
		} else if (name === 'files-added') {
			data.sprites.forEach(function(s) {
				var names_ = s.getNames();
				names_.forEach(function(n) {
					names.push(n.innerText);
				});
			});
			addHistory([
				function() { // undo
					data.sprites.forEach(function(sprite) {
						spriteutils.deleteSprite(sprite.getPosId());
					});
					markDuplicateNames(names);
					toShare.highestPos = toShare.highestPos - data.sprites.length;
					spriteutils.overrideHighestId(toShare.highestPos);
				},
				function() { // redo
					data.sprites.forEach(function(sprite) {
						data.section.addSprite(sprite.element);
					});
					sortSection(data.section.id);
					markDuplicateNames(names);
					toShare.highestPos = toShare.highestPos + data.sprites.length;
					spriteutils.overrideHighestId(toShare.highestPos);
				},
			]);
			// Sync with SpriteUtils
			toShare.highestPos = data.highestID;
			markDuplicateNames(names);
			sortSection(data.section.id);
		} else if (name === 'sprite-moved') {
			const _1 = function() {
				spriteutils.getSection(data.origin).addSprite(data.sprite.element);
				sortSection(data.origin);
			};
			const _2 = function() {
				spriteutils.getSection(data.destination).addSprite(data.sprite.element);
				sortSection(data.destination);
			};
			addHistory([_1, _2]);
			_2();
		} else if (name === 'boxcode-content-changed') {
			if (data.element.hasAttribute('issprite')) { // Sprite-Name
				const sprite = spriteutils.getSprite(Number(data.element.closest('.spritedoc-box').dataset.pos));
				const section = spriteutils.getSection(Number(sprite.element.closest('.spritedoc-section').dataset.sectionId));
				if (!data.newContent.length && sprite.getNames().length === 1) { // Remove sprite
					data.element.textContent = data.oldContent;
					const _1 = function() {
						section.addSprite(sprite.element);
						delete backgroundSprites[sprite.getPosId()];
						markDuplicateNames([data.oldContent]);
						sortSection(section.id);
					};
					const _2 = function() {
						backgroundSprites[sprite.getPosId()] = {sprite: sprite.getImage()};
						spriteutils.deleteSprite(sprite.getPosId());
						markDuplicateNames([data.oldContent]);
					};
					addHistory([_1,_2]);
					_2();
				} else if (!data.oldContent.length || !data.newContent.length) { // New textfield added, just remove / readd it
					const names = data.element.closest('.spritedoc-names');
					const name = data.element.parentElement;
					const _sort = function() {
						markDuplicateNames([data.element.textContent]);
						sortSpriteNames(names.closest('.spritedoc-box').dataset.pos);
						sortSection(section.id);
					};
					const _1 = function() {
						names.removeChild(name);
						_sort();
					};
					const _2 = function() {
						names.appendChild(name);
						_sort();
					};
					if (!data.oldContent.length && !data.newContent.length) {
						names.removeChild(name);
					} else if (!data.oldContent.length) {
						addHistory([_1, _2]);
						_sort();
					} else { // !data.newContent.length
						data.element.textContent = data.oldContent;
						addHistory([_2, _1]);
						_1();
					}
				} else { // change name of contentbox
					addHistory([
						function() {
							data.element.textContent = data.oldContent;
							markDuplicateNames([data.oldContent, data.newContent]);
						},
						function() {
							data.element.textContent = data.newContent;
							markDuplicateNames([data.oldContent, data.newContent]);
						}
					]);
					markDuplicateNames([data.oldContent, data.newContent]);
				}
				return;
			} // else: Section
			if (data.oldContent.length && data.newContent.length) {
				addHistory([
					function() {data.element.textContent = data.oldContent;},
					function() {data.element.textContent = data.newContent;}
				]);
				return;
			}
			var sec = spriteutils.getSection(data.element.closest('.spritedoc-section').dataset.sectionId);
			sec.getSprites().forEach(function(s) {
				s.getNames().forEach(function(n) {
					names.push(n.textContent);
				});
			});
			var sibling = sec.element.nextSibling;
			var parent = sec.element.parentElement;
			const _1 = function() {
				sec.getSprites().forEach(function(s) {
					backgroundSprites[s.getPosId()] = {sprite: s.getImage()};
				});
				parent.removeChild(sec.element);
				markDuplicateNames(names);
			};
			const _2 = function() {
				if (sibling) {
					parent.insertBefore(sec.element, sibling);
				} else {
					parent.append(sec.element);
				}
				sec.getSprites().forEach(function(s) {
					delete backgroundSprites[s.getPosId()];
				});
				markDuplicateNames(names);
			};
			if (!data.oldContent.length && !data.newContent.length) {
				highestID--;
				parent.removeChild(sec.element);
			} else if (!data.oldContent.length) {
				addHistory([
					function() {_1(); highestID--;},
					function() {_2(); highestID++;}
				]);
			} else { // !data.newContent.length
				addHistory([_2, _1]);
				data.element.textContent = data.oldContent;
				_1();
			}
		} else if (name === 'image-click') {
			skipClose = true;
			closeTooltip();
			var ele = contextMenuTemplate.cloneNode(true);
			document.body.append(ele);
			var btnList = {
				changeSprite: createContextButton(
					'imageGallery',
					msg('replace-sprite-label').plain(),
					msg('replace-sprite-hover').plain()
				),
				deleteSprite: createContextButton(
					'trash',
					msg('delete-sprite-label').plain(),
					msg('delete-sprite-hover').plain()
				),
				defaultSprite: createContextButton(
					data.sprite.element.dataset.default && 'unStar' || 'star',
					msg((data.sprite.element.dataset.default && 'unmark' || 'mark') + '-default-sprite-label').plain(),
					msg('default-sprite-label').plain()
				),
				downloadSprite: createContextButton(
					'download',
					msg('download-sprite-label').plain(),
					msg('download-sprite-hover').plain()
				),
				rotateSpriteLeft: createContextButton(
					'undo',
					msg('rotate-left-label').plain(),
					msg('rotate-left-hover').plain()
				),
				rotateSpriteRight: createContextButton(
					'redo',
					msg('rotate-right-label').plain(),
					msg('rotate-right-hover').plain()
				),
				mirrorSpriteHorizontal: createContextButton(
					'subtract',
					msg('flip-h-label').plain(),
					msg('flip-h-hover').plain()
				),
				mirrorSpriteVertical: createContextButton(
					'subtract',
					msg('flip-v-label').plain(),
					msg('flip-v-hover').plain()
				),
			};
			btnList.deleteSprite.setFlags(['primary', 'destructive']);
			btnList.mirrorSpriteVertical.$icon.get(0).style.transform = 'rotate(90deg)';
			btnList.rotateSpriteRight.on('click', function() {
				var img = data.sprite.getImage();
				var rotated = rotateSprite(img);
				data.sprite.setImage(rotated);
				addHistory([
					function() {data.sprite.setImage(img);},
					function() {data.sprite.setImage(rotated);}
				]);
			});
			btnList.rotateSpriteLeft.on('click', function() {
				var img = data.sprite.getImage();
				var rotated = rotateSprite(img);
				rotated = rotateSprite(rotated);
				rotated = rotateSprite(rotated);
				data.sprite.setImage(rotated);
				addHistory([
					function() {data.sprite.setImage(img);},
					function() {data.sprite.setImage(rotated);}
				]);
			});
			btnList.deleteSprite.on('click', function() {
				backgroundSprites[data.sprite.getPosId()] = {sprite: data.sprite.getImage()};
				const sec = spriteutils.getSection(data.sprite.element.closest('.spritedoc-section').dataset.sectionId);
				var names = [];
				var names_ = data.sprite.getNames();
				names_.forEach(function(a) {
					names.push(a.innerText);	
				});
				const _1 = function() { // redo
					sec.addSprite(data.sprite.element);
					delete backgroundSprites[data.sprite.getPosId()];
					sortSection(sec.id);
					markDuplicateNames(names);
				};
				const _2 = function() { // undo
					backgroundSprites[data.sprite.getPosId()] = {
						sprite: data.sprite.getImage()
					};
					spriteutils.deleteSprite(data.sprite.getPosId());
					markDuplicateNames(names);
				};
				addHistory([_1, _2]);
				_2();
			});
			btnList.mirrorSpriteHorizontal.on('click', function() {
				var img = data.sprite.getImage();
				var mirrored = mirrorSprite(true, img);
				data.sprite.setImage(mirrored);
				addHistory([
					function() {data.sprite.setImage(img);},
					function() {data.sprite.setImage(mirrored);}
				]);
			});
			btnList.mirrorSpriteVertical.on('click', function() {
				var img = data.sprite.getImage();
				var mirrored = mirrorSprite(false, img);
				data.sprite.setImage(mirrored);
				addHistory([
					function() {data.sprite.setImage(img);},
					function() {data.sprite.setImage(mirrored);}
				]);
			});
			btnList.downloadSprite.on('click', function() {
				var element = document.createElement('a');
				element.crossOrigin = '*';
				element.setAttribute('href', data.sprite.getImage().toDataURL('image/png'));
				element.setAttribute('download', data.sprite.getNames()[0].innerText + '.png');
				element.click();
			});
			btnList.changeSprite.on('click', function() {
				var input = document.createElement('input');
				input.type = 'file';
				input.setAttribute('accept', 'image/*');
				input.onchange = function(f) {
					const imgOld = data.sprite.getImage();
					spriteutils.setImage(f.target.files[0], data.sprite);
					setTimeout(function() {
						const imgNew = data.sprite.getImage();
						addHistory([
							function() {data.sprite.setImage(imgOld);},
							function() {data.sprite.setImage(imgNew);}
						]);
					}, 10);
				};
				input.click();
			});
			btnList.defaultSprite.on('click', function() {
				var a = data.sprite.element.dataset.default;
				var ele = data.sprite.element;
				var old = root.querySelector('li[data-default]');
				const _1 = function() {
					delete ele.dataset.default;
					spriteutils.setPosSprite(1);
					if (old)
						old.dataset.default = true;
						spriteutils.setPosSprite(old.dataset.pos);
				};
				const _2 = function() {
					if (old)
						delete old.dataset.default;
						spriteutils.setPosSprite(1);
					if (!a)
						ele.dataset.default = true;
						spriteutils.setPosSprite(ele.dataset.pos);
				};
				addHistory([_1, _2]);
				_2();
			});
			var ele2 = ele.querySelector('.spriteedit-tooltip-text');
			if (hasEditPermission) {
				ele2.append(btnList.changeSprite.$element.get(0));
				ele2.append(btnList.defaultSprite.$element.get(0));
			}
			ele2.append(btnList.downloadSprite.$element.get(0));
			if (hasEditPermission) {
				if (Number(imgWidth) === Number(imgHeight)) {
					ele2.append(btnList.rotateSpriteLeft.$element.get(0));
					ele2.append(btnList.rotateSpriteRight.$element.get(0));
				}
				ele2.append(btnList.mirrorSpriteHorizontal.$element.get(0));
				ele2.append(btnList.mirrorSpriteVertical.$element.get(0));
				ele2.append(btnList.deleteSprite.$element.get(0));
			}
			var pos = data.sprite.element.getBoundingClientRect();
			ele.style.left = (pos.left + window.pageXOffset - ele.clientWidth) + 'px';
			ele.style.top = pos.top + window.pageYOffset + data.sprite.element.clientHeight * 0.5 + 'px';
			ele.style.opacity = '1';
			ele.style.transform = 'scale(1)';
			ele.style.zIndex = '299';
			Object.keys(btnList).forEach(function(a) {
				btnList[a].on('click', closeTooltip);
			});
		}
	});
	mw.loader.using( [
			'mediawiki.api',
			'jquery',
			'oojs-ui',
			'oojs-ui-core',
			'oojs-ui-widgets',
			'oojs-ui-windows',
			// Icons
			'oojs-ui.styles.icons-content', // download, folderPlaceholder
			'oojs-ui.styles.icons-editing-advanced', // tableAddRowAfter
			'oojs-ui.styles.icons-editing-core', // undo, redo
			'oojs-ui.styles.icons-editing-list', // listBullet
			'oojs-ui.styles.icons-layout', // viewCompact
			'oojs-ui.styles.icons-interactions', // add, checkall, close, settings, subtract
			'oojs-ui.styles.icons-media', // imageAdd, imageGallery
			'oojs-ui.styles.icons-moderation', // flag, star, trash, unStar
			'oojs-ui.styles.icons-movement', // next, previous
	] ).then( function( require ) {
		OO = require('oojs');
		api = new mw.Api();
		myData.OO = OO;
		function createButton(icon, lbl, tooltip) {
			return new OO.ui.ButtonWidget( {
				framed: false,
				icon: icon,
				label: lbl || '',
				invisibleLabel: !tbExpanded,
				title: tooltip
			} );
		}
		function openWindow(win, err) {
			var m = window.SpriteEditorModules[win];
			if (!m) {
				alert(err);
				return false;
			}
			if (!m.modal || !m.modal.seDialog)
				window.SpriteEditorModules[win].createWindow();
			m.modal.windowManager.openWindow(m.modal.seDialog).opening.then(function() {
				m.requestChanges();
			});
			return true;
		}
		function createToolbar() {
			var flagItems = [];
			var flags = myData.flags;
			for (var i = 0; i < flags.length; i++) {
				flagItems.push(
					new OO.ui.MenuOptionWidget( {
						data: flags[i][0],
						label: flags[i][1]
					} )
				);
			}
			// Toolbar buttons
			buttons = {
				open: createButton(
					'folderPlaceholder',
					msg('open-label').plain(),
					msg('open-hover').plain()
				),
				undo: createButton(
					'undo',
					msg('undo-label').plain(),
					msg('undo-hover').plain()
				),
				redo: createButton(
					'redo',
					msg('redo-label').plain(),
					msg('redo-hover').plain()
				),
				newSection: createButton(
					'tableAddRowAfter',
					msg('new-section-label').plain(),
					msg('new-section-hover').plain()
				),
				settings: createButton(
					'settings',
					msg('settings-label').plain(),
					msg('settings-hover').plain()
				),
				sortSections: new OO.ui.ToggleButtonWidget({
					framed: false,
					icon: 'listBullet',
					label: msg('sort-section-label').plain(),
					invisibleLabel: !tbExpanded,
					title: msg('sort-section-hover').plain()
				}),
				changes: createButton(
					'checkAll',
					msg('show-changes-label').plain(),
					msg('show-changes-hover').plain()
					),
				save: createButton(
					'download',
					msg('save-label').plain(),
					msg('save-hover').plain()
				),
				deprecated: new OO.ui.ToggleButtonWidget({
					framed: false,
					icon: 'flag',
					label: msg('mark-deprecated-label').plain(),
					invisibleLabel: !tbExpanded,
					title: msg('mark-deprecated-hover').plain()
				}),
				deprecated2: new OO.ui.DropdownWidget( {
					classes: [ 'spriteedit-deprecated-dropdown' ],
					label: '',
					disabled: true,
					menu: {
						items: flagItems
					}
				} ),
				descriptionToggle: createButton(
					tbExpanded && 'previous' || 'next',
					'',
					msg('description-toggle-hover').plain()
				),
				reorder: createButton(
					'viewCompact',
					msg('reorder-sprites-label').plain(),
					msg('reorder-sprites-hover').plain()
				)
			};
			// Selecting default
			buttons.deprecated2.getMenu().selectItemByData( 'deprecated' );
			
			toggleTBButtons(false);
			buttons.undo.setDisabled(true);
			buttons.redo.setDisabled(true);

			// Toolbar sections
			var toolbarSections = {
				fileItems: new OO.ui.ButtonGroupWidget({
					items: [buttons.open],
					classes: ['SpriteEditor-TBGroup']
				}),
				editItems: new OO.ui.ButtonGroupWidget({
					items: [buttons.undo,buttons.redo],
					classes: ['SpriteEditor-TBGroup']
				}),
				mainItems: new OO.ui.ButtonGroupWidget({
					items: [buttons.newSection,buttons.sortSections,buttons.reorder,buttons.deprecated,buttons.deprecated2],
					classes: ['SpriteEditor-TBGroup']
				}),
				toolItems: new OO.ui.ButtonGroupWidget({
					items: [buttons.settings,buttons.changes,buttons.save],
					classes: ['SpriteEditor-TBGroup']
				}),
				arrowItem: new OO.ui.ButtonGroupWidget({
					items: [buttons.descriptionToggle],
					classes: ['SpriteEditor-TBGroup']
				})
			};
			var frame = new OO.ui.PanelLayout({
				classes: [ 'spriteedit-toolbar' ],
				expanded: false,
				framed: true
			});
			frame.$element.append(
				toolbarSections.fileItems.$element,
				toolbarSections.editItems.$element,
				toolbarSections.mainItems.$element,
				toolbarSections.toolItems.$element,
				toolbarSections.arrowItem.$element
			);
			root.append( frame.$element.get(0) );
			if (window.SpriteEditorModules.openButton)
				root.getElementsByClassName('spriteedit-toolbar')[0].style.display = 'none';
			// Setup click-functions
			buttons.deprecated.on('click', function() {
				spriteutils.setEditMode(!buttons.deprecated.getValue());
				buttons.deprecated2.setDisabled(!buttons.deprecated.getValue());	
			});
			buttons.descriptionToggle.on('click', function() {
				tbExpanded = !tbExpanded;
				buttons.descriptionToggle.setIcon(tbExpanded && 'previous' || 'next');
				var buttonNames = Object.keys(buttons);
				for (var i = 0; i < buttonNames.length; i++) {
					if (buttonNames[i] === 'deprecated2') continue;
					buttons[buttonNames[i]].setInvisibleLabel(!tbExpanded);
				}
			});
			buttons.undo.on('click', function() {
				moveHistory(-1);
			});
			buttons.redo.on('click', function() {
				moveHistory(1);
			});
			buttons.newSection.on('click', function() {
				highestID = highestID + 1;
				var sec = spriteutils.createSection('', highestID, {withSampleSprite: false});
				sec.element.scrollIntoView({behavior: 'smooth'});
			});
			buttons.changes.on('click', function() {
				openWindow('diff', msg('diff-module-missing').plain());
			});
			buttons.settings.on('click', function() {
				openWindow('settings', msg('settings-module-missing').plain());
			});
			buttons.reorder.on('click', function() {
				openWindow('reorder', msg('reorder-module-missing').plain());
			});
			buttons.sortSections.on('click', function() {
				spriteutils.enableSectionDragging(buttons.sortSections.getValue());
			});
			buttons.save.on('click', function() {
				OO.ui.prompt( msg('edit-summary-title').plain(), { textInput: { placeholder: msg('edit-summary-placeholder').plain() } } ).done( function ( result ) {
					if ( result !== null ) {
						saveToFile(result);
					}
				});
			});
			oclick = function(ignoreWarning) {
				if (!ignoreWarning && lastSaved !== history[historyPos - 1] && !window.confirm(msg('unsaved-changes').plain())) return;
				openWindow('open', msg('open-module-missing').plain());
			};
			buttons.open.on('click', oclick);
		}

		// init
		if (window.SpriteEditorModules.new) {
			window.SpriteEditorModules.new.setSharedData({
				options: options
			});
		}
		if (window.SpriteEditorModules.settings) {
			window.SpriteEditorModules.settings.setSharedData({
				loaded: loadedSpriteName,
				getEditPermission: getEditPermission
			});
		}
		function resetEditor() {
			var orgTB = root.children[0];
			root.innerHTML = '';
			root.appendChild(orgTB);
			highestID = 0;
			toShare.highestPos = 0;
			spriteutils.overrideHighestId(toShare.highestPos);
			spriteutils.setPosSprite(1);
			history = [];
			historyPos = 0;
			updateTitle(false);
			buttons.undo.setDisabled(true);
			buttons.redo.setDisabled(true);
			buttons.deprecated.setValue(false);
			buttons.sortSections.setValue(false);
			spriteutils.enableSectionDragging(false);
			hasEditPermission = true;
			hasTagPermission = false;
			hasNewTagPermission = false;
			tagExists = false;
			tagActive = false;

			// Disable toolbar buttons; reactivate if data is loaded
			toggleTBButtons(false);
		}
		function checkProtection(allperms, name) {
			var lvl = name && name.level || '';
			if (lvl === 'autoconfirmed')
				return allperms.includes('editsemiprotected');
			if (lvl === 'sysop')
				return allperms.includes('editprotected');
			return true;
		}
		function loadSprite3() {
			console.log('loadSprite3');
			setupOldCanvas(imgEle);
			var imgSize = Number(output.settings.size || options.defaultSpriteSize);
			imgWidth = Number(output.settings.width) || imgSize;
			imgHeight = Number(output.settings.height) || imgSize;
			spriteutils.setSpriteDimension(imgWidth, imgHeight);
			options.spacing = output.settings.spacing || 0;
			imgSpacingOrg = options.spacing;
			if (window.SpriteEditorModules.reorder) {
				window.SpriteEditorModules.reorder.setSharedData({
					options: options,
					spriteData: output,
					toShare: toShare,
					imgWidth: imgWidth,
					imgHeight: imgHeight,
					addHistory: addHistory,
					root: root,
					backgroundSprites: backgroundSprites
				});
			}
			if (window.SpriteEditorModules.diff) {
				window.SpriteEditorModules.diff.setSharedData({
					options: options,
					processData: processData,
					generateJSON: generateJSON,
					generateImage: generateImage,
					loaded: loadedSpriteName
				});
			}
			if (window.SpriteEditorModules.settings) {
				window.SpriteEditorModules.settings.setSharedData({
					imgWidth: imgWidth,
					imgHeight: imgHeight,
					imgSpacingOrg: imgSpacingOrg,
					options: options,
					spriteData: output,
					loaded: loadedSpriteName,
					image: imgEle,
					getEditPermission: getEditPermission
				});
			}
			options.spritesPerRow = options.isNew && 10 || Math.floor(((output.settings.sheetsize || imgEle.naturalWidth) + options.spacing) / (imgWidth + options.spacing));
			options.spritesPerRowOrg = options.isNew && 1 || options.spritesPerRow;
			
			for (var i = 0; i < output.sections.length; i++) {
				highestID = Math.max(highestID, output.sections[i].id);
				spriteutils.createSection(output.sections[i].name, output.sections[i].id, {withSampleSprite: false});
			}
			var sections = spriteutils.getSections();
			var ids = Object.keys(output.ids);
			var sprites = [];
			var flags;
			var l;
			ids.forEach(function(name) {
				if (sprites[output.ids[name].pos]) {
					var code = sprites[output.ids[name].pos].addName(name);
					flags = myData.flags;
					for (l = 0; l < flags.length; l++) {
						if (output.ids[name][flags[l][0]]) {
							code.classList.toggle('spritedoc-' + flags[l][0], true);
						}
					}
					return;
				}
				toShare.highestPos = Math.max(toShare.highestPos, output.ids[name].pos);
				var sprite = spriteutils.createSprite(name, output.ids[name].pos);
				var canvas = document.createElement('canvas');
				canvas.width = imgWidth;
				canvas.height = imgHeight;
				const ctx = canvas.getContext('2d');
				ctx.imageSmoothingEnabled = false;
				var coords = getPosCoords(output.ids[name].pos, true);
				ctx.drawImage(imgEle,
					coords.x, coords.y, imgWidth, imgHeight, // source coords
					0, 0, imgWidth, imgHeight // canvas coords
				);
				sprite.setImage(canvas);
				var sEle = sprite.element.querySelector("code");
				flags = myData.flags;
				for (l = 0; l < flags.length; l++) {
					if (output.ids[name][flags[l][0]]) {
						sEle.classList.toggle('spritedoc-' + flags[l][0], true);
					}
				}
				sprites[output.ids[name].pos] = sprite;
				sections[output.ids[name].section].addSprite(sprite.element);
			});
			Object.keys(sprites).forEach(function(a) {
				sortSpriteNames(a);
			});
			Object.keys(sections).forEach(function(a) {
				sortSection(a);
			});
			if (output.settings.pos) {
				var s = spriteutils.getSprite(Number(output.settings.pos));
				if (s)
					s.element.dataset.default = true;
			}
			spriteutils.overrideHighestId(toShare.highestPos);
			for (var k = 0; k < toShare.highestPos; k++) {
				if (sprites[k]) continue;
				var c = document.createElement('canvas');
				c.width = imgWidth;
				c.height = imgHeight;
				var coords = getPosCoords(k, true);
				c.getContext('2d').drawImage(imgEle,
					coords.x, coords.y, imgWidth, imgHeight, // source coords
					0, 0, c.width, c.height // canvas coords
				);
				backgroundSprites[k] = {
					sprite: c
				};
			}
			if (options.isNew && options.createSampleSection) {
				spriteutils.createSection(msg('first-section').plain(), 1, {withSampleSprite: true});
				highestID = 1;
			}
			toggleTBButtons(hasEditPermission);
			console.log('loadSprite3 End');
		}
		function loadSprite2(c) {
			console.log('loadSprite2');
			var requestData = {
				action: 'query',
				format: 'json',
				formatversion: '2',
				inprop: 'protection',
				list: 'tags',
				meta: 'userinfo',
				prop: 'info',
				tglimit: '500',
				tgprop: 'active',
				uiprop: 'rights|blockinfo'
			};
			if (!options.isNew)
				requestData.titles = 'Module:' + loadedSpriteName.full + '|File:' + (output.settings.image || loadedSpriteName.name + '.png');
			if (window.SpriteEditorModules.openButton) {
				hasEditPermission = false;
				spriteutils.setEditMode(false);
				loadSprite3();
				return;
			}
			api.get(Object.assign(requestData, c || {})).done(function(data) {
				var i;
				if (data.query.userinfo && data.query.userinfo.blockid) {
					hasEditPermission = false;
					loadSprite3();
					return;
				}
				for (var j = 0; j < 2; j++) {
					if (!data.query.pages || !data.query.pages[j]) continue;
					for (i = 0; i < data.query.pages[j].protection.length; i++) {
						if (!hasEditPermission || !checkProtection(data.query.userinfo.rights || [], data.query.pages[j].protection[i])) {
							hasEditPermission = false;
							loadSprite3();
							return;
						}
					}
				}
				if (!tagExists && data.query.tags && data.query.tags.length) {
					var entry = data.query.tags.find(function(a) {return a.name === 'spriteeditor';});
					if (typeof(entry) === 'object') {
						tagExists = true;
						tagActive = entry.active;
					}
				}
				if (data.query.userinfo && data.query.userinfo.rights) {
					hasNewTagPermission = data.query.userinfo.rights.indexOf( 'managechangetags' ) > 0;
					hasTagPermission = data.query.userinfo.rights.indexOf( 'applychangetags' ) > 0;
				}
				if (data.continue) {
					loadSprite2(data.continue);
					return;
				}
				if (spriteutils.isEditMode() !== hasEditPermission)
					spriteutils.setEditMode(hasEditPermission);
				loadSprite3();
			});
		}
		function loadNew(sizeW, sizeH, spacing) {
			sizeW = typeof(sizeW) === 'undefined' && options.defaultSpriteSize || sizeW;
			sizeH = typeof(sizeH) === 'undefined' && options.defaultSpriteSize || sizeH;
			output = Object.assign({}, blankJSON);
			if (spacing > 0)
				output.settings.spacing = spacing;
			if (sizeW !== sizeH) {
				output.settings.width = sizeW;
				output.settings.height = sizeH;
			} else {
				output.settings.size = sizeW;
			}
			output.settings.sheetsize = sizeW;
			options.isNew = true;
			updateTitle(false);
			loadSprite2();
		}
		function loadSprite(name, isNew, spriteSizeW, spriteSizeH, spacing) {
			console.log('loadSprite');
			if (name === undefined) return;
			// Reset
			options.isNew = isNew;
			loadedSpriteName = name;
			resetEditor();
			spriteutils.setEditMode(true);

			// Load Sprite
			imgEle = document.createElement('img');
			imgEle.style.width = '0';
			imgEle.style.height = '0';
			imgEle.crossOrigin = '*';
			if (isNew) {
				loadNew(spriteSizeW, spriteSizeH, spacing);
				return;
			}
			api.get({
				'action': 'scribunto-console',
				'title': 'Module:SpriteEditorDummy', // Dummy name (Doesn't need to exist)
				'question': '=p',
				'clear': true,
				'content': 'local require2=require\nfunction require() return {getUrl=function() return true end} end\nlocal a = require2("Module:' + loadedSpriteName.full + '")\nrequire=require2\n' +
				'return type(a) == "table" and a.settings and mw.text.jsonEncode(a) or "{}"'
			}).always(function(a) {
				if (!a.return) {
					loadNew();
					return;
				}
				output = JSON.parse(a.return);
				output.settings = output.settings || {};
				output.ids = output.ids || {};
				output.sections = output.sections || [];
				imgEle.src = myData.filepath(output.settings.image || name.name + '.png');
				spriteutils.setPosSprite(output.settings.pos || 1);
				imgEle.addEventListener('error', function() {
					loadNew();
				});
				imgEle.addEventListener('load', function() {
					loadSprite2();
				});
				document.body.append(imgEle);
			});
		}
		myData.preload = function(args) {
			if (--preloads > 0) return;
			if (args) {
				var logoURL = args[2].value.query.general.logo;
				myData.imageURL = logoURL.substring(0,logoURL.search('/images/')) + '/images/';
				var reg = /\/images\/[a-f0-9]{1}\/[a-f0-9]{2}\//gm;
				if (!reg.exec(logoURL)) myData.noMD5 = true;
			}
			window.dev.i18n.loadMessages('SpriteEditor').done(function (i18no) {
				myData.msg = i18no.msg;
				msg = myData.msg;
				if (!window.SpriteEditorModules.openButton)
					document.getElementById('firstHeading').textContent = msg('title').plain();
				updateTitle(false);
				createToolbar();
				var openDialog = window.SpriteEditorModules.open;
				if (openDialog) {
					openDialog.setSharedData({
						loadSprite: loadSprite,
						openWindow: openWindow
					});
				}
				var toOpen;
				if (window.SpriteEditorModules.openButton) {
					toOpen = typeof(config.wgArticleId) === 'number' && config.wgPageName || '';
				} else {
					toOpen = new URL(document.location.href).searchParams.get('sprite');
				}
				var names = toOpen && window.SpriteEditorModules.seperatePath(toOpen);
				if (toOpen && (!names.module.endsWith('Sprite') || myData.blacklist.includes(names.module.toLowerCase()))) {
					var historyUrl = new URL(window.location);
					historyUrl.searchParams.delete('sprite');
					window.history.pushState({}, '', historyUrl);
					toOpen = undefined;
				}
				if (toOpen) {
					loadSprite(names, false);
				} else {
					oclick(true);
				}
			});
		};
		myData.run = function() {
			root.innerHTML = '';
			mw.hook('dev.i18n').add(myData.preload);
			var getImageURL = api.get({
				action: 'query',
				format: 'json',
				meta: 'siteinfo',
				formatversion: '2',
				siprop: 'general'
			});
			var md5JS = mw.loader.load('https://commons.wikimedia.org/w/index.php?title=MediaWiki:MD5.js&action=raw&ctype=text/javascript');
			var i18nJS = mw.loader.load('https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js&*');
			Promise.allSettled([md5JS, i18nJS, getImageURL]).then(myData.preload);
		};
		$( document ).on( 'click.spriteEdit', function() {
			if (!skipClose) {
				closeTooltip();
			}
			skipClose = false;
		} );
		$( document ).on( 'keydown.spriteEdit', function( e ) {
			if (e.keyCode === 27) {
				closeTooltip();
			}
		} );
	});
})(window.jQuery, window.mediaWiki);