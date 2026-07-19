// AUTO-REFRESH RECENT CHANGES
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges"];
// END AUTO-REFRESH

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
        $(".firstHeading,h1[itemprop=\"name\"],.resizable-container .page-header__title").html(mw.html.escape(newTitle));
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

// CREATE THE 'DEV' NAMESPACE IF IT DOESN'T EXIST ALREADY
window.dev = window.dev || {};
 
// CREATE THE SUB-NAMESPACE FOR THIS ADDON AND SET SOME OPTIONS
window.dev.editSummaries = {
    select: 'Template:Stdsummaries'
};
// END STANDARD EDIT SUMMARIES