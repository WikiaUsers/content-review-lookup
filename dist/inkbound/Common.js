/* Any JavaScript here will be loaded for all users on every page load. */


window.tooltips_list = [
	{	classname: 'base-tooltip',
        parse: '{'+'{Tooltip|<#param#>|<#param2#>}}',
    },
    {	classname: 'binding-tooltip',
        parse: '{'+'{Tooltip/Binding|<#param#>|<#param2#>}}',
    },
    {	classname: 'vestige-tooltip',
        parse: '{'+'{Tooltip/Vestige|<#param#>|<#param2#>}}',
    },
    {	classname: 'simple-image-tooltip',
        parse: '{'+'{Tooltip/Image|<#param#>|<#param2#}}',
    },
    {	classname: 'prefab-tooltip',
        parse: '{'+'{Tooltip/Prefab|<#param#>|<#param2#>}}',
    },
    {	classname: 'set-tooltip',
        parse: '{'+'{Tooltip/Set|<#param#>|<#param2#>}}',
    },
];

window.tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};