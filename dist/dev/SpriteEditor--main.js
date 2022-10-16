;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.main && window.SpriteEditorModules.main.loaded) return;
	window.SpriteEditorModules.main = {loaded: true};
	var myData = window.SpriteEditorModules.main;
	const config = mw.config.get([
		'wgArticlePath',
		'wgSiteName'
	]);
	var oclick;
	var root = document.getElementById('mw-content-text');
	var sections = [];
	var highestID = 0;
	var loadedSpriteName = "";
	var sprites = [];
	var buttons;
	var imgEle;
	var canvasCollection = [];
	var has_edit_permission = true;
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
	var namesList = {};
	var options = {
		cleanupSectionIDs: false,
		createSampleSection: true, // Create a sample section on new sprite-creation (Open > New).
		defaultSpriteSize: 16,
		removeUnusedSprites: false,
		removeDeprecatedNames: false,
		spritesPerRow: 10,
		isNew: false
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
		if (lastSaved !== history[historyPos - 1] && !window.confirm('Changes you made may not be saved.')) {
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
		var codes =  root.querySelectorAll('li[data-pos="' + id + '"] .spritedoc-name code');
		if (codes.length)
			root.querySelector('li[data-pos="' + id + '"]').setAttribute('data-sort-key', codes[0].textContent);
	}
	function rotateSprite(sprite) {
		var c = helper.newCanvas();
		var ctx = c.getContext('2d');
		var imgSize = Number(output.settings.size || options.defaultSpriteSize);
		for (var i = 0; i < imgSize; i++) {
			for (var j = 0; j < imgSize; j++) {
				ctx.drawImage(sprite,
					j, imgSize - i - 1, 1, 1, // Source coords.
					i, j, 1, 1 // Canvas coords.
				);
			}
		}
		return c;
	}
	function mirrorSprite(sprite) {
		var c = helper.newCanvas();
		var ctx = c.getContext('2d');
		var imgSize = Number(output.settings.size || options.defaultSpriteSize);
		for (var i = 0; i < imgSize; i++) {
			for (var j = 0; j < imgSize; j++) {
				ctx.drawImage(sprite,
					j, imgSize - i - 1, 1, 1, // Source coords.
					j, i, 1, 1 // Canvas coords.
				);
			}
		}
		return c;
	}
	function markDuplicateNames(list) {
		var names = Object.keys(list);
		for (var i = 0; i < names.length; i++) {
			if (!namesList[names[i]]) continue;
			var length = namesList[names[i]].length;
			for (var j = 0; j < length; j++) {
				var obj = namesList[names[i]][j];
				if (length > 1) {
					obj.classList.add("spriteedit-dupe");
					continue;
				}
				obj.classList.remove("spriteedit-dupe");
			}
		}
		if (root.querySelectorAll(".spriteedit-dupe").length) {
			buttons.changes.setDisabled(true);
			buttons.save.setDisabled(true);
			return;
		}
		buttons.changes.setDisabled(false);
		buttons.save.setDisabled(false);
	}
	function generateJSON(keepOldUrl) {
		var a = Object.assign(blankJSON);
		a.settings = Object.assign({}, output.settings);
		a.sections = [];
		a.ids = {};
		delete a.settings.pos;
		if (!keepOldUrl || !a.settings.url)
			a.settings.url = "require( [[Module:Sprite]] ).getUrl( '" + loadedSpriteName + ".png', 'version=" + Date.now() + "', '" + loadedSpriteName.toLowerCase() + "-sprite' ),";
		var imgSize = Number(output.settings.size || options.defaultSpriteSize);
		a.settings.sheetsize = options.spritesPerRow * imgSize;
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
	function generateImage() {
		var c = helper.newCanvas();
		var ctx = c.getContext('2d');
		var imgSize = Number(output.settings.size || options.defaultSpriteSize);
		var keepOldSprites = !options.removeUnusedSprites && !options.isNew;
		var spritesPerRow = options.spritesPerRow;
		c.width = imgSize * spritesPerRow;
		c.height = 0;
		if (keepOldSprites)
			c.height = Math.ceil(Math.ceil(imgEle.naturalHeight / imgSize) * options.spritesPerRowOrg / spritesPerRow) * imgSize;
		c.height = Math.max(c.height, Math.ceil(toShare.highestPos / spritesPerRow) * imgSize);
		var i;
		var sID;
		var drawn = [];
		var allSprites = root.querySelectorAll('li[class="spritedoc-box"]');
		for (i = 0; i < allSprites.length; i++) {
			if (options.removeUnusedSprites && options.removeDeprecatedNames && allSprites[i].querySelectorAll('code[class="spritedoc-deprecated"]').length === allSprites[i].querySelectorAll("code").length) {
				continue;
			}
			sID = allSprites[i].dataset.pos;
			if (sID === "null") continue;
			var cordY = Math.ceil(sID / spritesPerRow);
			var cordX = sID - (cordY - 1) * spritesPerRow;
			cordY = (cordY - 1) * imgSize;
			cordX = (cordX - 1) * imgSize;
			drawn[sID] = true;
			ctx.drawImage(allSprites[i].querySelector("canvas"),
				0, 0, imgSize, imgSize, // Source coords.
				cordX, cordY, imgSize, imgSize // Canvas coords.
			);
		}
		if (keepOldSprites) { // Copy old sprites to new canvas
			var rowsOrg = Math.ceil(imgEle.naturalHeight / imgSize);
			for (i = 0; i < rowsOrg; i++) { // Rows
				for (var j = 0; j < options.spritesPerRowOrg; j++) { // Columns
					sID = i * options.spritesPerRowOrg + j + 1;
					if (drawn[sID] || sID > toShare.heighestPos) continue;
					var cordYOld = Math.ceil(sID / options.spritesPerRowOrg);
					var cordXOld = sID - (cordYOld - 1) * options.spritesPerRowOrg;
					var cordYNew = Math.ceil(sID / spritesPerRow);
					var cordXNew = sID - (cordYNew - 1) * spritesPerRow;
					cordYOld = (cordYOld - 1) * imgSize;
					cordXOld = (cordXOld - 1) * imgSize;
					cordYNew = (cordYNew - 1) * imgSize;
					cordXNew = (cordXNew - 1) * imgSize;
					ctx.drawImage(imgEle,
						cordXOld, cordYOld, imgSize, imgSize, // Source coords.
						cordXNew, cordYNew, imgSize, imgSize // Canvas coords.
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
		if (!options.isNew) {
			var ctxOld = oldImageAsCanvas.getContext('2d');
			ctxOld.drawImage(imgData, 0, 0);
		}
	}
	function saveJSON(summary, data, generatedJSON) {
		api.postWithEditToken({
			action: "edit",
			contentformat: "text/plain",
			contentmodel: "Scribunto",
			notminor: true,
			recreate: true,
			summary: summary,
			text: "return " + data,
			title: 'Module:' + loadedSpriteName,
			formatversion: 2
		}).always(function(d) {
			toggleTBButtons(has_edit_permission);
			buttons.open.setDisabled(false);
			buttons.undo.setDisabled(historyPos === 0);
			buttons.redo.setDisabled(historyPos === history.length);
			if (d.edit.result !== "Success") {
				alert("Error while saving JSON.");
				return;
			}
			alert("Changes saved");
			if (options.isNew) {
				options.isNew = false;
				output = generatedJSON;
			}
			lastSaved = history[historyPos - 1];
			updateTitle(false);
		});
	}
	function saveToFile(s) {
		toggleTBButtons(false);
		buttons.open.setDisabled(true);
		buttons.undo.setDisabled(true);
		buttons.redo.setDisabled(true);
		var gIVars = generateImage();
		var generatedJSON = generateJSON(!gIVars[2]);
		var data = processData(generatedJSON);
		if (gIVars[2]) { // Has changes
			gIVars[0].toBlob(function(blob) {
				api.upload(blob, {
					filename: loadedSpriteName + '.png',
					comment: s,
					formatversion: 2,
					ignorewarnings: true
				}).always(function(d) {
					if (!d) {
						toggleTBButtons(has_edit_permission);
						alert("Error while saving image.");
						return;
					}
					setupOldCanvas(gIVars[0]);
					saveJSON(s, data, generatedJSON);
				});
			});
		} else {
			saveJSON(s, data, generatedJSON);
		}
	}
	function updateTitle(changesMade) {
		document.title = (loadedSpriteName.length && (loadedSpriteName + (changesMade && "*" || "") + " – ") || "") + 'Sprite Editor – ' + config.wgSiteName;
		document.getElementById('firstHeading').textContent = 'Sprite Editor' + (loadedSpriteName.length && (" – " + loadedSpriteName + (options.isNew && " (New)" || "") + (changesMade && "*" || "")) || "");
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
		var t;
		var secID;
		var list;
		var n = {};
		var box_code;
		if (c[d] === "move-sections") {
			var order = c[2 + offset];
			var tmp = root.children[0];
			var a = document.createElement("span");
			root.prepend(a);
			root.insertBefore(tmp, a);
			for (i = 0; i < order.length; i++) {
				root.insertBefore(document.querySelector('div[data-section-id="' + order[i] + '"]'), a);
			}
			root.removeChild(a);
		} else if (c[d] === "sprite-default") {
			var oldDefault = c[3 - offset];
			var newDefault = c[2 + offset];
			if (oldDefault) delete oldDefault.dataset.default;
			if (newDefault) newDefault.dataset.default = ".";
		} else if (c[d] === "sprite-added") {
			toShare.highestPos = c[5 + offset];
			helper.removeSprite(c[3], true);
		} else if (c[d] === "sprite-removed") {
			toShare.highestPos = c[5 + offset];
			root.querySelector('div[data-section-id="' + c[2] + '"] .spritedoc-boxes').appendChild(c[4]);
			list = c[4].querySelectorAll(".spritedoc-name code[isSprite]");
			for (i = 0; i < list.length; i++) {
				t = list[i].textContent;
				n[t] = true;
				namesList[t] = namesList[t] || [];
				namesList[t].push(list[i]);
			}
			sortSection(c[2]);
			markDuplicateNames(n);
		} else if (c[d] === "sprite-move") {
			var newSection = c[3 - offset];
			root.querySelector('div[data-section-id="' + newSection + '"] .spritedoc-boxes').appendChild(c[4]);
			sortSection(newSection);
		} else if (c[d] === "sprite-replace") {
			var oldSprite = c[4 - offset];
			var newSprite = c[3 + offset];
			canvasCollection[c[2]].parentElement.replaceChild(newSprite, oldSprite);
			canvasCollection[c[2]] = newSprite;
		} else if (c[d] === "sprite-rename") {
			var oldName = c[3 + offset];
			var newName = c[4 - offset];
			box_code = c[5];
			namesList[newName].splice(namesList[newName].indexOf(box_code), 1);
			namesList[oldName].push(box_code);
			box_code.textContent = oldName;
			n[oldName] = true;
			n[newName] = true;
			markDuplicateNames(n);
			sortSpriteNames(c[2]);
			sortSection(box_code.closest('.spritedoc-section').dataset.sectionId);
		} else if (c[d] === "sprite-name-removed") { // c[3] = spritedoc-names
			c[3].appendChild(c[4]);
			c[4].children[0].textContent = c[5];
			box_code = c[4].querySelector("code");
			namesList[c[5]].push(box_code);
			n[c[5]] = true;
			markDuplicateNames(n);
			sortSpriteNames(c[2]);
			sortSection(c[3].closest('.spritedoc-section').dataset.sectionId);
		} else if (c[d] === "sprite-name-added") {
			box_code = c[4].querySelector("code");
			namesList[c[5]].splice(namesList[c[5]].indexOf(box_code), 1);
			n[c[5]] = true;
			secID = c[4].closest('.spritedoc-section').dataset.sectionId;
			c[4].parentElement.removeChild(c[4]);
			markDuplicateNames(n);
			sortSpriteNames(c[2]);
			sortSection(secID);
		} else if (c[d] === "section-rename") {
			root.querySelector('div[data-section-id="' + c[2] + '"] span').textContent = c[3 + offset];
		} else if (c[d] === "section-added") {
			names = c[3].querySelectorAll("code[isSprite]");
			for (i = 0; i < names.length; i++) {
				t = namesList[names[i].textContent] || [];
				if (t.length) {
					t.splice(t.indexOf(names[i]), 1);
					n[names[i].textContent] = true;
				}
			}
			markDuplicateNames(n);
			root.removeChild(c[3]);
		} else if (c[d] === "section-removed") {
			if (root.children.length < c[5]) {
				root.appendChild(c[3]);
			} else {
				root.insertBefore(c[3], Array.from(root.children)[c[5]]);
			}
			names = c[3].querySelectorAll("code[isSprite]");
			for (i = 0; i < names.length; i++) {
				namesList[names[i].textContent] = namesList[names[i].textContent] || [];
				t = namesList[names[i].textContent];
				t.push(names[i]);
				n[names[i].textContent] = true;
			}
			markDuplicateNames(n);
			c[3].querySelector("span").textContent = c[4];
		} else if (c[d] === "sprite-deprecated") {
			c[2].classList.remove("spritedoc-deprecated");
		} else if (c[d] === "sprite-not-deprecated") {
			c[2].classList.add("spritedoc-deprecated");
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
			if ( e.keyCode === 13 ) {
				e.preventDefault();
				e.target.blur();
			}
		};
		box_code.addEventListener('focus', function() {
			if (buttons.deprecated.getValue()) {
				if (box_code.classList.contains("spritedoc-deprecated")) {
					addHistory(["sprite-not-deprecated", "sprite-deprecated", box_code]);
				} else {
					addHistory(["sprite-deprecated", "sprite-not-deprecated", box_code]);
				}
				box_code.classList.toggle("spritedoc-deprecated");
				box_code.blur();
			} else {
				box_code.setAttribute("data-original-text", box_code.textContent);
			}
		});
		box_code.addEventListener('blur', function() {
			if (buttons.deprecated.getValue()) return;
			var posId = box_code.closest('.spritedoc-box').dataset.pos;
			var orgT;
			var list = {};
			box_code.textContent = box_code.textContent.trim();
			var secId = box_code.closest('.spritedoc-section').dataset.sectionId;
			if (box_code.textContent.length) {
				orgT = box_code.getAttribute("data-original-text") || "";
				if (orgT !== box_code.textContent) {
					if (orgT.length) {
						namesList[orgT] = namesList[orgT] || [];
						namesList[orgT].splice(namesList[orgT].indexOf(box_code), 1);
						list[orgT] = true;
					}
					namesList[box_code.textContent] = namesList[box_code.textContent] || [];
					namesList[box_code.textContent].push(box_code);
					list[box_code.textContent] = true;
					markDuplicateNames(list);
					if (orgT.length) {
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
					box_code.classList.remove("spriteedit-new");
					box_code.removeAttribute("data-placeholder");
					sortSpriteNames(posId);
					sortSection(secId);
				}
				box_code.removeAttribute("data-original-text");
			} else {
				var isRemoved = false;
				var cl = box_code.closest('.spritedoc-names');
				orgT = box_code.getAttribute("data-original-text") || "";
				if (orgT.length > 0 && cl.children.length > 1)
					namesList[orgT].splice(namesList[orgT].indexOf(box_code), 1);
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
			box_code.setAttribute( 'data-placeholder', "Type a name" );
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
				namesList[fname] = namesList[fname] || [];
				namesList[fname].push(cl.querySelector("code"));
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
		if (menu) {
			document.body.removeChild(menu);
		}
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
			changeSprite: createContextButton("imageGallery", "Replace", "Replace Sprite"),
			deleteSprite: createContextButton("trash", "Delete", "Remove Sprite"),
			defaultSprite: createContextButton(selectedEle.dataset.default && "unStar" || "star", (selectedEle.dataset.default && "Unmark" || "Mark") + " as default", "Toggle default state"),
			downloadSprite: createContextButton("download", "Download", "Download Sprite"),
			moveSprite: createContextButton("move", "Move", "Move Sprite"),
			rotateSpriteLeft: createContextButton("undo", "Rotate Left", "Rotate sprite left"),
			rotateSpriteRight: createContextButton("redo", "Rotate Right", "Rotate sprite right"),
			mirrorSpriteHorizontal: createContextButton("subtract", "Flip horizontal", "Flip sprite horizontal"),
			mirrorSpriteVertical: createContextButton("subtract", "Flip vertical", "Flip sprite vertical"),
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
			$(ele2).append(buttons.rotateSpriteLeft.$element);
			$(ele2).append(buttons.rotateSpriteRight.$element);
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
			var newImg = rotateSprite(altCanvas || orgCanvas);
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
			var spr = rotate(1, true);
			// Mirror
			spr = mirrorSprite(spr);
			// Rotate back
			rotate(1, false, spr);
		});
		buttons.mirrorSpriteVertical.on("click", function() {
			// Close menu
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			document.body.removeChild(menu);
			// Mirror
			var spr = mirrorSprite(canvasCollection[selectedPos]);
			// Rotate back (To apply the new image)
			rotate(1, false, spr);
		});

		function moveSpriteClick(event) {
			var sec = event.target.dataset.section;
			var oldSec = selectedEle.closest(".spritedoc-section").dataset.sectionId;
			if (sec === oldSec) {
				removeOverlays();
				updateToolbar();
				return;
			}
			addHistory([
				"sprite-move",
				"sprite-move",
				sec, // New
				oldSec, // Old
				selectedEle
			]);
			root.querySelector('div[data-section-id="' + sec + '"] .spritedoc-boxes').appendChild(selectedEle);
			removeOverlays();
			sortSection(sec);
			updateToolbar();
		}
		buttons.defaultSprite.on("click", function() {
			var menu = document.getElementsByClassName("spriteedit-tooltip")[0];
			document.body.removeChild(menu);
			var oldDefault = document.querySelector('li[data-default]');
			if (oldDefault) {
				delete oldDefault.dataset.default;
			}
			if (oldDefault !== selectedEle) {
				selectedEle.dataset.default = ".";
			}
			addHistory([
				"sprite-default",
				"sprite-default",
				oldDefault,
				document.querySelector('li[data-default]')
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
			box_code.focus();
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
				label: 'New Images',
				title: 'New Images',
				classes: [ "spriteeditor-newImagesBtn" ]
			} ).$element.get(0);
		} else if (canvasCollection[pos]) {
			image.appendChild(canvasCollection[pos]);
		} else {
			var imgSize = Number(output.settings.size || options.defaultSpriteSize);
			var posy = Math.ceil(pos / options.spritesPerRowOrg);
			var posx = pos - (posy - 1) * options.spritesPerRowOrg;
			posx = posx * imgSize - imgSize;
			posy = posy * imgSize - imgSize;
			var canvas = helper.newCanvas();
			canvas.getContext('2d').drawImage(imgEle,
				posx, posy, imgSize, imgSize, // Source coords.
				0, 0, imgSize, imgSize // Canvas coords.
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
			if (name === 0 && pos) {
				spriteBox.setAttribute('data-sort-key', data[name][0]);
			}
			// sprite names
			var box_code = getCodeField(data[name][0]);
			if (data[name][1]) {
				box_code.classList.add("spritedoc-deprecated");
			}
			if (pos) {
				box_code.setAttribute("isSprite", "");
			}
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
				title: 'Add name',
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
		if (sections[id].children.length > 1) {
			sections[id].removeChild(sections[id].children[1]);
		}
		sections[id].append(spriteBoxes);
		if (sprites[id]) {
			for (var pos = 0; pos < sprites[id].length; pos++) {
				if (!sprites[id][pos]) continue;
				// sprite box
				var sb = getSpriteBox(pos, sprites[id][pos]);
				spriteBoxes.append(sb);
				var names = sb.querySelectorAll("code[isSprite]");
				for (var namesPos = 0; namesPos < names.length; namesPos++) {
					namesList[names[namesPos].textContent] = namesList[names[namesPos].textContent] || [];
					namesList[names[namesPos].textContent].push(names[namesPos]);
				}
				sortSpriteNames(pos);
			}
		}
		// Add images to section-button
		if (has_edit_permission) {
			var permOrg = has_edit_permission;
			has_edit_permission = false;
			spriteBoxes.append( getSpriteBox(null, [["Add Images"]]) );
			has_edit_permission = permOrg;
		}
	}
	var lastDragoverSection;
	document.getElementsByClassName("main-container")[0].ondragover = function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
		var sec = e.srcElement.closest(".spritedoc-section");
		if ((sec === null && !lastDragoverSection) || (lastDragoverSection && lastDragoverSection === sec)) return;
		if (lastDragoverSection && (!sec || lastDragoverSection !== sec)) {
			var oldEle = document.getElementsByClassName("section-drag-overlay");
			if (oldEle.length)
				oldEle[0].parentElement.removeChild(oldEle[0]);
			lastDragoverSection = undefined;
		}
		if (sec) {
			lastDragoverSection = sec;
			var box = sec.querySelector(".spritedoc-boxes");
			var ele = document.createElement("div");
			ele.textContent = "Drop to add.";
			ele.classList.add("section-drag-overlay");
			ele.dataset.section = sec.dataset.sectionId;
			box.append(ele);
			ele.ondrop = function(e) {
				e.preventDefault();
				var ele = e.dataTransfer.getData("Text");
				var sec = e.target.closest(".spritedoc-section").dataset.sectionId;
				var selEle = document.querySelector('li[data-pos="' + ele + '"]');
				var oldSec = selEle.closest(".spritedoc-section").dataset.sectionId;
				if (sec === oldSec) return;
				e.target.closest(".spritedoc-section").querySelector(".spritedoc-boxes").appendChild(
					selEle
				);
				addHistory([
					"sprite-move",
					"sprite-move",
					sec, // New
					oldSec, // Old
					selEle
				]);
				sortSection(sec);
			};
		}
	};
	function newSection(s) {
		var spriteSection = helper.newSection(s);
		root.append(spriteSection);
		spriteSection.ondrop = function(e) {
			e.stopPropagation();
			e.preventDefault();
			var oldEle = document.getElementsByClassName("section-drag-overlay");
			if (oldEle.length)
				oldEle[0].parentElement.removeChild(oldEle[0]);
			lastDragoverSection = undefined;
			if (e.dataTransfer !== null) {
				var files = e.dataTransfer.files;
				var sec = e.srcElement.dataset.section || e.srcElement.closest(".spritedoc-section").dataset.section;
				if (!sec) return;
				var boxes = root.querySelector('div[data-section-id="' + sec + '"] .spritedoc-boxes');
				for (var i = 0; i < files.length; i++) {
					if (files[i].type.match(/image.*/)) {
						addFile(files[i], boxes.lastChild);
					}
				}
			}
		};
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
				toolbarSections.moveItems.$element
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
				about: createButton('info', "About", "About the Sprite-Editor"),
				open: createButton('folderPlaceholder', "Open", "Open Sprite"),
				undo: createButton('undo', "Undo", "Undo one edit"),
				redo: createButton('redo', "Redo", "Redo one edit"),
				newSection: createButton('tableAddRowAfter', "New Section", "Insert one section"),
				settings: createButton('settings', "Settings", "Open settings"),
				sortSections: createButton('listBullet', "Sort Sections", "Sort sections"),
				changes: createButton('checkAll', "Show changes", "Show a list of changes"),
				save: createButton('download', "Save", "Save changes"),
				deprecated: new OO.ui.ToggleButtonWidget({
					framed: false,
					icon: "flag",
					label: 'Mark as deprecated',
					invisibleLabel: !tbExpanded,
					title: "Mark a name as deprecated"
				}),
				cancelMove: createButton('previous', "Cancel", "Cancel move"),
				descriptionToggle: createButton(tbExpanded && "previous" || "next", "", "Toggles the visibility of toolbar-button labels")
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
					title: 'About',
					message: '',
					actions: [
						{
							action: 'reject',
							label: 'Close',
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
		}

		// init
		document.getElementById('firstHeading').textContent = 'Sprite Editor';
		updateTitle(false);
		root.innerHTML = '';
		window.SpriteEditorModules.new.setSharedData({
			options: options
		});

		createToolbar();
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
			textField.setAttribute( 'data-placeholder', "Type a section name" );
			textField.focus();
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
		buttons.changes.on('click', function() {
			if (openWindow("diff", "Diff-Module not loaded!")) {
				window.SpriteEditorModules.diff.requestChanges();
			}
		});
		buttons.settings.on('click', function() {
			if (openWindow("settings", "Settings-Module not loaded!")) {
				window.SpriteEditorModules.settings.requestChanges();
			}
		});
		buttons.sortSections.on('click', function(){
			if (openWindow("sorting", "Sorting-Module not loaded!")) {
				window.SpriteEditorModules.sorting.setSections(root.querySelectorAll('div.spritedoc-section'));
			}
		});
		buttons.save.on('click', function() {
			OO.ui.prompt( 'Please give an edit summary', { textInput: { placeholder: 'Reason' } } ).done( function ( result ) {
				if ( result !== null ) {
					saveToFile(result);
				}
			});
		});
		oclick = function(ignoreWarning) {
			if (!ignoreWarning && lastSaved !== history[historyPos - 1] && !window.confirm('Changes you made may not be saved.')) return;
			if (openWindow("open", "Open-Module not loaded!")) {
				window.SpriteEditorModules.open.requestChanges();
			}
		};
		buttons.open.on('click', oclick);
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
			namesList = {};
			updateTitle(false);
			buttons.undo.setDisabled(true);
			buttons.redo.setDisabled(true);
			buttons.deprecated.setValue(false);

			// Disable toolbar buttons; reactive if data is loaded
			toggleTBButtons(false);
		}
		function checkProtection(allperms, name) {
			if (name === "autoconfirmed") {
				return allperms.include("editsemiprotection");
			} else if (name === "sysop") {
				return allperms.include("editprotection");
			} else {
				allperms.include(name);
			}
		}
		function loadSprite2() {
			var requestData = {
				action: "query",
				format: "json",
				prop: "info",
				meta: "userinfo",
				formatversion: "2",
				inprop: "protection",
				uiprop: "rights|blockinfo"
			};

			setupOldCanvas(imgEle);

			if (!options.isNew)
				requestData.titles = "Module:" + loadedSpriteName + "|File:" + loadedSpriteName + ".png";
			api.get(requestData).then(function(data) {
				var i;
				if (data.query.userinfo.blockid)
					has_edit_permission = false;
				if (has_edit_permission && data.query.pages && data.query.pages.length) {
					for (i = 0; i < data.query.pages[0].protection.length; i++) {
						if (!checkProtection(data.query.userinfo.rights,  data.query.pages[0].protection[i])) {
							has_edit_permission = false;
							break;
						}
					}
				}
				if (has_edit_permission && data.query.pages && data.query.pages.length) {
					for (i = 0; i < data.query.pages[1].protection.length; i++) {
						if (!checkProtection(data.query.userinfo.rights,  data.query.pages[1].protection[i])) {
							has_edit_permission = false;
							break;
						}
					}
				}
				helper = window.SpriteEditorModules.helper;
				helper.setSharedData({
					toShare: toShare,
					markDuplicateNames: markDuplicateNames,
					namesList: namesList,
					canvasCollection: canvasCollection,
					addHistory: addHistory
				});
				helper.setData(output);
				window.SpriteEditorModules.diff.setSharedData({
					options: options,
					processData: processData,
					generateJSON: generateJSON,
					generateImage: generateImage,
					title: loadedSpriteName
				});
				window.SpriteEditorModules.sorting.setSharedData({
					addHistory: addHistory
				});
				window.SpriteEditorModules.settings.setSharedData({
					options: options,
					spriteData: output,
					title: loadedSpriteName,
					image: imgEle
				});
				var imgSize = Number(output.settings.size || options.defaultSpriteSize);
				options.spritesPerRow = options.isNew && 10 || Math.floor((output.settings.sheetsize || imgEle.naturalWidth) / imgSize);
				options.spritesPerRowOrg = options.isNew && 1 || options.spritesPerRow;
				for (var name in output.ids) {
					const secID = output.ids[name].section;
					const posID = output.ids[name].pos;
					toShare.highestPos = Math.max(toShare.highestPos, posID);
					sprites[secID] = sprites[secID] || [];
					sprites[secID][posID] = sprites[secID][posID] || [];
					sprites[secID][posID].push( [name, output.ids[name].deprecated] );
				}
				for (i = 0; i < output.sections.length; i++) {
					newSection(output.sections[i]);
				}
				if (options.isNew && options.createSampleSection) {
					newSection({
						id: 1,
						name: "First section"
					});
				}
				var d = document.querySelector('li[data-pos="' + output.settings.pos + '"]');
				if (d) {
					d.dataset.default = ".";
				}
				toggleTBButtons(has_edit_permission);
			});
		}
		function loadNew(size) {
			output = Object.assign(blankJSON);
			output.settings = {};
			output.sections = [];
			output.ids = {};
			delete output.settings.pos;
			output.settings.size = size;
			output.settings.sheetsize = size;
			options.isNew = true;
			updateTitle(false);
			loadSprite2();
		}
		function loadSprite(name, isNew, spriteSize) {
			if (!name.length) return;
			var nameNew = (name.substring(name.length - 6) !== "Sprite") && name + "Sprite" || name;
			if (name !== nameNew) {
				var historyUrl = new URL(window.location);
				historyUrl.searchParams.set('sprite', nameNew);
				window.history.pushState({}, '', historyUrl);
				name = nameNew;
			}
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
					'content': 'return mw.text.jsonEncode(require("Module:' + loadedSpriteName + '"))'
				}).always(function(a) {
					if (!a.return) {
						loadNew(options.defaultSpriteSize);
					} else {
						output = JSON.parse(a.return);
						imgEle.src = output.settings.url || config.wgArticlePath.replace("$1", "Special:Redirect/file/" + name + ".png");
						imgEle.src = imgEle.src + ( imgEle.src.includes('?') ? '&' : '?' ) + "version=" + Date.now();
						document.body.append(imgEle);
						imgEle.addEventListener("error", function() {
							loadNew(options.defaultSpriteSize);
						});
						imgEle.addEventListener("load", function() {
							loadSprite2();
						});
					}
				});
			} else {
				loadNew(spriteSize);
			}
		}
		myData.run = function() {
			var openDialog = window.SpriteEditorModules.open;
			openDialog.setSharedData({
				loadSprite: loadSprite,
				openWindow: openWindow,
				options: options
			});
			var toOpen = new URL(document.location.href).searchParams.get("sprite");
			if (toOpen) {
				loadSprite(toOpen, false);
			} else {
				oclick(true);
			}
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