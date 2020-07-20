$(function() {
    if (window.PlusOneButtonLoaded) {
        return;
    }
    window.PlusOneButtonLoaded = true;
    importScriptURI('https://apis.google.com/js/platform.js');
    $('#PowerShareMenu').append(
        $('<span>', {
            css: {
                backgroundColor: 'black',
                border: '0.25em solid #FFFF00 #0000FF #FF0000 #00FF00',
                display: 'inline-block',
                padding: '0.5em',
                verticalAlign: 'top'
            },
            id: 'googlePlusButton'
        }).append(
            $('<div>', {
                'class': 'g-plusone',
                'data-size': 'tall'
            })
        )
    );
});