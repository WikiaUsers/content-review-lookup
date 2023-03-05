$(function() {
    if (!$('.listcatpages').length) return;
    $('.listcatpages').each(function() {
        var cat = $(this).text();
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: 'Category:' + cat,
            format: 'json'
        }, function(data) {
            for (var i in data.query.pages) break;
            if (!data.query.pages[i].missing) {
                $.get(mw.util.wikiScript('api'), {
                    action: 'query',
                    list: 'categorymembers',
                    cmtitle: 'Category:' + cat,
                    cmlimit: 500,
                    cmtype: 'page',
                    format: 'json'
                }, function(data) {
                    var html = '<ul>';
                    for (var i in data.query.categorymembers) html += '<li><a href="/wiki/' + mw.util.wikiUrlencode(data.query.categorymembers[i].title) + '">' + data.query.categorymembers[i].title + '</a></li>';
                    html += '</ul>';
                    $('.listcatpages').html(html);
                });
            }
        });
    });
});