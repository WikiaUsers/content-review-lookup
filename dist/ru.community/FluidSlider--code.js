//FluidSlide by Wildream. 
//2013

/* import of CSS from a user page disallowed 

importArticles({
    type: "style",
    article: "w:c:ru.community:User:Wildream/FluidSlider/style.css"
});
*/

/* 

Commenting out rest of code because it allows for GDPR and security 
concerns by allowing hotlinking of offsite imagery

$(window).resize(function () {
    ChangeSlideSize();
});
var ContainersOnPage = $('.FluidSlider-container').size();
var InputsSlideCount = $('.FluidSlider-url').size();
var InputSlideIDNumber = 0;
var currentSlideDescription = 0;
$(".FluidSlider-url").each(function () {
    if ($(this).attr('id') == undefined) {
        $(this).attr('id', 'slide-inp-' + InputSlideIDNumber);
        InputSlideIDNumber++;
    }
});
//Adding required classes and ids to slides, slidedescriptions, etc.
var ContainerSlideIDNumber = 0;
$(".FluidSlider-container").each(function () {
    if ($(this).attr('id') == undefined) {
        $(this).attr('id', 'container-' + ContainerSlideIDNumber);
        ContainerSlideIDNumber++;
    }
});

ContainerSlideIDNumber = 0;
$(".FluidSlider-nav").each(function () {
    if ($(this).attr('id') == undefined) {
        $(this).attr('id', 'nav-' + ContainerSlideIDNumber);
        ContainerSlideIDNumber++;
    }
});

for (ContainerCount = 0; ContainerCount < ContainersOnPage; ContainerCount++) {
for (NavsCount = 0; NavsCount < $('#nav-' + ContainerCount).children().size() - 1; NavsCount++) {
$('#container-' + ContainerCount).append('<div class="FluidSlide"></div>');
}
}

var OutputSlideIDNumber = 0;
$(".FluidSlide").each(function () {
    if ($(this).attr('id') == undefined) {
        $(this).attr('id', 'slide-out-' + OutputSlideIDNumber);
        OutputSlideIDNumber++;
    }
});

for (tmpCount = 0; tmpCount < InputsSlideCount; tmpCount++) {
    var SlideImg = ($('#slide-inp-' + tmpCount + ' > img').length) ?
                    $('#slide-inp-' + tmpCount + ' > img').attr('src'):
                    $('#slide-inp-' + tmpCount).text();

    $('#slide-out-' + tmpCount).css('background', 'url("' + SlideImg + '") center center no-repeat');
}
//Changing slide and slide description
function ChangeSlide() {
    for (ContainerCount = 0; ContainerCount < ContainersOnPage; ContainerCount++) {
        var CurrentSlide = parseInt($('#container-' + ContainerCount).data('current-slide'), 10);
        CurrentSlide++;
        if (CurrentSlide >= $('#container-' + ContainerCount).children().size()) {
            CurrentSlide = 0;
        }
        var OldSlide = parseInt($('#nav-' + ContainerCount).data('old-description'), 10);
        $('#container-' + ContainerCount).animate({
            left: -CurrentSlide * ($('.FluidSlide').width())
        }, 300).data('current-slide', CurrentSlide);
        $("#nav-" + ContainerCount).children().eq(OldSlide).hide();
        $("#nav-" + ContainerCount).children().eq(CurrentSlide).show();
        $("#nav-" + ContainerCount).data('old-description', CurrentSlide);
    }
}

setInterval(ChangeSlide, 5000);
//Changing slide size
function ChangeSlideSize() {
    var SliderHeight = parseInt($('.WikiaArticle').width(), 10) / 2;
    $('.FluidSlider-viewpoint').css({
        'width': '100%',
        'height': SliderHeight,
        'max-height': '510px',
        'max-width': '1060px',
        'margin': '0 auto',
        'overflow': 'hidden'
    });

    $('.FluidSlide').css({
        'background-size': 'contain',
        '-o-background-size': 'contain',
        '-webkit-background-size': 'contain',
        '-moz-background-size': 'contain',
        'display': 'inline',
        'float': 'left',
        'height': SliderHeight,
        'max-height': '510px',
        'max-width': '1060px',
        'width': $('.FluidSlider-viewpoint').width()
    });
    $('.FluidSlider-container').css({
        'width': (parseInt($('.FluidSlide').width(), 10) * parseInt($('.FluidSlide').size(), 10)),
        'height': SliderHeight,
        'position': 'relative'
    });
}

setTimeout(ChangeSlideSize, 500);

*/