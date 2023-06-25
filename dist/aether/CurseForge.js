/**
 * Name:        CurseForge
 * Description: Allows integration with CurseForge Widget
 * Credits:        Based on [[dev:GoogleSpreadsheet]]
 */
 
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.curseforge').each(function() {
        var $this = $(this),
            project = $this.attr('data-project');
            version = $this.attr('data-version');
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://www.cfwidget.com/' + project + '?version=' + version,
                css: css,
                scrolling: 'no'
            })
        );
    });
});