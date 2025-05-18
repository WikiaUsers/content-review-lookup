$(function () {
  var cardBackURL = "https://static.wikia.nocookie.net/kpop-academy/images/a/a4/Card-back.png/revision/latest?cb=20250113175309&format=original";

  var cardNames = [
    'Sparkpc1.png', 'Sparkpc2.png', 'Sparkpc3.png',
    'Berrypc1.png', 'Berrypc2.png', 'Berrypc3.png',
    'Kieranpc1.png', 'Kieranpc2.png', 'Kieranpc3.png',
    'Axlpc1.png', 'Axlpc2.png', 'Axlpc3.png',
    'Tristanpc1.png', 'Tristanpc2.png', 'Tristanpc3.png',
    'Mintpc1.png', 'Mintpc2.png', 'Mintpc3.png',
    'Fire Kpc1.png', 'Fire Kpc2.png', 'Fire Kpc3.png',
    'Leopc1.png', 'Leopc2.png', 'Leopc3.png',
    'Dantepc1.png', 'Dantepc2.png', 'Dantepc3.png',
    'Markpc1.png', 'Markpc2.png', 'Markpc3.png',
    'Janpc1.png', 'Janpc2.png', 'Janpc3.png',
    'Sai Lorepc1.png', 'Sai Lorepc2.png', 'Sai Lorepc3.png',
    'Myaepc1.png', 'Myaepc2.png', 'Myaepc3.png',
    'Elipc1.png', 'Elipc2.png', 'Elipc3.png',
    'Hazepc1.png', 'Hazepc2.png', 'Hazepc3.png',
    'Jessepc1.png', 'Jessepc2.png', 'Jessepc3.png',
    "Ken'tpc1.png", "Ken'tpc2.png", "Ken'tpc3.png",
    'RyLeepc1.png', 'RyLeepc2.png', 'RyLeepc3.png',
    'Orpheuspc1.png', 'Orpheuspc2.png', 'Orpheuspc3.png',
    'Greenpc1.png', 'Greenpc2.png', 'Greenpc3.png',
    'Hoshi Boshipc1.png', 'Hoshi Boshipc2.png', 'Hoshi Boshipc3.png',
    'Joxesterpc1.png', 'Joxesterpc2.png', 'Joxesterpc3.png',
    'Dunkpc1.png', 'Dunkpc2.png', 'Dunkpc3.png',
    'Moon Songpc1.png', 'Moon Songpc2.png', 'Moon Songpc3.png'
  ];

  var imageMap = {};
  var currentIndex = 0;
  var clickCount = 0;

  function fetchImageURL(fileName) {
    return $.getJSON("https://kpop-academy.fandom.com/api.php", {
      action: "query",
      titles: "File:" + fileName,
      prop: "imageinfo",
      iiprop: "url",
      format: "json",
      origin: "*"
    }).then(function (data) {
      var pages = data.query.pages;
      for (var key in pages) {
        if (pages[key].imageinfo) {
          return {
            name: fileName.replace('.png', ''),
            url: pages[key].imageinfo[0].url
          };
        }
      }
      return null;
    });
  }

  // Inject card-back image into the card-front
  $('.card-front').html('<img src="' + cardBackURL + '" alt="Card Back" style="width:100%; height:100%; border-radius:18px;" />');

  Promise.all(cardNames.map(fetchImageURL)).then(function (results) {
    results.forEach(function (card) {
      if (card) {
        imageMap[card.name] = card.url;
      }
    });

    $('#gacha-button').prop('disabled', false).text('🎲 Pull a Card!');
  });

  $('#gacha-button').click(function () {
  clickCount++;
  var keys = cardNames.map(name => name.replace('.png', ''));

  // Pick a random index from the keys array
  var randomIndex = Math.floor(Math.random() * keys.length);
  var randomKey = keys[randomIndex];

  if (clickCount === 1) {
    $('#gacha-result').html(
      '<img src="' + imageMap[randomKey] + '" alt="' + randomKey + '" style="width:100%; height:100%; border-radius:18px;" />' +
      '<p>You pulled: <strong>' + randomKey + '!</strong></p>'
    );
    $('.card-inner').css('transform', 'rotateY(180deg)');
  } else {
    $('.card-inner').css('transform', 'rotateY(0deg)');
    setTimeout(function () {
      $('#gacha-result').html(
        '<img src="' + imageMap[randomKey] + '" alt="' + randomKey + '" style="width:100%; height:100%; border-radius:18px;" />' +
        '<p>You pulled: <strong>' + randomKey + '!</strong></p>'
      );
      $('.card-inner').css('transform', 'rotateY(180deg)');
    }, 600);
  }
});
});