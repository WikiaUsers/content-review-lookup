/* Configuration for [[w:c:dev:I18n-js]] */
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};

/* Configuration for [[w:c:dev:AddRailModule]] */
window.AddRailModule = [{
    // {{DiscordRailModule}}
    page: 'Template:DiscordRailModule',
    prepend: true,
    maxAge: 86400,
}, {
    // {{DiscussionsRailModule}}
    page: 'Template:DiscussionsRailModule',
    maxAge: 86400,
}];
mw.hook('wikipage.content').add(function ($elem) {
    $elem.filter('section.railModule.rail-module')
         .find('span.wds-button>a:only-child')
         .attr('class', 'wds-button')
         .unwrap();
});

/* Configuration for [[w:c:dev:AjaxRC]] */
window.ajaxSpecialPages = ['Recentchanges', 'WikiActivity', 'Log', 'Contributions', 'AbuseLog'];
window.dev.i18n.overrides['AjaxRC'] = {
    'ajaxrc-refresh-text': 'Auto refresh',
    'ajaxrc-refresh-hover': 'Check to automatically refresh this page',
};

/* Configuration for [[w:c:dev:InactiveUsers]] */
window.InactiveUsers = { months: 1 };

/*
 * Hack: Prevent character page thumbnails in the Popular Pages rail module from turning out as crotch shots.
 * NB: As of 2019-02-21, we've received explicit dispensation from [[w:Help:Customization policy]]; see ticket #434578.
 * TODO: Remove once Wikia have implemented a proper fix.
 * For reference, see:
 *   - <https://github.com/Wikia/app/blob/release-807.001/extensions/wikia/Recirculation/RailContentService.php>;
 *   - <https://github.com/Wikia/app/blob/release-807.001/extensions/wikia/Recirculation/templates/RailContentService_renderRailModule.php#L2-L11>;
 *   - <https://github.com/Wikia/app/blob/release-807.001/extensions/wikia/Recirculation/js/recirculation.js#L169-L194>; and
 *   - <https://github.com/Wikia/app/blob/release-807.001/extensions/wikia/Recirculation/templates/client/premiumRail_sponsoredContent.mustache#L1-L3>.
 */
(function () {
    'use strict';

    function fixCrotchShotsInPopularPages() {
        document.querySelectorAll('#recirculation-rail .thumbnails a:not(.rail-sponsored-content) > img[src*="/zoom-crop/"]').forEach(function (img) {
            img.src = img.src.replace('/zoom-crop/', '/top-crop/');
        });
    }

    var $rail = $('#WikiaRail');
    if (!$rail.exists()) {
        return;
    }
    if ($rail.find('.loading').exists()) {
        $rail.one('afterLoad.rail', function () {
            fixCrotchShotsInPopularPages();
        });
    } else {
        fixCrotchShotsInPopularPages();
    }
}());