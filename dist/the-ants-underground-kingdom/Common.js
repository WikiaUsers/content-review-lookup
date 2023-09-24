/* Any JavaScript here will be loaded for all users on every page load. */
window.tooltips_config = {
    events: ['CustomEvent'],
    noCSS: true,
    offsetX: 5,
    offsetY: 10,
    waitForImages: true,
}
window.tooltips_list = [
	{
    	classname: 'skill-tooltip',
		delay: 500,
    	parse: '{'+'{SkillTooltip|<#ant_name#>|<#skill_name#>}}',   // '+' makes MediaWiki ignore the template on the page with settings
	}, 	{
    	classname: 'skill-link',
		delay: 500,
    	parse: '{'+'{<#skill_name#> (<#ant_name#>)|x}}',   // '+' makes MediaWiki ignore the template on the page with settings
	}
]