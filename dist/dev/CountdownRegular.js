/**
 * Script: CountdownRegular
 * Author: Marisa1980
 * Description: Create a dynamic countdown with regular effect
 * Other: This script can not run on mobile site
**/

// IMPORT CSS
importArticle({
	type: 'style',
	article: 'u:dev:MediaWiki:CountdownRegular.css',
});

(function () {
	// PAD A NUMBER WITH A LEADING ZERO TO A LENGTH OF 2
	function pad2(n) {
		return String(n).padStart(2, "0");
	}
	
	// PAD A NUMBER WITH A LEADING ZERO TO A LENGTH OF 3
	function pad3(n) {
		return String(n).padStart(3, "0");
	}
	
	// ESCAPE TEXT FOR HTML INSERTION
	function escapeHtml(str) {
		var tmp = document.createElement("div");
		tmp.textContent = String(str);
		return tmp.innerHTML;
	}
	
	function buildLabel(text) {
		return '<span class="countdown-regular__label">' + escapeHtml(text) + '</span>';
	}
	
	// BUILD THE HTML COUNTDOWN
	function formatCountdownHtml(day, hour, minute, second, options, displayOnlyDay) {
		var useTextHms = options.indexOf("time-text-hms") !== -1;
		var useTextDay = options.indexOf("time-text-day") !== -1;
		var noDateLeadingZero = options.indexOf("no-date-leading-zero") !== -1;
		var noTimeLeadingZero = options.indexOf("no-time-leading-zero") !== -1;
		
		var config = window.CountdownRegular || {};
		var padSize = config.dayPadding || 3;
		var dayStr = noDateLeadingZero ? String(day) : String(day).padStart(padSize, "0");
		var hourStr = noTimeLeadingZero ? String(hour) : pad2(hour);
		var minStr  = noTimeLeadingZero ? String(minute) : pad2(minute);
		var secStr  = noTimeLeadingZero ? String(second) : pad2(second);
		
		var alwaysShowDay = config.hideDay === false;
		var separatorForDay = config.daySeparator || "-";
		var separatorForHms = config.hmsSeparator || ":";
		var showDay = (day > 0 || alwaysShowDay);
		
		// Display day number digit
		if (displayOnlyDay) {
			if (useTextDay) {
				return escapeHtml(dayStr) + " " + buildLabel(day === 1 ? "day" : "days");
			}
			return escapeHtml(dayStr) + separatorForDay;
		}
		
		// Display text separator
		if (useTextDay && useTextHms) {
			var parts = [];
			if (showDay) {
				parts.push(escapeHtml(dayStr) + " " + buildLabel(day === 1 ? "day" : "days"));
			}
			parts.push(escapeHtml(hourStr) + " " + buildLabel(hour === 1 ? "hour" : "hours"));
			parts.push(escapeHtml(minStr)  + " " + buildLabel(minute === 1 ? "minute" : "minutes"));
			parts.push(escapeHtml(secStr)  + " " + buildLabel(second === 1 ? "second" : "seconds"));
			return parts.join(" ");
		}
		
		if (useTextDay && !useTextHms) {
			if (showDay) {
				return escapeHtml(dayStr) + " " + buildLabel(day === 1 ? "day" : "days") + " " +
					escapeHtml(hourStr) + separatorForHms + escapeHtml(minStr) + separatorForHms + escapeHtml(secStr);
			}
			return escapeHtml(hourStr) + separatorForHms + escapeHtml(minStr) + separatorForHms + escapeHtml(secStr);
		}
		
		if (useTextHms && !useTextDay) {
			var out = [];
			var prefix = showDay ? (escapeHtml(dayStr) + separatorForDay) : "";
			out.push(prefix + escapeHtml(hourStr) + " " + buildLabel(hour === 1 ? "hour" : "hours"));
			out.push(escapeHtml(minStr) + " " + buildLabel(minute === 1 ? "minute" : "minutes"));
			out.push(escapeHtml(secStr) + " " + buildLabel(second === 1 ? "second" : "seconds"));
			return out.join(" ");
		}
		
		// Default format
		var numericPrefix = showDay ? (escapeHtml(dayStr) + separatorForDay) : "";
		return numericPrefix + escapeHtml(hourStr) + separatorForHms + escapeHtml(minStr) + separatorForHms + escapeHtml(secStr);
	}
	
	function getTextContainer(container) {
		var el = container.querySelector('.countdown-regular__text');
		if (!el) {
			el = document.createElement('span');
			el.className = 'countdown-regular__text';
			container.appendChild(el);
		}
		return el;
	}
	
	// UPDATE THE COUNTDOWN
	function updateCountdown(container, target) {
		var now = new Date();
		var diff = Math.floor((target - now) / 1000);
		var options = container.getAttribute("data-countdown-options") || "";
		var startDayAttr = container.getAttribute("data-countdown-date-start");
		var startDay = (startDayAttr !== null && startDayAttr !== "") ? parseInt(startDayAttr, 10) : null;
		
		if (diff <= 0) {
			if (!container._countdown_completed) {
				
				var day = 0;
				var hour = 0;
				var minute = 0;
				var second = 0;
				var displayOnlyDay = false;
				
				var textEl = getTextContainer(container);
				textEl.innerHTML = formatCountdownHtml(day, hour, minute, second, options, displayOnlyDay);
				
				container._pending_completion = setTimeout(function() {
					clearInterval(container._timer);
					container._countdown_completed = true;
					var completeMessage = container.getAttribute("data-countdown-message");
					if (completeMessage === null) {
						console.log('Countdown ended.'); 
						return; 
					}
					var hasCustomContent = completeMessage.trim().length > 0;
					var messageToShow;
					var consoleMessage;
					if (hasCustomContent) {
						messageToShow = completeMessage;
						consoleMessage = 'Countdown ended. Message has displayed.';
					} else {
						messageToShow = 'Countdown ended!'; 
						consoleMessage = 'Countdown ended.';
					}
					var textEl = getTextContainer(container);
					textEl.innerHTML = '<span class="countdown-regular__complete-message">' + escapeHtml(messageToShow) + '</span>';
					console.log(consoleMessage);
				}, 100);
			}
			return;
		}
		
		if (container._pending_completion) {
			clearTimeout(container._pending_completion);
			container._pending_completion = null;
		}
		container._countdown_completed = false;
		
		var day = Math.floor(diff / 86400);
		diff -= day * 86400;
		var hour = Math.floor(diff / 3600);
		var minute = Math.floor((diff % 3600) / 60);
		var second = diff % 60;
		
		var displayOnlyDay = (startDay !== null && day > startDay);
		
		var textEl = getTextContainer(container);
		textEl.innerHTML = formatCountdownHtml(
			day, hour, minute, second, options, displayOnlyDay
		);
		
	}
	
	// INIT COUNTDOWN PROGRESS BAR
	function initCountdownProgress(scrollerElement, targetTime) {
		if (scrollerElement.dataset.countdownProgress !== 'true') return;
		
		var progressWrap = document.createElement('div');
		progressWrap.className = 'countdown-regular__progress';
		
		var progressBar = document.createElement('div');
		progressBar.className = 'countdown-regular__progress-bar';
		
		progressWrap.appendChild(progressBar);
		
		scrollerElement.prepend(progressWrap);
		
		var startAttr = scrollerElement.dataset.countdownStart;
		var startTime = startAttr ? new Date(startAttr).getTime() : Date.now();
		var totalDuration = targetTime - startTime;
		
		if (isNaN(startTime) || totalDuration <= 0) {
			progressWrap.remove();
			return;
		}
		
		if (totalDuration <= 0) {
			progressBar.style.width = '100%';
			return;
		}
		
		function updateCountdownProgress() {
			var now = Date.now();
			
			if (now >= targetTime) {
				progressBar.style.width = '100%';
				progressWrap.remove();
				return;
			}
			
			if (now <= startTime) {
				progressBar.style.width = '0%';
				requestAnimationFrame(updateCountdownProgress);
				return;
			}
			
			var elapsed = now - startTime;
			var ratio = Math.min(elapsed / totalDuration, 1);
			var config = window.CountdownRegular || {};
			var reverseProgress = config.reverseProgress === true;
			
			var finalRatio = 1 - ratio;
			if (reverseProgress) {
				finalRatio = ratio;
			}
			progressBar.style.width = (finalRatio * 100).toFixed(3) + '%';
			
			requestAnimationFrame(updateCountdownProgress);
		}
		updateCountdownProgress();
	}
	
	// RUN THE COUNTDOWN
	mw.hook("wikipage.content").add(function ($content) {
		var items = $content.find(".countdown-regular");
		Array.prototype.forEach.call(items, function (container) {
			var dateStr = container.getAttribute("data-countdown");
			container.textContent = '';
			if (!dateStr) {
				console.error("Missing [data-countdown]");
				container.textContent = "Missing data-countdown";
				return;
			}
			var target = new Date(dateStr);
			if (isNaN(target)) {
				console.error("Invalid date:", dateStr);
				container.textContent = "Invalid date!";
				return;
			}
			// initial render
			updateCountdown(container, target);
			// initial countdown progress
			initCountdownProgress(container, target.getTime());
			// periodic update
			container._timer = setInterval(function () {
				updateCountdown(container, target);
			}, 1000);
		});
	});
})();