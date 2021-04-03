/** Bản cũ cần lưu tâm: http://sonako.wikia.com/wiki/MediaWiki:Thongbao.js?oldid=99216  **/
/* Image Rail */
(function() {
    var interval = setInterval(function() {
        if ($('#wikia-recent-activity').exists()) {
            clearInterval(interval);
            if ((mw.config.get('wgAction') === 'view') && (mediaWiki.config.get('wgPageName') !== 'Sonako_Light_Novel') && (mediaWiki.config.get('wgCanonicalSpecialPageName') === 'WikiActivity') || (mediaWiki.config.get('wgNamespaceNumber') === 0 || mediaWiki.config.get('wgNamespaceNumber') === 4 || mediaWiki.config.get('wgNamespaceNumber') === 6 || mediaWiki.config.get('wgNamespaceNumber') === 14 || mediaWiki.config.get('wgNamespaceNumber') === 112 || mediaWiki.config.get('wgNamespaceNumber') === 114 || mediaWiki.config.get('wgNamespaceNumber') === 500 || mediaWiki.config.get('wgNamespaceNumber') === 1201)) {
                var ImgSection = '<section id="ImageModule" class="ImageModule"></section>';
                $('#WikiaRail.loaded>section:last-of-type').after(ImgSection);
                $.getJSON('/api.php?action=parse&text={{ImageRail}}&format=json', function(data) {
                    var imgrail = data.parse.text['*'];
                    $('section#ImageModule').append(imgrail);
                });
            }
        }
    }, 100);
})();

$(function() {
    $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
        /* Thong bao Module */
        /* For Others pages */
        if ((mw.config.get('wgAction') === 'view') &&  (mw.config.get('wgCategories').length > 0 && mw.config.get('wgCategories').indexOf('Active Projects') > -1 || mw.config.get('wgCategories').indexOf('Idle Projects') > -1 || mw.config.get('wgCategories').indexOf('Stalled Projects') > -1 || mw.config.get('wgCategories').indexOf('Inactive Projects') > -1 || mw.config.get('wgCategories').indexOf('Hoàn thành') > -1 || mw.config.get('wgCategories').indexOf('Teaser') > -1 || mw.config.get('wgCategories').indexOf('Original Light Novel') > -1)) {
            if ($('#WikiaRail.is-ready').length && !$("#ThongBaoModule").length) { // Only add it ''once''
                var newSection = '<section id="ThongBaoModule" class="ThongBaoModule rail-module"></section>';
                $('#WikiaRail>section:first-of-type').after(newSection);
                $.getJSON('/api.php?action=parse&text={{Thongbao}}&format=json', function(data) {
                    var code = data.parse.text['*'];
                    $('section#ThongBaoModule').html(code);
                    // Embed The Facebook Widget to sidebar. Because ?action=render only pull some text and therefore the default embed code for FB by Wikia doesn't work
                    document.getElementById('fbbox').innerHTML = '<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSonakoWiki%2F&tabs=timeline%2C%20messages&width=292&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=952193671491839" width="292" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>';
                    $('#ThongBaoModule a').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
                    tabberAutomatic();
                });
            }
        }
        //add diff links for wikia recent activity module
        //fires after lazy-loading takes place.
        //add diff links and replace 'a wikia contributor' with the IP address.
        if ($("#wikia-recent-activity").size() && !$("#wikia-recent-activity").hasClass("replaced")) {
            //Only run if #wikia-recent-activity has been added, and it has not already been replaced, because #wikia-recent-activity is replaced twice when logged out.
            $("#wikia-recent-activity").addClass("replaced");
            $("#wikia-recent-activity li").each(function() {
                if ($(".edit-info-user", this).attr("href").indexOf("/Special:Contributions/") != -1)
                    $(".edit-info-user", this).html($(".edit-info-user", this).attr("href").replace("/wiki/Special:Contributions/", ""));
                $(this).prepend('<a href="' + $("a", this)[0].getAttribute('href', 2) + '?diff=cur" title="xem thay đổi của trang này"></a>');
            });
        }
    }); //end of DOMNodeInserted block

    $('#WikiaRail').trigger('DOMNodeInserted'); //Bypass race condition by firing the event.
});