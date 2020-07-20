$(document).ready(function() {
    var newSection = '<section><h1>' +
      '' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{FeaturedArticleVoting}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('#toplists-list-body').prepend(code);
    });
});