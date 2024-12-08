window.DisplayClockJS = {
    format: '%2I:%2M:%2S %p %2d.%m.%Y (MSK)',
    hoverText: 'Московское время',
    interval: 200, /* Частота обновления таймера в милисекундах(1000=1 секунда) */
    location: 'header',
    monofonts: 'Consolas, monospace',
    offset: 180 /* меняет время в минутах - 180 меняет с Гринвича на МСК (Московское время) */
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});