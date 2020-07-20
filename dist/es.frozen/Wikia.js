/*---------------------- Framekiller ----------------------------------*/

if (parent.frames.length > 0) { 
    var file = document.referrer.match(/imgurl=(.*?)&/);
    if ( file.length > 0 ){
        top.location.href =  document.location.href + '?file=' + file[1].split('/').pop();
    } else {
        top.location.href =  document.location.href;
    }
}

/*--------------------------------------------------------------------*/

// Randomize wiki logo
$(function() {
    var images = [
      'https://images.wikia.nocookie.net/__cb20140328012816/frozen/images/5/54/D.png',
      'https://images.wikia.nocookie.net/__cb20140328012852/frozen/images/8/8b/D2.png',
      'https://images.wikia.nocookie.net/__cb20140328013017/frozen/images/6/69/D3.png',
      'https://images.wikia.nocookie.net/__cb20140328013030/frozen/images/9/91/D4.png',
      'https://images.wikia.nocookie.net/__cb20140328013044/frozen/images/a/af/D5.png',
      'https://images.wikia.nocookie.net/__cb20140328013056/frozen/images/8/88/D6.png',
      'https://images.wikia.nocookie.net/__cb20140328013108/frozen/images/8/85/D7.png',
      'https://images.wikia.nocookie.net/__cb20140401003130/frozen/images/4/44/D8.png'
    ];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});

/*--------------------------------------------------------------------*/