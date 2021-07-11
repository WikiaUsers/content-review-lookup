mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.scratch').each(function() {
        var $this = $(this),
            id = $this.attr('data-id'),
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://turbowarp.org/' + id +'/embed',
                css: css
            })
        );
    });
});