$(function() {
    if (window.TumblrShareLoaded) {
        return;
    }
    window.TumblrShareLoaded = true;
    $('#PowerShareMenu').append(
        $('<span>', {
            css: {
                backgroundColor: 'black',
                border: '0.25em solid #FF00FF',
                display: 'inline-block',
                padding: '0.25em',
                verticalAlign: 'top'
            },
            id: 'tumbonerButton'
        }).append(
            $('<a>', {
                'class': 'tumblr-share-button',
                'data-caption': document.title,
                'data-color': 'white',
                'data-notes': 'top',
                'data-posttype': 'link',
                'data-title': document.title,
                href: 'https://embed.tumblr.com/share',
                id: 'tumblrShareButton1'
            })
        )
    );
    importScriptURI('https://secure.assets.tumblr.com/share-button.js');
});