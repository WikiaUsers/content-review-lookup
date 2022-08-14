/* global Set */
(function() {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgPageName',
        'wgUserGroups'
    ]);
    var ui;
    if (
        !/sysop|bot|soap|staff|bot-global|helper|wiki-representative|wiki-specialist|util/.test(config.wgUserGroups.join('\n')) ||
        window.RemoveLegacyThreads && window.RemoveLegacyThreads.init
    ) {
        return;
    }
    var RLT = {
        BLANK_TIMEOUT: 1000,
        RATELIMIT_TIMEOUT: 30000,
        THREAD_REGEX: /(thread.*@|(blog|talk).*\/@comment-\d+)/i,
        init: function(i18n, placement, dorui) {
            this.api = new mw.Api();
            this.i18n = i18n;
            ui = dorui;
            if (config.wgCanonicalSpecialPageName === 'Whatlinkshere') {
                this.initWLH();
            } else if (
                config.wgCanonicalSpecialPageName === 'Blankpage' &&
                config.wgPageName.toLowerCase().endsWith('removelegacythreads')
            ) {
                this.initUI();
            }
            placement.util({
                script: 'RemoveLegacyThreads',
                element: 'tools',
                type: 'append',
                content: ui.li({
                    child: ui.a({
                        attrs: {
                            href: mw.util.getUrl('Special:BlankPage/RemoveLegacyThreads')
                        },
                        text: i18n.msg('title').plain()
                    })
                })
            });
        },
        initWLH: function() {
            var target = $('#mw-whatlinkshere-target').val();
            $('#mw-whatlinkshere-target').parent().append(
                ' &nbsp;',
                ui.button({
                    attrs: {
                        title: this.i18n.msg('description-short').plain()
                    },
                    classes: ['wds-button'],
                    events: {
                        click: this.clickWLH.bind(this, target)
                    },
                    text: this.i18n.msg('title').plain()
                }),
                ui.span({
                    attrs: {
                        id: 'RemoveLegacyThreadsStatus'
                    }
                })
            );
        },
        clickWLH: function(page, event) {
            event.preventDefault();
            $(event.currentTarget).prop('disabled', 'disabled');
            var $status = $('#RemoveLegacyThreadsStatus');
            var usageArr;
            var totalPages;
            var currentlyDone = 0;
            var errors = 0;
            this.getUsage(page).then(function(usage) {
                usageArr = Array.from(usage).filter(function(pageTitle) {
                    return pageTitle.match(this.THREAD_REGEX);
                }, this);
                if (usageArr.length === 0) {
                    $status.text(this.i18n.msg('no-usage').plain());
                    return;
                }
                var usageArrCopy = [].concat(usageArr);
                totalPages = usageArr.length;
                this.blankPages(usageArr, function(type, title) {
                    if (type === 'failure') {
                        console.error('[RemoveLegacyThreads] Failed on', title);
                        ++errors;
                    }
                    if (++currentlyDone === totalPages) {
                        usageArrCopy.forEach(function(link) {
                            $('#mw-whatlinkshere-list > li > a[title="' + link + '"]').parent().remove();
                        });
                        $status.text(this.i18n.msg('done').plain());
                    } else {
                        $status.text(this.i18n.msg(
                            'status',
                            currentlyDone,
                            totalPages,
                            Math.floor(currentlyDone / totalPages * 100),
                            errors
                        ).plain());
                    }
                }.bind(this));
            }.bind(this)).fail(function(error) {
                $status.text(this.i18n.msg('error-usage').plain());
                console.error('[RemoveLegacyThreads] Error while fetching usage', error);
            }.bind(this));
        },
        initUI: function() {
            $('#firstHeading').text(this.i18n.msg('title').plain());
            $('#mw-content-text').html(ui.div({
                children: [
                    ui.p({
                        html: this.i18n.msg('description-long').parse()
                    }),
                    ui.button({
                        classes: ['wds-button', 'RemoveLegacyThreadsStart'],
                        events: {
                            click: this.clickUI.bind(this)
                        },
                        text: this.i18n.msg('start').plain()
                    }),
                    ui.p({
                        attrs: {
                            id: 'RemoveLegacyThreadsStatus'
                        }
                    }),
                    ui.progress({
                        attrs: {
                            id: 'RemoveLegacyThreadsProgress',
                            max: 100,
                            value: 0
                        }
                    }),
                    ui.p({
                        text: this.i18n.msg('error-log').plain()
                    }),
                    ui.pre({
                        attrs: {
                            id: 'RemoveLegacyThreadsErrorLog'
                        }
                    })
                ]
            }));
        },
        clickUI: function(event) {
            $(event.currentTarget).prop('disabled', 'disabled');
            var $status = $('#RemoveLegacyThreadsStatus');
            var $progress = $('#RemoveLegacyThreadsProgress');
            var $errorLog = $('#RemoveLegacyThreadsErrorLog');
            var totalPages;
            var currentlyDone = 0;
            var errors = 0;
            this.getAllThreads().then(function(threads) {
                if (threads.length === 0) {
                    $status.text(this.i18n.msg('no-threads').plain());
                    return;
                }
                totalPages = threads.length;
                this.blankPages(threads, function(type, title) {
                    if (type === 'failure') {
                        $errorLog.text(($errorLog.text() + '\n' + title).trim());
                        console.error('[RemoveLegacyThreads] Failed on', title);
                        ++errors;
                    }
                    if (++currentlyDone === totalPages) {
                        $status.text(this.i18n.msg('done').plain());
                        $progress.prop('value', 100);
                    } else {
                        var progress = Math.floor(currentlyDone / totalPages * 100);
                        $status.text(this.i18n.msg('status', currentlyDone, totalPages, progress, errors).plain());
                        $progress.prop('value', progress);
                    }
                }.bind(this));
            }.bind(this)).fail(function(error) {
                $status.text(this.i18n.msg('error-threads').plain());
                console.error('[RemoveLegacyThreads] Error while fetching threads', error);
            }.bind(this));
        },
        getUsage: function(page, cont, oldResults) {
            var results = oldResults || [];
            var list = ['backlinks', 'embeddedin'];
            var options = {
                action: 'query',
                bltitle: page,
                bllimit: 'max',
                eititle: page,
                eilimit: 'max',
                formatversion: 2
            };
            if (cont) {
                options.blcontinue = cont.blcontinue;
                options.cmcontinue = cont.cmcontinue;
                options.eicontinue = cont.eicontinue;
                options.fucontinue = cont.fucontinue;
            }
            try {
                var title = new mw.Title(page);
                if (title.namespace === 14) {
                    list.push('categorymembers');
                    options.cmtitle = page;
                    options.cmlimit = 'max';
                } else if (title.namespace === 6) {
                    options.prop = 'fileusage';
                    options.titles = page;
                    options.fulimit = 'max';
                }
            } catch (error) {
                console.error('Error while parsing page title: ', error);
            }
            options.list = list;
            return this.api.get(options).then(function(data) {
                list.forEach(function(type) {
                    if (!data.query[type]) {
                        return;
                    }
                    results = results.concat(data.query[type].map(function(obj) {
                        return obj.title;
                    }));
                });
                if (data.query.pages && data.query.pages[0]) {
                    results = results.concat(data.query.pages[0].fileusage.map(function(obj) {
                        return obj.title;
                    }));
                }
                // eslint-disable-next-line dot-notation
                var contData = data['continue'];
                if (!contData) {
                    return new Set(results);
                }
                return this.getUsage(page, contData, results);
            }.bind(this));
        },
        getAllThreads: function() {
            return $.when(
                // Talk
                this.getAllNamespacePages(1),
                // User blog comment
                this.getAllNamespacePages(501),
                // Thread
                this.getAllNamespacePages(1201),
                // Board Thread
                this.getAllNamespacePages(2001)
            ).then(function(talk, blogComment, thread, boardThread) {
                var filteredTalk = talk.filter(function(title) {
                    return title.match(this.THREAD_REGEX);
                }, this);
                return filteredTalk.concat(blogComment, thread, boardThread);
            }.bind(this));
        },
        getAllNamespacePages: function(namespace, cont, oldResults) {
            var results = oldResults || [];
            return this.api.get({
                action: 'query',
                list: 'allpages',
                aplimit: 'max',
                apminsize: 1,
                apnamespace: namespace,
                apcontinue: (cont || {}).apcontinue,
                formatversion: 2
            }).then(function(data) {
                results = results.concat(data.query.allpages.map(function(obj) {
                    return obj.title;
                }));
                // eslint-disable-next-line dot-notation
                var contData = data['continue'];
                if (!contData) {
                    return results;
                }
                return this.getAllNamespacePages(namespace, contData, results);
            }.bind(this));
        },
        blankPage: function(page) {
            return this.api.postWithEditToken({
                action: 'edit',
                text: '',
                title: page,
                summary: this.i18n.inContentLang().msg('summary').plain(),
                bot: true
            });
        },
        blankPages: function(pages, progress) {
            var page = pages.shift();
            if (!page) {
                return;
            }
            this.blankPage(page).then(function() {
                progress('success', page);
                setTimeout(this.blankPages.bind(this, pages, progress), this.BLANK_TIMEOUT);
            }.bind(this)).fail(function(code) {
                if (code === 'ratelimited') {
                    pages.unshift(page);
                    setTimeout(this.blankPages.bind(this, pages, progress), this.RATELIMIT_TIMEOUT);
                } else {
                    progress('failure', page);
                    setTimeout(this.blankPages.bind(this, pages, progress), this.BLANK_TIMEOUT);
                }
            }.bind(this));
        },
        whenHookFires: function(hook) {
            var $promise = $.Deferred();
            mw.hook(hook).add(function(lib) {
                $promise.resolve(lib);
            });
            return $promise;
        },
        whenI18nLoads: function() {
            var $promise = $.Deferred();
            mw.hook('dev.i18n').add(function(i18nLib) {
                i18nLib.loadMessages('RemoveLegacyThreads').then(function(i18n) {
                    $promise.resolve(i18n);
                });
            });
            return $promise;
        }
    };
    $.when(
        RLT.whenI18nLoads(),
        RLT.whenHookFires('dev.placement'),
        RLT.whenHookFires('doru.ui'),
        mw.loader.using([
            'mediawiki.api',
            'mediawiki.Title',
            'mediawiki.util'
        ])
    ).then(RLT.init.bind(RLT));
    window.RemoveLegacyThreads = $.extend(window.RemoveLegacyThreads, RLT);
    importArticles({
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Placement.js',
            'u:dev:MediaWiki:Dorui.js',
            'u:dev:MediaWiki:RemoveLegacyThreads.css'
        ]
    });
})();