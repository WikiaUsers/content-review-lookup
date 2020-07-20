/* Any JavaScript here will be loaded for all users on every page load. */
// Insert it into Toolbar (Oasis) and Header (Monobook)
$(function() {
    if (!document.getElementById('ca-skins')) {
        if (skin !== 'oasis' || skin !== 'wikia') {
            $('<li><a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&useskin=wikia">Oasis</a></li>').appendTo('#p-cactions > .pBody > ul');
            $('<li><a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&useskin=wikiamobile">Mobile</a></li>').appendTo('#p-cactions > .pBody > ul');
            $('<li><a href="/wiki/' + wgPageName + '?useskin=mercury" title="Giao diện Mercury">Mercury</a></li>').appendTo('#p-cactions > .pBody > ul');
        }
    }
});