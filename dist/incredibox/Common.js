// Loads CSS page styling rules typed directly on a page
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});

/* Wait for MediaWiki and jQuery to load before running code */
window.mediaWiki.loader.using(['mediawiki.util', 'jquery']).then(function() {
/* Plays audio and shows text if object is clicked */
(function($, mw) {
	
	// Setup UI settings
	var uiConfig = {
		clickSoundUrl: 'https://static.wikia.nocookie.net/incredibox/images/2/2c/Clickfast.ogg/revision/latest?cb=20260803083657',
		clickSoundEnabled: true,
		showCursorPointer: true
	};
	
$(document).ready(function() {
	
	function playClickSound() {
		if (uiConfig.clickSoundEnabled && uiConfig.clickSoundUrl) {
			new Audio(uiConfig.clickSoundUrl).play().catch(function(){});
		}
	}
	
	// Create cache to store files while tracking downloads and page changes
	var audioCache = {};
	var pendingRequests = {};
	var isRedirecting = false;
	
	// Pre-load click sound
	var clickAudioCache = null;
	if (uiConfig.clickSoundEnabled && uiConfig.clickSoundUrl) {
		clickAudioCache = new Audio(uiConfig.clickSoundUrl);
		clickAudioCache.load();
		
		// Forces audio to play on first click
		$(document).one('touchstart click', function() {
			if (clickAudioCache) {
				clickAudioCache.volume = 0;
				clickAudioCache.play().then(function() {
					clickAudioCache.pause();
					clickAudioCache.volume = 1;
					clickAudioCache.currentTime = 0;
				}).catch(function(){});
			}
		});
	}
	
	// Add custom cursor and image centering
    if (uiConfig.showCursorPointer) {
    	$('<style>')
    	.prop('type', 'text/css')
    	.html(
    		/* Applies grabbing cursor to buttons and centers image inside it */
    		'.ButtonTrigger:not([data-nograb]), #mute-toggle:not([data-nograb]) {cursor: grab; cursor: -webkit-grab;}' +
    		'.ButtonTrigger:not([data-nograb]):active, #mute-toggle:not([data-nograb]):active {cursor: grabbing; cursor: -webkit-grabbing;}' +
    		'.ButtonTrigger img {display: inline-grid; place-items: center;}' +
    		/* Give data-nograb elements a pointer if they act as a link, otherwise default to text cursor */
    		'.ButtonTrigger[data-nograb][data-link], .ButtonTrigger[data-nograb][data-audio] {cursor: pointer;}' +
    		/* Disables grabbing cursor during cooldown or when deactivated */
    		'.ButtonTrigger.cooldown-active, .ButtonTrigger.disabled-switch {' +
    		'cursor: not-allowed !important;' +
    		'}'
    		)
    		.appendTo('head');
    }
    // Do not combine these two CSS. Otherwise, the buttons will not work propperly
    // Add button fade and timer centering
    $('<style>')
    .prop('type', 'text/css')
    .html(
    	/* Fade content colour and background */
    	'.ButtonTrigger.button-transparent {' +
    	'color: rgba(255, 255, 255, 0.35);' +
    	'opacity: 1;' +
    	'transition: color 0.95s ease-in-out, opacity 0.95s ease-in-out;' +
    	'}' +
    	/* Fade content inside button except timer */
    	'.ButtonTrigger.button-transparent *:not(.timer-anchor) {' +
    	'opacity: 0.35;' +
    	'transition: opacity 0.95s ease-in-out;' +
    	'}' +
    	/* Fades button back to normal */
    	'.ButtonTrigger {' +
    	'transition: color 0.95s ease-in-out, opacity 0.95s ease-in-out;' +
    	'}' +
    	/* Make toggle button fade when clicked */
    	'#mute-toggle.toggle-active-fade {' +
    	'opacity: 0.35;' +
    	'}' +
    	'#mute-toggle {' +
    	'transition: opacity 0.95s ease-in-out;' +
    	'}' +
    	/* Centers countdown text over html element */
    	'.timer-anchor {' +
    	'position: absolute;' +
    	'top: 50%;' +
    	'left: 50%;' +
    	'transform: translate(-50%, -50%);' +
    	'font-weight: bold;' +
    	'color: #ffffff;' +
    	'text-shadow: 1px 1px 2px rgba(0,0,0,0.8);' +
    	'pointer-events: none;' +
    	'z-index: 10;' +
    	'}'
    	)
    	.appendTo('head');
    	
    	// Fetch audio file from MediaWiki API
    	function fetchAudioUrl(soundName, callback) {
    		// Return cached URL if already exists
    		if (audioCache[soundName]) {
    			if (callback) callback(audioCache[soundName]);
    			return;
    		}
    		// Catch duplicate requests and wait for the current download to finish
    		if (pendingRequests[soundName]) {
    			if (callback) pendingRequests[soundName].then(callback);
    			return;
    		}
    		// Query wiki server to locate file path
    		pendingRequests[soundName] = $.ajax({
    			url: mw.util.wikiScript('api'),
    			data: {
    				action: 'query',
    				titles: 'File:' + soundName,
    				prop: 'imageinfo',
    				iiprop: 'url',
    				format: 'json'
    			},
    			dataType: 'json'
    			
    		}).then(function(apiResponse) {
    			var pages = apiResponse?.query?.pages;
    			var firstId = pages ? Object.keys(pages)[0] : null;
    			
    			if (firstId && firstId !== "-1" && pages[firstId]?.imageinfo?.[0]?.url) {
    				var targetUrl = pages[firstId].imageinfo[0].url;
    				// Saves found URL link if file exists
    				audioCache[soundName] = targetUrl;
    				return targetUrl;
    			}
    			
    			// Marks as PENSIVE to label missing or broken files
    			audioCache[soundName] = 'PENSIVE';
    			return 'PENSIVE';
    		}).catch(function() {
    			return null;
    		});
    		
    		// Run next action once the sound finishes downloading
    		if (callback) {
    			pendingRequests[soundName].then(callback);
    		}
    		
    		// Clear saved request once the download is complete
    		pendingRequests[soundName].always(function() {
    			delete pendingRequests[soundName];
    		});
    	}
    	
    	// Spawn text on screen
    	function showText($clickedLink) {
    		var exampleText = $clickedLink.attr('data-text');
    		var rawTextDuration = $clickedLink.attr('data-text-duration');
    		// Convert seconds to milliseconds, otherwise default to 4000ms
    		var timeDuration = rawTextDuration !== undefined ? Number(rawTextDuration) * 1000 : 4000;
    		
    		// Cancel action if there is no text to display
    		if (!exampleText) return;
    		
    		var textColor = $clickedLink.attr('data-color') || "#ffffff";
    		var borderColor = $clickedLink.attr('data-border') || "transparent";
    		var textSize = $clickedLink.attr('data-size') || "52px";
    		var $container = $('#textStack');
    		
    		// Generate text container if it does not exist
    		if (!$container.length) {
    			$container = $('<div>', {id: 'textStack'}).css({
    				'position': 'fixed',
    				'z-index': '9999',
    				'top': '63px',
    				'left': '50%',
    				'transform': 'translateX(-50%)',
    				'display': 'flex',
    				'flex-direction': 'column',
    				'align-items': 'center',
    				'gap': '13px',
    				'pointer-events': 'none',
    				'max-width': '90vw',
    				'box-sizing': 'border-box'
    			}).appendTo('body');
    		}
    		
    		// Create customizable text element
    		var $notification = $('<div>', {
    			'class': 'textCustomizability',
    			'text': exampleText
    		}).css({
    			'font-family': 'Montserrat, sans-serif',
    			'font-size': textSize,
    			'font-weight': 'bold',
    			'color': textColor,
    			'text-shadow': '-1px -1px 0 ' + borderColor + ', 1px -1px 0 ' + borderColor + ', -1px 1px 0 ' + borderColor + ', 1px 1px 0 ' + borderColor,
    			'padding': '3px 8px',
    			'text-align': 'center',
    			'word-break': 'break-word',
    			'overflow-wrap': 'break-word',
    			'max-width': '100%'
    		}).appendTo($container);
    		
    		// Delete text element when timer runs out
    		setTimeout(function() {
    			$notification.remove();
    		}, timeDuration);
    	}
    	
    	// Handles countdown timer display and locks button from being clicked
    	function cooldown($lockObject, durationMs, afterLock) {
    		if ($lockObject.data('locked')) return false;
    		
    		// Lock button and apply transparency classes instantly
    		$lockObject.data('locked', true).addClass('cooldown-active button-transparent');
    		
    		var secondsLeft = Math.ceil(durationMs / 1000);
    		var hideTimerText = $lockObject.attr('data-notext') === 'true';
    		
    		// Create anchored timer overlay inside element
    		var $timerOverlay = null;
    		if (!hideTimerText) {
    			if ($lockObject.css('position') === 'static') $lockObject.css('position', 'relative');
    			$timerOverlay = $('<span>', { 'class': 'timer-anchor', 'text': secondsLeft + 's' }).appendTo($lockObject);
    		}
    		
    		// Start countdown
    		var countdownInterval = setInterval(function() {
    			secondsLeft--;
    			
    			// Remove overlay and reset the button style if countdown ends or is cancelled
    			if ($lockObject.data('skipCooldown') || secondsLeft <= 0) {
    				clearInterval(countdownInterval);
    				
    				if ($timerOverlay) $timerOverlay.remove();
    				
    				$lockObject.removeClass('cooldown-active button-transparent');
    				$lockObject.removeData('locked activeInterval skipCooldown');
    				
    				if (afterLock) afterLock();
    			} else if ($timerOverlay) {
    				// Update anchored text numbers smoothly
    				$timerOverlay.text(secondsLeft + 's');
    			}
    		}, 1000);
    		
    		$lockObject.data('activeInterval', countdownInterval);
    		return true;
    	}
    	
    	// Decides whether to play sound, show text or redirect
    	function handleLinkAction(event, $clickedLink) {
    		var soundName = $clickedLink.attr('data-audio');
    		var destination = $clickedLink.attr('data-link');
    		
    		var rawDuration = $clickedLink.attr('data-duration');
    		// Convert seconds to milliseconds, otherwise default to 4000ms
    		var timeDuration = rawDuration !== undefined ? parseInt(rawDuration, 10) * 1000 : 4000;
    		
    		// Read custom redirect delay value and convert from seconds to ms
    		var rawDelay = $clickedLink.attr('data-delay');
    		var timeDelay = rawDelay ? parseInt(rawDelay, 10) * 1000 : null;
    		var targetUrl = destination ? mw.util.getUrl(destination) : null;
    		
    		if ($clickedLink.hasClass('disabled-switch')) return;
    		
    		// If button is already locked or downloading sound, ignore click
    		if (timeDuration !== 0 && ($clickedLink.data('locked') || $clickedLink.data('fetching'))) return;
    		
    		// Block default browser behaviour for all clicks
    		if (soundName || targetUrl) {
    			event.preventDefault();
    		}
    		
    		playClickSound();
    		
    		// Spawn text notification instantly for every click
    		var isMuteToggle = $clickedLink.is('#mute-toggle');
    		var isCurrentlyDisabled = $clickedLink.data('disabled-state') === true;
    		
    		if (!(isMuteToggle && isCurrentlyDisabled)) {
    			showText($clickedLink);
    		}
    		
    		// Allows for one button to trigger another
    		var connectedButtons = $clickedLink.attr('data-connect');
    		if (connectedButtons) {
    			// Search for chain selectors
    			var activeChain = $clickedLink.data('chainReaction') || [];
    			// Seperate strings using commas
    			var connections = connectedButtons.split(',');
    			// Loop through every connected button found
    			connections.forEach(function(item) {
    				var parts = item.trim().split(':');
    				var selector = parts[0] ? parts[0].trim() : '';
    				var delaySec = parts[1] ? parseFloat(parts[1]) : 0;
    				// Start delay if selector is found
    				if (selector) {
    					// Only trigger if selector if it's not in loop history
    					if (activeChain.indexOf(selector) === -1) {
    						// Convert seconds into milliseconds and start timer
    						setTimeout(function() {
    							var $target = $(selector);
    							var nextChain = activeChain.concat([selector]);
    							$target.data('chainReaction', nextChain);
    							$target.click();
    							$target.removeData('chainReaction');
    						}, delaySec * 1000);
    					}
    				}
    			});
    		}
    		
    		// Restore button visibility, reset data states and handle optional redirect
    		var cleanUpAndRedirect = function() {
    			var activeInterval = $clickedLink.data('activeInterval');
    			if (activeInterval) clearInterval(activeInterval);
    			
    			var safetyTimeout = $clickedLink.data('safetyTimeout');
    			if (safetyTimeout) clearTimeout(safetyTimeout);
    			
    			$clickedLink.removeClass('cooldown-active button-transparent');
    			
    			// Clear out all leftover timer data from memory
    			$clickedLink.removeData('skipCooldown locked activeInterval safetyTimeout');
    			if (targetUrl) {
    				window.location.href = targetUrl;
    			}
    		};
    		
    		// If button has sound
    		if (soundName) {
    			// If there is a countdown duration, lock button and start timer
    			if (timeDuration !== 0) {
    				$clickedLink.data('fetching', true);
    				cooldown($clickedLink, timeDuration, (targetUrl && timeDelay === null) ? cleanUpAndRedirect : null);
    			}
    			
    			var nativeTrack = new Audio();
    			
    			fetchAudioUrl(soundName, function(audioUrl) {
    				$clickedLink.removeData('fetching');
    				
    				// Reset if sound file is missing or broken
    				if (!audioUrl || audioUrl === 'PENSIVE') {
    					cleanUpAndRedirect();
    					return;
    				}
    				
    				nativeTrack.src = audioUrl;
    				
    				// Handle custom redirect delays if active
    				if (timeDelay !== null) {
    					// Start playing audio file for delayed redirect
    					nativeTrack.play().catch(function() {
    						$clickedLink.data('skipCooldown', true);
    					});
    					if ($clickedLink.data('safetyTimeout')) clearTimeout($clickedLink.data('safetyTimeout'));
    					$clickedLink.data('safetyTimeout', setTimeout(cleanUpAndRedirect, timeDelay));
    				} else {
    					// Clear any leftover safety timers
    					if ($clickedLink.data('safetyTimeout')) clearTimeout($clickedLink.data('safetyTimeout'));
    					// Set a safety fallback for instant buttons
    					var fallbackTimer = setTimeout(cleanUpAndRedirect, Math.min(timeDuration === 0 ? 6000 : timeDuration, 6000));
    					$clickedLink.data('safetyTimeout', fallbackTimer);
    					// Automatically reset button once audio finishes playing
    					nativeTrack.play().then(function() {
    						nativeTrack.onended = function() {
    							clearTimeout(fallbackTimer);
    							cleanUpAndRedirect();
    						};
    					}).catch(function() {
    						$clickedLink.data('skipCooldown', true);
    						cleanUpAndRedirect();
    					});
    				}
    			});
    		} else {
    			// If button only has text or a link //
    			if (timeDuration !== 0) cooldown($clickedLink, timeDuration, (timeDelay === null) ? cleanUpAndRedirect : null);
    			if (timeDelay !== null) $clickedLink.data('safetyTimeout', setTimeout(cleanUpAndRedirect, timeDelay));
    			else if (timeDuration === 0) cleanUpAndRedirect();
    		}
    	}
    	
    	// Toggle buttons on or off together and change their opacity
    	function toggleButtonTriggers(selector, shouldDisable) {
    		$(selector).not('#mute-toggle').each(function() {
    			var $el = $(this);
    			if (shouldDisable) {
    				// Fade button out and mark it disabled
    				$el.addClass('disabled-switch').css('opacity', '0.5');
    				if ($el.data('locked')) {
    					$el.data('skipCooldown', true);
    				}
    			} else {
    				// Brighten button back up and make it clickable
    				$el.removeClass('disabled-switch').css('opacity', '');
    				$el.removeData('skipCooldown');
    			}
    		});
    	}
    	
    	// Start script by activating button triggers once wiki content is ready
    	$(document).off('click', '.ButtonTrigger').on('click', '.ButtonTrigger', function(event) {
    		handleLinkAction(event, $(this));
    	});
    	
    	// Swap the toggle button when clicked
    	$(document).off('click', '#mute-toggle').on('click', '#mute-toggle', function(event) {
    		event.preventDefault();
    		event.stopImmediatePropagation();
    		var $toggleBtn = $(this);
    		
    		if (!$toggleBtn.hasClass('ButtonTrigger') && !$toggleBtn.data('fetching') && !$toggleBtn.data('locked')) {
    			playClickSound();
    		}
    		
    		// Check and clean current inner markup
    		var currentHtml = $toggleBtn.html() ? $toggleBtn.html().trim() : '';
    		
    		// Give default text if button starts completely empty
    		if (!currentHtml && !$toggleBtn.data('mwOriginalToggleText')) {
    			$toggleBtn.html("Mute Buttons");
    		}
    		
    		// Save toggle button default words to restore it later
    		if (!$toggleBtn.data('mwOriginalToggleText')) {
    			$toggleBtn.data('mwOriginalToggleText', $toggleBtn.html());
    		}
    		
    		// Flip toggle switch state
    		var state = $toggleBtn.data('disabled-state') === true;
    		state = !state;
    		$toggleBtn.data('disabled-state', state);
    		// Apply toggle to all buttons
    		toggleButtonTriggers('.ButtonTrigger', state);
    		// Fade the toggle button
    		$toggleBtn.toggleClass('toggle-active-fade', state).css('opacity', '');
    		
    		// Change words on the mute switch depending on current mode
    		if (state) {
    			var rawDisabledText = $toggleBtn.attr('data-disabled-text') || '';
    			var disabledPlaceholder = (mw.html && mw.html.escape) ? mw.html.escape(rawDisabledText) : '';
    			disabledPlaceholder = disabledPlaceholder || $toggleBtn.data('mwOriginalToggleText') || "Enable Buttons";
    			$toggleBtn.html(disabledPlaceholder);
    		} else {
    			$toggleBtn.html($toggleBtn.data('mwOriginalToggleText'));
    		}
    	});
});
})(window.jQuery, window.mediaWiki);
});