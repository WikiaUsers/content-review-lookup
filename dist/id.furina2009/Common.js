/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */

/* ============================================================

============================================================

*/



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

const logoLinks = [
	document.querySelector("a.mw-wiki-logo, header .branding-box a"),
	document.querySelector('a.[href="/"]')
].filter(l => l);
if (logoLinks.length !== 0) {
	const namespace = mw.config.get("wgNamespaceNumber") - mw.config.get("wgNamespaceNumber") % 2;
	let link = {
	}[namespace];
	
	if (link) {
		for (const logoLink of logoLinks) {
			logoLink.href = link;
		}
	}
}