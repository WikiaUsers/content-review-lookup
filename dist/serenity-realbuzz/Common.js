window.MassCategorizationGroups = ['sysop', 'content-moderator'];

window.MassRenameRevertGroups = ['sysop', 'content-moderator'];

ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');

// Checks if a div with the id "notice" is clicked and then adds a
// "display:none" style attribute to a div with the id "notice".

document.getElementById("notice").addEventListener("click", function() {
    $('#notice').fadeOut(400, function () {
        this.style.display = "none";
    });
});