
/*************Вставка панорам********************/
;(function($, mw) {
    if (!$('#panorama').length) { return; }
 
    $('#panorama').html(
        '<iframe width="640" height="360" src="https://round.me/embed/' + 
        $('#panorama').attr('data-src') +
        '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
})(this.jQuery, this.mediaWiki);
/*************Вставка панорам*end****************/