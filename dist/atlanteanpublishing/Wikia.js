$(function() {
    var images = [
      'https://images.wikia.nocookie.net/__cb20130927170141/atlanteanpublishing/images/8/89/Wiki-wordmark.png',
      'https://images.wikia.nocookie.net/__cb20130927165853/atlanteanpublishing/images/archive/8/89/20130927170138!Wiki-wordmark.png'
    ];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});