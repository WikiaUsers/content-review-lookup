// source https://dev.fandom.com/wiki/Countdown


;(function (module, mw, $, undefined) {
	'use strict';

	var countdowns = [];

	var NO_LEADING_ZEROS = 1,
	SHORT_FORMAT = 2,
	NO_ZEROS = 4,
	NO_SECONDS = 8,
	NO_MINUTES = 16;
	
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
		var delta, result, parts = [];
		var isShort = Boolean(countdowns[i].opts & SHORT_FORMAT);
		if (+countdowns[i].opts & NO_SECONDS) {
			delta = '';
			result = '';
		} else {
			delta = diff % 60;
			result = getUnitMessage('second', delta, isShort);
		}
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		if (+countdowns[i].opts & NO_MINUTES) {
			delta = '';
			result = '';
		} else {
			delta = diff % 60;
			result = getUnitMessage('minute', delta, isShort);
		}
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
		if (countdowns[i].opts & NO_MINUTES) {
			parts.pop();
		}
		if (parts.length) {
			if (countdowns[i].opts & SHORT_FORMAT) {
				result = parts.join(' ') + ' ' + result;
			} else if (countdowns[i].opts & NO_SECONDS) {
				result = parts.join(', ');
			} else {
				result = parts.join(', '); + ' ' + i18n.msg('and').plain() + ' ' + result;
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
		var text = node.parent().attr('data-options'),
			opts = 0;
		if (text) {
			if (/no-leading-zeros/.test(text)) {
				opts |= NO_LEADING_ZEROS;
				console.log(opts);
			}
			if (/short-format/.test(text)) {
				opts |= SHORT_FORMAT;
				console.log(opts);
			}
			if (/no-zeros/.test(text)) {
				opts |= NO_ZEROS;
			}
			if (/no-minutes/.test(text)) {
			   opts |= NO_MINUTES;
			}
			if (/no-seconds/.test(text)) {
				opts |= NO_SECONDS;
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