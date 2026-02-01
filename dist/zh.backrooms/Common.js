(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0].getElementsByClassName("mw-file-element")[0];
        if (!target) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        e.addEventListener('click', function () {
            console.log(target);
            if (target.paused || target.ended) {
                target.play();
            } else {
                target.pause();
            }
        });
    });
})();

mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
    
    $(".sitenotice-tab-container").each(function() {
		var container = $(this);
		function switchTab(offset) {
			return function() {
				var tabs = container.children(".sitenotice-tab").toArray();
				var no = Number(container.find(".sitenotice-tab-no")[0].innerText) + offset;
				var count = tabs.length;
				if (no < 1) no = count;
				else if (no > count) no = 1;
				for (var i = 0; i < count; i++)
					tabs[i].style.display = (i + 1 == no ? null : "none");
				container.find(".sitenotice-tab-no")[0].innerText = no;
			};
		}
		container.find(".sitenotice-tab-arrow.prev").click(switchTab(-1));
		container.find(".sitenotice-tab-arrow.next").click(switchTab(1));
	});
});

$.getJSON(mw.util.wikiScript("index"), {
    title: "MediaWiki:Custom-import-scripts.json",
    action: "raw"
}).done(function (result, status) {
    if (status != "success" || typeof (result) != "object") return;
    var scripts = result[mw.config.get("wgPageName")];
    if (scripts) {
        if (typeof (scripts) == "string") scripts = [scripts];
        importArticles({ type: "script", articles: scripts });
    }
});

(function (mw, $) {
	"use strict";
	if (mw.config.get('wgPageName').toLowerCase().endsWith('.css')) {
		$.ajax({
			url: mw.config.get('wgArticlePath').replace('$1', mw.config.get('wgPageName')) + '?action=raw&text/css',
			dataType: 'text',
			success: function (cssContent) {
				var styleElement = document.createElement('style');
				styleElement.type = 'text/css';
				styleElement.textContent = cssContent;
				document.head.appendChild(styleElement);
				console.log('CSS已成功加载。');
			},
			error: function () {
				console.error('CSS加载失败，请尝试刷新或检查CSS页面。');
			}
		});
	}
})(mediaWiki, jQuery);

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
    ]
});


