/* ============================================
   Material Design 3 涟漪效果 - 核心交互逻辑
   ============================================ */

// 等待页面DOM加载完成后初始化
$(function() {
    initRippleEffects();
});

function initRippleEffects() {
    // 1. 为所有 .mw-material-card 和 .infobox.ripple-enabled 元素绑定事件
    $('.mw-material-card, .infobox.ripple-enabled').each(function() {
        var $element = $(this);

        // 避免重复绑定事件
        if ($element.data('has-ripple')) return;
        $element.data('has-ripple', true);

        // 监听点击事件
        $element.on('click', function(event) {
            createRipple(event, $element);
        });
    });
}

function createRipple(event, $element) {
    // 2. 计算涟漪的大小（取元素宽高中的最大值作为直径）
    var diameter = Math.max($element.outerWidth(), $element.outerHeight());
    var radius = diameter / 2;

    // 3. 计算点击位置在元素内部的相对坐标
    var offset = $element.offset();
    var posX = event.pageX - offset.left;
    var posY = event.pageY - offset.top;

    // 4. 创建涟漪的DOM元素
    var $ripple = $('<span class="md-ripple-circle"></span>');

    // 5. 设置涟漪元素的初始位置和大小
    $ripple.css({
        width: diameter + 'px',
        height: diameter + 'px',
        left: (posX - radius) + 'px', // 让涟漪圆的中心对准点击点
        top: (posY - radius) + 'px'
    });

    // 6. 清理旧涟漪，添加新涟漪
    $element.find('.md-ripple-circle').remove();
    $element.append($ripple);

    // 7. 在动画结束后（0.6秒）自动移除涟漪元素，保持DOM清洁
    setTimeout(function() {
        $ripple.remove();
    }, 600);
}