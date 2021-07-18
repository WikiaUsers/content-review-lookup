(function() {
    if (window.InsertablesLoaded) {
        return;
    }
    window.InsertablesLoaded = true;
    /* backwards compatibility */
    var config = mw.config.get([
        'wgPageName',
        'wgUserName',
        'wikiaPageType'
    ]), whitelist = [
        'wikiaPageType'
    ];
    mw.hook('wikipage.content').add(function($content) {
        if (config.wgUserName) {
            $content.find('.wgUserName').text(config.wgUserName);
        }
        if (config.wikiaPageType) {
            $content.find('.wikiaPageType').text(config.wikiaPageType);
        }
        if (config.wgPageName) {
            $content.find('.wgPageName').text(config.wgPageName);
        }
        /* new version */
        $content.find('.mediaWikiData').each(function() {
            var $this = $(this),
                data = $this.data('var');
            if (
                typeof data === 'string' &&
                (
                    data.indexOf('wg') === 0 ||
                    whitelist.indexOf(data) !== -1
                )
            ) {
                data = mw.config.get(data);
                if (data && typeof data === 'string') {
                    $this.text(data);
                }
            }
        });
    });
})();