$(document).ready(function() {
    var newSection = '<section id="sidebar" class="rail-module"><h2 class="has-icon">' + '<span class="fandom-icons">calendar</span>'  + '&nbsp;Calendrier' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON(mediaWiki.config.get('wgScriptPath') + '/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});