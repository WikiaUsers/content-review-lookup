;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.open && window.SpriteEditorModules.open.loaded) return;
	window.SpriteEditorModules.open = {loaded: true};
	var api = new mw.Api();
	const config = mw.config.get([
		'wgArticlePath'
	]);
	var helper = window.SpriteEditorModules.helper;
	var myData = window.SpriteEditorModules.open;
	var modal = {};
	myData.modal = modal;
	var shared;
	var msg;
	var imagesLoaded = false;
	var modulesLoaded = false;
	var allImages = [];
	var allPages = [];
	var windowClosed = false;
	function createList() { // Compares images with lists; creates html
		var list = {};
		var a = 0;
		var name = "";
		var root = document.getElementsByClassName("spriteeditor-items")[0];
		root.innerHTML = "";
		modal.windowManager.updateWindowSize(modal.seDialog);
		var names = Object.keys(list);
		function loadSprite2(toOpen) {
			var historyUrl = new URL(window.location);
			historyUrl.searchParams.set('sprite', toOpen.full);
			window.history.pushState({}, '', historyUrl);
			shared.loadSprite(toOpen, myData.isNew, myData.spriteSizeW, myData.spriteSizeH, myData.spacing);
			windowClosed = true;
			modal.seDialog.close();
		}
		myData.loadSprite2 = loadSprite2;
		function loadSprite(event) {
			loadSprite2(helper.seperatePath(event.target.closest(".previewBox").dataset.sprite));
		}
		function addSprite(i) {
			var n = allPages[i];
			var oldSize = modal.seDialog.getBodyHeight();
			api.get({
				'action': 'scribunto-console',
				'title': 'Module:SpriteEditorDummy', // Dummy name (Doesn't need to exist)
				'question': '=p',
				'clear': true,
				'content': 'local a = require("Module:' + n.full + '")\n'
				+ 'return type(a) == "table" and a.settings and mw.text.jsonEncode(a) or "{}"'
			}).always(function(a) {
				var output;
				if (windowClosed) return;
				if (a.return) {
					output = JSON.parse(a.return);
					output.settings = output.settings || {};
					output.ids = output.ids || {};
					output.sections = output.sections || [];
					var ele = document.createElement('div');
					ele.dataset.sprite = "Module:" + n.full;
					ele.className = 'previewBox';
					var ele2 = document.createElement('a');
					var u = window.SpriteEditorModules.helper.filepath(output.settings.image || n.name + ".png");
					ele2.style.backgroundImage = "url(" + u + ")";
					ele2.onclick = loadSprite;
					var ele3 = document.createElement('a');
					ele3.textContent = n.name;
					ele3.onclick = loadSprite;
					ele.append(ele2, ele3);
					root.appendChild(ele);
				}
				if (allPages[i + 1]) {
					addSprite(i + 1);
				} else {
					while (modal.seDialog.isPending())
						modal.seDialog.popPending();
				}
				var newSize = modal.seDialog.getBodyHeight();
				if (oldSize != newSize)
					modal.windowManager.updateWindowSize(modal.seDialog);
			});
		}
		if (allPages[0]) {
			addSprite(0);
		} else {
			while (modal.seDialog.isPending())
				modal.seDialog.popPending();
		}
	}
	myData.setSharedData = function(d) {
		shared = d;
	};
	function loadModules(c) {
		var base = {
			action: "query",
			apfilterredir: "nonredirects",
			apfrom: "",
			aplimit: "500",
			apnamespace: "828",
			format: "json",
			formatversion: "2",
			list: "allpages"
		};
		api.get(Object.assign(base, c || {})).done(function(data) {
			var pages = data.query.allpages;
			for (var i = 0; i < pages.length; i++) {
				var names = helper.seperatePath(pages[i].title);
				if (names.module.endsWith("Sprite") && !window.SpriteEditorModules.main.blacklist.includes(names.module.toLowerCase())) {
					allPages.push({
						full: names.full,
						module: names.module,
						name: names.name
					});
				}
			}
			if (windowClosed)
				return;
			if (data.continue) {
				loadModules(data.continue);
				return;
			}
			createList();
		});
	}
	myData.requestChanges = function() {
		modal.seDialog.pushPending();
		// Blank
		var root = document.getElementsByClassName("spriteeditor-items")[0];
		root.innerHTML = "";
		modal.windowManager.updateWindowSize(modal.seDialog);
		myData.isNew = false;
		myData.spriteSizeW = 0;
		myData.spriteSizeH = 0;
		imagesLoaded = false;
		modulesLoaded = false;
		allImages = [];
		allPages = [];
		windowClosed = false;
		// Load lists
		loadModules();
	};
	// window content
	function formHtml() {
		return '<div class="spriteeditor-items"></div>';
	}

	mw.loader.using('oojs-ui', 'oojs-ui-core', 'oojs-ui-windows').then( function( require ) {
		var OO = require('oojs');

		// create window
		myData.createWindow = function() {
			msg = window.SpriteEditorModules.main.msg;
			function SpriteEditorDialog(config) {
				SpriteEditorDialog.super.call(this, config);
			}
			OO.inheritClass(SpriteEditorDialog, OO.ui.ProcessDialog);

			SpriteEditorDialog.static.name = 'SpriteEditor';
			SpriteEditorDialog.static.title = msg("open-label").plain();
			SpriteEditorDialog.static.actions = [
				{ label: msg("dialog-button-new").plain(), action: 'new', flags: ['primary'] },
				{ label: msg("dialog-button-close").plain(), action: 'close', modes: 'edit', flags: ['safe', 'close'] }
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
					if (shared.openWindow("new", msg("new-module-missing").plain())) {
						window.SpriteEditorModules.new.requestChanges();
					}
				} else if (action === "close") {
					windowClosed = true;
					modal.seDialog.close();
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
					windowClosed = true;
					modal.seDialog.close();
				}
			});
		};
	});
})(window.jQuery, window.mediaWiki);