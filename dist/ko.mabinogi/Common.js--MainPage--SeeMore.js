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

  var MAX_SIZE = 30;
  var SIZE_AT_ADDITION = 6;
  var CARD_TEMPLATE =
    '\
<li {{#is-empty}}class="대문--카드--empty"{{/is-empty}}>\
<div class="대문--카드--미리보기">{{{content}}}</div>\
<div class="대문--카드--링크">\
  <a href="{{href}}" title="{{title}}">{{title}}</a>\
</div>\
</li>\
';

  var api;
  var articlePath;
  var cardTemplate;

  function renderCardTemplate(title, content, href) {
    return cardTemplate.render({
      title: title,
      content: content,
      href: href
    })[0];
  }

  function main() {
    api = new mw.Api();
    articlePath = mw.config.get('wgArticlePath');
    cardTemplate = mw.template.compile(CARD_TEMPLATE, 'mustache');

    replaceDummyCards(
      [].slice.call(document.querySelector('.대문--카드들').children)
    );
    var addMoreCardsButton = mw.template
      .compile(
        '<div style="text-align: center" >\
          <a style="font-size: 2em;">더 보기</a>\
        </div>',
        'html'
      )
      .render()[0];
    addMoreCardsButton.addEventListener('click', function (e) {
      loadMoreCards(SIZE_AT_ADDITION);
    });
    // Insert the button after the cards
    cards.parentNode.insertBefore(addMoreCardsButton, cards.nextSibling);
  }

  function replaceDummyCards(cards) {
    console.log('There are ' + cards.length + ' dummy cards');
    getRandoms(cards.length).done(function (data) {
      var randoms = data.query.random;
      for (var r in randoms) {
        parseAndReplace(randoms[r].id, cards[r]);
      }
    });
  }

  function loadMoreCards(num) {
    console.log('loadMoreCards', num);
    getRandoms(num).done(function (data) {
      var randoms = data.query.random;
      for (var r in randoms) {
        addCard(randoms[r]);
      }
    });
  }

  function addCard(random) {
    var dummyCard = cardTemplate.render({ 'is-empty': true })[0];
    cards.append(dummyCard);

    // Remove the cards from the front of the list if there are more than 30
    while (cards.children.length > MAX_SIZE) {
      cards.removeChild(cards.firstChild);
    }

    parseAndReplace(random.id, dummyCard);
  }

  function parseAndReplace(articleId, dummy) {
    api
      .get({
        action: 'parse',
        pageid: articleId,
        section: 0,
        utf8: 1
      })
      .done(function (data) {
        var card = renderCardTemplate(
          data.parse.title,
          data.parse.text['*'],
          articlePath.replace('$1', data.parse.title)
        );
        dummy.replaceWith(card);
      });
  }

  function getRandoms(num) {
    return api.get({
      action: 'query',
      list: 'random',
      rnnamespace: 0,
      rnlimit: num
    });
  }

  mw.loader.using('mediawiki.template.mustache').then(function () {
    main();
  });
})();