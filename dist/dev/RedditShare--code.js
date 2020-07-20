$('#PowerShareMenu').ready(function() {
    $('#PowerShareMenu').append(
        $('<span>', {
            id: 'RedditBox'
        }).append(
            $('<a>', {
                href: 'https://www.reddit.com/submit?url=' + encodeURIComponent(window.location),
                target: '_blank'
            }).append(
                $('<img>', {
                    src: 'https://www.redditstatic.com/about/assets/reddit-alien.png',
                    alt: 'submit to reddit',
                    css: {
                        'border-color': '#DDDDDD #FF1111 #DDDDDD #FF1111',
                        'border-width': '0.2em',
                        'border-style': 'solid',
                        display: 'inline-block',
                        height: '64pt',
                        padding: '2pt',
                        'vertical-align': 'top'
                    }
                })
            )
        )
    );
});