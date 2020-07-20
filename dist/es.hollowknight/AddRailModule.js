/*
 * Adds custom module to the Wikia Rail
 */
(function() {
    var loaded, loadQueue = [], $rail = $('#WikiaRail'),
        railClass = $rail.attr('class');
    if (!$rail.exists()) {
        return;
    }
    function place($module) {
        var $ads;
        if (window.ARMPrepend) {
            $ads = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last();
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
                $rail.append($module);
            }
        }
    }
    function placeQueue() {
        loaded = true;
        loadQueue.forEach(place);
    }
    (window.ARMModules || ['Template:RailModule']).forEach(function(el) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            text: '{' + '{' + el + '}}',
            title: mw.config.get('wgPageName'),
            format: 'json'
        }).done(function(d) {
            var $section = $('<section>', {
                'class': 'railModule rail-module',
                html: d.parse.text['*']
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