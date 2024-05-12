mw.loader.using('mediawiki.util').then(function() {
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
        $ul = $('<ul>');

    // TODO: Handle block comments.
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        var $li = $('<li>');
        var pageName, page;
        if (script.trim() === "") {
            // handle empty lines
            $li.text(script)
        } else if (script.trim().startsWith('//')) {
            // handle inline comment
            $li.text(script)
        } else {
            if (/^dev:(.+)\.js/.test(script)) {
                pageName = /^dev:(.+)\.js/.exec(script)[1];
                page = 'w:c:dev:MediaWiki:' + pageName + '.js';
            } else {
                pageName = script;
                page = 'MediaWiki:' + script;
            }
            $li.append(
                $('<a>', {
                    'href': mw.util.getUrl(page),
                    'text': script
                })
            );
        }
        $ul.append($li);
    }
    $ul.appendTo($imports.empty());
});