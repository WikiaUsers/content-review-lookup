$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'Hot on the RR3 Wiki!' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Rail}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});