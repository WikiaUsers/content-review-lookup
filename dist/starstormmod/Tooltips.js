/**
 * Tooltip
 * Imports javascript that allows for custom tooltips.
 */

var tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: true,
    events: ['CustomEvent'],
}

var tooltips_list = [
    {
        classname: 'custom-tooltip-text',
        text: "Parameter: <#parameter#><br/>This is just text and HTML - wikitext '''won't''' be parsed",
    }, {
        classname: 'custom-tooltip-parse',
        parse: '{|style="white-space:nowrap;"\n!Parameter:\n|<#parameter#>\n|-\n!Lc:\n|{'+'{lc:<#parameter#>}}\n|-\n!Uc:\n|{'+'{uc:<#parameter#>}}\n|-\n!PAGENAME:\n|{'+'{PAGENAME}}\n|}',
    }, {
        classname: 'basic-tooltip',
        delay: 500,
        onHide: function() { $(this).html('') },
    }, {
        classname: 'difficulty-tooltip',
        parse: '{|style="white-space:nowrap;"\n|{'+'{:Difficulty|transcludesection={'+'{ucfirst:<#difficulty#>}}Tooltip}}\n|}',
    },
]