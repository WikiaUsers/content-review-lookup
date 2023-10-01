(function () {
    function run () {
        $('.recentImage__image img').each(function () {
            $(this).attr('src', function (_, src) {
                return src.replace('/smart/', '/fixed-aspect-ratio/') + '&fill=transparent';
            });
        });
    }

    function main () {
        mw.util.addCSS('.WikiaRail #recent-images-module .recentImage__image img { -o-object-fit: unset; object-fit: unset; }');
        new MutationObserver(run).observe(document.getElementById('recent-images-module'), {
            subtree: true,
            childList: true
        });
        run();
    }

    if ($('.WikiaRail #recent-images-module').length) {
        main();
    } else {
        //This uses the element `#WikiaRail` rather than `.WikiaRail` as this still has the `afterLoad.rail` event,
        //therefor even tho `#recent-images-module` isn't inside `#WikiaRail`, I can hopefully still use the event
        //as a way to wait for the rail to load
        $('#WikiaRail').on('afterLoad.rail', function () {
            var interval = setInterval(function () {
                if (!$('.WikiaRail #recent-images-module').length) {
                    return;
                }
                clearInterval(interval);
                main();
            });
        });
    }
})();