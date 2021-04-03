/* Random Page Background (updated by Apologet) */
function randomBg() {
    var imgs = [
        "https://vignette.wikia.nocookie.net/stalker/images/6/67/Stalker2_art_3_uhd.jpg/revision/latest/scale-to-width-down/1800?cb=20200724084425&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/4/42/Stalker2_art_2_uhd.jpg/revision/latest/scale-to-width-down/1800?cb=20200724084358&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/0/0d/Screenshot_full_4.png/revision/latest/scale-to-width-down/1800?cb=20200724084145&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/d/d8/Screenshot_full_2.png/revision/latest/scale-to-width-down/1800?cb=20200724084117&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/7/7b/Screenshot_full_1.png/revision/latest/scale-to-width-down/1800?cb=20200724082411&path-prefix=ru"
    ];

    $("body").css("background-size", "cover");
    $("body").css("background-image", "url(" + imgs[Math.floor((imgs.length) * Math.random())] + ")");
}
 
$(randomBg);