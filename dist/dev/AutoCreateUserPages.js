/**
 * Name:        AutoCreateUserPages
 * Version:     v1.9
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Automatically creates a user's userpage, talkpage and
 *              message wall greeting with a specified template on
 *              wikis where they have at least one contribution.
 */
(function() {
    if (
        localStorage.getItem('AutoCreateUserPagesLoaded') ||
        !mw.config.get('wgUserName')
    ) {
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
            'wgUserName'
        ]),
        toCreate: 0,
        created: [],
        preload: function() {
            if (
            // You most likely don't want the script to be
            // auto-creating your Community Central user page,
            // especially since you're probably inserting a
            // global template in the configuration.
                this.mwconfig.wgCityId === 177 ||
            // When you try creating your userpage/talkpage
            // on the SOAP Wiki the abuse filter prevents you
            // so the script shouldn't run there
                this.mwconfig.wgCityId === 65099
            ) {
                return;
            }
            this.namespaces = ['User'];
            $.get(mw.util.wikiScript('wikia'), {
                controller: 'UserProfile',
                method: 'getUserData',
                format: 'json',
                userId: this.mwconfig.wgUserId
            }).done((function(data) {
                if (data.userData.userTalkUrl) {
                    this.namespaces.push('User talk');
                }
                this.init();
            }).bind(this));
        },
        notify: function(msg, type) {
            msg = msg || 'An unknown error occurred while executing AutoCreateUserPages.';
            type = type || 'error';
            mw.notify(msg, {
                type: type
            });
        },
        init: function() {
            this.api = new mw.Api();
            var deferreds = [this.api.get({
                action: 'query',
                list: 'usercontribs',
                ucuser: this.mwconfig.wgUserName
            })];
            var socialActivity = {
                controller: 'Fandom\\UserProfileActivity\\UserProfileActivity',
                method: 'getData',
                userId: this.mwconfig.wgUserId
            };
            deferreds = deferreds.concat([
                $.get(mw.util.wikiScript('wikia'), $.extend({type: 'posts'}, socialActivity)),
                $.get(mw.util.wikiScript('wikia'), $.extend({type: 'messages'}, socialActivity)),
                $.get(mw.util.wikiScript('wikia'), $.extend({type: 'comments'}, socialActivity))
            ]);
            
            $.when.apply($, deferreds).done(this.cbContribs.bind(this)).fail(this.cbContribsFail.bind(this));
        },
        cbContribsFail: function (d) {
            if (typeof d == 'string') {
                this.notify('An error occurred while fetching user contributions: ' + d);
            } else if (arguments.length === 3) {
                this.notify('An error occurred while fetching user social activity.');
            } else {
                this.notify('An unknown error occurred while fetching user contributions and social activity.');
            }
        },
        cbContribs: function(d, p, m, c) {
            if (d[0].error) {
                this.notify('An error occurred while fetching user contributions: ' + d[0].error.code);
            } else if (
                p[2].status !== 200 ||
                m[2].status !== 200 ||
                c[2].status !== 200
            ) {
                this.notify('An unexpected response occurred while fetching user social activity: ' +
                    p[2].status + ' ' + m[2].status + ' ' + c[2].status);
            } else if (
                d[0].query.usercontribs.length ||
                (
                    p[0].indexOf('<div class="Message">') != -1 ||
                    m[0].indexOf('<div class="Message">') != -1 ||
                    c[0].indexOf('<div class="Message">') != -1
                )
            ) {
                this.api.get({
                    action: 'query',
                    prop: 'revisions',
                    titles: this.namespaces.map(function(el) { return el + ':' + this.mwconfig.wgUserName; }, this).join('|')
                }).done(this.cbFetch.bind(this)).fail(this.cbFetchFail.bind(this));
            } else {
                console.info('[AutoCreateUserPages] Zero edit count and social activity, returning...');
            }
        },
        cbFetchFail: function (d) {
            if (typeof d === 'string') {
                this.notify('An error occurred while fetching user page information: ' + d);
            } else {
                this.notify('An unknown error occurred while fetching user page information.');
            }
        },
        cbFetch: function(d) {
            var shouldCreate = $.map(d.query.pages, this.processPage.bind(this));
            if (!shouldCreate.some(Boolean)) {
                console.info('[AutoCreateUserPages] No pages should be created, exiting...');
                localStorage.setItem('AutoCreateUserPagesLoaded', true);
            }
        },
        processPage: function(v, k) {
            var content = this.config.content;
            if (typeof content === 'object') {
                content = content[v.ns];
            }
            // The user can opt-out of creating their userpage in a specific namespace
            // by setting the value to false.
            if (content === false) {
                return false;
            }
            if (
                // If the page existed before
                v.missing !== '' &&
                (
                    // and it was not last edited by either of the bots
                    (
                        v.revisions[0].user !== 'FANDOM' &&
                        v.revisions[0].user !== 'Wikia'
                    ) ||
                    // or contains a comment that implies it was moved during a rename
                    (v.revisions[0].comment || '').indexOf(this.mwconfig.wgUserName + ']]') !== -1
                )
            ) {
                // do not process this page.
                return false;
            }
            console.info('[AutoCreateUserPages] Creating', v.title, '...');
            ++this.toCreate;
            this.created.push(v.title);
            this.api.postWithEditToken({
                action: 'edit',
                title: v.title,
                text: content.replace(/\$1/g, this.mwconfig.wgUserName),
                summary: this.config.summary,
                minor: true,
                bot: true
            }).done(this.cbCreate.bind(this));
            return true;
        },
        cbCreate: function(d) {
            if (--this.toCreate === 0) {
                mw.hook('AutoCreateUserPages.loaded').fire(this.created);
                if (this.config.notify) {
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
    mw.loader.using(['mediawiki.util', 'mediawiki.api']).then(AutoCreateUserPages.preload.bind(AutoCreateUserPages));
})();