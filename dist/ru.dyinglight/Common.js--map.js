;(function($, mw) {
    if (!$('.bl_map_following').length) return;

    var MapObj = {};

    $('.map_block').find('.map_el a').each(function() {
        var t = $(this).attr('title');

        $(this).attr({
            'data-title': t,
            'title': ''
        });
    });

    $('.map_nav_el .btn_me').each(function(){ 
        var tip = $(this).attr('data-tip'),
        k = $('.map_block .map_el[data-el="'+ tip +'"]').length; 
        $('.map_nav_el [data-tip="'+ tip +'"] .kol b').text(k);
    });

    function do_button($that) {
        
        var MapResult = $('.MapResult');
        MapResult.removeClass('active').empty();
 
        var Maptitle = $that.attr('data-title'),
            Maplink = $that.attr('href');
        //console.log(Maptitle);
 
        var Mapdop = '<div class="close" onclick="$(\'.MapResult\').removeClass(\'active\').empty()">закрыть</div><h2 style="margin-top: 0px;">' + Maptitle + '</h2>';
 
        if (typeof MapObj[Maptitle] == 'undefined') {
            $.get(Maplink, function(data) {
                MapObj[Maptitle] = $(data).find('#mw-content-text').prop('innerHTML');
                MapResult.addClass('active');
                MapResult.empty().append( Mapdop + MapObj[Maptitle] );
            })
            .fail(function() {
                MapResult.addClass('active');
                MapResult.empty().append( Mapdop +'<a href="' + Maplink + '?action=edit&redlink=1">Создать страницу "' + Maptitle + '"</a>');
            });
        } else {
            MapResult.addClass('active');
            MapResult.empty().append( Mapdop + MapObj[Maptitle] );
        }
 
        var b_off = MapResult.offset(),
            MRst = b_off.top - $('#globalNavigation').height();

        $('body,html').animate({"scrollTop":MRst},'slow');
        
        var s = $(".modalWrapper"),
            r = s.data("settings");

        s.closeModal();
        return false;
    }
 
    $('.map_btn').click(function() {
        var $telo = $('#map01'),
            b_width = $(window).width() - 100,
            b_height = $(window).height() - 75;
 
        $.showCustomModal('Карта пригорода (The Following)', $telo.prop('outerHTML'), {
            width: b_width,
            height: b_height
        });
 
        $('.modalContent .map_block').css('height', b_height - 100);
        $('.modalContent .map_el a').click(function(event) {
            event.preventDefault();
            do_button( $(this) );
        });

        $('.modalContent .map_nav_el div').click(function(event) {
            var tip = $(this).attr('data-tip');

            $(this).toggleClass('act');
            $('.modalContent .map_block').find('.' + tip).each(function(){
                $(this).toggleClass('click');
            });
        });
        
        $('.modalContent .zoom').click(function(event) {
            var z = $(this).attr('data-z'),
                img_s = $('.modalContent .map_fon .map_setka img[data-image-key="Dl_map_following_5000_setka.png"]'),
                img = $('.modalContent .map_fon img[data-image-key="Dl_map_following_10000.jpg"]'),
                fon = $('.modalContent .map_fon'),
                fw = fon.width(),
                fh = fon.height(),
                iw = img.width(),
                ih = img.height();

            if ( z == '+' && iw < 5000 ){
                fon.width(fw + 1000);
                fon.height(fh + 1000);
                img.width(iw + 1000);
                img.height(ih + 1000);
                img_s.width(img_s.width()+1000);
                img_s.height(img_s.height()+1000);
            }
            if ( z == '-' && iw>=2000 ){
                fon.width(fw - 1000);
                fon.height(fh - 1000);
                img.width(iw - 1000);
                img.height(ih - 1000);
                img_s.width(img_s.width()-1000);
                img_s.height(img_s.height()-1000);
            }

            $('.zoom_info').text('zoom 1:' + ( 6 - (img.width()/1000)) );
        });
    });

    $('.map_el a').click(function() {
        do_button( $(this) );
    });
})(this.jQuery, this.mediaWiki);