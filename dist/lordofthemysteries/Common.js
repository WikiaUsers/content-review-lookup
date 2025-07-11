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
        parse: '{' + '{Template:Seq/data|1=<#seq#>}}'
    }, {
        classname: 'pathway-tooltip',
        parse: '{' + '{Template:Pathways/data|1=<#pathway#>}}'
    }, {
        classname: 'ingredient-tooltip',
        parse: '{' + '{Template:Ingr/data|1=<#name#>}}'
    }, {
        classname: 'uniqueness-tooltip',
        parse: '{' + '{Template:Uniqueness/data|1=<#name#>|2=<#description#>}}'
    }
],

/*LockOldComments*/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 120;

/*Custom Preload*/
window.preloadTemplates_list = "MediaWiki:Custom-PreloadTemplatesList";
window.preloadTemplates_subpage = "case-by-case";
window.preloadTemplates_namespace = "Template";