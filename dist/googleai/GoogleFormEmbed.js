// Enabling Google Forms to be embedded in articles
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.googleforms').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            widget = $this.attr('data-widget') || true,
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://docs.google.com/forms/d/e/' + id + '/viewform?embedded=true&hl=' + mw.config.get('wgUserLanguage'),
                css: css
            })
        );
    });
});