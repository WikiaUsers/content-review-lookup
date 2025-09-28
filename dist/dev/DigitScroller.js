/**
 * Script: DigitScroller
 * Author: Marisa1980
 * Description: Create digit with scrolling effect
 * Other: This script can not run on mobile site
**/

// IMPORT CSS
importArticle({
	type: 'style',
	article: 'u:dev:MediaWiki:DigitScroller.css',
});

(function ($, mw) {
	'use strict';
	
	// FORMAT DIGIT WITH SEPARATOR
	function formatDigits(digits, separator) {
		if (!separator) return digits;
		return digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
	}
	
	// BUILD DIGIT SCROLLER
	function buildDigitScroller($el) {
		$el.removeData('digitScrollerInit').empty();
		
		var raw = $el.attr('data-number');
		if (typeof raw === 'undefined' || raw === null) {
			raw = $el.text() || '0';
		}
		
		var numStr = String(raw).replace(/[^0-9-]/g, '');
		var num = parseInt(numStr.trim(), 10);
		if (isNaN(num)) num = 0;
		
		var isNegative = num < 0;
		$el.data('isNegative', isNegative);
		
		// REMOVE LEADING ZERO, BUT KEEP "0" IF THE NUMBER IS ZERO
		var digits = Math.abs(num).toString().replace(/^0+(?!$)/, '');
		if (digits === '') digits = '0';
		
		// SEPARATOR LOGIC
		var separatorKeyword = ($el.attr('data-separator') || '').toLowerCase();
		var separatorMap = {
			'comma': ',',
			'dot': '.',
			'space': ' ',
		};
		var separatorSymbol = separatorMap[separatorKeyword] || separatorKeyword;
		var formattedDigits = formatDigits(digits, separatorSymbol);

		if (isNegative) {
			$el.append('<span class="digit-scroller__minus">-</span>');
		}
		
		for (var i = 0; i < formattedDigits.length; i++) {
			var ch = formattedDigits.charAt(i);
			
			if (ch >= '0' && ch <= '9') {
				var $digitViewport = $('<span class="digit-scroller__digit"></span>');
				var $stack = $('<span class="digit-scroller__digit-strip"></span>');
				
				if (isNegative) {
					// REVERSED ORDER (9 to 0)
					for (var d = 9; d >= 0; d--) {
						$stack.append('<div>' + d + '</div>');
					}
				} else {
					// NORMAL ORDER (0 to 9)
					for (var d = 0; d <= 9; d++) {
						$stack.append('<div>' + d + '</div>');
					}
				}
				
				$digitViewport.append($stack);
				$digitViewport.data('targetDigit', parseInt(ch, 10));
				$el.append($digitViewport);
			} else {
				var content = ch;
					if (ch === ' ') {
						content = '&nbsp;';
					}
					$el.append('<span class="digit-scroller__separator">' + content + '</span>');
			}
		}
	}
	
	// LOGIC FOR ANIMATE DIGIT SCROLLER
	function animateDigitScroller($el) {
		var isNegative = !!$el.data('isNegative');
		
		var config = (window.dev && window.dev.digitScroller) || {};
		var dirSettingPositive = config.positiveDirection || 'up';
		var dirSettingNegative = config.negativeDirection || 'down';
		
		$el.find('.digit-scroller__digit').each(function (index) {
			var $digit = $(this);
			var target = $digit.data('targetDigit') || 0;
			var $stack = $digit.find('.digit-scroller__digit-strip');
			
			var $row = $stack.children().first();
			var rowHeight = ($row.length && $row[0].getBoundingClientRect().height) || 16;
			
			var scrollDown;
			if (isNegative) {
				scrollDown = (dirSettingNegative === 'down');
			} else {
				scrollDown = (dirSettingPositive === 'down');
			}
			
			// NEGATIVE SCORE WILL SCROLL DOWN, OTHERWISE SCROLL UP
			if (scrollDown) {
				var startOffset = -9 * rowHeight;
				var finalIndex = 9 - target;
				var finalOffset = -finalIndex * rowHeight;
				
				var prevTransition = $stack.css('transition');
				$stack.css('transition', 'none');
				$stack.css('transform', 'translateY(' + startOffset + 'px)');
				
				$stack[0].getBoundingClientRect();
				
				if (prevTransition) {
					$stack.css('transition', prevTransition);
				} else {
					$stack.css('transition', '');
				}
				
				setTimeout((function ($stack, finalOffset) {
					return function () {
						$stack.css('transform', 'translateY(' + finalOffset + 'px)');
					};
				})($stack, finalOffset), index * 80 + 25);
			
			} else {
				var offsetPx = -target * rowHeight;
				
				var prevTransition = $stack.css('transition');
				if (prevTransition === 'none') {
					$stack.css('transition', '');
				}
				
				setTimeout((function ($stack, offsetPx) {
					return function () {
						$stack.css('transform', 'translateY(' + offsetPx + 'px)');
					};
				})($stack, offsetPx), index * 80);
			}
		});
	}
	
	// INITIALIZE DIGIT SCROLLER
	function initDigitScroller($container) {
		$container.find('.digit-scroller').each(function () {
			var $el = $(this);
			
			// ONLY BUILD STRUCTURE ONCE
			if ($el.data('digitScrollerInit')) return;
			$el.data('digitScrollerInit', true);
			
			buildDigitScroller($el);
			
			// OBSERVE FOR VISIBILITY
			var observer = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						animateDigitScroller($el);
						observer.unobserve(entry.target); // RUN ONCE ONLY
					}
				});
			}, { threshold: 0.2 });
			
			observer.observe($el[0]);
		});
	}
	
	// EXPOSE FOR CONSOLE
	window.runDigitScroller = function () {
		initDigitScroller($(document));
	};
	
	// LOAD SCRIPT WHEN EDITING
	mw.hook('wikipage.content').add(function ($content) {
		initDigitScroller($content);
	});
	
	// LOAD SCRIPT AFTER PAGE LOAD
	$(window).on('load', function () {
		initDigitScroller($(document));
	});
	
	// RECALCULATE POSITION ON RESIZE
	$(window).on('resize', function () {
		$('.digit-scroller').each(function () {
			animateDigitScroller($(this));
		});
	});
	
})(jQuery, mw);