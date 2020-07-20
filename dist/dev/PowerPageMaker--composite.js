function PowerPageMakerIntegration(newPagePhrase){
    var link = newPagePhrase.replace(' ', '_'),
        url = mw.util.getUrl(link);
    $('#p-search').append(
        $('<a>', {
            href: url
        }).append(
            $('<button>', {
                id: 'newpagebutton',
                css: {
                    height: '2em',
                    width: '10em',
                    'font-weight': 700,
                    text: newPagePhrase
                }
            })
        )
    );
    $('.createpage').click(function() {
        setTimeout(function () {
            window.location.replace(url);
        }, 450);
    });
}