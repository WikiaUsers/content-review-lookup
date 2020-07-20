$(document).ready(function() {
    var newSection = '<section id="activities1" class="module"><p class="MarckScript">' +
      'Thông báo' + '</p>' + '</section>';
    $('#WikiaRail').prepend(newSection);
    $.getJSON('/api.php?action=parse&text={{Thongbao}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities1').append(code);
    });
});