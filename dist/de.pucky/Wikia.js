/* Taken from: http://youtube.wikia.com/MediaWiki:Wikia.js */
$(document).ready(function() {
    var newSection = '<div id="footer">' + '</div>';
    $('.WikiaFooter section').before(newSection);
    $.getJSON('/api.php?action=parse&text={{Footer}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('div#footer').append(code);
    });
});