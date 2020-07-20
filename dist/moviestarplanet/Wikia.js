$(function() {
    var newSection = '<section id="Sidebar" class="module"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#Sidebar').append(code);
    });
});