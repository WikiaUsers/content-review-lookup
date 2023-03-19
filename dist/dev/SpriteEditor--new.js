;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.new && window.SpriteEditorModules.new.loaded) return;
	window.SpriteEditorModules.new = {loaded: true};
	var api = new mw.Api();
	var config = mw.config.get([
		"wgFormattedNamespaces"
	]);
	var moduleName = config.wgFormattedNamespaces[828];
	var helper = window.SpriteEditorModules.helper;
	var myData = window.SpriteEditorModules.new;
	var modal = {};
	var shared = {};
	var root;
	var nameField;
	var sizeFieldW;
	var sizeFieldH;
	var spacingField;
	var lastInput;
	var oldTimeout;
	var okButton;
	var OO;
	var requestState = false;
	var msg;

	myData.modal = modal;

	function completeName(a) {
		return a + (!a.endsWith("Sprite") && "Sprite" || "");
	}
	function toggleOkayBtn(state) {
		if (!okButton) return;
		if (!requestState || !nameField.getValue().length || !sizeFieldW.getValue().length || !sizeFieldH.getValue().length || !spacingField.getValue().length) {
			okButton.setDisabled(true);
		} else {
			okButton.setDisabled(state);
		}
	}

	myData.setSharedData = function(d) {
		shared = d;
	};
	function newNumEle() {
		var e = new OO.ui.NumberInputWidget( {
			min: 1,
			step: 1,
			value: shared.options.defaultSpriteSize
		} );
		e.on("change", function(e) {
			toggleOkayBtn(e.length === 0);
		});
		return e;
	}
	myData.requestChanges = function() {
		root.innerHTML = "";
		// Label
		var labelNameField = document.createElement("p");
		labelNameField.innerText = msg("new-spritesheet").plain();
		root.appendChild(labelNameField);

		// Input field
		nameField = new OO.ui.TextInputWidget();
		nameField.on("change", function(e) {
			requestState = false;
			if (oldTimeout)
				clearTimeout(oldTimeout);
			okButton.setDisabled(true);
			var names = helper.seperatePath("Module:" + e);
			var newName = completeName(names.module);
			if (names.module != newName) {
				e = newName + e.substring(names.module.length);
				names = helper.seperatePath("Module:" + e);
			}
			lastInput = names.full;
			if (e.length && !window.SpriteEditorModules.main.blacklist.includes(names.module.toLowerCase())) {
				oldTimeout = setTimeout(function() {
					api.get({
						action: "query",
						format: "json",
						titles: moduleName + ":" + names.full + "|File:" + names.name + ".png",
						formatversion: "2"
					}).done(function(data) {
						if (data.query.pages[1].title.toLowerCase() === (moduleName + ":" + lastInput).toLowerCase() &&
						data.query.pages[0].missing &&
						data.query.pages[1].missing)
							requestState = true;
							toggleOkayBtn(false);
					});
				}, 1000);
			} else {
				oldTimeout = undefined;
			}
		});
		root.appendChild(nameField.$element.get(0));

		// Label
		var labelSizeFieldW = document.createElement("p");
		labelSizeFieldW.innerText = msg("sprite-width").plain();
		root.appendChild(document.createElement("br"));
		root.appendChild(labelSizeFieldW);
		sizeFieldW = newNumEle();
		root.appendChild(sizeFieldW.$element.get(0));

		root.appendChild(document.createElement("br"));

		var labelSizeFieldH = document.createElement("p");
		labelSizeFieldH.innerText = msg("sprite-height").plain();
		root.appendChild(document.createElement("br"));
		root.appendChild(labelSizeFieldH);
		sizeFieldH = newNumEle();
		root.appendChild(sizeFieldH.$element.get(0));
		
		root.appendChild(document.createElement("br"));
		
		var labelSizeSpacing = document.createElement("p");
		labelSizeSpacing.innerText = msg("sprite-spacing").plain();
		root.appendChild(document.createElement("br"));
		root.appendChild(labelSizeSpacing);
		spacingField = newNumEle();
		spacingField.setRange(0, Infinity);
		spacingField.setValue(0);
		root.appendChild(spacingField.$element.get(0));
	};
	myData.openWindow = function() {
		modal.windowManager.openWindow(modal.seDialog).opened.done(function() {
			okButton = modal.seDialog.actions.get()[1];
			okButton.setDisabled(true);
		});
	};

	// window content
	function formHtml() {
		return '<div id="newRoot" style="padding: 0 24px">' +
		'</div>';
	}

	mw.loader.using('oojs-ui', 'oojs-ui-core', 'oojs-ui-windows').then( function( require ) {
		OO = require('oojs');

		// create window
		myData.createWindow = function() {
			msg = window.SpriteEditorModules.main.msg;
			function SpriteEditorDialog(config) {
				SpriteEditorDialog.super.call(this, config);
			}
			OO.inheritClass(SpriteEditorDialog, OO.ui.MessageDialog);
			SpriteEditorDialog.static.name = 'SpriteEditor';
			SpriteEditorDialog.static.title = msg("dialog-button-new").plain();
			SpriteEditorDialog.static.actions = [
				{action: 'reject', label: msg("dialog-button-cancel").plain(), flags: [ 'safe', 'close' ]},
				{action: 'accept', label: msg("dialog-button-create").plain, flags: [ 'primary', 'progressive' ]}
			];

			// initialise dialog, append content
			SpriteEditorDialog.prototype.initialize = function () {
				SpriteEditorDialog.super.prototype.initialize.apply(this, arguments);
				var b = this.$body.get(0);
				// Adjusting styling
				var mdText = b.querySelector(".oo-ui-messageDialog-text");
				mdText.style.paddingLeft = 0;
				mdText.style.paddingRight = 0;
				b.querySelector(".oo-ui-messageDialog-message").innerHTML = formHtml();
				this.$content.addClass('spriteedit-ui-Dialog');
				root = document.getElementById("newRoot");
			};

			// Handle actions
			SpriteEditorDialog.prototype.getActionProcess = function (action) {
				if (action === 'accept') {
					var mD = window.SpriteEditorModules.open;
					mD.isNew = true;
					mD.spriteSizeW = sizeFieldW.getValue();
					mD.spriteSizeH = sizeFieldH.getValue();
					mD.spacing = spacingField.getValue();
					mD.loadSprite2(completeName(nameField.getValue()));
					modal.seDialog.close();
				}
				return SpriteEditorDialog.super.prototype.getActionProcess.call(this, action);
			};

			// Create the Dialog and add the window manager.
			modal.windowManager = new OO.ui.WindowManager();
			$('body').append(modal.windowManager.$element);

			// Create a new dialog window.
			modal.seDialog = new SpriteEditorDialog({
				size: 'medium'
			});

			// Add window and open
			modal.windowManager.addWindows([modal.seDialog]);
			myData.openWindow();
			// Close dialog when clicked outside the dialog
			modal.seDialog.$frame.parent().on('click', function (e) {
				if (!$(e.target).closest('.spriteedit-ui-Dialog').length) {
					modal.seDialog.close();
				}
			});
		};
	});
})(window.jQuery, window.mediaWiki);