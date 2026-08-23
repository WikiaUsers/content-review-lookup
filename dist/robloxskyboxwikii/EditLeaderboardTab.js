$(function () {
    // Wait for EditcountTab to create its tab
    var check = setInterval(function () {
        var tab = document.querySelector(
            'a[href*="Special:Editcount"], a[href*="Editcount"]'
        );

        if (!tab) {
            return;
        }

        // Don't add it twice
        if (document.querySelector('#EditLeaderboardTab')) {
            clearInterval(check);
            return;
        }

        // Clone the existing profile tab
        var newTab = tab.parentElement.cloneNode(true);

        newTab.id = 'EditLeaderboardTab';

        var newLink = newTab.querySelector('a');

        if (newLink) {
            newLink.textContent = 'Edit Leaderboard';
            newLink.href = mw.util.getUrl('Project:EditLeaderboard');
        }

        // Put it directly after the existing tab
        tab.parentElement.parentElement.appendChild(newTab);

        clearInterval(check);
    }, 100);
});