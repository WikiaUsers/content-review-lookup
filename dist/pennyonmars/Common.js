/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module rail-module"><h2>' +
      'What is New?' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
        mw.hook('wikipage.content').fire($('#WikiaRail'));
    });
});