$(document).ready(function() {
    var newSection = '<section id="activities1" class="ThongBaoModule module"><p class="MarckScript">' +
      'Th�ng b�o' + '</p>' + '</section>';
    $('#WikiaRail div.insights-module').after(newSection);
    $.getJSON('/api.php?action=parse&text={{Thongbao}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities1').append(code);
    });
});