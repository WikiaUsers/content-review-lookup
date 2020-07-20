$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
*/

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity", "Special:Contributions", "Special:Log"];
importScriptPage('AjaxRC/code.js', 'dev');