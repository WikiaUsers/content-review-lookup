$(function ($) {
    "use strict";
    if (!$('#admin-list').length) return;
    $.getJSON('/api.php?action=query&list=allusers&augroup=sysop&format=json', function (data) {
        if (data.query && data.query.allusers) {
            var html = '';
            for (var i = 0; i < data.query.allusers.length; i++) {
                var n = data.query.allusers[i].name;
                var nURL = mediaWiki.util.wikiUrlencode(n);
                html += '<li><a href="/wiki/User:' + nURL + '">' + n + '</a> (<a href="/wiki/User talk:' + nURL + '">mur de missatges</a> | <a href="/wiki/Special:Contributions/' + nURL + '">contribs.</a>)</li>';
            }
            if (html.length) {
                $('#admin-list').html('<ul>' + html + '</ul>');
            }
        }
    });
});