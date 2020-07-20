(function() {
    mw.loader.load('https://assets.pinterest.com/js/pinit.js');
    $('#PowerShareMenu').append(
        $('<span>', {
            id: 'PinterestModule',
            css: {
                backgroundColor: 'black',
                border: '0.25em solid aqua',
                display: 'inline-block',
                height: '2.75em',
                padding: '0.5em',
                paddingTop: '3.5em',
                width: '5.25em'
            }
        }).append(
            $('<a>', {
                'data-pin-color': 'red',
                'data-pin-config': 'above',
                'data-pin-do': 'buttonPin',
                'data-pin-height': '28',
                href: new mw.Uri('https://www.pinterest.com/pin/create/button').extend({
                    description: document.title,
                    media: 'https://images.wikia.nocookie.net/central/images/b/bc/Fandom_logo.png',
                    url: document.URL
                }).toString()
            }).append(
                $('<img>', {
                    src: 'https://assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_28.png'
                })
            )
        )
    );
})();