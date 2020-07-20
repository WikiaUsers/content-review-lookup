
$(function() {
    var newSection = '<section id="ne" class="module"><h2>' +
      'What is New?' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Specials}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#ne').append(code);
    });
});

$(window).load(function() {
  var newSection = '<section id="boardchat" class="module"><h2>' +
      'CHAT Board' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{AdminSidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#boardchat').append(code);
    });
});