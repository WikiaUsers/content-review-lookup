$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"><h1>' +
      'Neuigkeiten' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{News}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});