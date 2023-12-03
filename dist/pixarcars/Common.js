importScriptPage('ShowHide/code.js', 'dev');


if ( document.getElementById('TitleItalic') ) {
$('.firstHeading').css('font-style','italic');
}

// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
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

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});

window.MassCategorizationGroups = ['sysop'];


// Special:Upload pre-load config

PFD_templates = [
    {
        label:   'Images',
        desc:    '{' + '{aboutfile\n|description=Describe the subject or image contents\n|source=Where the image is from\n|artist=Author of the image\n|edited=Describe edits, if any\n|other_versions=Link to another closely related file\n}}\n{' + '{uncategorized}}',
    },
];

PFD_requireLicense = true;
PFD_discourageEditorFileUpload = true