/*************Вставка музыки с yandex********************/
;(function() {
 
    if (!$('.yandex').length) { return; }
 
    $('#yandex').html(
        '<iframe frameborder="0" style="border:none;width:600px;height:600px;" width="600" height="600" src="' + 
        $('#yandex').attr('data-src') +
        '"></iframe>');
})(this.jQuery, this.mediaWiki);
/*************Вставка музыки с yandex*end****************/