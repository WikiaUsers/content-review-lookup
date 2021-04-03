mw.hook('wikipage.content').add(function ($content) {
    if (!$content.find('.sfab').length) return;
    var defaults = {
            width: 640,
            height: 480,
            frameborder: 0,
            allow: '"autoplay; fullscreen; vr"'
        },
        src = 'https://sketchfab.com/models/(src)/embed';
    $content.find('.sfab').each(function () {
        var $el, $this = $(this), data = this.dataset;
        if (!data || !data.id) return;
        $el = $('<iframe>', {
            src: src.replace('(src)', data.id),
            width: data.width || defaults.width,
            height: data.height || defaults.height,
            frameborder: data.frameborder || defaults.frameborder,
            allow: data.allow || defaults.allow
        });
        $this.append($el);
    });
});