var tooltips_list = [
    {
        classname: 'character-icon',
        parse: '{'+'{Tooltip/Bohater|<#character#>|<#skin#>}}',
    },
    {
        classname: 'ability-icon',
        parse: '{'+'{Tooltip/Umiejętność/<#champion#>/<#ability#>}}',
    },
    {
        classname: 'item-icon',
        parse: '{'+'{Tooltip/Przedmiot/<#item#>}}',
    },
    {
        classname: 'spell-icon',
        parse: '{'+'{Tooltip/Czar/<#spell#>}}',
    },
    {
        classname: 'mastery-icon',
        parse: '{'+'{Tooltip/Specjalizacja/<#season#>/<#mastery#>}}',
    },
    {
        classname: 'effect-icon',
        parse: '{'+'{Tooltip/Efekt/<#effect#>}}',
    },
    {
        classname: 'rune-icon',
        parse: '{'+'{Tooltip/Runa/<#rune#>|<#tier#>|<#multiply#>}}',
    },
]
var tooltips_config = {
    offsetX: 15,
    offsetY: 15,
    waitForImages: true,
    events: ['RotationModule', 'EditPageAfterRenderPreview'],
}
var tooltips_debug = 0

importArticles({ type: 'script', article: 'u:dev:Tooltips/code.js' });