/**
 * This script adds a small (20x20 pixels) icon above the page contribution buttons (Edit, Comments, etc.) that indicates page's position in the list of Long Pages (Special:LongPages).
 * 
 * @author  Kofirs2634
 * @version 1.0
 */
$(function($) {
    var links = [],
        config = mw.config.get(['wgPageName', 'wgNamespaceNumber']);
 
    function icon(place) {
        var link, title;
        $('.page-header__contribution-buttons').prepend('<div id="custom-icons" align="right"></div>');
        if (place == 0) {
            link = 'https://vignette.wikia.nocookie.net/koffee/images/7/78/Longest_article_1.png/revision/latest?cb=20190901052648&path-prefix=ru';
            title = 'Эта статья является самой длинной на проекте.'
        }
        else if (place == 1) {
            link = 'https://vignette.wikia.nocookie.net/koffee/images/3/38/Longest_article_2.png/revision/latest?cb=20190901052648&path-prefix=ru';
            title = 'Данная статья занимает второе место по длине.'
        }
        else if (place == 2) {
            link = 'https://vignette.wikia.nocookie.net/koffee/images/a/a9/Longest_article_3.png/revision/latest?cb=20190901052648&path-prefix=ru';
            title = 'Эта статья занимает третье место по длине.'
        }
        $('#custom-icons').append('<a href="/ru/wiki/Special:LongPages"><img src="' + link + '" alt="Статья, входящая в топ-3 по длине" title="' + title + '" border="0" /></a>')
    }
 
    $.get('/ru/wiki/Special:LongPages', function(data) {
        respond = $(data);
        pageName = config.wgPageName.replace(/_/g, ' ');
        allLinks = respond.find('.WikiaPage ol.special a');
        for (i = 0; i < 6; i += 2) links[i / 2] = allLinks.eq(i + 1).text();
        if (config.wgNamespaceNumber == 0) {
            for (i = 0; i < 3; i++) if (pageName == links[i]) {
                icon(i);
                break
            }
        }
    })
})