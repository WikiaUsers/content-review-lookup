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
		'blanknamespace',
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
	const searchParams = new URLSearchParams(location.search);
	const data = JSON.parse(searchParams.get('data')) || {
		limit: 1000,
		offset: 0,
		namespace: validNamespaces,
	};
	const control = $('<div class="cdx-field__control">');
	const form = $('<form>').append(
		$('<fieldset>', {
			class: 'cdx-field',
			append: [
				$('<legend>', {
					class: 'cdx-label',
					append: $('<span>', {
						class: 'cdx-label__label__text',
						text: 'Namespaces',
					}),
				}),
				control,
			],
		}),
		$('<fieldset>', {
			class: 'cdx-field',
			append: [
				$('<legend>', {
					class: 'cdx-label',
					append: $('<span>', {
						class: 'cdx-label__label__text',
						text: 'User',
					}),
				}),
				$('<div>', {
					class: 'cdx-field__control',
					append: $('<div>', {
						class: 'cdx-text-input',
						append: $('<input>', {
							class: 'cdx-text-input__input',
							placeholder: 'Username',
							value: data.user,
						}),
					}),
				}),
			],
		}),
		$('<button>', {
			class: 'cdx-button',
			text: 'Go',
		}),
	);
	validNamespaces.forEach(ns => {
		control.append($('<div>', {
			class: 'cdx-checkbox cdx-checkbox--inline',
			append: $('<div>', {
				class: 'cdx-checkbox__wrapper',
				append: [
					$('<input>', {
						id: `checkbox-ns-${ns}`,
						class: 'cdx-checkbox__input',
						type: 'checkbox',
						checked: data.namespace.includes(ns),
						value: ns,
					}),
					$('<span class="cdx-checkbox__icon">'),
					$('<div>', {
						class: 'cdx-checkbox__label cdx-label',
						append: $('<label>', {
							for: `checkbox-ns-${ns}`,
							class: 'cdx-label__label',
							append: $('<span>', {
								class: 'cdx-label__label__text',
								text: config.wgFormattedNamespaces[ns] || mw.message('blanknamespace').text(),
							}),
						}),
					}),
				],
			}),
		}));
	});
	const opening = $('#mw-content-text p');
	let namespace = data.namespace;
	let user = data.user;
	const start = data.offset + 1;
	const end = data.offset + data.limit;
	const list = $('<ol>', {start: start});
	const title = mw.message('custom-UnpatrolledEdits-title').text();

	document.title = mw.message('pagetitle', title).text();
	$('#firstHeading').html(title);
	opening.html(mw.message('custom-UnpatrolledEdits-summary').text());
	opening.after(form);

	$('#myModalGo').on('click', () => {
		user = $('#myModalUser').val();
		namespace = $('#myModalNamespaces').val().split('\n').filter(x => x >= 0).join('|');
		location.href = mw.util.getUrl(config.wgPageName, {data: JSON.stringify(data)});
	});

	requestSome();

	function requestSome(continueParameter){
		const params = {
			list: 'recentchanges',
			rcprop: 'title|ids',
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
				for (const i in result.warnings){
					const warning = result.warnings[i];
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
			form.after(mw.message('specialpage-empty').text());
			return;
		}

		for (let i = data.offset; i < (end > changes.length ? changes.length : end); i++){
			list.append($(`<li><a href="${mw.util.getUrl(changes[i].title)}">${mw.html.escape(changes[i].title)}</a> (<a href="${mw.util.getUrl(`Special:Diff/${changes[i].revid}`)}">diff</a>)</li>`));
		}

		const prev = !data.offset ? mw.message('prevn', data.limit).text() : link(config, data.limit, data.offset - data.limit, data.namespace, data.user, -1, mw.message('prevn', data.limit).text());
		const next = end >= changes.length ? mw.message('nextn', data.limit).text() : link(config, data.limit, data.offset + data.limit, data.namespace, data.user, -1, mw.message('nextn', data.limit).text());

		const range = mw.message('showingresultsinrange', (end > changes.length ? changes.length : end) - data.offset, start, (end > changes.length ? changes.length : end)).text();
		const pipeSeparator = mw.message('pipe-separator').text();
		const nav = mw.message(
			'viewprevnext',
			prev,
			next,
			link(config, 20, data.offset, data.namespace, data.user, data.limit) + pipeSeparator +
			link(config, 50, data.offset, data.namespace, data.user, data.limit) + pipeSeparator +
			link(config, 100, data.offset, data.namespace, data.user, data.limit) + pipeSeparator +
			link(config, 250, data.offset, data.namespace, data.user, data.limit) + pipeSeparator +
			link(config, 500, data.offset, data.namespace, data.user, data.limit)
		).text();

		form.after(
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