$(window).load(function() {
    var newSection = '<section id="activities" class="MusicboxModule module"><p class="MarckScript">' +
      'Music Box Sonako' + '</p>' + '</section>';
    $('.WikiaActivityModule').before(newSection);
    $.getJSON('/api.php?action=parse&text={{Musicbox-5cms}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});