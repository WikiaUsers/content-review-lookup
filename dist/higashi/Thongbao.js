/** Bản cũ cần lưu tâm: http://higashi.wikia.com/wiki/MediaWiki:Thongbao.js?oldid=99216  **/
if ((mw.config.get('wgAction') === 'view') && (mediaWiki.config.get('wgPageName') !== 'Sonako_Light_Novel') && (mediaWiki.config.get('wgCanonicalSpecialPageName') !== 'WikiActivity') && (mediaWiki.config.get('wgNamespaceNumber') === 0 || mediaWiki.config.get('wgNamespaceNumber') === 4 || mediaWiki.config.get('wgNamespaceNumber') === 6 || mediaWiki.config.get('wgNamespaceNumber') === 14 || mediaWiki.config.get('wgNamespaceNumber') === 112 || mediaWiki.config.get('wgNamespaceNumber') === 114 || mediaWiki.config.get('wgNamespaceNumber') === 500 || mediaWiki.config.get('wgNamespaceNumber') === 1201)) {
    $(window).load(function() {
        var newSection = '<section id="ThongBaoModule" class="ThongBaoModule module"><p class="MarckScript">' +
            'Thông báo' + '</p>' + '</section>';
        $('#WikiaRail section:first-of-type:not(.recirculation-rail)').after(newSection);
        $.getJSON('/api.php?action=parse&text={{Thongbao}}&format=json', function(data) {
            var code = data.parse.text['*'];
            $('section#ThongBaoModule').append(code);
            // Embed The Facebook Widget to sidebar. Because ?action=render only pull some text and therefore the default embed code for FB by Wikia doesn't work
            document.getElementById('fbbox').innerHTML = '<iframe src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/Higashi-Light-Novel-Wikia-1827456330851063/&tabs=timeline%2C%20messages&width=292&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=952193671491839" width="292" height="600" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';
            $('#ThongBaoModule a').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
            tabberAutomatic();
        });
    });
}

if (mediaWiki.config.get('wgCanonicalSpecialPageName') === 'WikiActivity') {
    $(window).load(function() {
        var newSection = '<section id="ThongBaoModule" class="ThongBaoModule module"><p class="MarckScript">' +
            'Thông báo' + '</p>' + '</section>';
        $('#WikiaRail section:first-of-type').after(newSection);
        $.getJSON('/api.php?action=parse&text={{Thongbao-RC}}&format=json', function(data) {
            var code = data.parse.text['*'];
            $('section#ThongBaoModule').append(code);
            // Embed The Facebook Widget to sidebar. Because ?action=render only pull some text and therefore the default embed code for FB by Wikia doesn't work
            document.getElementById('fbbox').innerHTML = '<iframe src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/Higashi-Light-Novel-Wikia-1827456330851063/&tabs=timeline%2C%20messages&width=292&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=952193671491839" width="292" height="600" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';
            $('#ThongBaoModule a').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
            impart('u:dev:MediaWiki:TopEditors/code.js');
            tabberAutomatic();
        });
    });
}