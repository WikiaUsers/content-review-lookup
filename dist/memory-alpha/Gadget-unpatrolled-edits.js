'use strict';
(async () => {
	const config = mw.config.values;
	const wrongNs = config.wgCanonicalSpecialPageName !== 'Blankpage';
	const wrongPage = config.wgPageName.split('/')[1] !== 'UnpatrolledEdits';

	if (wrongNs || wrongPage){
		return;
	}

	const api = new mw.Api({parameters: {
		action: 'query',
		format: 'json',
		formatversion: 2,
		errorformat: 'plaintext',
	}});
	const changes = [];
	await api.loadMessagesIfMissing([
		'pagetitle',
		'custom-UnpatrolledEdits-title',
		'custom-UnpatrolledEdits-summary',
		'showingresultsinrange',
		'viewprevnext',
		'prevn',
		'nextn',
		'pipe-separator',
		'specialpage-empty',
	]);
	const validNamespaces = Object.keys(config.wgFormattedNamespaces).filter(x => x >= 0);
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
	const myModal = $('<div class="oo-ui-panelLayout-padded oo-ui-panelLayout-framed">').append(
		$('<label for="myModalNamespaces">Namespaces</label>'),
		$(`<textarea id="myModalNamespaces" rows="4" style="display: block;">${mw.html.escape(namespace.split('|').join('\n'))}</textarea>`),
		$('<label for="myModalUser">User</label>'),
		$(`<input type="text" value="${mw.html.escape(user)}" id="myModalUser" style="display: block;">`),
		$('<button class="cdx-button" id="myModalGo">Go</button>'),
	);

	document.title = mw.message('pagetitle', title).text();
	$('#firstHeading').text(title);
	opening.html(mw.message('custom-UnpatrolledEdits-summary').text());
	opening.after(myModal);

	$('#myModalGo').on('click', () => {
		user = $('#myModalUser').val();
		namespace = $('#myModalNamespaces').val().split('\n').filter(x => x >= 0).join('|');
		location.href = mw.util.getUrl(config.wgPageName, {
			limit: limit,
			offset: offset,
			namespace: namespace,
			user: user,
		});
	});

	requestSome();

	function requestSome(continueParameter){
		const params = {
			list: 'recentchanges',
			rcprop: ['title', 'ids'],
			rcshow: '!patrolled',
			rclimit: 'max',
			rcnamespace: namespace,
			rccontinue: continueParameter,
		};

		if (user){
			params.rcuser = user;
		}

		api.post(params).then(result => {
			if (result.warnings){
				console.warn(result.warnings);
				for (const warning of result.warnings){
					console.warn(`Warning: ${warning.code}: ${warning.text}`);
				}
			}

			if (result.query){
				result.query.recentchanges.forEach(edit => changes.push(edit));
			}

			if (result.continue){
				requestSome(result.continue.rccontinue);
			} else {
				renderList();
			}
		}, (code, data) => {
			console.error(data.errors);
			for (const error of data.errors){
				console.error(`Error: ${error.code}: ${error.text}`);
			}
		});
	}

	function renderList(){
		if (!changes.length){
			myModal.after(mw.message('specialpage-empty').text());
			return;
		}

		for (let i = offset; i < (end > changes.length ? changes.length : end); i++){
			list.append($(`<li><a href="${mw.util.getUrl(changes[i].title)}">${mw.html.escape(changes[i].title)}</a> (<a href="${mw.util.getUrl(`Special:Diff/${changes[i].revid}`)}">diff</a>)</li>`));
		}

		const prev = !offset ? mw.message('prevn', limit).text() : link(config, limit, offset - limit, namespace, user, -1, mw.message('prevn', limit).text());
		const next = end >= changes.length ? mw.message('nextn', limit).text() : link(config, limit, offset + limit, namespace, user, -1, mw.message('nextn', limit).text());

		const range = mw.message('showingresultsinrange', (end > changes.length ? changes.length : end) - offset, start, (end > changes.length ? changes.length : end)).text();
		const pipeSeparator = mw.message('pipe-separator').text();
		const nav = mw.message(
			'viewprevnext',
			prev,
			next,
			link(config, 20, offset, namespace, user, limit) + pipeSeparator +
			link(config, 50, offset, namespace, user, limit) + pipeSeparator +
			link(config, 100, offset, namespace, user, limit) + pipeSeparator +
			link(config, 250, offset, namespace, user, limit) + pipeSeparator +
			link(config, 500, offset, namespace, user, limit),
		).text();

		myModal.after(
			$(`<p>${nav}</p>`),
			$(list),
			$(`<p>${nav}</p>`),
			$(`<p>${range}</p>`),
		);
	}
})();

function link(config, limit, offset, namespace, user, oldLimit, text = limit){
	if (limit === oldLimit){
		return String(limit);
	}
	return `<a href="${mw.util.getUrl(config.wgPageName, {
		limit: limit,
		offset: offset,
		namespace: namespace,
		user: user,
	})}">${String(text)}</a>`;
}

// {{JavaScript category}}