//New JS 4 Wordrain
/* Word Rain System v2.1 - Fandom Optimized */
window.wordRainSystem = (function() {
  'use strict';

  const instances = new Map();
  let styleAdded = false;

  function addCoreStyles() {
    if (styleAdded) return;
    
    mw.util.addCSS(`
      .word-drop {
        position: fixed;
        top: -50px;
        opacity: 0.9;
        animation: wordFall linear infinite;
        pointer-events: none;
        z-index: 9998;
        white-space: nowrap;
        text-shadow: 0 0 5px currentColor;
        will-change: transform, opacity;
        font-weight: bold;
      }
      
      @keyframes wordFall {
        0% { transform: translateY(-100vh) translateX(-5px); }
        100% { transform: translateY(100vh) translateX(5px); }
      }
      
      .word-rain-toggle[data-state="on"] {
        background: rgba(0,255,0,0.2) !important;
        border-color: #0f0 !important;
        color: #0f0 !important;
        text-shadow: 0 0 8px #0f0;
        box-shadow: 0 0 12px #0f0;
      }
    `);
    styleAdded = true;
  }

  function createDrop(instance) {
    const drop = document.createElement('div');
    drop.className = 'word-drop';
    
    // 随机位置
    const leftPos = 5 + Math.random() * 90;
    drop.style.left = `${leftPos}vw`;
    
    // 随机颜色
    const colors = instance.config.colors;
    drop.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    // 字体设置
    drop.style.fontSize = `${instance.config.size + Math.floor(Math.random() * 6)}px`;
    drop.style.fontFamily = instance.config.font;
    
    // 随机词语
    const words = instance.config.words;
    drop.textContent = words[Math.floor(Math.random() * words.length)];
    
    // 动画参数
    const baseSpeed = 10000 - (instance.config.speed * 800);
    const duration = (baseSpeed + Math.random() * 3000) / 1000;
    drop.style.animation = `wordFall ${duration}s linear infinite`;
    
    document.body.appendChild(drop);
    
    // 自动清理
    setTimeout(() => {
      drop.remove();
    }, duration * 1000);
  }

  return {
    init: function() {
      mw.hook('wikipage.content').add(function($content) {
        $content.find('.word-rain-widget').each(function() {
          const $widget = $(this);
          if ($widget.data('initialized')) return;
          
          // 初始化配置
          const config = {
            words: $widget.data('words').split(','),
            colors: $widget.data('colors').split(','),
            font: $widget.data('font'),
            size: parseInt($widget.data('size')) || 18,
            speed: Math.min(10, Math.max(1, parseInt($widget.data('speed')) || 5)),
            density: Math.min(50, Math.max(1, parseInt($widget.data('density')) || 30))
          };
          
          // 生成实例ID
          const instanceId = `wordrain-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
          
          instances.set(instanceId, {
            config: config,
            interval: null,
            active: false
          });
          
          // 标记初始化
          $widget.data('initialized', true)
                .data('instance-id', instanceId);
          
          // 初始化按钮状态
          const $btn = $widget.find('.word-rain-toggle');
          $btn.data('instance-id', instanceId)
              .attr('data-state', 'off')
              .text($widget.data('button-off'));
        });
      });
      
      // 全局点击处理
      $(document).on('click', '.word-rain-toggle', function() {
        const instanceId = $(this).data('instance-id');
        const instance = instances.get(instanceId);
        
        if (!instance) return;
        
        if (!instance.active) {
          // 启动特效
          instance.active = true;
          instance.interval = setInterval(
            () => createDrop(instance),
            Math.max(50, 1000 / instance.config.density)
          );
          
          $(this).attr('data-state', 'on')
                 .text($(this).closest('.word-rain-widget').data('button-on'));
        } else {
          // 停止特效
          instance.active = false;
          clearInterval(instance.interval);
          instance.interval = null;
          document.querySelectorAll('.word-drop').forEach(drop => drop.remove());
          
          $(this).attr('data-state', 'off')
                 .text($(this).closest('.word-rain-widget').data('button-off'));
        }
      });
      
      // 页面卸载时清理
      window.addEventListener('beforeunload', () => {
        instances.forEach(instance => {
          clearInterval(instance.interval);
          document.querySelectorAll('.word-drop').forEach(drop => drop.remove());
        });
      });
      
      // 添加核心样式
      addCoreStyles();
    },
    
    // 公共方法
    getInstances: () => instances,
    stopAll: () => {
      instances.forEach(instance => {
        clearInterval(instance.interval);
        instance.active = false;
      });
      document.querySelectorAll('.word-drop').forEach(drop => drop.remove());
    }
  };
})();

// 初始化
mw.loader.using(['mediawiki.util', 'jquery']).then(function() {
  wordRainSystem.init();
});

/* Image Slider System */
window.imageSlider = (function() {
'use strict';

const sliders = new Map();

function initSlider(container) {
const images = container.dataset.images.split(',');
const captions = container.dataset.captions.split(',');
const track = container.querySelector('.slider-track');
let currentIndex = 0;
let autoPlayInterval = null;

// 动态生成幻灯片
images.forEach((image, index) => {
const slide = document.createElement('div');
slide.className = 'slide-item';
slide.style.backgroundImage = `url(${mw.config.get('wgScriptPath')}/images/${image.trim()})`;

const overlay = document.createElement('div');
overlay.className = 'image-overlay';
slide.appendChild(overlay);

const caption = document.createElement('div');
caption.className = 'slide-caption';
caption.textContent = (captions[index] || '').replace(/[{}]/g, ''); // 移除描述中的{}
slide.appendChild(caption);

// 确保每张图片的描述都能显示
slide.addEventListener('mouseenter', () => {
overlay.style.opacity = '0.7';
caption.style.bottom = '0';
});

slide.addEventListener('mouseleave', () => {
overlay.style.opacity = '0';
caption.style.bottom = '-50px';
});

track.appendChild(slide);
});

function goToSlide(index) {
currentIndex = (index + images.length) % images.length;
track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function startAutoPlay() {
if (container.dataset.autoplay === '1') {
autoPlayInterval = setInterval(() => {
goToSlide(currentIndex + 1);
}, parseInt(container.dataset.speed));
}
}

function stopAutoPlay() {
clearInterval(autoPlayInterval);
}

// 事件绑定
container.querySelector('.prev-slide').addEventListener('click', () => goToSlide(currentIndex - 1));
container.querySelector('.next-slide').addEventListener('click', () => goToSlide(currentIndex + 1));

// 悬停暂停
if (container.dataset.autoplay === '1') {
container.addEventListener('mouseenter', stopAutoPlay);
container.addEventListener('mouseleave', startAutoPlay);
}

startAutoPlay();
sliders.set(container, { goToSlide, stopAutoPlay });
}

return {
init: function() {
mw.hook('wikipage.content').add(function($content) {
$content.find('.js-slider-container').each(function() {
if (!this.dataset.initialized) {
this.dataset.initialized = true;
initSlider(this);
}
});
});
}
};
})();

// 初始化
mw.loader.using('mediawiki.util').then(function() {
imageSlider.init();
});


//Flat3D
/* 3D Image Hover System */
window.image3DSystem = (function() {
'use strict';

function initImageCards(container) {
const images = container.dataset.images.split(',');
const captions = container.dataset.captions.split(',');
const grid = container.querySelector('.image-grid');

images.forEach((image, index) => {
const card = document.createElement('div');
card.className = 'image-card';

const content = document.createElement('div');
content.className = 'image-content';
content.style.backgroundImage = `url(${mw.config.get('wgScriptPath')}/images/${image.trim()})`;

const caption = document.createElement('div');
caption.className = 'caption';

// 解析Fandom内链
const captionText = (captions[index] || '').replace(/[{}]/g, '');
const linkMatch = captionText.match(/\[\[(.*?)\]\]/);
if (linkMatch) {
const linkParts = linkMatch[1].split('|');
const linkText = linkParts[1] || linkParts[0];
const linkHref = mw.util.getUrl(linkParts[0]);

const link = document.createElement('a');
link.href = linkHref;
link.textContent = linkText;
link.style.color = '#fff';
link.style.textDecoration = 'none';
caption.appendChild(link);
} else {
caption.textContent = captionText;
}

card.appendChild(content);
card.appendChild(caption);
grid.appendChild(card);

// 性能优化
card.style.willChange = 'transform';
});

// 移动端优化
if ('ontouchstart' in window) {
grid.querySelectorAll('.image-card').forEach(card => {
card.addEventListener('click', function() {
this.classList.toggle('hover-active');
});
});
}
}

return {
init: function() {
mw.hook('wikipage.content').add(function($content) {
$content.find('.flat-3d-container').each(function() {
if (!this.dataset.initialized) {
this.dataset.initialized = true;
initImageCards(this);
}
});
});
}
};
})();

// 初始化
mw.loader.using('mediawiki.util').then(function() {
image3DSystem.init();
});

$('.fandom-community-header__community-name-wrapper').append(
	$('<a/>').addClass('compass-wiki-badge').attr('href', '//community.fandom.com/wiki/Fandom_Compass').append(
		$('<img/>').css('height', '70px').css('position', 'relative').css('top', '20px')
		.attr('src', 'https://static.wikia.nocookie.net/backrooms/images/c/ca/Fandom_Compass_dark.png/revision/latest?cb=20250412193710&format=original&path-prefix=zh').attr('title', '本站点已是Fandom Compass计划的成员之一。')
));

$(document).ready(function() {
    mw.hook('wikipage.content').add(function($content) {
        // 为每个播放器创建独立的控制器
        $content.find('.player-container').each(function() {
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
            playerState.playBtn.on('click', function() {
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
            $(playerState.audio).on('timeupdate', function() {
                const percentage = (this.currentTime / this.duration) * 100;
                playerState.progress.css('width', percentage + '%');
            });
            // 进度条点击
            $player.find('.progress-bar').on('click', function(e) {
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
            playerState.volumeContainer.on('mousedown', function(e) {
                playerState.isDragging = true;
                updateVolume(e);
            });
            $(document).on('mousemove', function(e) {
                if (playerState.isDragging) {
                    updateVolume(e);
                }
            });
            $(document).on('mouseup', function() {
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
            playerState.volumeIcon.on('dblclick', function() {
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

var config = config || mw.config.get();

mw.hook("wikipage.content").add(function () {
	if (!["view", "edit", "submit"].includes(config.wgAction)) return;
	if (window.NervieJS) return;
	window.NervieJS = true;
	mw.loader.load("mediawiki.util");
	
	$(".talescon-table tbody tr").each(function() {
		var thisElement = this;
		$.getJSON(mw.util.wikiScript("wikia"), {
            controller: "DiscussionThread",
            method: "getThread",
            format: "json",
            threadId: this.getAttribute("data-vote-id")
        }).done(function(result) {
        	thisElement.children[2].textContent = result.poll.answers[0].votes;
        	thisElement.children[3].textContent = result.poll.answers[1].votes;
        	thisElement.children[4].textContent = result.poll.answers[2].votes;
        	thisElement.children[5].textContent = ((result.poll.answers[0].votes - result.poll.answers[2].votes) / result.poll.totalVotes).toFixed(4);
        });
	});
	
	$(".themedcon4-table tbody tr").each(function() {
		var cells = this.children;
		$.getJSON(mw.util.wikiScript("wikia"), {
            controller: "DiscussionThread",
            method: "getThread",
            format: "json",
            threadId: this.getAttribute("data-vote-id")
        }).done(function(result) {
        	cells[3].textContent = result.poll.answers[0].votes;
        	cells[4].textContent = result.poll.answers[1].votes;
        	cells[5].textContent = result.poll.answers[2].votes;
        	cells[6].textContent = result.poll.answers[3].votes;
        	cells[7].textContent = result.poll.answers[4].votes;
        	cells[8].textContent = (
        		(result.poll.answers[0].votes
        		+ result.poll.answers[1].votes / 2
        		- result.poll.answers[3].votes / 2
        		- result.poll.answers[4].votes) / result.poll.totalVotes
        	).toFixed(4);
        });
	});
	
    $.getJSON(mw.util.wikiScript("index"), {
        title: "User:HyperNervie/竞赛2.json",
        action: "raw",
        ctype: "application/json"
    }).done(function (result, status) {
        if (status != "success" || typeof (result) != "object") return;
        var entries_loaded = 0;
        mw.hook("pollLoader.loaded").add(function() {
            if (++entries_loaded < result.length) return;
            result.sort(function (a, b) { return b.rating - a.rating; });
            $("table.contest-results tbody").empty();
            result.forEach(function (entry, place) {
                $("table.contest-results tbody").append(
                    "<tr>" +
                        "<td>" + (place + 1) + "</td>" +
                        "<td>" +
                            '<a href="' + mw.util.getUrl(entry.name) + '" ' +
                                'title="' + entry.name + '">' +
                                (entry.title || entry.name) +
                            "</a>" +
                        "</td>" +
                        "<td>" +
                            '<a href="' + mw.util.getUrl("User:" + entry.author) + '" ' +
                                'title="User:' + entry.author + '">' +
                                entry.author +
                            "</a>" +
                        "</td>" +
                        "<td>" + entry.upvote + "</td>" +
                        "<td>" + entry.novote + "</td>" +
                        "<td>" + entry.downvote + "</td>" +
                        "<td>" + entry.rating.toFixed(4) + "</td>" +
                    "</tr>"
                );
            });
            $("table.contest-results").makeCollapsible();
        });
        result.forEach(function (entry) {
            $.getJSON(mw.util.wikiScript("wikia"), {
                controller: "DiscussionThread",
                method: "getThread",
                format: "json",
                threadId: entry.poll_id
            }).done(function (result, status) {
                if (status != "success" || typeof (result) != "object") return;
                entry.upvote = result.poll.answers[0].votes;
                entry.novote = result.poll.answers[1].votes;
                entry.downvote = result.poll.answers[2].votes;
                entry.rating = (entry.upvote - entry.downvote) / result.poll.totalVotes;
                mw.hook("pollLoader.loaded").fire();
            });
        });
	});
	
	$.getJSON(mw.util.wikiScript("api"), {
		action: "query",
		formatversion: 2,
		format: "json",
		meta: "siteinfo",
		siprop: "interwikimap",
		siinlanguagecode: config.wgUserVariant
	}, function (result, status) {
		if (status != "success" || typeof (result) != "object" || !result.batchcomplete) return;
		$("table.global-interwiki tbody").empty();
		$("table.local-interwiki tbody").empty();
		$("table.interlang tbody").empty();
		result.query.interwikimap.forEach(function (obj) {
			if (!obj.local)
				$("table.global-interwiki tbody").append(
					"<tr>" +
						"<td>" + obj.prefix.toLowerCase() + "</td>" +
						"<td>" + obj.url + "</td>" +
					"</tr>"
				);
			else if (obj.language)
				$("table.interlang tbody").append(
					"<tr>" +
						"<td>" + obj.prefix + "</td>" +
						"<td>" + obj.language + "</td>" +
						"<td>" + obj.url + "</td>" +
					"</tr>"
				);
			else
				$("table.local-interwiki tbody").append(
					"<tr>" +
						"<td>" + obj.prefix.toLowerCase() + "</td>" +
						"<td>" + obj.url + "</td>" +
					"</tr>"
				);
		});
		$("table.global-interwiki").makeCollapsible();
		$("table.local-interwiki").makeCollapsible();
		$("table.interlang").makeCollapsible();
	});
})();

mw.hook("wikipage.content").add(function () {
	if (config.wgCanonicalSpecialPageName != "Whatlinkshere") return;
	$(".mw-whatlinkshere-tools a.mw-redirect").each(function() {
		var url = mw.util.getUrl($(this)[0].title, {action: "delete"});
		$(this).after(' | <a href="' + url + '">删除</a>');
	});
});

mw.hook("wikipage.content").add(function () {
    $('span.import-script').each(function () {
        var $this = $(this);
        var scriptContent = $this.attr('data-script');
        var pageName = $this.attr("data-page");
        if (scriptContent) {
            try {
                new Function(scriptContent)();
                console.log("JS加载成功: " + pageName);
            } catch (error) {
                console.error("JS执行错误 (" + pageName + "):", error);
                $this.after('<strong class="error">JS执行错误: ' + error.message + '</strong>');
            }
        }
    });
});