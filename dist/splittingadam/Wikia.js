// Randomize wiki logo
$(function() {
    var images = [
   'https://vignette.wikia.nocookie.net/splittingadam/images/0/09/Adam-Wordmark.png/revision/latest?cb=20150402225024',
  'https://vignette.wikia.nocookie.net/splittingadam/images/e/e8/Adam_-2-Wordmark.png/revision/latest?cb=20150402225259',
 'https://vignette.wikia.nocookie.net/splittingadam/images/1/1f/Winston-Wordmark.png/revision/latest?cb=20150402225509',
 'https://vignette.wikia.nocookie.net/splittingadam/images/8/82/Party_Boy-Wordmark.png/revision/latest?cb=20150402230016',
 'https://vignette.wikia.nocookie.net/splittingadam/images/a/af/Sensitive-Wordmark.png/revision/latest?cb=20150402230224',
 'https://vignette.wikia.nocookie.net/splittingadam/images/8/8b/Perfect-Wordmark.png/revision/latest?cb=20150402230809',
    ];
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
    });