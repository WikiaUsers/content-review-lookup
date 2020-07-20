/* Any JavaScript here will be loaded for all users on every page load. */


/*----------- SIDEBAR FUNCTION -------- */
// loads sidebar section for new episodes, specials etc. 
// The section will be populated by whatever content is in the "Sidebar" template.
 
$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', 
     function(data) {
        var content = data.parse.text['*'];
        $('section#sidebar').append(content);
    });
});

/* Auto updating recent changes  */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];