/**
 * @name            RCLink
 * @version         v1.1
 * @author          TheGoldenPatrik1
 * @description     Switches WikiActivity and RC links.
 */
(function () {
    if (window.RCLinkLoaded) {
        return;
    }
    window.RCLinkLoaded = true;
    var ns = mw.config.get('wgFormattedNamespaces')[-1],
    options = $.extend(
        {
            limit: window.RCLinkLimit || undefined,
            keepLink: window.KeepActivityLink || false,
            headerButton: true,
            headerLink: true
        },
        window.RCLink
    );
    /**
     * @method link
     * @description Creates a link to RecentChanges.
     * @returns {string}
     */
    function link () {
        return mw.util.getUrl(
            ns + ':RecentChanges',
            options.limit ?
            { limit: options.limit } :
            undefined
        );
    }
    /**
     * @method init
     * @description Initiates the script and changes the links.
     * @returns {void}
     */
    function init () {
        var $activity = $('a[data-tracking="explore-activity"]'),
            $rc = $('a[data-tracking="more-recent-changes"]');
        $activity.parent().parent().prepend(
            $('<li>').append(
                $('<a>', {
                    'href': link(),
                    'data-tracking': 'explore-rc',
                    'text': $rc.text()
                })
            )
        );
        if (options.headerButton) {
            $('a[data-tracking="wiki-activity"]').attr({
                'href': link(),
                'title': $rc.text().trim(),
                'data-tracking': 'recent-changes'
            });
        }
        if (options.headerLink) {
            $rc.attr({
                'href': mw.util.getUrl(ns + ':WikiActivity'),
                'data-tracking': 'more-wiki-activity'
            }).text(
                $activity.text()
            );
        }
        if (!options.keepLink) {
            $activity.remove();
        }
    }
    mw.loader.using('mediawiki.util').then(init);
})();