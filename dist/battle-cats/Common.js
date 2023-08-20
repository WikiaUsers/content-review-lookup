/* Any JavaScript here will be loaded for all users on every page load. */

/* tooltip config and custom tooltips */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
window.tooltips_list = [
    // Used in The Burgle Cats-related articles
    {
        classname: 'burgle-ability-tooltip',
        parse: '{' + '{BurgleCatsSkillDetail|<#skillname#>}}',
    },
    // Used in Template:Lineup
    {
        classname: 'lineup-slot-info',
        parse: '{' + '{LineupSlotInfo|<#unitname#>|<#level#>|<#talents#>}}',
    },
];
/* end of tooltip */

/*Add sidebar rail module*/

window.AddRailModule = [
    {page: 'Template:TopAddRail', prepend: true, maxAge: 60},
    {page: 'Template:BottomAddRail', maxAge: 60},
];
/* End of sidebar rail module */

/* LockOldComments */

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 90;
window.lockOldComments.addNoteAbove = true;

/* End of LockOldComments */