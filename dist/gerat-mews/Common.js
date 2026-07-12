(function(mw, $) {
    'use strict';

    mw.hook('wikipage.content').add(function($content) {
        if (!('speechSynthesis' in window)) {
            return;
        }

        $content.find('.custom-tts-player').each(function() {
            var $player = $(this);
            var text = $player.data('tts-text');
            var lang = $player.data('tts-lang') || 'en-US';
            var $btn = $player.find('.tts-toggle-btn');
            var $iconText = $player.find('.tts-icon-text');
            var $progressBar = $player.find('.tts-progress-bar');
            
            if (!text) {
                $player.hide();
                return;
            }

            var utterance = null;
            var isPlaying = false;

            function resetInterface() {
                window.speechSynthesis.cancel();
                $btn.removeClass('is-loading');
                $iconText.text('▶');
                isPlaying = false;
                utterance = null;
            }

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

            $btn.on('click', function() {
                if (isPlaying) {
                    // Reset instantly if clicked during playback
                    $progressBar.attr('style', 'width: 0% !important; transition: none !important;');
                    resetInterface();
                } else {
                    window.speechSynthesis.cancel(); 
                    
                    utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = lang;
                    
                    var voice = getPremiumVoice(lang);
                    if (voice) utterance.voice = voice;

                    var speechRate = 0.95;
                    utterance.rate = speechRate; 
                    utterance.pitch = 1.0; 

                    isPlaying = true;
                    $btn.addClass('is-loading'); // Spinning wheel triggers instantly
                    
                    // Reset bar to zero with no transition delay
                    $progressBar.attr('style', 'width: 0% !important; transition: none !important;');

                    // Bar stays locked at zero until speech engine starts
                    utterance.onstart = function() {
                        $btn.removeClass('is-loading');
                        $iconText.text('⏸');

                        // Clean duration estimate based on standard character speech pace
                        var totalChars = text.length || 1;
                        var durationSeconds = (totalChars / (15.5 * speechRate));

                        // FIX: Uses strict inline attribute injections with !important flags.
                        // This forcefully overrides Fandom's style sheets and enforces an unbending, smooth pace.
                        $progressBar.attr('style', 'transition: width ' + durationSeconds + 's linear !important; width: 96% !important;');
                    };

                    // Snap the final 4% gap seamlessly when speech concludes
                    utterance.onend = function() {
                        $progressBar.attr('style', 'transition: width 0.2s ease-out !important; width: 100% !important;');
                        
                        setTimeout(function() {
                            if (!isPlaying) { 
                                $progressBar.attr('style', 'width: 0% !important; transition: none !important;');
                                $iconText.text('▶');
                            }
                        }, 250); 
                        resetInterface();
                    };

                    utterance.onerror = function() {
                        $progressBar.attr('style', 'width: 0% !important; transition: none !important;');
                        resetInterface();
                    };

                    window.speechSynthesis.speak(utterance);
                }
            });
        });
    });
})(mediaWiki, jQuery);