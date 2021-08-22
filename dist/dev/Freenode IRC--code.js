mw.hook('wikipage.content').add(function($content) {
    $content.find('#JRChatReplace').each(function() {
        var $this = $(this);
        var src = $this.attr('data-freenode') ?
            'https://webchat.freenode.net' :
            'https://web.libera.chat';
        $this.html($('<iframe>', {
            src: src + '/#' + $this.attr('data-channels'),
            width:  $this.attr('data-width') || 450,
            height: $this.attr('data-height') || 500
        }));
    });
});