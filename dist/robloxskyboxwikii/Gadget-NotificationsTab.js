$(function () {
    // Wait for EditcountTab to create its tab
    var check = setInterval(function () {
        var tab = document.querySelector(
            'a[href*="Special:Editcount"], a[href*="Editcount"]'
        );

        if (!tab) {
            return;
        }

        // Change the existing Editcount tab
        tab.textContent = 'Alerts';
        tab.href = mw.util.getUrl('Special:NotificationCenter');

        clearInterval(check);
    }, 100);
});