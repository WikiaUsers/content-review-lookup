/* Any JavaScript here will be loaded for all users on every page load. */

/*---------- Load scripts ----------*/

var tooltips_list = [
    {
        classname: 'ability-tooltip',
        parse: '{'+'{:<#name#>/Abilities|<#value#>|IncludeSource = true}}',   // '+' makes MediaWiki ignore the template on the page with settings
    }
]