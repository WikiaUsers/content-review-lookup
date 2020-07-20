/* ChatToolbox 1.0.5 */
/* @Author: Giovi (Benfutbol10) based on the script Standard Edit Summary */
require(['wikia.window', 'jquery', 'mw'], function(window, $, mw) {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') {
        return;
    }
    window.ChatToolbox = $.extend({
        init: function() {
            this.$menu = $('<ul>', {
                'class': 'dropdown'
            }).insertAfter('#ChatHeader');
            new mw.Api().get({
                action: 'query',
                prop: 'revisions',
                titles: [
                    'MediaWiki:Chat-toolbox',
                    'MediaWiki:Custom-Chat-toolbox'
                ].join('|'),
                rvprop: 'content',
                indexpageids: true
            }).done($.proxy(this.callback, this));
        },
        callback: function(data) {
            if (data.error) {
                console.error('API error:', data.error);
                return;
            }
            var q = data.query,
                pageids = q.pageids,
                id = pageids[0];
            if (id === '-1') {
                id = pageids[1];
                if (id === '-1') {
                    return;
                }
            }
            var content = q.pages[id].revisions[0]['*'];
            this.render(this.parse(content.split(/\r\n|\n|\r/)));
            importArticle({
                type: 'script',
                article: 'MediaWiki:Chat-toolbox.js'
            });
        },
        trimPart: function(part) {
            return part.trim();
        },
        parse: function(lines) {
            var options = [];
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                if (line.length === 0 || line.charAt(0) !== '*') {
                    continue;
                }
                var parts = line
                    .substring(1)
                    .split('|')
                    .map(this.trimPart),
                    item = {
                        'class': parts[0]
                            .replace(/[^a-z0-9\s]/gi, '')
                            .replace(/[_\s]/g, '')
                            .toLowerCase(),
                        contents: parts[0],
                        url: mw.util.getUrl(parts[0])
                    };
                if (parts.length === 2) {
                    item.url = mw.util.getUrl(parts[0]);
                    item.contents = parts[1];
                } else if (parts.length === 3) {
                    item.url = '#' + mw.util.wikiUrlencode(parts[1]);
                    item.contents = parts[2];
                }
                options.push(item);
            }
            return options;
        },
        renderItem: function(item) {
            var opts = {
                href: item.url,
                text: item.contents
            };
            if (item.url.charAt(0) !== '#') {
                opts.target = '_blank';
            }
            return $('<li>', {
                'class': item['class']
            }).append($('<a>', opts));
        },
        render: function(parsed) {
            this.$menu.append(parsed.map(this.renderItem, this))
                .find('> li:first-child')
                .addClass('active')
                .find('> a')
                .contents()
                .unwrap();
        }
    }, window.ChatToolbox);
    importArticles({
        type: 'style',
        articles: [
            'u:dev:MediaWiki:ChatToolbox.css',
            'MediaWiki:Chat-toolbox.css'
        ]
    });
    mw.loader.using('mediawiki.api')
        .then($.proxy(window.ChatToolbox.init, window.ChatToolbox));
});