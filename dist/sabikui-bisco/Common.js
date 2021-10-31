/* Any JavaScript here will be loaded for all users on every page load. */

/* BackToTopButton */
window.BackToTopModern = true;

/* LinkPreview */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/rust-eating-bisco/images/2/27/Sabikui_Bisco_logo.png/revision/latest/scale-to-width-down/350?cb=20210820063554';
window.pPreview.tlen = 1000;

/* DiscussionsRailModule */
    mw.hook('discussionsModule.added').add(function($module) {
        // Module addition
        if ($('.insights-module').exists()) {
            $module.insertBefore('.insights-module');
        } else {
            $module.appendTo('#WikiaRail');
        }
    });