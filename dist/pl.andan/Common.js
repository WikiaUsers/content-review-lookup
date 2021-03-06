/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

$(function () {
  var bgs1 = [
    'https://vignette.wikia.nocookie.net/anuria/pl/images/1/1b/Tapeta-hiacyntowce-pod-drzewami-w-slonecznym-lesie-hallerbos.jpg',
    'link'
  ];
  var bgs2 = [
    'https://vignette.wikia.nocookie.net/anuria/pl//images/9/9a/Tapeta-pelnia-ksiezyca-nad-lasem.jpg',
    'link'
  ];

  var d = new Date();
  if (d.getHours() > 6 && d.getHours() < 18) {
    $('body').css('background-image', 'url(' + bgs1[Math.floor(Math.random() * bgs1.length)] + ')');
  } else {
    $('body').css('background-image', 'url(' + bgs2[Math.floor(Math.random() * bgs2.length)] + ')');
  }
});

/*YoutubePlayer*/
importArticles({
  type: 'script',
  articles: [
    'u:dev:YoutubePlayer/code.js',
    'u:c:MediaWiki:Snow.js'
  ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:NewImages.js',
    ]
});