$(function() {
    $('.mainpagetwitter').html('<a class="twitter-timeline" data-height="500" data-theme="dark" data-dnt="true" data-link-color="#19CF86" href="https://twitter.com/mothmage_/lists/fantastic-frontier-devs-35140?ref_src=twsrc%5Etfw">Twitter List</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>');
});

importArticles({
    type: "script",
    articles: [
        "w:dev:AjaxRC/code.js",
    ]
});
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];