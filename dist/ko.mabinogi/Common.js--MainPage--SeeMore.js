// <nowiki>
// This appends the 'See More' button in the list of posts on the main page.

(function () {
  if (!mw.config.get('wgIsMainPage')) {
    return;
  }
  var cards = document.querySelector('.대문--카드들');
  if (!cards) {
    return;
  }

  mw.loader.using('mediawiki.template.mustache').then(function () {
    var CARD_TEMPLATE =
        '\
<li {{#is-empty}}class="대문--카드--empty"{{/is-empty}}>\
  <div class="대문--카드--미리보기">{{{content}}}</div>\
  <div class="대문--카드--링크">\
    <a href="{{href}}" title="{{title}}">{{title}}</a>\
  </div>\
</li>\
',
      cardTemplate = mw.template.compile(CARD_TEMPLATE, 'mustache');

    var api = new mw.Api();
    var articlePath = mw.config.get('wgArticlePath');

    function addCard(random) {
      var dummyCard = cardTemplate.render({ 'is-empty': true })[0];
      cards.append(dummyCard);

      // Remove the cards from the front of the list if there are more than 30
      while (cards.children.length > 30) {
        cards.removeChild(cards.firstChild);
      }

      api
        .get({
          action: 'parse',
          pageid: random.id,
          section: 0,
          utf8: 1
        })
        .done(function (data) {
          var card = cardTemplate.render({
            content: data.parse.text['*'],
            href: articlePath.replace('$1', data.parse.title),
            title: data.parse.title
          })[0];
          // cards.replaceChild(card, dummyCard);
          dummyCard.replaceWith(card);
        });
    }

    function moreCards(num) {
      num = num || 6;
      console.log('moreCards', num);
      api
        .get({
          action: 'query',
          list: 'random',
          rnnamespace: 0,
          rnlimit: '' + num
        })
        .done(function (data) {
          var randoms = data.query.random;
          for (var r in randoms) {
            addCard(randoms[r]);
          }
        });
    }

    moreCards(15);
    var addMoreCardsButton = mw.template
      .compile(
        '<div style="text-align: center" >\
      <a style="font-size: 2em;">더 보기</a>\
    </div>',
        'html'
      )
      .render()[0];
    addMoreCardsButton.addEventListener('click', function (e) {
      moreCards(6);
    });
    // Insert the button after the cards
    cards.parentNode.insertBefore(addMoreCardsButton, cards.nextSibling);
  });
})();