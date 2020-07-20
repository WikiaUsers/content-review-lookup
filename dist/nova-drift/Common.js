/* Any JavaScript here will be loaded for all users on every page load. */

var tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
 
var tooltips_list = [
    {
        classname: 'mod-tooltip',
        parse: '{'+'{<#mod#>|tt=<#tt#>|show=no}}',
    }
];

window.AddRailModule = [{prepend: true}];
window.BackToTopModern = true;