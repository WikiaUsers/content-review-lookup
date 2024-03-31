/* Any JavaScript here will be loaded for all users on every page load. */
// Collapsible trs
$('tr.collapsibletr').each(function(){
     $(this).nextUntil('.collapsibletr, .uncollapsible').hide();
}).click(function(){
     $(this).toggleClass('collapsed').nextUntil('.collapsibletr, .uncollapsible').toggle();
});

//Preload Template config
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplatesList";
preloadTemplates_subpage = "case-by-case";
preloadTemplates_namespace = "Template";