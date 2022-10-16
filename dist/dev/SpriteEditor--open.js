;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.open && window.SpriteEditorModules.open.loaded) return;
	window.SpriteEditorModules.open = {loaded: true};
	var api = new mw.Api();
	const config = mw.config.get([
		'wgArticlePath'
	]);
	var myData = window.SpriteEditorModules.open;
	var modal = {};
	myData.modal = modal;
	var shared;
	function createList(i, c) { // Compares images with lists; creates html
		var list = {};
		var a = 0;
		var name = "";
		var root = document.getElementsByClassName("spriteeditor-items")[0];
		root.innerHTML = "";
		for (a = 0; a < i.length; a++) {
			if (i[a].title.substring(i[a].title.length - 10) === "Sprite.png") {
				name = i[a].title.substring(0, i[a].title.length - 4);
				name = name.substring(name.indexOf(":") + 1);
				list[name] = [1, 0];
			}
		}
		for (a = 0; a < c.length; a++) {
			if (c[a].title.substring(c[a].title.length - 6) === "Sprite") {
				name = c[a].title.substring(c[a].title.indexOf(":") + 1);
				list[name] = list[name] || [0, 0];
				list[name][1] = 1;
			}
		}
		var names = Object.keys(list);
		function loadSprite2(toOpen) {
			var historyUrl = new URL(window.location);
			historyUrl.searchParams.set('sprite', toOpen);
			window.history.pushState({}, '', historyUrl);
			shared.loadSprite(toOpen, myData.isNew, myData.spriteSize);
			modal.seDialog.close();
		}
		myData.loadSprite2 = loadSprite2;
		function loadSprite(event) {
			loadSprite2(event.target.closest(".previewBox").dataset.sprite);
		}
		for (var n = 0; n < names.length; n++) {
			if (!list[names[n]][0] || !list[names[n]][1]) continue; // Skip sprites with missing image / module
			var ele = document.createElement('div');
			ele.dataset.sprite = names[n];
			ele.className = 'previewBox';
			var ele2 = document.createElement('a');
			var u = config.wgArticlePath.replace("$1", "Special:Redirect/file/" + names[n] + ".png");
			ele2.style.backgroundImage = "url(" + u + ( u.includes('?') ? '&' : '?' ) + "version=" + Date.now() + ")";
			ele2.onclick = loadSprite;
			var ele3 = document.createElement('a');
			ele3.textContent = names[n];
			ele3.onclick = loadSprite;
			ele.append(ele2, ele3);
			root.appendChild(ele);
		}
		modal.windowManager.updateWindowSize(modal.seDialog);
	}
	myData.setSharedData = function(d) {
		shared = d;
	};
	myData.requestChanges = function() {
		// Blank
		var root = document.getElementsByClassName("spriteeditor-items")[0];
		root.innerHTML = "";
		modal.windowManager.updateWindowSize(modal.seDialog);
		myData.isNew = false;
		myData.spriteSize = 0;
		// Load lists
		api.get({
			"action": "query",
			"format": "json",
			"list": "allpages",
			"apfrom": "",
			"apnamespace": "6",
			"apfilterredir": "nonredirects"
		}).done(function(data) {
			var images = data.query.allpages;
			api.get({
				"action": "query",
				"format": "json",
				"list": "allpages",
				"apfrom": "",
				"apnamespace": "828",
				"apfilterredir": "nonredirects"
			}).done(function(data) {
				createList(images, data.query.allpages);
			});
		});

	};
	// window content
	function formHtml() {
		return '<div class="spriteeditor-items"></div>';
	}

	mw.loader.using('oojs-ui', 'oojs-ui-core', 'oojs-ui-windows').then( function( require ) {
		var OO = require('oojs');

		// create window
		myData.createWindow = function() {
			function SpriteEditorDialog(config) {
				SpriteEditorDialog.super.call(this, config);
			}
			OO.inheritClass(SpriteEditorDialog, OO.ui.ProcessDialog);

			SpriteEditorDialog.static.name = 'SpriteEditor';
			SpriteEditorDialog.static.title = 'Open Sprite';
			SpriteEditorDialog.static.actions = [
				{ label: 'New', action: 'new', flags: ['primary'] },
				{ label: 'Close', modes: 'edit', flags: ['safe', 'close'] }
			];

			// initialise dialog, append content
			SpriteEditorDialog.prototype.initialize = function () {
				SpriteEditorDialog.super.prototype.initialize.apply(this, arguments);
				this.content = new OO.ui.PanelLayout({
					expanded: false
				});
				this.content.$element.append(formHtml());
				this.$body.append(this.content.$element);
				this.$content.addClass('spriteedit-ui-Dialog');
				// Hide empty action bar
				var ele = this.$content.get(0);
				ele.children[2].children[0].style.height = 0;
				ele.children[2].style.minHeight = 0;
				ele.children[2].style.display = "none";
			};

			// Handle actions
			SpriteEditorDialog.prototype.getActionProcess = function (action) {
				if (action === "new") {
					if (shared.openWindow("new", "New-Module not loaded!")) {
						window.SpriteEditorModules.new.requestChanges();
					}
				}
				return SpriteEditorDialog.super.prototype.getActionProcess.call(this, action);
			};

			// Create the Dialog and add the window manager.
			modal.windowManager = new OO.ui.WindowManager();
			$('body').append(modal.windowManager.$element);

			// Create a new dialog window.
			modal.seDialog = new SpriteEditorDialog({
				size: 'larger'
			});

			// Add window and open
			modal.windowManager.addWindows([modal.seDialog]);
			modal.windowManager.openWindow(modal.seDialog);
			// Close dialog when clicked outside the dialog
			modal.seDialog.$frame.parent().on('click', function (e) {
				if (!$(e.target).closest('.spriteedit-ui-Dialog').length) {
					modal.seDialog.close();
				}
			});
		};
	});
})(window.jQuery, window.mediaWiki);