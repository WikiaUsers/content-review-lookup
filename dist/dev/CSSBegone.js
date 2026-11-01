/*
Name: CSSBegone
Author: Moonwatcher x Qibli
Descriptioon: Adds a button to the top of any page that when clicked - removes all site CSS.
*/
function savePreference(pref) {
    localStorage.setItem('safeModePreference', pref);
}
function loadPreference() {
    return localStorage.getItem('safeModePreference');
}
function createSafeModeButton() {
    var safemodeButton = document.createElement('button');
    safemodeButton.id = 'safemode';
    safemodeButton.className = 'wds-button';
    safemodeButton.style.fontWeight = '800';
    safemodeButton.textContent = 'Switch to CSS-Free Mode';
    safemodeButton.title = 'Click to remove all CSS customizations';
    safemodeButton.addEventListener('click', function() {
        var currentPageURL = new URL(window.location.href);
        currentPageURL.searchParams.set('usesitecss', '0');
        currentPageURL.searchParams.set('ShowSafeButton', 'no');
        currentPageURL.searchParams.set('RevertBackButton', 'yes');
        savePreference('no');
        window.location.href = currentPageURL.toString();
    });

    return safemodeButton;
}
function createRemoveSafeModeButton() {
    var removeSafeModeButton = document.createElement('button');
    removeSafeModeButton.id = 'removeSafeMode';
    removeSafeModeButton.className = 'wds-button';
    removeSafeModeButton.style.fontWeight = '800';
    removeSafeModeButton.textContent = 'Exit CSS-Free Mode';
    removeSafeModeButton.title = 'Click to revert to the original state';
    removeSafeModeButton.addEventListener('click', function() {
        var currentPageURL = new URL(window.location.href);
        currentPageURL.searchParams.delete('usesitecss');
        currentPageURL.searchParams.delete('ShowSafeButton');
        currentPageURL.searchParams.delete('RevertBackButton');
        savePreference('yes');
        window.location.href = currentPageURL.toString();
    });

    return removeSafeModeButton;
}
function displayButtonBasedOnPreference() {
    var showSafeButtonPreference = loadPreference();
    mw.hook('wikipage.content').add(function () {
        var mwContentText = document.getElementById('mw-content-text');
        var existingSafeModeButton = mwContentText.querySelector('#safemode');
        var existingRemoveSafeModeButton = mwContentText.querySelector('#removeSafeMode');
        if (existingSafeModeButton) {
            mwContentText.removeChild(existingSafeModeButton);
        }
        if (existingRemoveSafeModeButton) {
            mwContentText.removeChild(existingRemoveSafeModeButton);
        }
        if (showSafeButtonPreference === 'no') {
            var removeSafeModeButton = createRemoveSafeModeButton();
            mwContentText.insertBefore(removeSafeModeButton, mwContentText.firstChild);
        } else {
            var safemodeButton = createSafeModeButton();
            mwContentText.insertBefore(safemodeButton, mwContentText.firstChild);
        }
        var currentPageURL = new URL(window.location.href);
        if (mwContentText.querySelector('#removeSafeMode')) {
            if (!currentPageURL.searchParams.has('usesitecss') || 
                !currentPageURL.searchParams.has('ShowSafeButton') || 
                !currentPageURL.searchParams.has('RevertBackButton')) {
                currentPageURL.searchParams.set('usesitecss', '0');
                currentPageURL.searchParams.set('ShowSafeButton', 'no');
                currentPageURL.searchParams.set('RevertBackButton', 'yes');
                savePreference('no');
                window.location.href = currentPageURL.toString();
            }
        }
    });
}
displayButtonBasedOnPreference();
importArticles({
    type: 'style',
    articles: [
        'w:c:dev:MediaWiki:CSSBegone.css'
    ]
});