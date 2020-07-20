mw.hook('wikipage.content').add(function($content) {
    $content.find('#JRChatReplace').each(function() {
        var $this = $(this);
        $this.html($('<iframe>', {
            src: 'https://webchat.freenode.net/?channels=' + encodeURIComponent($this.data('channels')),
            width: 450,
            height: 400
        }));
    });
});