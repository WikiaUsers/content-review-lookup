// Prepare custom messages for NoLicenseWarning
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};

// Add custom content instead of default messages
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = 'You are trying to upload a file without a license, If you are sure, resend the form but please note that unlicensed files get removed.';
window.dev.i18n.overrides['NoLicenseWarning']['rejected-text'] = 'Your file has been rejected because it did not have a license.';