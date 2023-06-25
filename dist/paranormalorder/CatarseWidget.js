/**
 * Name:        CatarseWidget
 * Author:      dr03ramos (based on Fujimaru-kun's work)
 * Description: Allows intergration with "Catarse" widgets (catarse.me)
 */
 
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.catarse').each(function() {
        var $this = $(this),
            id = '122021',
            css = {
                width: '290px',
                height: '350px',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://www.catarse.me/projects/' + id + '/embed',
                css: css,
				scrolling: 'no'
            })
        );
    });
});