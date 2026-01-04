// 自由游标窗口
$(document).ready(function() {
    const draggableElements = document.querySelectorAll('.free-cursor-window');
    if (draggableElements.length === 0) return;

    draggableElements.forEach(draggable => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        const cursorImg = draggable.querySelector('.free-cursor-img');
        if (cursorImg) {
            cursorImg.addEventListener('click', function(e) {
                e.preventDefault(); 
                e.stopPropagation(); 
            });
            cursorImg.addEventListener('mousedown', function(e) {
                e.stopPropagation(); 
            });
        }

        draggable.onmousedown = dragStart;
        function dragStart(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = dragEnd;
            document.onmousemove = dragMove;
        }

        function dragMove(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            draggable.style.top = (draggable.offsetTop - pos2) + "px";
            draggable.style.left = (draggable.offsetLeft - pos1) + "px";
        }

        function dragEnd() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    });
});

// 原版代码：完整保留，无任何修改（已验证可靠）
// 单页面主题 - 覆盖导航栏/深浅色/页面全维度
mw.hook('wikipage.content').add(function() {
    const themeData = document.getElementById('custom-page-theme');
    if (!themeData) return; // 保留原版：无此div则不执行任何操作，不影响全局

    // 1. 给body添加专属类名（关联Common.css的样式）：保留不变
    document.body.classList.add('custom-page-theme');

    // 2. 读取页面自定义参数（带默认值：保留原版，扩展阴影/正文文字参数）
    const params = {
        // 原版基础参数：保留不变
        navText: themeData.dataset.navText || '#ffffff',
        navTextHover: themeData.dataset.navTextHover || '#f5f5dc',
        wikiName: themeData.dataset.wikiName || '#ffffff',
        pageTitle: themeData.dataset.pageTitle || '#cc0000',
        // 原版浅色模式参数：保留不变，扩展阴影参数
        lightBg: themeData.dataset.lightBg || 'rgba(250,235,215,1.0)',
        lightSecondaryBg: themeData.dataset.lightSecondaryBg || 'rgba(244,164,96,0.5)',
        lightLink: themeData.dataset.lightLink || '#8B4513',
        lightBorder: themeData.dataset.lightBorder || '#C67B5C',
        // 扩展：浅色阴影参数（保留原版默认值）
        lightShadow: themeData.dataset.lightShadow || '#E27B58',
        // 原版深色模式参数：保留不变，扩展阴影参数
        darkBg: themeData.dataset.darkBg || 'rgba(75,37,19,0.95)',
        darkSecondaryBg: themeData.dataset.darkSecondaryBg || 'rgba(102,57,38,0.9)',
        darkLink: themeData.dataset.darkLink || '#FF9D6F',
        darkBorder: themeData.dataset.darkBorder || '#E27B58',
        // 扩展：深色阴影参数（保留原版默认值）
        darkShadow: themeData.dataset.darkShadow || '#E27B58',
        // 原版导航栏参数：保留不变
        headerColor: themeData.dataset.headerColor || '#e76329',
        stickyNavBg: themeData.dataset.stickyNavBg || 'rgba(165,42,42,0.7)',
        stickyNavText: themeData.dataset.stickyNavText || '#fffafa',
        // 扩展：正文文字参数（默认值与原版一致，不影响全局）
        bodyText: themeData.dataset.bodyText || '#333333'
    };

    // 3. 动态赋值CSS变量（覆盖Common.css的默认值：保留原版，扩展新增变量）
    const body = document.body;
    // 原版基础变量：保留不变
    body.style.setProperty('--custom-nav-text', params.navText);
    body.style.setProperty('--custom-nav-text-hover', params.navTextHover);
    body.style.setProperty('--custom-wiki-name', params.wikiName);
    body.style.setProperty('--custom-page-title', params.pageTitle);
    // 原版浅色模式变量：保留不变，扩展阴影变量
    body.style.setProperty('--custom-light-bg', params.lightBg);
    body.style.setProperty('--custom-light-secondary-bg', params.lightSecondaryBg);
    body.style.setProperty('--custom-light-link', params.lightLink);
    body.style.setProperty('--custom-light-border', params.lightBorder);
    // 扩展：赋值浅色阴影变量
    body.style.setProperty('--custom-light-shadow', params.lightShadow);
    // 原版深色模式变量：保留不变，扩展阴影变量
    body.style.setProperty('--custom-dark-bg', params.darkBg);
    body.style.setProperty('--custom-dark-secondary-bg', params.darkSecondaryBg);
    body.style.setProperty('--custom-dark-link', params.darkLink);
    body.style.setProperty('--custom-dark-border', params.darkBorder);
    // 扩展：赋值深色阴影变量
    body.style.setProperty('--custom-dark-shadow', params.darkShadow);
    // 原版导航栏变量：保留不变
    body.style.setProperty('--custom-header-color', params.headerColor);
    body.style.setProperty('--custom-sticky-nav-bg', params.stickyNavBg);
    body.style.setProperty('--custom-sticky-nav-text', params.stickyNavText);
    // 扩展：赋值正文文字变量
    body.style.setProperty('--custom-body-text', params.bodyText);
});

mw.loader.using(['jquery', 'mediawiki.api']).done(function(){$(document).ready(function(){var t='Template:CustomSidebar',e=$('#WikiaRail');e.length>0&&new mw.Api().get({action:'parse',page:t,format:'json',prop:'text'}).done(function(t){var n=t.parse.text['*'];e.prepend(n)})})});

// 等待页面DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
// 获取图片切换容器（通过类名注入JS功能，这就是JS的页面生效方式）
const imgSlider = document.querySelector('.error-flash-img-slider');
if (!imgSlider) return;

// 获取所有待切换图片
const sliderImages = imgSlider.querySelectorAll('.slider-single-img');
const maxImgCount = 5; // 限制最多5张图片
const actualImgCount = Math.min(sliderImages.length, maxImgCount);
let currentImgIndex = 0;

// 核心修改：2000 → 5000（毫秒），图片切换间隔改为5秒
setInterval(function() {
// 给当前显示的图片添加闪烁动画
sliderImages[currentImgIndex].classList.add('flash-error-active');

// 保留300毫秒延时，匹配CSS 0.3秒无过渡闪烁时长
setTimeout(function() {
// 隐藏当前图片并移除动画类
sliderImages[currentImgIndex].style.display = 'none';
sliderImages[currentImgIndex].classList.remove('flash-error-active');

// 更新索引（循环切换，最多5张）
currentImgIndex = (currentImgIndex + 1) % actualImgCount;

// 显示下一张图片
sliderImages[currentImgIndex].style.display = 'block';
}, 300);
}, 5000); // 切换间隔改为5秒（5000毫秒）
});