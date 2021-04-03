(function () {
    function editSrc (el) {
        el.find('img').attr('src', function (_, src) {
            return src.replace('/smart/', '/top-crop/');
        });
    }    

    function main () {
        var pageList = window.FixFeaturedArticlesImagesList;
        $('#WikiaRail #WikiaAdInContentPlaceHolder a:not(.rail-sponsored-content)').each(function () {
            if (typeof pageList === 'object') {
                if (pageList.indexOf($(this).text().trim()) !== -1) {
                    editSrc($(this));
                }
            } else {
                editSrc($(this));
            }
        });
    }

    if ($('#WikiaRail #WikiaAdInContentPlaceHolder').length) {
        main();
    } else {
        $('#WikiaRail').on('afterLoad.rail', main);
    }
})();