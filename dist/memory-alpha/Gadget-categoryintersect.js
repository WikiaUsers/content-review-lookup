'use strict';
(() => {
	const config = mw.config.values;
	const api = new mw.Api({parameters: {
		action: 'query',
		format: 'json',
		formatversion: 2,
		errorformat: 'plaintext',
		uselang: config.wgUserLanguage,
	}});
	const title = 'Category intersection';
	const intersectionPage = 'Special:BlankPage/CategoryIntersection';
	const searchParams = new URLSearchParams(location.search);
	const pageName = config.wgPageName;
	const isResultsPage = pageName === intersectionPage && Array.from(searchParams.keys()).filter(param => param === 'category1' || param === 'category2').length === 2;
	const isFormPage = pageName === intersectionPage && !isResultsPage;
	const contentText = $('#mw-content-text');

	// Add links to category pages
	if (config.wgNamespaceNumber === config.wgNamespaceIds.category) {
		const category = config.wgTitle.replaceAll(' ', '_');
		const baseUrl = `/wiki/${intersectionPage}?category1=${category}`;
		const filters = `<li><a href="${baseUrl}">Category intersection</a></li>`;
		$('#p-cactions .wds-list').append(filters);
	}

	// Results page
	if (isResultsPage) {
		const pageUrl = location.href;
		const category1 = searchParams.get('category1').replaceAll(' ', '_');
		const category2 = searchParams.get('category2').replaceAll(' ', '_');

		document.title = title;
		$('#firstHeading').html(title);
		$('#firstHeading + .page-header__page-subtitle').append(`<br>&lt; <a href="${pageUrl}">New category intersection query</a>`);
		contentText.empty();
		contentText.append($.createSpinner({
			size: 'large',
			type: 'block',
		}));

		// Build DPL query
		const count = 200;
		let currentPage = Number.parseInt(searchParams.get('page')) || 1;
		if (!Number.isInteger(currentPage) || currentPage < 1) currentPage = 1;
		const offset = (currentPage - 1) * count;
		const headerTitle = `== Pages in categories "[[:Category:${category1}|${category1.replaceAll('_', ' ')}]]" and "[[:Category:${category2}|${category2.replaceAll('_', ' ')}]]" ==`;
		const basePaginationLink = `${pageUrl}?category1=${encodeURIComponent(category1)}&category2=${encodeURIComponent(category2)}`;
		const previousLink = currentPage > 1 ? `[${basePaginationLink}&page=${currentPage - 1} previous page]` : 'previous page';
		const nextLink = `[${basePaginationLink}&page=${currentPage + 1} next page]`;
		const headerLinks = `{{#ifexpr:%TOTALPAGES%>${count}|(${previousLink}) ({{#ifexpr:%TOTALPAGES%>${offset + count}|${nextLink}|next page}})}}`;
		let dpl = [
			'<dpl>',
			`category = ${category1}`,
			`category = ${category2}`,
			`count = ${count}`,
			`offset = ${offset}`,
			'mode = category',
			`noresultsheader = \\n${headerTitle}\\n''These categories currently contain no pages in common.''`,
			`oneresultheader = \\n${headerTitle}\\nThese categories contain only the following page in common.`,
			'ordermethod = sortkey',
			`resultsfooter = ${headerLinks}`,
			`resultsheader = \\n${headerTitle}\\nThe following %PAGES% pages are common to these categories, out of <span class="dpl-total-pages">%TOTALPAGES%</span> total.\\n\\n${headerLinks}`,
			'</dpl>',
		];
		dpl = dpl.join('\n');

		// Get results from API
		api.get({
			action: 'parse',
			text: dpl,
			disableeditsection: true,
			contentmodel: 'wikitext',
			prop: 'text',
		}).then(result => {
			contentText.html(result.parse.text);
			contentText.find('a[target="_blank"]').removeAttr('target');
			const totalPages = Number.parseInt(contentText.find('.dpl-total-pages').eq(0).html()) || 0;
			if (totalPages <= count) {
				return;
			}
			const pagesToShow = 21;
			const pagesLeft = Math.round(pagesToShow / 2) - 1;
			const pagesRight = pagesToShow % 2 === 0 ? Math.round(pagesToShow / 2) : Math.round(pagesToShow / 2) - 1;
			const maxPage = Math.ceil(totalPages / count);
			let startPage, endPage;
			if (maxPage >= pagesToShow) {
				if (currentPage <= pagesLeft) {
					startPage = 1;
					endPage = pagesToShow;
				} else if (currentPage >= maxPage - pagesLeft) {
					startPage = maxPage - pagesToShow + 1;
					endPage = maxPage;
				} else {
					startPage = currentPage - pagesLeft;
					endPage = currentPage + pagesRight;
				}
			} else {
				startPage = 1;
				endPage = maxPage;
			}
			const pageSeparator = ' <b>·</b> ';
			let pagination = '<div class="dpl-pagination">';
			pagination += '<b>Go to page:</b> ';
			if (currentPage > 2 && startPage > 1) {
				pagination += `<a href="${basePaginationLink}" aria-label="Page 1">1</a>`;
				pagination += startPage > 2 ? pageSeparator : ' ';
			}
			for (let page = startPage; page <= endPage; page++) {
				pagination += `<a href="${basePaginationLink}&page=${page}" aria-label="Page ${page + (page === currentPage ? ' (current)' : '')}">${(page === currentPage ? `<b>${page}</b>` : page)}</a> `;
			}
			if (currentPage < maxPage - 1 && endPage < maxPage) {
				pagination += endPage < maxPage - 1 ? pageSeparator : ' ';
				pagination += `<a href="${basePaginationLink}&page=${maxPage}" aria-label="Page ${maxPage}">${maxPage}</a>`;
			}
			pagination += '</div>';
			contentText.prepend(pagination);
		}, (code, result) => {
			if (code === 'http') {
				contentText.html(`<p>HTTP error fetching intersection results: ${result.textStatus}</p>`);
			} else {
				contentText.html(`<p>API error fetching intersection results: ${result.error.info}</p>`);
			}
		});
	}

	// Intersect any category form
	if (isFormPage) {
		document.title = title;
		$('#firstHeading').html(title);
		contentText.empty();
		const form = new OO.ui.FormLayout({method: 'get'});
		for (let index = 1; index <= 2; index++) {
			form.addItems([
				new OO.ui.FieldLayout(new mw.widgets.TitleInputWidget({
					id: `dpl-cat${index}`,
					name: `category${index}`,
					namespace: 14,
					required: true,
					value: searchParams.has(`category${index}`) ? searchParams.get(`category${index}`).replaceAll('_', ' ') : undefined,
					$overlay: true,
				}), {
					label: 'Category:',
					align: 'top',
				}),
			]);
		}
		form.addItems([new OO.ui.FieldLayout(new OO.ui.ButtonInputWidget({
			type: 'submit',
			label: 'Go',
			value: 'Go',
			flags: [
				'primary',
				'progressive',
			],
			classes: ['mw-htmlform-submit'],
		}))]);
		const panel = new OO.ui.PanelLayout({
			expanded: false,
			$content: form.$element,
		});
		contentText.append(panel.$element);
	}
})();

// {{JavaScript category}}