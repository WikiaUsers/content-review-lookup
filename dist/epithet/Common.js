//AjaxRC config
window.ajaxRefresh = 30000;
window.ajaxPages = ['Blog:Recent_posts', 'Special:DiscussionsRC', 'Special:WikiActivity'];
window.ajaxSpecialPages = ['Recentchanges', 'SocialActivity', 'Log'];

//Add border color to PIs
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});

//TZclock config
window.TZclockSimpleFormat = true;

//AddRailModule config
window.AddRailModule = [{prepend: true}];

//EraIcons config
window.useIncludedStylesheet = true;

//BackToTopButton config
window.BackToTopModern = true;