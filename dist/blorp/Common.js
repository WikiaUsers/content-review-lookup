/* Any JavaScript here will be loaded for all users on every page load. */
window.tooltips_list = [
	{
        classname: 'tooltip', 
        parse: '{'+'{#invoke:Tooltips|getTip|<#param#>|<#param2#>|<#param3#>}}',
    },
	{
        classname: 'test-tooltip', 
        text: 'Success!'',
    },
];
 
window.tooltips_config = {
    offsetX: 5,
    offsetY: 5,
    waitForImages: true
};