/**
 * Name:        AFProtected
 * Version:     v1.1
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Shows a warning on pages protected by AbuseFilter.
 */
(function () {
    var AFProtected = {
        config: mw.config.get([
            'wgAction',
            'wgNamespaceNumber',
            'wgPageName',
            'wgUserGroups'
        ]),
        shouldRun: function() {
            var p = this.config.wgPageName;
            // Only run if wasn't already running,
            return !window.AFProtectedLoaded &&
                   // the page is in the MediaWiki namespace,
                   this.config.wgNamespaceNumber === 8 &&
                   // the page isn't a whitelisted JS,
                   !(
                       p.lastIndexOf('.js') === p.length - 3 &&
                       p !== 'MediaWiki:Common.js' &&
                       p !== 'MediaWiki:Wikia.js' &&
                       p !== 'MediaWiki:Fandomdesktop.js'
                   ) &&
                   // a whitelisted CSS,
                   !(
                       p.lastIndexOf('.css') === p.length - 4 &&
                       p !== 'MediaWiki:Common.css' &&
                       p !== 'MediaWiki:Wikia.css' &&
                       p !== 'MediaWiki:Fandomdesktop.css'
                   ) &&
                   // a whitelisted Custom-
                   (
                       p.indexOf('MediaWiki:Custom-') !== 0 ||
                       p === 'MediaWiki:Custom-Discord-id'
                   ) &&
                   // or a whitelisted Gadget- page
                   p.indexOf('MediaWiki:Gadget-') !== 0 &&
                   // and the user isn't in a whitelisted user group.
                   !this.config.wgUserGroups.join().match(
                       /content-moderator|sysop|content-team-member|helper|soap|staff|wiki-manager/
                   );
        },
        init: function() {
            if (!this.shouldRun()) {
                return;
            }
            window.AFProtectedLoaded = true;
            if (
                this.config.wgAction === 'edit' ||
                this.config.wgAction === 'submit'
            ) {
                this.initEdit();
            } else {
                this.initView();
            }
        },
        initEdit: function() {
            $('#mw-content-text').prepend(
                $('<div>', {
                    'class': 'permissions-errors'
                }).load(
                    mw.util.getUrl('MediaWiki:Custom-AFProtected-editnotice', {
                        action: 'render'
                    })
                )
            );
            $('#editform .editOptions').remove();
        },
        initView: function() {
            if (!$('#ca-edit').length) {
                return;
            }
            if (!window.dev || !window.dev.wds) {
                importArticle({
                    type: 'script',
                    article: 'u:dev:MediaWiki:WDSIcons/code.js'
                });
            }
            $.when(
                this.loadI18n(),
                this.loadWDS()
            ).then(this.replaceButton.bind(this));
        },
        loadI18n: function() {
            return mw.loader.using('mediawiki.api')
                .then(this.i18nApi.bind(this));
        },
        i18nApi: function() {
            return new mw.Api().get({
                action: 'query',
                meta: 'allmessages',
                ammessages: 'viewsource'
            });
        },
        loadWDS: function() {
            var promise = $.Deferred();
            mw.hook('dev.wds').add(function(wds) {
                promise.resolve(wds);
            });
            return promise;
        },
        replaceButton: function(data, wds) {
            $('#ca-edit > svg').replaceWith(wds.icon('lock-small'));
            $('#ca-edit > span').text(data[0].query.allmessages[0]['*']);
        }
    };
    AFProtected.init();
})();