/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */
importArticles({
  type: "script",
  articles: [
    "MediaWiki:Rainbow.js",
    "MediaWiki:Test.js",
    "MediaWiki:Common/1.js",
    'MediaWiki:Group-user.js',
    'MediaWiki:Nuke.js',
    'MediaWiki:Common/no/1.js',
    'MediaWiki:StackableBlockRecommendationSystem.js',
    'u:dev:MediaWiki:MassProtect/code.js',
  ]
});

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