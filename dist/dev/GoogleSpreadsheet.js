/**
 * Name:        GoogleSpreadsheet
 * Author:      Caburum
 * Description: Allows intergration with Google Spreadsheets
 */
 
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.googlespreadsheet').each(function() {
        var $this = $(this),
            id = $this.attr('data-spreadsheet-id'),
            widget = $this.attr('data-widget') || true;
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://docs.google.com/spreadsheets/d/e/' + id + '/pubhtml?widget=' + widget,
                css: css
            })
        );
    });
});