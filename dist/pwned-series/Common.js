/* Any JavaScript here will be loaded for all users on every page load. */

window.tooltips_config = {
    noCSS: true,
}

window.tooltips_list = [
{
    classname: 'TrophyToolTip',
    parse: '{'+'{TrophyToolTip|Name=<#name#>}}',   // '+' makes MediaWiki ignore the template on the page with settings
},
{
	classname: 'GemstoneToolTip',
	parse:'{'+'{GemToolTip|Name=<#name#>}}'
},
]