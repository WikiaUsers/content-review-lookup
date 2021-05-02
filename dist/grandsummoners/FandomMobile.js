/**************
 * Countdown  *
**************/

/* Any JavaScript here will be loaded for all users on every page load. */

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
		}
	}, module.translations || {}),
	i18n = translations[
		mw.config.get('wgContentLanguage')
	] || translations.en;
 
	var countdowns = [];
 
	var NO_LEADING_ZEROS = 1,
	SHORT_FORMAT = 2,
	NO_ZEROS = 4;
 
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
		if (countdowns[i].opts & NO_ZEROS) {
			parts = parts.filter(function(part) {
				return part[0] !== '0';
			});
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
			if (/no-zeros/.test(text)) {
				opts |= NO_ZEROS;
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

// End Countdown