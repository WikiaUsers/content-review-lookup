// Konfiguracja tooltipów
var tooltips_list = [
    {
        classname: 'card-tooltip',
        parse: '{'+'{k/tooltip|<#card#>}}',
    },
    {
        classname: 'crafting-tooltip',
        parse: '{'+'{CraftingTooltip|<#rarity#>|<#type#>|<#premium#>}}',
    },
    {
        classname: 'keyword-tooltip',
        parse: '{'+'{KeywordTooltip|<#ability#>}}'
    }
];