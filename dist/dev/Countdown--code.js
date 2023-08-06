// __NOWYSIWYG__
/**
 * Countdown
 *
 * @version 2.2
 *
 * @author Pecoes <https://c.fandom.com/wiki/User:Pecoes>
 * @author Asaba <https://dev.fandom.com/wiki/User:Asaba>
 *
 * Version 1 authors:
 * - Splarka <https://c.fandom.com/wiki/User:Splarka>
 * - Eladkse <https://c.fandom.com/wiki/User:Eladkse>
 *
 * documentation and examples at:
 * <https://dev.fandom.com/wiki/Countdown>
 */

/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true, importArticle:true*/

;(function (module, mw, $, undefined) {
	'use strict';

	var countdowns = [];

	var NO_LEADING_ZEROS = 1,
	SHORT_FORMAT = 2,
	NO_ZEROS = 4;
	
	var i18n;

	function getUnitMessage(unit, delta, isShort) {
		var msg = isShort ?
			(unit + '-short') :
			(delta === 1) ?
				unit :
				(unit + 's');
		var msgText = i18n.msg(msg).plain();
		if (isShort) {
		    return msgText;
		}
		return ' ' + msgText;
	}

	function output (i, diff) {
		/*jshint bitwise:false*/
		var delta, result, parts = [];
		var isShort = Boolean(countdowns[i].opts & SHORT_FORMAT);
		delta = diff % 60;
		result = getUnitMessage('second', delta, isShort);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		result = getUnitMessage('minute', delta, isShort);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		result = getUnitMessage('hour', delta, isShort);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 24);
		result = getUnitMessage('day', diff, isShort);
		parts.unshift(diff + result);
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
				result = parts.join(', ') + ' ' + i18n.msg('and').plain() + ' ' + result;
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
			if (toggle && toggle === 'next') {
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

	function init($content) {
		var countdown = $content.find('.countdown:not(.handled)');
		if (!countdown.length) return;
		$content.find('.nocountdown').css('display', 'none');
		countdown
		.css('display', 'inline')
		.find('.countdowndate')
		.each(function () {
			var $this = $(this),
				date = (new Date($this.text())).valueOf();
			if (isNaN(date)) {
				$this.text(i18n.msg('bad-date').plain());
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

	mw.hook('dev.i18n').add(function(p) {
		p.loadMessages('Countdown', {
			cacheVersion: 2
		}).then(function(p) {
			mw.hook('wikipage.content').add(function($content) {
				i18n = p;
				i18n.useUserLang();
				init($content);
			});
		});
	});
	
	importArticle({
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));