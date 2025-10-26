
console.log("hai1");
$(function() {
   
    mw.hook('wikipage.content').add(function($content) {
        $content.find('.custom-audio-player').each(function() {
            var $container = $(this);

            if ($container.data('player-initialized')) return;
            $container.data('player-initialized', true);
			
			console.log("hai2");
			
            var $audioWrapper = $container.find('.audio-element');
            var fileName = $audioWrapper.data('audio-file'); 
			
			console.log("hai3");
			
            if (!fileName) return;

            var audioSrc = mw.config.get('wgServer') + '/wiki/Special:Redirect/file/' + fileName;
			
			console.log("hai4");
			
            var audio = $('<audio />', {
                'class': 'real-audio-element',
                'preload': 'auto',
                'html': '<source src="' + audioSrc + '" type="audio/ogg">'
            })[0];
            
			console.log("hai5");

            $audioWrapper.replaceWith(audio);

            var $button = $container.find('.play-pause-button');
            var $progressBar = $container.find('.progress-bar');
            console.log("hai6");
            var updateProgress = function() {
                if (audio.duration) {
                    var percent = (audio.currentTime / audio.duration) * 100;
                    $progressBar.css('width', percent + '%');
                }
            };
            
			console.log("hai7");
			
            $button.on('click', function() {
                if (audio.paused) {
                    audio.play();
                    $button.text('Pause');
                    $container.addClass('is-playing');
                } else {
                    audio.pause();
                    $button.text('Play');
                    $container.removeClass('is-playing');
                }
            });
            
            console.log("hai8");

            $(audio).on('timeupdate', updateProgress);
            $(audio).on('ended', function() {
                $button.text('Play');
                $container.removeClass('is-playing');
                $progressBar.css('width', '0%');
                audio.currentTime = 0;
            });
            
            console.log("hai9");
            
            $button.one('click', function() {
                audio.preload = 'auto'; 
            });
        });
    });
    
    mw.hook('wikipage.content').fire($('body'));
});
console.log("hai10");