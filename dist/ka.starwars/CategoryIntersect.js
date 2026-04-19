/**
 * სკრიპტი კატეგორიებში ამატებს ღილაკებს, რომლებიც იძლევა სხვადასხვა (კანონიკური/ლეგენდების/არაკანონიკური/ლეგენდების არაკანონიკური) უწყვეტობის თემების სტატიების დამალვის/ჩვენების

 * 
 * გამოიყენება OOUI და MediaWiki ძირითადი JS, დეტალებისთვის იხ. https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui and https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw .
 */
$(function () {
	'use strict';

	if (mw.config.get('wgAction') === 'view') {
		const title = 'კატეგორიების გადაკვეთა';
		const intersectionPage = 'Special:BlankPage/CategoryIntersection';
		const searchParams = new URLSearchParams(location.search);
		const pageName = mw.config.get('wgPageName');
		const isCategoryPage = mw.config.get('wgNamespaceNumber') === mw.config.get('wgNamespaceIds').category && !mw.config.get('wgTitle').match('^(?:ლეგენდების|კანონიკური) სტატიები$');
		const isResultsPage = pageName === intersectionPage && Array.from(searchParams.keys()).filter(function (param) {
			return param === 'category1' || param === 'category2' || param === 'category3';
		}).length === 3;
		const isFormPage = pageName === intersectionPage && !isResultsPage;
		
		// კატეგორიების გვერდებზე ბმულების დამატება
		if (isCategoryPage) {
			const category = mw.config.get('wgTitle').replaceAll(' ', '_');
			const baseUrl = '/ka/wiki/' + intersectionPage + '?category1=' + category;
			const canonUrl = baseUrl + '&category2=სტატიები_კანონიკურ_საკითხებზე&category3=';
			const legendsUrl = baseUrl + '&category2=სტატიები_ლეგენდების_საკითხებზე&category3=';
			const noncanonUrl = baseUrl + '&category2=სტატიები_არაკანონიკურ_საკითხებზე&category3=';
       	    const noncanonlegendsUrl = baseUrl + '&category2=სტატიები_ლეგენდების_არაკანონიკურ_საკითხებზე&category3=';
			var filters = '<div class="dpl-filter-container">';
			filters += '<a href="' + baseUrl + '">კატეგორიების გადაკვეთა</a>';
			filters += '<ul>';
			filters += '<li>';
			filters += '<a href="' + canonUrl + '" title="მხოლოდ კანონთან დაკავშირებული სტატიები">';
			filters += '<img alt="მხოლოდ კანონთან დაკავშირებული სტატიები" src="/ka/wiki/Special:FilePath/Premium-Eras-canon.png" decoding="async">';
			filters += '</a>';
			filters += '</li>';
			filters += '<li>';
			filters += '<a href="' + legendsUrl + '" title="მხოლოდ ლეგენდებთან დაკავშირებული სტატიები">';
			filters += '<img alt="მხოლოდ ლეგენდებთან დაკავშირებული სტატიები" src="/ka/wiki/Special:FilePath/Premium-Eras-legends.png" decoding="async">';
			filters += '</a>';
			filters += '</li>';
			filters += '<a href="' + noncanonUrl + '" title="მხოლოდ არაკანონიკურ საკითხებთან დაკავშირებული სტატიები">';
			filters += '<img alt="მხოლოდ არაკანონიკურ საკითხებთან დაკავშირებული სტატიები" src="/ka/wiki/Special:FilePath/Premium-Eras-NCC.png" decoding="async">';
			filters += '</a>';
			filters += '</li>';
			filters += '<a href="' + noncanonlegendsUrl + '" title="მხოლოდ ლეგენდების არაკანონიკურ საკითხებთან დაკავშირებული სტატიები">';
			filters += '<img alt="მხოლოდ ლეგენდების არაკანონიკურ საკითხებთან დაკავშირებული სტატიები" src="/ka/wiki/Special:FilePath/Premium-Eras-NCL.png" decoding="async">';
			filters += '</a>';
			filters += '</li>';
			filters += '</ul>';
			filters += '</div>';
			$('.mw-parser-output').append(filters);
		}
		
		// შედეგების გვერდი
		if (isResultsPage) {
			const pageUrl = window.location.origin + window.location.pathname;
			const category1 = searchParams.get('category1').replaceAll(' ', '_');
			const category2 = searchParams.get('category2').replaceAll(' ', '_');
			const category3 = searchParams.get('category3').replaceAll(' ', '_');
			const includeSubcats = searchParams.get('includeSubcats');

			document.title = title;
			$('#firstHeading').html(title);
			$('#firstHeading + .page-header__page-subtitle').append('<br />&lt; <a href="' + pageUrl + '">კატეგორიების გადაკვეთის ახალი მოთხოვნა</a>');
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
					"mediawiki.action.view.categoryPage.styles",
					"mediawiki.action.styles",
				]
			}).then(function () {
				try {
					$('#mw-content-text').append($.createSpinner({
						size: 'large',
						type: 'block'
					}));
				} catch (error) {
					console.warn("ბრუნვის შექმნისას დაფიქსირდა შეცდომა");
				}
				return Promise.resolve();
			});

			// DPL-ის მოთხოვნის შექმნა
			const count = 200;
			var currentPage = Number.parseInt(searchParams.get('page')) || 1;
			if (!Number.isInteger(currentPage) || currentPage < 1) currentPage = 1;
			const offset = (currentPage - 1) * count;
			var sc = '';
			var scParam = '';
			if (includeSubcats && includeSubcats !== "false") {
				sc = '**';
				scParam = '&includeSubcats=1';
			}
			const headerTitle = '==გვერდები კატეგორიებში "[[:Category:' + category1 + '|' + category1.replaceAll('_', ' ') + ']]" და "[[:Category:' + category2 + '|' + category2.replaceAll('_', ' ') + ']]".==';
			const basePaginationLink = pageUrl + '?category1=' + encodeURIComponent(category1) + '&category2=' + encodeURIComponent(category2) + '&category3=' + encodeURIComponent(category3) + scParam;
			const previousLink = currentPage > 1 ? '[' + basePaginationLink + '&page=' + (currentPage - 1) + ' წინა გვერდი]' : 'წინა გვერდი';
			const nextLink = '[' + basePaginationLink + '&page=' + (currentPage + 1) + ' შემდეგი გვერდი]';
			const headerLinks = '{{#ifeq:{{#expr:%TOTALPAGES%>' + count + '}}|1|(' + previousLink + ') ({{#ifeq:{{#expr:%TOTALPAGES%>' + (offset + count) + '}}|1|' + nextLink + '|შემდეგი გვერდი}})|}}';
			var dpl = '<DPL>\n';
			dpl += '  category = ' + sc + category1 + '\n';
			dpl += '  category = ' + sc + category2 + '\n';
			dpl += '  category = ' + sc + category3 + '\n';
			dpl += '  count = ' + count + '\n';
			dpl += '  offset = ' + offset + '\n';
			dpl += '  mode = category\n';
			dpl += '  noresultsheader = \\n' + headerTitle + '\\n\'\'ეს კატეგორიები ამჟამად არ შეიცავს საერთო გვერდებს.\'\'\n';
			dpl += '  oneresultheader = \\n' + headerTitle + '\\nეს კატეგორიები მხოლოდ შემდეგ საერთო გვერდს შეიცავს.\n';
			dpl += '  ordermethod = sortkey\n';
			dpl += '  resultsfooter = ' + headerLinks + '\n';
			dpl += '  resultsheader = \\n' + headerTitle + '\\nეს %PAGES% გვერდები ამ კატეგორიებში საერთოდ, სულ ნაპოვნია <span class="dpl-total-pages">%TOTALPAGES%</span>.\\n\\n' + headerLinks + '\n';
			dpl += '</DPL>';

			// API-დან შედეგების მოპოვება
			const apiPromise = new mw.Api().post({
				action: 'parse',
				format: 'json',
				title: title,
				text: dpl,
				contentformat: 'text/x-wiki',
				contentmodel: 'wikitext'
			}).catch(function (code, result) {
				if (code === 'http') {
					$('#mw-content-text').html('<p>გადაკვეთის შედეგების მოძიებისას შეცდომა HTTP-ში: ' + result.textStatus + '</p>');
				} else {
					$('#mw-content-text').html('<p>გადაკვეთის შედეგების მოძიებისას შეცდომა API-ში: ' + result.error.info + '</p>');
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
					pagination += '<b>გადასვლა:</b> ';
					if (currentPage > 2 && startPage > 1) {
						pagination += '<a href="' + basePaginationLink + '" aria-label="გვერდი 1">1</a>';
						pagination += startPage > 2 ? pageSeparator : ' ';
					}
					for (var page = startPage; page <= endPage; page++) {
						pagination += '<a href="' + basePaginationLink + '&page=' + page + '" aria-label="გვერდი ' + page + (page === currentPage ? ' (ეს გვერდი)' : '') + '">' + (page === currentPage ? '<b>' + page + '</b>' : page) + '</a> ';
					}
					if (currentPage < maxPage - 1 && endPage < maxPage) {
						pagination += endPage < maxPage - 1 ? pageSeparator : ' ';
						pagination += '<a href="' + basePaginationLink + '&page=' + maxPage + '" aria-label="გვერდი ' + maxPage + '">' + maxPage + '</a>';
					}
					pagination += '</div>';
					$('#mw-content-text').prepend(pagination);
				}
			});
		}
		
		// ნებისმიერი კატეგორიის ფორმის გადაკვეთა
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
				for (var index = 1; index <= 3; index++) {
					form.addItems([
						new OO.ui.FieldLayout(new mw.widgets.TitleInputWidget({
							id: 'dpl-cat' + index,
							name: 'category' + index,
							namespace: 14,
							required: false,
							value: searchParams.has('category' + index) ? searchParams.get('category' + index).replaceAll('_', ' ') : undefined,
							$overlay: true
						}), {
							label: 'კატეგორია:',
							align: 'ზედა'
						}),
					]);
				}
				form.addItems([
					new OO.ui.FieldLayout(new OO.ui.CheckboxInputWidget({
						id: 'dpl-subcats',
						name: 'includeSubcats',
						required: false,
						selected: true,
						value: 'true',
					}), {
						label: 'გავითვალისწინოთ ქვეკატეგორიები?',
						align: 'inline'
					})
				]);
				form.addItems([
					new OO.ui.FieldLayout(new OO.ui.ButtonInputWidget({
						type: 'submit',
						label: 'გადასვლა',
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