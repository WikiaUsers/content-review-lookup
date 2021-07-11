/* Configuration for [[w:c:dev:I18n-js]] */
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};

/* Configuration for [[w:c:dev:AddRailModule]] */
window.AddRailModule = [{
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