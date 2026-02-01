/* Any JavaScript here will be loaded for all users on every page load. */

(function () {
    // Ensure the dev namespace exists
    window.dev = window.dev || {};
    window.dev.i18n = window.dev.i18n || {};
    window.dev.i18n.overrides = window.dev.i18n.overrides || {};

    // Ensure NoLicenseWarning override object exists
    window.dev.i18n.overrides.NoLicenseWarning =
        window.dev.i18n.overrides.NoLicenseWarning || {};

    /* =========================================
     * Custom NoLicenseWarning messages
     * Applies to images & videos
     * ========================================= */

    window.dev.i18n.overrides.NoLicenseWarning['warning-text'] =
        '⚠ <b>Missing license information</b><br><br>' +
        'This file does not include any license or copyright details.<br>' +
        'All images and videos on <b>Hyggshi OS Wiki</b> must clearly state a valid license ' +
        '(Creative Commons, © Copyright, TM, or Public Domain).<br><br>' +
        '<i>Files without license information may be flagged or removed.</i>';

    window.dev.i18n.overrides.NoLicenseWarning['rejected-text'] =
        '⛔ <b>Upload rejected</b><br><br>' +
        'You must provide valid license information before uploading files to ' +
        '<b>Hyggshi OS Wiki</b>.<br><br>' +
        'If you are not the rights holder, please do not upload this content.';

})();