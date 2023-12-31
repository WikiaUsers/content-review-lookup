;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.diff && window.SpriteEditorModules.diff.loaded) return;
	window.SpriteEditorModules.diff = {loaded: true};
	var api = new mw.Api();
	var myData = window.SpriteEditorModules.diff;
	var modal = {};
	myData.modal = modal;
	var shared;
	myData.setSharedData = function(d) {
		shared = d;
	};
	myData.requestChanges = function() {
		modal.seDialog.pushPending();
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
			postData.fromtitle = "Module:" + shared.loaded.full;
		}
		api.post(postData).done(function(d) {
			var ele = document.getElementsByClassName("diff-tbl")[0];
			if (ele) {
				ele.tBodies[0].innerHTML = d.compare.body;
				modal.windowManager.updateWindowSize(modal.seDialog);
				while (modal.seDialog.isPending())
					modal.seDialog.popPending();
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

	// create window
	myData.createWindow = function() {
		var msg = window.SpriteEditorModules.main.msg;
		modal = window.SpriteEditorModules.helper.processDialog({
			title: msg("changes-title").plain(),
			name: "diff",
			actions: [
				{ label: msg("dialog-button-close").plain(), action: 'close', modes: 'edit', flags: ['safe', 'close'] }
			],
			content: formHtml,
			action: function (action) {},
			size: "larger"
		});
		myData.modal = modal;
	};
})(window.jQuery, window.mediaWiki);