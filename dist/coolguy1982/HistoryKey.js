//HistoryKey
//By Coolguy1982
$('body').off('keydown.gks');
$('body').on('keydown.gks', function (e) {
    if (e.key !== 'h') return;
    switch (document.activeElement.tagName) {
        case 'INPUT':
        case 'TEXTAREA':
        case 'DIV': // UCP editor - might be better to check for body class .action-edit
            return;        
    }
            location.replace(mw.util.getUrl(mw.config.get('wgPageName'), {action: 'history'}));
});