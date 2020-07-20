/* Configuration for AddRailModule */
window.AddRailModule = [{
    page: 'Template:DiscordRailModule',
    prepend: true,
    maxAge: 86400,
}]
mw.hook('wikipage.content').add(function ($elem) {
    $elem.filter('section.railModule.rail-module')
         .find('span.wds-button>a:only-child')
         .attr('class', 'wds-button')
         .unwrap();
});

/* NoLicenseWarning custom message */
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = 'You are trying to upload files without selecting a license. Select a license, and read the image guidelines before uploading.';