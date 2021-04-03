$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"><h2>' +
      'Mage du moment' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/fr/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});