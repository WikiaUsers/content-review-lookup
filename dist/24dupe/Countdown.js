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
	
	
	var countdowns = [];

	var NO_LEADING_ZEROS = 1;

    function leftPad(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }

	function output (i, diff) {
		/*jshint bitwise:false*/
		var delta, result, parts = [];
		console.log(diff);
		delta = diff % 60;
		parts.unshift("<div class='cd-digits'><span class='amount'>" + leftPad(delta, 2) + "</span><span class='units'>sec</span></div>");
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		parts.unshift("<div class='cd-digits'><span class='amount'>" + leftPad(delta, 2) + "</span><span class='units'>min</span></div>");
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		parts.unshift("<div class='cd-digits'><span class='amount'>" + leftPad(delta, 2) + "</span><span class='units'>hrs</span></div>");
		diff = Math.floor(diff / 24);
		parts.unshift("<div class='cd-digits"+ (diff >= 100 ? " wider" : "") +"'><span class='amount'>" + leftPad(diff, 2) + "</span><span class='units'>days</span></div>");
		
			while (parts.length && parts[0].indexOf(">00<") >= 0) {
				parts.shift();
			}
		
		result = parts.join('');
		
		countdowns[i].node.html(result);
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