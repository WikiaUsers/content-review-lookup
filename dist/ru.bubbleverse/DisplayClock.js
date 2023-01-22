/* Copyright (C) 2012 Lunarity
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*jshint curly:false laxbreak:true smarttabs:true jquery:true es5:true */
/*global mediaWiki */
 
// Prevent double runs
if (!window.DisplayClockJS || typeof(window.DisplayClockJS.kill) !== 'function')
(function($, mw, window, Date) {
	"use strict";
 
	// The default emulates the old appearance
	var config = {
		format: '%2H:%2M:%2S %d %b %Y (UTC)',
		location: 'header',
		// Shannon's Sampling Theorem: Signal=1Hz, sample it at 2Hz for 100% accuracy
		interval: 500,
		monofonts: "Consolas, 'Lucida Console', monospace",
		hoverText: "Очистить и обновить кэш"
	};
	// Config comes in 2 flavours: Backwards compat raw format string and object conf.
	if ($.isPlainObject(window.DisplayClockJS)) {
		$.extend(config, window.DisplayClockJS);
	} else if (window.DisplayClockJS) {
		config.format = window.DisplayClockJS;
	}
	window.DisplayClockJS = config;
 
	// We need mw.util to build this so it's created later on.
	var $link;
 
	// Day names are available from MediaWiki:Monday, Mon.
	// We can bulk AJAX all of them but I really don't want to do that.
 
	// NOTE: Index 0 of these arrays are an empty string, hence the slice
	// NOTE: These are Wiki Content Language months, not user language
	var printDateFormatted = makePrintDateFormatted(
		mw.config.get('wgMonthNames').slice(1),
		mw.config.get('wgMonthNamesShort').slice(1)
	);
	var clockInterval = null;
 
	// Public function to remove the clock from the UI
	function killClock() {
		if (clockInterval !== null) {
			window.clearInterval(clockInterval);
			clockInterval = null;
			$('#DisplayClockJS').remove();
		}
		delete config.kill;
	}
	config.kill = $.noop;
 
	var startUp = function($) {
		// Prevent double runs and avoid two clocks at once.
		if ($('#DisplayClockJS, #displayTimer, #showdate').length) return;
 
		var $parent, css, mode = 'append';
		if (({oasis:1, wikia:1})[mw.config.get('skin')] === 1) {
			css = { // Common styles
				position: 'absolute',
				fontFamily: config.monofonts,
				lineHeight: 'normal'
			};
			$parent = $('#WikiHeader div.buttons');
			if ($parent.length) {
				css.top = '-1.33em';
				css.right = 0;
			} else { // Try an edit page
				$parent = $('#EditPageHeader');
				if ($parent.length) (function($, $parent, css) {
					var $sibling = $parent.find('#HelpLink'),
					    $container = $sibling.offsetParent(), // Should be === $parent
					    offset = $sibling.position(); // WARN: Reflow
					if (!offset) offset = { left: $container.innerWidth() };
					// Position ourself a few px left of the HelpLink
					offset = $container.innerWidth() - offset.left + 10;
					// In case the Help Link is missing for some reason...
					$sibling = $sibling.find('a').add($parent.find('#NotificationsLink > a'));
					// Don't try to purge an edit page
					$link.removeAttr('href').removeAttr('title');
					// More CSS rules
					css.right = offset + 'px';
					css.top = '5px';
					css.fontSize = '11px';
					// For consistency, match color with header
					css.color = $sibling.css('color');
				})($, $parent, css);
			}
		} else {
			$parent = $('#p-personal > .pBody > ul');
			css = {
				textTransform: 'none',
				fontFamily: config.monofonts
			};
			mode = 'prepend';
		}
 
		// Unable to find any acceptable attachment point
		if (!$parent.length) {
			if (window.console) window.console.error('DISPLAYCLOCK: Failed to attach to page!');
			return;
		}
 
		// Attach everything
		$link.css(css);
		var $node = ($parent.is('ul') ? $(document.createElement('li')).append($link) : $link);
		$parent[mode]($node.prop('id', 'DisplayClockJS'));
 
		// Start
		updateTime();
		// 500ms is the floor, negative or tiny values will be lifted up to 500 as
		// anything smaller than that is a waste of CPU power
		var interval = config.interval > 500 ? config.interval : 500;
		clockInterval = window.setInterval(updateTime, interval);
		config.kill = killClock;
	};
 
	mw.loader.using('mediawiki.util', function() {
		$link = $(document.createElement('a'))
			.prop({
				href: mw.util.wikiScript() + '?title=' + mw.util.wikiUrlencode(mw.config.get('wgPageName')) + '&action=purge',
				title: config.hoverText + ''
			})
			.data('DisplayClockJS', config) // Magic flag to help detect removal
			;
		$(startUp);
		startUp = null;
	});
 
	function updateTime() {
		// Check for removed from DOM, data is deleted when .remove() is called
		if (!$link.data('DisplayClockJS')) return killClock();
 
		var d = new Date();
		d.setMinutes(d.getMinutes() + d.getTimezoneOffset());	// To UTC
		$link.text(printDateFormatted(d, config.format + ''));
	}
 
	// Based on C strftime but without the parts we can't get at (because the JS
	// calendar functions suck)
	// NOT supported: [%a %A %b %B] %c %Z
	// POSIX Extra: %u (Monday as Day 1 instead of Sunday)
	//     %V %G %g (ISO 8601 Week/Year)
	// It also adds a 'select from list using index' feature
	// '%{Day 1;Day 2;Day 3;Day Any}d', if first day of month then 'Day 1', etc
	function makePrintDateFormatted(monthsLong, monthsShort, daysLong, daysShort) {
		/*jshint bitwise:false */
		var Cases = {
			// Double percent (insert percent char)
			'%': function() { return '%'; },
			// Day of month number (1-31)
			d: function(d) {
				var r = d.getDate();
				return { v: r, i: r - 1 };
			},
			// ISO 8601 Year, used in conjunction with %V
			G: function(d) {
				var r = d.getFullYear(), day = d.getDate(), month = d.getMonth();
				// If we're in the first 3 days of the year then we need to see if we are
				// in the ISO week of this year, or last ISO week of last year.
				if (month === 0 && day < 4) {
					day = d.getDay();
					// Sunday, Friday, Saturday means we're in last year
					if (day === 0 || day > 4) --r;
				} else if (month === 11 && day > 28) { // Last 3 days
					// If the last week is only 3 or less days long then this week is
					// actually part of next year
					// Next Year: 29=M 30=M,T 31=M,T,W
					month = d.getDay();
					if (month !== 0 && month < day - 27) ++r;
				}
				return r;
			},
			// ISO 8601 Short 2 digit Year
			g: function(d) { return Cases.G(d) % 100; },
			// Hour number (0-23)
			H: function(d) { return d.getHours(); },
			// Hour number (1-12)
			I: function(d) {
				var r = d.getHours() % 12;
				return { i: r, v: r || 12 }; // 0 becomes 12
			},
			// Day of year (1-366)
			j: function(d, ys) {
				// Calculation is 'get first day of year' subtract that from our date
				// (the result is milliseconds) then divide by ms in a day and floor.
				var r = (d - ys) / 864e5 | 0;
				return { i: r, v: r + 1 };
			},
			// Month (0-12)
			m: function(d) {
				var r = d.getMonth();
				return { i: r, v: r + 1 };
			},
			// Minute (0-59)
			M: function(d) { return d.getMinutes(); },
			// AM/PM
			p: function(d) { return d.getHours() < 12 ? 'AM' : 'PM'; },
			// Seconds (0-59)
			S: function(d) { return d.getSeconds(); },
			// Day of week (1-7) [1=Monday]
			u: function(d) {
				var r = (d.getDay() + 6) % 7;
				return { i: r, v: r + 1 };
			},
			// Week of year using Sunday as first day of week (0-53)
			U: function(d, ys) {
				// Week 0 = Everything up to first Sunday, first Sunday = Week 1
				// This is important, if first day is Sunday, there is no Week 0
				var doy = Cases.j(d, ys).i;	// Day of year
				doy += ys.getDay() || 7;
				return doy / 7 | 0;
			},
			// ISO 8601 Week (Monday is first day, Week 1 is the one with the first Thursday)
			// Range: 1-53
			V: function calculateISOWeek(d, ys) {
				var r = { v: Cases.W(d, ys) }, thurs = ys.getDay();
				if (thurs > 1 && thurs < 5) {
					// If the first day is a monday then the week count is already right.
					// If the day is Tuesday, Wednesday, Thursday then we have to correct
					// for an extra week here.
					++r.v;
				} else if (r.v === 0) {
					// Week 0 Friday / Saturday / Sunday is part of last year
					// (This recursion is safe since r.v won't be 0 again)
					r = d.getFullYear() - 1;
					return calculateISOWeek(new Date(r, 11, 31), new Date(r, 0, 1));
				}
				r.i = r.v - 1;
				return r;
			},
			// Day of week (1-7) [1=Sunday]
			w: function(d) {
				var r = d.getDay();
				return { i: r, v: r + 1 };
			},
			// Week of year using Monday as first day of week (0-53)
			W: function(d, ys) {
				var doy = Cases.j(d, ys).i;
				doy += (ys.getDay() + 6) % 7 || 7;
				return doy / 7 | 0;
			},
			// Locale dependent time string (arbitrary text)
			X: function(d) {
				return d.toLocaleTimeString();
			},
			// Locale dependent date string (arbitrary text)
			x: function(d) {
				return d.toLocaleDateString();
			},
			// Year (last 2 digits only)
			y: function(d) { return d.getFullYear() % 100; },
			// Year (Full)
			Y: function(d) { return d.getFullYear(); }
		};
 
		// Optional features that must be provided by an external data source
		if  (daysLong) {
			Cases.A = function(d) {
				return daysLong[d.getDay()];
			};
		}
		if (daysShort) {
			Cases.a = function(d) {
				return daysShort[d.getDay()];
			};
		}
		if  (monthsLong) {
			Cases.B = function(d) {
				return monthsLong[d.getMonth()];
			};
		}
		if (monthsShort) {
			Cases.b = function(d) {
				return monthsShort[d.getMonth()];
			};
		}
 
		function padString(s, l, c) {
			c = c || (typeof(s) === 'number' ? '0' : ' ');
			l = l - (s += '').length | 0; // Floor/NaN->0
			if (l <= 0) return s;
			do { // Power-of-2, max 32 iterations (run out of RAM before that)
				if ((l & 1) === 1) s = c + s;
				c += c;
			} while ((l >>>= 1) !== 0);
			return s;
		}
 
		// NOTE: This code has been profiled and optimised. It can attain 100,000+
		//	executions per second using reasonably complex format strings in Chrome.
		function printDateFormatted(date, format) {
			var regex = /%([0-9]*)(?:\{([^\}]*)\})?([A-Za-z%])/g,
			    result = '', yearstart = new Date(date.getFullYear(), 0, 1),
			    li = 0, m, list, pass, passFn,
			    cases = Cases, pad = padString, toInt = window.parseInt;
 
			while ((m = regex.exec(format)) !== null) {
				result += format.substring(li, m.index);
				li = regex.lastIndex;
 
				passFn = cases[m[3]];
				if (typeof(passFn) !== 'function') {
					result += '¿' + m[3] + '?';
					continue;
				}
				pass = passFn(date, yearstart);
 
				// Look for a 'choose' list
				if (m[2]) {
					if (typeof(pass) === 'object') {
						pass = pass.i === void 0 ? pass.v : pass.i;
					}
					if (typeof(pass) === 'number') {
						list = m[2].split(';');
						if (!(pass > -1 && pass < list.length)) pass = list.length - 1;
						pass = list[pass];
					}
				} else if (typeof(pass) === 'object') {
					pass = pass.v;
				}
				result += pad(pass, toInt(m[1], 10));
			}
			result += format.substr(li);
			return result;
		}
		return printDateFormatted;
	}
})(jQuery, mediaWiki, window, Date);