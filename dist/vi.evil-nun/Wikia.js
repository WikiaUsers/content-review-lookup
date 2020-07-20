/*Sidebar*/
 
$(function() {
    var newSection = '<section id="activities" class="module"><h2>' +
      '' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/vi/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});