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
    channel: '1182626012249456650',
    // glyph: ['https://static.wikia.nocookie.net/marvel/images/c/cc/VenomDiscLogo.gif/revision/latest/scale-to-width-down/200?cb=20210120172230&path-prefix=ru', '100%']
  });
};
document.body.appendChild(WidgetBot);

/*Временной фон*/
$(document).ready(function() {
    var d = new Date();
    if (d.getHours() < 2) {
        document.body.className += ' BG1';
    } else if (d.getHours() < 4) {
        document.body.className += ' BG2';
    } else if (d.getHours() < 6) {
        document.body.className += ' BG3';
    } else if (d.getHours() < 8) {
        document.body.className += ' BG4';
    } else if (d.getHours() < 10) {
        document.body.className += ' BG5';
    } else if (d.getHours() < 12) {
        document.body.className += ' BG6';
    } else if (d.getHours() < 14) {
        document.body.className += ' BG7';
    } else if (d.getHours() < 16) {
        document.body.className += ' BG8';
    } else if (d.getHours() < 18) {
        document.body.className += ' BG9';
    } else if (d.getHours() < 20) {
        document.body.className += ' BG10';
    } else if (d.getHours() < 22) {
        document.body.className += ' BG11';
    } else if (d.getHours() < 24) {
        document.body.className += ' BG12';
    }
});