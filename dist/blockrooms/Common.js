/* Any JavaScript here will be loaded for all users on every page load. */
(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0];
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
				console.log('CSS loaded successfully.');
			},
			error: function () {
				console.error('CSS Load Error.');
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
    

    const leftPos = 5 + Math.random() * 90;
    drop.style.left = `${leftPos}vw`;
    

    const colors = instance.config.colors;
    drop.style.color = colors[Math.floor(Math.random() * colors.length)];
    

    drop.style.fontSize = `${instance.config.size + Math.floor(Math.random() * 6)}px`;
    drop.style.fontFamily = instance.config.font;
    

    const words = instance.config.words;
    drop.textContent = words[Math.floor(Math.random() * words.length)];
    

    const baseSpeed = 10000 - (instance.config.speed * 800);
    const duration = (baseSpeed + Math.random() * 3000) / 1000;
    drop.style.animation = `wordFall ${duration}s linear infinite`;
    
    document.body.appendChild(drop);
    

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
          

          const config = {
            words: $widget.data('words').split(','),
            colors: $widget.data('colors').split(','),
            font: $widget.data('font'),
            size: parseInt($widget.data('size')) || 18,
            speed: Math.min(10, Math.max(1, parseInt($widget.data('speed')) || 5)),
            density: Math.min(50, Math.max(1, parseInt($widget.data('density')) || 30))
          };
          

          const instanceId = `wordrain-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
          
          instances.set(instanceId, {
            config: config,
            interval: null,
            active: false
          });
          

          $widget.data('initialized', true)
                .data('instance-id', instanceId);
          

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

          instance.active = true;
          instance.interval = setInterval(
            () => createDrop(instance),
            Math.max(50, 1000 / instance.config.density)
          );
          
          $(this).attr('data-state', 'on')
                 .text($(this).closest('.word-rain-widget').data('button-on'));
        } else {

          instance.active = false;
          clearInterval(instance.interval);
          instance.interval = null;
          document.querySelectorAll('.word-drop').forEach(drop => drop.remove());
          
          $(this).attr('data-state', 'off')
                 .text($(this).closest('.word-rain-widget').data('button-off'));
        }
      });
      
      window.addEventListener('beforeunload', () => {
        instances.forEach(instance => {
          clearInterval(instance.interval);
          document.querySelectorAll('.word-drop').forEach(drop => drop.remove());
        });
      });
      

      addCoreStyles();
    },
    

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


container.querySelector('.prev-slide').addEventListener('click', () => goToSlide(currentIndex - 1));
container.querySelector('.next-slide').addEventListener('click', () => goToSlide(currentIndex + 1));


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


card.style.willChange = 'transform';
});


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


mw.loader.using('mediawiki.util').then(function() {
image3DSystem.init();
});