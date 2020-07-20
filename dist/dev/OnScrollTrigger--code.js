(function() {
    function doAnimations() {
        var offset = $(window).scrollTop() + $(window).height(),
            $animatables = $('.animatable');
        if ($animatables.length === 0) {
            $(window).off('scroll', doAnimations);
        }
        $animatables.each(function(i) {
            var $animatable = $(this);
            if (($animatable.offset().top + $animatable.height() - 20) < offset) {
                $animatable.removeClass('animatable').addClass('animated');
            }
        });
    }
    
    
    function init() {
        $(window).on('scroll', doAnimations);
        $(window).trigger('scroll');
    }

    var imported = importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:OnScrollTrigger.css'
    });
    
    if (imported.length) {
        imported[0].onload = init;
    } else {
        init();
    }
})();