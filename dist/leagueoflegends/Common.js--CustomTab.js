/* Skinviewer: loading fix */
$(window).load(function() {
    $('.lazyimg-wrapper img').trigger("onload");
});
 
/* Skinviewer: Skinselektor onclick */
mw.hook('wikipage.content').add(function(elem) {
    $(document).on("click", "span.show", function () {
        $(".content-wrapper > div").hide();
        $('#item-' + this.id).fadeIn();
    });
});

/* Frontpage - News autoslider */
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