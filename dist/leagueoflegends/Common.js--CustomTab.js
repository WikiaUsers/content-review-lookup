/* General-purpose Image-based Tabber (Example: [[Kled/LoL]])*/
$(window).load(function() {
    $('.lazyimg-wrapper img').trigger("onload");
});
 
mw.hook('wikipage.content').add(function(elem) {
    $(document).on("click", "span.show", function () {
        $(".content-wrapper > div").hide();
        $('#item-' + this.id).fadeIn();
    });
});

/* SkinViewer */
$(document).on("click", "span.show", function () {
    if (!$('#item-' + this.id).is($('.skinviewer-active-tab'))) {
        $(".skinviewer-active-tab").removeClass('skinviewer-active-tab');
        $(".skinviewer-tab-container > div").hide();
        $('#item-' + this.id).addClass('skinviewer-active-tab');
        $('#item-' + this.id).fadeIn();
    }
});

/* loading fix for SkinViewer */
(function() {
    $('.lazyimg-wrapper img.lazyload').each(function() {
    	$(this).removeClass('lazyload');
    	$(this).attr('src', $(this).attr('data-src'));
    });
}());

/* Former HotChampion */
$(window).load(function() {
    if (mw.config.get('wgPageName') === 'League_of_Legends_Wiki') {
        var sInterval;
        var activeItem = 2;
        var items = parseInt($('span.show:last').attr('id'), 10);
        var sTimer = function() {
            clearInterval(sInterval);
            sInterval = setInterval(function() {
                $('span#' + activeItem).fadeTo('fast', 0.5).fadeTo('fast', 1);
                $('.content-wrapper > div').hide();
                $('#item-' + activeItem).fadeIn();
                if (activeItem === items) {
                    activeItem = 1;
                } else {
                    activeItem++;
                }
            }, 15000)};
        sTimer();    
        $(document).on('click', 'span.show', function () {
            activeItem = this.id == items ? 1 : 1 + parseInt(this.id, 10);
            sTimer();
        });
    }
});