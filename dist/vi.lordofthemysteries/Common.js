/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */
//========================================
// IMPORT 
//========================================
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Dorui.js'
    ]
});

/* Configuration for dev:Tooltips.js */
window.tooltips_config = {
	offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true,
},
window.tooltips_list = [
    {
        classname: 'sequence-tooltip',
        parse: '{' + '{Template:Seq/tt|1=<#seq#>}}'
    }, {
        classname: 'pathway-tooltip',
        parse: '{' + '{Template:Pathway/tt|1=<#pathway#>}}'
    }, {
        classname: 'ingredient-tooltip',
        parse: '{' + '{Template:Ingr/tt|1=<#name#>}}'
    }, {
        classname: 'uniqueness-tooltip',
        parse: '{' + '{Template:Uniqueness/tt|1=<#name#>|2=<#description#>}}'
    },
        {
        classname: 'qbcc-small-tooltip',
        parse: '{'+'{<#template#>|show=tip}}',
    },
    {
        classname: 'qbcc-medium-tooltip',
        parse: '{'+'{<#template#>|show=tip}}',
    },
    {
        classname: 'qbcc-large-tooltip',
        parse: '{'+'{<#template#>|show=tip}}',
    },
    {
        classname: 'qbcc-dynamic-tooltip',
        parse: '{'+'{<#template#>|show=tip|size=<#size#>}}',
    },
    {
        classname: 'qbcc-wiki-tooltip',
        parse: '<#wiki#>',        
    }
]

// Settings for LinkPreview
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/lordofthemysteries/vi/images/4/4a/Site-favicon.ico';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/lordofthemysteries/vi/images/4/4a/Site-favicon.ico';
window.pPreview.tlen = 1000;
window.pPreview.RegExp.noinclude = [".NoLinkPreview", ".LinkPreview-ignore", ".quote", ".mw-ext-cite-error", ".error", ".references", ".reference", ".sup.reference"];
window.pPreview.RegExp.iparents = ['.noPreview', '#ignorePreviewID', 'div[data-ignore-me=1]', '.sequence-tooltip', '.pathway-tooltip', '.ingredient-tooltip', '.uniqueness-tooltip', '.qbcc-small-tooltip', '.qbcc-medium-tooltip', '.qbcc-large-tooltip', '.qbcc-dynamic-tooltip', '.qbcc-wiki-tooltip'];
window.pPreview.RegExp.iclasses = ['sequence-tooltip', 'pathway-tooltip', 'ingredient-tooltip', 'uniqueness-tooltip', 
	'qbcc-small-tooltip', 'qbcc-medium-tooltip', 'qbcc-large-tooltip', 'qbcc-dynamic-tooltip', 'qbcc-wiki-tooltip'];