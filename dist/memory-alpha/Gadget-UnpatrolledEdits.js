'use strict';
mw.loader.using(['mediawiki.api'], () => {
	const api = new mw.Api();
	const rights = mw.config.get('wgUserGroups');
	const pagename = 'BlankPage/UnpatrolledEdits';
	const wrongNs = mw.config.get('wgNamespaceNumber') !== -1;
	const wrongRights =
		rights.indexOf('content-moderator') === -1 &&
		rights.indexOf('helper') === -1 &&
		rights.indexOf('staff') === -1 &&
		rights.indexOf('sysop') === -1 &&
		rights.indexOf('wiki-specialist') === -1;
	
	if (wrongNs || mw.config.get('wgTitle') !== pagename || wrongRights){
		return;
	}
	
	const changes = [];
	const messages = [
		'pagetitle',
		'custom-UnpatrolledEdits-title',
		'custom-UnpatrolledEdits-summary',
		'showingresultsinrange',
		'viewprevnext',
		'prevn',
		'nextn',
		'pipe-separator',
		'specialpage-empty'
	];
	
	api.loadMessagesIfMissing(messages).done(() => {
		const validNamespaces = Object.keys(mw.config.get('wgFormattedNamespaces')).filter((x) => x >= 0);
		const opening = $('#mw-content-text p');
		const searchParams = new URLSearchParams(location.search);
		const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 1000;
		const offset = searchParams.get('offset') ? Number(searchParams.get('offset')) : 0;
		let namespace = searchParams.get('namespace') ? searchParams.get('namespace') : validNamespaces.join('|');
		let user = searchParams.get('user') ? searchParams.get('user') : '';
		const start = offset + 1;
		const end = offset + limit;
		const list = $(`<ol start="${String(start)}">`);
		const title = mw.message('custom-UnpatrolledEdits-title').text();
		const myModal = $('<div class="oo-ui-panelLayout-padded oo-ui-panelLayout-framed">')
			.append($('<label for="myModalNamespaces">Namespaces</label>'))
			.append($(`<textarea id="myModalNamespaces" rows="4" style="display: block;">${namespace.split('|').join('\n')}</textarea>`))
			.append($('<label for="myModalUser">User</label>'))
			.append($(`<input type="text" value="${user}" id="myModalUser" style="display: block;">`))
			.append($('<button class="wds-button" id="myModalGo">Go</button>'));
		
		document.title = mw.message('pagetitle', title).text();
		$('#firstHeading').html(title);
		opening.html(mw.message('custom-UnpatrolledEdits-summary').text());
		opening.after(myModal);
		
		$('#myModalGo').on('click', () => {
			user = $('#myModalUser').val();
			namespace = $('#myModalNamespaces').val().split('\n').filter((x) => x >= 0).join('|');
			location.href = mw.util.getUrl(`Special:${pagename}`, {limit: limit, offset: offset, namespace: namespace, user: user});
		});
		
		requestSome();
		
		function requestSome(continueParameter){
			const params = {
				action: 'query',
				list: 'recentchanges',
				rcprop: 'title|ids',
				rcshow: '!patrolled',
				rclimit: 5000,
				rcnamespace: namespace,
				rccontinue: continueParameter,
			};
			
			if (user){
				params.rcuser = user;
			}
			
			api.get(params).done((result) => {
				if (result.query){
					result.query.recentchanges.forEach((edit) => changes.push(edit));
				}
				
				if (result['continue']){
					requestSome(result['continue'].rccontinue);
				} else {
					renderList();
				}
			}).fail((code, data) => {
				if (code === 'http'){
					console.error(`Error: ${code}: ${JSON.stringify(data)}`);
				} else {
					console.error(`Error: ${code}: ${typeof data}`);
				}
			});
		}
		
		function renderList(){
			if (!changes.length){
				myModal.after(mw.message('specialpage-empty').text());
				return;
			}
			
			for (let i = offset; i < ((end > changes.length) ? changes.length : end); i++){
				list.append($(`<li><a href="${mw.util.getUrl(changes[i].title)}">${mw.html.escape(changes[i].title)}</a> (<a href="${mw.util.getUrl(`Special:Diff/${changes[i].revid}`)}">diff</a>)</li>`));
			}
			
			const prev = !offset ? mw.message('prevn', limit).text() : `<a href="${mw.util.getUrl(`Special:${pagename}`, {limit: limit, offset: offset - limit, namespace: namespace, user: user})}">${mw.message('prevn', limit).text()}</a>`;
			const next = (end >= changes.length) ? mw.message('nextn', limit).text() : `<a href="${mw.util.getUrl(`Special:${pagename}`, {limit: limit, offset: offset + limit, namespace: namespace, user: user})}">${mw.message('nextn', limit).text()}</a>`;
			
			const range = mw.message('showingresultsinrange', ((end > changes.length) ? changes.length : end) - offset, start, ((end > changes.length) ? changes.length : end)).text();
			const nav = mw.message(
				'viewprevnext',
				prev,
				next,
				((limit === 20) ? '20' : `<a href="${mw.util.getUrl(`Special:${pagename}`, {limit: 20, offset: offset, namespace: namespace, user: user})}">20</a>`) + mw.message('pipe-separator').text() +
				((limit === 50) ? '50' : `<a href="${mw.util.getUrl(`Special:${pagename}`, {limit: 50, offset: offset, namespace: namespace, user: user})}">50</a>`) + mw.message('pipe-separator').text() +
				((limit === 100) ? '100' : `<a href="${mw.util.getUrl(`Special:${pagename}`, {limit: 100, offset: offset, namespace: namespace, user: user})}">100</a>`) + mw.message('pipe-separator').text() +
				((limit === 250) ? '250' : `<a href="${mw.util.getUrl(`Special:${pagename}`, {limit: 250, offset: offset, namespace: namespace, user: user})}">250</a>`) + mw.message('pipe-separator').text() +
				((limit === 500) ? '500' : `<a href="${mw.util.getUrl(`Special:${pagename}`, {limit: 500, offset: offset, namespace: namespace, user: user})}">500</a>`)
			).text();
			
			myModal
				.after($(`<p>${nav}</p>`))
				.after($(list))
				.after($(`<p>${nav}</p>`))
				.after($(`<p>${range}</p>`));
		}
	});
});