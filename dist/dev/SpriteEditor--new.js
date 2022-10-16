;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.new && window.SpriteEditorModules.new.loaded) return;
	window.SpriteEditorModules.new = {loaded: true};
	var api = new mw.Api();
	var myData = window.SpriteEditorModules.new;
	var modal = {};
	var shared = {};
	var root;
	var nameField;
	var sizeField;
	var lastInput;
	var oldTimeout;
	var okButton;
	var OO;
	var requestState = false;

	myData.modal = modal;

	function completeName(a) {
		return (a.length && a.substring(a.length - 6) !== "Sprite") && a + "Sprite" || a;
	}
	function toggleOkayBtn(state) {
		if (!requestState || !nameField.getValue().length || !sizeField.getValue().length) {
			okButton.setDisabled(true);
		} else {
			okButton.setDisabled(state);
		}
	}

	myData.setSharedData = function(d) {
		shared = d;
	};
	myData.requestChanges = function() {
		root.innerHTML = "";
		// Label
		var labelNameField = document.createElement("p");
		labelNameField.innerText = 'Enter a name (Automatic adds missing "Sprite"-Suffix.)';
		root.appendChild(labelNameField);

		// Input field
		nameField = new OO.ui.TextInputWidget();
		nameField.on("change", function(e) {
			requestState = false;
			lastInput = completeName(e);
			if (oldTimeout)
				clearTimeout(oldTimeout);
			okButton.setDisabled(true);
			if (e.length) {
				oldTimeout = setTimeout(function() {
					api.get({
						action: "query",
						format: "json",
						titles: "Module:" + lastInput + "|File:" + lastInput + ".png",
						formatversion: "2"
					}).done(function(data) {
						if (data.query.normalized[0].from === "Module:" + lastInput &&
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
		var labelSizeField = document.createElement("p");
		labelSizeField.innerText = 'Sprite size in px';
		root.appendChild(document.createElement("br"));
		root.appendChild(labelSizeField);

		sizeField = new OO.ui.NumberInputWidget( {
			min: 1,
			step: 1,
			value: shared.options.defaultSpriteSize
		} );
		sizeField.on("change", function(e) {
			toggleOkayBtn(e.length === 0);
		});
		root.appendChild(sizeField.$element.get(0));
	};
	myData.openWindow = function() {
		modal.windowManager.openWindow(modal.seDialog).opened.then(function() {
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
			function SpriteEditorDialog(config) {
				SpriteEditorDialog.super.call(this, config);
			}
			OO.inheritClass(SpriteEditorDialog, OO.ui.MessageDialog);
			SpriteEditorDialog.static.name = 'SpriteEditor';
			SpriteEditorDialog.static.title = 'New';
			SpriteEditorDialog.static.actions = [
				{action: 'reject', label: 'Cancel', flags: [ 'safe', 'close' ]},
				{action: 'accept', label: 'Create', flags: [ 'primary', 'progressive' ]}
			];

			// initialise dialog, append content
			SpriteEditorDialog.prototype.initialize = function () {
				SpriteEditorDialog.super.prototype.initialize.apply(this, arguments);
				// this.$body.append(this.content.$element);
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
					mD.spriteSize = sizeField.getValue();
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