/* ToolbarEdittools */
(function($, mw) {
	mw.loader.using('ext.wikiEditor', function() {
		var $toolbar = $('#toolbar, #wikiEditor-ui-toolbar');
		var $specialchars = $('#mw-edittools-charinsert');
		if ($toolbar.length == 0 || $specialchars.length == 0) {
			return;
		}
		var $menu = $('<select/>').css('display', 'inline').change(function(e) {
			$specialchars.find('p').hide().eq(this.selectedIndex).css('display', 'inline');
		});
		$specialchars.find('p').each(function() {
			$('<option/>').text(this.title).appendTo($menu);
		});
		$specialchars.find('hr').each(function() {
			this.style.display = 'none';
		});
		$specialchars.css('background-color', 'var(--theme-article-background-color--secondary)').css('border', '1px solid var(--theme-border-color)').prepend($menu.change()).insertAfter($toolbar);
	});
})(jQuery, mediaWiki);