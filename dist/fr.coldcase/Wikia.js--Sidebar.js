$(document).ready(function() {
    var newSection = '<section id="side" class="module"><h1>' +
      'Aujourd'hui…' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Side}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#side').append(code);
    });
});