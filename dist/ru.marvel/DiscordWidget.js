"use strict";

var WidgetBot = document.createElement('script');
WidgetBot.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3');
WidgetBot.setAttribute('async', true);
WidgetBot.setAttribute('defer', true);
WidgetBot.onload = function () {
  return new Crate({
    server: '277509745080926220',
    channel: '459382827440537603'
    glyph: ['https://static.wikia.nocookie.net/marvel/images/c/cc/VenomDiscLogo.gif/revision/latest/scale-to-width-down/200?cb=20210120172230&path-prefix=ru', '100%']
  });
};
document.body.appendChild(WidgetBot);