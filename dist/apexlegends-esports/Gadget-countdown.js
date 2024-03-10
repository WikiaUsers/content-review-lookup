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
 * 
 * Additional modifications by RheingoldRiver for the Gamepedia esports wikis
 */
 
/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/
 
;(function (module, mw, $, undefined) {
 
	'use strict';
 
	var translations = $.extend(true, {
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
			days: 'days',
			week: 'week',
			weeks: 'weeks'
		},
	}, module.translations || {}),
	i18n = translations[
		mw.config.get('wgContentLanguage')
	] || translations.en;
 
	var countdowns = [];
 
	var NO_LEADING_ZEROS = 1,
	ONE_PART_ONLY = 2,
	NO_ZEROS = 4,
	MATCHES = 8;
 
	function output (i, diff) {
		/*jshint bitwise:false*/
		var delta, result, parts = [];
		//delta = diff % 60;
		//result = ' ' + i18n[delta === 1 ? 'second' : 'seconds'];
		//if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		//parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		result = 'm';
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		result = 'h';
		parts.unshift(delta + result);
		diff = Math.floor(diff / 24);
		delta = diff % 7;
		result = 'd';
		parts.unshift(delta + result);
		diff = Math.floor(diff / 7);
		result = 'w';
		parts.unshift(diff + result);
		if (countdowns[i].opts & NO_LEADING_ZEROS) {
			while (parts.length && parts[0][0] === '0') {
				parts.shift();
			}
		}
		if (countdowns[i].opts & NO_ZEROS) {
			parts = parts.filter(function(part) {
				return part[0] !== '0';
			});
		}
		if (parts.length) {
			if (countdowns[i].opts & ONE_PART_ONLY) {
				result = parts[0];
			}
			else if (countdowns[i].opts & MATCHES) {
				if (parts[0].length == 3) {
					result = parts[0];
				}
				else {
					result = parts.slice(0,2).join('');
				}
			}
			else if (parts.length > 3) {
				result = parts.slice(0,3).join(' ');
			}
			else {
				result = parts.join(' ');
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
				if (end(i)) {
					countdownsToRemove.push(i);
				}
			}
			else if (diff <= 60) {
				countdowns[i].node.text('<1m');
			}
			else {
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
			if (/one-part-only/.test(text)) {
				opts |= ONE_PART_ONLY;
			}
			if (/no-zeros/.test(text)) {
				opts |= NO_ZEROS;
			}
			if (/matches-format/.test(text)) {
				opts |= MATCHES;
			}
		}
		return opts;
	}
 
	function toggleInit() {
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
 
	mw.hook('wikipage.content').add(toggleInit);
 
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));