/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице. */
//Advanced WikiActivity script.
if (wgCanonicalSpecialPageName == "WikiActivity") {
    $('.WikiaPageHeader').after('<div class="button" id="more-data">Больше информации</div>');
    $('#more-data').click(function () {
        $(this).removeAttr('id').text('Вернуться к обычному режиму просмотра').click(function () {
            window.location.reload();
        });
        $('#WikiaRail').fadeOut('slow');
        importArticles({
            type: "style",
            article: "w:c:ru.community:User:Wildream/AdvancedWikiActivity/style.css"
        });
        $('#WikiaArticle').html('<section><table border="0" width="100%"><thead><th>Тип правки</th><th>Ник участника</th><th>Название страницы</th><th>Число символов до правки</th><th>Число символов после правки</th><th>Разница</th><th>Комментарий</th><th>Время</th></thead><tbody></tbody></table></section></body></html>').css('width', $('#WikiaMainContent').width() - 20);
 
        var json = wgServer + '/api.php?action=query&list=recentchanges&rclimit=50&rcprop=sizes|title|user|timestamp|comment|ids&format=json&callback=?';
        $(getrecent());
 
        function getrecent() {
            $.getJSON(json, function (data) {
                $('tbody').html('');
                $.each(data.query.recentchanges, function (index, val) {
                    $('tbody').append('<tr class="' + val.type + ' type' + val.ns + '"><td style="text-align: center;">' + val.type + '</td><td><a href="' + wgServer + '/wiki/Участник:' + val.user + '">' + val.user + '</a></td><td><a class="advRC-title" href="' + wgServer + '/wiki/' + val.title + '?diff=' + val.revid + '&oldid=' + val.old_revid + '">' + val.title + '</a></td><td>' + val.oldlen + '</td><td>' + val.newlen + '</td><td>' + (val.newlen - val.oldlen) + '</td><td class="advRC-comment">'  + val.comment + '</td><td>' + val.timestamp.replace(/T/, ' ').replace(/Z/, '') + '</td></tr>');
                });
            });
            setInterval(getrecent, 45000);
        };
 
    });
}