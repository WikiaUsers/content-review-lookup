$(document).ready(function() {
    var newSection = '<section id="twitter" class="module"><h1>' +
      'Twitter' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text=<twitter screen-name="elenaofavalor" height="300" theme="dark" />&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#twitter').append(code);
    });
});
importArticles({
    type: 'script',
    articles: [
        // 
        'MediaWiki:NewDropdown/code.js',
        // 
    ]
});

importScriptPage('MultiUpload/code.js', 'dev');