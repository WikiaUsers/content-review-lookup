$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module">' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/fr/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});