// налаштування для скрипта dev:Tooltips.js
var tooltips_list = [
	{
        classname: 'tooltip', 
        parse: '{'+'{#invoke:Підказки|getTip|<#param#>|<#param2#>|<#param3#>}}',
    },
];
 
var tooltips_config = {
    events: ['CustomEvent'],
    offsetX: 10,
    offsetY: 10,
    waitForImages: true
};