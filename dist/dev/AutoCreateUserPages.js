/**
 * Name:        AutoCreateUserPages
 * Version:     v1.8
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Automatically creates a user's userpage, talkpage and
 *              message wall greeting with a specified template on
 *              wikis where they have at least one contribution.
 */
(function() {
    if (localStorage.getItem('AutoCreateUserPagesLoaded')) {
        return;
    }
    var AutoCreateUserPages = {
        config: $.extend({
            content: '{{w:User:$1}}',
            summary: 'Auto creating user page'
        }, window.AutoCreateUserPagesConfig),
        mwconfig: mw.config.get([
            'wgCityId',
            'wgUserName'
        ]),
        toCreate: 0,
        preload: function() {
            if (
            // You most likely don't want the script to be
            // automaking your Community Central user page,
            // especially since you're probably inserting a
            // global template in the configuration
            // This also prevents a 404 error since Community
            // Central doesn't have WikiFeatures enabled.
                this.mwconfig.wgCityId === '177' ||
            // When you try creating your userpage/talkpage
            // on VSTF Wiki the abuse filter prevents you
            // so the script shouldn't run there
                this.mwconfig.wgCityId === '65099'
            ) {
                return;
            }
            this.namespaces = ['User'];
            $.nirvana.getJson('WikiFeaturesSpecialController', 'index').done($.proxy(function(d) {
                this.namespaces.push(d.features.filter(function(t) {
                    return t.name === 'wgEnableWallExt' && t.enabled;
                }).length === 0 ? 'User talk' : 'Message Wall Greeting');
                mw.loader.using('mediawiki.api.edit').then($.proxy(this.init, this));
            }, this));
        },
        init: function() {
            this.api = new mw.Api();
            this.api.get({
                action: 'query',
                list: 'usercontribs',
                ucuser: this.mwconfig.wgUserName
            }).done($.proxy(this.cbContribs, this));
        },
        cbContribs: function(d) {
            if (d.error) {
                // new BannerNotification('An error occurred while fetching user contributions: ' + d.error.code).show();
            } else if (d.query.usercontribs.length !== 0) {
                this.api.get({
                    action: 'query',
                    prop: 'revisions',
                    titles: this.namespaces.map(function(el) { return el + ':' + this.mwconfig.wgUserName }, this).join('|')
                }).done($.proxy(this.cbFetch, this));
            } else {
                console.log('[AutoCreateUserPage] Zero edit count, returning...');
            }
        },
        cbFetch: function(d) {
            if (d.error) {
                new BannerNotification('An error occurred while fetching user page information: ' + d.error.code).show();
            } else {
                $.each(d.query.pages, $.proxy(this.processPage, this));
            }
        },
        processPage: function(k, v) {
            var content = this.config.content;
            if (typeof content === 'object') {
                content = content[v.ns];
            }
            // I was too tired of writing this all in one condition
            // If somebody can optimize this please do
            if (content === false) {
                return;
            }
            if (k === -1) {
                return;
            } else if (v.ns === 1202) {
                if (v.missing !== '') {
                    return;
                }
            } else if (v.missing !== '' && v.revisions[0].user !== 'FANDOM' && v.revisions[0].user !== 'Wikia') {
                return;
            }
            console.log('[AutoCreateUserPage] Creating', v.title, '...');
            ++this.toCreate;
            this.api.postWithEditToken({
                action: 'edit',
                title: v.title,
                text: content.replace(/\$1/g, this.mwconfig.wgUserName),
                summary: this.config.summary,
                minor: true,
                bot: true
            }).done($.proxy(this.cbCreate, this));
        },
        cbCreate: function(d) {
            if (d.error) {
                new BannerNotification('An error occurred while creating a user page: ' + d.error.code).show();
            } else if (--this.toCreate === 0) {
                localStorage.setItem('AutoCreateUserPagesLoaded', true);
            }
        }
    };
    AutoCreateUserPages.preload();
})();