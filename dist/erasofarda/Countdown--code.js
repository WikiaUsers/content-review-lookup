// __NOWYSIWYG__
/**
 * Countdown
 *
 * @version 2.1
 *
 * @author Pecoes <https://c.wikia.com/wiki/User:Pecoes>
 * @author Asaba <https://dev.wikia.com/wiki/User:Asaba>
 *
 * Version 1 authors:
 * - Splarka <https://c.wikia.com/wiki/User:Splarka>
 * - Eladkse <https://c.wikia.com/wiki/User:Eladkse>
 *
 * documentation and examples at:
 * <https://dev.wikia.com/wiki/Countdown>
 */
 
/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/
 
;(function (module, mw, $, undefined) {
 
	'use strict';
 
	var translations = $.extend(true, {
		// Arabic (العربية)
		ar: {
			and: 'و',
			second: 'ثانية',
			seconds: 'ثواني',
			minute: 'دقيقة',
			minutes: 'دقائق',
			hour: 'ساعة',
			hours: 'ساعات',
			day: 'يوم',
			days: 'أيام'
		},
		// Belarusian (Беларуская)
		be: {
			and: 'і',
			second: 'секунда',
			seconds: 'секунд',
			minute: 'хвіліна',
			minutes: 'хвілін',
			hour: 'гадзіну',
			hours: 'гадзін',
			day: 'дзень',
			days: 'дзён'
		},
		// Catalan (Català)
		ca: {
			and: 'i',
			second: 'segon',
			seconds: 'segons',
			minute: 'minut',
			minutes: 'minuts',
			hour: 'hora',
			hours: 'hores',
			day: 'dia',
			days: 'dies'
		},
		// German (Deutsch)
		de: {
			and: 'und',
			second: 'Sekunde',
			seconds: 'Sekunden',
			minute: 'Minute',
			minutes: 'Minuten',
			hour: 'Stunde',
			hours: 'Stunden',
			day: 'Tag',
			days: 'Tage'
		},
		// English (English)
		en: {
			and: 'and',
			second: 'second',
			seconds: 'seconds',
			minute: 'minute',
			minutes: 'minutes',
			hour: 'hour',
			hours: 'hours',
			day: 'day',
			days: 'days'
		},
		// Greek (Ελληνικά)
		el: {
			and: 'και',
			second: 'δευτερόλεπτο',
			seconds: 'δευτερόλεπτα',
			minute: 'λεπτό',
			minutes: 'λεπτά',
			hour: 'ώρα',
			hours: 'ώρες',
			day: 'ημέρα',
			days: 'ημέρες'
		},
		// Spanish (Español)
		es: {
			and: 'y',
			second: 'segundo',
			seconds: 'segundos',
			minute: 'minuto',
			minutes: 'minutos',
			hour: 'hora',
			hours: 'horas',
			day: 'día',
			days: 'días'
		},
		// French (Français)
		fr: {
			and: 'et',
			second: 'seconde',
			seconds: 'secondes',
			minute: 'minute',
			minutes: 'minutes',
			hour: 'heure',
			hours: 'heures',
			day: 'jour',
			days: 'jours'
		},
		// Hungarian (Magyar)
		hu: {
			and: 'és',
			second: 'másodperc',
			seconds: 'másodperc',
			minute: 'perc',
			minutes: 'perc',
			hour: 'óra',
			hours: 'óra',
			day: 'nap',
			days: 'nap'
		},
		// Indonesia (Bahasa Indonesia)
		id: {
			and: 'dan',
			second: 'detik',
			seconds: 'detik',
			minute: 'menit',
			minutes: 'menit',
			hour: 'jam',
			hours: 'jam',
			day: 'hari',
			days: 'hari'
		},
		// Italian (Italiano)
		it: {
			and: 'e',
			second: 'secondo',
			seconds: 'secondi',
			minute: 'minuto',
			minutes: 'minuti',
			hour: 'ora',
			hours: 'ore',
			day: 'giorno',
			days: 'giorni'
		},
		// Japanese (日本語)
		ja: {
			and: '',
			second: '秒',
			seconds: '秒',
			minute: '分',
			minutes: '分',
			hour: '時間',
			hours: '時間',
			day: '日',
			days: '日'
		},
		// Malay (Bahasa Melayu)
		ms: {
			and: 'dan',
			second: 'saat',
			seconds: 'saat',
			minute: 'minit',
			minutes: 'minit',
			hour: 'jam',
			hours: 'jam',
			day: 'hari',
			days: 'hari'
		},
		// Dutch (Nederlands)
		nl: {
			and: 'en',
			second: 'seconde',
			seconds: 'seconden',
			minute: 'minuut',
			minutes: 'minuten',
			hour: 'uur',
			hours: 'uur',
			day: 'dag',
			days: 'dagen'
		},
		// Polish (Polski)
		pl: {
			and: 'i',
			second: 'sekunda',
			seconds: 'sekund(y)',
			minute: 'minuta',
			minutes: 'minut(y)',
			hour: 'godzina',
			hours: 'godzin(y)',
			day: 'dzień',
			days: 'dni'
		},
		// Portuguese (Português)
		pt: {
			and: 'e',
			second: 'segundo',
			seconds: 'segundos',
			minute: 'minuto',
			minutes: 'minutos',
			hour: 'hora',
			hours: 'horas',
			day: 'dia',
			days: 'dias'
		},
		// Brazilian Portuguese (Português do Brasil)
		'pt-br': {
			and: 'e',
			second: 'segundo',
			seconds: 'segundos',
			minute: 'minuto',
			minutes: 'minutos',
			hour: 'hora',
			hours: 'horas',
			day: 'dia',
			days: 'dias'
		},
		// Romanian (Română)
		ro: {
			and: 'și',
			second: 'secundă',
			seconds: 'secunde',
			minute: 'minut',
			minutes: 'minute',
			hour: 'oră',
			hours: 'ore',
			day: 'zi',
			days: 'zile',
		},
		// Russian (русский)
		ru: {
			and: 'и',
			second: 'секунда',
			seconds: 'секунд',
			minute: 'минута',
			minutes: 'минут',
			hour: 'час',
			hours: 'часов',
			day: 'день',
			days: 'дней'
		},
		// Serbian (српски језик)
		sr: {
			and: 'i',
			second: 'sekundu',
			seconds: 'sekunde/-i',
			minute: 'minutu',
			minutes: 'minute/-a',
			hour: 'sat',
			hours: 'sata/-i',
			day: 'dan',
			days: 'dana'
		},
		// Tagalog
		tl: {
			and: 'at',
			second: 'segundo',
			seconds: 'mga segundo',
			minute: 'minuto',
			minutes: 'mga minuto',
			hour: 'oras',
			hours: 'mga oras',
			day: 'araw',
			days: 'mga araw'
		},
		// Turkish (Türkçe)
		tr: {
			and: 've',
			second: 'saniye',
			seconds: 'saniye',
			minute: 'dakika',
			minutes: 'dakika',
			hour: 'saat',
			hours: 'saat',
			day: 'gün',
			days: 'gün'
		},
		// Ukrainian (Українська)
		uk: {
			and: 'та',
			second: 'секунда',
			seconds: 'секунд',
			minute: 'хвилина',
			minutes: 'хвилин',
			hour: 'годину',
			hours: 'годин',
			day: 'день',
			days: 'днів'
		},
		// Vietnamese (Tiếng Việt)
		vi: {
			and: 'và',
			second: 'giây',
			seconds: 'giây',
			minute: 'phút',
			minutes: 'phút',
			hour: 'giờ',
			hours: 'giờ',
			day: 'ngày',
			days: 'ngày'
		},
		// Chinese (中文)
		zh: {
			and: ' ',
			second: '秒',
			seconds: '秒',
			minute: '分',
			minutes: '分',
			hour: '小时',
			hours: '小时',
			day: '天',
			days: '天'
		},
 
		// Chinese (繁體中文)
		'zh-tw':{
			and: ' ',
			second: '秒',
			seconds: '秒',
			minute: '分',
			minutes: '分',
			hour: '小時',
			hours: '小時',
			day: '天',
			days: '天'
		},
 
		// Chinese (香港)
		'zh-hk':{
			and: ' ',
			second: '秒',
			seconds: '秒',
			minute: '分',
			minutes: '分',
			hour: '小時',
			hours: '小時',
			day: '天',
			days: '天'
		},
	}, module.translations || {}),
	i18n = translations[
		mw.config.get('wgContentLanguage')
	] || translations.en;
 
	var countdowns = [];
 
	var NO_LEADING_ZEROS = 1,
	SHORT_FORMAT = 2;
 
	function output (i, diff) {
		/*jshint bitwise:false*/
		var delta, result, parts = [];
		delta = diff % 60;
		result = ' ' + i18n[delta === 1 ? 'second' : 'seconds'];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		result = ' ' + i18n[delta === 1 ? 'minute' : 'minutes'];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		result = ' ' + i18n[delta === 1 ? 'hour'   : 'hours'  ];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 24);
		result = ' ' + i18n[diff  === 1 ? 'day'    : 'days'   ];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(diff  + result);
		result = parts.pop();
		if (countdowns[i].opts & NO_LEADING_ZEROS) {
			while (parts.length && parts[0][0] === '0') {
				parts.shift();
			}
		}
		if (parts.length) {
			if (countdowns[i].opts & SHORT_FORMAT) {
				result = parts.join(' ') + ' ' + result;
			} else {
				result = parts.join(', ') + ' ' + i18n.and + ' ' + result;
			}
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
			if (toggle && toggle == 'next') {
				c.next().css('display', 'inline');
				c.css('display', 'none');
				return true;
			}
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
			if (/short-format/.test(text)) {
				opts |= SHORT_FORMAT;
			}
		}
		return opts;
	}
 
	function init() {
		var countdown = $('.countdown:not(.handled)');
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
		countdown.addClass('handled');
		if (countdowns.length) {
			update();
		}
	}
 
	mw.hook('wikipage.content').add(init);
 
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));