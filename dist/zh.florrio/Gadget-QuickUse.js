
/* 浮动球快捷菜单 by Fadom */
$(function () {
    // 避免重复创建
    if (document.getElementById('fab-menu')) return;

    // 浮动球容器
    var $fab = $('<div>').attr('id', 'fab-menu').css({
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 9999,
        fontFamily: 'sans-serif'
    });

    // 主按钮（圆形浮动球）
    var $mainBtn = $('<div>').css({
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#3366cc',
        color: '#fff',
        textAlign: 'center',
        lineHeight: '56px',
        fontSize: '24px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        transition: 'transform 0.2s',
        userSelect: 'none'
    }).html('⚡').appendTo($fab);

    // 菜单列表（默认隐藏）
    var $menu = $('<div>').css({
        position: 'absolute',
        bottom: '70px',
        right: '0',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        padding: '8px 0',
        minWidth: '180px',
        display: 'none',
        overflow: 'hidden'
    }).appendTo($fab);

    // 菜单项数据
    var items = [
        { label: '进入参数设置', url: mw.util.getUrl('Special:参数设置') },
        { label: 'MediaWiki:Common.css', url: mw.util.getUrl('MediaWiki:Common.css', { action: 'edit' }) },
        { label: 'MediaWiki:Common.js', url: mw.util.getUrl('MediaWiki:Common.js', { action: 'edit' }) },
        { label: 'Special:JSPages', url: mw.util.getUrl('Special:JSPages') },
        { label: '查看当前页修订历史', action: function () {
            var url = new URL(window.location.href);
            url.searchParams.set('action', 'history');
            window.location.href = url.toString();
        }},
         { label: '更改内容模型', url: mw.util.getUrl('Special:ChangeContentModel/' + mw.config.get('wgPageName')) },
        { label: '清除页面缓存', action: function () {
            var url = new URL(window.location.href);
            url.searchParams.set('action', 'purge');
            window.location.href = url.toString();
        }}
       
    ];

    // 生成菜单项
    items.forEach(function (item) {
        var $item = $('<div>').css({
            padding: '10px 20px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background 0.15s'
        }).text(item.label).appendTo($menu);

        $item.hover(
            function () { $(this).css('background', '#f0f4ff'); },
            function () { $(this).css('background', 'transparent'); }
        );

        $item.on('click', function (e) {
            e.stopPropagation();
            if (typeof item.action === 'function') {
                item.action();
            } else {
                window.location.href = item.url;
            }
            $menu.hide();
            $mainBtn.css('transform', 'rotate(0deg)');
        });
    });

    // 点击主按钮切换菜单
    $mainBtn.on('click', function (e) {
        e.stopPropagation();
        var isVisible = $menu.is(':visible');
        $menu.toggle(!isVisible);
        $mainBtn.css('transform', isVisible ? 'rotate(0deg)' : 'rotate(90deg)');
    });

    // 点击页面其他地方关闭菜单
    $(document).on('click', function () {
        $menu.hide();
        $mainBtn.css('transform', 'rotate(0deg)');
    });

    // 阻止菜单内部点击冒泡
    $menu.on('click', function (e) {
        e.stopPropagation();
    });

    // 添加到页面
    $('body').append($fab);
});