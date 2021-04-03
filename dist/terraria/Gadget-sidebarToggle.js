$(function() {
	loadJQcookies();

	var toggleStyle = 'font-weight:bold; color:white; padding:0 10px; text-align:center; cursor:pointer;';

	$('.netbar-spacer').before('<div class="sidebarToggle" style="' + toggleStyle + '">Toggle Sidebar</div>');

	var $sbToggle = $('.sidebarToggle');

	if ($.cookie('sbToggle') == null) {
	  $.cookie('sbToggle', '1', { expires: 365, path: '/' });
	}

	if ($.cookie('sbToggle') == '0') {
	  	$('#mw-panel').hide();
			$('.mw-body').animate({marginLeft: '8px'});
			$('#left-navigation').animate({marginLeft: '8px'});
	}

	$sbToggle.click(function(){
		if ($.cookie('sbToggle') == '1'){
			$('#mw-panel').hide();
			$('.mw-body').animate({marginLeft: '8px'});
			$('#left-navigation').animate({marginLeft: '8px'});
			$.cookie('sbToggle', '0', { expires: 365, path: '/' });
		} else {
			$('.mw-body').animate({marginLeft: '176px'});
			$('#left-navigation').animate({marginLeft: '176px'});
			$('#mw-panel').show();
			$.cookie('sbToggle', '1', { expires: 365, path: '/' });
		}
	});
});

/* jQuery Cookie Plugin v1.3.1 https://github.com/carhartl/jquery-cookie
 * Copyright 2013 Klaus Hartl. Released under the MIT license */ 

function loadJQcookies(){
	(function (factory) {if (typeof define === 'function' && define.amd) {define(['jquery'], factory);} else {factory(jQuery);}}
		(function ($) {
			var pluses = /\+/g;
			function raw(s) {return s;} function decoded(s) {return decodeURIComponent(s.replace(pluses, ' '));}
			function converted(s) {
				if (s.indexOf('"') === 0) {s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');}
				try {return config.json ? JSON.parse(s) : s;} catch (er) {} }
			var config = $.cookie = function (key, value, options) {
				if (value !== undefined) {
					options = $.extend({}, config.defaults, options);
					if (typeof options.expires === 'number') {var days = options.expires, 
						t = options.expires = new Date(); t.setDate(t.getDate() + days); }
					value = config.json ? JSON.stringify(value) : String(value);
					return (document.cookie = [
	config.raw ? key : encodeURIComponent(key),	'=', config.raw ? value : encodeURIComponent(value),
	options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '',
	options.domain ? '; domain=' + options.domain : '',	options.secure ? '; secure' : ''].join(''));}
				var decode = config.raw ? raw : decoded; var cookies = document.cookie.split('; '); var result = key ? undefined : {};
				for (var i = 0, l = cookies.length; i < l; i++) {
					var parts = cookies[i].split('='); var name = decode(parts.shift()); var cookie = decode(parts.join('='));
					if (key && key === name) {result = converted(cookie); break;} if (!key) {result[name] = converted(cookie);}}
				return result;};
			config.defaults = {};
			$.removeCookie = function (key, options) {
				if ($.cookie(key) !== undefined) {$.cookie(key, '', $.extend({}, options, {expires: -1}));return true;}return false;
			};
		})
	);
}