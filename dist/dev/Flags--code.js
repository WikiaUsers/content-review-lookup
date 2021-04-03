/**
 * Name:        Flags
 * Description: A snippet for easy adding images of certain languages into wiki
 *              pages without uploading those files
 * Author:      KockaAdmiralac <1405223@gmail.com>
 */
+function() {
    var mwContentTextProcessed = false;
    mw.hook('wikipage.content').add(function helper($content) {
        // ensure that mw-content-text processed was
        if ($content && $content.attr('id') === 'mw-content-text') {
            mwContentTextProcessed = true;
        } else if (!mwContentTextProcessed) {
            helper($('#mw-content-text'));
        }
        $content.find('.flag-icon').each(function() {
            var $this = $(this);
            $this.html($('<img>', {
                src: '//wlb.fandom.com/wiki/Special:FilePath/File:Small-' + $this.data().lang + '.png',
                title: $this.text()
            }));
        });
    });
}();