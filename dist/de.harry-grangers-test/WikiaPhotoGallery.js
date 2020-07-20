if(!!$('.WikiaPhotoGalleryPreview').length) {
    var prevEl = '';
    $('.WikiaPhotoGalleryPreview ul li .description').unbind('show').bind('show',function() {
        if($(this).closest('[class^=wikiaPhotoGallery-slider]').attr('id') != prevEl) {
            $(this).closest('[class^=wikiaPhotoGallery-slider]').trigger('WikiaPhotoGalleryImageChanged');
        }
        prevEl = $(this).closest('[class^=wikiaPhotoGallery-slider]').attr('id');
    });
}
 
$('.WikiaPhotoGalleryPreview').on('WikiaPhotoGalleryImageChanged',function(e) {
    //Do some stuff
});

//Nice Slider
//From http://de.youtube.wikia.com/wiki/MediaWiki:Common.js
//Made by [[Benutzer:SpacePucky]] & [[Benutzer:Trollocool]]
$('.wikiaPhotoGallery-slider-body .description-background').prepend(
    $('<div />').addClass('BalkenGrau').append(
        $('<div />').addClass('Roterbalken')
    )
);

function wikiaPhotoGalleryImageChange(dir) {
    direction = (dir == 'left') ? 'left' : 'right';
    imgsum = $('.WikiaPhotoGalleryPreview .wikiaPhotoGallery-slider-body ul li[class^=wikiaPhotoGallery-slider]').length;
    slides = $('.WikiaPhotoGalleryPreview .wikiaPhotoGallery-slider-body ul li[class^=wikiaPhotoGallery-slider]');
    images = slides.find('img.wikiaPhotoGallery-slider');
    activeSlide =  slides.filter(function() {
       return $(this).find('.description').css('display') === 'block';
    });
    slideNumber = slides.index(activeSlide);
    leftSlideNumber = slideNumber - 1;
    rightSlideNumber = (slideNumber + 1) % imgsum;
    console.log('leftSlideNumber',leftSlideNumber,'rightSlideNumber',rightSlideNumber);
    leftSlide = slides.get(leftSlideNumber);
    rightSlide = slides.get(rightSlideNumber);
    slides0LeftOffset = $(slides.get(0)).find('img.wikiaPhotoGallery-slider').position().left;
    slides1LeftOffset = $(slides.get(1)).find('img.wikiaPhotoGallery-slider').position().left;
    slides2LeftOffset = $(slides.get(2)).find('img.wikiaPhotoGallery-slider').position().left;
    slides.each(function(key,val) {
        $(val).find('.nav').removeClass('selected');
        $(val).find('.description').hide();
    });
    if(direction == 'left') {
        $(slides.get(0)).find('img.wikiaPhotoGallery-slider').css('left',slides2LeftOffset);
        $(slides.get(1)).find('img.wikiaPhotoGallery-slider').css('left',slides0LeftOffset);
        $(slides.get(2)).find('img.wikiaPhotoGallery-slider').css('left',slides1LeftOffset);
        newSlide = $(slides.get(rightSlideNumber));
    }
    else {
        $(slides.get(0)).find('img.wikiaPhotoGallery-slider').css('left',slides1LeftOffset);
        $(slides.get(1)).find('img.wikiaPhotoGallery-slider').css('left',slides2LeftOffset);
        $(slides.get(2)).find('img.wikiaPhotoGallery-slider').css('left',slides0LeftOffset);
        newSlide = $(slides.get(leftSlideNumber));
    }
    newSlide.find('.nav').addClass('selected');
    newSlide.find('.description').show();
}

$('.button.WikiaPhotoGallery-control').click(function() {
    dir = ($(this).attr('data-direction') == 'prev') ? 'right' : 'left';
    wikiaPhotoGalleryImageChange(dir);
});

function diashowImgChange(dir) {
    var dir = dir || 'left';
    console.log('dir',dir);
    imgsum = $('.WikiaPhotoGalleryPreview .wikiaPhotoGallery-slider-body ul li[class^=wikiaPhotoGallery-slider]').length;
    console.log('imgsum',imgsum);
    images = $('.WikiaPhotoGalleryPreview .wikiaPhotoGallery-slider-body ul li[class^=wikiaPhotoGallery-slider] img.wikiaPhotoGallery-slider');
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
        el.offset({left: dir == 'left' ? ((activeImgID === imgsum - 1) ? imgpos.left[i] : el.offset().left - 670) : ((activeImgID === 0) ? imgpos.right[i] : el.offset().left + 670), top: el.offset().top});
    }
}