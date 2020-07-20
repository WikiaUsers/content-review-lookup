$(document).ready(function() {
    var Chatbox = '<section id="activities2" class="ChatboxModule module"><p class="MarckScript">' +
      'Chat Box' + '</p>' + '</section>';
      $('#WikiaRail').append(Chatbox);
    $.getJSON('/api.php?action=parse&text={{Cbox}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities2').append(code);
    });
});