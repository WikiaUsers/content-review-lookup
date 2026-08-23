/* Any JavaScript here will be loaded for all users on every page load. */

/* Plays audio and shows text if object is clicked */
$(document).ready(function() {
	
	// Setup UI settings
	var uiConfig = {
		clickSoundUrl: 'https://static.wikia.nocookie.net/incredibox/images/2/2c/Clickfast.ogg/revision/latest?cb=20260803083657',
		clickSoundEnabled: true,
		showCursorPointer: true
	};
	
	// Create cache to store file URLs and track active network requests
	var audioCache = {};
	var pendingRequests = {};
	var isRedirecting = false;
	
	// Pre-load click sound
	var clickAudioCache = null;
	if (uiConfig.clickSoundEnabled && uiConfig.clickSoundUrl) {
		clickAudioCache = new Audio(uiConfig.clickSoundUrl);
		clickAudioCache.load();
		
		// Ensures audio will play on first click
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
	
	// Add custom cursor and button styles
    if (uiConfig.showCursorPointer) {
    	$('<style>')
    	.prop('type', 'text/css')
    	.html(
    		/* Applies grabbing cursor to buttons and centers content inside it */
    		'.ButtonTrigger:not([data-nograb]) {cursor: grab; cursor: -webkit-grab;}' +
    		'.ButtonTrigger:not([data-nograb]):active {cursor: grabbing; cursor: -webkit-grabbing;}' +
    		'.ButtonTrigger img {display: inline-grid; place-items: center;}' +
    		/* Disables grabbing cursor during cooldown or when deactivated */
    		'.ButtonTrigger.cooldown-active, .ButtonTrigger.disabled-switch {' +
    		'cursor: not-allowed !important;' +
    		'}'
    		)
    		.appendTo('head');
    }
    
    // Fetch wiki audio file from MediaWiki API
    function fetchAudioUrl(soundName, callback) {
    	// Return cached URL immediately if already exists
    	if (audioCache[soundName]) {
    		if (callback) callback(audioCache[soundName]);
    		return;
    	}
    	// Reuse running request if sound is loading
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
    		try {
    			var pages = apiResponse.query.pages;
    			var pageIds = Object.keys(pages);
    			// Saves found URL link if file exists
    			if (pageIds.length > 0 && pageIds[0] !== "-1" && pages[pageIds[0]].imageinfo) {
    				var targetUrl = pages[pageIds[0]].imageinfo[0].url;
    				audioCache[soundName] = targetUrl;
    				return targetUrl;
    			} else {
    				// Marks as PENSIVE to flag missing or broken files
    				audioCache[soundName] = 'PENSIVE';
    			}
    		} catch(error) {}
    		return null;
    	}).catch(function() {
    		return null;
    	});
    	
    	// Run next action once network request is done
    	if (callback) {
    		pendingRequests[soundName].then(callback);
    	}
    	
    	// Delete temporary request history once finished
    	pendingRequests[soundName].always(function() {
    		setTimeout(function() {
    			delete pendingRequests[soundName];
    		}, 0);
    	});
    }
    
    // Spawn text on screen
    function showText($clickedLink) {
    	var exampleText = $clickedLink.attr('data-text');
    	var timeDuration = Number($clickedLink.attr('data-duration') ?? 4000);
    	
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
    	
    	// Cache original button content and apply locked state styles
    	var originalText = $lockObject.data('mwBackupText') || $lockObject.text();
    	$lockObject.data('mwBackupText', originalText);
    	$lockObject.data('locked', true).addClass('cooldown-active');
    	
    	var secondsLeft = Math.ceil(durationMs / 1000);
    	var hideTimerText = $lockObject.attr('data-notext') === 'true';
    	
    	// Clear inner text and display countdown text
    	if (!hideTimerText) {
    		var $preserved = $lockObject.children().detach();
    		$lockObject.text(secondsLeft + 's').prepend($preserved);
    	}
    	
    	// Start countdown
    	var countdownInterval = setInterval(function() {
    		secondsLeft--;
    		
    		// Skip early if skip flag is triggered from somwhere else
    		if ($lockObject.data('skipCooldown')) {
    			clearInterval(countdownInterval);
    			$lockObject.text(originalText);
    			$lockObject.removeClass('cooldown-active');
    			$lockObject.removeData('skipCooldown locked activeInterval');
    			if (afterLock) afterLock();
    			return;
    		}
    		
    		// Update countdown text if time remains
    		if (secondsLeft > 0) {
    			if (!hideTimerText) {
    				var $preserved = $lockObject.children().detach();
    				$lockObject.text(secondsLeft + 's').prepend($preserved);
    			}
    		} else {
    			// Unlock button and clear interval loop
    			clearInterval(countdownInterval);
    			$lockObject.text(originalText);
    			$lockObject.removeClass('cooldown-active');
    			$lockObject.removeData('locked activeInterval');
    			if (afterLock) afterLock();
    		}
    	}, 1000);
    	$lockObject.data('activeInterval', countdownInterval);
    	return true;
    }
    
    // Play click sound if enabled
    if (uiConfig.clickSoundEnabled && clickAudioCache) {
    	clickAudioCache.currentTime = 0;
    	clickAudioCache.play().catch(function(){});
    }
    
    // Decides whether to play sound, show text or redirect
    function handleLinkAction(event, $clickedLink) {
    	// Read how long button is supposed to stay locked from attributes
    	var timeDuration = parseInt($clickedLink.attr('data-duration'), 10);
    	if (isNaN(timeDuration)) timeDuration = $clickedLink.attr('data-duration') === '0' ? 0 : 4000;
    	// If button is already locked or downloading sound, ignore click
    	if (timeDuration !== 0 && ($clickedLink.data('locked') || $clickedLink.data('fetching'))) {
    		return;
    	}
    	// Ignore click if button is disabled
    	if ($clickedLink.hasClass('disabled-switch')) return;
    	// Get audio and redirect link from button
    	var soundName = $clickedLink.attr('data-audio');
    	var destination = $clickedLink.attr('data-link');
    	
    	// Get custom page redirect delay time if set up
    	var timeDelay = $clickedLink.attr('data-delay') ? parseInt($clickedLink.attr('data-delay'), 10) : null;
    	var targetUrl = destination ? mw.util.getUrl(destination) : null;
    	let timeoutId;
    	// Stop browser from instantly changing pages before animations finishes
    	if (soundName || targetUrl) {
    		event.preventDefault();
    	}
    	
    	// Reset button data states and handles optional page redirection
    	var cleanUpAndRedirect = function() {
    		// Stop any countdown timers on button
    		var activeInterval = $clickedLink.data('activeInterval');
    		if (activeInterval) clearInterval(activeInterval);
    		
    		// Stop any safety timer on button
    		var safetyTimeout = $clickedLink.data('safetyTimeout');
    		if (safetyTimeout) clearTimeout(safetyTimeout);
    		
    		// Put normal text and styles back on button
    		$clickedLink.text($clickedLink.data('mwBackupText') || $clickedLink.text());
    		$clickedLink.removeClass('cooldown-active');
    		// Clear out all leftover timer data from memory
    		$clickedLink.removeData('skipCooldown locked activeInterval safetyTimeout');
    		// Redirect to webpage link if there is one
    		if (targetUrl) {
    			window.location.href = targetUrl;
    		}
    	};
    	
    	// If button has sound
    	if (soundName) {
    		// Spawn text on screen
    		showText($clickedLink);
    		// If there is a countdown duration, lock button and start timer
    		if (timeDuration !== 0) {
    			$clickedLink.data('fetching', true);
    			cooldown($clickedLink, timeDuration, (targetUrl && timeDelay === null) ? cleanUpAndRedirect : null);
    		}
    		
    		var nativeTrack = new Audio();
    		// Fetch sound link from wiki server
    		fetchAudioUrl(soundName, function(audioUrl) {
    			$clickedLink.removeData('fetching');
    			// If sound file is missing or broken, stop everything and reset
    			if (!audioUrl || audioUrl === 'PENSIVE') {
    				if (timeDuration !== 0) cleanUpAndRedirect();
    				return;
    			}
    			
    			nativeTrack.src = audioUrl;
    			
    			// Start playing audio file
    			nativeTrack.play().then(function() {
    				if (timeDuration !== 0) {
    					if (timeDelay !== null) {
    						// Wait for custom delay time before resetting or leaving page
    						timeoutId = setTimeout(cleanUpAndRedirect, timeDelay);
    						$clickedLink.data('safetyTimeout', timeoutId);
    					} else {
    						// Automatically reset or leave page once audio finishes playing
    						nativeTrack.onended = cleanUpAndRedirect;
    						// Fallback timer in case audio gets stuck or fails to end
    						var safetyId = setTimeout(cleanUpAndRedirect, (timeDuration === 0 ? 6000 : timeDuration + 2000));
    						$clickedLink.data('safetyTimeout', safetyId);
    					}
    				}
    			}).catch(function() {
    				// If audio does not play, reset the button
    				if (timeDuration !== 0) {
    					$clickedLink.data('skipCooldown', true);
    					cleanUpAndRedirect();
    				} else {
    					if (targetUrl) cleanUpAndRedirect();
    				}
    			});
    		});
    	} else if (targetUrl) {
    		// If button does not have sound and only a link
    		if (timeDuration !== 0) {
    			cooldown($clickedLink, timeDuration, (timeDelay === null) ? cleanUpAndRedirect : null);
    		}
    		if (timeDelay !== null) {
    			timeoutId = setTimeout(cleanUpAndRedirect, timeDelay);
    			$clickedLink.data('safetyTimeout', timeoutId);
    		} else if (timeDuration === 0) {
    			cleanUpAndRedirect();
    		}
    	} else {
    		// If button only has text
    		if (timeDuration !== 0) {
    			cooldown($clickedLink, timeDuration, (timeDelay !== null) ? cleanUpAndRedirect : null);
    		}
    		showText($clickedLink);
    		if (timeDelay !== null && timeDuration === 0) {
    			setTimeout(cleanUpAndRedirect, timeDelay);
    		}
    	}
    }
    
    // Watch for mouse clicks using this class name
    function setupButtonTriggers(elementSelector) {
    	$(document).off('click.buttonTrigger', elementSelector).on('click.buttonTrigger', elementSelector, function(event) {
    		handleLinkAction(event, $(this));
    	});
    }
    
    // Toggle buttons on or off together and change their opacity
    function toggleButtonTriggers(selector, shouldDisable) {
    	$(selector).each(function() {
    		var $el = $(this);
    		if (shouldDisable) {
    			// Fade button out and mark it disabled
    			$el.addClass('disabled-switch').css('opacity', '0.5');
    			if ($el.data('locked')) {
    				$el.data('skipCooldown', true);
    			}
    		} else {
    			// Brighten button back up and make it clickable
    			$el.removeClass('disabled-switch').css('opacity', '1');
    			$el.removeData('skipCooldown');
    		}
    	});
    }
    
    // Start script by activating button triggers immediately
    setupButtonTriggers('.ButtonTrigger');
    
    // Swap the toggle button when clicked
    $(document).on('click', '#mute-toggle', function() {
    	var $toggleBtn = $(this);
    	// Save toggle button default words to restore it later
    	if (!$toggleBtn.data('originalToggleText')) {
    		$toggleBtn.data('originalToggleText', $toggleBtn.html());
    	}
    	// Flip toggle switch state
    	var state = $toggleBtn.data('disabled-state') === true;
    	state = !state;
    	$toggleBtn.data('disabled-state', state);
    	// Apply toggle to all buttons
    	toggleButtonTriggers('.ButtonTrigger', state);
    	// Change words on the mute switch depending on its current mode
    	if (state) {
    		$toggleBtn.text("Enable Buttons");
    	} else {
    		$toggleBtn.html($toggleBtn.data('originalToggleText'));
    	}
    });
});