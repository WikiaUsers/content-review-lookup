/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* Duplicate Image Listing */
importScriptPage('DupImageList/code.js', 'dev');
 
/* Fix Multiple Upload */
importArticles({
    type: 'script',
    articles: [
 
        'w:c:dev:FixMultipleUpload/code.js',
        'w:c:dev:ReferencePopups/code.js',
    ]
});