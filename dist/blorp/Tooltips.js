window.tooltips_list = [
	{
        classname: 'tooltip', 
        parse: '{'+'{#invoke:Tooltips|getTip|<#param#>|<#param2#>|<#param3#>}}',
    },
	{
        classname: 'test-tooltip', 
        text: 'Success!',
    },
];
 
window.tooltips_config = {
    offsetX: -10,
    offsetY: 10,
    waitForImages: true
};