!function (userSettings) {
    /*global require module list*/
    var moduleList = ['jquery', 'mw', 'wikia.ui.factory', 'BannerNotification', 'wikia.window', 'ext.wikia.design-system.loading-spinner'];
    /* require callback */
    function rcallback ($, mw, uiFactory, BannerNotification, window, Spinner) {
        'use strict';
 
        var cfg = mw.config.get([
            'wgPageName',
            'wgUserLanguage',
            'wgUserName',
            'wgUserGroups'
        ]);
if (
            (!$('#WikiaRail').length) &&
            cfg.wgPageName !== "MediaWiki:Community-corner"
        ) {
            return;
        }