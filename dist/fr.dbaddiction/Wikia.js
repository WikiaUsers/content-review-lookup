$(document).ready(function() {
    var newSection = '<section id="activities" class="module"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});

$(function() {
    if(mw.config.get('wgCanonicalSpecialPageName') !== "Upload") {
        return;
    }
    $.get("/wiki/MediaWiki:Uploadtext", { action: "render" }, function(d) {
        $("#uploadtext").html(d);
    });
});

/*mw.hook('DiscordIntegrator.added').add(function() {
    new mw.Api().get({
        action: 'parse',
        text: '{{Sidebar}}'
    }, function(data) {
        $(
            $('<section>')
                .attr({
                    id: 'activities',
                    class: 'module'
                })
                .html(data.parse.text['*'])
        ).insertBefore('.DiscordIntegratorModule');
    });
});*/