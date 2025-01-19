/**
 * Adds a category intersection page using DynamicPageList and links to category pages to intersect with Canon and Legends articles.
 * 
 * Uses OOUI and MediaWiki core JS, see https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui and https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw for details. This is a modified version ported from [[w:starwars:MediaWiki:Gadget-categoryintersect.js]]
 */
$(function () {
	'use strict';

	if (mw.config.get('wgAction') === 'view') {
		const title = 'Category intersection';
		const intersectionPage = 'Special:BlankPage/CategoryIntersection';
		const searchParams = new URLSearchParams(location.search);
		const pageName = mw.config.get('wgPageName');
		const isResultsPage = pageName === intersectionPage && Array.from(searchParams.keys()).filter(function (param) {
			return param === 'category1' || param === 'category2';
		}).length === 2;
		const isFormPage = pageName === intersectionPage && !isResultsPage;

		// Add links to category pages
		if (isCategoryPage) {
			var category = mw.config.get('wgTitle').replaceAll(' ', '_');
			var baseUrl = '/wiki/' + intersectionPage + '?category1=' + category;
			var filters = '<li><a href="'+baseUrl+'">Category intersection</a></li>';
			$('#p-cactions .wds-list').append(filters);
		}
		
		// Results page
		if (isResultsPage) {
			const pageUrl = window.location.origin + window.location.pathname;
			const category1 = searchParams.get('category1').replaceAll(' ', '_');
			const category2 = searchParams.get('category2').replaceAll(' ', '_');

			document.title = title;
			$('#firstHeading').html(title);
			$('#firstHeading + .page-header__page-subtitle').append('<br />&lt; <a href="' + pageUrl + '">New category intersection query</a>');
			$('#mw-content-text').empty();

			// Style results like category page
			const importPromise = importArticles({
				type: "script",
				articles: [
					"jquery.spinner"
				]
			}, {
				type: "style",
				articles: [
					"ext.fandom.CategoryPage.category-page-mediawiki.css",
					"mediawiki.action.view.categoryPage.styles"
				]
			}).then(function () {
				$('#mw-content-text').append($.createSpinner({
					size: 'large',
					type: 'block'
				}));
				return Promise.resolve();
			});

			// Build DPL query
			const count = 200;
			var currentPage = Number.parseInt(searchParams.get('page')) || 1;
			if (!Number.isInteger(currentPage) || currentPage < 1) currentPage = 1;
			const offset = (currentPage - 1) * count;
			const headerTitle = '==Pages in categories "[[:Category:' + category1 + '|' + category1.replaceAll('_', ' ') + ']]" and "[[:Category:' + category2 + '|' + category2.replaceAll('_', ' ') + ']]"==';
			const basePaginationLink = pageUrl + '?category1=' + category1 + '&category2=' + category2;
			const previousLink = currentPage > 1 ? '[' + basePaginationLink + '&page=' + (currentPage - 1) + ' previous page]' : 'previous page';
			const nextLink = '[' + basePaginationLink + '&page=' + (currentPage + 1) + ' next page]';
			const headerLinks = '{{#ifeq:{{#expr:%TOTALPAGES%>' + count + '}}|1|(' + previousLink + ') ({{#ifeq:{{#expr:%TOTALPAGES%>' + (offset + count) + '}}|1|' + nextLink + '|next page}})|}}';
			var dpl = '<DPL>\n';
			dpl += '  category = ' + category1 + '\n';
			dpl += '  category = ' + category2 + '\n';
			dpl += '  count = ' + count + '\n';
			dpl += '  offset = ' + offset + '\n';
			dpl += '  mode = category\n';
			dpl += '  noresultsheader = \\n' + headerTitle + '\\n\'\'These categories currently contain no pages in common.\'\'\n';
			dpl += '  oneresultheader = \\n' + headerTitle + '\\nThese categories contain only the following page in common.\n';
			dpl += '  ordermethod = sortkey\n';
			dpl += '  resultsfooter = ' + headerLinks + '\n';
			dpl += '  resultsheader = \\n' + headerTitle + '\\nThe following %PAGES% pages are common to these categories, out of <span class="dpl-total-pages">%TOTALPAGES%</span> total.\\n\\n' + headerLinks + '\n';
			dpl += '</DPL>';

			// Get results from API
			const apiPromise = new mw.Api().post({
				action: 'parse',
				format: 'json',
				title: title,
				text: dpl,
				contentformat: 'text/x-wiki',
				contentmodel: 'wikitext'
			}).catch(function (code, result) {
				if (code === 'http') {
					$('#mw-content-text').html('<p>HTTP error fetching intersection results: ' + result.textStatus + '</p>');
				} else {
					$('#mw-content-text').html('<p>API error fetching intersection results: ' + result.error.info + '</p>');
				}
				return Promise.reject();
			});

			Promise.all([apiPromise, importPromise]).then(function (results) {
				$('#mw-content-text').html(results[0].parse.text['*']);
				$('#mw-content-text a[target="_blank"]').removeAttr('target');
				const totalPages = Number.parseInt($('#mw-content-text .dpl-total-pages').eq(0).html()) || 0;
				if (totalPages > count) {
					const pagesToShow = 21;
					const pagesLeft = Math.round(pagesToShow / 2) - 1;
					const pagesRight = pagesToShow % 2 === 0 ? Math.round(pagesToShow / 2) : Math.round(pagesToShow / 2) - 1;
					const maxPage = Math.ceil(totalPages / count);
					var startPage, endPage;
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
					var pagination = '<div class="dpl-pagination">';
					pagination += '<b>Go to page:</b> ';
					if (currentPage > 2 && startPage > 1) {
						pagination += '<a href="' + basePaginationLink + '" aria-label="Page 1">1</a>';
						pagination += startPage > 2 ? pageSeparator : ' ';
					}
					for (var page = startPage; page <= endPage; page++) {
						pagination += '<a href="' + basePaginationLink + '&page=' + page + '" aria-label="Page ' + page + (page === currentPage ? ' (current)' : '') + '">' + (page === currentPage ? '<b>' + page + '</b>' : page) + '</a> ';
					}
					if (currentPage < maxPage - 1 && endPage < maxPage) {
						pagination += endPage < maxPage - 1 ? pageSeparator : ' ';
						pagination += '<a href="' + basePaginationLink + '&page=' + maxPage + '" aria-label="Page ' + maxPage + '">' + maxPage + '</a>';
					}
					pagination += '</div>';
					$('#mw-content-text').prepend(pagination);
				}
			});
		}
		
		// Intersect any category form
		if (isFormPage) {
			document.title = title;
			$('#firstHeading').html(title);
			const mwContentText = $('#mw-content-text');
			mwContentText.empty();
		
			importArticles({
				type: "script",
				articles: [
					"oojs-ui-core",
					"mediawiki.widgets"
				]
			}, {
				type: "style",
				articles: [
					"oojs-ui-core.styles"
				]
			}).then(function () {
				const form = new OO.ui.FormLayout({
					method: 'get'
				});
				for (var index = 1; index <= 2; index++) {
					form.addItems([
						new OO.ui.FieldLayout(new mw.widgets.TitleInputWidget({
							id: 'dpl-cat' + index,
							name: 'category' + index,
							namespace: 14,
							required: true,
							value: searchParams.has('category' + index) ? searchParams.get('category' + index).replaceAll('_', ' ') : undefined,
							$overlay: true
						}), {
							label: 'Category:',
							align: 'top'
						}),
					]);
				}
				form.addItems([
					new OO.ui.FieldLayout(new OO.ui.ButtonInputWidget({
						type: 'submit',
						label: 'Go',
						value: 'Go',
						flags: [
							'primary',
							'progressive'
						],
						classes: [
							'mw-htmlform-submit'
						]
					}))
				]);
				const panel = new OO.ui.PanelLayout({
					expanded: false,
					$content: form.$element
				});
				mwContentText.append(panel.$element);
			});
		}
	}
});