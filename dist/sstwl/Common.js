/* Any JavaScript here will be loaded for all users on every page load. */
// WikiActivity Config
window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 500, 501 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : true,
    customRendering : { },
    headerLink : false,
    refresh : false,
    refreshDelay : 5 * 60 * 1000,
    timeout : 10 * 1000
};

// AddRailModule Config
window.AddRailModule = [{prepend: true}];