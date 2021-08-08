//Source:http://community.wikia.com/wiki/Thread:615373
$(window).load(function() {
    var newModule = '<section class="module newModule"></section>';
    $('#WikiaRail').append(newModule);
    $.getJSON('/api.php?action=parse&text={{Module}}&format=json', function(n) {
        var addContent = n.parse.text['*'];
        $('.newModule').append(addContent);
    });
});