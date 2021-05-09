/*
 * @description             Used to be a JSON and .javascript editor, now directly loads CodeEditor or tells the user to migrate to .js
 * @author                  Sophiedp
 * @author                  Speedit (legacy)
 * @license                 CC-BY-SA 3.0
*/
(function () {
    mw.loader.using(['mediawiki.util', 'mediawiki.notify']).then(function () {
        var page = mw.config.get('wgPageName');
        var ext = new mw.Title(page).getExtension();
        if (
            ext !== 'javascript' ||
            mw.config.get('wgArticleId') === 0 ||
            mw.config.get('wgPageContentModel') === 'javascript'
        ) {
            return;
        }
        
        var text = 'Please $1 to .js and $2 to JavaScript.';
        var link1 = $('<a>', {
            text: 'move the page',
            href: mw.util.getUrl('Special:MovePage/' + page, {
                'wpNewTitle': page.split('.')[0] + '.js'
            })
        });
        var link2 = $('<a>', {
            text: 'change the content model',
            href: mw.util.getUrl('Special:ChangeContentModel', {
                pagetitle: page,
                model: 'javascript'
            })
        });
        var span = $('<span>', {
            html: text.replace('$1', link1.prop('outerHTML')).replace('$2', link2.prop('outerHTML'))
        });

        mw.notify(span, {
            title: 'JavascriptEditor',
            autoHide: false
        });
    });
})();