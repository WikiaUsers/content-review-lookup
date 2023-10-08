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
        classname: 'sequence-tooltip',
        parse: '{' + '{Template:Seq/data|1=<#seq#>|2=<#text#>}}'
    }, {
        classname: 'pathway-tooltip',
        parse: '{' + '{Template:Pathways/data|1=<#pathway#>}}'
    }
],

/*LockOldComments*/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 120;