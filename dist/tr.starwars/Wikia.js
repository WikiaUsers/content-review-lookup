// INACTIVE USER
InactiveUsers = { text: 'aktif değil' }; 
importScriptPage('InactiveUsers/code.js', 'dev');

// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop'
    ]
};

// Prepare custom messages for NoLicenseWarning
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};
 
// Add custom content instead of default messages
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = 'Uyarı! Yüklediğin dosyada bir lisans seçmedin!';
window.dev.i18n.overrides['NoLicenseWarning']['rejected-text'] = 'Uyarı! Yüklediğin dosyada bir lisans seçmediğin için işlem iptal oldu!';