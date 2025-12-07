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
	function pad2(n) { return String(n).padStart(2, '0'); }
	
	// PAD A NUMBER WITH A LEADING ZERO TO A LENGTH OF 3
	function pad3(n) { return String(n).padStart(3, '0'); }
	
	// CREATE DIGIT RANGE
	var DIGIT_RANGES = {
		d3: 10, d2: 10, d1: 10, // days
		h2: 3, // hour2
		h1: 24, // hour1, with the set of 24 digits 0-9, 0-9, 0-3
		m2: 6, m1: 10, // minutes
		s2: 6, s1: 10, // seconds
	};
	
	// DEFINE CUSTOM SEQUENCE FOR H1 STRIP SET
	var H1_SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3];
	
	// LOGIC FOR CREATING AND CONTROLLING DIGIT SCROLLER BEHAVIOR
	var DigitScroller = function(container, digitId, type) {
		var range = DIGIT_RANGES[digitId];
		var isGoUp = type === 'go-up';
		var isH1 = digitId === 'h1';
		
		var isTransitioning = false;
		var digitHeight = 0;
		var numDigits = range;
		var currentValue = 0;
		
		// Create the digit strip content
		var createSet = function() {
			var set = [];
			for (var i = 0; i < range; i++) {
				var digit = document.createElement('div');
				
				var displayValue;
				if (isH1) {
					 displayValue = isGoUp ? H1_SEQUENCE[range - 1 - i] : H1_SEQUENCE[i];
				} else {
					displayValue = isGoUp ? (range - 1 - i) : i;
				}
				
				digit.textContent = displayValue;
				set.push(digit);
			}
			return set;
		};
		
		var primarySet = createSet();
		var cloneSet = primarySet.map(function(d) {
			return d.cloneNode(true);
		});
		
		// Build the strip
		var strip = document.createElement('div');
		strip.classList.add('countdown-scroller__digit-strip');
		
		if (isGoUp) { // go-up (A then B)
			primarySet.forEach(function(d) {
				strip.appendChild(d);
			});
			cloneSet.forEach(function(d) {
				strip.appendChild(d);
			});
		} else { // go-down (B then A)
			cloneSet.forEach(function(d) {
				strip.appendChild(d);
			});
			primarySet.forEach(function(d) {
				strip.appendChild(d);
			});
		}
		
		container.appendChild(strip);
		
		// Repositioning logic
		var calculateAndApplyPosition = function(value, animate) {
			// Recalculate height if the font size has changed
			digitHeight = container.clientHeight || 48;
			
			var targetTranslateY;
			var resetTranslateY;
			var useRollOverAnimation = false;
			
			// Standard movement calculation (Target the new index in the Primary Set A) ---
			var indexInA;
			if (isH1) {
				var targetHourIndex = value;
				
				if (isGoUp) {
					 // go-up index: Index 0 is value 23, Index 23 is value 0.
					 indexInA = range - 1 - targetHourIndex;
				} else {
					 // go-down index: Index 24 is value 0, Index 47 is value 23.
					 indexInA = numDigits + targetHourIndex;
				}
			} else { // Original logic for all other digits
				if (isGoUp) {
					indexInA = numDigits - 1 - value;
				} else {
					indexInA = numDigits + value;
				}
			}
			
			targetTranslateY = -indexInA * digitHeight;
			
			// Check for rollover
			var prevValue = currentValue;
			
			// H1 rollover logic: Hour index changes from 23 to 0 (or 0 to 23 for go-up).
			if (isH1 && animate && (prevValue === range - 1 && value === 0 || prevValue === 0 && value === range - 1)) {
				
				if (!isGoUp) {
					
					// GO DOWN (23 -> 0): Animate DOWN from Index 24 to Index 23, then SNAP to Index 47.
					if (prevValue === range - 1 && value === 0) {
						
						var targetIndexInB = 0;
						targetTranslateY = -targetIndexInB * digitHeight;
						
						// Reset position is Index 24
						var resetIndex = numDigits + value;
						resetTranslateY = -resetIndex * digitHeight;
						useRollOverAnimation = true;
						
					} else if (prevValue === 0 && value === range - 1) {
						// GO DOWN (0 -> 23)
						
						// Animation target: h=23 in Clone B (Index 23)
						var targetIndexInB = numDigits - 1; // 23
						targetTranslateY = -targetIndexInB * digitHeight;
						
						// Reset target: h=23 in Primary A (Index 47)
						var resetIndex = numDigits + range - 1; // 47
						resetTranslateY = -resetIndex * digitHeight;
						useRollOverAnimation = true;
					}
					
				} else {
					// GO UP (0 -> 23): Animate UP from Index 23 to Index 24, then SNAP to Index 0.
					
					var targetIndexInB = numDigits; // 24
					targetTranslateY = -targetIndexInB * digitHeight;
					
					var resetIndex = 0;
					resetTranslateY = -resetIndex * digitHeight;
					useRollOverAnimation = true;
				}
				
			} else if (!isH1 && animate && prevValue === 0 && value === numDigits - 1) { // Original non-H1 rollover
				 
				if (!isGoUp) {
					var targetIndexInB = numDigits - 1;
					targetTranslateY = -targetIndexInB * digitHeight;
					resetTranslateY = -indexInA * digitHeight;
					useRollOverAnimation = true;
					
				} else {
					var targetIndexInB = numDigits;
					targetTranslateY = -targetIndexInB * digitHeight;
					resetTranslateY = -indexInA * digitHeight;
					useRollOverAnimation = true;
				}
			}
			
			// Apply the scroll behavior
			if (animate) {
				var duration = getComputedStyle(strip).getPropertyValue('--countdown-scroller-duration') || '0.3s';
				strip.style.transition = 'transform ' + duration + ' ease-in-out';
			} else {
				strip.style.transition = 'none';
			}
			strip.style.transform = 'translateY(' + targetTranslateY + 'px)';
			
			currentValue = value;
			container.setAttribute('data-current-value', value);
			
			// Handle seamless loop reset
			if (animate && useRollOverAnimation) {
				isTransitioning = true;
				strip.addEventListener('transitionend', function resetPosition(e) {
					if (e.target !== strip) return;
					strip.removeEventListener('transitionend', resetPosition);
					
					requestAnimationFrame(function() {
						// Instant jump back to the primary set
						strip.style.transition = 'none';
						strip.style.transform = 'translateY(' + resetTranslateY + 'px)';
						isTransitioning = false;
						
						// Re-enable transition for the next tick
						setTimeout(function() {
							var duration = getComputedStyle(strip).getPropertyValue('--countdown-scroller-duration') || '0.3s';
                            strip.style.transition = 'transform ' + duration + ' ease-in-out';
						}, 50);
					});
				}, { once: true });
			}
			if (!animate && !useRollOverAnimation) {
				setTimeout(function() {
					var duration = getComputedStyle(strip).getPropertyValue('--countdown-scroller-duration') || '0.3s';
					strip.style.transition = 'transform ' + duration + ' ease-in-out';
				}, 50);
			}
		};
		
		// Set the new digit value
		var setValue = function(value, animate) {
			if (animate === undefined) animate = true;
			
			var prevValue = currentValue;
			// Only return if the value is the same supposed to animate
			if (value === prevValue && animate) return;
			
			// Do not interrupt an active loop transition
			if (isTransitioning) return;
			
			calculateAndApplyPosition(value, animate);
		};
		
		var recalculateDigitHeight = function() {
			 calculateAndApplyPosition(currentValue, false);
		};
		
		// Initial setup
		calculateAndApplyPosition(0, false);
		
		return {
			setValue: setValue,
			recalculateDigitHeight: recalculateDigitHeight,
			strip: strip // Expose strip for opacity control
		};
	};
	
	// CREATE TIME BLOCK
	function createTimeBlock(name, digitIds) {
		var block = document.createElement("div");
		block.className = "countdown-scroller__time-block " + name;
		block.setAttribute('data-unit', name);
		
		digitIds.forEach(function(id) {
			var container = document.createElement("div");
			container.className = "countdown-scroller__digit";
			container.setAttribute('data-digit-position', id);
			block.appendChild(container);
		});
		return block;
	}
	
	// BUILD INITIAL COUNTDOWN STRUCTURE
	function buildCountdownSkeleton(container, type) {
		container.innerHTML = '';
		
		var options = container.dataset.countdownOptions || '';
		var useTextLabelDay = options.includes('time-text-day');
		var useTextLabelHms = options.includes('time-text-hms');
		
		var dayBlock = createTimeBlock("day", ["d3", "d2", "d1"]);
		var hourBlock = createTimeBlock("hour", ["h2", "h1"]);
		var minuteBlock = createTimeBlock("minute", ["m2", "m1"]);
		var secondBlock = createTimeBlock("second", ["s2", "s1"]);
		
		var daySeparator = document.createElement("span");
		daySeparator.className = "countdown-scroller__separator day-separator";
		if (useTextLabelDay) daySeparator.classList.add('countdown-scroller__label');
		
		var hourSeparator = document.createElement("span");
		hourSeparator.className = "countdown-scroller__separator hour-separator";
		if (useTextLabelHms) hourSeparator.classList.add('countdown-scroller__label');
		
		var minuteSeparator = document.createElement("span");
		minuteSeparator.className = "countdown-scroller__separator minute-separator";
		if (useTextLabelHms) minuteSeparator.classList.add('countdown-scroller__label');
		
		var secondSeparator = document.createElement("span");
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
	}
	
	// Global array to store all scroller behavior for accessing by resize handler
	var ALL_SCROLLERS = [];
	var resizeTimeout;
	
	// UPDATE ENTIRE COUNTDOWN
	function updateCountdownFor(scrollerElement) {
		var targetDateAttr = scrollerElement.dataset.countdown;
		var type = scrollerElement.dataset.countdownType || '';
		var options = scrollerElement.dataset.countdownOptions || '';
		
		var startDayGate = parseInt(scrollerElement.dataset.countdownDateStart) || Infinity;
		var isDayGated = !isNaN(startDayGate) && startDayGate !== Infinity;
		
		var targetTime = new Date(targetDateAttr).getTime();
		buildCountdownSkeleton(scrollerElement, type);
		
		var scrollerDigits = {};
		scrollerElement.querySelectorAll('.countdown-scroller__digit').forEach(function(container) {
			var id = container.dataset.digitPosition;
			var controller = DigitScroller(container, id, type);
			scrollerDigits[id] = controller;
		});
		
		ALL_SCROLLERS.push(scrollerDigits);
		
		var unitContainers = {
			days: scrollerElement.querySelector('[data-unit="day"]'),
			hours: scrollerElement.querySelector('[data-unit="hour"]'),
			minutes: scrollerElement.querySelector('[data-unit="minute"]'),
			seconds: scrollerElement.querySelector('[data-unit="second"]'),
		};
		
		var intervalId = null;
		
		var updateTime = function(optionsArray, isDayGated, startDayGate) {
			
			var useTimeTextHms = optionsArray.includes('time-text-hms');
			var useTimeTextDay = optionsArray.includes('time-text-day');
			var noDateLeadingZero = optionsArray.includes('no-date-leading-zero');
			var noTimeLeadingZero = optionsArray.includes('no-time-leading-zero');
			
			var now = new Date().getTime();
			var diff = targetTime - now;
			var isCountingDown = (type === 'go-down');
			
			var messageAttr = scrollerElement.getAttribute('data-countdown-message');
			var hasMessage = (messageAttr !== null);
			var isComplete = (diff < 0);
			
			var timeRemaining;
			
			if (isComplete) {
				clearInterval(intervalId);
				timeRemaining = 0;
				
				// If data-countdown-message is used
				if (hasMessage) {
                    var isDefaultMessage = (messageAttr.trim() === '');
                    var displayText = isDefaultMessage ? 'Countdown ended!' : messageAttr;
					
                    setTimeout(function() {
                        scrollerElement.innerHTML = '<span class="countdown-scroller__complete-message">' + displayText + '</span>';
                    }, 100);
					
                    if (!isDefaultMessage) {
						console.log('Countdown ended. Message has displayed.');
					} else {
						console.log('Countdown ended. Default message used.');
					}
                } else {
					console.log('Countdown ended. No message configured.');
				}
			} else if (isCountingDown) {
				timeRemaining = diff;
			} else {
				timeRemaining = Math.abs(diff);
			}
			
			var totalSeconds = Math.floor(timeRemaining / 1000);
			
			var d = Math.floor(totalSeconds / (60 * 60 * 24));
			var h = Math.floor((totalSeconds / (60 * 60)) % 24);
			var m = Math.floor((totalSeconds / 60) % 60);
			var s = Math.floor(totalSeconds % 60);
			
			var isGated = isDayGated && d > startDayGate;
			
			var daySeparator = scrollerElement.querySelector('.day-separator');
			var hourSeparator = scrollerElement.querySelector('.hour-separator');
			var minuteSeparator = scrollerElement.querySelector('.minute-separator');
			var secondSeparator = scrollerElement.querySelector('.second-separator');
			
			var dContainers = scrollerElement.querySelectorAll('.countdown-scroller__time-block.day .countdown-scroller__digit');
			var hContainers = scrollerElement.querySelectorAll('.countdown-scroller__time-block.hour .countdown-scroller__digit');
			var mContainers = scrollerElement.querySelectorAll('.countdown-scroller__time-block.minute .countdown-scroller__digit');
			var sContainers = scrollerElement.querySelectorAll('.countdown-scroller__time-block.second .countdown-scroller__digit');
			
			var forceSeparatorsVisible = isComplete && (messageAttr !== null);
			
			// Hide day number digit when it reaches 0
			var isDayHidden = (d === 0 && !isGated);
			
			if (unitContainers.days) unitContainers.days.style.display = (isDayHidden && !isGated) ? 'none' : 'flex';
			if (daySeparator) daySeparator.style.display = (isDayHidden && !isGated) ? 'none' : 'block';
			
			if (unitContainers.hours) unitContainers.hours.style.display = isGated ? 'none' : 'flex';
			if (unitContainers.minutes) unitContainers.minutes.style.display = isGated ? 'none' : 'flex';
			if (unitContainers.seconds) unitContainers.seconds.style.display = isGated ? 'none' : 'flex';
			
			if (unitContainers.days && daySeparator) {
				var dayText = useTimeTextDay ? (d === 1 ? 'day' : 'days') : '-';
				daySeparator.textContent = isGated ? dayText : dayText;
			}
			
			if (hourSeparator) hourSeparator.style.display = isGated ? 'none' : 'block';
			if (minuteSeparator) minuteSeparator.style.display = isGated ? 'none' : 'block';
			if (secondSeparator) secondSeparator.style.display = isGated ? 'none' : 'block';
			
			if (!isGated) {
				if (unitContainers.hours && hourSeparator) hourSeparator.textContent = useTimeTextHms ? (h === 1 ? 'hour' : 'hours') : ':';
				if (unitContainers.minutes && minuteSeparator) minuteSeparator.textContent = useTimeTextHms ? (m === 1 ? 'minute' : 'minutes') : ':';
				if (unitContainers.seconds && secondSeparator) secondSeparator.textContent = useTimeTextHms ? (s === 1 ? 'second' : 'seconds') : '';
			}
			
			// If data-countdown-option="no-time-leading-zero" is used
			if (noTimeLeadingZero) {
				var shouldHideH2 = (h < 10);
				var shouldHideM2 = (m < 10);
				var shouldHideS2 = (s < 10);
				
				var setDisplayAndValue = function() {
					var wasH2Hidden = hContainers.length >= 2 && hContainers[0].style.display === 'none';
					var wasM2Hidden = mContainers.length >= 2 && mContainers[0].style.display === 'none';
					var wasS2Hidden = sContainers.length >= 2 && sContainers[0].style.display === 'none';
					
					if (hContainers.length >= 2) {
						hContainers[0].style.display = shouldHideH2 ? 'none' : 'flex';
					}
					if (mContainers.length >= 2) {
						mContainers[0].style.display = shouldHideM2 ? 'none' : 'flex';
					}
					if (sContainers.length >= 2) {
						sContainers[0].style.display = shouldHideS2 ? 'none' : 'flex';
					}
					
					void scrollerElement.offsetWidth;
					
					var daysStr = String(d).padStart(3, '0');
					var hoursStr = pad2(h);
					var minutesStr = pad2(m);
					var secondsStr = pad2(s);
					
					var h2_val = parseInt(hoursStr.charAt(0));
					var m2_val = parseInt(minutesStr.charAt(0));
					var s2_val = parseInt(secondsStr.charAt(0));
					
					var animateH2 = !shouldHideH2 && !wasH2Hidden;
					var animateM2 = !shouldHideM2 && !wasM2Hidden;
					var animateS2 = !shouldHideS2 && !wasS2Hidden;
					
					scrollerDigits.d3 && scrollerDigits.d3.setValue(parseInt(daysStr.charAt(0)));
					scrollerDigits.d2 && scrollerDigits.d2.setValue(parseInt(daysStr.charAt(1)));
					scrollerDigits.d1 && scrollerDigits.d1.setValue(parseInt(daysStr.charAt(2)));
					
					if (isGated) return;
					
					scrollerDigits.h2 && scrollerDigits.h2.setValue(h2_val, animateH2);
					scrollerDigits.h1 && scrollerDigits.h1.setValue(h);
					
					scrollerDigits.m2 && scrollerDigits.m2.setValue(m2_val, animateM2);
					scrollerDigits.m1 && scrollerDigits.m1.setValue(parseInt(minutesStr.charAt(1)));
					
					scrollerDigits.s2 && scrollerDigits.s2.setValue(s2_val, animateS2);
					scrollerDigits.s1 && scrollerDigits.s1.setValue(parseInt(secondsStr.charAt(1)));
					
					if (hourSeparator) {
						var isHourBlockVisible = unitContainers.hours.style.display !== 'none';
						
						if (isHourBlockVisible || forceSeparatorsVisible) {
							hourSeparator.style.display = 'block';
							if (useTimeTextHms) {
								hourSeparator.textContent = (h === 1 ? 'hour' : 'hours');
							}
						} else {
							hourSeparator.style.display = 'none';
						}
					}
					if (minuteSeparator) {
						var isMinuteBlockVisible = unitContainers.minutes.style.display !== 'none';
						
						if (isMinuteBlockVisible || forceSeparatorsVisible) {
							minuteSeparator.style.display = 'block';
							if (useTimeTextHms) {
								minuteSeparator.textContent = (m === 1 ? 'minute' : 'minutes');
							}
						} else {
							minuteSeparator.style.display = 'none';
						}
					}
					if (secondSeparator) {
						var showSecondSep = useTimeTextHms || forceSeparatorsVisible;
						secondSeparator.style.display = showSecondSep ? 'block' : 'none';
					}
					
					// no-date-leading-zero
					if (noDateLeadingZero) {
						if (dContainers.length >= 3) {
							 dContainers[0].style.display = (d < 100) ? 'none' : 'flex';
							 dContainers[1].style.display = (d < 10) ? 'none' : 'flex';
						}
					} else {
						if (dContainers.length >= 3) {
							 dContainers[0].style.display = 'flex';
							 dContainers[1].style.display = 'flex';
						}
					}
				};
				requestAnimationFrame(setDisplayAndValue);
			} 
			// Full countdown format
			else {
				if (hContainers.length >= 2) hContainers[0].style.display = isGated ? 'none' : 'flex';
				if (mContainers.length >= 2) mContainers[0].style.display = isGated ? 'none' : 'flex';
				if (sContainers.length >= 2) sContainers[0].style.display = isGated ? 'none' : 'flex';
				
				if (hourSeparator) hourSeparator.style.display = isGated ? 'none' : 'block';
				if (minuteSeparator) minuteSeparator.style.display = isGated ? 'none' : 'block';
				if (secondSeparator) secondSeparator.style.display = isGated ? 'none' : 'block';
				
				var daysStr = String(d).padStart(3, '0');
				var hoursStr = pad2(h);
				var minutesStr = pad2(m);
				var secondsStr = pad2(s);
				
				scrollerDigits.d3 && scrollerDigits.d3.setValue(parseInt(daysStr.charAt(0)));
				scrollerDigits.d2 && scrollerDigits.d2.setValue(parseInt(daysStr.charAt(1)));
				scrollerDigits.d1 && scrollerDigits.d1.setValue(parseInt(daysStr.charAt(2)));
				
				if (!isGated) {
					scrollerDigits.h2 && scrollerDigits.h2.setValue(parseInt(hoursStr.charAt(0)));
					scrollerDigits.h1 && scrollerDigits.h1.setValue(h);
					
					scrollerDigits.m2 && scrollerDigits.m2.setValue(parseInt(minutesStr.charAt(0)));
					scrollerDigits.m1 && scrollerDigits.m1.setValue(parseInt(minutesStr.charAt(1)));
					
					scrollerDigits.s2 && scrollerDigits.s2.setValue(parseInt(secondsStr.charAt(0)));
					scrollerDigits.s1 && scrollerDigits.s1.setValue(parseInt(secondsStr.charAt(1)));
				}
				
				// If data-countdown-option="no-date-leading-zero" is used
				if (noDateLeadingZero) {
					if (dContainers.length >= 3) {
						 dContainers[0].style.display = (d < 100) ? 'none' : 'flex';
						 dContainers[1].style.display = (d < 10) ? 'none' : 'flex';
					}
				} else {
					if (dContainers.length >= 3) {
						 dContainers[0].style.display = 'flex';
						 dContainers[1].style.display = 'flex';
					}
				}
			}
		};
		
		updateTime(options, isDayGated, startDayGate);
		
		var diff = targetTime - new Date().getTime();
		if (diff > 0 || isDayGated) {
			intervalId = setInterval(updateTime, 1000, options, isDayGated, startDayGate);
		}
	}
	
	// DIGIT REALIGNMENT
	function handleDigitRealignment() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function() {
			ALL_SCROLLERS.forEach(function(scrollerSet) {
				for (var key in scrollerSet) {
					if (scrollerSet.hasOwnProperty(key) && scrollerSet[key] && scrollerSet[key].recalculateDigitHeight) {
						scrollerSet[key].recalculateDigitHeight();
					}
				}
			});
		}, 150);
	}
	
	window.addEventListener('resize', handleDigitRealignment);
	
	if (window.ResizeObserver) {
		var resizeObserver = new ResizeObserver(function(entries) {
			handleDigitRealignment();
		});
		
		var observationTarget = document.body || document.documentElement;
		if (observationTarget) {
			resizeObserver.observe(observationTarget);
		}
	}
	
	// RUN THE COUNTDOWN	
	mw.hook('wikipage.content').add(function ($content) {
		$content.find('.countdown-scroller').each(function() {
			var scroller = this;
			var dateStr = scroller.getAttribute('data-countdown');
			var type = scroller.getAttribute('data-countdown-type');
			var targetTime;
			
			/* Check if [data-countdown] is missing or not declared */
			if (!scroller.hasAttribute('data-countdown')) {
				console.warn("[data-countdown] is empty. Please insert a valid date.");
				scroller.textContent = "Missing [data-countdown]";
				return;
			}
			
			targetTime = new Date(dateStr).getTime();
			if (isNaN(targetTime)) {
				console.warn("Invalid date:", dateStr);
				scroller.textContent = "Invalid date format!";
				return;
			}
			
			/* Check if [data-countdown-type] is valid */
			if (type !== null && type !== "go-down" && type !== "go-up") {
				console.warn("Invalid countdown type: [data-countdown-type] should use 'go-down' or 'go-up'.");
				scroller.textContent = "Invalid countdown type!";
				return; // HALT EXECUTION
			}
			
			/* Check if [data-countdown] is not the valid date format */
			if (!dateStr || !dateStr.trim()) {
				console.warn("Invalid date:", scroller);
				scroller.textContent = "Invalid countdown!";
				return;
			}
			
			/* Build the countdown */
			setTimeout(function() {
				updateCountdownFor(scroller);
			}, 100);
		});
	});
})();