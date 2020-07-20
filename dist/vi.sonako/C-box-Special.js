if (wgCanonicalSpecialPageName == "WikiActivity") {
$(document).ready(function() {
    var newSection = '<section id="activities2" class="module"><p class="MarckScript">' +
      'Chat Box' + '</p>' + '</section>';
    $('.CommunityCornerModule').after(newSection);
    $.getJSON('/api.php?action=parse&text={{Cbox}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities2').append(code);
    });
});
}