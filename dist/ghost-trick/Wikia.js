;(function() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                $.get(mw.util.wikiScript('api'), {
                    action: 'parse',
                    page: 'Template:Spoiler-notice',
                    format: 'json'
                }, function(data) {
                    $('#WikiaRail').append(data.parse.text['*']);
                });
                observer.disconnect();
            }
        });
    });
    observer.observe($('#WikiaRail')[0], {
        childList: true
    });
})();