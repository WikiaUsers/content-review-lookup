mw.hook('wikipage.content').add(function($content) {
    $content.find('#JRChatReplace').each(function() {
        var $this = $(this);
        $this.html($('<iframe>', {
            src: 'https://webchat.freenode.net/?channels=' + encodeURIComponent($this.attr('data-channels')),
            width:  $this.attr('data-width') || 450,
            height: $this.attr('data-height') || 500
        }));
    });
});