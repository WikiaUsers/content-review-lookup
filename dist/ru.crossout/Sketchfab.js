/*************Вставка панорамы с Sketchfab********************/
;(function() {
    
    if (!$('.sketchfab').length) { return; }
 
    for (var i=0; i<$('.sketchfab').length; i++) {
        $('.sketchfab')[i].innerHTML=
            '<iframe width="640" height="480" src="' + 
            $('.sketchfab')[i].dataset['src'] + 
            '"></iframe>';
    }        
})(this.jQuery, this.mediaWiki);
/*************Вставка панорамы с Sketchfab*end****************/