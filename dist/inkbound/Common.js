/* Any JavaScript here will be loaded for all users on every page load. */


window.tooltips_list = [
	{	classname: 'base-tooltip',
        parse: '{'+'{Tooltip|<#param#>|<#param#2>}}',
    },
    {	classname: 'simple-image-tooltip',
        parse: '{'+'{Tooltip/Image|<#param#>|<#param#2}}',
    },
    {	classname: 'prefab-tooltip',
        parse: '{'+'{Tooltip/Prefab|<#param#>|<#param#2>}}',
    },
];

window.tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};