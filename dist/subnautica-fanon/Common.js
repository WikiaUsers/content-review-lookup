/******************** Any JavaScript here will be loaded for all users on every page load. *********************/

/******************** Tooltips *********************/
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
window.tooltips_list = [
	{
		classname: 'custom-tooltip',
		parse: '{'+'{Tooltip|<#name#>|<#value#>}}',   // '+' makes MediaWiki ignore the template on the page with settings
    },
    {
    	classname: 'creature-tooltip',
    	parse: '<#creature#>'
    }
];