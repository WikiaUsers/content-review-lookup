!function(cfg) {
    // sorts categories by name
    // do not bother anons
    if (cfg.loaded || !mw.config.get('wgUserName')) return;
    cfg.loaded = !0;
    
    function sorter(a, b) {
        // locale will be determined automatically. probably. works on my machine
        return (a.textContent || '').localeCompare(b.textContent || '');
    }// sorter

    $(function() {
        $('.article-categories .categories').each(function(_, target) {
            var $target = $(target);
            var $label = $target.find('.special-categories-label');
            var $newLabel = $label.clone();
            $label.remove();
            var $children = $target.children();
            var sorted = $children.sort(sorter);
            $target.empty().append(sorted).prepend($newLabel);
        });
    });
}((window.fng = window.fng || {}).catsorter = window.fng.catsorter || {});