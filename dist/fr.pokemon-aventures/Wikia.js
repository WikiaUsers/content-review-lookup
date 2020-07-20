// Random Page Background
// Author: Dim@s535
 
function randomBg() {
    var imgs = [
        'https://vignette.wikia.nocookie.net/pokemon-aventures/images/0/02/Thumb-1920-592678.jpg/revision/latest?cb=20180713090830&path-prefix=fr',
        'https://vignette.wikia.nocookie.net/pokemon-aventures/images/5/55/Wp1878331.jpg/revision/latest?cb=20180712102254&path-prefix=fr',
        'https://vignette.wikia.nocookie.net/pokemon-aventures/images/f/fa/Most-heroic-pokemon.jpg.jpg/revision/latest?cb=20180712102434&path-prefix=fr',
    ];
 
    $('body').css('background-size', 'cover'); 
    $('body').css('background-image', 'url(' + imgs[Math.floor((imgs.length) * Math.random())] + ')');
}
 
randomBg();