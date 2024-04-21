//Code inspired by SketchfabIntegrator by fngplg.
//Author:繁星春水
(function(cfg) {
    if (cfg.loaded) return;
    cfg.loaded = !0;
    mw.hook('wikipage.content').add(function($content) {
        var $target = $content.find('.WikipediaIntegrator:not(.loaded)');
        $target.each(function() {
            var config = {},
                $this = $(this),
                pageTitle = $this.data('title'),
                width = $this.data('width'),
                height = $this.data('height'),
                language = $this.data('language') || 'en'; // Default to English if no language is specified.
            
            if (!pageTitle) return;
            pageTitle = pageTitle.trim().replace(/ /g, '_');

            // Use the language code to construct the Wikipedia URL
            var url = 'https://' + language + '.wikipedia.org/wiki/' + encodeURIComponent(pageTitle);

            if (width) config.width = width;
            if (height) config.height = height;
            $this.addClass('loaded');

            var iframe = $('<iframe>', config).attr('src', url).attr('frameborder', '0');
            $this.append(iframe);
        });
    });
}((window.dev = window.dev || {}).WikipediaIntegrator = window.dev.WikipediaIntegrator || {}));