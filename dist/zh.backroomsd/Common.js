/* 为了方便用户进行使用，增加了详细的注释 */
/* 由Deepseek R1进行注释 */

/* 主匿名立即执行函数 - 媒体播放控制 */
(function () {
    // 获取所有播放控制按钮
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        // 获取关联的媒体元素ID
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('元素缺少data-media-id属性', e);
            return;
        }
        
        // 查找对应的媒体元素（audio/video）
        const target = document.getElementsByClassName('media-id-' + targetId)[0];
        if (!target) {
            console.error('找不到对应媒体元素：media-id-' + targetId, e);
            return;
        }
        
        // 添加点击事件：切换播放/暂停
        e.addEventListener('click', function () {
            target.paused ? target.play() : target.pause();
        });
    });
})();

/* Fandom模块加载系统 */
mw.loader.load(["mediawiki.util", "mediawiki.Title"]);

/* 动态CSS加载系统（使用Fandom的页面内容钩子） */
mw.hook("wikipage.content").add(function () {
    // 处理带内联CSS的span元素
    $("span.import-css").each(function () {
        mw.util.addCSS($(this).attr("data-css")); // 使用Fandom API添加CSS
    });
    
    // 站点通知标签页切换系统
    $(".sitenotice-tab-container").each(function() {
        const container = $(this);
        
        // 标签切换逻辑生成器
        function switchTab(offset) {
            return function() {
                const tabs = container.children(".sitenotice-tab").toArray();
                let no = Number(container.find(".sitenotice-tab-no")[0].innerText) + offset;
                const count = tabs.length;
                
                // 循环处理页码
                no = no < 1 ? count : no > count ? 1 : no;
                
                // 显示目标标签页
                tabs.forEach((tab, i) => {
                    tab.style.display = i + 1 === no ? null : "none";
                });
                
                container.find(".sitenotice-tab-no")[0].innerText = no;
            };
        }
        
        // 绑定前后箭头点击事件
        container.find(".sitenotice-tab-arrow.prev").click(switchTab(-1));
        container.find(".sitenotice-tab-arrow.next").click(switchTab(1));
    });
});

/* 动态脚本加载系统 */
$.getJSON(mw.util.wikiScript("index"), {
    title: "MediaWiki:Custom-import-scripts.json",
    action: "raw"
}).done(function (result, status) {
    // 校验响应状态和数据结构
    if (status !== "success" || typeof result !== "object") return;
    
    // 获取当前页面名对应的脚本列表
    const scripts = result[mw.config.get("wgPageName")];
    if (scripts) {
        // 统一处理为数组格式
        importArticles({ 
            type: "script", 
            articles: typeof scripts === "string" ? [scripts] : scripts 
        });
    }
});

/* CSS页面实时预览系统 */
(function (mw, $) {
    "use strict";
    // 仅限以.css结尾的页面
    if (mw.config.get('wgPageName').toLowerCase().endsWith('.css')) {
        $.ajax({
            // 获取原始CSS内容
            url: mw.config.get('wgArticlePath').replace('$1', mw.config.get('wgPageName')) + '?action=raw&text/css',
            dataType: 'text',
            success: function (cssContent) {
                // 创建<style>标签并注入内容
                const styleElement = document.createElement('style');
                styleElement.type = 'text/css';
                styleElement.textContent = cssContent;
                document.head.appendChild(styleElement);
            },
            error: function () {
                console.error('CSS加载失败');
            }
        });
    }
})(mediaWiki, jQuery);

/* 词雨特效系统（详细注释） */
window.wordRainSystem = (function() {
  'use strict';
  // 实例管理器（使用Map存储配置和状态）
  const instances = new Map();
  let styleAdded = false;

  // 核心样式注入（防止重复添加）
  function addCoreStyles() {
    if (styleAdded) return;
    
    mw.util.addCSS(`...`); // 包含动画定义和基础样式
    styleAdded = true;
  }

  // 单个雨滴创建逻辑
  function createDrop(instance) {
    const drop = document.createElement('div');
    // 配置随机参数：位置、颜色、字体、速度
    const leftPos = 5 + Math.random() * 90;
    drop.style.left = `${leftPos}vw`;
    drop.style.color = instance.config.colors[Math.floor(Math.random() * colors.length)];
    // 动画持续时间计算
    const baseSpeed = 10000 - (instance.config.speed * 800);
    const duration = (baseSpeed + Math.random() * 3000) / 1000;
    drop.style.animation = `wordFall ${duration}s linear infinite`;
    
    // 自动清理机制
    setTimeout(() => drop.remove(), duration * 1000);
  }

  return {
    init: function() {
      // 使用Fandom内容钩子初始化小部件
      mw.hook('wikipage.content').add(function($content) {
        $content.find('.word-rain-widget').each(function() {
          // 配置解析（数据驱动）
          const config = {
            words: $widget.data('words').split(','),
            density: Math.min(50, Math.max(1, parseInt($widget.data('density')) || 30))
          };
          
          // 实例管理（唯一ID生成）
          const instanceId = `wordrain-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
          instances.set(instanceId, { config, interval: null, active: false });
        });
      });
      
      // 全局状态切换（启动/停止）
      $(document).on('click', '.word-rain-toggle', function() {
        const instance = instances.get($(this).data('instance-id'));
        if (instance.active) {
          clearInterval(instance.interval);
          document.querySelectorAll('.word-drop').forEach(drop => drop.remove());
        } else {
          instance.interval = setInterval(
            () => createDrop(instance),
            Math.max(50, 1000 / instance.config.density)
          );
        }
      });
      
      // 页面卸载清理
      window.addEventListener('beforeunload', () => {
        instances.forEach(instance => clearInterval(instance.interval));
      });
      
      addCoreStyles();
    },
    // 公共API
    stopAll: () => { /* ... */ }
  };
})();

/* 图片轮播系统（带自动播放和悬停暂停） */
window.imageSlider = (function() {
'use strict';
// 使用Map跟踪不同轮播实例
const sliders = new Map();

function initSlider(container) {
    // 数据解析
    const images = container.dataset.images.split(',');
    let currentIndex = 0;
    
    // 动态生成幻灯片
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.style.backgroundImage = `url(${mw.config.get('wgScriptPath')}/images/${image.trim()})`;
        // 添加悬停效果
        slide.addEventListener('mouseenter', () => overlay.style.opacity = '0.7');
    });

    // 自动播放逻辑
    function startAutoPlay() {
        if (container.dataset.autoplay === '1') {
            autoPlayInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, parseInt(container.dataset.speed));
        }
    }
    
    // 事件绑定
    container.querySelector('.prev-slide').addEventListener('click', () => goToSlide(currentIndex - 1));
}

return {
    init: function() {
        mw.hook('wikipage.content').add(function($content) {
            $content.find('.js-slider-container').each(initSlider);
        });
    }
};
})();

/* 3D图片悬停系统（带移动端优化） */
window.image3DSystem = (function() {
'use strict';

function initImageCards(container) {
    // 解析Fandom内链格式的标注
    const captionText = (captions[index] || '').replace(/[{}]/g, '');
    const linkMatch = captionText.match(/\[\[(.*?)\]\]/);
    if (linkMatch) {
        // 使用mw.util生成正确URL
        const linkHref = mw.util.getUrl(linkParts[0]);
    }
    
    // 移动端点击切换代替悬停
    if ('ontouchstart' in window) {
        card.addEventListener('click', function() {
            this.classList.toggle('hover-active');
        });
    }
}

return {
    init: function() {
        mw.hook('wikipage.content').add(function($content) {
            $content.find('.flat-3d-container').each(initImageCards);
        });
    }
};
})();