function diashowImgChange(dir) {
    var dir = dir || 'left';
    imgsum = $('.WikiaPhotoGalleryPreview .wikiaPhotoGallery-slider-body ul li[class^=wikiaPhotoGallery-slider]').length;
    images = $('.WikiaPhotoGalleryPreview .wikiaPhotoGallery-slider-body ul li[class^=wikiaPhotoGallery-slider] img.wikiaPhotoGallery-slider')
    activeImg =  images.filter(function() {
        console.log($(this),$(this).offset(),$(this).offset().left);
        factor = 
$('.vertical').offset().left + ($('.vertical').width() / 2) + ($('img.wikiaPhotoGallery-slider').width() / 2);
leftpic = $('.vertical').offset().left + ($('.vertical').width() / 2) - ($('img.wikiaPhotoGallery-slider').width() / 2);
        if($(this).offset().left < leftpic) {
            return $(this).offset().left === leftpic;
        }
        else if($(this).offset().left > factor) {
            return $(this).offset().left === factor;
        }
    });
    console.log(images,$(this),$(this).offset()/*,$(this).offset().left*/,activeImg);
    activeImgID = activeImg.parent().attr('class').split('-')[activeImg.parent().attr('class').split('-').length - 1];
    console.log(activeImgID);
    for(i = 0; i < imgsum; i++) {
        el = $('.WikiaPhotoGalleryPreview .wikiaPhotoGallery-slider-body ul li.wikiaPhotoGallery-slider-' + i + ' img.wikiaPhotoGallery-slider');
        imgpos.left[0] = 0;
        imgpos.left[1] = 670;
        imgpos.left[2] = 1340;
        imgpos.right[0] = -1340;
        imgpos.right[1] = -670;
        imgpos.right[2] = 0;
        el.offset({left: dir == 'left' ? ((activeImgID === imgsum - 1) ? imgpos.left[i] : el.offset().left - 670) : ((activeImgID === 0) ? imgpos['right'][i] : el.offset().left + 670), top: el.offset().top});
    }
}