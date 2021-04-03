/* Случайный выбор фона (updated by Apologet) */
function randomBg() {
    var imgs = [
        "https://vignette.wikia.nocookie.net/spore/images/5/50/Wiki-background/revision/latest?cb=20200401160852&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/spore/images/5/50/Wiki-background/revision/20200327115909?path-prefix=ru",
        "https://vignette.wikia.nocookie.net/spore/images/6/65/Фон_Portal.jpg/revision/latest?cb=20200618191455&format=original&path-prefix=ru"
    ];
 
    $("body").css("background-size", "cover");
    $("body").css("background-image", "url(" + imgs[Math.floor((imgs.length) * Math.random())] + ")");
}
 
$(randomBg);