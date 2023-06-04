/* Any JavaScript here will be loaded for all users on every page load. */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
 
window.tooltips_list = [
    {
        classname: 'ability-tooltip',
        parse: '{'+'{<#ability#>|<#magnitude#>|duration=<#duration#>|tt=<#tt#>|show=no}}',
    }
];