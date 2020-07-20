importArticles({type: 'style',
    articles: 'mediawiki:' + wgPageName.replace(/:/g,'_') + '.css'
});

//*Прокрутка*//
$('.ArrowLeft').click(function () {
    scroll = $('#Carousel').scrollLeft();
    $('#Carousel').animate({'scrollLeft': scroll-540},1000);
});
$('.ArrowRight').click(function () {
    scroll = $('#Carousel').scrollLeft();
    $('#Carousel').animate({'scrollLeft': scroll+540},1000);
});

/*Переключатель стилей*/
$(function() {
if($('#changestyle').length > 0) {
var cl = $($('#changestyle').get(0)).data('bg');
if(cl) {
cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
$(document.body).addClass('season-' + cl);
}
}
});