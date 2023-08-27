/**
 * Name:        FileLogs
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Adds log excerpts to file pages of deleted
 *              or moved files.
 */
(function($, mw) {
    'use strict';
    var config = mw.config.get([
        'wgAction',
        'wgArticleId',
        'wgNamespaceNumber',
        'wgPageName',
        'wgServer',
        'wgUserLanguage'
    ]);
    if (
        config.wgArticleId !== 0 ||
        config.wgAction !== 'view' ||
        config.wgNamespaceNumber !== 6 ||
        window.FileLogsLoaded
    ) {
        return;
    }
    window.FileLogsLoaded = true;
    var FileLogs = {
        init: function() {
            this.api = new mw.Api();
            $.when(
                this.getLogs(),
                this.getMessage()
            ).then(this.callback.bind(this));
        },
        getLogs: function() {
            return this.api.get({
                action: 'query',
                list: 'logevents',
                letitle: config.wgPageName
            });
        },
        getMessage: function() {
            return this.api.get({
                action: 'parse',
                text: '{{int:moveddeleted-notice}}',
                title: config.wgPageName,
                uselang: config.wgUserLanguage,
                disablepp: true
            });
        },
        callback: function(logs, message) {
            var q = logs[0].query;
            if (!(q.logevents instanceof Array) || q.logevents.length === 0) {
                return;
            }
            this.$warning = $('<div>', {
                'class': 'mw-warning-with-logexcerpt'
            }).append(
                $('<p>', {
                    html: message[0].parse.text['*']
                }),
                $('<div>').load(
                    config.wgServer +
                    mw.util.getUrl('Special:Log', {
                        page: config.wgPageName,
                        uselang: config.wgUserLanguage
                    }) +
                    ' #mw-content-text > ul',
                    this.loaded.bind(this)
                )
            ).prependTo('#mw-content-text');
            mw.hook('FileLogs.inserted').fire(this.$warning);
        },
        loaded: function() {
            var $div = this.$warning.find('> div');
            $div.replaceWith($div.html());
            mw.hook('FileLogs.loaded').fire(this.$warning);
        }
    };
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then(FileLogs.init.bind(FileLogs));
})(window.jQuery, window.mediaWiki);