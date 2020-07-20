/**
 * One click deletes on old image revisions
 * @author Grunny
 */
$(function() {
    var config = mw.config.get([
        'wgAction',
        'wgCanonicalNamespace'
    ]);
    if (
        config.wgCanonicalNamespace !== 'File' ||
        config.wgAction !== 'delete' ||
        !mw.util.getParamValue('oldimage') ||
        window.FastOldImageDeleteLoaded
    ) {
        return;
    }
    window.FastOldImageDeleteLoaded = true;
    $('#mw-filedelete-submit').click();
});