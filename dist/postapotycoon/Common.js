/* Any JavaScript here will be loaded for all users on every page load. */
/* Configuration for dev:Tooltips.js */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
    ]
});

window.tooltips_config = {
    events: ['CustomEvent'],
    noCSS: true,
    offsetX: 5,
    offsetY: 5,
    waitForImages: true,
}
window.tooltips_list = [
    {
        classname: 'tooltip-contents',
        text: "Parameter: <#parameter#><br>This is just text and HTML - wikitext '''won't''' be parsed",
    }, {
        classname: 'custom-tooltip-parse',
        parse: '{|style="white-space:nowrap;"\n!Parameter:\n|<#parameter#>\n|-\n!Lc:\n|{'+'{lc:<#parameter#>}}\n|-\n!Uc:\n|{'+'{uc:<#parameter#>}}\n|-\n!PAGENAME:\n|{'+'{PAGENAME}}\n|}',
    },{
        classname: 'pattooltip',
        parse: '{|style="white-space:nowrap;"<#parameter#>',
    },{
        classname: 'basic-tooltip',
        delay: 500,
        onHide: function(handle) { $(this).html($(handle).html()) },
    },
]