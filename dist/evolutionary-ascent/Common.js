/* ================
   Other imports
   ================ */
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:BannerNotification.js'
});

/*BackToTopButton*/
window.BackToTopModern = true;

// Custom Tooltip CSS removal
window.tooltips_config = {
	offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true,
},
window.tooltips_list = [
    {
        classname: 'divinePath-tooltip',
        parse: '{' + '{Template:Divine Path/data|1=<#seq#>|2=<#text#>}}'
    }
],

window.tooltips_list = [
    {
        classname: 'order-tooltip',
        parse: '{' + '{#invoke:Divine Path|orderLink|1=<#seq#>|2=<#text#>}}'
    },
    // ... other tooltip configurations
];


/*LockOldComments*/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 120;