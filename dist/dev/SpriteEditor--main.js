;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.main && window.SpriteEditorModules.main.loaded) return;
	window.SpriteEditorModules.main = {loaded: true};
	var myData = window.SpriteEditorModules.main;
	myData.blacklist = [
		"animatesprite",
		"sprite"
	];
	const config = mw.config.get([
		'wgArticlePath',
		'wgFormattedNamespaces',
		'wgSiteName'
	]);
	var preloads = 2;
	var oclick;
	var root = document.getElementById('mw-content-text');
	var sections = [];
	var highestID = 0;
	var loadedSpriteName = {full: ''};
	var sprites = [];
	var buttons;
	var imgEle;
	var canvasCollection = [];
	var has_edit_permission = true;
	var has_tag_permission = false;
	var has_new_tag_permission = false;
	var tag_exists = false;
	var tag_active = false;
	var lastSaved;
	var tbExpanded = false;
	var history = [
		// [event-go backward, event-go forward, data ...];
	];
	var historyPos = 0;
	var output;
	var selectedPos;
	var selectedEle;
	var OO;
	var helper;
	var updateToolbar;
	var toolbarSections;
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
	var toShare = { // Helper
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
		if (lastSaved !== history[historyPos - 1] && !window.confirm(msg("unsaved-changes").plain())) {
			e.preventDefault();
			isPopstate = true;
			window.history.forward();
			return;
		}
		myData.run();
	});

	function sortSection(id) {
		// https://stackoverflow.com/questions/32199368/sorting-a-list-by-data-attribute
		Array.prototype.slice.call(root.querySelectorAll('div[data-section-id="' + id + '"] .spritedoc-box')).sort(function(a, b) {
			if (!a.dataset.sortKey || !b.dataset.sortKey) {
				if (!a.dataset.sortKey) return 1;
				if (!b.dataset.sortKey) return -1;
				return 0;
			}
			a = a.dataset.sortKey;
			b = b.dataset.sortKey;

			return a.localeCompare(b);
		}).forEach(function(node) {
			node.parentNode.appendChild(node);
		});
	}
	function sortSpriteNames(id) {
		// https://stackoverflow.com/questions/32199368/sorting-a-list-by-data-attribute
		Array.prototype.slice.call(root.querySelectorAll('li[data-pos="' + id + '"] .spritedoc-name')).sort(function(a, b) {
			var a_ = a.children[0].textContent;
			var b_ = b.children[0].textContent;

			if (a.children[0].getAttribute("data-placeholder") && !b.children[0].getAttribute("data-placeholder"))
				return 1;
			if (!a.children[0].getAttribute("data-placeholder") && b.children[0].getAttribute("data-placeholder"))
				return -1;

			return a_.localeCompare(b_);
		}).forEach(function(node) {
			node.parentNode.appendChild(node);
		});
		var codes = root.querySelectorAll('li[data-pos="' + id + '"] .spritedoc-name code');
		if (codes.length)
			root.querySelector('li[data-pos="' + id + '"]').setAttribute('data-sort-key', codes[0].textContent);
	}
	function rotateSprite(sprite) {
		var c = helper.newCanvas();
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
		var c = helper.newCanvas();
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
		const _indexFilter = function(ele) {
			return ele.innerText.includes(name);
		};
		return Array.from(document.querySelectorAll("code[isSprite]")).filter(_indexFilter);
	}
	function markDuplicateNames(list) {
		var names = Object.keys(list);
		for (var i = 0; i < names.length; i++) {
			var eleList = indexNames(names[i]);
			var length = eleList.length;
			for (var j = 0; j < length; j++) {
				var obj = eleList[j];
				obj.classList[length > 1 ? "add" : "remove"]("spriteedit-dupe");
			}
		}
		var disable = root.querySelectorAll(".spriteedit-dupe").length ? true : false;
		buttons.changes.setDisabled(disable);
		buttons.save.setDisabled(disable);
	}
	function generateJSON() {
		var a = Object.assign(blankJSON);
		a.settings = Object.assign({}, output.settings);
		a.sections = [];
		a.ids = {};
		delete a.settings.pos;
		delete a.settings.spacing;
		if (a.settings.version) {
			a.settings.version = "version=" + Date.now();
		} else {
			a.settings.url = "require( [[" + config.wgFormattedNamespaces[828] + ":Sprite]] ).getUrl( '" + (a.settings.image || loadedSpriteName.name + ".png") + "', 'format=original&version=" + Date.now() + "', '" + loadedSpriteName.module.toLowerCase().substring(0, loadedSpriteName.module.length - 6) + "-sprite' ),";
		}
		a.settings.sheetsize = options.spritesPerRow * (imgWidth + options.spacing) - options.spacing;
		if (options.spacing > 0)
			a.settings.spacing = options.spacing;
		var sections = root.querySelectorAll('div.spritedoc-section');
		for (var i = 0; i < sections.length; i++) {
			var secId = options.cleanupSectionIDs ? String(i) : sections[i].dataset.sectionId;
			a.sections.push( {
				name: sections[i].querySelector("span").textContent,
				id: secId
			} );
			var boxes = sections[i].querySelector(".spritedoc-boxes").children;
			for (var j = 0; j < boxes.length; j++) {
				var names = boxes[j].querySelectorAll(".spritedoc-name");
				for (var k = 0; k < names.length; k++) {
					if (options.removeDeprecatedNames && names[k].children[0].classList.contains("spritedoc-deprecated")) continue;
					if (boxes[j].dataset.pos === "null") continue;
					a.ids[names[k].children[0].textContent] = {
						pos: boxes[j].dataset.pos,
						section: secId
					};
					if (boxes[j].dataset.default) {
						a.settings.pos = boxes[j].dataset.pos;
					}
					if (names[k].children[0].classList.contains("spritedoc-deprecated")) {
						a.ids[names[k].children[0].textContent].deprecated = true;
					}
				}
			}
		}
		return a;
	}
	// Serialize JSON
	function getNames(data, ident) {
		var to_return = [];
		var names = Object.keys(data);
		if (ident === 2) {
			names.sort();
		}
		for (var i = 0; i < names.length; i++) {
			var t = isNaN(data[names[i]]);
			var u = t && "\'" || "";
			if (String(data[names[i]]).substring(0,7) === "require") {
				u = "";
			}
			to_return.push( names[i] + " = " + u + data[names[i]] + u );
		}
		var id = ("\t").repeat(ident);
		var joinVar = ident === 2 && ",\n" + id || ", ";
		return "{" + (ident === 2 && "\n" + id || " ") + to_return.join(joinVar) + (ident === 2 && "\n" + ("\t").repeat(ident - 1) || " ") + "},";
	}
	function processData(data, tr, ident, sortNames) {
		var to_return = tr || [
			"{"
		];
		ident = ident || 1;
		var names = Object.keys(data);
		if (sortNames && ident > 1) {
			var use_name = data[names[0]] && data[names[0]].name || 0;
			var dataA;
			var dataB;
			names = names.sort(function(a, b) {
				if (use_name) {
					dataA = data[a].name.toLowerCase();
					dataB = data[b].name.toLowerCase();
				} else {
					dataA = a.toLowerCase();
					dataB = b.toLowerCase();
				}
				if (dataA > dataB) return 1;
				if (dataA < dataB) return -1;
				return 0;
			});
		}
		for (var i = 0; i < names.length; i++) {
			var id = ("\t").repeat(ident);
			if (!data[names[i]]) continue;
			var needQuotes = names[i] !== (names[i].match(/(\d|\w)+/gm) || [])[0];
			if (data[names[i]].pos || data[names[i]].id || data[names[i]].sheetsize || data[names[i]].classname || data[names[i]].stylesheet) {
				if (!isNaN(names[i])) {
					to_return.push( id + getNames(data[names[i]], ident + 1) );
				} else {
					to_return.push( id + (needQuotes && "['" || "") + names[i] + (needQuotes && "']" || "") + ' = ' + getNames(data[names[i]], ident + 1) );
				}
			} else if (typeof(data[names[i]]) === "object") {
				to_return.push( id + (needQuotes && "['" || "") + names[i] + (needQuotes && "']" || "") + " = {" );
				processData(data[names[i]], to_return, ident + 1, names[i] !== "sections");
				to_return.push( id + "}," );
			}
		}
		if (ident === 1) {
			to_return.push( "}" );
			return to_return.join("\n");
		}
	}
	function getPosCoords(pos, useOrg) {
		var sPR = useOrg && options.spritesPerRowOrg || options.spritesPerRow;
		var s = useOrg && imgSpacingOrg || options.spacing;
		var cordY = Math.ceil(pos / sPR);
		var cordX = pos - (cordY - 1) * sPR;
		cordY = (cordY - 1) * (imgHeight + s);
		cordX = (cordX - 1) * (imgWidth + s);
		return {x: cordX, y: cordY};
	}
	function generateImage() {
		var c = helper.newCanvas();
		var ctx = c.getContext('2d');
		var keepOldSprites = !options.removeUnusedSprites && !options.isNew;
		var spritesPerRow = options.spritesPerRow;
		c.width = (imgWidth + options.spacing) * spritesPerRow - options.spacing;
		c.height = 0;
		if (keepOldSprites)
			c.height = Math.ceil(Math.ceil((imgEle.naturalHeight + imgSpacingOrg) / (imgHeight + imgSpacingOrg)) * options.spritesPerRowOrg / spritesPerRow) * (imgHeight + options.spacing) - options.spacing;
		c.height = Math.max(c.height, Math.ceil(toShare.highestPos / spritesPerRow) * (imgHeight + options.spacing) - options.spacing);
		var i;
		var sID;
		var drawn = [];
		var coords;
		var allSprites = root.querySelectorAll('li[class="spritedoc-box"]');
		for (i = 0; i < allSprites.length; i++) {
			if (options.removeUnusedSprites && options.removeDeprecatedNames && allSprites[i].querySelectorAll('code[class="spritedoc-deprecated"]').length === allSprites[i].querySelectorAll("code").length) {
				continue;
			}
			sID = allSprites[i].dataset.pos;
			if (sID === "null") continue;
			coords = getPosCoords(sID, false);
			drawn[sID] = true;
			ctx.drawImage(allSprites[i].querySelector("canvas"),
				0, 0, imgWidth, imgHeight, // Source coords.
				coords.x, coords.y, imgWidth, imgHeight // Canvas coords.
			);
		}
		if (keepOldSprites) { // Copy old sprites to new canvas
			var rowsOrg = Math.ceil(imgEle.naturalHeight / imgHeight);
			for (i = 0; i < rowsOrg; i++) { // Rows
				for (var j = 0; j < options.spritesPerRowOrg; j++) { // Columns
					sID = i * options.spritesPerRowOrg + j + 1;
					if (drawn[sID] || sID > toShare.heighestPos) continue;
					var coordsOld = getPosCoords(sID, true);
					coords = getPosCoords(sID, false);
					ctx.drawImage(imgEle,
						coordsOld.x, coordsOld.y, imgWidth, imgHeight, // Source coords.
						coords.x, coords.y, imgWidth, imgHeight // Canvas coords.
					);
				}
			}
		}
		return [c, oldImageAsCanvas, oldImageAsCanvas.toDataURL() !== c.toDataURL()];
	}
	function setupOldCanvas(imgData) {
		oldImageAsCanvas = document.createElement("canvas");
		oldImageAsCanvas.width = imgData.width || imgData.naturalWidth;
		oldImageAsCanvas.height = imgData.height || imgData.naturalHeight;
		if (options.isNew) return;
		var ctxOld = oldImageAsCanvas.getContext('2d');
		ctxOld.drawImage(imgData, 0, 0);
	}
	function saveJSON(summary, data, generatedJSON) {
		api.postWithEditToken({
			action: "edit",
			contentformat: "text/plain",
			contentmodel: "Scribunto",
			notminor: true,
			recreate: true,
			summary: summary,
			tags: tag_active && tag_exists && has_tag_permission && "spriteeditor" || undefined,
			text: "return " + data,
			title: 'Module:' + loadedSpriteName.full,
			formatversion: 2
		}).always(function(d) {
			toggleTBButtons(has_edit_permission);
			buttons.open.setDisabled(false);
			buttons.undo.setDisabled(historyPos === 0);
			buttons.redo.setDisabled(historyPos === history.length);
			if (d.edit.result !== "Success") {
				alert(msg("json-error").plain());
				return;
			}
			alert(msg("json-success").plain());
			if (options.isNew) {
				options.isNew = false;
				output = generatedJSON;
			}
			lastSaved = history[historyPos - 1];
			updateTitle(false);
		});
	}
	function addMissingTag(summary, data, generatedJSON) {
		if (!tag_exists && has_new_tag_permission) {
			api.postWithEditToken({
				action: "managetags",
				format: "json",
				formatversion: "2",
				operation: "create",
				tag: "spriteeditor",
				reason: "Add missing tag for [[w:c:dev:SpriteEditor|SpriteEditor]]"
			}).always(function(e) {
				if (!e.error) {
					tag_exists = true;
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
				filename: output.settings.image || loadedSpriteName.name + '.png',
				comment: s,
				formatversion: 2,
				ignorewarnings: true
			}).always(function(d) {
				if (!d) {
					toggleTBButtons(has_edit_permission);
					alert(msg("image-error").plain());
					return;
				}
				setupOldCanvas(gIVars[0]);
				addMissingTag(s, data, generatedJSON);
			});
		});
	}
	function updateTitle(changesMade) {
		document.title = (loadedSpriteName.full.length && (loadedSpriteName.name + (changesMade && "*" || "") + " – ") || "") + msg("title").plain() + ' – ' + config.wgSiteName;
		document.getElementById('firstHeading').textContent = msg("title").plain() + (loadedSpriteName.full.length && (" – " + loadedSpriteName.name + (options.isNew && " (" + msg("dialog-button-new").plain() + ")" || "") + (changesMade && "*" || "")) || "");
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
	function removeOverlays() {
		selectedEle.removeAttribute("ghost");
		var overlays = root.querySelectorAll('.section-move-overlay');
		for (var i = 0; i < overlays.length; i++) {
			overlays[i].parentElement.removeChild(overlays[i]);
		}
		selectedPos = null;
	}
	function moveHistory(dir) { // !dir = Backwards; dir = Forwards
		historyPos += dir;
		var offset = Number(dir > 0);
		var c = history[historyPos - offset]; // Current
		var d = offset;
		var names;
		var i;
		var n = {};
		if (typeof(c[d]) === "function") {
			c[d]();
		} else if (c[d] === "sprite-added") {
			toShare.highestPos = c[5 + offset];
			helper.removeSprite(c[3], true);
		} else if (c[d] === "sprite-removed") {
			toShare.highestPos = c[5 + offset];
			root.querySelector('div[data-section-id="' + c[2] + '"] .spritedoc-boxes').appendChild(c[4]);
			var list = c[4].querySelectorAll(".spritedoc-name code[isSprite]");
			for (i = 0; i < list.length; i++) {
				n[list[i].textContent] = true;
			}
			sortSection(c[2]);
			markDuplicateNames(n);
		} else if (c[d] === "sprite-replace") {
			var oldSprite = c[4 - offset];
			var newSprite = c[3 + offset];
			canvasCollection[c[2]].parentElement.replaceChild(newSprite, oldSprite);
			canvasCollection[c[2]] = newSprite;
		} else if (c[d] === "sprite-rename") { // c[5] = code-element
			var oldName = c[3 + offset];
			var newName = c[4 - offset];
			c[5].textContent = oldName;
			n[oldName] = true;
			n[newName] = true;
			markDuplicateNames(n);
			sortSpriteNames(c[2]);
			sortSection(c[5].closest('.spritedoc-section').dataset.sectionId);
		} else if (c[d] === "sprite-name-removed") { // c[3] = spritedoc-names
			c[3].appendChild(c[4]);
			c[4].children[0].textContent = c[5];
			n[c[5]] = true;
			markDuplicateNames(n);
			sortSpriteNames(c[2]);
			sortSection(c[3].closest('.spritedoc-section').dataset.sectionId);
		} else if (c[d] === "sprite-name-added") {
			n[c[5]] = true;
			var secID = c[4].closest('.spritedoc-section').dataset.sectionId;
			c[4].parentElement.removeChild(c[4]);
			markDuplicateNames(n);
			sortSpriteNames(c[2]);
			sortSection(secID);
		} else if (c[d] === "section-rename") {
			root.querySelector('div[data-section-id="' + c[2] + '"] span').textContent = c[3 + offset];
		} else if (c[d] === "section-added") {
			names = c[3].querySelectorAll("code[isSprite]");
			root.removeChild(c[3]);
			for (i = 0; i < names.length; i++) {
				n[names[i].textContent] = true;
			}
			markDuplicateNames(n);
		} else if (c[d] === "section-removed") {
			if (root.children.length < c[5]) {
				root.appendChild(c[3]);
			} else {
				root.insertBefore(c[3], Array.from(root.children)[c[5]]);
			}
			names = c[3].querySelectorAll("code[isSprite]");
			for (i = 0; i < names.length; i++) {
				n[names[i].textContent] = true;
			}
			markDuplicateNames(n);
			c[3].querySelector("span").textContent = c[4];
		}
		buttons.undo.setDisabled(historyPos === 0);
		buttons.redo.setDisabled(historyPos === history.length);
		updateTitle(lastSaved !== history[historyPos - 1]);
	}
	function getCodeField(name) {
		var box_code = document.createElement('code');
		box_code.contentEditable = has_edit_permission;
		box_code.textContent = name;

		box_code.onpaste = function(e) {
			e.preventDefault();
			var paste = (e.clipboardData || window.clipboardData).getData('text');
			paste = paste.replace( /\n/g, ' ' ).trim();
			window.document.execCommand( 'insertText', false, paste );
		};
		box_code.onkeypress = function(e) {
			if ( e.keyCode !== 13 ) return;
			e.preventDefault();
			e.target.blur();
		};
		box_code.addEventListener('focus', function() {
			if (buttons.deprecated.getValue()) {
				const _boxCode = box_code;
				const _func = function() {
					_boxCode.classList.toggle("spritedoc-deprecated");
				};
				addHistory([_func, _func]);
				_func();
				box_code.blur();
			} else {
				box_code.setAttribute("data-original-text", box_code.textContent);
			}
		});
		box_code.addEventListener('blur', function() {
			if (buttons.deprecated.getValue()) return;
			var posId = box_code.closest('.spritedoc-box').dataset.pos;
			var list = {};
			box_code.textContent = box_code.textContent.trim();
			var secId = box_code.closest('.spritedoc-section').dataset.sectionId;
			var orgT = box_code.getAttribute("data-original-text") || "";
			if (box_code.textContent.length) {
				box_code.removeAttribute("data-original-text");
				if (orgT === box_code.textContent) return;
				if (orgT.length) {
					list[orgT] = true;
					addHistory([
						"sprite-rename",
						"sprite-rename",
						posId,
						orgT,
						box_code.textContent,
						box_code
					]);
				} else {
					addHistory([
						"sprite-name-added",
						"sprite-name-removed",
						posId,
						box_code.closest(".spritedoc-names"),
						box_code.parentElement,
						box_code.textContent
					]);
				}
				list[box_code.textContent] = true;
				markDuplicateNames(list);
				box_code.classList.remove("spriteedit-new");
				box_code.removeAttribute("data-placeholder");
				sortSpriteNames(posId);
				sortSection(secId);
			} else {
				var isRemoved = false;
				var cl = box_code.closest('.spritedoc-names');
				if (cl.children.length === 1) {
					box_code.innerText = orgT;
					helper.removeSprite(posId);
					isRemoved = true;
				} else if (cl.children.length > 1) {
					if (orgT.length)
						addHistory([
							"sprite-name-removed",
							"sprite-name-added",
							posId,
							box_code.closest(".spritedoc-names"),
							box_code.parentElement,
							orgT
						]);
					cl.removeChild(box_code.parentElement);
				}
				markDuplicateNames(list);
				list = {};
				if (!orgT.length) return;
				list[orgT] = true;
				markDuplicateNames(list);
				if (cl.children.length > 0) {
					sortSpriteNames(posId);
					if (!isRemoved)
						sortSection(secId);
				}
			}
		});

		if (!(name || '').length) {
			box_code.className = "spriteedit-new";
			box_code.setAttribute("isSprite", "");
			box_code.setAttribute('data-placeholder', msg("new-placeholder").plain());
		}
		return box_code;
	}
	function createContextButton(icon, lbl, tooltip) {
		return new OO.ui.ButtonInputWidget( {
			framed: false,
			icon: icon,
			label: lbl,
			invisibleLabel: false,
			title: tooltip
		} );
	}
	function addFile(f, ele) {
		var reader = new FileReader();
		reader.onloadend = function(readerEvent) {
			var imgEle = document.createElement("img");
			imgEle.style.width = "0";
			imgEle.style.height = "0";
			imgEle.src = readerEvent.target.result;
			imgEle.addEventListener("load", function() {
				// From original Sprite-Editor
				var fname = f.name.trim().replace( /\.[^\.]+$/, '' ).replace( /_/g, ' ' );
				if (!fname.length) return;
				toShare.highestPos++;
				var posID = toShare.highestPos;
				var secID = ele.closest(".spritedoc-section").dataset.sectionId;
				helper.addSprite(posID, imgEle);
				var cl = getSpriteBox(posID, [[fname, false]]);
				var spd = ele.closest(".spritedoc-box");
				spd.parentElement.insertBefore(cl, spd);
				addHistory([
					"sprite-added",
					"sprite-removed",
					String(secID),
					String(posID),
					cl,
					posID - 1,
					posID
				]);
				var abc = {};
				abc[fname] = true;
				markDuplicateNames(abc);
				sortSection(secID);
			});
		};
		reader.readAsDataURL(f);
	}
	function ttFunction(event) {
		skipClose = true;
		var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
		if (menu)
			document.body.removeChild(menu);
		selectedEle = event.target.closest(".spritedoc-box");
		selectedPos = selectedEle.dataset.pos;
		if (selectedPos === "null") {
			var input = document.createElement('input');
			input.type = 'file';
			input.setAttribute("multiple", "");
			input.setAttribute("accept", "image/*");
			input.onchange = function(e) {
				Array.prototype.forEach.call(e.target.files, function(file) {
					addFile(file, selectedEle);
				});
			};
			$(input).click();
			return;
		}
		var ele = document.createElement("div");
		ele.className = "spriteedit-tooltip spriteedit-tooltip-controls spriteedit-tooltip-horizontal";
		var ele2 = document.createElement("div");
		ele2.className = "spriteedit-tooltip-text";
		ele.appendChild(ele2);
		var ele3 = document.createElement("div");
		ele3.className = "spriteedit-tooltip-arrow";
		ele.appendChild(ele3);

		var buttons = {
			changeSprite: createContextButton(
				"imageGallery",
				msg("replace-sprite-label").plain(),
				msg("replace-sprite-hover").plain()
			),
			deleteSprite: createContextButton(
				"trash",
				msg("delete-sprite-label").plain(),
				msg("delete-sprite-hover").plain()
			),
			defaultSprite: createContextButton(
				selectedEle.dataset.default && "unStar" || "star",
				msg((selectedEle.dataset.default && "unmark" || "mark") + "-default-sprite-label").plain(),
				msg("default-sprite-label").plain()
			),
			downloadSprite: createContextButton(
				"download",
				msg("download-sprite-label").plain(),
				msg("download-sprite-hover").plain()
			),
			moveSprite: createContextButton(
				"move",
				msg("move-sprite-label").plain(),
				msg("move-sprite-hover").plain()
			),
			rotateSpriteLeft: createContextButton(
				"undo",
				msg("rotate-left-label").plain(),
				msg("rotate-left-hover").plain()
			),
			rotateSpriteRight: createContextButton(
				"redo",
				msg("rotate-right-label").plain(),
				msg("rotate-right-hover").plain()
			),
			mirrorSpriteHorizontal: createContextButton(
				"subtract",
				msg("flip-h-label").plain(),
				msg("flip-h-hover").plain()
			),
			mirrorSpriteVertical: createContextButton(
				"subtract",
				msg("flip-v-label").plain(),
				msg("flip-v-hover").plain()
			),
		};

		buttons.changeSprite.setFlags(['primary', 'progressive']);
		buttons.defaultSprite.setFlags(['primary', 'progressive']);
		buttons.deleteSprite.setFlags(['primary', 'destructive']);
		buttons.downloadSprite.setFlags(['primary', 'progressive']);
		buttons.moveSprite.setFlags(['primary', 'progressive']);
		buttons.rotateSpriteLeft.setFlags(['primary', 'progressive']);
		buttons.rotateSpriteRight.setFlags(['primary', 'progressive']);
		buttons.mirrorSpriteHorizontal.setFlags(['primary', 'progressive']);
		buttons.mirrorSpriteVertical.setFlags(['primary', 'progressive']);
		buttons.mirrorSpriteVertical.$icon.get(0).style.transform = "rotate(90deg)";

		if (has_edit_permission) {
			$(ele2).append(buttons.changeSprite.$element);
			$(ele2).append(buttons.defaultSprite.$element);
		}
		$(ele2).append(buttons.downloadSprite.$element);
		if (has_edit_permission) {
			if (imgWidth == imgHeight) {
				$(ele2).append(buttons.rotateSpriteLeft.$element);
				$(ele2).append(buttons.rotateSpriteRight.$element);
			}
			$(ele2).append(buttons.mirrorSpriteHorizontal.$element);
			$(ele2).append(buttons.mirrorSpriteVertical.$element);
			$(ele2).append(buttons.moveSprite.$element);
			$(ele2).append(buttons.deleteSprite.$element);
		}

		document.body.append(ele);

		ele.style.left = ($(event.srcElement).offset().left - $(ele).outerWidth()) + "px";
		ele.style.top = $(event.srcElement).offset().top + event.target.clientHeight * 0.5 + "px";
		ele.style.opacity = "1";
		ele.style.transform = "scale(1)";
		ele.style.zIndex = "299";

		buttons.deleteSprite.on("click", function() {
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			document.body.removeChild(menu);
			helper.removeSprite(selectedPos);
		});
		function rotate(additionalRotation, skipHistory, altCanvas) {
			var orgCanvas = canvasCollection[selectedPos];
			var newImg = additionalRotation > 0 && rotateSprite(altCanvas || orgCanvas) || altCanvas || orgCanvas;
			for (var i = 0; i < additionalRotation; i++) {
				newImg = rotateSprite(newImg);
			}
			if (skipHistory == true)
				return newImg;
			helper.addSprite(selectedPos, newImg);
			orgCanvas.parentElement.replaceChild(canvasCollection[selectedPos], orgCanvas); // Replacing old with new.
			addHistory([
				"sprite-replace",
				"sprite-replace",
				selectedPos,
				orgCanvas, // Old canvas
				canvasCollection[selectedPos] // New canvas
			]);
		}
		buttons.rotateSpriteLeft.on("click", function() {
			// Close menu
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			document.body.removeChild(menu);
			// Rotate sprite
			rotate(2);
		});
		buttons.rotateSpriteRight.on("click", function() {
			// Close menu
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			document.body.removeChild(menu);
			// Rotate sprite
			rotate(0);
		});
		buttons.mirrorSpriteHorizontal.on("click", function() {
			// Close menu
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			document.body.removeChild(menu);
			// Rotate
			var spr = mirrorSprite(false, canvasCollection[selectedPos]);
			// Rotate back (To apply the new image)
			rotate(0, false, spr);
		});
		buttons.mirrorSpriteVertical.on("click", function() {
			// Close menu
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			document.body.removeChild(menu);
			// Mirror
			var spr = mirrorSprite(true, canvasCollection[selectedPos]);
			// Rotate back (To apply the new image)
			rotate(0, false, spr);
		});

		function moveSpriteClick(event) {
			const sec = event.target.dataset.section;
			const oldSec = selectedEle.closest(".spritedoc-section").dataset.sectionId;
			const eleSelected = selectedEle;
			if (sec === oldSec) {
				removeOverlays();
				updateToolbar();
				return;
			}
			const _func = function(ele) {
				root.querySelector('div[data-section-id="' + ele + '"] .spritedoc-boxes').appendChild(eleSelected);
				sortSection(ele);
			};
			addHistory([
				function() {_func(oldSec);},
				function() {_func(sec);}
			]);
			removeOverlays();
			_func(sec);
			updateToolbar();
		}
		function setDefaultSprite(oldDefault, newDefault) {
			if (oldDefault) delete oldDefault.dataset.default;
			if (newDefault) newDefault.dataset.default = ".";
		}
		buttons.defaultSprite.on("click", function() {
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			document.body.removeChild(menu);
			var oldDefault = document.querySelector('li[data-default]');
			if (oldDefault)
				delete oldDefault.dataset.default;

			if (oldDefault !== selectedEle)
				selectedEle.dataset.default = ".";

			const _oldDefault = oldDefault;
			const _newDefault = document.querySelector('li[data-default]');
			addHistory([
				function() {
					setDefaultSprite(_newDefault, _oldDefault);
				},
				function() {
					setDefaultSprite(_oldDefault, _newDefault);
				}
			]);
		});
		buttons.moveSprite.on("click", function() {
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			document.body.removeChild(menu);
			selectedEle.setAttribute("ghost", "true");
			var sections = root.querySelectorAll(".spritedoc-section");
			for (var i = 0; i < sections.length; i++) {
				var box = sections[i].querySelector(".spritedoc-boxes");
				var ele = document.createElement("div");
				ele.textContent = "Click to move.";
				ele.classList.add("section-move-overlay");
				ele.dataset.section = sections[i].dataset.sectionId;
				ele.addEventListener("click", moveSpriteClick);
				box.append(ele);
			}
			updateToolbar();
		});

		buttons.downloadSprite.on("click", function() {
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			document.body.removeChild(menu);
			var fileName = document.querySelector('li[data-pos="' + selectedPos + '"]').dataset.sortKey;
			var element = document.createElement('a');
			element.crossOrigin = '*';
			element.setAttribute('href', canvasCollection[selectedPos].toDataURL("image/png"));
			element.setAttribute('download', fileName + ".png");
			element.click();
		});
		buttons.changeSprite.on("click", function() {
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			document.body.removeChild(menu);
			var input = document.createElement('input');
			input.type = 'file';
			input.setAttribute("accept", "image/*");
			input.onchange = function(e) {
				var file = e.target.files[0];
				var reader = new FileReader();
				reader.onloadend = function(readerEvent) {
					var imgEle = document.createElement("img");
					imgEle.style.width = "0";
					imgEle.style.height = "0";
					imgEle.src = readerEvent.target.result;
					imgEle.addEventListener("load", function() {
						var oldCanvas = canvasCollection[selectedPos];
						helper.addSprite(selectedPos, imgEle);
						oldCanvas.parentElement.replaceChild(canvasCollection[selectedPos], oldCanvas); // Replacing old with new.
						addHistory([
							"sprite-replace",
							"sprite-replace",
							selectedPos,
							oldCanvas, // Old canvas
							canvasCollection[selectedPos] // New canvas
						]);
					});
				};
				reader.readAsDataURL(file);
			};
			$(input).click();
		});
	}

	function getNewBoxFunction(a) {
		return function() {
			var box_code = getCodeField();
			var spriteName = document.createElement('li');
			spriteName.classList = 'spritedoc-name';
			spriteName.append(box_code);
			a.append(spriteName);
			var orgVar = buttons.deprecated.getValue();
			buttons.deprecated.setValue(false);
			box_code.focus();
			buttons.deprecated.setValue(orgVar);
		};
	}
	function getSpriteBox(pos, data) {
		var spriteBox = document.createElement('li');
		spriteBox.classList = 'spritedoc-box';
		spriteBox.setAttribute('data-pos', pos);
		if (pos) {
			spriteBox.setAttribute("draggable","true");
			spriteBox.ondragstart = function(event) {
				event.dataTransfer.setData("Text", event.target.dataset.pos);
			};
		}
		// sprite image
		var spriteImage = document.createElement('div');
		spriteImage.className = 'spritedoc-image';
		var image = document.createElement('span');
		image.className = 'sprite';
		if (!pos) {
			image = new OO.ui.IconWidget( {
				icon: 'imageAdd',
				label: msg("new-images-hover").plain(),
				title: msg("new-images-label").plain(),
				classes: [ "spriteeditor-newImagesBtn" ]
			} ).$element.get(0);
		} else if (canvasCollection[pos]) {
			image.appendChild(canvasCollection[pos]);
		} else {
			var posCoords = getPosCoords(pos, true);
			var canvas = helper.newCanvas();
			canvas.getContext('2d').drawImage(imgEle,
				posCoords.x, posCoords.y, imgWidth, imgHeight, // Source coords.
				0, 0, imgWidth, imgHeight // Canvas coords.
			);
			canvasCollection[pos] = canvas;
			image.appendChild(canvas);
		}
		spriteImage.append(image);
		spriteImage.addEventListener("click", ttFunction);

		const spriteNames = document.createElement('ul');
		spriteNames.classList = 'spritedoc-names';
		data.sort(function(a, b) {return a[0] < a[1];});
		for (var name = 0; name < data.length; name++) {
			if (name === 0 && pos)
				spriteBox.setAttribute('data-sort-key', data[name][0]);

			// sprite names
			var box_code = getCodeField(data[name][0]);
			if (data[name][1])
				box_code.classList.add("spritedoc-deprecated");

			if (pos)
				box_code.setAttribute("isSprite", "");

			var spriteName = document.createElement('li');
			spriteName.classList = 'spritedoc-name';
			spriteName.append(box_code);
			spriteNames.append(spriteName);
		}
		if (has_edit_permission) {
			var addNameBtn = new OO.ui.ButtonInputWidget( {
				classes: [ 'spriteedit-add-name' ],
				framed: false,
				icon: 'add',
				title: msg("add-name-label").plain(),
			} );
			addNameBtn.on("click", getNewBoxFunction(spriteNames));
			spriteBox.append(addNameBtn.$element.get(0));
		}
		spriteBox.append(spriteImage);
		spriteBox.append(spriteNames);
		return spriteBox;
	}
	function generateSpriteView(id) {
		var spriteBoxes = document.createElement('ul');
		spriteBoxes.classList = 'spritedoc-boxes';
		if (sections[id].children.length > 1)
			sections[id].removeChild(sections[id].children[1]);

		var dropZone = document.createElement("div");
		dropZone.classList = "section-drag-overlay sprite-drop-area";
		dropZone.style.display = "none";
		dropZone.style.top = 0;
		dropZone.style.left = 0;
		dropZone.style.zIndex = 99;

		sections[id].append(spriteBoxes);
		spriteBoxes.append(dropZone);
		if (sprites[id]) {
			for (var pos = 0; pos < sprites[id].length; pos++) {
				if (!sprites[id][pos]) continue;
				// sprite box
				var sb = getSpriteBox(pos, sprites[id][pos]);
				spriteBoxes.append(sb);
				sortSpriteNames(pos);
			}
		}
		// Handle drag'n'drop
		spriteBoxes.addEventListener("dragenter", function(e) {
			e.stopPropagation();
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
			dropZone.style.display = "unset";
		});
		dropZone.addEventListener("dragenter", function(e) {
			e.preventDefault();
		});
		dropZone.addEventListener("dragover", function(e) {
			e.preventDefault();
		});
		dropZone.addEventListener("dragleave", function(e) {
			e.preventDefault();
			dropZone.style.display = "none";
		});
		dropZone.addEventListener("drop", function(e) {
			e.preventDefault();
			dropZone.style.display = "none";
			var ele = e.dataTransfer.getData("Text");
			var files = e.dataTransfer.files;
			if (files.length > 0) {
				var sec = e.srcElement.closest(".spritedoc-section").dataset.sectionId;
				if (!sec) return;
				var boxes = root.querySelector('div[data-section-id="' + sec + '"] .spritedoc-boxes');
				for (var i = 0; i < files.length; i++) {
					if (files[i].type.match(/image.*/))
						addFile(files[i], boxes.lastChild);
				}
				return;
			}
			if (!ele) return;
			const selEle = document.querySelector('li[data-pos="' + ele + '"]');
			if (!selEle) return;
			const oldSec = selEle.closest(".spritedoc-section").dataset.sectionId;
			const newSec = e.target.closest(".spritedoc-section").dataset.sectionId;
			if (newSec === oldSec) return;
			const _func = function(ele) {
				root.querySelector('div[data-section-id="' + ele + '"] .spritedoc-boxes').appendChild(selEle);
				sortSection(ele);
			};
			addHistory([
				function() {_func(oldSec);},
				function() {_func(newSec);}
			]);
			_func(newSec);
		});

		// Add images to section-button
		if (has_edit_permission) {
			var permOrg = has_edit_permission;
			has_edit_permission = false;
			spriteBoxes.append( getSpriteBox(null, [[msg("new-images-label").plain()]]) );
			has_edit_permission = permOrg;
		}
	}
	function newSection(s) {
		var spriteSection = helper.newSection(s);
		root.append(spriteSection);
		highestID = Math.max(highestID, s.id);
		sections[s.id] = spriteSection;
		generateSpriteView(s.id);
		sortSection(s.id);
		return spriteSection;
	}
	updateToolbar = function() {
		var toolbar = root.querySelector('.spriteedit-toolbar');
		root.removeChild(toolbar);
		var frame = new OO.ui.PanelLayout({
			classes: [ 'spriteedit-toolbar' ],
			expanded: false,
			framed: true
		});
		if (root.querySelectorAll('.section-move-overlay').length) {
			frame.$element.append(
				toolbarSections.moveItems.$element,
				toolbarSections.arrowItem.$element
			);
		} else {
			frame.$element.append(
				toolbarSections.fileItems.$element,
				toolbarSections.editItems.$element,
				toolbarSections.mainItems.$element,
				toolbarSections.toolItems.$element,
				toolbarSections.arrowItem.$element
			);
		}
		root.insertBefore(frame.$element.get(0), root.firstChild);
	};
	function toggleTBButtons(active) {
		buttons.changes.setDisabled(!active);
		buttons.deprecated.setDisabled(!active);
		buttons.newSection.setDisabled(!active);
		buttons.save.setDisabled(!active);
		buttons.settings.setDisabled(!active);
		buttons.sortSections.setDisabled(!active);
	}
	mw.loader.using( [
			'mediawiki.api',
			'jquery',
			'oojs-ui',
			'oojs-ui-core',
			'oojs-ui-widgets',
			// Icons
			'oojs-ui.styles.icons-content', // download, folderPlaceholder
			'oojs-ui.styles.icons-editing-advanced', // tableAddRowAfter
			'oojs-ui.styles.icons-editing-core', // undo, redo
			'oojs-ui.styles.icons-editing-list', // listBullet
			// 'oojs-ui.styles.icons-editing-styling',
			'oojs-ui.styles.icons-interactions', // checkall, close, settings, subtract
			'oojs-ui.styles.icons-media', // imageAdd, imageGallery
			'oojs-ui.styles.icons-moderation', // flag, star, trash, unStar
			'oojs-ui.styles.icons-movement', // move, next, previous
	] ).then( function( require ) {
		OO = require('oojs');
		api = new mw.Api();
		function createButton(icon, lbl, tooltip) {
			return new OO.ui.ButtonWidget( {
				framed: false,
				icon: icon,
				label: lbl || '',
				invisibleLabel: !tbExpanded,
				title: tooltip
			} );
		}

		function createToolbar() {
			// Toolbar buttons
			buttons = {
				about: createButton(
					'info',
					msg("about-label").plain(),
					msg("about-hover").plain()
				),
				open: createButton(
					'folderPlaceholder',
					msg("open-label").plain(),
					msg("open-hover").plain()
				),
				undo: createButton(
					'undo',
					msg("undo-label").plain(),
					msg("undo-hover").plain()
				),
				redo: createButton(
					'redo',
					msg("redo-label").plain(),
					msg("redo-hover").plain()
				),
				newSection: createButton(
					'tableAddRowAfter',
					msg("new-section-label").plain(),
					msg("new-section-hover").plain()
				),
				settings: createButton(
					'settings',
					msg("settings-label").plain(),
					msg("settings-hover").plain()
				),
				sortSections: createButton(
					'listBullet',
					msg("sort-section-label").plain(),
					msg("sort-section-hover").plain()
				),
				changes: createButton(
					'checkAll',
					msg("show-changes-label").plain(),
					msg("show-changes-hover").plain()
					),
				save: createButton(
					'download',
					msg("save-label").plain(),
					msg("save-hover").plain()
				),
				deprecated: new OO.ui.ToggleButtonWidget({
					framed: false,
					icon: "flag",
					label: msg("mark-deprecated-label").plain(),
					invisibleLabel: !tbExpanded,
					title: msg("mark-deprecated-hover").plain()
				}),
				cancelMove: createButton(
					'previous',
					msg("cancel-move-label").plain(),
					msg("cancel-move-hover").plain()
				),
				descriptionToggle: createButton(
					tbExpanded && "previous" || "next",
					"",
					msg("description-toggle-hover").plain()
				)
			};
			toggleTBButtons(false);
			buttons.undo.setDisabled(true);
			buttons.redo.setDisabled(true);

			// Toolbar sections
			toolbarSections = {
				fileItems: new OO.ui.ButtonGroupWidget({items: [
					buttons.open
				]}),
				editItems: new OO.ui.ButtonGroupWidget({items: [
					buttons.undo,
					buttons.redo
				]}),
				mainItems: new OO.ui.ButtonGroupWidget({items: [
					buttons.newSection,
					buttons.sortSections,
					buttons.deprecated
				]}),
				toolItems: new OO.ui.ButtonGroupWidget({items: [
					buttons.settings,
					buttons.changes,
					buttons.save
				]}),
				moveItems: new OO.ui.ButtonGroupWidget({items: [
					buttons.cancelMove
				]}),
				arrowItem: new OO.ui.ButtonGroupWidget({items: [
					buttons.about,
					buttons.descriptionToggle
				]})
			};
			var winMgr = new OO.ui.WindowManager();
			root.parentElement.append(winMgr.$element.get(0));
			var dia = new OO.ui.MessageDialog();
			winMgr.addWindows({aboutWin: dia});
			buttons.about.on("click", function() {
				winMgr.openWindow("aboutWin", {
					title: msg("about-title").plain(),
					message: '',
					actions: [
						{
							action: 'reject',
							label: msg("dialog-button-close").plain(),
							flags: [ 'safe', 'close' ]
						}
					]
				});
				dia.$body.get(0).querySelector(".oo-ui-messageDialog-message").innerHTML = '© Magiczocker 2022<br /><br />Tester:&nbsp;Kingcat<br />Helper:&nbsp;MarkusRost<br /><br />Inspired by:&nbsp;<a href="https://help.fandom.com/wiki/User:Majr/Sprite_editor">Sprite Editor</a>';
			});
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
			// Setup click-functions
			buttons.cancelMove.on('click', function() {
				removeOverlays();
				updateToolbar();
			});
			buttons.descriptionToggle.on('click', function() {
				tbExpanded = !tbExpanded;
				buttons.descriptionToggle.setIcon(tbExpanded && "previous" || "next");
				var buttonNames = Object.keys(buttons);
				for (var i = 0; i < buttonNames.length; i++) {
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
				var tmp = {
					name: '',
					id: highestID
				};
				var ns = newSection(tmp);
				ns.scrollIntoView({behavior: "smooth"});
				var textField = ns.children[0].children[0];
				textField.setAttribute( 'data-placeholder', msg("section-placeholder").plain() );
				textField.focus();
			});
			buttons.changes.on('click', function() {
				if (openWindow("diff", msg("diff-module-missing").plain())) {
					window.SpriteEditorModules.diff.requestChanges();
				}
			});
			buttons.settings.on('click', function() {
				if (openWindow("settings", msg("settings-module-missing").plain())) {
					window.SpriteEditorModules.settings.requestChanges();
				}
			});
			buttons.sortSections.on('click', function(){
				if (openWindow("sorting", msg("sorting-module-missing").plain())) {
					window.SpriteEditorModules.sorting.setSections(root.querySelectorAll('div.spritedoc-section'));
				}
			});
			buttons.save.on('click', function() {
				OO.ui.prompt( msg("edit-summary-title").plain(), { textInput: { placeholder: msg("edit-summary-placeholder").plain() } } ).done( function ( result ) {
					if ( result !== null ) {
						saveToFile(result);
					}
				});
			});
			oclick = function(ignoreWarning) {
				if (!ignoreWarning && lastSaved !== history[historyPos - 1] && !window.confirm(msg("unsaved-changes").plain())) return;
				if (openWindow("open", msg("open-module-missing").plain())) {
					window.SpriteEditorModules.open.requestChanges();
				}
			};
			buttons.open.on('click', oclick);
		}

		// init
		root.innerHTML = '';
		window.SpriteEditorModules.new.setSharedData({
			options: options
		});
		function openWindow(win, err) {
			if (!window.SpriteEditorModules[win]) {
				alert(err);
				return false;
			} else if (!window.SpriteEditorModules[win].modal.windowManager) {
				window.SpriteEditorModules[win].createWindow();
				return true;
			} else if (win === "new" && window.SpriteEditorModules[win].modal.windowManager) {
				window.SpriteEditorModules["new"].openWindow();
				return true;
			} else if (window.SpriteEditorModules[win].modal.windowManager) {
				window.SpriteEditorModules[win].modal.windowManager.openWindow(window.SpriteEditorModules[win].modal.seDialog);
				return true;
			}
		}
		function resetEditor() {
			var orgTB = root.children[0];
			root.innerHTML = "";
			root.appendChild(orgTB);
			sections = [];
			highestID = 0;
			toShare.highestPos = 0;
			sprites = [];
			canvasCollection = [];
			history = [];
			historyPos = 0;
			updateTitle(false);
			buttons.undo.setDisabled(true);
			buttons.redo.setDisabled(true);
			buttons.deprecated.setValue(false);
			has_edit_permission = true;
			has_tag_permission = false;
			has_new_tag_permission = false;
			tag_exists = false;
			tag_active = false;

			// Disable toolbar buttons; reactive if data is loaded
			toggleTBButtons(false);
		}
		function checkProtection(allperms, name) {
			var lvl = name && name.level || "";
			if (lvl === "autoconfirmed") {
				return allperms.includes("editsemiprotected");
			} else if (lvl === "sysop") {
				return allperms.includes("editprotected");
			} else {
				return true;
			}
		}
		function loadSprite3() {
			setupOldCanvas(imgEle);
			var imgSize = Number(output.settings.size || options.defaultSpriteSize);
			imgWidth = Number(output.settings.width) || imgSize;
			imgHeight = Number(output.settings.height) || imgSize;
			options.spacing = output.settings.spacing || 0;
			imgSpacingOrg = options.spacing;
			helper.setSharedData({
				imgWidth: imgWidth,
				imgHeight: imgHeight,
				toShare: toShare,
				markDuplicateNames: markDuplicateNames,
				canvasCollection: canvasCollection,
				addHistory: addHistory
			});
			window.SpriteEditorModules.diff.setSharedData({
				options: options,
				processData: processData,
				generateJSON: generateJSON,
				generateImage: generateImage,
				loaded: loadedSpriteName
			});
			window.SpriteEditorModules.sorting.setSharedData({
				addHistory: addHistory
			});
			window.SpriteEditorModules.settings.setSharedData({
				imgWidth: imgWidth,
				imgHeight: imgHeight,
				imgSpacingOrg: imgSpacingOrg,
				options: options,
				spriteData: output,
				loaded: loadedSpriteName,
				image: imgEle
			});
			options.spritesPerRow = options.isNew && 10 || Math.floor(((output.settings.sheetsize || imgEle.naturalWidth) + options.spacing) / (imgWidth + options.spacing));
			options.spritesPerRowOrg = options.isNew && 1 || options.spritesPerRow;
			for (var name in output.ids) {
				const secID = output.ids[name].section;
				const posID = output.ids[name].pos;
				toShare.highestPos = Math.max(toShare.highestPos, posID);
				sprites[secID] = sprites[secID] || [];
				sprites[secID][posID] = sprites[secID][posID] || [];
				sprites[secID][posID].push( [name, output.ids[name].deprecated] );
			}
			for (var i = 0; i < output.sections.length; i++) {
				newSection(output.sections[i]);
			}
			if (options.isNew && options.createSampleSection) {
				newSection({
					id: 1,
					name: msg("first-section").plain()
				});
			}
			var d = document.querySelector('li[data-pos="' + output.settings.pos + '"]');
			if (d) {
				d.dataset.default = ".";
			}
			toggleTBButtons(has_edit_permission);
		}
		function loadSprite2(c) {
			var requestData = {
				action: "query",
				format: "json",
				formatversion: "2",
				inprop: "protection",
				list: "tags",
				meta: "userinfo",
				prop: "info",
				tgprop: "active",
				uiprop: "rights|blockinfo"
			};
			if (!options.isNew)
				requestData.titles = "Module:" + loadedSpriteName.full + "|File:" + (output.settings.image || loadedSpriteName.name + ".png");
			api.get(Object.assign(requestData, c || {})).done(function(data) {
				var i;
				if (data.query.userinfo && data.query.userinfo.blockid)
					has_edit_permission = false;
				if (has_edit_permission && data.query.pages && data.query.pages.length) {
					for (var j = 0; j < 2; j++) {
						for (i = 0; i < data.query.pages[j].protection.length; i++) {
							if (!has_edit_permission || !checkProtection(data.query.userinfo.rights || [], data.query.pages[j].protection[i])) {
								has_edit_permission = false;
								break;
							}
						}
					}
				}
				if (!tag_exists && data.query.tags && data.query.tags.length) {
					for (i = 0; i < data.query.tags.length; i++) {
						if (data.query.tags[i].name === "spriteeditor") {
							tag_exists = true;
							tag_active = data.query.tags[i].active;
						}
					}
				}
				if (data.query.userinfo && data.query.userinfo.rights) {
					if (data.query.userinfo.rights.indexOf( 'managechangetags' ) > 0) {
						has_new_tag_permission = true;
					}
					if (data.query.userinfo.rights.indexOf( 'applychangetags' ) > 0) {
						has_tag_permission = true;
					}
				}
				if (data.continue) {
					loadSprite2(data.continue);
					return;
				}
				loadSprite3();
			});
		}
		function loadNew(sizeW, sizeH, spacing) {
			output = Object.assign(blankJSON);
			output.settings = {};
			output.sections = [];
			output.ids = {};
			delete output.settings.pos;
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
			helper = window.SpriteEditorModules.helper;
			if (name == undefined) return;
			// Reset
			options.isNew = isNew;
			loadedSpriteName = name;
			resetEditor();

			// Load Sprite
			imgEle = document.createElement("img");
			imgEle.style.width = "0";
			imgEle.style.height = "0";
			imgEle.crossOrigin = '*';
			if (!isNew) {
				api.get({
					'action': 'scribunto-console',
					'title': 'Module:SpriteEditorDummy', // Dummy name (Doesn't need to exist)
					'question': '=p',
					'clear': true,
					'content': 'local a = require("Module:' + loadedSpriteName.full + '")\n' +
					'return type(a) == "table" and a.settings and mw.text.jsonEncode(a) or "{}"'
				}).always(function(a) {
					if (!a.return) {
						loadNew(options.defaultSpriteSize, options.defaultSpriteSize);
					} else {
						output = JSON.parse(a.return);
						output.settings = output.settings || {};
						output.ids = output.ids || {};
						output.sections = output.sections || [];
						imgEle.src = helper.filepath(output.settings.image || name.name + ".png");
						document.body.append(imgEle);
						imgEle.addEventListener("error", function() {
							loadNew(options.defaultSpriteSize, options.defaultSpriteSize);
						});
						imgEle.addEventListener("load", function() {
							loadSprite2();
						});
					}
				});
			} else {
				loadNew(spriteSizeW, spriteSizeH, spacing);
			}
		}
		myData.preload = function(args) {
			if (--preloads > 0) return;
			if (args) {
				var logoURL = args[2].value.query.general.logo;
				window.SpriteEditorModules.helper.imageURL = logoURL.substring(0,logoURL.search("/images/")) + "/images/";
			}
			window.dev.i18n.loadMessages('SpriteEditor').done(function (i18no) {
				myData.msg = i18no.msg;
				msg = myData.msg;
				document.getElementById('firstHeading').textContent = msg("title").plain();
				updateTitle(false);
				createToolbar();
				var openDialog = window.SpriteEditorModules.open;
				openDialog.setSharedData({
					loadSprite: loadSprite,
					openWindow: openWindow,
					options: options
				});
				var toOpen = new URL(document.location.href).searchParams.get("sprite");
				var names = toOpen && window.SpriteEditorModules.helper.seperatePath(toOpen);
				if (toOpen && (!names.module.endsWith("Sprite") || myData.blacklist.includes(names.module.toLowerCase()))) {
					var historyUrl = new URL(window.location);
					historyUrl.searchParams.delete("sprite");
					window.history.pushState({}, '', historyUrl);
					toOpen = undefined;
				}
				if (toOpen) {
					loadSprite(names, false);
				} else {
					oclick(true);
				}
			});
		},
		myData.run = function() {
			mw.hook('dev.i18n').add(myData.preload);
			var getImageURL = api.get({
				action: "query",
				format: "json",
				meta: "siteinfo",
				formatversion: "2",
				siprop: "general"
			});
			var md5JS = mw.loader.load('https://commons.wikimedia.org/w/index.php?title=MediaWiki:MD5.js&action=raw&ctype=text/javascript');
			var i18nJS = mw.loader.load('https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js&*');
			Promise.allSettled([md5JS, i18nJS, getImageURL]).then(myData.preload);
		};
		$( document ).on( 'click.spriteEdit', function( e ) {
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			if (!skipClose && menu) {
				document.body.removeChild(menu);
			}
			skipClose = false;
		} );
		$( document ).on( 'keydown.spriteEdit', function( e ) {
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			if (menu && e.keyCode === 27) {
				document.body.removeChild(menu);
			}
		} );
	});
})(window.jQuery, window.mediaWiki);