// __NOWYSIWYG__
/**
 * Countdown
 *
 * @version 2.1
 *
 * @author Pecoes <http://c.wikia.com/wiki/User:Pecoes>
 * @author Asaba <http://dev.wikia.com/wiki/User:Asaba>
 *
 * Version 1 authors:
 * - Splarka <http://c.wikia.com/wiki/User:Splarka>
 * - Eladkse <http://c.wikia.com/wiki/User:Eladkse>
 *
 * documentation and examples at:
 * <http://dev.wikia.com/wiki/Countdown>
 */

/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/

;(function (module, mw, $, undefined) {

	'use strict';

	var translations = $.extend(true, {
		// Arabic (العربية)
		ar: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Belarusian (Беларуская)
		be: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Catalan (Català)
		ca: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// German (Deutsch)
		de: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// English (English)
		en: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Greek (Ελληνικά)
		el: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Spanish (Español)
		es: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// French (Français)
		fr: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Hungarian (Magyar)
		hu: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Italian (Italiano)
		it: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Japanese (日本語)
		ja: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Malay (Bahasa Melayu)
		ms: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Dutch (Nederlands)
		nl: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Polish (Polski)
		pl: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Portuguese (Português)
		pt: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Brazilian Portuguese (Português do Brasil)
		'pt-br': {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Romanian (Română)
		ro: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Russian (русский)
		ru: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Serbian (српски језик)
		sr: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Turkish (Türkçe)
		tr: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Ukrainian (Українська)
		uk: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Vietnamese (Tiếng Việt)
		vi: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		// Chinese (中文)
		zh: {
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		},
		
		// Chinese (繁體中文)
		'zh-tw':{
			and: 'и',
			second: 'секунды',
			seconds: 'секунд',
			minute: 'минуты',
			minutes: 'минут',
			hour: 'часа',
			hours: 'часов',
			day: 'дня',
			days: 'дней'
		}
	}, module.translations || {}),
	i18n = translations[
		mw.config.get('wgContentLanguage')
	] || translations.ru;

	var countdowns = [];

	var NO_LEADING_ZEROS = 1;

	function output (i, diff) {
		/*jshint bitwise:false*/
		var delta, result, parts = [];
		delta = diff % 60;
		parts.unshift(delta + ' ' + i18n[delta === 1 ? 'second' : 'seconds']);
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		parts.unshift(delta + ' ' + i18n[delta === 1 ? 'minute' : 'minutes']);
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		parts.unshift(delta + ' ' + i18n[delta === 1 ? 'hour'   : 'hours'  ]);
		diff = Math.floor(diff / 24);
		parts.unshift(diff  + ' ' + i18n[diff  === 1 ? 'day'    : 'days'   ]);
		result = parts.pop();
		if (countdowns[i].opts & NO_LEADING_ZEROS) {
			while (parts.length && parts[0][0] === '0') {
				parts.shift();
			}
		}
		if (parts.length) {
			result = parts.join(', ') + ' ' + i18n.and + ' ' + result;
		}
		countdowns[i].node.text(result);
	}

	function end(i) {
		var c = countdowns[i].node.parent();
		switch (c.attr('data-end')) {
		case 'remove':
			c.remove();
			return true;
		case 'stop':
			output(i, 0);
			return true;
		case 'toggle':
			var toggle = c.attr('data-toggle');
			if (toggle && $(toggle).length) {
				$(toggle).css('display', 'inline');
				c.css('display', 'none');
				return true;
			}
			break;
		case 'callback':
			var callback = c.attr('data-callback');
			if (callback && $.isFunction(module[callback])) {
				output(i, 0);
				module[callback].call(c);
				return true;
			}
			break;
		}
		countdowns[i].countup = true;
		output(i, 0);
		return false;
	}

	function update () {
		var now = Date.now();
		var countdownsToRemove = [];
		$.each(countdowns.slice(0), function (i, countdown) {
			var diff = Math.floor((countdown.date - now) / 1000);
			if (diff <= 0 && !countdown.countup) {
				if (end(i)) countdownsToRemove.push(i);
			} else {
				output(i, Math.abs(diff));
			}
		});
		var x;
		while((x = countdownsToRemove.pop()) !== undefined) {
			countdowns.splice(x, 1);
		}
		if (countdowns.length) {
			window.setTimeout(function () {
				update();
			}, 1000);
		}
	}

	function getOptions (node) {
		/*jshint bitwise:false*/
		var text = node.parent().attr('data-options'),
			opts = 0;
		if (text) {
			if (/no-leading-zeros/.test(text)) {
				opts |= NO_LEADING_ZEROS;
			}
		}
		return opts;
	}

	$(function () {
		var countdown = $('.countdown');
		if (!countdown.length) return;
		$('.nocountdown').css('display', 'none');
		countdown
		.css('display', 'inline')
		.find('.countdowndate')
		.each(function () {
			var $this = $(this),
				date = (new Date($this.text())).valueOf();
			if (isNaN(date)) {
				$this.text('BAD DATE');
				return;
			}
			countdowns.push({
				node: $this,
				opts: getOptions($this),
				date: date,
			});
		});
		if (countdowns.length) {
			update();
		}
	});

}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));