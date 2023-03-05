$(function() {
    if (mw.config.get('wgNamespaceNumber') === 0 &&
       mw.config.get('wgPageName').split(':')[0] == 'Gallery' &&
       $('#gallery').length
    ) {
        $('#gallery').html('<img style="display: block; margin: 0 auto;" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" />');
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:' + mw.config.get('wgPageName').split(':')[1] + ' images',
            cmprop: 'title|type',
            format: 'json'
        }, function(data) {
            var cm = data.query.categorymembers,
                wikitext = '<gallery>\n';
            for (var i in cm) {
                if (cm[i].type == 'file') {
                    wikitext += cm[i].title.split(':')[1] + '\n';
                }
            }
            wikitext += '</gallery>';
            $.get(mw.util.wikiScript('api'), {
                action: 'parse',
                text: wikitext,
                format: 'json'
            }, function(data) {
                $('#gallery').html(data.parse.text['*']);
            });
        });
    }
});