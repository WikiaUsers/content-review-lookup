// Konfigurasi UTCClock untuk WIB
window.DisplayClockJS = {
    format: '%d %B %Y, %H:%M:%S WIB', // Menambahkan teks WIB di ujung format
    offset: 420,                      // Menggeser waktu ke UTC+7 (420 menit)
    location: 'header',               // Posisi di header atas wiki
    interval: 500                     // Kecepatan update jam (500 ms)
};

// Proses impor skrip dari Fandom Developer Wiki
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UTCClock.js'
    ]
});