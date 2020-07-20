$(function() {
    var newSection = '<section id="activities" class="module"><h2>' +
      'Noticias'  + '</h2>' + '</discussions>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{RailModule}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});
EditIntroButtonText = 'intro';