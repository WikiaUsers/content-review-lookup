//from Warframe (en) wiki
window.tooltips_list = [
	{	classname: 'base-tooltip',
        parse: '{'+'{Тултип|<#param#>|<#param#2>}}',
    },
	{	classname: 'mod-tooltip',
        parse: '{'+'{Тултип/Мод|<#param#>}}',
    },
    {	classname: 'relic-tooltip',
        parse: '{'+'{Тултип/Релик|<#tier#>|<#name#>}}',
    },
    {	classname: 'skill-tooltip',
        parse: '{'+'{Тултип/Способность|<#param#>}}',
    },
    {	classname: 'simple-image-tooltip',
        parse: '{'+'{Тултип/Картинка|<#param#>}}',
    },
    {	classname: 'warframe-tooltip',
        parse: '{'+'{Тултип/Варфрейм|<#param#>}}',
    },
    {	classname: 'test-tooltip',
        parse: '{'+'{Тултип/Тест|<#param#>}}',
    },
    {	classname: 'text-tooltip',
        parse: '{'+'{Тултип/Текст|<#param#>}}',
    },
    {	classname: 'focus-tooltip',
        parse: '{'+'{Тултип/Фокус|<#param#>|<#param#2>}}',
    },
    {	classname: 'arcane-tooltip',
        parse: '{'+'{Тултип/Аркан|<#param#>}}',
    },
];

window.tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};