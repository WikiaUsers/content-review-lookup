/* Any JavaScript here will be loaded for all users on every page load. */
 
var tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
 
var tooltips_list = [
    {
        classname: 'recipe-tooltip',
        parse: '{'+'{<#recipe#>|<#magnitude#>|duration=<#duration#>|tt=<#tt#>|show=no}}',
    }
];