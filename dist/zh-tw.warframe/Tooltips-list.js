var tooltips_list = [
    //已測試可用
    {
        classname: 'ability-tooltip', 
        parse: '{'+'{Tooltip/Ability|<#param#>}}',
    },
    {
        classname: 'mod-tooltip', 
        parse: '{'+'{Tooltip/Mod|<#param#>}}',
    }
    //尚待測試
    // {
    //     classname: 'arcane-tooltip', 
    //     parse: '{'+'{Tooltip/Arcane|<#param#>|<#name#>}}',
    // },
    // {
    //     classname: 'damagetype-tooltip', 
    //     parse: '{'+'{Tooltip/DamageType|<#param#>|<#param2#>}}',
    // },
    // {
    //     classname: 'dropchance-tooltip', 
    //     parse: '{'+'{Tooltip/DropChance|<#param#>|<#param2#>}}',
    // },

    // {
    //     classname: 'relic-tooltip', 
    //     parse: '{'+'{Tooltip/Relic|<#param#>}}',
    // },
    // {
    //     classname: 'weapon-tooltip', 
    //     parse: '{'+'{Tooltip/Weapon|<#param#>|<#param2#>|<#param3#>}}',
    // },
    // {
    //     classname: 'warframe-tooltip', 
    //     parse: '{'+'{Tooltip/Warframe|<#param#>|<#param2#>}}',
    // },
    // {
    //     classname: 'test-tooltip', 
    //     parse: '{'+'{Tooltip/Test|<#param#>|<#param2#>|<#param3#>|<#param4#>}}',
    // }
];
 
var tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};