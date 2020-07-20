
/* configuration section for tooltips */
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true,
};

var tooltips_list = [
    {
        classname: 'item-tooltip',
        parse: '{'+'{Tooltip/Item|<#item#>}}'
    }, {
        classname: 'weapon-tooltip',
        parse: '{'+'{Tooltip/Weapon|<#weapon#>}}'
    }, {
        classname: 'armor-tooltip',
        parse: '{'+'{Tooltip/Armor|<#armor#>}}'
    }, {
        classname: 'accessory-tooltip',
        parse: '{'+'{Tooltip/Accessory|<#accessory#>}}'
    }, {
        classname: 'offhand-tooltip',
        parse: '{'+'{Tooltip/Offhand|<#offhand#>}}'
    }, {
        classname: 'ability-tooltip',
        parse: '{'+'{Tooltip/Ability|job=<#job#>|ability=<#ability#>}}'
    }, {
        classname: 'monster-tooltip',
        parse: '{'+'{Tooltip/Monster|<#monster#>}}'
    }, {
        classname: 'npc-tooltip',
        parse: '{'+'{Tooltip/Npc|<#npc#>}}'
    }, {
        classname: 'legendary-tooltip',
        parse: '{'+'{Tooltip/Legendary|<#legendary#>}}'
    }, {
        classname: 'gear-set-tooltip',
        parse: '{'+'{Tooltip/Gear set|<#set#>}}'
    },
];

/* end of configuration section for tooltips */