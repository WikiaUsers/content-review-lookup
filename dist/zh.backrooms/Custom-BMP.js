// [[Template:BMP]]
$(document).ready(function () {
    mw.hook('wikipage.content').add(function ($content) {
        // 为每个播放器创建独立的控制器
        $content.find('.player-container').each(function () {
            const $player = $(this);
            const playerState = {
                isPlaying: false,
                isDragging: false,
                progress: $player.find('.progress'),
                playBtn: $player.find('.play-btn'),
                audio: new Audio($player.data('audio-src')),
                volumeControl: $player.find('.volume-control'),
                volumeContainer: $player.find('.volume-slider-container'),
                volumeFill: $player.find('.volume-slider-fill'),
                volumeThumb: $player.find('.volume-slider-thumb'),
                volumeIcon: $player.find('.volume-icon')
            };
            // 设置专辑封面
            const albumArt = $player.find('.album-art');
            albumArt.css('background-image', `url(${$player.data('album-art')})`);
            // 播放/暂停控制
            playerState.playBtn.on('click', function () {
                if (playerState.isPlaying) {
                    playerState.audio.pause();
                    playerState.isPlaying = false;
                    $(this).text('▶');
                } else {
                    playerState.audio.play();
                    playerState.isPlaying = true;
                    $(this).text('⏸');
                }
            });
            // 进度更新
            $(playerState.audio).on('timeupdate', function () {
                const percentage = (this.currentTime / this.duration) * 100;
                playerState.progress.css('width', percentage + '%');
            });
            // 进度条点击
            $player.find('.progress-bar').on('click', function (e) {
                const percent = e.offsetX / $(this).width();
                playerState.audio.currentTime = percent * playerState.audio.duration;
            });
            // 音量控制函数
            function updateVolume(e) {
                const rect = playerState.volumeContainer[0].getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

                playerState.volumeFill.css('transform', `scaleX(${percentage / 100})`);
                playerState.volumeThumb.css('right', `${100 - percentage}%`);
                playerState.audio.volume = percentage / 100;
                updateVolumeIcon(percentage);
            }
            // 音量拖动事件
            playerState.volumeContainer.on('mousedown', function (e) {
                playerState.isDragging = true;
                updateVolume(e);
            });
            $(document).on('mousemove', function (e) {
                if (playerState.isDragging) {
                    updateVolume(e);
                }
            });
            $(document).on('mouseup', function () {
                playerState.isDragging = false;
            });
            // 更新音量图标
            function updateVolumeIcon(value) {
                if (value == 0) {
                    playerState.volumeIcon.text('🔇');
                } else if (value < 50) {
                    playerState.volumeIcon.text('🔉');
                } else {
                    playerState.volumeIcon.text('🔊');
                }
            }
            // 音量图标双击事件
            playerState.volumeIcon.on('dblclick', function () {
                if (playerState.audio.volume > 0) {
                    playerState.audio.volume = 0;
                    playerState.volumeFill.css('transform', 'scaleX(0)');
                    playerState.volumeThumb.css('right', '100%');
                    playerState.volumeIcon.text('🔇');
                } else {
                    playerState.audio.volume = 1;
                    playerState.volumeFill.css('transform', 'scaleX(1)');
                    playerState.volumeThumb.css('right', '0%');
                    playerState.volumeIcon.text('🔊');
                }
            });
        });
    });
});