/* Modified https://dev.fandom.com/wiki/MediaWiki:Countdown/code.js */
;(function (module, mw, $) {
	'use strict';

	var countdowns = [];
	var NO_LEADING_ZEROS = 1,
	SHORT_FORMAT = 2,
	NO_ZEROS = 4;
	var i18n;

	function getUnitMessage(unit, delta, isShort) {
		var msg = isShort ? (unit + '-short') : mw.language.convertPlural(delta, [unit, unit+'s',unit+'s2']);
		var msgText = i18n.msg(msg).plain();
		return isShort ? msgText : (' ' + msgText);
	}

	function output (i, diff) {
		var delta, result, parts = [];
		var isShort = Boolean(countdowns[i].opts & SHORT_FORMAT);
		delta = diff % 60;
		parts.unshift(delta + getUnitMessage('second', delta, isShort));
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		parts.unshift(delta + getUnitMessage('minute', delta, isShort));
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		parts.unshift(delta + getUnitMessage('hour', delta, isShort));
		diff = Math.floor(diff / 24);
		parts.unshift(diff + getUnitMessage('day', diff, isShort));
		result = parts.pop();
		if (countdowns[i].opts & NO_LEADING_ZEROS) {
			while (parts.length && parts[0][0] === '0') { parts.shift(); }
		}
		if (countdowns[i].opts & NO_ZEROS) {
			parts = parts.filter(function(p) { return p[0] !== '0'; });
		}
		if (parts.length) {
			result = (countdowns[i].opts & SHORT_FORMAT) ? (parts.join(' ') + ' ' + result) : (parts.join(', ') + ' ' + i18n.msg('and').plain() + ' ' + result);
		}
		countdowns[i].node.text(result);
	}

	function end(i) {
		var c = countdowns[i].node.parent();
		var toggle = c.attr('data-toggle');
		if (c.attr('data-end') === 'toggle' && toggle === 'next') {
			c.next().css('display', 'inline');
			c.css('display', 'none');
			return true;
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
		while((x = countdownsToRemove.pop()) !== undefined) { countdowns.splice(x, 1); }
		if (countdowns.length) { window.setTimeout(update, 1000); }
	}

	function getOptions (node) {
		var text = node.parent().attr('data-options'), opts = 0;
		if (text) {
			if (/no-leading-zeros/.test(text)) opts |= NO_LEADING_ZEROS;
			if (/short-format/.test(text)) opts |= SHORT_FORMAT;
			if (/no-zeros/.test(text)) opts |= NO_ZEROS;
		}
		return opts;
	}

	function init($content) {
		var countdown = $content.find('.countdown:not(.handled)');
		
		// If no NEW countdowns, still check if we need to flip the visibility
		if (!countdown.length) {
		    if ($content.find('.countdown.handled').length) {
		        document.body.classList.add('js-active');
		    }
		    return;
		}

		$content.find('.nocountdown').css('display', 'none');
		countdown.css('display', 'inline').find('.countdowndate').each(function () {
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
			// TRIGGER 1: Flip immediately when the first countdown starts
			document.body.classList.add('js-active');
		}
	}

	// This part handles the Fandom loading dance
	mw.hook('dev.i18n').add(function(p) {
		p.loadMessages('Countdown', { cacheVersion: 2 }).then(function(p) {
			i18n = p;
			i18n.useUserLang();
			
			// Register for future content loads (AJAX/Tabs)
			mw.hook('wikipage.content').add(init);
			
			// TRIGGER 2: Run once immediately for the current page
			init(mw.util.$content || $('#mw-content-text'));
		});
	});
	
	importArticle({ article: 'u:dev:MediaWiki:I18n-js/code.js' });
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));