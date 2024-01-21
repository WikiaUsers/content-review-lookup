// Embedding tracks and/or playlists from VK Music (vk.com/music)
mw.loader.using('mediawiki.util').then(function() {
    'use strict';
     
    function vkPlayer() {
        var $vkPlayer = $(this),
        vkSource = $vkPlayer.data('source'),
        vkRegex = $vkPlayer.hasClass('vk-playlist') ?
        	/^https?:\/\/vk\.com\/\music\/\playlist\// :
        	/^https?:\/\/vk\.com\/\audio\//;
        var codes = vkSource.match(/playlist\/(.+)_(.+)_(.+)/);
        return vkRegex.test(vkSource) ? $('<iframe>', {
                'frameborder': '0',
                'style': 'border: none;',
                'width': $vkPlayer.data('width'),
                'height': $vkPlayer.data('height'),
                'src': codes ? ('https://vk.com/widget_playlist.php?app=0&width=100%25&_ver=1&oid=' + codes[1] + '&pid=' + codes[2] + '&hash=' + codes[3]) : vkSource
            })
            : null;
    }

    function vkHook($content) {
        $content
            .find('.vk-playlist, .vk-track')
            .html(vkPlayer);
    }
    vkHook(mw.util.$content);
    mw.hook('wikipage.content').add(vkHook);
});