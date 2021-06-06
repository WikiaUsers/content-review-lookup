/// Загрузить js для Заглавной страницы
if(document.getElementById('mainpage-box')){ importScript('MediaWiki:Mainpage.js'); }
// Загрузить js для Вставки панорам
if(document.getElementById('panorama')){ importScript('MediaWiki:Panorama.js'); }
// Загрузить js для Вставки видео с Coub
if(document.getElementById('coub')){ importScript('MediaWiki:Coub.js'); }
// Загрузить js для Вставки панорам с Sketchfab
if(document.getElementById('sketchfab')){ importScript('MediaWiki:Sketchfab.js'); }
// Шаблон:Купить
;(function($, mw) {
    if (!$('.buy_box').length) { return; }
    $('.buy_box .buy_nav .buy_box_btn').first().addClass('act');
    $('.buy_box .buy_block').first().addClass('act');
    $('.buy_box .buy_nav .buy_box_btn').click(function(e) {
        v = $(this).attr('data-box');
        $('.buy_box .buy_nav .buy_box_btn').removeClass('act');
        $('.buy_box .buy_block').removeClass('act');
        $(this).addClass('act');
        $('.buy_box .buy_block.buy_'+v).addClass('act');
    });
})(this.jQuery, this.mediaWiki);
// end