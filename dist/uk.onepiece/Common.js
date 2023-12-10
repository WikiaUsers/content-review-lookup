/* Підключення сторінок */
importArticles({
    type: 'script',
    articles: [
        'u:fallout:MediaWiki:Gadget-InterlanguageChecker.js', // IWChecker
    ]
});

var WidgetBot = document.createElement('script');
WidgetBot.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3');
WidgetBot.setAttribute('async', true);
WidgetBot.setAttribute('defer', true);
WidgetBot.onload = function () {
  return new Crate({
    server: '1182625120846618654',
    channel: '1182625947950780517',
    // glyph: ['https://static.wikia.nocookie.net/marvel/images/c/cc/VenomDiscLogo.gif/revision/latest/scale-to-width-down/200?cb=20210120172230&path-prefix=ru', '100%']
  });
};
document.body.appendChild(WidgetBot);