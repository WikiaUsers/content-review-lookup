/*************Вставка музыки с yandex********************/
mw.loader.using('mediawiki.util').then(function () {
    'use strict';
 
    function yandexPlayer() {
        var $yandex = $(this),
            yandexSrc = $yandex.data('src');
        return /^https?:\/\/music\.yandex\.ru\//.test(yandexSrc)
            ? $('<iframe>', {
                'frameborder': '0',
                'style': 'border: none;',
                'width': $yandex.data('width'),
                'height': $yandex.data('height'),
                'src': yandexSrc
            })
            : null;
    }
 
    function yandexHook($content) {
        $content
            .find('.yandex')
            .html(yandexPlayer);
    }
 
    yandexHook(mw.util.$content);
    mw.hook('wikipage.content').add(yandexHook);
 
});
/*************Вставка музыки с yandex*end****************/