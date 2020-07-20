$(function() {
    var images = [
      'https://images.wikia.nocookie.net/__cb20140720052934/conradho/es/images/8/89/Wiki-wordmark.png',
      'https://images.wikia.nocookie.net/__cb20140720053621/conradho/es/images/4/49/Wiki-wordmark2.png',
      'https://images.wikia.nocookie.net/__cb20140720054449/conradho/es/images/5/5b/Wiki-Wordmark3.png',
      'https://images.wikia.nocookie.net/__cb20140720064811/conradho/es/images/4/44/Wiki-wordmark4.png',
    ];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});