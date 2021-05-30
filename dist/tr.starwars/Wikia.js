// INACTIVE USER
InactiveUsers = { text: 'Aktif değil' }; 
importScriptPage('InactiveUsers/code.js', 'dev');

// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop'
    ]
};