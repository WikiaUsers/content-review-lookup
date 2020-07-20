require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    window.dev = window.dev || {};
    if (
        mw.config.get('wgPageName') !== 'MediaWiki:ImportJS' ||
        window.dev.importJSPage
    ) {
        return;
    }
    window.dev.importJSPage = true;

    var $imports = mw.util.$content.children('pre'),
        scripts = $imports.text().split('\n'),
        $ul = $('<ul>'),
        script, pageName, page;

    for (var i in scripts) {
        script = scripts[i];
        if (/^dev:/.test(script)) {
            pageName = /dev:(.+)\.js/.exec(script)[1];
            page = 'w:c:dev:MediaWiki:' + pageName + '.js';
        }
        else {
            pageName = script;
            page = 'MediaWiki:' + script;
        }
        $ul.append(
            $('<li>').append(
                $('<a>', {
                    'href': mw.util.getUrl(page),
                    text: pageName
                })
            )
        );
    }
    $ul.appendTo($imports.empty());
});