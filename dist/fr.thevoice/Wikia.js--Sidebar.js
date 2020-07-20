(document).ready(function() {
    var newSection = '<section id="sidebar" class="module characterModule"> <h2>' +
      '<big> </big>' + '</h2>' + '</section>';
    $('#WikiaRail').before(newSection);
    $.getJSON(mediaWiki.config.get('wgScriptPath') + "/api.php?action=parse&text={{HComplet}}&format=json", function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
    if ( console ) console.log('script en marche 6');
});