(function () {
    if (mw.config.get('wgAction') !== 'view' || mw.config.get('wgNamespaceNumber') !== 8 || mw.config.get('wgTitle') !== 'ImportJS' || window.ImportJSPlusLoaded) {
        return;
    }
    window.ImportJSPlusLoaded = true;

    var i18n;
    var preloads = 3;
    var archiveDPL = '{{#ifeq:{{#dpl:|debug=0|allowcachedresults=true|namespace=|uses=Template:Infobox JavaScript|title=$1|count=1|include={Infobox JavaScript}:Status|format=,,,}}|archive|true|}}';
    var ucpDPL = '{{#ifeq:{{#dpl:|debug=0|allowcachedresults=true|namespace=Dev_Wiki|titleregexp=UCP$|include={/row}:2|includematch=*$1*|format=,,,|count=1}}|Delete|true|}}';

    function checkStatus (item) { //yes I know a lot of this is duplicated, I did that intentionally
        item = item.replace(/MediaWiki:(.*?)(?:\/.*)?\.js/, '$1').replace(/_/g, ' ');
        $.ajax({
            url: 'https://dev.fandom.com/api.php',
            data: {
                action: 'parse',
                text: archiveDPL.replace('$1', item),
                disablelimitreport: true,
                wrapoutputclass: '',
                prop: 'text',
                format: 'json'
            },
            dataType: 'jsonp',
            method: 'GET',
            success: function (data) {
                if (data.error) {
                    return console.error(data.error);
                }
                var result = data.parse.text['*'].replace(/<p>(.*)\n<\/p>/, '$1');
                if (Boolean(result)) {
                    window.dev.toasts.info(i18n.msg('archived', item).escape(), {
                        timeout: 300000
                    });
                }
            }
        });
        $.ajax({
            url: 'https://dev.fandom.com/api.php',
            data: {
                action: 'parse',
                text: ucpDPL.replace('$1', item),
                disablelimitreport: true,
                prop: 'text',
                wrapoutputclass: '',
                format: 'json'
            },
            dataType: 'jsonp',
            method: 'GET',
            success: function (data) {
                if (data.error) {
                    return console.error(data.error);
                }
                var result = data.parse.text['*'].replace(/<p>(.*)\n<\/p>/, '$1');
                if (Boolean(result)) {
                    window.dev.toasts.error(i18n.msg('ucpdelete', item).escape(), {
                        timeout: 300000
                    });
                }
            }
        });
    }

    function check404 (input, dev) {
        $.ajax({
            url: (dev ? 'https://dev.fandom.com/api.php' : mw.util.wikiScript('api')),
            data: {
                action: 'query',
                titles: (typeof input === 'object' ? input.join('|') : input),
                format: 'json'
            },
            dataType: 'jsonp',
            method: 'GET',
            success: function (data) {
                if (data.error) {
                    return console.error(data.error);
                }
                for (var page in data.query.pages) {
                    if ('missing' in data.query.pages[page]) {
                        window.dev.toasts.warning(i18n.msg('notfound', data.query.pages[page].title).escape(), {
                            timeout: 300000
                        });
                    }
                }
            }
        });
    }

    function init (i18) {
        i18n = i18;
        var pre = $('pre');
        var styles = '\
            .importjsplus-comment {\
                opacity: 0.75;\
            }\
            .importjsplus-name {\
                color: #cb4b16;\
            }\
            .importjsplus-subpage {\
                color: #859900;\
            }\
        ';
        $('head').append('<style>' + styles + '</style>');

        var text = pre.html().split('\n').map(function (line) {
            if (!line) {
                return;
            }
            if (/^\W/.test(line)) {
                return '<span class="importjsplus-comment">' + line + '</span>';
            }
            if (/\/code.*\.js/.test(line)) {
                return line.replace(/(dev:)?(.*)\/(.*)\.js/, '$1<span class="importjsplus-name">$2</span>/$3.js');
            }
            if (!line.includes('/')) {
                return line.replace(/(dev:)?(.*)\.js/, '$1<span class="importjsplus-name">$2</span>.js');
            }
            return line.replace(/(dev:)?(.*)\/(.*)\.js/, '$1<span class="importjsplus-name">$2</span>/<span class="importjsplus-subpage">$3</span>.js');
        }).join('\n');
        pre.html(text);

        if (/sysop|staff|wiki-representative|helper/.test(mw.config.get('wgUserGroups'))) {
            var local = [];
            var dev = [];
            pre.text().split('\n').forEach(function (line) {
                if (!line || /^\W/.test(line)) {
                    return;
                }
                if (line.startsWith('dev:')) {
                    dev.push('MediaWiki:' + line.substr(4));
                } else {
                    local.push('MediaWiki:' + line);
                }
            });
            if (local.length) {
                if (local.length > 50) {
                    local.forEach(function (item) {
                        check404(item, false);
                    });
                } else {
                    check404(local, false);
                }
            }
            if (dev.length) {
                if (dev.lenth > 50) {
                    dev.forEach(function (item) {
                       check404(item, true);
                    });
                } else {
                    check404(dev, true);
                }
                dev.forEach(function (item) {
                    checkStatus(item);
                });
            }
        }
    }

    function preload () {
        if (--preloads === 0) {
            window.dev.i18n.loadMessages('ImportJS-Plus').then(init);
        }
    }

    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.toasts').add(preload);
    mw.loader.using('mediawiki.util').then(preload);

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Toasts.js'
        ]
    });
})();