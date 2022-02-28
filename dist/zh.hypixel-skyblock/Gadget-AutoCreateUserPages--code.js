/**
 * Name:        AutoCreateUserPages
 * Version:     v2 (fork)
 * Author:      KockaAdmiralac <wikia@kocka.tech>,
 *              MonkeysHK (Modified for use on Hypixel SkyBlock Wiki)
 * Description: Automatically creates a user's userpage, talkpage and
 *              message wall greeting with a specified template on
 *              wikis where they have at least one contribution.
 *              [Modified details] This script can additionally null edit certain
 *              pages so that they do not show up as red links.
 */
(function () {
    if (localStorage.getItem('AutoCreateUserPagesLoadedv2') || !mw.config.get('wgUserName'))
        return;
    var AutoCreateUserPages = {
        config: $.extend({
            content: '{{w:User:$1}}',
            summary: 'Auto creating user page',
            nesummary: 'Auto null editing for user',
            pagesToNullEdit: ["Message_Wall", "User_talk"],
        }, window.AutoCreateUserPagesConfig),
        mwconfig: mw.config.get([
            'wgCityId',
            'wgUserId',
            'wgUserName',
        ]),
        toCreate: 0,
        created: [],
        preload: function () {
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
            )
                return;
            this.namespaces = ['User'];
            $.get(mw.util.wikiScript('wikia'), {
                controller: 'UserProfile',
                method: 'getUserData',
                format: 'json',
                userId: this.mwconfig.wgUserId
            }).done($.proxy(function (data) {
                if (data.userData.userTalkUrl) {
                    this.namespaces.push('User talk');
                }
                this.init();
            }, this));
        },
        notify: function (msg, type) {
            msg = msg || 'An unknown error occurred while executing AutoCreateUserPages.';
            type = type || 'warn'; // can be "confirm", "warn", or "error"
            new BannerNotification($("<div>", {
                html: msg,
            }).prop("outerHTML"), type, undefined, 5000).show();
        },
        init: function () {
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
                $.get(mw.util.wikiScript('wikia'), $.extend({
                    type: 'posts'
                }, socialActivity)),
                $.get(mw.util.wikiScript('wikia'), $.extend({
                    type: 'messages'
                }, socialActivity)),
                (this.mwconfig.wgCityId === 7931 ? null : $.get(mw.util.wikiScript('wikia'), $.extend({
                    type: 'comments'
                }, socialActivity)))
            ]);

            $.when.apply($, deferreds).done($.proxy(this.cbContribs, this)).fail($.proxy(this.cbContribsFail, this));
        },
        cbContribsFail: function (d) {
            if (typeof d === 'string')
                this.notify('An error occurred while fetching user contributions: ' + d);
            else if (arguments.length === 3)
                this.notify('An error occurred while fetching user social activity.');
            else
                this.notify('An unknown error occurred while fetching user contributions and social activity.');
        },
        cbContribs: function (d, p, m, c) {
            if (d[0].error)
                this.notify('An error occurred while fetching user contributions: ' + d[0].error.code);
            else if ([p, m, c].some(function (e) {
                    return e[2].status !== 200;
                }))
                this.notify('An unexpected response occurred while fetching user social activity: ' +
                    p[2].status + ' ' + m[2].status + ' ' + c[2].status);
            else if (
                // only proceed if detected at least one contrib or social activity logged
                d[0].query.usercontribs.length || [p, m, c].some(function (e) {
                    return e[0].indexOf('<div class="Message">') !== -1;
                })
            ) {
                // start handling user pages to edit
                this.api.get({
                    action: 'query',
                    prop: 'revisions',
                    titles: this.namespaces.map(function (el) {
                        return el + ':' + this.mwconfig.wgUserName;
                    }, this).join('|'),
                }).done($.proxy(this.cbFetch, this)).fail($.proxy(this.cbFetchFail, this));
                // start handling pages to null edit
                this.api.get({
                    action: 'query',
                    prop: 'revisions',
                    titles: this.config.pagesToNullEdit.map(function (el) {
                        return el + ':' + this.mwconfig.wgUserName;
                    }, this).join('|'),
                }).done($.proxy(this.cbFetchForNull, this)).fail($.proxy(this.cbFetchFail, this));
            } else
                console.info('[AutoCreateUserPages] Zero edit count and social activity, returning...');
        },
        toProcess: function (v, content) {
            if (typeof content === 'object')
                content = content[v.ns];
            // The user can opt-out of creating their userpage in a specific namespace
            // by setting the value to false.
            if (content === false)
                return false;
            if (
                // If the page existed before
                v.missing !== '' && (
                    // and it was not last edited by either of the bots
                    (v.revisions[0].user !== 'FANDOM' && v.revisions[0].user !== 'Wikia') ||
                    // or contains a comment that implies it was moved during a rename
                    (v.revisions[0].comment || '').indexOf(this.mwconfig.wgUserName + ']]') !== -1
                )
            )
                // do not process page.
                return false;
            else
                // proceed to process page.
                return true;
        },
        cbFetchFail: function (d) {
            if (typeof d === 'string')
                this.notify('An error occurred while fetching page information: ' + d);
            else
                this.notify('An unknown error occurred while fetching page information.');
        },
        cbFetch: function (d) {
            var createdAny = $.map(d.query.pages, this.processPage.bind(this));
            if (!createdAny.some(Boolean)) {
                console.info('[AutoCreateUserPages] No pages should be created, exiting...');
                localStorage.setItem('AutoCreateUserPagesLoadedv2', true);
            }
        },
        processPage: function (v) {
            var content = this.config.content;
            if (!this.toProcess(v, content))
                return false;
            console.info('[AutoCreateUserPages] Creating', v.title, '...');
            ++this.toCreate;
            this.created.push(v.title);
            this.api.postWithEditToken({
                action: 'edit',
                title: v.title,
                text: content.replace(/\$1/g, this.mwconfig.wgUserName),
                summary: this.config.summary,
                minor: true,
                bot: true,
            }).done($.proxy(this.cbCreate, this));
            return true;
        },
        cbCreate: function (d) {
            if (--this.toCreate === 0) {
                mw.hook('AutoCreateUserPages.loaded').fire(this.created);
                localStorage.setItem('AutoCreateUserPagesLoadedv2', true);
                if (this.config.notify)
                    new BannerNotification($("<div>", {
                        html: typeof this.config.notify === 'string' ?
                            this.config.notify
                            .replace(/\$1/g, this.mwconfig.wgUserName)
                            .replace(/\$2/g, mw.util.wikiUrlencode(this.mwconfig.wgUserName)) : 'User pages successfully created!',
                    }).prop("outerHTML"), "confirm", undefined, 5000).show();
            }
            if (localStorage.getItem('AutoCreateUserPagesDebugMode'))
                console.log(d);
        },
        cbFetchForNull: function (d) {
            var createdAny = $.map(d.query.pages, this.nullEditPages.bind(this));
            if (!createdAny.some(Boolean))
                console.info('[AutoCreateUserPages] No pages should be null edited, exiting...');
        },
        nullEditPages: function (v) {
            var content = this.config.content;
            if (!this.toProcess(v, content))
                return false;
            this.api.postWithEditToken({
                action: 'edit',
                title: v.title,
                prependtext: '',
                summary: this.config.nesummary,
                minor: true,
                bot: true,
            }).always(function (data) {
                if (data.edit)
                    console.log("[AutoCreateUserPages] Null edited " + v.title + "!");
                else
                    console.warn("[AutoCreateUserPages] API error in null editing " + v.title, data);
                if (localStorage.getItem('AutoCreateUserPagesDebugMode'))
                    console.log(data);
            });
            return true;
        },
    };
    mw.loader.using([
        'mediawiki.api.edit',
        'mediawiki.util',
        'mediawiki.notify',
        mw.loader.getModuleNames().find(function (module) {
            return module.startsWith("BannerNotification");
        }),
    ]).then($.proxy(AutoCreateUserPages.preload, AutoCreateUserPages));
})();