$(document).ready(function() {
    $('a[href^="/wiki/Special:BookSources"]').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
    $('a[href^="/wiki/Category"]').not('a[href*="edit"]').attr('target', '_blank');
    $('a[href^="/wiki/Special:Categories"]').attr('target', '_blank');
    $('a.external').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
    $('a[href^="http"]').not('a[href*=higashi]').not('a[href*=logout]').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
    $('a[href$="higashilightnovel"]').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
});

if (mediaWiki.config.get('wgPageName') !== 'Theo_dõi_các_nhóm_Eng_Tran') {
    (function() {
        var markup = ".wikiaRssPlaceholder > .wikiaRss";
        $("body").on("DOMNodeInserted", markup, function() {
            $(markup).find("a").each(function() {
                $('a.external').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
                $('a[href^="http"]').not('a[href*=higashi]').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
            });
        });
    }());
}

function NewTab() {
    if (document.getElementById('new_tab') !== null) {
        if (skin === 'oasis' || skin === 'wikia') {
            $('#WikiaArticle a').not('a[href^="#"]').not('a[href*="WikiaArticleComments"]').not('.current-tab > a').not('ul.tabbernav li a').not('.tabs li a').attr('target', '_blank');
        } else {
            $('#mw-content-text a').not('a[href^="#"]').not('a[href*="WikiaArticleComments"]').not('.current-tab > a').not('ul.tabbernav li a').not('.tabs li a').attr('target', '_blank');
        }
    }
}

$(NewTab);