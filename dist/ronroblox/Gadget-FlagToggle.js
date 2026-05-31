mw.hook('wikipage.content').add(function ($content) {
    'use strict';

    $content.find('.portable-infobox').each(function () {
        var $tabs = $(this).find('.pi-image-collection-tab');
        if (!$tabs.length) return;

        var slots = [];

        $tabs.each(function () {
            var $img  = $(this).find('img').first();
            var $a    = $(this).find('a').first();
            var fname = $img.attr('data-image-name') || '';
            if (!/Flag\.png$/i.test(fname)) return;
            slots.push({
                $img       : $img,
                $a         : $a,
                rippleTitle: 'File:' + fname.replace(/Flag\.png$/i, 'Ripple.png')
            });
        });

        if (!slots.length) return;

        $.getJSON(mw.util.wikiScript('api'), {
            action : 'query',
            titles : slots.map(function (s) { return s.rippleTitle; }).join('|'),
            prop   : 'imageinfo',
            iiprop : 'url',
            format : 'json'
        }).done(function (data) {
            if (!data || !data.query) return;
            var urlMap = {};
            $.each(data.query.pages, function (_, p) {
                if (p.imageinfo && p.imageinfo[0]) urlMap[p.title] = p.imageinfo[0].url;
            });
            slots.forEach(function (s) {
                var url = urlMap[s.rippleTitle];
                if (!url) return;
                s.$img.attr('src', url).removeAttr('srcset');
                if (s.$img.attr('data-src')) s.$img.attr('data-src', url);
                s.$a.attr('href', url);
            });
        });
    });
});