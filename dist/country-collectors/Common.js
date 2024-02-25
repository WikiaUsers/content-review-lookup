// NoLicenseWarning config
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop'
    ]
};

//LockOldComments
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 60;
window.lockOldComments.addNoteAbove = true;

// ProfileTags config
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// override default msg of NoLicenseWarning
((window.dev.i18n = window.dev.i18n || {}).overrides = window.dev.i18n.overrides || {})['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = 'You are uploading a file without proper licensing. If you wanted to use a file from Wikimedia Commons, please link the filename directly instead of uploading duplicates. Files in content to this rule will be deleted under admin\'s discretion.';