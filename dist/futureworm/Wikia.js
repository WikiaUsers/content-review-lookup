$(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'New Features' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Specials}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
importScriptPage('ChatOptions/code.js', 'dev');