$(function() {
    if (!$('.cat-gallery').length) return;
    $('.cat-gallery').each(function() {
        var $this = $(this);
        $this.html('<img style="display: block; margin: 0 auto;" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif"/>');
        var cat = mw.util.wikiUrlencode($this.data('category'));
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: 'Category:' + cat,
            indexpageids: '',
            format: 'json'
        }, function(data) {
            if (!data.query.pages[data.query.pageids[0]].missing) {
                $.get(mw.util.wikiScript('api'), {
                    action: 'query',
                    list: 'categorymembers',
                    cmtitle: 'Category:' + cat,
                    cmlimit: 500,
                    cmtype: 'file',
                    format: 'json'
                }, function(data) {
                    var gallery = '<gallery>\n';
                    for (var i in data.query.categorymembers) {
                        gallery += data.query.categorymembers[i].title + '\n';
                    }
                    gallery += '</gallery>';
                    $.get(mw.util.wikiScript('api'), {
                        action: 'parse',
                        text: gallery,
                        disablepp: '',
                        format: 'json'
                    }, function(data) {
                        $this.html(data.parse.text['*']);
                    });
                });
            }
        });
    });
});