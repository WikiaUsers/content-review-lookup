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
    noCSS: true,
}

/*LockOldComments*/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 120;