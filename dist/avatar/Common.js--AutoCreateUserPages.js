/**
 * Name:        AutoCreateUserPages
 * Version:     v1.8
 * Author:      KockaAdmiralac <wikia@kocka.tech> (& Zacatero to make it recognize the Fandom/Wikia bot edit on a profile)
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
            'wgUserId',
            'wgUserName',
            'wgVersion'
        ]),
        toCreate: 0,
        preload: function() {
            this.isUCP = this.mwconfig.wgVersion !== '1.19.24';
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
            if (this.isUCP) {
                $.get(mw.util.wikiScript('wikia'), {
                    controller: 'UserProfile',
                    method: 'getUserData',
                    format: 'json',
                    userId: this.mwconfig.wgUserId
                }).done($.proxy(function(data) {
                    if (data.userData.userTalkUrl) {
                        this.namespaces.push('User talk');
                    }
                    this.init();
                }, this));
            } else {
                $.nirvana.getJson('WikiFeaturesSpecialController', 'index').done($.proxy(function(d) {
                    this.namespaces.push(d.features.filter(function(t) {
                        return t.name === 'wgEnableWallExt' && t.enabled;
                    }).length === 0 ? 'User talk' : 'Message Wall Greeting');
                    this.init();
                }, this));
            }
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
                var msg = 'An error occurred while fetching user contributions: ' + d.error.code;
                if (this.isUCP) {
                    mw.notify(msg, {
                        type: 'error'
                    });
                } else {
                    new BannerNotification(msg, 'error').show();
                }
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
                var msg = 'An error occurred while fetching user page information: ' + d.error.code;
                if (this.isUCP) {
                    mw.notify(msg, {
                        type: 'error'
                    });
                } else {
                    new BannerNotification(msg, 'error').show();
                }
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
            } else if (v.missing !== '') {
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
                var msg = 'An error occurred while creating a user page: ' + d.error.code;
                if (this.isUCP) {
                    mw.notify(msg, {
                        type: 'error'
                    });
                } else {
                    new BannerNotification(msg, 'error').show();
                }
            } else if (--this.toCreate === 0) {
                if (this.config.notify && this.isUCP) {
                    mw.notify($('<span>', {
                        html: typeof this.config.notify === 'string' ?
                            this.config.notify
                                .replace(/\$1/g, this.mwconfig.wgUserName)
                                .replace(/\$2/g, mw.util.wikiUrlencode(this.mwconfig.wgUserName)) :
                            'User pages successfully created!'
                    }));
                }
                localStorage.setItem('AutoCreateUserPagesLoaded', true);
            }
        }
    };
    mw.loader.using([
        'mediawiki.api.edit',
        'mediawiki.util',
        (mw.config.get('wgVersion') !== '1.19.24' ? 'mediawiki.notify' : 'mediawiki')
    ]).then($.proxy(AutoCreateUserPages.preload, AutoCreateUserPages));
})();