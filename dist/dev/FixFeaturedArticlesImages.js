(function () {
    function editSrc (el) {
        el.find('img').attr('src', function (_, src) {
            return src.replace('/smart/', '/top-crop/');
        });
    }    

    function main () {
        var pageList = window.FixFeaturedArticlesImagesList;
        $('.WikiaRail .popular-pages .popular-pages__item > a:not(.sponsored-content)').each(function () {
            if (typeof pageList === 'object') {
                if (pageList.indexOf($(this).text().trim()) !== -1) {
                    editSrc($(this));
                }
            } else {
                editSrc($(this));
            }
        });
    }

    if ($('.WikiaRail .popular-pages').length) {
        main();
    } else {
        //This uses the element `#WikiaRail` rather than `.WikiaRail` as this still has the `afterLoad.rail` event, therefor even tho `.popular-pages` isn't inside `#WikiaRail`, I can hopefully still use the event as a way to wait for the rail to load
        $('#WikiaRail').on('afterLoad.rail', main);
    }
})();