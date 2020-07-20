/**
 * Name:        StrawpollIntegrator
 * Author:      Fujimaru-kun
 * Description: Allows intergration with Strawpoll polls
 */
 
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.strawpoll').each(function() {
        var $this = $(this),
            id = $this.attr('data-poll-id'),
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://www.strawpoll.me/embed_1/' + id,
                css: css
            })
        );
    });
});