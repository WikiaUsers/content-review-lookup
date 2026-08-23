/* ==========================================================================
   MONSTER LAB SPOILER
   ========================================================================== */

(function ($) {

    function initLabSpoilers() {

        $('.lab-spoiler').each(function () {

            var $spoiler = $(this);
            var $banner = $spoiler.find('.lab-spoiler-banner').first();
            var $warning = $spoiler.find('.lab-spoiler-warning').first();
            var $content = $spoiler.find('.lab-spoiler-content').first();

            /* Do not initialize twice */
            if ($spoiler.hasClass('lab-spoiler-ready')) {
                return;
            }

            /* Start closed */
            $spoiler
                .addClass('lab-spoiler-ready')
                .addClass('lab-spoiler-closed')
                .removeClass('lab-spoiler-open');

            $content.hide();

            /*
             * CLOSED:
             * skull + pill are clickable
             *
             * OPEN:
             * pill disappears, therefore only
             * the skull remains clickable
             */
            $banner.on('click.labSpoiler', function (event) {

                event.preventDefault();

                /* OPEN */
                if ($spoiler.hasClass('lab-spoiler-closed')) {

                    $spoiler
                        .removeClass('lab-spoiler-closed')
                        .addClass('lab-spoiler-open');

                    $warning
                        .stop(true, true)
                        .fadeOut(200, function () {
                            $content.show();
                        });

                    return;
                }

                /* CLOSE */
                if ($spoiler.hasClass('lab-spoiler-open')) {

                    $content.hide();

                    $spoiler
                        .removeClass('lab-spoiler-open')
                        .addClass('lab-spoiler-closed');

                    $warning
                        .stop(true, true)
                        .fadeIn(200);
                }

            });

        });

    }

    /* Initial page load */
    $(initLabSpoilers);

    /*
     * Also initialize spoilers if MediaWiki/Fandom
     * inserts page content dynamically.
     */
    if (window.mw) {
        mw.hook('wikipage.content').add(function () {
            initLabSpoilers();
        });
    }

    /* Temporary test marker */
    window.LabSpoilerStandaloneLoaded = true;

}(jQuery));