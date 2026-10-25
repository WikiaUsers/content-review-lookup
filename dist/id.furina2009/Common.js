/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */

importScript('MediaWiki:Common/1.js');
importscript('mediawiki:Common/no/1.js');
importscript('mediawiki:Nuke.js');
importscript('mediawiki:Group-user.js');
importscript('mediawiki:Test.js');


// =======================================================================
// NoLicenseWarning script
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop',
    ]
};

// Standard_Edit_Summary script
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'MediaWiki:Custom-StandardEditSummaries'
};