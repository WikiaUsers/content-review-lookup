;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.diff && window.SpriteEditorModules.diff.loaded) return;
	window.SpriteEditorModules.diff = {loaded: true};
	var api = new mw.Api();
	var myData = window.SpriteEditorModules.diff;
	var modal = {};
	myData.modal = modal;
	var shared;
	var msg;
	myData.setSharedData = function(d) {
		shared = d;
	};
	myData.requestChanges = function() {
		var gIVars = shared.generateImage();
		var ele = document.getElementsByClassName("spriteedit-sheet-diff")[0];
		ele.innerHTML = "";
		modal.windowManager.updateWindowSize(modal.seDialog);
		var eleO = document.createElement("span");
		eleO.className = "spriteedit-old-sheet";
		var eleN = document.createElement("span");
		eleN.className = "spriteedit-new-sheet";
		if (gIVars[2]) { // Has changes
			ele.appendChild(eleO);
			ele.appendChild(eleN);
			eleO.appendChild(gIVars[1]); // Old Image
			eleN.appendChild(gIVars[0]); // New Image
			modal.windowManager.updateWindowSize(modal.seDialog);
		}

		var data = "return " + shared.processData(shared.generateJSON());
		var postData = {
			action: "compare",
			format: "json",
			prop: "diff",
			toslots: "main",
			"totext-main": data,
			"tocontentformat-main": "text/plain",
			"tocontentmodel-main": "Scribunto",
			formatversion: 2,
		};
		if (shared.options.isNew) {
			postData["fromtext-main"] = "";
			postData.fromslots = "main";
			postData["fromcontentmodel-main"] = "Scribunto";
			postData["fromcontentformat-main"] = "text/plain";
		} else {
			postData.fromtitle = "Module:" + shared.title;
		}
		api.post(postData).done(function(d) {
			var ele = document.getElementsByClassName("diff-tbl")[0];
			if (ele) {
				ele.tBodies[0].innerHTML = d.compare.body;
				modal.windowManager.updateWindowSize(modal.seDialog);
			}
		});
	};
	// window content
	function formHtml() {
		return '<div class="spriteedit-sheet-diff">' + 
				'<span class="spriteedit-old-sheet">' +
				'</span>' +
				'<span class="spriteedit-new-sheet">' +
				'</span>' +
			'</div>' +
			'<table class="diff diff-tbl">' +
			'<colgroup>' +
				'<col class="diff-marker" />' +
				'<col class="diff-content" />' +
				'<col class="diff-marker" />' +
				'<col class="diff-content" />' +
			'</colgroup>' +
			'<tbody>' +
			'</tbody>' +
		'</table>';
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
			SpriteEditorDialog.static.title = msg("changes-title").plain();
			SpriteEditorDialog.static.actions = [
				{ label: msg("dialog-button-close").plain(), modes: 'edit', flags: ['safe', 'close'] }
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