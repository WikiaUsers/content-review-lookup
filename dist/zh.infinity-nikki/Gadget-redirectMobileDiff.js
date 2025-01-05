/* Automatically redirect Special:MobileDiff to Special:Diff for desktop users */
if (mw.config.get('wgCanonicalSpecialPageName') == 'MobileDiff') {
	let diffIds = mw.config.get('wgTitle').split('/').slice(1).join('/').replace('...', '/');
	let wgArticlePath = mw.config.get('wgArticlePath');
	location.pathname = wgArticlePath.replace('$1', 'Special:Diff/' + diffIds);
}