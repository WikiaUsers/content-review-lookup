// instagram embedding: https://www.instagram.com/developer/embedding/
!function(cfg) {
    if (cfg.loaded) return;
    cfg.loaded = !0;
    mw.hook('wikipage.content').add(function($content) {
        var $target = $content.find('.instagramwidget');
        $target.each(function() {
            var $this = $(this),
                params = {
                    url: $this.data('url'),
                    maxwidth: $this.data('maxwidth'),
                    hidecaption: $this.data('hidecaption'),
                    omitscript: $this.data('omitscript'),
                };
            if (!params.url) return;
            // endpoint requirement
            if (params.maxwidth && params.maxwidth < 320) params.maxwidth = 320;
            $.getJSON('https://api.instagram.com/oembed', params).done(function(data) {
                if (!data || !data.html) return;
                $this.html(data.html);
            });
        });// $target.each
    });
}((window.fng = window.fng || {}).instagramwidget = window.fng.instagramwidget || {});