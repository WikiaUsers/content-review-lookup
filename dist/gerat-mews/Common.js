(function(mw, $) {
    'use strict';

    // Stream and apply the subpage animation styles directly to the head
    mw.loader.load('/wiki/MediaWiki:Common.css/videoview.css?action=raw&ctype=text/css', 'text/css');

    mw.hook('wikipage.content').add(function($content) {
        if (!('speechSynthesis' in window)) {
            return;
        }

        $content.find('.custom-tts-player-video').each(function() {
            var $player = $(this);
            var timelineString = $player.data('tts-timeline') || '';
            var lang = $player.data('tts-lang') || 'en-US';
            
            var $btn = $player.find('.video-toggle-btn');
            var $iconText = $player.find('.video-icon-text');
            var $textBox = $player.find('.video-text-target');
            var $imgContainer = $player.find('.video-img-frame');
            
            // Capture the plain text script from the element
            var textToSpeak = $textBox.text().trim();
            
            if (!textToSpeak) {
                return;
            }

            var utterance = null;
            var isPlaying = false;
            var imageMap = {};
            var hasInitializedSpans = false;

            // FIX: Infinite Loop Space-Separated Parser Engine
            if (timelineString) {
                var pairs = String(timelineString).split(/\s+/);
                for (var p = 0; p < pairs.length; p++) {
                    var pair = pairs[p] ? pairs[p].trim() : '';
                    if (!pair) continue; 

                    var splitPair = pair.split(':');
                    if (splitPair.length === 2) {
                        var wordNum = parseInt(splitPair[0].trim(), 10);
                        var filename = splitPair[1].trim();
                        
                        if (!isNaN(wordNum) && filename) {
                            // Direct secure Fandom file directory pathing loophole
                            var fileUrl = mw.util.getUrl('Special:FilePath/' + filename);
                            imageMap[wordNum] = '<img src="' + fileUrl + '" alt="Broadcast Frame" />';
                        }
                    }
                }
            }

            function updateDisplayImage(htmlContent) {
                if (!htmlContent) {
                    $imgContainer.empty();
                    return;
                }
                $imgContainer.html(htmlContent); // Instantly drop raw image layout
            }

            // Load starting initial landscape photo frame instantly on render
            if (imageMap[0]) {
                updateDisplayImage(imageMap[0]);
            }

            // Consolidated Instant Interface Reset Loop
            function forceSystemReset() {
                window.speechSynthesis.cancel();
                $player.find('.video-word-span').removeClass('speaking-now');
                if (imageMap[0]) {
                    updateDisplayImage(imageMap[0]); // Snap cleanly back to starting frame
                } else {
                    $imgContainer.empty();
                }
                $iconText.text('▶'); // Force button back to play arrow instantly
                $btn.removeClass('is-loading');
                isPlaying = false;
                utterance = null;
            }

            // Playback click handler
            $btn.on('click', function() {
                if (isPlaying) {
                    forceSystemReset();
                } else {
                    window.speechSynthesis.cancel(); // Safety purge

                    // Render tracking spans cleanly on first click
                    if (!hasInitializedSpans) {
                        var rawWords = String(textToSpeak).split(/\s+/).filter(Boolean);
                        var spanHtml = '';
                        for (var i = 0; i < rawWords.length; i++) {
                            spanHtml += '<span class="video-word-span" id="vw-' + i + '">' + mw.html.escape(rawWords[i]) + '</span> ';
                        }
                        $textBox.html(spanHtml);
                        hasInitializedSpans = true;
                    }
                    
                    utterance = new SpeechSynthesisUtterance(textToSpeak);
                    utterance.lang = lang;
                    
                    var voice = getPremiumVoice(lang);
                    if (voice) utterance.voice = voice;

                    utterance.rate = 0.95; 
                    utterance.pitch = 1.0; 

                    isPlaying = true;
                    $btn.addClass('is-loading'); 

                    var wordCounter = 0;

                    // Reliable word boundary tracking system (No scrolling)
                    utterance.onboundary = function(event) {
                        if (event.name === 'word') {
                            $player.find('.video-word-span').removeClass('speaking-now');
                            
                            var $currentWordSpan = $player.find('#vw-' + wordCounter);
                            if ($currentWordSpan.length) {
                                $currentWordSpan.addClass('speaking-now');
                            }
                            
                            // Check and trigger image switch cleanly across your infinite map arrays
                            if (imageMap[wordCounter]) {
                                updateDisplayImage(imageMap[wordCounter]);
                            }
                            
                            wordCounter++;
                        }
                    };

                    utterance.onstart = function() {
                        $btn.removeClass('is-loading');
                        $iconText.text('⏸');
                    };

                    utterance.onend = function() {
                        forceSystemReset();
                    };

                    utterance.onerror = function() {
                        forceSystemReset();
                    };

                    window.speechSynthesis.speak(utterance);
                }
            });

            function getPremiumVoice(langCode) {
                var voices = window.speechSynthesis.getVoices();
                var premium = voices.find(function(v) {
                    var lowerName = v.name.toLowerCase();
                    return v.lang.startsWith(langCode) && 
                           (lowerName.includes('natural') || lowerName.includes('online') || lowerName.includes('google'));
                });
                if (!premium) {
                    premium = voices.find(function(v) { return v.lang.startsWith(langCode); });
                }
                return premium;
            }

            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = getPremiumVoice;
            }
        });
    });
})(mediaWiki, jQuery);
/* Automated External Database Score Loader */
mw.hook('wikipage.content').add(function($content) {
    var $scoreElements = $content.find('.DynamicUserScore');
    if (!$scoreElements.length) return;

    var currentActiveViewer = mw.config.get('wgUserName');
    if (!currentActiveViewer) {
        $scoreElements.text("0");
        return;
    }

    // 1. Fetch your custom template text database via the MediaWiki API
    $.getJSON(mw.util.wikiScript('api'), {
        action: 'query',
        prop: 'revisions',
        titles: 'Template:UserScoreRegistry',
        rvprop: 'content',
        rvslots: 'main',
        format: 'json'
    }).done(function(data) {
        try {
            var pageId = Object.keys(data.query.pages)[0];
            var rawContent = data.query.pages[pageId].revisions[0].slots.main['*'];
            
            // 2. Parse the list you edit into an active JavaScript array
            var masterScoreRegistry = JSON.parse(rawContent);
            var finalEvaluatedValue = masterScoreRegistry[currentActiveViewer] || "0";
            
            // 3. Automatically output the flat number string anywhere you put the class
            $scoreElements.text(finalEvaluatedValue);
        } catch (e) {
            console.error("Score Registry Parse Error:", e);
            $scoreElements.text("0");
        }
    });
});