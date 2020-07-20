$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'Welcome' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});
 
var logInterval = 100000;
importScriptPage('User:Monchoman45/ChatHacks.js', 'c'); 
importScriptPage('User:Joeytje50/ChatLogger.js', 'runescape');