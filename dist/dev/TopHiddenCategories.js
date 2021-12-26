$( function() {
function init(i18n) {
	var cats = [];
	new mw.Api().get({
		action: "query",
		prop: "categories",
		titles: mw.config.get("wgPageName"),
		clprop: "hidden",
		cllimit: 500,
		format: "json",
		formatversion: 2
	}).done(function(data){
		data.query.pages[0].categories.forEach(function(category){
			if (category.hidden) {
				cats.push(category.title);
			}
		});
		if (cats.length > 0) {
			$('.page-header__meta .page-header__categories').after(
				$('<div>', {'class': 'page-header__categories', id: 'top-hidden-categories'}).prepend(
					$('<span>', {'class': 'page-header__categories-in', text: i18n.msg('hidden').plain()+': '})
				).css({'filter': 'opacity(0.9)', 'z-index': '2'})
			);
			$('#top-hidden-categories').append(
				$('<a>', { 'class': 'mw-redirect', href: mw.util.getUrl(cats[0]), title: cats[0], text: cats[0].replace('Category:','') } )
			);
			if (cats.length < 4) {
				for (i = 1; i < cats.length; i++) {
					$('#top-hidden-categories').append(
						(', '), $('<a>', { 'class': 'mw-redirect', href: mw.util.getUrl(cats[i]), title: cats[i], text: cats[i].replace('Category:','') } )
					);	
				}	
			} else {
				$('#top-hidden-categories').append(
						(', '), $('<a>', { 'class': 'mw-redirect', href: mw.util.getUrl(cats[1]), title: cats[1], text: cats[1].replace('Category:','') } )
				);
				$('#top-hidden-categories').append(
					$('<div>', { 'class': 'wds-dropdown page-header__categories-dropdown'}).append(
						('&nbsp;'+i18n.msg('and').plain()+' '), $('<a>', {'class': 'wds-dropdown__toggle', text: i18n.msg('more', (cats.length-2)).plain() }),
						$('<div>', {'class': 'wds-dropdown__content page-header__categories-dropdown-content wds-is-left-aligned'}).append(	
							$('<ul>', { id: 'top-hidden-cat-dropdown', 'class': 'wds-list wds-is-linked'}) 
						)
					)
				);
				for (i = 2; i < cats.length; i++) {
					$('#top-hidden-cat-dropdown').append(
						$('<li>').append(
							 $('<a>', { 'class': 'mw-redirect', href: mw.util.getUrl(cats[i]), title: cats[i], text: cats[i].replace('Category:','') } )
						)
					);
				}
			}
		}
	});

}

mw.hook('dev.i18n').add(function (i18n) {
	i18n.loadMessages('TopHiddenCategories').then(init);
});

importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });	
} );