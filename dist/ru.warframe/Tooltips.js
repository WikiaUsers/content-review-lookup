//from Warframe (en) wiki
window.tooltips_list = [
	{	classname: 'mod-tooltip',
        parse: '{'+'{Тултип/Мод|<#param#>}}',
    },
	{	classname: 'resource-tooltip',
        parse: '{'+'{Тултип/Ресурс|<#param#>}}',
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