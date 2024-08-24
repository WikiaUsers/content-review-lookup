$(window).load(function() {
    var newSection = '<section id="activities1" class="ThongBaoModule module"><p class="MarckScript">' +
      'Thông báo' + '</p>' + '</section>';
    $('#WikiaRail section:first-of-type').after(newSection);
    $.getJSON('/api.php?action=parse&text={{Thongbao}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities1').append(code);
    });
});