$(document).ready(function() {
    var Abox = '<section id="activities2" class="DdayModule module"><p class="MarckScript">' +
      'Chat Box' + '</p>' + '</section>';
      $('#WikiaRail').append(Abox);
    $.getJSON('/api.php?action=parse&text={{D-Day}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities2').append(code);
    });
});