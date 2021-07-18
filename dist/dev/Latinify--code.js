/**
 * Name:        Latinify
 * Description: Latinifies contents of articles
 * Version:     1.0
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 */
(function() {

    // Variables, double-run protection
    var config = mw.config.get([
        'wgContentLanguage'
    ]);
    var $buttons = $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list'),
        cache = {},
        i18n = {},
        maps, map,
        // [[MediaWiki:Custom-transliteration]]
        transliterationPageId = 15528;
    if ($buttons.length === 0) {
        return;
    }

    /**
     * @method init
     * @param {Object} i18nd i18n data and utilities
     */
    function init(i18nd) {
        $.extend(i18n, i18nd);
        $.ajax({
            type: 'GET',
            url: 'https://dev.fandom.com/api.php',
            data: {
                action: 'query',
                format: 'json',
                pageids: transliterationPageId,
                prop: 'revisions',
                rvprop: 'content'
            },
            dataType: 'jsonp'
        }).then(function(data) {
            var d = data.query.pages[transliterationPageId].revisions[0]['*'];
            maps = JSON.parse(d.replace(/\/\*.+\*\//g, ''));
            map = maps[config.wgContentLanguage];
            if (!map) {
                return;
            }
            $buttons.append(
                $('<li>').append(
                    $('<a>', {
                        href: '#',
                        text: i18n.msg('latinify').plain(),
                        id: 'Latinify'
                    }).click(latinify)
                )
            );
        });        
    }

    /**
     * @method walk
     * @param {Function} cb content modifier
     */
    function walk(cb) {
        var walker = document.createTreeWalker(
            document.getElementById('mw-content-text'),
            NodeFilter.SHOW_TEXT,
            null,
            false
        ), n;
        while (n = walker.nextNode()) {
            cb(n);
        }
    }

    /**
     * @method latinify
     */
    function latinify() {
        walk(function(n) {
            var text = n.textContent;
            for (var i in map) {
                var val = map[i];
                if (
                    val.length === 2 &&
                    i.length === 1 &&
                    val === val.toUpperCase()
                ) {
                    var index = text.indexOf(i),
                        limit = 10;
                    if (index !== -1) {
                        console.log(text, i, val);
                    }
                    while (index !== -1) {
                        if (--limit === 0) {
                            break;
                        }
                        var next = text[index + 1];
                        if (next && next === next.toLowerCase()) {
                            text = text.replace(i, val[0] + val[1].toLowerCase());
                        } else {
                            text = text.replace(i, val);
                        }
                        index = text.indexOf(i);
                        console.log(index);
                    }
                } else {
                    text = text.replace(new RegExp(i, 'g'), val);
                }
            }
            if (text !== n.textContent) {
                cache[text] = n.textContent;
            }
            n.textContent = text;
        });
        $('#Latinify')
            .text(i18n.msg('defaultify').plain())
            .off()
            .click(defaultify);
    }

    /**
     * @method defaultify
     */
    function defaultify() {
        walk(function(n) {
            var text = n.textContent;
            if (cache[text]) {
                n.textContent = cache[text];
            }
        });
        $('#Latinify')
            .text(i18n.msg('latinify').plain())
            .off()
            .click(latinify);
    }

    // Script bootloader
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('Latinify').done(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

})();