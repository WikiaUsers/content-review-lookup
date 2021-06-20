mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.iframe').each(function() {
        var $this = $(this),
            id = $this.attr('data-url'),
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: id,
                css: css
            })
        );
    });
});