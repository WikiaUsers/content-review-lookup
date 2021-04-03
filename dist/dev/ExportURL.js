mw.loader.using('mediawiki.Uri').then(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Export') {
        var regex = /^link(\d+)$/, arr = [], uri = new mw.Uri();
        $.each(uri.query, function(k, v) {
            var match = k.match(regex);
            if (match) {
                arr[Number(match[1]) - 1] = decodeURIComponent(v);
            }
        });
        $('#mw-content-text [name="pages"]').val(arr.join('\n'));
    }
});