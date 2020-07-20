//sets background by local time
//t: hour, img: img path
(function ($) {
    var image,
        hour = (new Date()).getHours(),
        images = [
            {t: 5, img: 'https://vignette.wikia.nocookie.net/borderlands/images/b/bd/Image00040.dawn.jpg/revision/latest?cb=20180117130954&path-prefix=ru'},
            {t: 7, img: 'https://vignette.wikia.nocookie.net/borderlands/images/3/31/Image00053.morning.jpg/revision/latest?cb=20180117130955&path-prefix=ru'},
            {t: 9, img: 'https://vignette.wikia.nocookie.net/borderlands/images/e/e8/Image00120.noon.jpg/revision/latest?cb=20180117130955&path-prefix=ru'},
            {t: 13, img: 'https://vignette.wikia.nocookie.net/borderlands/images/a/a8/Image00169.afternoon.jpg/revision/latest?cb=20180117130956&path-prefix=ru'},
            {t: 18, img: 'https://vignette.wikia.nocookie.net/borderlands/images/5/5a/Image00184.dusk.jpg/revision/latest?cb=20180117130957&path-prefix=ru'},
            {t: 21, img: 'https://vignette.wikia.nocookie.net/borderlands/images/1/12/Image00188.night.jpg/revision/latest?cb=20180117130957&path-prefix=ru'},
        ];
    image = images[images.length - 1].img;
    $.each(images, function() {
        if (hour >= this.t) {
            image = this.img;
        }
    });//each images
    $('body').css('background-image', 'url(' + image + ')');
}(jQuery));