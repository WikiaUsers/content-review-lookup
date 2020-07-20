$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'Check out link below' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{New}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});