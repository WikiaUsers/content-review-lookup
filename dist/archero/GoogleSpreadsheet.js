/**
 * Name:        GoogleSpreadsheet
 * Author:      Tigershark14
 * Description: Google Docs Integration
 */
 
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.googledoc').each(function() {
        var $this = $(this),
        	type = $this.attr('data-type') || 'spreadsheets',
            key = $this.attr('data-key'),
            view = $this.attr('data-view') || 'preview',
            gid = $this.attr('data-gid') || '0';
            css = {
                width: $this.attr('data-width') || 'inherit',
                height: $this.attr('data-height') || 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://docs.google.com/'+ type +'/d/' + key + '/' + view + '#gid=' + gid + '&amp',
                css: css
            })
        );
    });
});