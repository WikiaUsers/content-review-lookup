+function(cfg) {
    // adds sketchfab (image?/iframe) to the .sketchfab class
    // https://sketchfab.com/developers/oembed
    if (cfg.loaded) return;
    cfg.loaded = !0;
    mw.hook('wikipage.content').add(function($content) {
        var $target = $content.find('.sketchfab:not(.loaded)');
        $target.each(function() {
            var config = {},
                $this = $(this),
                url = $this.data('url'),
                width = $this.data('width'),
                height = $this.data('height');
            if (!url) return;
            url = url.trim().indexOf('https://') === 0 ? url.trim() : ('https://sketchfab.com/3d-models/' + url.trim());
            url = 'https://sketchfab.com/oembed?url=' + url;
            if (width) config.maxwidth = width;
            if (height) config.maxheight = height;
            $this.addClass('loaded');
            $.getJSON(url, config).done(function(data) {
                if (!data || !data.html) return;
                $this.replaceWith(data.html);
            });
        });
    });
}((window.dev = window.dev || {}).sketchfab = window.dev.sketchfab || {});