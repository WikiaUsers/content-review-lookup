//Stella, by Sophiedp
//inspired by 452's MaintenanceReport.js
//mw.msg from https://dev.fandom.com/wiki/MediaWiki:InfoboxEditorPreview/ucp.js
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
    if (window.StellaLoaded) {
        return;
    }
    window.StellaLoaded = true;
    var list = {
        pages: [
            { name: 'BrokenRedirects', msg: 'brokenredirects' },
            { name: 'Deadendpages', msg: 'deadendpages' },
            { name: 'DoubleRedirects', msg: 'doubleredirects' },
            { name: 'Withoutinterwiki', msg: 'withoutinterwiki' },
            { name: 'Uncategorizedcategories', msg: 'uncategorizedcategories' },
            { name: 'Uncategorizedimages', msg: 'uncategorizedimages' },
            { name: 'Uncategorizedpages', msg: 'uncategorizedpages' },
            { name: 'Uncategorizedtemplates', msg: 'uncategorizedtemplates' },
            { name: 'UnorganizedTemplates', msg: 'unorganizedtemplates' },
            { name: 'Unusedcategories', msg: 'unusedcategories' },
            { name: 'Unusedimages', msg: 'unusedimages' },
            { name: 'Unusedtemplates', msg: 'unusedtemplates' },
            { name: 'Wantedcategories', msg: 'wantedcategories' },
            { name: 'Wantedfiles', msg: 'wantedfiles' },
            { name: 'Wantedpages', msg: 'wantedpages' },
            { name: 'Wantedtemplates', msg: 'wantedtemplates' }
        ],
        categories: [
            { name: 'index-category', msg: 'index', isI18nJSMsg: true },
            { name: 'noindex-category', msg: 'noindex', isI18nJSMsg: true },
            { name: 'duplicate-args-category', msg: 'dupe-args', isI18nJSMsg: true },
            { name: 'expensive-parserfunction-category', msg: 'expensive-parserfunction', isI18nJSMsg: true },
            { name: 'post-expand-template-argument-category', msg: 'omitted-template-args', isI18nJSMsg: true },
            { name: 'post-expand-template-inclusion-category', msg: 'template-include-size', isI18nJSMsg: true },
            { name: 'broken-file-category', msg: 'broken-file-links', isI18nJSMsg: true },
            { name: 'node-count-exceeded-category', msg: 'node-count', isI18nJSMsg: true },
            { name: 'expansion-depth-exceeded-category', msg: 'expansion-depth', isI18nJSMsg: true },
            { name: 'restricted-displaytitle-ignored', msg: 'ignored-display-titles', isI18nJSMsg: true },
            { name: 'template-loop-category', msg: 'template-loop', isI18nJSMsg: true },
            { name: 'cite-tracking-category-cite-error', msg: 'ref-errors', isI18nJSMsg: true },
            { name: 'math-tracking-category-error', msg: 'math-errors', isI18nJSMsg: true },
            { name: 'math-tracking-category-render-error', msg: 'math-render-errors', isI18nJSMsg: true },
            { name: 'scribunto-common-error-category', msg: 'script-errors', isI18nJSMsg: true },
            { name: 'scribunto-module-with-errors-category', msg:'scribunto-module-with-errors', isI18nJSMsg: true },
            { name: 'syntaxhighlight-error-category', msg: 'syntax-highlight-errors', isI18nJSMsg: true }
        ]
    };

    function mergeByName (arr) {
        var titles = arr.flat(Infinity).map(function(item) {
            return item.title;
        });
        return Array.from(new Set(titles));
    }

    //From https://dev.fandom.com/wiki/MediaWiki:Q.js
    function query (params, cb, resolve) {
        return new Promise(function (res) {
            return new mw.Api().get(params).then(function (data) {
                cb(data);

                if (data.continue) {
                    query(
                        Object.assign(
                            {},
                            params,
                            data.continue
                        ),
                        cb,
                        resolve || res
                    );
                } else {
                    resolve();
                }
            });
        });
    }

    function generateCard (fullpagename, title, count, isActive, i18n, isSpecialPage) {
        $('<a>', {
            'class': 'card' + (isActive ? ' active' : ''),
            href: mw.util.getUrl(fullpagename),
            append: [
                $('<span>', {
                    'class': 'card-title',
                    text: i18n.msg(title).plain()
                }),
                $('<span>', {
                    'class': 'card-count',
                    text: i18n.msg('items', count).parse()
                })
            ],
            appendTo: $('#mw-content-text #card-holder')
        });
    }

    function getItems (i18n) {
        // Map category fullpagename to display name.
        var cats = list.categories.reduce(function (acc, cat) {
            var m = i18n.inContentLang().msg(cat.name);
            if (m.exists) {
                var pagename = m.plain(),
                    fullpagename = new mw.Title(pagename, 14).getPrefixedText();
                acc[fullpagename] = cat.msg || cat.name;
            }
            return acc;
        }, {});
        // Generate special page cards
        list.pages.forEach(function (page) {
            var results = [];
            query({
                action: 'query',
                list: 'querypage',
                qppage: page.name,
                formatversion: 2,
                qplimit: 'max'
            }, function (data) {
                if (data.query && data.query.querypage.results.length) {
                    results.push(data.query.querypage.results);
                }
            }, function () {
                // MediaWiki will auto-redirect (HTTP302) special pagenames for non-English wikis,
                // "Special:BrokenRedirects" will go to the correct page.
                // If there is a simple way to grab localized pagenames, go for it.
                var fullpagename = new mw.Title(page.name, -1).getPrefixedText(),
                    count = results.length ? mergeByName(results).length : 0;
                generateCard(fullpagename, page.msg, count, (!!count), i18n, true);
            });
        });
        // Generate for category cards
        new mw.Api().get({
            action: 'query',
            prop: 'categoryinfo',
            titles: Object.keys(cats).join('|'),
            formatversion: 2
        }).done(function (data) {
            console.log('categoryinfo', data);
            data.query.pages.forEach(function(page) {
                var fullpagename = new mw.Title(page.title, 14).getPrefixedText(),
                    count = page.categoryinfo ? page.categoryinfo.size : 0;
                generateCard(fullpagename, cats[fullpagename], count, (!!count), i18n, false);
            });
        });
    }

    function loadMessages (i18n) {
        var api = new mw.Api(),
            userLang = mw.config.get('wgUserLanguage'),
            contentLang = mw.config.get('wgContentLanguage'),
            specialMessages = list.pages.map(function(page) { return page.msg }),
            categoryMessages = list.categories.map(function(category) { return category.name }),
            msgsToLoad = [].concat(specialMessages, categoryMessages);
        // Displayed names in the user's preferred language.
        return api.loadMessagesIfMissing(msgsToLoad).then(function () {
            msgsToLoad.forEach(function(key) {
                var msg = mw.message(key);
                if (msg.exists()) {
                    i18n['_messages'][userLang][key] = msg.plain();
                } else {
                    console.log('could not load missing message:', key);
                }
            });
            if (contentLang === userLang) {
                return i18n;
            }
            // Localized category pagename.
            return api.getMessages(categoryMessages, { amlang: contentLang }).then(function(result) {
                Object.entries(result).forEach(function(item) {
                    var key = item[0],
                        value = item[1];
                    i18n['_messages'][contentLang][key] = value;
                });
                return i18n;
            });
        }).then(getItems);
    }

    if (mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && mw.config.get('wgTitle').endsWith('/Stella')) {
        $('.page-header__title').text('Stella');
        $('#mw-content-text > p').remove();
        document.title = 'Stella | ' + mw.config.get('wgSiteName') + ' | Fandom';
        $('<div>', {
            id: 'card-holder',
            appendTo: $('#mw-content-text')
        });
        importArticles({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        }, {
            type: 'style',
            article: 'u:dev:MediaWiki:Stella.css'
        });
        mw.hook('dev.i18n').add(function (i18n) {
            i18n.loadMessages('Stella').done(loadMessages);
        });
    } else {
        $('#WikiaBar .toolbar .tools > :first-child').after(
            $('<li>', {
                append: $('<a>', {
                    text: 'Stella',
                    href: mw.util.getUrl('Special:BlankPage/Stella')
                })
            })
        );
    }
});