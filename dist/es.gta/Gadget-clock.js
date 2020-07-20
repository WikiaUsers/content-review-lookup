// Display 24 hour time 
window.DisplayClockJS = {
    format: '%2H:%2M:%2S (UTC) %d %2b %Y',
    location: 'header',
    hoverText: 'Haz clic aquí para actualizar la página.',
    interval: 500, /* How often the timer updates in milliseconds (1000=1 second) */
    monofonts: 'Trebuchet MS, Arial', /* The font the clock uses by default */
};

importArticle({
    type:'script',
    article:'w:c:dev:UTCClock/code.js'
});