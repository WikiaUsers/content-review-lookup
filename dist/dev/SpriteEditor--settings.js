;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.settings && window.SpriteEditorModules.settings.loaded) return;
	window.SpriteEditorModules.settings = {loaded: true};
	var api = new mw.Api();
	var myData = window.SpriteEditorModules.settings;
	var modal = {};
	var shared = {};
	var eleList;
	myData.modal = modal;

	myData.setSharedData = function(d) {
		shared = d;
	};
	var perRowEle;
	myData.requestChanges = function() {
		perRowEle.setValue(shared.options.spritesPerRow);
		eleList[0].innerHTML = '<b>Image path</b>: ' + shared.title + '.png';
		eleList[1].innerHTML = '<b>Spritesheet name</b>: ' + shared.title;
		eleList[2].innerHTML = '<b>Sheet width</b>: ' + ((shared.spriteData.settings.sheetsize || shared.image.naturalWidth) / shared.options.spritesPerRowOrg * perRowEle.getValue()) + 'px';
		eleList[3].innerHTML = '<b>Sprite size</b>: ' + Number(shared.spriteData.settings.size || shared.options.defaultSpriteSize) + 'px';
		eleList[4].innerHTML = '<b>Sprites per row</b>: ';
		eleList[4].append(perRowEle.$element.get(0));
		eleList[5].innerHTML = '<b>Link prefix</b>: ' + (shared.spriteData.settings.linkprefix || "none");
	};

	// window content
	function formHtml() {
		return '<div style="padding: 0 24px">' +
			'<h2>Spritesheet info</h2>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<h2>Saving</h2>' +
			'<div>' +
				'<input id="se-section" type="checkbox" ' + (shared.options.cleanupSectionIDs && "checked" || "") + ' />' +
				'<label for="se-section">Cleanup section ids</label>' +
			'</div>' +
			'<div>' +
				'<input id="se-sprite" type="checkbox" ' + (shared.options.removeUnusedSprites && "checked" || "") + ' />' +
				'<label for="se-sprite">Remove unused Sprites</label>' +
			'</div>' +
			'<div>' +
				'<input id="se-deprecated" type="checkbox" ' + (shared.options.removeDeprecatedNames && "checked" || "") + ' />' +
				'<label for="se-deprecated">Remove deprecated Sprites</label>' +
			'</div>' +
		'</div>';
	}

	mw.loader.using('oojs-ui', 'oojs-ui-core', 'oojs-ui-windows').then( function( require ) {
		var OO = require('oojs');

		perRowEle = new OO.ui.NumberInputWidget({min: 1, step: 1});
		perRowEle.on("change", function() {
			eleList[2].innerHTML = '<b>Sheet width</b>: ' + ((shared.spriteData.settings.sheetsize || shared.image.naturalWidth) / shared.options.spritesPerRowOrg * perRowEle.getValue()) + 'px';
		});

		// create window
		myData.createWindow = function() {
			function SpriteEditorDialog(config) {
				SpriteEditorDialog.super.call(this, config);
			}
			OO.inheritClass(SpriteEditorDialog, OO.ui.ProcessDialog);
			SpriteEditorDialog.static.name = 'SpriteEditor';
			SpriteEditorDialog.static.title = 'Settings';
			SpriteEditorDialog.static.actions = [
				{ label: 'Close', flags: ['safe', 'close'] },
				{ label: 'Save', action: 'saveSettings', flags: ['primary'] }
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
					shared.options.spritesPerRow = perRowEle.getValue();
					modal.seDialog.close();
				}
				return SpriteEditorDialog.super.prototype.getActionProcess.call(this, action);
			};

			// Create the Dialog and add the window manager.
			modal.windowManager = new OO.ui.WindowManager();
			$('body').append(modal.windowManager.$element);
			//document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', modal.windowManager.$element);

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