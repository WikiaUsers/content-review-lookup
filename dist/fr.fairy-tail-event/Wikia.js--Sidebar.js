$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"><h1>' +
      'MÉMO' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});