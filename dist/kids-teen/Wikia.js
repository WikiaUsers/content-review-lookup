/* Extended Wiki Navigation */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});
// Randomize wiki logo - from http://frozen.wikia.com and credit to them!
$(function() {
    var images = [
      'https://images.wikia.nocookie.net/__cb20141010075934/kids-teen/images/7/73/Wordmark_Elsa.png',
      'https://images.wikia.nocookie.net/__cb20141010075934/kids-teen/images/1/16/Wordmark_Spongebob.png',
      'https://images.wikia.nocookie.net/__cb20141010075933/kids-teen/images/7/70/Wordmark_Carly.png',
      'https://images.wikia.nocookie.net/__cb20141010080816/kids-teen/images/8/89/Wiki-wordmark.png',
      'https://images.wikia.nocookie.net/__cb20141010075933/kids-teen/images/c/cd/Wordmark_Austin.png',
        ];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});