/* JavaScript hier wird für alle Benutzer für jede Seite geladen. */

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
    offsetX: 20,
    offsetY: 20,
    waitForImages: true
};
// Tooltip end

importArticles({
	type: 'style',
	articles: [
        'MediaWiki:ImageTooltip.css',                       //ImageTooltip.js
	]
});