/**
 * Name:        Google Calendar
 * Description: Allows integration with Google Calendar
 * Credits:		Based on [[dev:Google Forms]]
 */
 
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.googlecalendar').each(function() {
        var $this = $(this),
            title = $this.attr('data-title'),
            src = $this.attr('data-src'),
            mode = $this.attr('data-mode');
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://www.google.com/calendar/embed?title=' + title + '&src=' + src + '&mode=' + mode,
                css: css
            })
        );
    });
});