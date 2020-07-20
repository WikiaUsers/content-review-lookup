// Wordmark replacer, uses 750x195 wordmark, since the wordmark will lose some of its elements (mostly outlines and glows) on 250x65.
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.indexOf('https://vignette.wikia.nocookie.net/pokepediabr/images/8/89/Wiki-wordmark.png/revision/latest?cb=20160210054103&path-prefix=pt-br') !== -1) {
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/pokepediabr/images/8/89/Wiki-wordmark.png/revision/latest?cb=20160210054103&path-prefix=pt-br", "https://vignette.wikia.nocookie.net/orphonbone/images/0/07/Feel.png/revision/latest?cb=20160917203116");
        }
    }
}