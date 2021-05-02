/**
 * Name:        Flags ( *Modded to use big flags from u:flags*)
 * Link to ori: http://dev.wikia.com/wiki/MediaWiki:Flags
 * Description: A snippet for easy adding images of certain languages into wiki
 *              pages without uploading those files
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Modded:      Qoushik
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
                src: '//flags.fandom.com/wiki/Special:FilePath/File:' + $this.data().lang + $this.data().type,
                width: $this.data().width,
                title: $this.text()
            }));
        });
    });
}();