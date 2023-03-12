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
    $(window).on('scroll', doAnimations);
    $(window).trigger('scroll');
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:OnScrollTrigger.css'
    });
})();