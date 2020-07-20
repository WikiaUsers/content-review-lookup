
//For use with Template:Username – borrowed from Animal Jam Wiki
$(function () {
    var name;
    if (!wgUserName) {
        name = "Anon";
    } else {
        name = wgUserName;
    }
    $('span.insertusername').html(name);
});