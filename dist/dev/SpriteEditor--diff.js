;(function($, mw) {
	'use strict';

	if (window.SpriteEditorModules.diff && window.SpriteEditorModules.diff.loaded) return;
	var api = new mw.Api();
	var shared;
	// window content
	function formHtml() {
		return '<div id="se-sheet-diff" class="spriteedit-sheet-diff">' +
			'<span class="spriteedit-old-sheet"></span>' +
			'<span class="spriteedit-new-sheet"></span>' +
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
	var postData = {
		action: 'compare',
		format: 'json',
		formatversion: 2,
		prop: 'diff',
		'tocontentformat-main': 'text/plain',
		'tocontentmodel-main': 'Scribunto',
		toslots: 'main'
	};
	window.SpriteEditorModules.diff = {
		createWindow: function() {
			var main = window.SpriteEditorModules.main;
			var msg = main.msg;
			window.SpriteEditorModules.diff.modal = main.processDialog({
				action: function () {},
				actions: [
					{ label: msg('dialog-button-close').plain(), action: 'close', modes: 'edit', flags: ['safe', 'close'] }
				],
				content: formHtml,
				name: 'diff',
				size: 'larger',
				title: msg('changes-title').plain()
			});
		},
		modal: {},
		loaded: true,
		requestChanges: function() {
			var modal = window.SpriteEditorModules.diff.modal;
			modal.seDialog.pushPending();
			var gIVars = shared.generateImage();
			var ele = document.getElementById('se-sheet-diff');
			ele.children[0].replaceChildren(gIVars[1]); // Old
			ele.children[0].style.display = gIVars[2] ? 'unset' : 'none';
			ele.children[1].replaceChildren(gIVars[0]); // New
			ele.children[1].style.display = gIVars[2] ? 'unset' : 'none';
			modal.windowManager.updateWindowSize(modal.seDialog);
			var d = Object.assign({}, postData);
			d['totext-main'] = 'return ' + shared.processData(shared.generateJSON());
			if (shared.options.isNew) {
				d['fromtext-main'] = '';
				d.fromslots = 'main';
				d['fromcontentmodel-main'] = 'Scribunto';
				d['fromcontentformat-main'] = 'text/plain';
			} else {
				d.fromtitle = 'Module:' + shared.loaded.full;
			}
			api.post(d).done(function(d) {
				var ele = document.getElementsByClassName('diff-tbl')[0];
				if (!ele) return;
				ele.tBodies[0].innerHTML = d.compare.body;
				modal.windowManager.updateWindowSize(modal.seDialog);
				while (modal.seDialog.isPending())
					modal.seDialog.popPending();
			});
		},
		setSharedData: function(d) {
			shared = d;
		}
	};
})(window.jQuery, window.mediaWiki);