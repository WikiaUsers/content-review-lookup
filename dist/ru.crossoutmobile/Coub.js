/*************Вставка видео с coub********************/
;(function() {
    
    if (!$('.coub').length) { return; }
 
    for (var i=0; i<$('.coub').length; i++) {
        $('.coub')[i].innerHTML=
            '<iframe allowfullscreen="true" frameborder="0" height="360" src="' + 
            $('.coub')[i].dataset['src'].replace("view","embed") +
            '" width="640"></iframe>';
    }        
})(this.jQuery, this.mediaWiki);
/*************Вставка видео с coub*end****************/