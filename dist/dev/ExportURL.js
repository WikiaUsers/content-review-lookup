(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Export') {
        var regex = /^link(\d+)$/, arr = [], url = new URL(location.href);
        url.searchParams.forEach(function(v, k) {
            var match = k.match(regex);
            if (match) {
                arr[Number(match[1]) - 1] = decodeURIComponent(v);
            }
        });
        $('#mw-content-text [name="pages"]').val(arr.join('\n'));
    }
})();