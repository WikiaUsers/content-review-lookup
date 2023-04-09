/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */
(function($) {

	// CONFIG
	var config = window.ShowHideConfig = $.extend(true, {
		autoCollapse: 2,
		userLang: true,
		brackets: '[]',
		linkBefore: false,
		// German
		de: {
			show: "anzeigen",
			hide: "verbergen",
			showAll: "alle anzeigen",
			hideAll: "alle verbergen"
		},
		// English
		en: {
			show: "show",
			hide: "hide",
			showAll: "show all",
			hideAll: "hide all"
		},
		// Spanish
		es: {
			show: "Mostrar",
			hide: "Ocultar",
			showAll: "Mostrar todo",
			hideAll: "Ocultar todo"
		},
		// French
		fr: {
			show: "montrer",
			hide: "cacher",
			showAll: "montrer tous",
			hideAll: "cacher tous"
		},
		// Dutch
		nl: {
			show: "tonen",
			hide: "verbergen",
			showAll: "alles tonen",
			hideAll: "alles verbergen"
		}
		// Make a post on the talkpage if you have i18n updates
	}, window.ShowHideConfig || {});

	// i18n function
	function msg(name) {
		if ( config.userLang && mw.config.get('wgUserLanguage') in config && name in config[mw.config.get('wgUserLanguage')] )
			return config[mw.config.get('wgUserLanguage')][name];
		if ( wgContentLanguage in config && name in config[wgContentLanguage] )
			return config[wgContentLanguage][name];
		return config.en[name];
	}
	
	// common
	$.fn.onLink = function(fn) {
		return this.bind('click keypress', function(e) {
			if ( e.type === 'click' || ( e.type === 'keypress' && ( e.keyCode === 13 || e.charCode === 32 ) ) )
				fn.call(this, e);
		});
	};

	/** Collapsible tables using jQuery
	 *
	 *  Description: Allows tables to be collapsed, showing only the header.
	 */
	function collapseTable( node, state ) {
		var $table = $(node);
		var $button = $table.find("tr:first > th:first .collapseLink");
	
		if (!$table.length || !$button.length) {
			return false;
		}
		
		if ( typeof state === 'boolean' )
			$table.toggleClass('collapsed', !state);
		else
			$table.toggleClass('collapsed');
		
		var hidden = $table.hasClass('collapsed');
		$table.find('> * > tr:not(:first):not(.nocollapse)')[hidden?"hide":"show"]();
		$button.text( msg( hidden ? "show" : "hide" ) );
	}

	function createCollapseButtons() {
		var NavigationBoxes = [];
		$("table.collapsible").each(function() {
			NavigationBoxes.push(this);
			var $buttonLink = $('<span tabIndex=0 class=collapseLink />').text( msg("hide") )
                                .css({ cursor: "pointer" })
				.onLink(function(e) { collapseTable( $(this).closest('table') ); });
			var $button = $("<span class=collapseButton />").css({
				"float": "right",
				textAlign: "right",
				fontWeight: "normal",
				width: "6em",
				marginLeft: "-100%"
			});
			$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );

			var $header = $(this).find('tr:first > th:first').prepend($button);
		});
	
		// if more Navigation Bars found than Default: hide all
		if ($(NavigationBoxes).filter('.autocollapse').length >= config.autoCollapse)
			$(NavigationBoxes).filter('.autocollapse').each(function() { collapseTable( this, false ); });
		else
			$(NavigationBoxes).filter('.collapsed').each(function() { collapseTable( this, false ); });
	}

	$( createCollapseButtons );

	/*</pre>*/

	/*<pre>*/
	
})(jQuery);