/* Randomize wiki logo*/
$(function() {
    var images = [
'https://vignette.wikia.nocookie.net/ginandhotaru/images/1/18/Hotarubi_winter_logo.png/revision/latest?cb=20141203152550',
'https://vignette.wikia.nocookie.net/ginandhotaru/images/9/98/Hotarubi_winter_logo2.png/revision/latest?cb=20141203152551',
'https://vignette.wikia.nocookie.net/ginandhotaru/images/8/89/Wiki-wordmark.png/revision/latest?cb=20141114085607'
];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});
 
/* Ends randomized wiki logo */