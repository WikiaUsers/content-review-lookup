var tooltips_list = [
	{
        classname: 'tooltip', 
        parse: '{'+'{#invoke:Tooltips|getTip|<#param#>|<#param2#>|<#param3#>}}',
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