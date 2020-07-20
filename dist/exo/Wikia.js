// Randomize wiki logo Thread578801, credit to VOCALOID Wiki and Community Central
$(function() {
    var images = [
      'https://images.wikia.nocookie.net/thelostplanet/images/0/0e/Wiki-wordmark-baekhyun.png',
      'https://images.wikia.nocookie.net/thelostplanet/images/d/d0/Wiki-wordmark-chanyeol.png',
      'https://images.wikia.nocookie.net/thelostplanet/images/d/d0/Wiki-wordmark-chen.png',
      'https://images.wikia.nocookie.net/thelostplanet/images/e/ef/Wiki-wordmark-d.o.png',
      'https://images.wikia.nocookie.net/thelostplanet/images/a/a5/Wiki-wordmark-kai.png',
      'https://images.wikia.nocookie.net/thelostplanet/images/f/fb/Wiki-wordmark-kris.png',
      'https://images.wikia.nocookie.net/thelostplanet/images/a/a7/Wiki-wordmark-lay.png',
      'https://images.wikia.nocookie.net/thelostplanet/images/9/90/Wiki-wordmark-luhan.png',
      'https://images.wikia.nocookie.net/thelostplanet/images/b/b9/Wiki-wordmark-sehun.png',
      'https://images.wikia.nocookie.net/thelostplanet/images/e/ed/Wiki-wordmark-suho.png',
      'https://images.wikia.nocookie.net/thelostplanet/images/0/0c/Wiki-wordmark-tao.png',
      'https://images.wikia.nocookie.net/thelostplanet/images/2/2d/Wiki-wordmark-xiumin.png'
    ];
 
    $('h1.wordmark a img').attr({'src':images[Math.floor(Math.random() * images.length)], 'width':'250', 'height':'65'});
});

/*</nowiki></pre>*/