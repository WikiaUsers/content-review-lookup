// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'bureaucrat'
    ]
}; 
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = "You must select a license when uploading a file.";
window.dev.i18n.overrides['NoLicenseWarning']['rejected-text'] = "You can't upload a file without selecting a license! Please select one and resend the form.";


//Configuration for Discussions Rail Module
window.discussionsModuleConfig = {
	'size' : '5',
};
mw.hook('discussionsModule.added').add(function($module) {
        // Module addition
        if ($('#wikia-recent-activity').exists()) {
            $module.insertBefore('#wikia-recent-activity');
        } else {
            $module.appendTo('#WikiaRail');
        }
    });