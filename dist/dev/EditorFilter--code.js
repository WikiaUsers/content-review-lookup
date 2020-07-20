// <nowiki>
/* created by Curiouscrab */
(function() {
    var config = mw.config.get([
        'wgAction',
        'wgUserGroups'
    ]);
    if (
        (config.wgAction !== 'edit' && config.wgAction !== 'submit') ||
        window.EditorFilterLoaded
    ) {
        return;
    }
    window.EditorFilterLoaded = true;
    var filteredWords,
        removedText;
    for (i = 0; i < filteredWords.length; i++) {
        var filteredWord = filteredWords[i];
        if (document.getElementById('wpTextbox1').value.search(filteredWords[i]) > -1 && config.wgUserGroups.indexOf('sysop') > -1) {
            alert('EditorFilter detected a filtered word: ' + filteredWords[i]);
            document.getElementById('wpTextbox1').value = document.getElementById('wpTextbox1').value.split(filteredWords[i]).join('<!-- THIS WORD IS FILTERED --->' + filteredWord);
        } else {
            document.getElementById('wpTextbox1').value = document.getElementById('wpTextbox1').value.split(filteredWords[i]).join((removedText || ''));
        }
    }
})();