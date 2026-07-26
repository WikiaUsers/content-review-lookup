// [[Category:Internal]]

// For [[Module:CSS]]; [[T:CSS]] dependency
$("span.import-css").each(function() {
		const css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css")
			.attr("data-css-hash", $(this).attr("data-css-hash"))
			.attr("data-from", $(this).attr("data-from"))
			.attr("data-wait", $(this).attr("data-wait"))
			.attr("data-portal", $(this).attr("data-portal"));
		
		const wait = $(this).attr("data-wait");
		const portal = $(this).attr("data-portal");
		var portalOpened = false;
		
		if (wait != "none") {
			css.disabled = true;
			var timer = setTimeout(() => css.disabled = false, wait);
		}
		
		if (portal != "none") {
			css.disabled = true;
			$(".t-css-portal-" + portal).click(function() {
				css.disabled = !css.disabled;
				portalOpened = true;
			});
		}
		
		$(".theme-toggler").click(function() {
			switch (true) {
				case wait != "none":
					if (timer || css.disabled == false) {
						clearTimeout(timer);
						timer = false;
						css.disabled = true;
					} else css.disabled = false;
					break;
				case portal != "none":
					if (portalOpened) css.disabled = !css.disabled;
					break;
				default:
					css.disabled = !css.disabled;
					break;
			}
		});
	});

// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 }, // <- lower order value = will be placed before other tags (in space, not as of which loads first)
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true }; // no edits for 90 days and/or no edits at all = inactive
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;

// Fade-in
var fadeinclass = document.getElementsByClassName("fadeintext");
    for(var i = 0; i < fadeinclass.length; i++) {
        var sec = (i/4).toString();
        fadeinclass[i].style.animation = "fadeInAnimation ease 1.5s";
        fadeinclass[i].style.animationDelay = sec.concat("s");
        fadeinclass[i].style.animationIterationCount = "1";
        fadeinclass[i].style.animationFillMode = "forwards";
}

// Credits to https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:Common.js

$('.fandom-community-header__community-name-wrapper').append(
	$('<a/>').addClass('compass-wiki-badge').attr('href', '//community.fandom.com/wiki/Fandom_Compass').append(
		$('<img/>').css('height', '60px').css('position', 'relative').css('top', '10px')
		.attr('src', 'https://static.wikia.nocookie.net/speedstorm/images/a/a2/FandomCompass-Banner-Light.png/revision/latest/scale-to-width-down/100?cb=20230404145009').attr('title', 'This wiki is part of Fandom Compass')
));

// Biến để theo dõi template hiện tại
let currentTemplate = 'meg-theme';

// Hàm chuyển đổi template
function toggleTemplate() {
    // Ẩn template hiện tại
    document.getElementById(currentTemplate).classList.remove('active');
    
    // Chuyển đổi template
    if (currentTemplate === 'meg-theme') {
        currentTemplate = 'hallprint-theme';
    } else {
        currentTemplate = 'meg-theme';
    }
    
    // Hiển thị template mới
    document.getElementById(currentTemplate).classList.add('active');
    
    // Cập nhật nội dung nút (tuỳ chọn)
    updateButtonText();
}

// Hàm cập nhật văn bản nút (tuỳ chọn)
function updateButtonText() {
    const button = document.querySelector('.template-toggle-btn');
    if (currentTemplate === 'meg-theme') {
        button.textContent = 'Chuyển sang Hallprint Theme';
    } else {
        button.textContent = 'Chuyển sang MEG Theme';
    }
}

// Khởi tạo nút khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    updateButtonText();
});


importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:HTML5Audio/code.js'
    ]
});

	// [[Template:Audio]] toggle
	$(".t-audio").each(function() {
		const toggle = $(this).attr("data-toggle");
		const toggleFunction = $(this).attr("data-toggle-function");
		const fadeSteps = Math.round(250 * toggleFunction.replace(/fade-(in|out)-/, ""));
		if (toggle != "none") {
			$(".t-audio-toggle-" + toggle).click(function () {
				const audio = $(`.t-audio-toggle-${toggle} audio`)[0];
				switch (true) {
					case toggleFunction.includes("time"):
						audio.currentTime = toggleFunction.replace("time-", "");
						audio.play();
						break;
					case toggleFunction.includes("fade-in"):
						audio.play();
						(function loop(i) {
							setTimeout(() => {
								console.log((-i + fadeSteps) / fadeSteps);
								if (--i > -1) loop(i);
						    }, 4);
						})(fadeSteps - 1);
						break;
					case toggleFunction.includes("fade-out"):
						audio.play();
						(function loop(i) {
							setTimeout(() => {
								console.log((i) / fadeSteps);
								if (--i > -1) loop(i);
						    }, 4);
						})(fadeSteps - 1);
						break;
					default:
						audio.paused ? audio.play() : audio.pause();
						break;
				}
			});
		}
	});
});

// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 },
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;

// Credit wiki [http://backrooms.fandom.com/zh/wiki/Mediawiki:Common.js]
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
// 投票偏移量
(function () {
    if (typeof jQuery === 'undefined') return;
    var $ = jQuery;
    var _getJSON = $.getJSON;
    function num(x) {
        if (x === null || x === undefined) return 0;
        var s = String(x).replace(/,/g, '').trim();
        if (s === '') return 0;
        var n = parseFloat(s);
        return isNaN(n) ? 0 : n;
    }
    function collectOffsetsForThread(threadId) {
        var offsets = [];
        var totalOffset = 0;
        $('tr[data-vote-id="' + threadId + '"]').each(function () {
            var $tr = $(this);
            var $table = $tr.closest('table');
            if ($table.hasClass('talescon-table')) {
                var ch = this.children;
                var o0 = num(ch[2] && ch[2].textContent);
                var o1 = num(ch[3] && ch[3].textContent);
                var o2 = num(ch[4] && ch[4].textContent);
                offsets[0] = (offsets[0] || 0) + o0;
                offsets[1] = (offsets[1] || 0) + o1;
                offsets[2] = (offsets[2] || 0) + o2;
                totalOffset += (o0 + o1 + o2);
            } else if ($table.hasClass('themedcon4-table')) {
                var cells = this.children;
                for (var i = 0; i <= 4; i++) {
                    var idx = 3 + i;
                    var o = num(cells[idx] && cells[idx].textContent);
                    offsets[i] = (offsets[i] || 0) + o;
                    totalOffset += o;
                }
            } else {
                var i = 0;
                while ($tr.attr('data-offset-' + i) !== undefined) {
                    var o = num($tr.attr('data-offset-' + i));
                    offsets[i] = (offsets[i] || 0) + o;
                    totalOffset += o;
                    i++;
                }
            }
        });
        return { offsets: offsets, totalOffset: totalOffset };
    }
    $.getJSON = function () {
        var args = Array.prototype.slice.call(arguments);
        var dataArg = null;
        if (args.length >= 2 && typeof args[1] === 'object') {
            dataArg = args[1];
        } else if (args.length === 1 && typeof args[0] === 'object') {
            dataArg = args[0];
        }
        var jq = _getJSON.apply($, args);
        try {
            if (dataArg && dataArg.controller === 'DiscussionThread' && dataArg.method === 'getThread' && dataArg.threadId) {
                jq.done(function (result) {
                    try {
                        if (!result || !result.poll || !Array.isArray(result.poll.answers)) return;
                        var threadId = String(dataArg.threadId);
                        var collected = collectOffsetsForThread(threadId);
                        var offsets = collected.offsets || [];
                        var totalOffset = collected.totalOffset || 0;
                        var sumAdded = 0;
                        for (var i = 0; i < result.poll.answers.length; i++) {
                            var add = num(offsets[i]);
                            if (add) {
                                result.poll.answers[i].votes = (num(result.poll.answers[i].votes) + add);
                                sumAdded += add;
                            }
                        }
                        if (sumAdded) {
                            result.poll.totalVotes = num(result.poll.totalVotes) + sumAdded;
                        }
                    } catch (e) {
                        console.error('vote-offset-interceptor inner error', e);
                    }
                });
            }
        } catch (e) {
            console.error('vote-offset-interceptor attach error', e);
        }
        return jq;
    };
})();