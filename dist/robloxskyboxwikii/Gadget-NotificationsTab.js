$(function () {
    var check = setInterval(function () {
        var tab = document.querySelector(
            'a[href*="Special:Editcount"], a[href*="Editcount"]'
        );

        if (!tab) {
            return;
        }
        tab.textContent = 'Alerts';
        tab.href = mw.util.getUrl('Special:NotificationCenter');

        clearInterval(check);
    }, 100);
});