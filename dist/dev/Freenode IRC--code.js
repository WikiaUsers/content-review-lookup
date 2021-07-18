mw.hook('wikipage.content').add(function($content) {
    $content.find('#JRChatReplace').each(function() {
        var $this = $(this);
        var src = $this.attr('data-libera') ?
            'https://web.libera.chat' :
            'https://webchat.freenode.net';
        $this.html($('<iframe>', {
            src: src + '/#' + $this.attr('data-channels'),
            width:  $this.attr('data-width') || 450,
            height: $this.attr('data-height') || 500
        }));
    });
});