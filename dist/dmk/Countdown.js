// __NOWYSIWYG__
/**
 * dmkCountdown
 *
 * @version 1.0
 *
 * @author Effan R <https://dmk.fandom.com/wiki/User:Effan_R>
 *
 * Based on
 * Countdown
 * by
 * Pecoes <https://c.fandom.com/wiki/User:Pecoes>
 * Asaba <https://dev.fandom.com/wiki/User:Asaba>
 *
 * documentation and examples at:
 * <https://dmk.fandom.com/wiki/CountdownDoc>
 */

/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/

;(function (module, mw, $, undefined) {

	'use strict';

	var countdowns = [];

	var NO_LEADING_ZEROS = 1,
	SHORT_FORMAT = 2,
	NO_ZEROS = 4,
	FIRST_TWO = 8;

	function output (i, diff) {
		/*jshint bitwise:false*/
		var delta, result, parts = [];
		delta = diff % 60;
		result = ' ' + (delta === 1 ? 'second' : 'seconds');
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		result = ' ' + (delta === 1 ? 'minute' : 'minutes');
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		result = ' ' + (delta === 1 ? 'hour'   : 'hours'  );
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 24);
		result = ' ' + (diff  === 1 ? 'day'    : 'days'   );
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(diff  + result);

		if (countdowns[i].opts & NO_LEADING_ZEROS) {
			while (parts.length > 1 && parts[0][0] === '0') {
				parts.shift();
			}
		}
		if (countdowns[i].opts & NO_ZEROS) {
			parts = parts.filter(function(part) {
				return part[0] !== '0';
			});
		}
		if (countdowns[i].opts & FIRST_TWO) {
			while (parts.length > 2) {
				parts.pop();
			}
		}
		result = parts.pop();
		if (parts.length) {
			if (countdowns[i].opts & SHORT_FORMAT) {
				result = parts.join(' ') + ' ' + result;
			} else {
				result = parts.join(', ') + ' and ' + result;
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
		case 'countup':
			countdowns[i].countup = true;
			output(i, 0);
			return false;
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
		/* Stop at end (default) */
		output(i, 0);
		return true;
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
			opts = SHORT_FORMAT | NO_LEADING_ZEROS | FIRST_TWO;

		if (text) {
			if (/no-dmk/.test(text)) {
				opts = 0;
			}
			if (/no-leading-zeros/.test(text)) {
				opts |= NO_LEADING_ZEROS;
			}
			if (/short-format/.test(text)) {
				opts |= SHORT_FORMAT;
			}
			if (/long-format/.test(text)) {
				opts &= ~SHORT_FORMAT;
			}
			if (/no-zeros/.test(text)) {
				opts |= NO_ZEROS;
			}
			if (/first-two/.test(text)) {
				opts |= FIRST_TWO;
			}
			if (/full-mode/.test(text)) {
				opts &= ~FIRST_TWO;
			}
		}
		return opts;
	}

	function init() {
		var countdown = $('.dmkcountdown:not(.handled)');
		if (!countdown.length) return;
		$('.nodmkcountdown').css('display', 'none');
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

}(window.dmkCountdownTimer = window.dmkCountdownTimer || {}, mediaWiki, jQuery));