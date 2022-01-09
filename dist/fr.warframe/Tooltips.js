var tooltips_list = [
	{
        classname: 'tooltip', 
        parse: '{'+'{Tooltip|<#param#>|<#param2#>}}',
    },
    {
        classname: 'zoneRP-perso-tooltip',
        parse: '{' + '{Tooltip/ZoneRP/Personnage|<#param#>}}',
    },
];
 
var tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};