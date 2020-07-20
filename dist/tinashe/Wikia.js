var ajaxRefresh = 60;
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity","The Bracket"];
importScriptPage('AjaxRC/code.js', 'dev');
 
 
$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"><center>' +
      '' + '</center>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Latest}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});