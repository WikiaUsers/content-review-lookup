$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"><h1>' +
      'Petites actualités du jour' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Actualités}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});