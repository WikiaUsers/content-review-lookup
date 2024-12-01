$('.discord-widget').append('<widgetbot server="1254328075198533684" channel="1254329100554997781" width="800" height="600" ></widgetbot> <script src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed"></script>');

$(document).ready(function() {
    var andrew = "Andrew"; 
    var wrappedandrew = "<span style='color:#005de5;'>" + andrew + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + andrew + "\\b", "g"), wrappedandrew);
    });
});

$(document).ready(function() {
    var terry = "Terry"; 
    var wrappedterry = "<span style='color:#34ee4e;'>" + terry + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + terry + "\\b", "g"), wrappedterry);
    });
});

$(document).ready(function() {
    var hank = "Hank"; 
    var wrappedhank = "<span style='color:#ff8920;'>" + hank + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + hank + "\\b", "g"), wrappedhank);
    });
});

$(document).ready(function() {
    var violet = "Violet"; 
    var wrappedviolet = "<span style='color:#7e526c;'>" + violet + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + violet + "\\b", "g"), wrappedviolet);
    });
});

$(document).ready(function() {
    var aubrene = "Aubrene"; 
    var wrappedaubrene = "<span style='color:#fe00ff;'>" + aubrene + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + aubrene + "\\b", "g"), wrappedaubrene);
    });
});

$(document).ready(function() {
    var graylynn = "Graylynn"; 
    var wrappedgraylynn = "<span style='color:#ffaac1;'>" + graylynn + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + graylynn + "\\b", "g"), wrappedgraylynn);
    });
});