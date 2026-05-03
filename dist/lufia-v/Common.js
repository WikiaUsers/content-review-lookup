/* Any JavaScript here will be loaded for all users on every page load. */
// Only run on Practice_page
if (mw.config.get('wgPageName') === 'Practice_page') {
    mw.loader.using(['mediawiki.util'], function () {
        $(function () {

            function insertFooter() {
                var gf = $('.global-footer');
                if (gf.length) {
                    var footer = $('#custom-footer-content').html();
                    $('<div id="custom-footer"></div>')
                        .html(footer)
                        .insertBefore(gf);
                } else {
                    // Retry until footer exists
                    setTimeout(insertFooter, 200);
                }
            }

            insertFooter();
        });
    });
}