//Additional side bar module
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h2>Wiki News</h2></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar-WikiNews}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});