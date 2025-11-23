/**
 * Script: CountdownScroller
 * Author: Marisa1980
 * Description: Create a dynamic countdown clock with scrolling effect
 * Other: This script can not run on mobile site
**/

// IMPORT CSS
importArticle({
	type: 'style',
	article: 'u:dev:MediaWiki:CountdownScroller.css',
});

(function() {
	// PAD A NUMBER WITH A LEADING ZERO TO A LENGTH OF 2
	function pad2(n) {
		return String(n).padStart(2, '0');
	}
	
	// PAD A NUMBER WITH A LEADING ZERO TO A LENGTH OF 3
	function pad3(n) {
		return String(n).padStart(3, '0');
	}
	
	// CREATE SINGLE DIGIT
	function createDigit(range) {
		var digit = document.createElement("div");
		digit.className = "countdown-scroller__digit";
		var strip = document.createElement("div");
		strip.className = "countdown-scroller__digit-strip";
		
		// Add numbers twice to allow for smooth carousel effect
		for (var i = 0; i < range; i++) {
			var d = document.createElement("div");
			d.textContent = i;
			strip.appendChild(d);
		}
		for (var i = 0; i < range; i++) {
			var d = document.createElement("div");
			d.textContent = i;
			strip.appendChild(d);
		}
		
		digit.appendChild(strip);
		return digit;
	}
	
	// CREATE TIME BLOCK WITH 2 DIGITS
	function createTimeBlock(name, range1, range2) {
		var block = document.createElement("div");
		block.className = "countdown-scroller__time-block " + name;
		block.appendChild(createDigit(range1));
		block.appendChild(createDigit(range2));
		return block;
	}
	
	// CREATE DAY BLOCK WITH 3 DIGITS
	function createDayBlock() {
		var block = document.createElement("div");
		block.className = "countdown-scroller__time-block day";
		block.appendChild(createDigit(10));
		block.appendChild(createDigit(10));
		block.appendChild(createDigit(10));
		return block;
	}
	
	// BUILD INITIAL COUNTDOWN STRUCTURE
	function buildCountdownSkeleton(container, type) {
		container.innerHTML = '';
		
		var options = container.getAttribute('data-countdown-options') || '';
		var useTextLabelDay = options.includes('time-text-day');
		var useTextLabelHms = options.includes('time-text-hms');
		
		var dayBlock = createDayBlock();
		var hourBlock = createTimeBlock("hour", 3, 10);
		var minuteBlock = createTimeBlock("minute", 6, 10);
		var secondBlock = createTimeBlock("second", 6, 10);
		
		var daySeparator = document.createElement("div");
		daySeparator.className = "countdown-scroller__separator day-separator";
		if (useTextLabelDay) daySeparator.classList.add('countdown-scroller__label');
		
		var hourSeparator = document.createElement("div");
		hourSeparator.className = "countdown-scroller__separator hour-separator";
		if (useTextLabelHms) hourSeparator.classList.add('countdown-scroller__label');
		
		var minuteSeparator = document.createElement("div");
		minuteSeparator.className = "countdown-scroller__separator minute-separator";
		if (useTextLabelHms) minuteSeparator.classList.add('countdown-scroller__label');
		
		var secondSeparator = document.createElement("div");
		secondSeparator.className = "countdown-scroller__separator second-separator";
		if (useTextLabelHms) secondSeparator.classList.add('countdown-scroller__label');
		
		container.appendChild(dayBlock);
		container.appendChild(daySeparator);
		container.appendChild(hourBlock);
		container.appendChild(hourSeparator);
		container.appendChild(minuteBlock);
		container.appendChild(minuteSeparator);
		container.appendChild(secondBlock);
		container.appendChild(secondSeparator);
		
		var digitStrips = container.querySelectorAll('.countdown-scroller__digit-strip');
		Array.prototype.forEach.call(digitStrips, function(strip) {
			strip.classList.add(type);
		});
	}
	
	// UPDATE SINGLE DIGIT FOR COUNTDOWN SCROLLING DOWN
	function setGoDownDigit(digitEl, value) {
		var height = digitEl.clientHeight || 1;
		var strip = digitEl.querySelector(".countdown-scroller__digit-strip");
		var prevValue = +digitEl.getAttribute('data-current-value');
		
		// Logic for the smooth carousel effect
		if (prevValue > value) {
			strip.style.transition = 'none';
			strip.style.transform = `translateY(-${(prevValue) * height}px)`;
			void strip.offsetWidth; // Force reflow
			strip.style.transition = 'transform 0.3s ease-in-out';
		}
		
		strip.style.transform = `translateY(-${(value) * height}px)`;
		digitEl.setAttribute('data-current-value', value);
	}
	
	// UPDATE SINGLE DIGIT FOR COUNTDOWN SCROLLING UP
	function setGoUpDigit(digitEl, value) {
		var height = digitEl.clientHeight || 1;
		var strip = digitEl.querySelector(".countdown-scroller__digit-strip");
		var prevValue = +digitEl.getAttribute('data-current-value');
		
		// Logic for smooth rollover in reversed mode
		if (prevValue < value) {
			strip.style.transition = 'none';
			strip.style.transform = `translateY(${(prevValue) * height}px)`;
			void strip.offsetWidth; // Force reflow
			strip.style.transition = 'transform 0.3s ease-in-out';
		}
		
		strip.style.transform = `translateY(${value * height}px)`;
		digitEl.setAttribute('data-current-value', value);
	}
	
	// UPDATE ENTIRE COUNTDOWN
	function updateCountdownFor(container, targetDate, type) {
		if (container.querySelector('.countdown-scroller__complete-message')) {
			return;
		}
		
		var now = new Date();
		var diff = Math.floor((targetDate - now) / 1000);
		
		var options = container.getAttribute('data-countdown-options') || '';
		var useTimeTextHms = options.includes('time-text-hms');
		var useTimeTextDay = options.includes('time-text-day');
		var noDateLeadingZero = options.includes('no-date-leading-zero');
		var noTimeLeadingZero = options.includes('no-time-leading-zero');
		
		if (diff < 0) {
			diff = 0;
		}
		
		if (diff <= 0) {
			var alreadyExpired = (targetDate < now);
			container.querySelector(".countdown-scroller__time-block.day").style.display = 'none';
			container.querySelector(".countdown-scroller__separator.day-separator").style.display = 'none';
			container.querySelector(".countdown-scroller__time-block.hour").style.display = 'flex';
			container.querySelector(".countdown-scroller__separator.hour-separator").style.display = 'block';
			container.querySelector(".countdown-scroller__time-block.minute").style.display = 'flex';
			container.querySelector(".countdown-scroller__separator.minute-separator").style.display = 'block';
			container.querySelector(".countdown-scroller__time-block.second").style.display = 'flex';
			container.querySelector(".countdown-scroller__separator.second-separator").style.display = 'block';
			
			if (useTimeTextHms) {
				container.querySelector('.countdown-scroller__separator.hour-separator').textContent = 'hours';
				container.querySelector('.countdown-scroller__separator.minute-separator').textContent = 'minutes';
				container.querySelector('.countdown-scroller__separator.second-separator').textContent = 'seconds';
			} else {
				container.querySelector('.countdown-scroller__separator.hour-separator').textContent = ':';
				container.querySelector('.countdown-scroller__separator.minute-separator').textContent = ':';
				container.querySelector('.countdown-scroller__separator.second-separator').textContent = '';
			}
			
			var digits;
			
			if (noTimeLeadingZero) {
				digits = pad2(0) + pad2(0) + pad2(0);
			} else {
				digits = pad3(0) + pad2(0) + pad2(0);
			}
			
			var digitEls = container.querySelectorAll(
				'.countdown-scroller__time-block.hour .countdown-scroller__digit,' +
				'.countdown-scroller__time-block.minute .countdown-scroller__digit,' +
				'.countdown-scroller__time-block.second .countdown-scroller__digit'
			);
			
			if (noTimeLeadingZero) {
				var hourDigitEls = container.querySelectorAll('.countdown-scroller__time-block.hour .countdown-scroller__digit');
				var minuteDigitEls = container.querySelectorAll('.countdown-scroller__time-block.minute .countdown-scroller__digit');
				var secondDigitEls = container.querySelectorAll('.countdown-scroller__time-block.second .countdown-scroller__digit');
			
				if (hourDigitEls.length === 2) hourDigitEls[0].style.display = 'none';
				if (minuteDigitEls.length === 2) minuteDigitEls[0].style.display = 'none';
				if (secondDigitEls.length === 2) secondDigitEls[0].style.display = 'none';
			} else {
				var hourDigitEls = container.querySelectorAll('.countdown-scroller__time-block.hour .countdown-scroller__digit');
				var minuteDigitEls = container.querySelectorAll('.countdown-scroller__time-block.minute .countdown-scroller__digit');
				var secondDigitEls = container.querySelectorAll('.countdown-scroller__time-block.second .countdown-scroller__digit');
			
				hourDigitEls[0].style.display = 'flex';
				minuteDigitEls[0].style.display = 'flex';
				secondDigitEls[0].style.display = 'flex';
			}
			
			Array.prototype.forEach.call(digitEls, function(d, i) {
				var char = +digits[i];
				if (type === "go-down") {
					setGoDownDigit(d, char);
				} else {
					setGoUpDigit(d, char);
				}
			});
			
			void container.offsetWidth;
			Array.prototype.forEach.call(container.querySelectorAll('.countdown-scroller__digit-strip'), function(s) {
				s.style.transition = 'transform 0.3s ease-in-out';
			});
			clearInterval(container._timer);
			
			// If data-countdown-message is used
			if (container.hasAttribute('data-countdown-message')) {
				var completeMessage = container.getAttribute('data-countdown-message');
				var messageToShow = completeMessage && completeMessage.trim().length
					? completeMessage : 'Countdown ended!';
				container.innerHTML = '<span class="countdown-scroller__complete-message">' + messageToShow + '</span>';
				console.log('Countdown ended. Message has displayed.');
			} else {
				console.log('Countdown ended.');
			}
			return;
		}
		
		var day = Math.floor(diff / (3600 * 24));
		diff -= day * 3600 * 24;
		var hour = Math.floor(diff / 3600);
		var minute = Math.floor((diff % 3600) / 60);
		var second = diff % 60;
		
		var dayStartAttr = container.getAttribute('data-countdown-date-start');
		var dayStart = (dayStartAttr !== null && dayStartAttr !== '') ? parseInt(dayStartAttr, 10) : null;
		var displayOnlyday = (dayStart !== null && day > dayStart);
		
		// Hide or show time block based on display mode
		var dayBlock = container.querySelector(".countdown-scroller__time-block.day");
		var daySeparator = container.querySelector(".countdown-scroller__separator.day-separator");
		var hourBlock = container.querySelector(".countdown-scroller__time-block.hour");
		var minuteBlock = container.querySelector(".countdown-scroller__time-block.minute");
		var secondBlock = container.querySelector(".countdown-scroller__time-block.second");
		var hourSeparator = container.querySelector('.countdown-scroller__separator.hour-separator');
		var minuteSeparator = container.querySelector('.countdown-scroller__separator.minute-separator');
		var secondSeparator = container.querySelector('.countdown-scroller__separator.second-separator');
		
		// Display day number digit
		if (displayOnlyday) {
			dayBlock.style.display = 'flex';
			daySeparator.style.display = 'block';
			hourBlock.style.display = 'none';
			minuteBlock.style.display = 'none';
			secondBlock.style.display = 'none';
			if (hourSeparator) hourSeparator.style.display = 'none';
			if (minuteSeparator) minuteSeparator.style.display = 'none';
			if (secondSeparator) secondSeparator.style.display = 'none';
			
			if (useTimeTextDay) {
				daySeparator.textContent = day === 1 ? "day" : "days";
			} else {
				daySeparator.textContent = "-";
			}
			
			var digits = pad3(day);
			var dayDigitEls = container.querySelectorAll('.countdown-scroller__time-block.day .countdown-scroller__digit');
			
			// If data-countdown-option="no-date-leading-zero" is used
			if (noDateLeadingZero) {
				dayDigitEls[0].style.display = (day < 100) ? 'none' : 'flex';
				dayDigitEls[1].style.display = (day < 10) ? 'none' : 'flex';
			} else {
				dayDigitEls[0].style.display = 'flex';
				dayDigitEls[1].style.display = 'flex';
			}
			
			Array.prototype.forEach.call(dayDigitEls, function(d, i) {
				var char = +digits[i];
				if (type === "go-down") {
					setGoDownDigit(d, char);
				} else {
					setGoUpDigit(d, char);
				}
			});
		}
		// Full countdown format
		else {
			
			// Hide day number digit when it reaches 0
			if (day > 0) {
				dayBlock.style.display = 'flex';
				daySeparator.style.display = 'block';
			} else {
				dayBlock.style.display = 'none';
				daySeparator.style.display = 'none';
			}
			
			hourBlock.style.display = 'flex';
			minuteBlock.style.display = 'flex';
			secondBlock.style.display = 'flex';
			
			if (hourSeparator) hourSeparator.style.display = 'block';
			if (minuteSeparator) minuteSeparator.style.display = 'block';
			if (secondSeparator) secondSeparator.style.display = 'block';
			
			if (useTimeTextDay) {
				daySeparator.textContent = day === 1 ? "day" : "days";
			} else {
				daySeparator.textContent = "-";
			}
			
			if (hourSeparator) {
				if (useTimeTextHms) {
					hourSeparator.textContent = hour === 1 ? "hour" : "hours";
					if (minuteSeparator) minuteSeparator.textContent = minute === 1 ? "minute" : "minutes";
					if (secondSeparator) secondSeparator.textContent = second === 1 ? "second" : "seconds";
				} else {
					hourSeparator.textContent = ":";
					if (minuteSeparator) minuteSeparator.textContent = ":";
					if (secondSeparator) secondSeparator.textContent = "";
				}
			}
			
			var digits = pad3(day) + pad2(hour) + pad2(minute) + pad2(second);
			var digitEls = container.querySelectorAll('.countdown-scroller__digit');
			
			var dayDigitEls = container.querySelectorAll('.countdown-scroller__time-block.day .countdown-scroller__digit');
			var hourDigitEls = container.querySelectorAll('.countdown-scroller__time-block.hour .countdown-scroller__digit');
			var minuteDigitEls = container.querySelectorAll('.countdown-scroller__time-block.minute .countdown-scroller__digit');
			var secondDigitEls = container.querySelectorAll('.countdown-scroller__time-block.second .countdown-scroller__digit');
			
			// If data-countdown-option="no-date-leading-zero" is used
			if (noDateLeadingZero) {
				dayDigitEls[0].style.display = (day < 100) ? 'none' : 'flex';
				dayDigitEls[1].style.display = (day < 10) ? 'none' : 'flex';
			} else {
				dayDigitEls[0].style.display = 'flex';
				dayDigitEls[1].style.display = 'flex';
			}
			
			// If data-countdown-option="no-time-leading-zero" is used
			if (noTimeLeadingZero) {
				hourDigitEls[0].style.display = (hour < 10) ? 'none' : 'flex';
				minuteDigitEls[0].style.display = (minute < 10) ? 'none' : 'flex';
				secondDigitEls[0].style.display = (second < 10) ? 'none' : 'flex';
			} else {
				hourDigitEls[0].style.display = 'flex';
				minuteDigitEls[0].style.display = 'flex';
				secondDigitEls[0].style.display = 'flex';
			}
			
			Array.prototype.forEach.call(digitEls, function(d, i) {
				var char = +digits[i];
				if (type === "go-down") {
					setGoDownDigit(d, char);
				} else {
					setGoUpDigit(d, char);
				}
			});
		}
	}
		
	// RUN THE COUNTDOWN
	mw.hook('wikipage.content').add(function($content) {
		Array.prototype.forEach.call($content.find('.countdown-scroller'), function(container) {
			
			/* Check if [data-countdown] is missing or not declared */
			var dateStr = container.getAttribute('data-countdown');
			if (!container.hasAttribute('data-countdown')) {
				console.error("[data-countdown] is not declared.");
				container.textContent = "Missing [data-countdown]";
				return;
			} else if (!dateStr || !dateStr.trim()) {
				console.error("[data-countdown] is empty. Please insert a valid date.");
				container.textContent = "Invalid countdown!";
				return;
			}
			
			/* Check if [data-countdown-type] is valid */
			var type = container.getAttribute('data-countdown-type');
			var target = new Date(dateStr);
			
			if (type !== "go-down" && type !== "go-up") {
				console.error("Invalid countdown type: [data-countdown-type] should use 'go-down' or 'go-up'.");
				container.textContent = "Invalid countdown type!";
				return;
			}
			
			/* Check if [data-countdown] is not the valid date format */
			if (isNaN(target)) {
				console.error("Invalid date:", dateStr);
				container.textContent = "Invalid date format!";
				return;
			}
			
			/* Build the countdown */
			buildCountdownSkeleton(container, type);
			updateCountdownFor(container, target, type);
			container._timer = setInterval(function() {
				updateCountdownFor(container, target, type);
			}, 1000);
		});
	});
})();