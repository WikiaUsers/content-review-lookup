// NoLicenseWarning config
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop'
    ]
};

// override default msg of NoLicenseWarning
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = 'You are uploading a file without proper licensing. If you wanted to use a file from Wikimedia Commons, please link the filename directly instead of uploading duplicates. Files in content to this rule will be deleted under admin\'s discretion.';