/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */

function getWikiStatistics(targetClass, prop) {
    if ($(targetClass).length) {
        $(targetClass).each(function () {
            var $this = $(this);
            $this.children().hide();
            $this.append('<img src="https://images.wikia.nocookie.net/__cb1396606660/common/skins/common/images/ajax.gif" />');
            wiki = $this.text();
            if (wiki.indexOf('http://') === -1) {
                wiki = 'http://' + wiki;
            }
            if (wiki.indexOf('.wikia.com') === -1) {
                wiki = wiki + '.wikia.com';
            }
            $.ajax({
                url: wiki + '/api.php',
                data: {
                    action: 'query',
                    meta: 'siteinfo',
                    siprop: 'statistics',
                    format: 'json'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                type: 'GET',
                success: function (data) {
                    if ($this.length) {
                        $this.html(data.query.statistics[prop]).show();
                    }
                }
            });
        });
    }
}
 
$(function () {
    getWikiStatistics('.outwikistats-articles', 'articles');
    getWikiStatistics('.outwikistats-activeusers', 'activeusers');
    getWikiStatistics('.outwikistats-admins', 'admins');
    getWikiStatistics('.outwikistats-edits', 'edits');
    getWikiStatistics('.outwikistats-images', 'images');
});

importArticles({
    type: "style",
    article: "w:c:ru.community:User:Wildream/FluidSlider/style.css"
});
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
    var SlideImg = 'url("' + $('#slide-inp-' + tmpCount).text() + '") center center no-repeat';
    $('#slide-out-' + tmpCount).css('background', SlideImg);
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