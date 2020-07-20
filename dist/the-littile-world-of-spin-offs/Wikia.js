$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"><h1>' +
      'Specials' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Specials}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});