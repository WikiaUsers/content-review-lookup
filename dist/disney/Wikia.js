/*---------------------- Framekiller ----------------------------------

if (parent.frames.length > 0) {
    var file = document.referrer.match(/imgurl=(.*?)&/);
    if (file.length > 0) {
        top.location.href = document.location.href + '?file=' + file[1].split('/').pop();
    } else {
        top.location.href = document.location.href;
    }
} */

/*---------------------- SpoilerAlert ----------------------------------*/
window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};
/*--------------------------------------------------------------------*/

$(".pi-image").css({'background':$(".infoboxcolors").data('imagebackgroundcolor')});
$(".pi-data").css({'background':$(".infoboxcolors").data('databackgroundcolor'), 'color':$(".infoboxcolors").data('datafontcolor')});

/* Auto-refreshing recent changes */
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Discord */
// Disney Wiki Discord
window.DiscordIntegratorConfig = {
    siderail: {
        title: "Discord Server",
        id: "320924689260216321",
        theme: "dark"
    }
};