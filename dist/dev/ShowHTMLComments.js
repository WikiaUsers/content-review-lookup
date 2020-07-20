$(function() {
    mw.util.addCSS('                                                                                                \
    .lol-commented-post {                                                                                           \
        background-position: 0 -1280px;                                                                             \
        background-image: url(https://images.wikia.com/common/extensions/wikia/RTE/ckeditor/skins/wikia/icons.png); \
        height: 16px !important;                                                                                    \
        margin: 0 3px 3px 3px;                                                                                      \
        width: 16px !important;                                                                                     \
    }                                                                                                               \
    ');
    $('.message').each(function() {
        var $msg = $(this),
        main = $msg.hasClass('message-main'),
        id = $msg.data('id'),
        mainId = wgTitle;
        if (!id) return; // lol stupid repeated classes
        $.nirvana.sendRequest({
            controller: 'WallExternal',
            method:'editMessage',
            format:'json',
            data: {
                msgid:          id      ,
                pagetitle:      mainId  ,
                pagenamespace:  1201    ,
                convertToFormat: ''
            }
        }).done(function(d) {
            var text = d.htmlorwikitext
                .replace(/<div class="quote">[\s\S]+?<\/div>/g, ''),
            r = /<!-{2,}([\s\S]*?)-{2,}>/g;
            if (r.test(text)) {
                r.lastIndex = 0;
                var comments = [], m;
                while (m = r.exec(text)) { // I don't care, stupid editor.
                    comments.push(m[1]);
                }
                $msg.find('.edited-by').first().append($('<img>', {
                    src: 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D',
                    class: 'lol-commented-post',
                    title: comments.join('\n')
                }));
            }
        });
    });
    if (!window.ArticleComments) return;
    var ewUsingIntervals = setInterval(function() {
        if (!ArticleComments.initCompleted) return;
        clearInterval(ewUsingIntervals);
        $('.comment').each(function() {
            var id, $com = $(this), name = $com.data('user');
            try {
                id = $com.attr('id').slice(5);
            } catch(e) {}
            $.nirvana.sendRequest({
                controller: 'WallExternal',
                method:'editMessage',
                format:'json',
                data: {
                    msgid:          id      ,
                    pagetitle:      id      ,
                    pagenamespace:  1201    ,
                    convertToFormat: ''
                }
            }).done(function(d) {
                var text = d.htmlorwikitext,
                r = /<!--[\s\S]*?-->/g;
                if (r.test(text)) {
                    $com.find('.edited-by > a:contains(' + name + ')')
                        .append($('<img>', {
                            src: 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D',
                            class: 'lol-commented-post',
                            title: text.match(r).map(function(n) {return n.replace(/^<!-+|-+>$/g, '')}).join('\n'),
                            style: 'position: relative; top: 8px;'
                        }));
                }
            });
        });
    }, 100);
});