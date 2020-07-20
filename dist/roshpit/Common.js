/* Any JavaScript here will be loaded for all users on every page load. */
// Tooltips
// Source: http://dev.wikia.com/wiki/Tooltips
    // Main Config
var tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: true,
    events: ['CustomEvent'],
    noCSS: true,
};
 
    // Creating custom tooltip types
var tooltips_list = [
    {
        classname: 'custom-tooltip-text',
        text: "Parameter: <#parameter#><br/>This is just text and HTML - wikitext '''won't''' be parsed",
    }, {
        classname: 'custom-tooltip-parse',
        parse: '{|style="white-space:nowrap;"\n!Parameter:\n|<#parameter#>\n|-\n!Lc:\n|{'+'{lc:<#parameter#>}}\n|-\n!Uc:\n|{'+'{uc:<#parameter#>}}\n|-\n!PAGENAME:\n|{'+'{PAGENAME}}\n|}',
    }, {
        classname: 'basic-tooltip',
        onHide: function(handle) { $(this).html($(handle).html()) },
    },
];
 
 
// importArticles
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
});