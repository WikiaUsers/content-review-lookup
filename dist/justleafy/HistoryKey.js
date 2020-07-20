//HistoryKey
$('body').off('keydown.gks');
$('body').on('keydown.gks', function (e) {
    if (e.key !== 'h') return;
    switch (document.activeElement.tagName) {
        case 'INPUT':
        case 'TEXTAREA':
            return;        
    }
            location.replace(mw.util.getUrl(mw.config.get('wgPageName'), {action: 'history'}));
});