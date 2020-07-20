/* Random Page Background (updated by Apologet) */
function randomBg() {
    var imgs = [
        "https://vignette.wikia.nocookie.net/stalker/images/4/48/%D0%9F%D1%80%D0%B5%D0%B4%D1%80%D0%B0%D1%81%D1%81%D0%B2%D0%B5%D1%82%D0%BD%D0%B0%D1%8F_%D0%BC%D0%B3%D0%BB%D0%B0.jpg/revision/latest?cb=20190920114814&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/3/34/FRAER_%D0%9B%D0%A1_%D0%9E%D0%B3%D0%BE%D0%BD%D1%8C_%D0%B8_%D1%85%D0%B8%D0%BC%D0%B8%D1%8F.jpg/revision/latest?cb=20190922192150&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/8/84/%C2%AB%D0%AE%D0%BF%D0%B8%D1%82%D0%B5%D1%80%C2%BB_%D1%81_%D0%B2%D1%8B%D1%81%D0%BE%D1%82%D1%8B_%D0%BF%D1%82%D0%B8%D1%87%D1%8C%D0%B5%D0%B3%D0%BE_%D0%BF%D0%BE%D0%BB%D1%91%D1%82%D0%B0._%D0%9F%D0%B5%D0%B9%D0%B7%D0%B0%D0%B6%D0%B8.jpg/revision/latest?cb=20190925131244&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/4/42/FRAER_%D0%9B%D0%A1_%D0%9F%D1%80%D0%B8%D0%B5%D1%85%D0%B0%D0%BB%D0%B8.jpg/revision/latest?cb=20190922192150&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/9/96/%D0%92%D1%8B%D1%81%D0%BE%D0%BA%D0%BE%D0%B5_%D0%BD%D0%B0%D0%BF%D1%80%D1%8F%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5....png/revision/latest?cb=20190920114621&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/c/ce/Ss_user_09-23-19_21-50-15_%28zaton%29.jpg/revision/latest?cb=20190924122412&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/9/9e/FRAER_%D0%9B%D0%A1_%D0%A1%D0%BD%D0%B0%D0%B9%D0%BF%D0%B5%D1%80.jpg/revision/latest?cb=20190922192149&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/4/4f/%D0%A2%D0%B0%D0%B9%D0%BD%D1%8B%D0%B9_%D0%BB%D0%B0%D0%B3%D0%B5%D1%80%D1%8C.png/revision/latest?cb=20190920115121&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/d/db/TBS-Orrin-Original-StalkerLife-3.png/revision/latest?cb=20190921065645&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/1/12/TBS-Orrin-Original-StalkerLife-2.png/revision/latest?cb=20190921065644&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/6/61/%D0%92%D0%B0%D0%BB%D0%B5%D1%82%D0%9B%D0%A1.jpg/revision/latest?cb=20190921070640&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/5/51/FRAER_%D0%9B%D0%A1_%D0%A1%D1%82%D1%80%D0%B0%D0%B6%D0%B8.jpg/revision/latest?cb=20190922192148&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/2/26/FRAER_%D0%9B%D0%A1_%D0%9E%D0%B3%D0%BD%D0%B8%D1%89%D0%B5.jpg/revision/latest?cb=20190922192151&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/1/19/FRAER_%D0%9B%D0%A1_%D0%9A%D0%B0%D0%B1%D0%B8%D0%BD%D0%B0.jpg/revision/latest?cb=20190922192152&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/8/85/TBS-Orrin-Original-Other-1.png/revision/latest?cb=20190921065643&format=original&path-prefix=ru",
        "https://vignette.wikia.nocookie.net/stalker/images/9/9d/%D0%92%D0%B5%D1%87%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%BA%D0%B0._%D0%9F%D1%80%D0%BE%D1%87%D0%B5%D0%B5.jpg/revision/latest?cb=20190925131248&format=original&path-prefix=ru"
    ];

    $("body").css("background-size", "cover");
    $("body").css("background-image", "url(" + imgs[Math.floor((imgs.length) * Math.random())] + ")");
}
 
$(randomBg);