/* Any JavaScript here will be loaded for all users on every page load. */
// Doomsday Clock (Created by Pr0tato210)
;(function (mw, document) {
	'use strict';

	/* Namespace */
	if (mw.doomsdayClock) {
		return; // prevent double-load
	}

	mw.doomsdayClock = {};

	/* Time calculations */
	function calculateTimeDiff(now, target) {
		var nowDate = new Date(now);
		var targetDate = new Date(target);
		var negative = target < now;

		if (negative) {
			var tmp = nowDate;
			nowDate = targetDate;
			targetDate = tmp;
		}

		var months = 0;
		var years = targetDate.getFullYear() - nowDate.getFullYear();
		months = years * 12;
		months += targetDate.getMonth() - nowDate.getMonth();

		if (targetDate.getDate() < nowDate.getDate()) {
			months--;
		}

		var afterMonths = new Date(nowDate);
		afterMonths.setMonth(afterMonths.getMonth() + months);

		var remainingSeconds = Math.floor((targetDate - afterMonths) / 1000);

		return {
			months: months,
			seconds: remainingSeconds,
			negative: negative
		};
	}

	function pad(num) {
		return num < 10 ? '0' + num : String(num);
	}

	function unitLabel(value, name) {
		var label = value === 1 ? name : name + 's';
		return label.toUpperCase();
	}

	/* Time Rendering */
	function render(targetDate, frozen, showDoomsday) {
		var now = Date.now();
		var diff = calculateTimeDiff(now, targetDate);

		var seconds = frozen ? 0 : Math.abs(diff.seconds);
		var months = frozen ? 0 : diff.months;

		var s = seconds % 60;
		seconds = Math.floor(seconds / 60);
		var m = seconds % 60;
		seconds = Math.floor(seconds / 60);
		var h = seconds % 24;
		var d = Math.floor(seconds / 24);

		var parts;
		
		if (frozen && showDoomsday) {
			parts = [
				{ v: 'D', l: unitLabel(0, 'month') },
				{ v: 'OO', l: unitLabel(0, 'day') },
				{ v: 'MS', l: unitLabel(0, 'hour') },
				{ v: 'DA', l: unitLabel(0, 'minute') },
				{ v: 'Y', l: unitLabel(0, 'second') }
			];
		} else {
			parts = [
				{ v: months, l: unitLabel(months, 'month') },
				{ v: d,      l: unitLabel(d, 'day') },
				{ v: h,      l: unitLabel(h, 'hour') },
				{ v: m,      l: unitLabel(m, 'minute') },
				{ v: s,      l: unitLabel(s, 'second') }
			];
		}

		var html = '<div class="ddc-display">';
		html += '<div class="ddc-numbers">';

		parts.forEach(function (p, i) {
			var displayValue = typeof p.v === 'string' ? p.v : pad(p.v);
			html += '<span class="ddc-number">' + displayValue + '</span>';
			if (i < parts.length - 1) {
				html += '<span class="ddc-sep">:</span>';
			}
		});

		html += '</div><div class="ddc-labels">';

		parts.forEach(function (p, i) {
			html += '<span class="ddc-label">' + p.l + '</span>';
			if (i < parts.length - 1) {
				html += '<span class="ddc-label-sep"></span>';
			}
		});

		html += '</div></div>';

		return html;
	}

	/* CSS Injection */
	function injectCSS() {
		if (document.getElementById('ddc-styles')) return;

		var style = document.createElement('style');
		style.id = 'ddc-styles';
		style.textContent = `
			.ddc-display { display: inline-flex; flex-direction: column; align-items: center; width: max-content; max-width: 100%; }
			.ddc-numbers { display: flex; font-size: clamp(24px, 5.6vw, 56px); font-weight: bold; font-family: DS-Digital, sans-serif; }
			.ddc-number { width: clamp(40px, 8vw, 80px); text-align: center; flex-shrink: 0; }
			.ddc-sep { width: clamp(10px, 2vw, 20px); text-align: center; flex-shrink: 0; }
			.ddc-labels { display: flex; font-size: clamp(10px, 1.6vw, 16px); font-family: DS-Digital, sans-serif; margin-top: clamp(-12px, -0.6vw, -15px); }
			.ddc-label { width: clamp(40px, 8vw, 80px); text-align: center; flex-shrink: 0; }
			.ddc-label-sep { width: clamp(10px, 2vw, 20px); flex-shrink: 0; }

			@supports (container-type: inline-size) {
				.doomsdayCountdown { container-type: inline-size; container-name: ddc-container; }
				@container ddc-container (max-width: 600px) {
					.ddc-numbers { font-size: clamp(20px, 7vw, 42px); }
					.ddc-number,
					.ddc-label { width: clamp(32px, 10vw, 64px); }
					.ddc-sep,
					.ddc-label-sep { width: clamp(8px, 2.5vw, 16px); }
					.ddc-labels { font-size: clamp(8px, 2vw, 13px); }
				}
				@container ddc-container (max-width: 400px) {
					.ddc-numbers { font-size: clamp(16px, 8vw, 32px); }
					.ddc-number,
					.ddc-label { width: clamp(24px, 12vw, 48px); }
					.ddc-sep,
					.ddc-label-sep { width: clamp(6px, 3vw, 12px); }
					.ddc-labels { font-size: clamp(7px, 2.5vw, 11px); }
				}
			}
		`;
		document.head.appendChild(style);
	}

	/* Initialization */
	function init($content) {
		injectCSS();

		var nodes = $content.querySelectorAll('.doomsdayCountdownDate');
		var clocks = [];

		nodes.forEach(function (node) {
			var date = new Date(node.textContent.trim()).valueOf();
			var nocountdown = node.closest('.doomsdayCountdown').querySelector('.noDoomsdayCountdown');
			
			if (isNaN(date)) {
				if (nocountdown) nocountdown.style.display = '';
				node.style.display = 'none';
				return;
			}

			if (nocountdown) nocountdown.style.display = 'none';
			node.style.display = '';

			clocks.push({
				node: node,
				date: date,
				frozen: false,
				renderedAtZero: false,
				flickerState: false
			});
		});

		if (!clocks.length) return;

		function tick() {
			clocks.forEach(function (c) {
				if (!c.frozen && Date.now() >= c.date) {
					c.frozen = true;
				}
				if (!c.frozen) {
					c.node.innerHTML = render(c.date, false, false);
				} else {
					c.node.innerHTML = render(c.date, true, c.flickerState);
				}
			});
		}

		// Flicker interval for frozen clocks (750ms)
		setInterval(function() {
			clocks.forEach(function(c) {
				if (c.frozen) {
					c.flickerState = !c.flickerState;
				}
			});
		}, 750);

		tick();
		setInterval(tick, 100); // Update more frequently to catch flicker changes
	}

	mw.hook('wikipage.content').add(function ($content) {
		init($content[0] || document);
	});

}(mediaWiki, document));