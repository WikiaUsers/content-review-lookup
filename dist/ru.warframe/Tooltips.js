//from Warframe (en) wiki
window.tooltips_list = [
	{	classname: 'base-tooltip',
        parse: '{'+'{Тултип|<#param#>|<#param#2>}}',
    },
	{	classname: 'mod-tooltip',
        parse: '{'+'{Тултип/Мод|<#param#>}}',
    },
	{	classname: 'simple-image-tooltip',
        parse: '{'+'{Тултип/Картинка|<#param#>}}',
    },
    {	classname: 'relic-tooltip',
        parse: '{'+'{Тултип/Релик|<#tier#>|<#name#>}}',
    },
    {	classname: 'test-tooltip',
        parse: '{'+'{Тултип/Тест|<#param#>}}',
    },
];

window.tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};