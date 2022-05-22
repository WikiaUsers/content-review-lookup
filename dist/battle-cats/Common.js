/* Any JavaScript here will be loaded for all users on every page load. */

/* tooltip config and custom tooltips */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
window.tooltips_list = [
    {
        classname: 'burgle-ability-tooltip',
        parse: '{' + '{BurgleCatsSkillDetail|<#skillname#>}}',
    }
];
/* end of tooltip */

/*Add sidebar rail module*/

window.AddRailModule = [
    {page: 'Template:TopAddRail', prepend: true, maxAge: 60},
    {page: 'Template:BottomAddRail', maxAge: 60},
];
/* End of sidebar rail module */