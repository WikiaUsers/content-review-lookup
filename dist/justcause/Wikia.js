AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:WikiActivity","Special:RecentChanges"];
importScriptPage('AjaxRC/code.js', 'dev');

var logoHeight = $('#imgsize img').height();
    if (logoHeight < 104) {
        var margintop = (104 - logoHeight) / 2;
        $('#imgsize img').css('margin-top', margintop);
    }