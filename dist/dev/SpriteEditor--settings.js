;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.settings && window.SpriteEditorModules.settings.loaded) return;
	window.SpriteEditorModules.settings = {loaded: true};
	var api = new mw.Api();
	var myData = window.SpriteEditorModules.settings;
	var modal = {};
	var shared = {};
	var eleList;
	var msg;
	myData.modal = modal;

	myData.setSharedData = function(d) {
		shared = d;
	};
	var perRowEle;
	var spacingEle;
	function updateSheetWidth() {
		eleList[2].innerHTML = '<b>' + msg("spritesheet width").plain() + '</b>: ' + ((Number(shared.imgWidth) + Number(spacingEle.getValue())) * Number(perRowEle.getValue()) - Number(spacingEle.getValue())) + 'px';
	}
	myData.requestChanges = function() {
		perRowEle.setValue(shared.options.spritesPerRow);
		spacingEle.setValue(shared.options.spacing);
		eleList[0].innerHTML = '<b>' + msg("image-path").plain() + '</b>: ' + (shared.spriteData.settings.image || shared.loaded.name + '.png');
		eleList[1].innerHTML = '<b>' + msg("spritesheet-name").plain() + '</b>: ' + shared.loaded.full;
		updateSheetWidth();
		eleList[3].innerHTML = '<b>' + msg("sprite-size").plain() + '</b>: ' + shared.imgWidth + 'x' + shared.imgHeight + 'px';
		eleList[4].innerHTML = '<b>' + msg("sprite-per-row").plain() + '</b>: ';
		eleList[4].append(perRowEle.$element.get(0));
		eleList[5].innerHTML = '<b>Spacing</b>: ';
		eleList[5].append(spacingEle.$element.get(0));
		eleList[6].innerHTML = '<b>' + msg("link-prefix").plain() + '</b>: ' + (shared.spriteData.settings.linkprefix || "none");
	};

	// window content
	function formHtml() {
		return '<div style="padding: 0 24px">' +
			'<h2>' + msg("spritesheet-info").plain() + '</h2>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<h2>' + msg("save-title").plain() + '</h2>' +
			'<div>' +
				'<input id="se-section" type="checkbox" ' + (shared.options.cleanupSectionIDs && "checked" || "") + ' />' +
				'<label for="se-section">' + msg("cleanup-ids").plain() + '</label>' +
			'</div>' +
			'<div>' +
				'<input id="se-sprite" type="checkbox" ' + (shared.options.removeUnusedSprites && "checked" || "") + ' />' +
				'<label for="se-sprite">' + msg("remove-unused").plain() + '</label>' +
			'</div>' +
			'<div>' +
				'<input id="se-deprecated" type="checkbox" ' + (shared.options.removeDeprecatedNames && "checked" || "") + ' />' +
				'<label for="se-deprecated">' + msg("remove-deprecated").plain() + '</label>' +
			'</div>' +
		'</div>';
	}
	mw.loader.using('oojs-ui', 'oojs-ui-core', 'oojs-ui-windows').then( function( require ) {
		var OO = require('oojs');

		perRowEle = new OO.ui.NumberInputWidget({min: 1, step: 1});
		perRowEle.on("change", function() {
			updateSheetWidth();
		});
		spacingEle = new OO.ui.NumberInputWidget({min: 0, step: 1});
		spacingEle.on("change", function() {
			updateSheetWidth();
		});

		// create window
		myData.createWindow = function() {
			msg = window.SpriteEditorModules.main.msg;
			function SpriteEditorDialog(config) {
				SpriteEditorDialog.super.call(this, config);
			}
			OO.inheritClass(SpriteEditorDialog, OO.ui.ProcessDialog);
			SpriteEditorDialog.static.name = 'SpriteEditor';
			SpriteEditorDialog.static.title = msg("settings-label").plain();
			SpriteEditorDialog.static.actions = [
				{ label: msg("dialog-button-close").plain(), flags: ['safe', 'close'] },
				{ label: msg("save-label").plain(), action: 'saveSettings', flags: ['primary'] }
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
				eleList = document.getElementsByClassName("settingsInfoline");
				// Hide empty action bar
				var ele = this.$content.get(0);
				ele.children[2].children[0].style.height = 0;
				ele.children[2].style.minHeight = 0;
				ele.children[2].style.display = "none";
			};

			// Handle actions
			SpriteEditorDialog.prototype.getActionProcess = function (action) {
				if (action === 'saveSettings') {
					shared.options.cleanupSectionIDs = document.getElementById("se-section").checked;
					shared.options.removeUnusedSprites = document.getElementById("se-sprite").checked;
					shared.options.removeDeprecatedNames = document.getElementById("se-deprecated").checked;
					shared.options.spritesPerRow = Number(perRowEle.getValue());
					shared.options.spacing = Number(spacingEle.getValue());
					modal.seDialog.close();
				}
				return SpriteEditorDialog.super.prototype.getActionProcess.call(this, action);
			};

			// Create the Dialog and add the window manager.
			modal.windowManager = new OO.ui.WindowManager();
			$('body').append(modal.windowManager.$element);

			// Create a new dialog window.
			modal.seDialog = new SpriteEditorDialog({
				size: 'small'
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