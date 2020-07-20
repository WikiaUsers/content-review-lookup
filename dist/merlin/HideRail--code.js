"use strict";
 
/**
 * JavaScript to Toggle the Wikia Rail on and off.
 * Adds a button to the toolbar that allows expand/shrink.
 *
 * Exploits oasis-one-column for formatting. one-column occurs normally
 * on special pages like Edit, RecentChanges, Diff, etc so we don't do
 * anything on those pages. (Edit still has the Rail but it provides a
 * built-in collapser for it)
 *
 * TODO/FIXME: The code is suffering from a simplistic architecture that has
 *      become overtaxed. I need to OOP-ify it to clean up some of the mess.
 */
if (window.skin === "oasis") { // Don't do anything in Monobook
jQuery(function($) {
	var w = window,
	    document = w.document,
	    console = w.console || { log: function() { } },
	    mw = w.mediaWiki || {
		config: {
			get: function(prop) { return w[prop]; }
		}
	    },
	    settings = $.extend({
		showMainPage: false,
		showEditPage: false,
		showArticle: true,
		useImageArrows: true
	    }, w.HideRailjs || {});
 
	var i18n = {
		// English
		en: {
			expand: 'Expand Content',
			shrink: 'Shrink Content'
		},
		// Dutch [[User:Jens Ingels]]
		nl: {
			expand: 'Inhoud Uitbreiden',
			shrink: 'Inhoud Slinken'
		},
		// German [[User:Arkondi]]
		de: {
			expand: 'Seitenleiste ausblenden',
			shrink: 'Seitenleiste einblenden'
		}
	};
	// Arrows by [[User:Jens Ingels]]
	var resources = settings.useImageArrows && {
	expandArrow: 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAOCAMAAADKSsaaAAABEVBMVEXr6+t5eXl9fX2srKzs7Ozr6+vr' +
		'6+vo6Ojr6+vu7u7r6+vr6+uKiorr6+ve3t7u7u7i4uLr6+t9fX10dHSWlpbr6+vt7e3r6+t9fX15eXl9' +
		'fX10dHSSkpLq6urs7Ozr6+vr6+t9fX19fX2ioqJ9fX10dHTGxsbs7Ozr6+t9fX19fX19fX19fX19fX15' +
		'eXnl5eXs7Ox9fX19fX19fX19fX19fX2CgoLo6Ojs7Ox9fX19fX19fX19fX1wcHDIyMju7u7r6+t9fX19' +
		'fX19fX10dHS7u7vt7e3r6+vr6+t9fX15eXmKiors7Ozr6+uenp7k5OTt7e3r6+vc3Nzt7e3s7Ozr6+vr' +
		'6+vr6+vr6+vr6+vr6+tJ5jLQAAAAWnRSTlMAAAAAAAbzAn8ACjAABABuAI8QFAvBw2KyA0WjADP56DSg' +
		'lQC2ewCG1hPeTxzlPAjPA9hnBuNNB9N/uQKaoQCK2cgUOL0HNfo1KSMdxV8AAHOMAAAJ6b8CYyHqhI8D' +
		'AAAAhklEQVR4XhXOwwIDQRRE0epJMhPbtm3bNt7/f0i6a3V2t6BSw6Q1gI9ZdfqISyNkTJgtZOOyM4dT' +
		'cZMH8Pr8gWAoLEcRi0vJVDpDWeTyhWKpXKkSavVGs9XudAm9/mA4Gk9oitl8sVytN/IWO7Y/KEc6AZJ0' +
		'vlzpJhr3x/P15jXx4PP9cfwBFoISlyRK5TcAAAAASUVORK5CYII=',
	shrinkArrow: 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAOCAMAAADKSsaaAAAA6lBMVEXr6+t9fX15eXns7Ozr6+t0dHTo' +
		'6Ojr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+t0dHTu7u6WlpaWlpbr6+vq6up0dHR9fX15eXl9fX3r6+vs' +
		'7Ox0dHTs7Ox9fX19fX3t7e3l5eV5eXl9fX19fX3r6+t9fX19fX3s7Ozo6OiCgoJ9fX19fX19fX19fX19' +
		'fX3r6+vu7u7t7e1wcHB9fX19fX19fX19fX3r6+vr6+vt7e27u7t0dHR9fX19fX19fX3r6+vs7OyKiop5' +
		'eXl9fX3r6+vt7e3s7Ozr6+vr6+vs7Ox9fX19fX19fX3r6+sJbOr0AAAATXRSTlMAAAAABgACIWMC82IK' +
		'j+gUbgALwTOjRQOy1oZ7+ZWgwwg85RA0thPTB03jBmfYA9mKAKGaArl/Nfo1B704FMhfxR0jKYxzz7/p' +
		'CRxP3hppw5sAAAB8SURBVHheTc1FAsIwEAXQPwktUMPd3d3dnbn/dUh37N7uAfBEHAsgJZuDIU0omVzQ' +
		'wwFRQdXIRrVYPJFEitMiU6NcHnwvlsrvz7cObjRb7U6318eAh6PxZDqbY2EsV+vNdrcHDnzUT2e6ALjy' +
		'TQoid3s8X1K6gtfnB/70A+HrDhyOzFTHAAAAAElFTkSuQmCC',
	};
	var messageSet = (function() {
		// This is reverse order, last is most important, first is least
		var langs = [{}, i18n.en];
		var langCode = mw.config.get('wgContentLanguage');
		if (i18n[langCode]) langs.push(i18n[langCode]);
		else console.log('HIDERAIL: No translation for language "' + langCode + '"');
		langCode = mw.config.get('wgUserLanguage');
		if (i18n[langCode]) langs.push(i18n[langCode]);
		else console.log('HIDERAIL: No translation for language "' + langCode + '"');
		// Result: user, wiki, english
		return $.extend.apply($, langs);
	})();
	i18n = null; // Garbage collect unused messages
 
	var _expandMsg = messageSet['expand'] + (settings.useImageArrows ? '' : ' \u2192'),
	    _shrinkMsg = messageSet['shrink'] + (settings.useImageArrows ? '' : ' \u2190'),
	    _$link = $(document.createElement('a')),
	    _$rail = $('#WikiaRail'),
	    _header = document.getElementById('WikiaPageHeader'),
	    _search = _header && document.getElementById('WikiaSearch');
 
	function expandContent()
	{
		_$rail.hide();
		document.body.className += " oasis-one-column";
		if (_search) _header.appendChild(_search);
	}
	function shrinkContent()
	{
		if (_search) _search.parentNode.removeChild(_search);
		document.body.className = document.body.className.replace(
			/(?:^|\s+)oasis-one-column\b/, ''
		);
		if (_search) _$rail.prepend(_search);
		_$rail.show();
	}
	function updateLink(aExpanded)
	{
		_$link.text(aExpanded ? _shrinkMsg : _expandMsg);
		if (settings.useImageArrows) {
			_$link.css('backgroundImage', 'url(' + (aExpanded
				? resources.shrinkArrow
				: resources.expandArrow
				) + ')'
			);
		}
	}
	function createClickHandler(aExpandFunc, aShrinkFunc)
	{
		if (!aShrinkFunc) aShrinkFunc = aExpandFunc;
		return function(event) {
			if (_$link.text() === _expandMsg)
				updateLink(aExpandFunc() || true);
			else
				updateLink(aShrinkFunc() && false);
			return false;
		};
	}
	// Default link
	_$link.prop('href', '#')
	if (settings.useImageArrows) {
		_$link.css({
			paddingRight: '15px',
			minHeight: '14px',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'right center'
		});
	}
	updateLink(false);
 
	var handle_click;
	if (!/\boasis-one-column\b/.test(document.body.className)) {
		if (!settings.showArticle) return;
		handle_click = createClickHandler(expandContent, shrinkContent);
	} else {
		// This will only affect Source mode.
		var node = $('#EditPage .editpage-widemode-trigger');
		if (node.length) {
			if (!settings.showEditPage) return;
			handle_click = createClickHandler(function() { node.click(); });
			// Install an event handler to keep the button in sync
			var node_click = function(event) {
				updateLink(/\beditpage-sourcewidemode-on\b/.test(
					document.getElementById('EditPage').className
				));
			};
			node.click(node_click);
			// Bring into sync with initial state
			node_click();
			// Wait until other start-up JS finishes and the browser becomes
			// idle since initial state seems to come from another script
			// that runs after we do.
			w.setTimeout(node_click, 0);
			w.setTimeout(node_click, 2000); // Failsafe.
		} else if (mw.config.get('wgIsMainpage')) {
			if (!settings.showMainPage) return;
			// Hide right-column on main-pages if any
			var $rcs = $('.WikiaArticle div.main-page-tag-rcs'),
			    $lcs = $('.WikiaArticle div.main-page-tag-lcs.main-page-tag-lcs-exploded'),
			    $lcsdiv = $lcs.find('> div'),
			    lcs_marginRight = $lcs.css('marginRight'),
			    lcsdiv_marginRight = $lcsdiv.css('marginRight');
			if ($rcs.length && $lcs.length) {
				handle_click = createClickHandler(function() {
					$rcs.hide();
					$lcs.css('marginRight', 0);
					$lcsdiv.css('marginRight', 0);
				}, function() {
					$lcsdiv.css('marginRight', lcsdiv_marginRight);
					$lcs.css('marginRight', lcs_marginRight);
					$rcs.show();
				});
			}
		}
	}
	if (handle_click) {
		var toolbar = $("#WikiaFooter .toolbar > ul.tools");
		if (toolbar.length) {
			 $(document.createElement('li'))
			   .append(_$link.click(handle_click))
			   .appendTo(toolbar)
			 ;
		}
	}
});
}
//