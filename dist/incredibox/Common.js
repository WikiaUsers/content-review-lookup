// ImportJS Configurations
// PreloadTemplates
window.preloadTemplates_subpage = "case-by-case";
// ProfileTags
(window.dev = window.dev || {}).profileTags = { noHideTags: true, };
// SpoilerTags
window.spoilerTags = { unspoil: true, selection: true, tooltip: false, };

// Add Edit CSS button to edit dropdown for eligible users
(function ($, mw) {
	'use strict';
	
	const checkUserGroups = mw.config.get('wgUserGroups') || [];
	const checkEditCount = mw.config.get('wgUserEditCount') || 0;
	if (!checkUserGroups.includes('user')) return;
	
	mw.loader.using(['mediawiki.util']).then(function () {
		mw.hook('wikipage.content').add(function () {
			try {
				$('#edit-css-button').closest('li').remove();
				// Page status and namespace checks
				if (!mw.config.get('wgIsArticle') ||
				mw.config.get('wgAction') !== 'view' ||
				![0, 4, 10, 112].includes(mw.config.get('wgNamespaceNumber'))) {
					return;
				}
				
				const $dropdownTarget = $('.page-header__actions .wds-dropdown__content .wds-list').first();
				if (!$dropdownTarget.length) return;
				const pageName = mw.config.get('wgPageName');
				
				// Create button and link elements
				let $cssButton;
				
				if (checkEditCount >= 500) {
					$cssButton = $('<li>', { class: 'wds-list__item' }).append(
						$('<a>', {
							id: 'edit-css-button',
							href: mw.util.getUrl(`${pageName}/styles.css`, { action: 'edit' }),
							class: 'wds-list__item-a',
							text: 'Edit CSS',
							accesskey: 'c',
						})
					);
				} else {
					$cssButton = $('<li>', { class: 'wds-list__item' }).append(
						$('<a>', {
							id: 'edit-css-button',
							class: 'wds-list__item-a wds-is-disabled',
							text: 'Edit CSS (Locked)',
							title: `Requires 500 edits. You currently have ${checkEditCount}.`,
							style: 'cursor: not-allowed; pointer-events: auto !important;',
						})
					);
				}
				
				// Insert after Edit source or fallback to top of dropdown
				const $sourceButton = $dropdownTarget.find('a[data-tracking="edit-source"], a:contains("Edit source")').closest('li');
				if ($sourceButton.length) {
					$sourceButton.after($cssButton);
				} else {
					$dropdownTarget.prepend($cssButton);
				}
			} catch (error) {
				console.error('[EditCSSButton] Error appending button to dropdown:', error);
			}
		});
	});
})(jQuery, mediaWiki);

