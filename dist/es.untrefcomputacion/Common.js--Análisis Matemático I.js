$(window).load(function() {
    var newModule = '<section class="module newModule"></section>';
    $('#WikiaRail').append(newModule);
    $.getJSON('/api.php?action=parse&text={{Encuesta_An�lisis_Matem�tico_I}}&format=json', function(n) {
        var addContent = n.parse.text['*'];
        $('.newModule').append(addContent);
    });
});