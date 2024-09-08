/* Código Javascript colocado aqui será carregado para todos os utilizadores em cada carregamento de página */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js' //Adição de até 5 níveis na barra de navegação superior
    ]
});

// For tooltips, in category:Tooltip
var tooltips_list = [
    {
        classname: 'ability-tooltip', 
        parse: '{'+'{Tooltip/Ability|<#param#>}}',
    },
    {
        classname: 'arcane-tooltip', 
        parse: '{'+'{Tooltip/Arcane|<#param#>|<#name#>}}',
    },
    {
        classname: 'damagetype-tooltip', 
        parse: '{'+'{Tooltip/DamageType|<#param#>}}',
    },
    {
        classname: 'dropchance-tooltip', 
        parse: '{'+'{Tooltip/DropChance|<#param#>|<#param2#>}}',
    },
    {
        classname: 'mod-tooltip', 
        parse: '{'+'{Tooltip/Mod|<#param#>}}',
    },
    {
        classname: 'relic-tooltip', 
        parse: '{'+'{Tooltip/Relic|<#param#>}}',
    },
    {
        classname: 'weapon-tooltip', 
        parse: '{'+'{Tooltip/Weapon|<#param#>}}',
    },
    {
        classname: 'warframe-tooltip', 
        parse: '{'+'{Tooltip/Warframe|<#param#>}}',
    }
];
 
var tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};
// Tooltip end

importArticles({
	type: 'style',
	articles: [
        'MediaWiki:ImageTooltip.css',                       //ImageTooltip.js
	]
});