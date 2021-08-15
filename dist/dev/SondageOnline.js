/**
 * Name: SondageOnline
 * Description: Allows you to integrate polls from SondageOnline
 * Author: Soronos
 */
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.sondageonline').each(function() {
        var $this = $(this),
            id = $this.attr('data-poll-id'),
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://www.sondageonline.fr/s/' + id,
                css: css
            })
        );
    });
});