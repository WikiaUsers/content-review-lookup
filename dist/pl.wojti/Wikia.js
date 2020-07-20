function randomBg() {
    var imgs = [
        "https://vignette.wikia.nocookie.net/wojti/images/4/47/Tlo1.JPG/revision/latest?cb=20190424173858&path-prefix=pl",
        "https://vignette.wikia.nocookie.net/wojti/images/f/f1/Tlo2.JPG/revision/latest?cb=20190424173911&path-prefix=pl",
        "https://vignette.wikia.nocookie.net/wojti/images/b/b5/Tlo3.JPG/revision/latest?cb=20190424173923&path-prefix=pl",
        "https://vignette.wikia.nocookie.net/wojti/images/0/06/Tlo4.JPG/revision/latest?cb=20190424173934&path-prefix=pl",
        "https://vignette.wikia.nocookie.net/wojti/images/5/5b/Tlo5.jpg/revision/latest?cb=20190424173951&path-prefix=pl",
    ];
 
    $("body").css("background-size", "cover");
    $("body").css("background-image", "url(" + imgs[Math.floor((imgs.length) * Math.random())] + ")");
}
 
$(randomBg);