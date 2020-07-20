(function () {
    if (window.FixFeaturedArticlesImagesLoaded) {
        return;
    }
    window.FixFeaturedArticlesImagesLoaded = true;
    function execute () {
        $('#WikiaAdInContentPlaceHolder a:not(.rail-sponsored-content) img').each(function () {
            $(this).attr('src', $(this).attr('src').replace(/\/smart\//, '/top-crop/'));
        });
    }
    var interval = setInterval(function () {
        if (!$('#WikiaAdInContentPlaceHolder a:not(.rail-sponsored-content) img').length) {
            return;
        }
        clearInterval(interval);
        execute();
    }, 100);
})();