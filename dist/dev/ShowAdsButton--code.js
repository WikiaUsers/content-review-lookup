$(function() {
    if (
        mw.config.get('wgNamespaceNumber') === -1 ||
        window.ShowAdsButtonLoaded
    ) {
        return;
    }
    window.ShowAdsButtonLoaded = true;
    $('<li>', {
        'class': 'overflow'
    }).append(
        $('<a>', {
            href: new mw.Uri().extend({
                showads: 1
            }).toString(),
            text: 'Show ads'
        })
    ).appendTo(".toolbar > .tools");
});