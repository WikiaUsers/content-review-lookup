/* Any JavaScript here will be loaded for all users on every page load. */

var tooltips_list = [
    {
        classname: 'custom-tooltip-sidekickskill',
        parse: '{'+'{Skill/<#skillname#>/Description}}',
    },
	{
        classname: 'custom-tooltip-sidekick',
        parse: '{'+'{SidekickTable|<#sidekickname#>}}',
    },
]
 
var tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: true,
    noCSS: true,
}