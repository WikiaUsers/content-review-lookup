(function () {
    var loaded, loadQueue = [],
        $rail = $('#WikiaRail'),
        railClass = $rail.attr('class');
    if (!$rail.exists()) {
        return;
    }

    function place($module) {
        var $ads;
        if (window.DiscordBannerPrepend) {
            $ads = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last();
            if ($ads.exists()) {
                $module.insertAfter($ads);
            } else {
                $rail.prepend($module);
            }
        } else {
            $ads = $('.rail-sticky-module');
            if ($ads.exists()) {
                $module.insertBefore($ads);
            } else {
                $rail.prepend($module);
            }
        }
    }

    function placeQueue() {
        loaded = true;
        loadQueue.forEach(place);
    }
    (window.DiscordBannerModules || ['MediaWiki:Custom-DiscordBanner-id']).forEach(function (el) {
        var config = window.DiscordBannerSettings || {},
        bannerStyle = config.bannerStyle || '3';
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            text: '{' + '{' + el + '}}',
            title: mw.config.get('wgPageName'),
            format: 'json'
        }).done(function (d) {
            var $section = $('<section>', {
                'class': 'discordBanner rail-module',
                'style': 'transform: scale(0.9) !important; margin-left: -2px !important;',
                html: $('<a>', {
                    href: 'https://discordapp.com'
                }).append($('<img>', {
                    src: 'https://discordapp.com/api/guilds/' + d.parse.text['*'].replace(/[\s\S]*(\d{18})[\s\S]*/, '$1') + '/widget.png?style=banner' + bannerStyle
                }))
            });
            if (loaded) {
                place($section);
            } else {
                loadQueue.push($section);
            }
            mw.hook('wikipage.content').fire($section);
            mw.hook('AddRailModule.module').fire(el);
        });
    });
    if (railClass && railClass.split(/\s+/).indexOf('loaded') === -1) {
        $rail.on('afterLoad.rail', placeQueue);
    } else {
        placeQueue();
    }
})();