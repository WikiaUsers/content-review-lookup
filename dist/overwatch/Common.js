/* Any JavaScript here will be loaded for all users on every page load. */

/*tooltip config */
window.tooltips_list = [
    {
        classname: 'advanced-tooltip',
        delay: 500,
    }, {
        classname: 'ability-tooltip',
        delay: 500,
        parse: '{'+'{Ability tooltip|ability=<#ability#>|hero=<#hero#>}}',
    }, {
        classname: 'stadium-tooltip',
        delay: 500,
        parse: '{'+'{Stadium tooltip|ability=<#ability#>|hero=<#hero#>}}',
    }, {
        classname: 'hero-tooltip',
        delay: 500,
        parse: '{'+'{Hero tooltip|name=<#name#>}}',
    },
]