/* Any JavaScript here will be loaded for all users on every page load. */

window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/subnautica/images/d/de/Ajax-loader.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

var tooltips_list = [
    {
        classname: 'fauna-tooltip',
        parse: '{' + '{FaunaTable/<#fauna#>}}'
    },
    {
        classname: 'flora-tooltip',
        parse: '{' + '{FloraTable/<#flora#>}}'
    },
    {
        classname: 'coral-tooltip',
        parse: '{' + '{CoralTable/<#coral#>}}'
    },
    {
        classname: 'clade-tooltip',
        parse: '{' + '{CladeInfo/<#info#>}}'
    },
    {
        classname: 'databank-tooltip',
        parse: '{' + '{Databank2|<#info#>}}'
    },
    {
        classname: 'item-tooltip',
        parse: '{' + '{Item2|<#item#>}}'
    },
    {
        classname: 'biome-tooltip',
        parse: '{' + '{BiomeTable/<#biome#>}}'
    }
];