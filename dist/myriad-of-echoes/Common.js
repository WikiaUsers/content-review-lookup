/* myriad */
mw.hook('wikipage.content').add(function($content) {
    $content.find('.custom-audio-placeholder:not(.is-loaded)').each(function() {
        var $placeholder = $(this).addClass('is-loaded');
        var audioSrc = $placeholder.attr('data-src');
        var audioTitle = $placeholder.attr('data-title') || 'Audio Track';
        var customSize = $placeholder.attr('data-size');

        if (!audioSrc) return;

        var $player = $('<div class="custom-audio-container"></div>');

        if (customSize) {
            var sizeMatch = customSize.toLowerCase().match(/^(\d+)(?:x(\d+))?(?:px)?$/);
            if (sizeMatch) {
                if (sizeMatch[1]) $player.css('width', sizeMatch[1] + 'px');
                if (sizeMatch[2]) $player.css('height', sizeMatch[2] + 'px');
            }
        }

        var $playBtn = $('<div class="audio-control-btn state-play"></div>');
        var $rightPanel = $('<div class="audio-right-panel"></div>');
        
        var $title = $('<div class="audio-title"></div>').text(audioTitle);
        
        var $progressBarBg = $('<div class="audio-progress-bg"></div>');
        var $progressBarFill = $('<div class="audio-progress-fill"></div>');
        $progressBarBg.append($progressBarFill);
        
        var $timeTracker = $('<div class="audio-time-tracker"></div>');
        var $timeCurrent = $('<span class="audio-current">0:00</span>');
        var $timeTotal = $('<span class="audio-total">0:00</span>');
        $timeTracker.append($timeCurrent, ' / ', $timeTotal);

        $rightPanel.append($title, $progressBarBg, $timeTracker);
        $player.append($playBtn, $rightPanel);
        $placeholder.append($player);

        var audio = new Audio(audioSrc);

        function formatTime(seconds) {
            if (isNaN(seconds)) return "0:00";
            var min = Math.floor(seconds / 60);
            var sec = Math.floor(seconds % 60);
            return min + ":" + (sec < 10 ? "0" + sec : sec);
        }

        $playBtn.on('click', function() {
            if (audio.paused) {
                audio.play();
                $playBtn.removeClass('state-play').addClass('state-pause');
            } else {
                audio.pause();
                $playBtn.removeClass('state-pause').addClass('state-play');
            }
        });

        audio.addEventListener('timeupdate', function() {
            var percent = (audio.currentTime / audio.duration) * 100;
            $progressBarFill.css('width', percent + '%');
            $timeCurrent.text(formatTime(audio.currentTime));
        });

        audio.addEventListener('loadedmetadata', function() {
            $timeTotal.text(formatTime(audio.duration));
        });

        audio.addEventListener('ended', function() {
            $playBtn.removeClass('state-pause').addClass('state-play');
            $progressBarFill.css('width', '0%');
            $timeCurrent.text('0:00');
        });

        $progressBarBg.on('click', function(e) {
            var rect = this.getBoundingClientRect();
            var percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });
    });
});