/**
 * @name            UnhideAceDiff
 * @version         v1.0
 * @author          TheGoldenPatrik1
 * @description     Unhides the Ace diff button from its dropdown.
 */
(function () {
    if (
        mw.config.get('wgAction') !== 'edit' ||
        window.UnhideAceDiffLoaded
    ) {
        return;
    }
    window.UnhideAceDiffLoaded = true;
    function init () {
        $('#wpDiff').appendTo('nav.buttons');
        $('.buttons .drop').remove();
        $('.buttons ul.WikiaMenuElement').remove();
        mw.util.addCSS(
            '.codeeditor #EditPageRail .wikia-menu-button {\
                width: 95px;\
            }\
            .codeeditor #EditPageRail .wikia-menu-button .codepage-publish-button {\
                width: 100%;\
            }'
        );
    }
    if ($('body').hasClass('codeeditor')) {
        init();
    } else {
        mw.hook('dev.codeeditor.session').add(init);
    }
})();