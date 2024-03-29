(function ($, mw) {
    'use strict';
    var config = window.MassSetTemplateType || {};
    if (config.loaded) {
        return;
    }
    config.loaded = true;
    if (typeof config.list !== 'object') {
        config.list = [];
    }
    var msg, Api;
    var counter = 0;

    // Helperfunction for setTypes
    function checkAllDone1 () {
        if (counter === config.list.length) {
            setTimeout(function () {
                alert(msg('done').plain());
            }, 10);
        }
    }
    function setTypes () {
        counter = 0;
        config.list.forEach(function (item) {
            if (item.id === null) {
                counter++;
                checkAllDone1();
                return;
            }

            //Orginally from VanguardTools
            $.post(mw.util.wikiScript('wikia') + '?' + $.param({
                controller: 'Fandom\\TemplateClassification\\Api\\Classification',
                format: 'json',
                method: 'classifyTemplate'
            }), {
                articleId: item.id,
                pageId: item.id,
                token: mw.user.tokens.get('csrfToken'),
                type: item.type
            }).fail(function (error) {
                if (error.responseJSON.status === 400) { // Retry
                    $.post(mw.util.wikiScript('wikia') + '?' + $.param({
                        controller: 'Fandom\\TemplateClassification\\Api\\Classification',
                        format: 'json',
                        method: 'classifyTemplate'
                    }), {
                        articleId: item.id,
                        pageId: item.id,
                        token: mw.user.tokens.get('csrfToken'),
                        type: item.type
                    }).fail(function (error) {
                        counter++;
                        $('#mw-content-text #progress').append(msg('failed', item.link).parse() + '\n');
                        console.error(error);
                    }).done(function () {
                        counter++;
                        $('#mw-content-text #progress').append(msg('success', item.link, item.type).parse() + '\n');
                    });
                } else {
                	counter++;
                    $('#mw-content-text #progress').append(msg('failed', item.link).parse() + '\n');
                    console.error(error);
                }
            }).done(function () {
            	counter++;
                $('#mw-content-text #progress').append(msg('success', item.link, item.type).parse() + '\n');
            });
        });
        new MutationObserver(function () {
            checkAllDone1();
        }).observe(document.querySelector('#mw-content-text #progress'), {
            childList: true
        });
    }

    // Helperfunction for run
    function checkAllDone2 () {
        if (counter === config.list.length) {
            setTypes();
        }
    }
    function run () {
        config.list.forEach(function (item, index) {
            config.list[index].link = item.link = '[[' + item.name + '|' + item.name.split(':')[1] + ']]';
            config.list[index].id = 0;

            Api.get({
                action: 'query',
                titles: item.name,
                prop: 'info'
            }).fail(function (error) {
                counter++;
                $('#mw-content-text #progress').append(msg('failed', item.link).parse() + '\n');
                console.error(error);
                config.list[index].id = null;
                checkAllDone2();
            }).done(function (data) {
                counter++;
                if (data.error) {
                    $('#mw-content-text #progress').append(msg('failed', item.link).parse() + '\n');
                    console.error(data.error);
                    config.list[index].id = null;
                } else if (Object.keys(data.query.pages)[0] === '-1') {
                    $('#mw-content-text #progress').append(msg('missing', item.link).parse() + '\n');
                    config.list[index].id = null;
                }

                if (config.list[index].id !== null) {
                    config.list[index].id = Number(Object.keys(data.query.pages)[0]);	
                }
                checkAllDone2();
            });
        });
    }

    function init (i18no) {
        msg = i18no.msg;
        Api = new mw.Api();
        $('.page-header__title').text('MassSetTemplateType');
        document.title = document.title.replace('Blank page', 'MassSetTemplateType');
        $('#mw-content-text > p').replaceWith(
            $('<pre>', {
                id: 'progress'
            })
        );
        if (config.usedefaults) {
            var lang = mw.config.get('wgContentLanguage');
            var page;
            if (['de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pl', 'ru', 'vi', 'zh', 'zh-tw'].includes(lang)) {
                page = 'MediaWiki:Custom-MassSetTemplateType/' + lang + '.json';
            } else { // AR, BG, CA, CS, ET, FA, HR, HU, ID, MS, NO, PT, PT-BR, RO, SV, TH, TL, TR, UK
                page = 'MediaWiki:Custom-MassSetTemplateType/default.json';
            }
            $.getJSON('https://dev.fandom.com/api.php', {
                action: 'query',
                prop: 'revisions',
                titles: page,
                rvslots: '*',
                rvprop: 'content',
                format: 'json',
                origin: '*'
            }).then(function (data) {
                if (data.error) {
                    alert(mw.message('apierror-unknownerror', data.error).plain());
                    console.error(data.error);
                    return;
                }

                for (var pageID in data.query.pages) {
                    config.list = config.list.concat(JSON.parse(data.query.pages[pageID].revisions[0].slots.main['*']));
                    if (confirm(msg('confirm').plain())) {
                        run();
                    }
                }
            });
        } else {
            if (config.list.length && confirm(msg('confirm').plain())) {
                run();
            }
        }
    }

    function waitForI18n() {
        var $promise = $.Deferred();
        mw.hook('dev.i18n').add(function(i18n) {
            i18n.loadMessages('MassSetTemplateType').done($promise.resolve);
        });
        return $promise;
    }

    if (mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && mw.config.get('wgTitle').endsWith('/MassSetTemplateType')) {    
        $.when(
            waitForI18n(),
            mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.user'])
        ).then(init);

        window.importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    } else {
        $('#WikiaBar .toolbar .tools > :first-child').after(
            $('<li>', {
                append: $('<a>', {
                    text: 'MassSetTemplateType',
                    href: mw.util.getUrl('Special:BlankPage/MassSetTemplateType')
                })
            })
        );
    }
})(window.jQuery, window.mediaWiki);