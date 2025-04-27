'use strict';
(function(module, mw, $){
	const translations = $.extend(true, {
		'en': {
			and: 'and',
			second: 'second',
			seconds: 'seconds',
			minute: 'minute',
			minutes: 'minutes',
			hour: 'hour',
			hours: 'hours',
			day: 'day',
			days: 'days',
		},
		'fr': {
			and: 'et',
			second: 'seconde',
			seconds: 'secondes',
			minute: 'minute',
			minutes: 'minutes',
			hour: 'heure',
			hours: 'heures',
			day: 'jour',
			days: 'jours',
		},
		'es': {
			and: 'y',
			second: 'segundo',
			seconds: 'segundos',
			minute: 'minuto',
			minutes: 'minutos',
			hour: 'hora',
			hours: 'horas',
			day: 'día',
			days: 'días',
		},
		'ca': {
			and: 'i',
			second: 'segon',
			seconds: 'segons',
			minute: 'minut',
			minutes: 'minuts',
			hour: 'hora',
			hours: 'hores',
			day: 'dia',
			days: 'dies',
		},
		'pt-br': {
			and: 'e',
			second: 'segundo',
			seconds: 'segundos',
			minute: 'minuto',
			minutes: 'minutos',
			hour: 'hora',
			hours: 'horas',
			day: 'dia',
			days: 'dias',
		},
		'de': {
			and: 'und',
			second: 'Sekunde',
			seconds: 'Sekunden',
			minute: 'Minute',
			minutes: 'Minuten',
			hour: 'Stunde',
			hours: 'Stunden',
			day: 'Tag',
			days: 'Tage',
		},
		'it': {
			and: 'e',
			second: 'secondo',
			seconds: 'secondi',
			minute: 'minuto',
			minutes: 'minuti',
			hour: 'ora',
			hours: 'ore',
			day: 'giorno',
			days: 'giorni',
		},
		'nl': {
			and: 'en',
			second: 'seconde',
			seconds: 'seconden',
			minute: 'minuut',
			minutes: 'minuten',
			hour: 'huur',
			hours: 'huren',
			day: 'dag',
			days: 'dagen',
		},
		'pl': {
			and: 'i',
			second: 'sekund(y)',
			seconds: 'sekund(y)',
			minute: 'minut(y)',
			minutes: 'minut(y)',
			hour: 'godzin(y)',
			hours: 'godzin(y)',
			day: 'dni',
			days: 'dni',
		},
		'sr': {
			and: 'i',
			second: 'sekundu',
			seconds: 'sekunde/-i',
			minute: 'minutu',
			minutes: 'minute/-a',
			hour: 'sat',
			hours: 'sata/-i',
			day: 'dan',
			days: 'dana',
		},
		'zh': {
			and: ' ',
			second: '秒',
			seconds: '秒',
			minute: '分',
			minutes: '分',
			hour: '小时',
			hours: '小时',
			day: '天',
			days: '天',
		},
		'hu': {
			and: 'és',
			second: 'másodperc',
			seconds: 'másodperc',
			minute: 'perc',
			minutes: 'perc',
			hour: 'óra',
			hours: 'óra',
			day: 'nap',
			days: 'nap',
		},
	}, module.translations || {});
	
	const i18n = translations[mw.config.get('wgContentLanguage')] || translations.en;
	const countdowns = [];
	const NO_LEADING_ZEROS = 1;
	
	function output(i, diff){
		/*jshint bitwise:false*/
		const parts = [];
		let delta = diff % 60;
		parts.unshift(delta + ' ' + i18n[delta === 1 ? 'second' : 'seconds']);
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		parts.unshift(delta + ' ' + i18n[delta === 1 ? 'minute' : 'minutes']);
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		parts.unshift(delta + ' ' + i18n[delta === 1 ? 'hour' : 'hours']);
		diff = Math.floor(diff / 24);
		parts.unshift(diff + ' ' + i18n[diff === 1 ? 'day' : 'days']);
		let result = parts.pop();
		if (countdowns[i].opts & NO_LEADING_ZEROS){
			while (parts.length && parts[0][0] === '0') {
				parts.shift();
			}
		}
		if (parts.length){
			result = parts.join(', ') + ', ' + i18n.and + ' ' + result;
		}
		countdowns[i].node.text(result);
	}
	
	function end(i){
		const c = countdowns[i].node.parent();
		switch (c.attr('data-end')) {
			case 'remove':
				c.remove();
				countdowns.splice(i, 1);
				return;
			case 'stop':
				output(i, 0);
				countdowns.splice(i, 1);
				return;
			case 'toggle':
				const toggle = c.attr('data-toggle');
				if (toggle && $(toggle).length) {
					$(toggle).css('display', 'inline');
					c.css('display', 'none');
					countdowns.splice(i, 1);
					return;
				}
				break;
			case 'callback':
				const callback = c.attr('data-callback');
				if (callback && $.isFunction(module[callback])) {
					output(i, 0);
					countdowns.splice(i, 1);
					module[callback].call(c);
					return;
				}
				break;
		}
		countdowns[i].countup = true;
		output(i, 0);
	}
	
	function update(){
		const now = Date.now();
		$.each(countdowns.slice(0), (i, countdown) => {
			const diff = Math.floor((countdown.date - now) / 1000);
			if (diff <= 0 && !countdown.countup){
				end(i);
			} else {
				output(i, Math.abs(diff));
			}
		});
		if (countdowns.length){
			window.setTimeout(() => update(), 1000);
		}
	}
	
	function getOptions(node){
		/*jshint bitwise:false*/
		const text = node.parent().attr('data-options');
		let opts = 0;
		if (text){
			if (/no-leading-zeros/.test(text)){
				opts |= NO_LEADING_ZEROS;
			}
		}
		return opts;
	}
	
	$(() => {
		const countdown = $('.countdown');
		if (!countdown.length) return;
		$('.nocountdown').css('display', 'none');
		countdown.css('display', 'inline').find('.countdowndate').each((index, element) => {
			const date = (new Date($(element).text())).valueOf();
			if (isNaN(date)){
				$(element).text('BAD DATE');
				return;
			}
			countdowns.push({
				node: $(element),
				opts: getOptions($(element)),
				date: date,
			});
		});
		if (countdowns.length){
			update();
		}
	});
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));