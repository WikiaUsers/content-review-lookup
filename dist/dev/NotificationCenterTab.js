/*
NotificationCenterTab
Author:!Davin012613
Description: Changes the tab created by EditcountTab into a tab that leads to Special:NotificationCenter
*/
$(function () {
    var check = setInterval(function () {
        var tab = document.querySelector(
            'a[href*="Special:Editcount"], a[href*="Editcount"]'
        );

        if (!tab) {
            return;
        }
        tab.textContent = 'Notification Center';
        tab.href = mw.util.getUrl('Special:NotificationCenter');

        clearInterval(check);
    }, 100);
});