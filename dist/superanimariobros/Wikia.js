$(function() {
    var newSection = '<section id="sidebar" class="module"><h2>' +
        'Whats New?'  + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});