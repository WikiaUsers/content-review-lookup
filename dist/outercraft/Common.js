/* Any JavaScript here will be loaded for all users on every page load. */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
window.tooltips_list = [
	{
		classname: 'itemLore-tooltip',
		parse: '{'+'{Lore|item=<#item#>|type=<#type#>|effects=<#effects#>}}'
	}
]