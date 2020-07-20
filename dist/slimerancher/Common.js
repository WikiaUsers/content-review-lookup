/* Any JavaScript here will be loaded for all users on every page load. */

/* Active Auto-refesh Recent Activity page */
AjaxRCRefreshText = 'Auto refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:UnusedPhotos",
    "Special:AllPages"
];


/* April Fool's day image replace */
$(document).ready(function() {
    var dt = new Date();
    if (dt.getDate() === 1 && dt.getMonth() === 3) {
        $(".wordmark img").attr("src", "https://vignette.wikia.nocookie.net/slimerancher/images/6/61/CatTranscendence.gif/revision/latest?cb=20180401033604");
        $(".WikiaPhotoGalleryPreview img").each(function(){$(this).attr("src", "https://vignette.wikia.nocookie.net/slimerancher/images/6/61/CatTranscendence.gif/revision/latest?cb=20180401033604");});
        $("img.avatar").each(function(){$(this).attr("src", "https://vignette.wikia.nocookie.net/slimerancher/images/6/61/CatTranscendence.gif/revision/latest?cb=20180401033604");});
        $("img.wds-avatar").each(function(){$(this).attr("src", "https://vignette.wikia.nocookie.net/slimerancher/images/6/61/CatTranscendence.gif/revision/latest?cb=20180401033604");});
        $(".chatCarousel img").each(function(){$(this).attr("src", "https://vignette.wikia.nocookie.net/slimerancher/images/6/61/CatTranscendence.gif/revision/latest?cb=20180401033604");});
    }
});