// Adds a button feature, enabled by creating a "ButtonTrigger" class, among other features. Better visualized by checking out the wiki guide
window.mediaWiki.loader.using(['mediawiki.util', 'jquery']).then(function() {
	(function($, mw) {
		
		const $soundContainer = $('.ButtonTrigger, [data-click-sound-url]').first();
		
		const uiConfig = {
			clickSoundUrl: $soundContainer.attr('data-click-sound-url') || 'https://static.wikia.nocookie.net/incredibox/images/2/2c/Clickfast.ogg/revision/latest?cb=20260803083657',
			clickSoundEnabled: $soundContainer.attr('data-click-sound-enabled') !== 'false',
			showCursorPointer: $soundContainer.attr('data-show-cursor') !== 'false',
			muteClicks: $soundContainer.attr('data-mute-clicks') === 'true',
		};
		
		function playClickSound() {
			if (!uiConfig.clickSoundEnabled || !uiConfig.clickSoundUrl || uiConfig.muteClicks) return;
			new Audio(uiConfig.clickSoundUrl).play();
		}
		
		$(document).ready(function() {
			
			const audioCache = {};
			const pendingRequests = {};
			let clickAudioCache = null;
			if (uiConfig.clickSoundEnabled && uiConfig.clickSoundUrl) {
				clickAudioCache = new Audio(uiConfig.clickSoundUrl);
				clickAudioCache.load();
				
				$(document).one('touchstart click', function() {
					if (clickAudioCache) {
						clickAudioCache.volume = 0;
						clickAudioCache.play().then(function() {
							clickAudioCache.pause();
							clickAudioCache.volume = 1;
							clickAudioCache.currentTime = 0;
						});
					}
				});
			}
			
			if (uiConfig.showCursorPointer) {
				$('<style>').text(
					/* Apply grabbing cursor to buttons and centers image inside it */
					'.ButtonTrigger:not([data-nograb]), #mute-toggle:not([data-nograb]) {cursor: grab; cursor: -webkit-grab;}' +
					'.ButtonTrigger:not([data-nograb]):active, #mute-toggle:not([data-nograb]):active {cursor: grabbing; cursor: -webkit-grabbing;}' +
					'.ButtonTrigger img {display: inline-grid; place-items: center;}' +
					/* Give data-nograb elements a pointer if they act as a link, otherwise default to text cursor */
					'.ButtonTrigger[data-nograb][data-link], .ButtonTrigger[data-nograb][data-audio] {cursor: pointer;}' +
					/* Disable grabbing cursor during cooldown or when deactivated */
					'.ButtonTrigger.cooldown-active, .ButtonTrigger.disabled-switch, .ButtonTrigger.used-once, #mute-toggle.used-once {' +
					'cursor: not-allowed !important;' +
					'}' +
					/* Fade buttons until refresh */
					'.ButtonTrigger.used-once, #mute-toggle.used-once {' +
					'opacity: 0.35 !important;' +
					'transition: opacity 0.5s ease-in-out;' +
					'}' +
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
					/* Fade button back to normal */
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
					/* Center countdown text over html element */
					'.timer-anchor {' +
					'position: absolute;' +
					'top: 50%;' +
					'left: 50%;' +
					'transform: translate(-50%, -50%);' +
					'font-weight: bold;' +
					'color: #ffffff;' +
					'text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);' +
					'pointer-events: none;' +
					'z-index: 10;' +
					'}'
					).appendTo('head');
			}
			
			function fetchAudioUrl(soundName, callback) {
				if (audioCache[soundName]) {
					if (callback) callback(audioCache[soundName]);
					return;
				}
				if (pendingRequests[soundName]) {
					if (callback) pendingRequests[soundName].then(callback);
					return;
				}
				
				pendingRequests[soundName] = $.ajax({
					url: mw.util.wikiScript('api'),
					data: {
						action: 'query',
						titles: 'File:' + soundName,
						prop: 'imageinfo',
						iiprop: 'url',
						format: 'json',
					},
					dataType: 'json',
				}).then(function(apiResponse) {
					const pages = apiResponse.query.pages;
					const pageId = Object.keys(pages)[0];
					if (pageId !== "-1" && pages[pageId].imageinfo) {
						const directAudioUrl = pages[pageId].imageinfo[0].url;
						audioCache[soundName] = directAudioUrl;
						return directAudioUrl;
					}
					
					audioCache[soundName] = 'PENSIVE';
					return 'PENSIVE';
				});
				
				if (callback) {
					pendingRequests[soundName].then(callback);
				}
				pendingRequests[soundName].always(function() {
					delete pendingRequests[soundName];
				});
			}
			
			function showText($clickedLink) {
				const notificationText = $clickedLink.attr('data-text');
				if (!notificationText) return;
				
				let $notificationStack = $('#textStack');
				if (!$notificationStack.length) {
					$notificationStack = $('<div>', {id: 'textStack'}).css({
						'position': 'fixed', 'z-index': '9999', 'top': '63px', 'left': '50%',
						'transform': 'translateX(-50%)', 'display': 'flex', 'flex-direction': 'column',
						'align-items': 'center', 'gap': '13px', 'pointer-events': 'none', 'max-width': '90vw',
					}).appendTo('body');
				}
				
				const border = $clickedLink.attr('data-border') || "transparent";
				const $notificationItem = $('<div>', { 'class': 'textCustomizability' });
				
				if (notificationText.includes('<img')) {
					$notificationItem.html(notificationText);
				} else {
					$notificationItem.text(notificationText);
				}
				
				$notificationItem.css({
					'font-family': 'Montserrat, sans-serif', 'font-weight': 'bold', 'text-align': 'center', 'word-break': 'break-word', 'max-width': '100%', 'padding': '3px 8px',
					'font-size': $clickedLink.attr('data-size') || "52px",
					'color': $clickedLink.attr('data-color') || "#ffffff",
					'text-shadow': '-1px -1px 0 '+border+', 1px -1px 0 '+border+', -1px 1px 0 '+border+', 1px 1px 0 '+border,
				}).appendTo($notificationStack).delay(Number($clickedLink.attr('data-text-duration') || 4) * 1000).fadeOut(136, function() {
					$(this).remove();
				});
			}
			
			// Handle button cooldown overlays
			function buttonCooldown($lockObject, durationMs, afterLock) {
				if ($lockObject.data('locked')) return false;
				$lockObject.data('locked', true).addClass('cooldown-active button-transparent');
				
				let secondsLeft = Math.ceil(durationMs / 1000);
				const hideTimerText = $lockObject.attr('data-notext') === 'true' || $lockObject.attr('data-once') === 'true';
				let $timerOverlay = null;
				
				if (!hideTimerText) {
					if ($lockObject.css('position') === 'static') $lockObject.css('position', 'relative');
					$timerOverlay = $('<span>', { 'class': 'timer-anchor', 'text': secondsLeft + 's' }).appendTo($lockObject);
				}
				
				const countdownInterval = setInterval(function() {
					secondsLeft--;
					
					if ($lockObject.data('skipCooldown') || secondsLeft <= 0) {
						clearInterval(countdownInterval);
						if ($timerOverlay) $timerOverlay.remove();
						
						$lockObject.removeClass('cooldown-active');
						if (!$lockObject.hasClass('used-once')) $lockObject.removeClass('button-transparent');
						
						$lockObject.removeData('locked activeInterval skipCooldown');
						
						if (afterLock) afterLock();
					} else if ($timerOverlay) {
						$timerOverlay.text(secondsLeft + 's');
					}
				}, 1000);
				
				$lockObject.data('activeInterval', countdownInterval);
				return true;
			}
			
			// Handle audio, text or redirect
			function handleLinkAction(event, $clickedLink) {
				const soundName = $clickedLink.attr('data-audio');
				const destinationPage = $clickedLink.attr('data-link');
				const durationSeconds = $clickedLink.attr('data-duration');
				const totalMs = durationSeconds !== undefined ? parseInt(durationSeconds, 10) * 1000 : 4000;
				const delaySeconds = $clickedLink.attr('data-delay');
				const delayMs = delaySeconds ? parseInt(delaySeconds, 10) * 1000 : null;
				const destinationLink = destinationPage ? mw.util.getUrl(destinationPage) : null;
				
				if ($clickedLink.hasClass('disabled-switch') || $clickedLink.hasClass('used-once')) return;
				if (totalMs !== 0 && ($clickedLink.data('locked') || $clickedLink.data('fetching'))) return;
				if (soundName || destinationLink) {
					event.preventDefault();
				}
				if ($clickedLink.attr('data-once') === 'true') {
					$clickedLink.addClass('used-once');
				}
				
				playClickSound();
				
				const isMuteToggle = $clickedLink.is('#mute-toggle');
				const isCurrentlyDisabled = $clickedLink.data('disabled-state') === true;
				
				if (!(isMuteToggle && isCurrentlyDisabled)) {
					showText($clickedLink);
				}
				
				const backgroundImage = $clickedLink.attr('data-background-image');
				if (backgroundImage) {
					$('<div>').css({
						'position': 'fixed', 'top': 0, 'left': 0, 'width': '100vw', 'height': '100vh',
						'background': 'url(' + backgroundImage + ') center/cover no-repeat', 'z-index': 1,
						'pointer-events': 'none', 'display': 'none',
					}).appendTo('body').fadeIn(300).delay(totalMs || 3000).fadeOut(300, function() {
						$(this).remove();
					});
				}
				
				const particleImage = $clickedLink.attr('data-particle-image');
				if (particleImage) {
					const particleDirection = $clickedLink.attr('data-particle-direction') || 'bottom';
					const particleInterval = setInterval(function() {
						if ($clickedLink.data('locked') === false || $clickedLink.hasClass('cooldown-active') === false) {
							clearInterval(particleInterval);
							return;
						}
						
						const spawnParticles = {
							'position': 'fixed', 'width': '40px', 'height': 'auto',
							'z-index': 9999, 'pointer-events': 'none', 'transition': 'all 3s linear',
						};
						const endParticles = { 'opacity': 0 };
						const particleOffset = Math.random() * 360;
						
						if (particleDirection === 'left') {
							spawnParticles.left = '-50px'; spawnParticles.top = (Math.random() * 100) + 'vh';
							endParticles.transform = 'translateX(110vw) rotate(' + particleOffset + 'deg)';
						} else if (particleDirection === 'right') {
							spawnParticles.right = '-50px'; spawnParticles.top = (Math.random() * 100) + 'vh';
							endParticles.transform = 'translateX(-110vw) rotate(' + particleOffset + 'deg)';
						} else if (particleDirection === 'top') {
							spawnParticles.top = '-50px'; spawnParticles.left = (Math.random() * 100) + 'vw';
							endParticles.transform = 'translateY(110vh) rotate(' + particleOffset + 'deg)';
						} else {
							spawnParticles.bottom = '-50px'; spawnParticles.left = (Math.random() * 100) + 'vw';
							endParticles.transform = 'translateY(-110vh) rotate(' + particleOffset + 'deg)';
						}
						
						const $particle = $('<img>', { src: particleImage }).css(spawnParticles).appendTo('body');
						
						setTimeout(function() { $particle.css(endParticles); }, 50);
						setTimeout(function() { $particle.remove(); }, 3050);
					}, 150);
					$clickedLink.data('activeInterval', particleInterval);
				}
				
				const connectedButtons = $clickedLink.attr('data-connect');
				if (connectedButtons) {
					const activeChain = $clickedLink.data('chainReaction') || [];
					if (activeChain.length >= 500) {
						$clickedLink.removeData('chainReaction');
						return;
					}
					
					connectedButtons.split(',').forEach(function(item) {
						const parts = item.split(':');
						const chainSelector = parts[0]?.trim();
						if (!chainSelector) return;
						
						const chainDelaySec = parseFloat(parts[1]) || 0;
						const chainTimeoutId = setTimeout(function() {
								const $nextButton = $(chainSelector);
								const nextChain = activeChain.concat([chainSelector]);
								$nextButton.data('chainReaction', nextChain);
								$nextButton.trigger($.extend($.Event('click'), {
									clickedBy: $clickedLink.attr('id') ? '#' + $clickedLink.attr('id') : null
								}));
								$nextButton.removeData('chainReaction');
								
								const currentActiveTimeouts = $nextButton.data('incomingChainTimeouts') || [];
								let timeoutIndex = currentActiveTimeouts.indexOf(chainTimeoutId);
								if (timeoutIndex > -1) {
									currentActiveTimeouts.splice(timeoutIndex, 1);
									$nextButton.data('incomingChainTimeouts', currentActiveTimeouts);
								}
							}, chainDelaySec * 1000);
							
							const $targetChoiceButton = $(chainSelector);
							const existingTimeouts = $targetChoiceButton.data('incomingChainTimeouts') || [];
							existingTimeouts.push(chainTimeoutId);
							$targetChoiceButton.data('incomingChainTimeouts', existingTimeouts);
					});
				}
				
				const injectString = $clickedLink.attr('data-inject');
				if (injectString) {
					const injectParts = injectString.split(':');
					const injectElement = injectParts[0] ? injectParts[0].trim() : null;
					const injectId = injectParts[1] ? injectParts[1].trim() : null;
					
					if (injectElement && injectId) {
						const $target = $(injectElement);
						const currentRequirement = $target.attr('data-require');
						
						if (currentRequirement && currentRequirement.trim() === injectId.trim()) {
							$target.removeAttr('data-require');
							$target.removeAttr('data-locked-text');
						}
					}
				}
				
				const cleanUpAndRedirect = function() {
					const activeInterval = $clickedLink.data('activeInterval');
					if (activeInterval) clearInterval(activeInterval);
					const safetyTimeout = $clickedLink.data('safetyTimeout');
					if (safetyTimeout) clearTimeout(safetyTimeout);
					
					if (!$clickedLink.hasClass('used-once')) {
						$clickedLink.removeClass('cooldown-active button-transparent');
					} else {
						$clickedLink.removeClass('cooldown-active');
					}
					$clickedLink.removeData('skipCooldown locked activeInterval safetyTimeout');
					
					if (destinationLink) {
						window.location.href = destinationLink;
					}
				};
				
				$clickedLink.removeData('audioCancelled');
				
				if (soundName) {
					if (totalMs !== 0) {
						$clickedLink.data('fetching', true);
						buttonCooldown($clickedLink, totalMs, (destinationLink && delayMs === null) ? null : cleanUpAndRedirect);
					}
					
					const nativeTrack = new Audio();
					
					$clickedLink.data('activeAudioInstance', nativeTrack);
					
					fetchAudioUrl(soundName, function(audioUrl) {
						$clickedLink.removeData('fetching');
						
						if ($clickedLink.data('audioCancelled')) {
							$clickedLink.removeData('audioCancelled');
							cleanUpAndRedirect();
							return;
						}
						
						let nativeTrack = audioCache[soundName] instanceof Audio ? audioCache[soundName] : null;
						if (!nativeTrack) {
							if (!audioUrl || audioUrl === 'PENSIVE') {
								cleanUpAndRedirect();
								return;
							}
							nativeTrack = new Audio(audioUrl);
							audioCache[soundName] = nativeTrack;
						} else {
							nativeTrack.pause();
							nativeTrack.currentTime = 0;
						}
						$clickedLink.removeData('fetching');
						$clickedLink.data('activeAudioInstance', nativeTrack);
						
						if (delayMs !== null) {
							nativeTrack.play().catch(function() {
								$clickedLink.data('skipCooldown', true);
							});
							$clickedLink.data('safetyTimeout', setTimeout(cleanUpAndRedirect, delayMs));
						} else {
							const safetyLimit = totalMs === 0 ? 3600000 : totalMs;
							const fallbackTimer = setTimeout(cleanUpAndRedirect, safetyLimit);
							$clickedLink.data('safetyTimeout', fallbackTimer);
							nativeTrack.onended = null;
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
					if (!isMuteToggle) {
						if (totalMs !== 0) buttonCooldown($clickedLink, totalMs, (delayMs === null) ? cleanUpAndRedirect : null);
						if (delayMs !== null) $clickedLink.data('safetyTimeout', setTimeout(cleanUpAndRedirect, delayMs));
						else if (totalMs === 0) cleanUpAndRedirect();
					} else {
						$clickedLink.removeClass('cooldown-active button-transparent');
						$clickedLink.removeData('fetching');
					}
				}
			}
			
			// Toggle buttons and handle cooldown states
			function toggleButtonTriggers(selector, shouldDisable) {
				$(selector).not('#mute-toggle').each(function() {
					const $switchElement = $(this);
					if ($switchElement.hasClass('used-once')) return;
					if (shouldDisable) {
						$switchElement.addClass('disabled-switch').css('opacity', '0.5');
						if ($switchElement.data('locked')) {
							$switchElement.data('skipCooldown', true);
						}
					} else {
						$switchElement.removeClass('disabled-switch').css('opacity', '');
						$switchElement.removeData('skipCooldown');
					}
				});
			}
			
			$(document).off('click', '.ButtonTrigger').on('click', '.ButtonTrigger', function(event) {
				const $lockedButton = $(this);
				if ($lockedButton.hasClass('used-once')) {
					event.preventDefault();
					return;
				}
				
				const buttonStopper = $lockedButton.attr('data-stop-button');
				if (buttonStopper !== undefined) {
					event.preventDefault();
					
					const isMasterMuted = $('#mute-toggle').data('disabled-state') === true;
					if (!isMasterMuted) {
						playClickSound();
					}
					
					const $activeButtons = (buttonStopper === 'all' || buttonStopper === '' || buttonStopper === 'true')
					? $('.ButtonTrigger')
					: $(buttonStopper);
					
					$activeButtons.each(function() {
						const $stuckButton = $(this);
						
						$stuckButton.data({ 'skipCooldown': true, 'audioCancelled': true });
						($stuckButton.data('incomingChainTimeouts') || []).forEach(clearTimeout);
						$stuckButton.removeData('incomingChainTimeouts');
						
						const countdownClock = $stuckButton.data('activeInterval');
						if (countdownClock) clearInterval(countdownClock);
						
						const backupTimer = $stuckButton.data('safetyTimeout');
						if (backupTimer) clearTimeout(backupTimer);
						
						const activeAudio = $stuckButton.data('activeAudioInstance');
						if (activeAudio) {
							activeAudio.pause();
							activeAudio.currentTime = 0;
						}
						
						$stuckButton.find('.timer-anchor').remove();
						$stuckButton.removeClass('cooldown-active button-transparent').removeData('locked activeInterval safetyTimeout fetching chainReaction');
					});
					return;
				}
				const requiredId = $lockedButton.attr('data-require');
				if (requiredId && requiredId.trim() !== "") {
					event.preventDefault();
					
					playClickSound();
					
					const lockedText = $lockedButton.attr('data-locked-text');
					if (lockedText) {
						const originalText = $lockedButton.attr('data-text');
						
						$lockedButton.attr('data-text', lockedText);
						showText($lockedButton);
						
						$lockedButton.attr('data-text', originalText || null);
					}
					return;
				}
				handleLinkAction(event, $lockedButton);
			});
			
			$(document).off('click', '#mute-toggle').on('click', '#mute-toggle', function(event) {
				event.preventDefault();
				event.stopImmediatePropagation();
				
				const $toggleButton = $(this);
				if ($toggleButton.hasClass('used-once')) return;
				if ($toggleButton.data('locked') || $toggleButton.hasClass('cooldown-active')) {
					return;
				}
				if (!$toggleButton.hasClass('ButtonTrigger') && !$toggleButton.data('fetching')) {
					playClickSound();
				}
				if ($toggleButton.attr('data-once') === 'true') {
					$toggleButton.addClass('used-once');
				}
				if (!$toggleButton.data('mwOriginalToggleText')) {
					$toggleButton.data('mwOriginalToggleText', $toggleButton.html());
				}
				const durationSeconds = $toggleButton.attr('data-duration');
				const totalMs = durationSeconds !== undefined ? parseInt(durationSeconds, 10) * 1000 : 4000;
				const applyToggleState = function() {
					const isButtonsDisabled = $toggleButton.data('disabled-state') !== true;
					$toggleButton.data('disabled-state', isButtonsDisabled);
					toggleButtonTriggers('.ButtonTrigger', isButtonsDisabled);
					$toggleButton.toggleClass('toggle-active-fade', isButtonsDisabled).css('opacity', '');
					
					if (isButtonsDisabled) {
						const disabledText = $toggleButton.attr('data-disabled-text');
						const escapedText = mw.html ? mw.html.escape(disabledText) : '';
						$toggleButton.html(escapedText || $toggleButton.data('mwOriginalToggleText') || "Enable Buttons");
					} else {
						$toggleButton.html($toggleButton.data('mwOriginalToggleText'));
					}
				};
				
				if (totalMs !== 0) {
					buttonCooldown($toggleButton, totalMs, applyToggleState);
				} else {
					applyToggleState();
				}
			});
		});
	})(window.jQuery, window.mediaWiki);
});