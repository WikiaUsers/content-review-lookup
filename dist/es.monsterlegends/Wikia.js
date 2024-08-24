importScript('MediaWiki:Wikia.js/userRightsIcons.js');
importScript('MediaWiki:Parallax.js');
importScript('MediaWiki:Medals/es.js');


$(".image-resize").each(function() {
	var a = $(this).children(".image-resize-new").text().split("_"),
		img = $(this).find("img");
	if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
		img.attr({
			width: a[0],
			height: a[1]
		});
	}
});
 
// Disable votes when a thread is closed.
$(function() {
    if ($(".deleteorremove-infobox").is('*')) {
        $('input[name="wpVote"]').attr('disabled','disabled')
                                 .attr('value','Votaci�n finalizada');
    }
});
 
// Boton para ver la p�gina en Monobook (w:c:es.clubpenguin)
 
$(function() {
    $('.wikinav2 .WikiaPageHeader > .comments').before('&nbsp; <a class="wikia-menu-button primary" href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=monobook">Ver en Monobook</a>');
 });
$(function() {
    $('.wikinav2 .WikiaPageHeader > .comments').before('&nbsp; &nbsp;<a class="wikia-menu-button primary" href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=monobook&action=edit">Editar en Monobook</a>');
 });

/* Event code: Easter Eggs hunt (seems that doesn't work, I'll update this code
when I get the rewrited version */
/*
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	var pluses = /\+/g;
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	var config = $.cookie = function (key, value, options) {
		// Write
		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}
			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
		// Read
		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;
		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');
			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}
			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}
		return result;
	};
	config.defaults = {};
	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};
}));
$(function() { 
  $('.egg').each(function() {
    $(this).click(function() {
                  $(this).hide();
                 var eggn = $(this).attr('class').split(' ')[1];
                  $.cookie('+eggn+', 'found');
                     });
                     });
                    if ($.cookie('+eggn') === 'found') {$('+eggn+').hide();} 
                     });

*/