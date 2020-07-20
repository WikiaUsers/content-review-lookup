$(function() {
    if (window.LinkedinSupportLoaded) {
        return;
    }
    window.LinkedinSupportLoaded = true;
    importScriptURI('https://platform.linkedin.com/in.js');
    $('#PowerShareMenu').append( 
        $('<span>', {
            css: {
                backgroundColor: 'black',
                border: '0.2em solid #DDDDDD',
                display: 'inline-block',
                padding: '0.2em',
                verticalAlign: 'top'
            }
        }).append(
            $('<script>', {
                'data-counter': 'top',
                type: 'IN/Share'
            })
        )
    );
});