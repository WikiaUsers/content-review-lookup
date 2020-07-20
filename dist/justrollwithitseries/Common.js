/* Any JavaScript here will be loaded for all users on every page load. */
 
$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module">';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});