body.mediawiki {
    background: url('http://vignette1.wikia.nocookie.net/eve-no-jikan/images/5/51/Wiki-background.png/revision/latest?cb=20150509212140') !important;
    background-attachment: fixed !important;
    background-size: cover !important;
}

// Randomizing wiki logo. Thanks, Vocaloid Wiki! ^_^
$(function() {
    var images = [
      'http://vignette4.wikia.nocookie.net/kccreations/images/4/4b/Wiki-wordmark-1.png',
      'http://vignette1.wikia.nocookie.net/kccreations/images/2/2f/Wiki-wordmark-2.png',
      'http://vignette1.wikia.nocookie.net/kccreations/images/e/ec/Wiki-wordmark-3.png',
    ];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});

// Going off of the wordmark randomization, let's see if we can randomize the BACKGROUND!

$(function() {
    var images = [
      'http://vignette3.wikia.nocookie.net/__cb20150322222839/kccreations/images/0/08/Wiki-background-maximum1.jpeg',
      'http://vignette3.wikia.nocookie.net/__cb20120518084030/themaximumride/images/5/50/Wiki-background',
    ];

    $('body background-image').attr('src', images[Math.floor(Math.random() * images.length)]);
});