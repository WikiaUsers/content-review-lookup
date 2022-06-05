/*
 * Disables site CSS by default, with a toolbar link to toggle it
 * For personal use only
 * @author Caburum
 */

(function(window, $) {
	if (document.getElementById('cabDisableSiteCSS')) return;

	var autoDisable = window.cabAutoDisableSiteCSS !== undefined ? window.cabAutoDisableSiteCSS : false;

	var param = mw.util.getParamValue('usesitecss');
	if (autoDisable && (['0', 'false'].includes(param) || !param)) { // autodisable if there is a falsy value
		$('link[rel="stylesheet"][href*="site.styles"]').attr('disabled', true);
	}

	$('<li>', {
		append: $('<a>', {
			text: 'Toggle site CSS',
			id: 'cabDisableSiteCSS',
			click: function() {
				$('link[rel="stylesheet"][href*="site.styles"]').attr('disabled', function(_, val) { return !val });
			}
		}),
		prependTo: $('.toolbar .mytools .tools-menu')
	});
})(this, jQuery);