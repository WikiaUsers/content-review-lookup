/* Any JavaScript here will be loaded for all users on every page load. */
window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : false,
    customRendering : { },
    headerLink : false,
    refresh : false,
    refreshDelay : 5 * 60 * 1000,
    timeout : 10 * 1000
};

window.SpoilerAlertJS = {
    question: 'This area contains spoilers for Bors High School for Troubled Teens: A Murder Mystery. Do you wish to continue?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};