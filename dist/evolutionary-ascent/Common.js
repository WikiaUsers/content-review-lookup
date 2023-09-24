/* Any JavaScript here will be loaded for all users on every page load. */
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
        classname: 'sequence-tooltip',
        parse: '{' + '{Template:Order Link/data|1=<#sequence#>|2=<#text#>}}'
    }, {
        classname: 'order-tooltip',
        parse: '{' + '{Template:Divine Path Link/data|1=<#pathway#>}}'
    }
],

/*LockOldComments*/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 90;