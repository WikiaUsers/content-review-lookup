/* === Media.css ===*/

var elemImage = document.querySelector('.image');

if (typeof elemImage !== 'undefined' && elemImage !== null) {
    //const _images = $('.image');
    $('.image').append(new ImgIcon());
}

var elemVideo = document.querySelector('.video');

if (typeof elemVideo !== 'undefined' && elemVideo !== null) {
    //const _videos = $('.video');
    $('.video').append(new VidIcon());

    if ($('.image-icon')) {
        $('.video .image-icon').remove();
    }
}

function ImgIcon() {
    return $("<span></span>").addClass('media-icon image-icon fa fa-search-plus');
}

function VidIcon() {
    return $("<span></span>").addClass('media-icon video-icon fa fa-play');
}

/*————————————————————————————————————————————————————————————————————————————*/
/* Script written by Spirit Force. */