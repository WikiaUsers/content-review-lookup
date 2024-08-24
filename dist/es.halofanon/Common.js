/* Common.js <pre>
Cualquier JavaScript que esté aquí será cargado para todos los usuarios en todas las páginas cargadas del wiki. */

// 1. Wiki Activity
 window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : true,
    customRendering : { },
    headerLink : true,
    refresh : true,
    refreshDelay : 5 * 60 * 100,
    timeout : 10 * 1000
};