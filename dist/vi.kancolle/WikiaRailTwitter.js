$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'Twitter chính thức' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{TwitterWidget}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});