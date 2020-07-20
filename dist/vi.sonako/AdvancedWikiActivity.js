//Advanced WikiActivity script.
if (wgCanonicalSpecialPageName == "WikiActivity") {
    $('.WikiaPageHeader').after('<div class="button" id="more-data">Thêm thông tin</div>');
    $('#more-data').click(function () {
        $(this).removeAttr('id').text('Mặc định').click(function () {
            window.location.reload();
        });
        $('#WikiaRail').fadeOut('slow');
        importArticles({
            type: "style",
            article: "u:sonako:MediaWiki:AdvancedWikiActivity.css"
        });
        $('#WikiaArticle').html('<section><table border="0" width="100%"><thead><th>Dạng thay đổi</th><th>Nick</th><th>Tên trang (Click link xem khác biệt)</th><th>Số chữ trước edit</th><th>Số chữ sau edit</th><th>Khác biệt</th><th>Bình luận</th><th>Thời gian</th></thead><tbody></tbody></table></section></body></html>').css('width', $('#WikiaMainContent').width() - 20);
 
        var json = wgServer + '/api.php?action=query&list=recentchanges&rclimit=50&rcprop=sizes|title|user|timestamp|comment|ids&format=json&callback=?';
        $(getrecent());
 
        function getrecent() {
            $.getJSON(json, function (data) {
                $('tbody').html('');
                $.each(data.query.recentchanges, function (index, val) {
                    $('tbody').append('<tr class="' + val.type + ' type' + val.ns + '"><td style="text-align: center;">' + val.type + '</td><td><a href="' + wgServer + '/wiki/User:' + val.user + '">' + val.user + '</a></td><td><a class="advRC-title" href="' + wgServer + '/wiki/' + val.title + '?diff=' + val.revid + '&oldid=' + val.old_revid + '">' + val.title + '</a></td><td>' + val.oldlen + '</td><td>' + val.newlen + '</td><td>' + (val.newlen - val.oldlen) + '</td><td class="advRC-comment">'  + val.comment + '</td><td>' + val.timestamp.replace(/T/, ' ').replace(/Z/, '') + '</td></tr>');
                });
            });
            setInterval(getrecent, 45000);
        };
 
    });
}