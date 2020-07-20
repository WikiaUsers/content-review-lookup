$(function() {
    var newSection = '<section id="activities" class="rail-module"><h2><center>' +
      'Follow us @RioMovieWiki' + '</center>' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Universal Twitter Feed}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});