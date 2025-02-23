$('.discord-widget').append('<widgetbot server="1254328075198533684" channel="1254329100554997781" width="800" height="600" ></widgetbot> <script src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed"></script>');

$(document).ready(function() {
    var andrew = "<span style='color:#005de5;'><span style='color:#005de5;'><span style='color:#005de5;'>Andrew</span></span></span>"; 
    var wrappedandrew = "<span style='color:#005de5;'>" + andrew + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + andrew + "\\b", "g"), wrappedandrew);
    });
});

$(document).ready(function() {
    var terry = "<span style='color:#34ee4e;'><span style='color:#34ee4e;'><span style='color:#34ee4e;'>Terry</span></span></span>"; 
    var wrappedterry = "<span style='color:#34ee4e;'>" + terry + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + terry + "\\b", "g"), wrappedterry);
    });
});

$(document).ready(function() {
    var hank = "<span style='color:#ff8920;'><span style='color:#ff8920;'><span style='color:#ff8920;'>Hank</span></span></span>"; 
    var wrappedhank = "<span style='color:#ff8920;'>" + hank + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + hank + "\\b", "g"), wrappedhank);
    });
});

$(document).ready(function() {
    var violet = "<span style='color:#7e526c;'><span style='color:#7e526c;'><span style='color:#7e526c;'>Violet</span></span></span>"; 
    var wrappedviolet = "<span style='color:#7e526c;'>" + violet + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + violet + "\\b", "g"), wrappedviolet);
    });
});

$(document).ready(function() {
    var aubrene = "<span style='color:#fe00ff;'><span style='color:#fe00ff;'><span style='color:#fe00ff;'>Aubrene</span></span></span>"; 
    var wrappedaubrene = "<span style='color:#fe00ff;'>" + aubrene + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + aubrene + "\\b", "g"), wrappedaubrene);
    });
});

$(document).ready(function() {
    var graylynn = "<span style='color:#ffaac1;'><span style='color:#ffaac1;'><span style='color:#ffaac1;'>Graylynn</span></span></span>"; 
    var wrappedgraylynn = "<span style='color:#ffaac1;'>" + graylynn + "</span>";
    $("body").html(function(_, html) {
        return html.replace(new RegExp("\\b" + graylynn + "\\b", "g"), wrappedgraylynn);
    });
});

window.SpoilerAlertJS = {
    question: 'This contains spoilers for the map!!!',
    yes: 'Continue',
    no: 'Ill figure it out myself',
    fadeDelay: 600
};