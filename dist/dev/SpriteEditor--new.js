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
			return;
		}
		okButton.setDisabled(state);
	}

	myData.setSharedData = function(d) {
		shared = d;
	};
	function newNumEle() {
		var i = new OO.ui.NumberInputWidget( {
			min: 1,
			step: 1,
			value: shared.options.defaultSpriteSize
		} );
		i.on("change", function(e) {
			toggleOkayBtn(e.length === 0);
		});
		return i;
	}
	function getButton() {
		okButton = modal.seDialog.actions.get()[1];
		if (okButton) {
			okButton.setDisabled(true);
			return;
		}
		setTimeout(getButton, 200);
	}
	myData.requestChanges = function() {
		okButton = undefined;
		getButton();
		// Input field
		nameField = new OO.ui.TextInputWidget();
		nameField.on("change", function(e) {
			requestState = false;
			if (oldTimeout)
				clearTimeout(oldTimeout);
			okButton.setDisabled(true);
			var names = helper.seperatePath("Module:" + e);
			var newName = completeName(names.module);
			if (names.module !== newName) {
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
		document.getElementById("newNamePlaceholder").replaceChildren(nameField.$element.get(0));

		sizeFieldW = newNumEle();
		document.getElementById("newWidthPlaceholder").replaceChildren(sizeFieldW.$element.get(0));

		sizeFieldH = newNumEle();
		document.getElementById("newHeightPlaceholder").replaceChildren(sizeFieldH.$element.get(0));

		spacingField = newNumEle();
		spacingField.setRange(0, Infinity);
		spacingField.setValue(0);
		document.getElementById("newSpacingPlaceholder").replaceChildren(spacingField.$element.get(0));
	};

	// window content
	function formHtml() {
		return '<div id="newRoot" style="padding: 0 24px">' +
			'<p>' + msg("new-spritesheet").plain() + '</p>' +
			'<div id="newNamePlaceholder"></div>' +
			'<br>' +
			'<p>' + msg("sprite-width").plain() + '</p>' +
			'<div id="newWidthPlaceholder"></div>' +
			'<br>' +
			'<p>' + msg("sprite-height").plain() + '</p>' +
			'<div id="newHeightPlaceholder"></div>' +
			'<br>' +
			'<p>' + msg("sprite-spacing").plain() + '</p>' +
			'<div id="newSpacingPlaceholder"></div>' +
		'</div>';
	}
	myData.createWindow = function() {
		OO = window.SpriteEditorModules.main.OO;
		msg = window.SpriteEditorModules.main.msg;
		modal = helper.processDialog({
			action: function (action) {
				if (action === 'close') {
					var mD = window.SpriteEditorModules.open;
					mD.isNew = true;
					mD.spriteSizeW = sizeFieldW.getValue();
					mD.spriteSizeH = sizeFieldH.getValue();
					mD.spacing = spacingField.getValue();
					mD.loadSprite2(completeName(nameField.getValue()));
				}
			},
			actions: [
				{action: 'reject', label: msg("dialog-button-cancel").plain(), flags: [ 'safe', 'close' ]},
				{action: 'close', label: msg("dialog-button-create").plain, flags: [ 'primary', 'progressive' ]}
			],
			content: formHtml,
			isSubdialog: true,
			messageDialog: true,
			name: "new",
			size: "medium",
			title: msg("dialog-button-new").plain()
		});
		myData.modal = modal;
	};
})(window.jQuery, window.mediaWiki);