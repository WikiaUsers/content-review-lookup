/* Рерайт скрипта Gratters */
/* Автор: Black Spaceship */
(function($, mw) {
    'use strict';
 
    function fetchGratters() {
        $.get(mw.util.wikiScript(), {
	        action: 'raw',
	        title: 'MediaWiki:Custom-Gratters'
        }).done(function(data) {
	       if (!data.length) return;
 
	       var wishes = data.split('\n'),
	           random = Math.floor(Math.random() * wishes.length),
	           wish = wishes[random].split(/\s*\|\s*(.+)/);
 
	       showGratters(wish);
        }).fail(function(){
	        console.warn('Fetching data for gratters failed');
        })
    }
 
    function showGratters(wish) {
        $('#WikiaRail').prepend(
            '<div id="newyearwishes" style="width:98%; position:relative; margin:13px auto; font-size:15px;">' +
                '<div class="wishes">' +
                    '<div style="width:100%; text-align:center;">«' + wish[1] + '»</div>' +
                    '<hr style="margin:5px 0;"/>' +
                    '<div style="text-align:right; font-style:italic; margin-right:5px;">' +
                        'Участник <a href="/ru/wiki/User:' + wish[0].replace(' ', '_') + '">' + wish[0] +'</a>' +
                        '<br />' +
                    '</div>' +
                // Top-center
                '<div style="position:absolute; width:100%; text-align:center; top:-28px; left:0;">' +
                    '<img src="https://vignette.wikia.nocookie.net/angrybirds/images/e/e4/7лет-2.png/revision/latest?cb=20190219203701&path-prefix=ru">' +
                '</div>' +
                // Top-left
                '<div style="position:absolute; top:-14px; left:-8px;">' +
                    '<img src="https://images.wikia.nocookie.net/angrybirds/ru/images/9/9a/%D0%A2%D0%BE%D1%80%D1%82%D0%B5%D0%B3_40.png">' +
                '</div>' +
                // Top-right
                '<div style="position:absolute; top:-14px; right:-10px;">' +
                    '<img src="https://images.wikia.nocookie.net/angrybirds/ru/images/7/78/%D0%A2%D0%BE%D1%80%D1%82%D0%B5%D0%B3_40_1.png">' +
                '</div>' +
            '</div>'
        );
    }
 
    function init() {
        if ($('#WikiaRail').length) {
            mw.loader.using(['mediawiki.util'], fetchGratters);
        }
    }
 
    $(init);
})(this.jQuery, this.mediaWiki);