/* Any JavaScript here will be loaded for all users on every page load. */

/* tooltip config for lineup template */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
window.tooltips_list = [
    {
        classname: 'lineup-slot-info',
        parse: '{' + '{LineupSlotInfo|<#unitname#>|<#level#>|<#talents#>}}',
    },
    {
        classname: 'burgle-ability-tooltip',
        parse: '{' + '{BurgleCatsSkillDetail|<#skillname#>}}',
    }
];
/* end of tooltip */