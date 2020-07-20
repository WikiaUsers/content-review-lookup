// Random Page Background
// Author: Dim@s535
 
function randomBg() {
    var imgs = [
        'https://vignette.wikia.nocookie.net/sensate/images/4/41/BG-Berlin1.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/d/db/BG-Berlin2.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/5/51/BG-Chicag1.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/9/9a/BG-Chicag2.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/d/d9/BG-Coreas1.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/5/55/BG-Coreas2.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/2/28/BG-Island1.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/0/00/BG-Island2.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/a/ae/BG-Londre1.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/6/61/BG-Londre2.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/2/27/BG-Mexico1.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/9/93/BG-Mexico2.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/e/e8/BG-Mumbai1.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/e/ea/BG-Mumbai2.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/2/28/BG-Nairob1.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/2/25/BG-Nairob2.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/b/bc/BG-Sanfra1.jpg/revision/latest?path-prefix=es',
        'https://vignette.wikia.nocookie.net/sensate/images/7/75/BG-Sanfra2.jpg/revision/latest?path-prefix=es'
    ];
 
    $('body').css('background-size', 'cover'); 
    $('body').css('background-image', 'url(' + imgs[Math.floor((imgs.length) * Math.random())] + ')');
}
 
randomBg();