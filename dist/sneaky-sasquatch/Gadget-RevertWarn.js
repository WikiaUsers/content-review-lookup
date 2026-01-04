(function () {
	if (mw.config.get('wgCanonicalSpecialPageName') !== 'Diff') return;

	const api = new mw.Api();

	// Add button to page actions
	mw.util.addPortletLink(
		'p-cactions',
		'#',
		'Revert & Warn',
		'ca-revertwarn',
		'Revert this edit and warn the user'
	);

	document.getElementById('ca-revertwarn').addEventListener('click', async function (e) {
		e.preventDefault();

		const oldid = mw.config.get('wgDiffOldId');
		const revid = mw.config.get('wgDiffNewId');
		const page = mw.config.get('wgPageName');
		const username = mw.config.get('wgRelevantUserName');

		if (!oldid || !revid || !username) {
			alert('Could not get diff information.');
			return;
		}

		if (!confirm(`Revert edit and warn ${username}?`)) return;

		try {
			// 1. Revert edit
			await api.postWithEditToken({
				action: 'edit',
				title: page,
				undo: revid,
				undoafter: oldid,
				summary: 'Reverted edit and warned user',
				watchlist: 'nochange'
			});

			// 2. Post warning to Fandom Message Wall
			await api.postWithEditToken({
				action: 'edit',
				title: `Message_Wall:${username}`,
				appendtext: `\n\n== Warning ==\nPlease avoid making disruptive edits. Continued issues may lead to moderation actions. [[User:ItsLido|<span style="background-color: Red; color: White;">'''ItsLido'''</span>]]<sup>[[User talk:ItsLido|<span style="color: Blue;">''Ranger Danger''</span>]]</sup> 19:23, 2 January 2026 (UTC)`,
				summary: 'User warning'
			});

			alert('Edit reverted and user warned.');
			location.reload();

		} catch (err) {
			console.error(err);
			alert('Something went wrong.');
		}
	});
})();