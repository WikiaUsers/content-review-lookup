$(window).load(function() {
    var newModule = '<section class="module newModule"></section>';
    $('#WikiaRail').append(newModule);
    $.getJSON('/api.php?action=parse&text={{Playable Characters Poll}}<br><br>{{Nav sidebar playable characters}}&format=json', function(n) {
        var addContent = n.parse.text['*'];
        $('.newModule').append(addContent);
    });
});