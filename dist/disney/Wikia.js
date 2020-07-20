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

/* KH3 Personality Quiz */
if ( mw.config.get('wgNamespaceNumber') === 112 ) {
    $('body').append("<a class='typeform-share button' href='https://brettbates.typeform.com/to/emiuv4' data-mode='popup' data-auto-open=true data-hide-headers=true data-hide-footer=true target='_blank'></a><script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id='typef_orm_share', b='https://embed.typeform.com/'; if(!gi.call(d,id)){ js=ce.call(d,'script'); js.id=id; js.src=b+'embed.js'; q=gt.call(d,'script')[0]; q.parentNode.insertBefore(js,q) } })() </script>");
}