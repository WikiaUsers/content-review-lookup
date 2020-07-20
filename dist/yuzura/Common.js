importScriptPage('Tooltips/code.js', 'dev');
 
/* Guided Tours */
if (mw.config.get('wgCanonicalNamespace') == '') {
	setTimeout(function() {
		$('.guidedtours-header').each(function() {
			var headerWidth = $(this).find('.text').width();
			var leftMargin = parseInt(headerWidth) + 15 + 'px';
			$(this).next().css('margin-left',leftMargin);
		});
	},250);
}