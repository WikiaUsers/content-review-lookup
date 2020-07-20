$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$=":%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80_III"]').length;
}).next().css({
    background: "rgba(216, 185, 88, 0.85) url('https://img2.wikia.nocookie.net/__cb20140625215453/lotrminecraftmod/images/0/03/Admin1_120.png') bottom center no-repeat",
    padding: '10px',
    border: "6px double #DC143C"
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$=":Danvintius_Bookix"]').length;
}).next().css({
    background: "rgba(216, 185, 88, 0.85) url('https://img2.wikia.nocookie.net/__cb20140625215453/lotrminecraftmod/images/0/03/Admin1_120.png') bottom center no-repeat",
    padding: '10px',
    border: "6px double #DC143C"
});

$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href$=":Tabulika"]').length;
}).next().css({
    background: "rgba(223, 219, 195, 1) url('https://img2.wikia.nocookie.net/__cb20200516143604/gotminecraftmod/ru/images/0/03/Admin1_120.png') bottom center no-repeat",
    padding: '10px',
    border: "6px double #333975"
});