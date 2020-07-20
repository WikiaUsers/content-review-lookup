var tooltips_list = [
    {
        classname: 'custom-tooltip-text',
        text: "Parameter: <#parameter#><br/>This is just text and HTML - wikitext '''won't''' be parsed",
    },
    {
        classname: 'custom-tooltip-parse',
        parse: '{|style="white-space:nowrap;"\n!Parameter:\n|<#parameter#>\n|-\n!Lc:\n|{'+'{lc:<#parameter#>}}\n|-\n!Uc:\n|{'+'{uc:<#parameter#>}}\n|-\n!PAGENAME:\n|{'+'{PAGENAME}}\n|}',
    },
]
var tooltips_config = {
    offsetX: 15,
    offsetY: 15,
    waitForImages: true,
    events: ['RotationModule'],
}
var tooltips_debug = 0

importArticles({ type: 'script', article: 'Tooltips/code2.js' });