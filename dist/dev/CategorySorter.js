!function(cfg) {
    // sorts categories by name
    // do not bother anons
    if (cfg.loaded || !mw.config.get('wgUserName')) return;
    cfg.loaded = !0;
    
    var targets = [
            '.special-categories-label + .categories li',
            '.hidden-categories-label + .categories li'
        ];
    
    function sorter(a, b) {
        // locale will be determined automatically. probably. works on my machine
        return (a.textContent || '').localeCompare(b.textContent || '');
    }// sorter

    $(function() {
        targets.forEach(function(target) {
            var $target = $(target),
                $parent = $target.parent(),// cache parent, cuz it will be lost after .remove
                sorted = $target.sort(sorter);
            $parent.empty().append(sorted);
        });
    });
}((window.fng = window.fng || {}).catsorter = window.fng.catsorter || {});