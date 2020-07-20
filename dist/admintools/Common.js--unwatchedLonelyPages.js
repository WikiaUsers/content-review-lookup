// 17:18, December 1, 2015 (UTC)
// <source lang="JavaScript">

// Creates a report of the common elements of
// Special:UnwatchedPages + Special:LonelyPages
// Written by User:Slyst

$(function() {
    $.when(
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            list: 'querypage',
            qppage: 'Unwatchedpages',
            qplimit: 500,
            format: 'json'
        }),
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            list: 'querypage',
            qppage: 'Lonelypages',
            qplimit: 500,
            format: 'json'
        })
    ).then(function(unwatched, lonely) {
        unwatched = unwatched[0].query.querypage.results;
        lonely = lonely[0].query.querypage.results;
        var up = [],
            lp = [];
        for (var i in unwatched) {
            up.push(unwatched[i].title);
        }
        for (var i in lonely) {
            lp.push(lonely[i].title);
        }
        var pages = $(lp).not($(lp).not($(up))),
            list = '<ul>';
        for (var i = 0; i < pages.length; i++) {
            list += '<li><a href="' + mw.config.get('wgArticlePath').replace(/\$1/g, mw.util.wikiUrlencode(pages[i])) + '">' + pages[i] + '</a></li>';
        }
        list += '</ul>';
        $('.unwatched-lonely').html(list);
    });
});

// </source>