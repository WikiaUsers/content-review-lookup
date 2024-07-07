mw.loader.using('mediawiki.api', function() {
	const pagename = mw.config.get('wgPageName'); // '...User:USERNAME/Sandbox...'
	const capture = pagename.match(/User:(\w+)\/Sandbox/);

	if (!capture) return;

	const req = {
		action: 'query',
		format: 'json',
		prop: 'revisions',
		titles: capture[0] + '.css',
		formatversion: '2',
		rvprop: 'content|user',
		rvslots: 'main'
	};

	new mw.Api().get(req).done(function(data) {
		const cssPage = data.query.pages[0];

		if (cssPage.missing === true) return;

		const pageRev = cssPage.revisions[0];
		const editor = pageRev.user;
		const css = pageRev.slots.main.content;
		const user = capture[1];

		if (editor !== user) return;

		const style = document.createElement('style');
		document.head.appendChild(style).textContent = css;
	});
});