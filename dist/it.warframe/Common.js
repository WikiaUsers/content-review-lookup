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
        classname: 'mod-tooltip', 
        parse: '{'+'{Tooltip/Mod|<#param#>}}',
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
        'MediaWiki:CustomDiscordWidget.css'                 //CustomDiscordWidget.js
	]
});