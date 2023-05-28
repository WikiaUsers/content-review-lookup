/* Any JavaScript here will be loaded for all users on every page load. */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
window.tooltips_list = [
	{
		classname: 'itemLore',
		parse: '{{item=<#item#>|rarity=<#rarity#>|type=<#type#>|show=no}}'
	}
]