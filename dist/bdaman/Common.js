// 06:59, 17 July 2026 (UTC) <nowiki>
// *************************************************
// PAGETITLE REWRITE
//
// REWRITES THE PAGE'S TITLE, USED BY TEMPLATE:TITLE
// *************************************************
$(function() {
    var inter = setInterval(function() {
        if (!$('h1[itemprop=\"name\"]').length) return;

        clearInterval(inter);
        var newTitle = $("span.newPageTitle").find(':not(big, small, center, h1, h2, h3, h4, h5, h6, b, i, u, s, span, div)').remove().end().html();
        var edits = $("#user_masthead_since").text();
        $(".firstHeading,h1[itemprop=\"name\"],.resizable-container .page-header__title").html(mw.html.escape(newTitle));
        $("#user_masthead_head h2").html(mw.html.escape(newTitle + "<small id='user_masthead_since'>" + edits + "</small>"));
    });
});

$(function changeTitle(){
    if (!$('span.newPageTitle').length) {
        return;
    }
    var title = $('span.newPageTitle').find(':not(big, small, center, h1, h2, h3, h4, h5, h6, b, i, u, s, span, div)').remove().end().html();
    $('h1.page-header__title').html(mw.html.escape(title));
});
// END PAGETITLE

// CLOSEDWIKI PAGE HEADER TITLE FIX
$(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'ClosedWiki') {
        return;
    }

    $('.page-header__title').text('Closed Wiki');
        });
// END CLOSEDWIKI PAGE HEADER TITLE FIX

// CLOSEDWIKI TITLE FIX
$(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'ClosedWiki') {
        return;
    }

    $('title').text((_, old)=>old.replace('⧼closedwiki⧽', 'Closed Wiki'));
        });
// END CLOSEDWIKI TITLE FIX </nowiki>