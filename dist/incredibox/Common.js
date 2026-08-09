/* Any JavaScript here will be loaded for all users on every page load. */

/* Plays audio and shows text if object is clicked */
$(document).ready(function() {
    var uiConfig = {
        clickSoundUrl: 'https://static.wikia.nocookie.net/incredibox/images/2/2c/Clickfast.ogg/revision/latest?cb=20260803083657' + new Date().getTime(),
        clickSoundEnabled: true
    };
    var audioCache = {};
    var pendingRequests = {};
    var isRedirecting = false;
    
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
                format: 'json'
            },
            dataType: 'json'
        }).then(function(apiResponse) {
            try {
                var pages = apiResponse.query.pages;
                var pageIds = Object.keys(pages);
                if (pageIds.length > 0 && pageIds[0] !== "-1" && pages[pageIds[0]].imageinfo) {
                    var targetUrl = pages[pageIds[0]].imageinfo[0].url;
                    audioCache[soundName] = targetUrl;
                    return targetUrl;
                }
            } catch(error) {}
            return null;
        }).catch(function() {
            return null;
        });
        if (callback) {
            pendingRequests[soundName].then(callback);
        }
        pendingRequests[soundName].always(function() {
            setTimeout(function() {
                delete pendingRequests[soundName];
            }, 0);
        });
    }
    
    function showText($clickedLink) {
        var exampleText = $clickedLink.attr('data-text');
        var timeDuration = parseInt($clickedLink.attr('data-duration'), 10) || 4000;
        
        if (!exampleText) return;
        var textColor = $clickedLink.attr('data-color') || "#ffffff";
        var borderColor = $clickedLink.attr('data-border') || "transparent";
        var textSize = $clickedLink.attr('data-size') || "52px";
        var $container = $('#textStack');
        
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
        setTimeout(function() {
            $notification.remove();
        }, timeDuration);
    }
    
    function cooldown($lockObject, durationMs, afterLock) {
        if ($lockObject.data('locked')) return false;
        var originalText = $lockObject.data('backupText') || $lockObject.text();
        $lockObject.data('backupText', originalText);
        $lockObject.data('locked', true).addClass('cooldown-active');
        var secondsLeft = Math.ceil(durationMs / 1000);
        var hideTimerText = $lockObject.attr('data-notext') === 'true';
        if (!hideTimerText) {
            $lockObject.text(secondsLeft + 's');
        }
        var countdownInterval = setInterval(function() {
            secondsLeft--;
            if ($lockObject.data('skipCooldown')) {
                clearInterval(countdownInterval);
                $lockObject.text(originalText);
                $lockObject.removeClass('cooldown-active');
                $lockObject.removeData('skipCooldown locked activeInterval');
                if (afterLock) afterLock();
                return;
            }
            if (secondsLeft > 0) {
                if (!hideTimerText) {
        			$lockObject.text(secondsLeft + 's');
                }
            } else {
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
    
    function handleLinkAction(event, $clickedLink) {
    	if ($clickedLink.data('locked') || $clickedLink.data('fetching')) return;
        if ($clickedLink.hasClass('disabled-switch')) return;
        if (uiConfig.clickSoundEnabled && uiConfig.clickSoundUrl) {
            var clickAudio = new Audio(uiConfig.clickSoundUrl);
            clickAudio.play().catch(function(){});
        }
        var soundName = $clickedLink.attr('data-audio');
        var destination = $clickedLink.attr('data-link');
        var textMessage = $clickedLink.attr('data-text');
        var timeDuration = parseInt($clickedLink.attr('data-duration'), 10);
        if (isNaN(timeDuration)) timeDuration = 4000;
        
        var timeDelay = $clickedLink.attr('data-delay') ? parseInt($clickedLink.attr('data-delay'), 10) : null;
        var targetUrl = destination ? mw.util.getUrl(destination) : null;
        var timeoutId;
        if (soundName || targetUrl) {
            event.preventDefault();
        }
		
        var cleanUpAndRedirect = function() {
            var activeInterval = $clickedLink.data('activeInterval');
            if (activeInterval) clearInterval(activeInterval);
            
            var safetyTimeout = $clickedLink.data('safetyTimeout');
            if (safetyTimeout) clearTimeout(safetyTimeout);
            
            $clickedLink.text($clickedLink.data('backupText') || $clickedLink.text());
            $clickedLink.removeClass('cooldown-active');
            $clickedLink.removeData('skipCooldown locked activeInterval safetyTimeout');
            if (targetUrl) {
                window.location.href = targetUrl;
            }
        };
        
        showText($clickedLink);
        
        if (soundName) {
            if (timeDuration !== 0) {
                cooldown($clickedLink, timeDuration, (targetUrl && timeDelay === null) ? cleanUpAndRedirect : null);
            }
            $clickedLink.data('fetching', true);
            fetchAudioUrl(soundName, function(audioUrl) {
            	$clickedLink.removeData('fetching');
                if (!audioUrl) {
                    cleanUpAndRedirect();
                    return;
                }
                var nativeTrack = new Audio(audioUrl);
                if (timeDelay !== null) {
                    nativeTrack.play().catch(function() {
                        $clickedLink.data('skipCooldown', true);
                    });
                    if ($clickedLink.data('safetyTimeout')) clearTimeout($clickedLink.data('safetyTimeout'));
                    timeoutId = setTimeout(cleanUpAndRedirect, timeDelay);
                    $clickedLink.data('safetyTimeout', timeoutId);
                    
                } else {
                    if ($clickedLink.data('safetyTimeout')) clearTimeout($clickedLink.data('safetyTimeout'));
                    timeoutId = setTimeout(cleanUpAndRedirect, Math.min(timeDuration === 0 ? 6000 : timeDuration, 6000));
                    $clickedLink.data('safetyTimeout', timeoutId);
                    
                    nativeTrack.play().then(function() {
                        nativeTrack.onended = cleanUpAndRedirect;
                    }).catch(function() {
                        $clickedLink.data('skipCooldown', true);
                    });
                }
            });
        } else if (targetUrl) {
            if (timeDuration !== 0) {
                cooldown($clickedLink, timeDuration, cleanUpAndRedirect);
            }
            if (timeDelay !== null) {
                timeoutId = setTimeout(cleanUpAndRedirect, timeDelay);
                $clickedLink.data('safetyTimeout', timeoutId);
            } else if (timeDuration === 0) {
                cleanUpAndRedirect();
            }
        } else {
            if (timeDuration !== 0) {
                cooldown($clickedLink, timeDuration);
            }
        }
    }
    
    window.setupAudioLinks = function(elementSelector) {
        $(document).off('click.customAudio', elementSelector).on('click.customAudio', elementSelector, function(event) {
            handleLinkAction(event, $(this));
        });
    };
    
    window.toggleAudioLinks = function(selector, shouldDisable) {
        $(selector).each(function() {
            if (shouldDisable) {
                $(this).addClass('disabled-switch').css('opacity', '0.5');
            } else {
                $(this).removeClass('disabled-switch').css('opacity', '1');
            }
        });
    };
    window.setupAudioLinks('.AudioLink, .TextLink, .audio-link');
    $(document).on('click', '#mute-toggle', function() {
        var state = $(this).data('disabled-state') || false;
        state = !state;
        $(this).data('disabled-state', state);
        window.toggleAudioLinks('.audio-link, .AudioLink, .TextLink', state);
        $(this).text(state ? "Enable Buttons" : "Disable Buttons");
    });
});