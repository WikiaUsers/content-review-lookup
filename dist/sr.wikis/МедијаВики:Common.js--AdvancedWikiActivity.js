/* Овде је било Јавасцрипт преузме свим корисницима у сваком учитавања странице. */
//Advanced WikiActivity script.
if (wgCanonicalSpecialPageName == "WikiActivity") {
    $('.WikiaPageHeader').after('<div class="button" id="more-data">Више информација</div>');
    $('#more-data').click(function () {
        $(this).removeAttr('id').text('Да се вратите у нормалан режим прегледања').click(function () {
            window.location.reload();
        });
        $('#WikiaRail').fadeOut('slow');
        importArticles({
            type: "style",
            article: "w:c:ru.community:User:Wildream/AdvancedWikiActivity/style.css"
        });
        $('#WikiaArticle').html('<section><table border="0" width="100%"><thead><th>Врста измене</th><th>Ник учесника</th><th>Име странице</th><th>Број знакова до измене</th><th>Број знакова након измене</th><th>Разлика</th><th>Коментар</th><th>Време</th></thead><tbody></tbody></table></section></body></html>').css('width', $('#WikiaMainContent').width() - 20);
 
        var json = wgServer + '/api.php?action=query&list=recentchanges&rclimit=50&rcprop=sizes|title|user|timestamp|comment|ids&format=json&callback=?';
        $(getrecent());
 
        function getrecent() {
            $.getJSON(json, function (data) {
                $('tbody').html('');
                $.each(data.query.recentchanges, function (index, val) {
                    $('tbody').append('<tr class="' + val.type + ' type' + val.ns + '"><td style="text-align: center;">' + val.type + '</td><td><a href="' + wgServer + '/wiki/Корисник:' + val.user + '">' + val.user + '</a></td><td><a class="advRC-title" href="' + wgServer + '/wiki/' + val.title + '?diff=' + val.revid + '&oldid=' + val.old_revid + '">' + val.title + '</a></td><td>' + val.oldlen + '</td><td>' + val.newlen + '</td><td>' + (val.newlen - val.oldlen) + '</td><td class="advRC-comment">'  + val.comment + '</td><td>' + val.timestamp.replace(/T/, ' ').replace(/Z/, '') + '</td></tr>');
                });
            });
            setInterval(getrecent, 45000);
        };
 
    });
}