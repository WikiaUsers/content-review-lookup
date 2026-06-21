(function() {
	'use strict';
	if (window.oldCommentsLoaded || mw.config.get('wgNamespaceNumber') !== 0) return;
	function waitforButton () {
		const el = $('button[class*="PanelArticleCommentsApp_trigger__"]');
		if (el.length > 0) {
			document.querySelector('button[class*="PanelArticleCommentsApp_trigger__"]').click();
			el.remove();
			return;
		} else {
			setTimeout(waitforButton, 500);
		}
	}
	$('body').append(`<style>
	[class*="PanelArticleCommentsApp_panel__"] {
		position:relative !important;
		top:0 !important;
		right:0 !important;
		width:100% !important;
		transform:none !important;
		transition: none !important;
		z-index: 1 !important;
	}
	button[class*="PanelArticleCommentsApp_closeButton__"]  {display:none !important;}
	</style>`);
	waitforButton();
	window.oldCommentsLoaded = true;
})();