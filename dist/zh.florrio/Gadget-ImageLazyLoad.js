/* ==================== 全站图片懒加载（跳过折叠区域） ==================== */
$(function () {
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                if (img.dataset.mwSrc) {
                    img.src = img.dataset.mwSrc;
                    img.removeAttribute('data-mw-src');
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '300px' });

    $('img').not('[data-lazy-handled]').each(function () {
        var $img = $(this);
        if (!$img.attr('src') || $img.closest('.no-lazy').length) return;

        // 跳过所有折叠、标签页、隐藏容器内的图片
        if ($img.closest('.mw-collapsible, .tabber, .tabbertab, .collapsed, [style*="display: none"], [style*="display:none"]').length) {
            return;
        }

        $img.attr('data-mw-src', $img.attr('src'));
        $img.attr('src', '');
        $img.attr('data-lazy-handled', '1');
        observer.observe(this);
    });
});