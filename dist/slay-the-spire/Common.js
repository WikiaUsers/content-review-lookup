/* Tooltips configuration */
window.tooltips_config = {
    offsetX: 40,
    offsetY: 20,
    waitForImages: true,
	noCSS: true,
};

/* Custom Tooltips */
window.tooltips_list = [
    {
        classname: 'relic-tooltip',
        parse: '{'+'{Relic-Tooltip-Caller|<#name#>}}',
    },
	{
        classname: 'card-tooltip',
        parse: '{'+'{Card-Tooltip-Caller|<#name#>}}',
    },
	{
        classname: 'keyword-tooltip',
        parse: '{'+'{Keyword-Tooltip-Caller|<#name#>}}',
    },
	{
        classname: 'potion-tooltip',
        parse: '{'+'{Potion-Tooltip-Caller|<#name#>}}',
    },
];