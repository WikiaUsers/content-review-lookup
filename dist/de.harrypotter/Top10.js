if(mw.config.get('wgNamespaceNumber') == 700) {
    pageExists('Top 10-Liste Info:' + mw.config.get('wgPageName').split(':')[1], function () {
        $.get('/api.php?action=parse&page=' + 'Top 10-Liste Info:' + mw.config.get('wgPageName').split(':')[1] + '&format=json', function(data) {
            mw.util.$content.append($('<div />').addClass('infotext').html(data.parse.text['*']).get(0));
        });
    });   
}