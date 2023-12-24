/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */

// nkch_gst_gadgets = [{
//     name: "RWA", // назва гаджета
//     title: "Нещодавня активність", // Назва у меню
//     description: "Оформлення для свіжих редагувань, соц. активності, сторінки исторії" // Опис гаджета у меню при наведенні
// }, {
//     name: "UWStyle",
//     title: "Єдиний стиль вікі",
//     description: "Загальне оформлення вікі-проєктів"
// }
// ];

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