$( function() {
if ($('#top-hidden-categories').length) return;

function init(i18n) {
	var cats = [];
	function createLink(index) {
		var title = new mw.Title(cats[index]);
		return $('<a>', { href: title.getUrl(), title: title.getPrefixedText(), text: title.getMainText() } );
	}
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
				).css({'z-index': '2'})
			);
			$('#top-hidden-categories').append(
				createLink(0)
			);
			if (cats.length < 4) {
				for (i = 1; i < cats.length; i++) {
					$('#top-hidden-categories').append(
						(', '), createLink(i)
					);	
				}	
			} else {
				$('#top-hidden-categories').append(
					(', '), createLink(1), (', ')
				);
				$('#top-hidden-categories').append(
					$('<div>', { 'class': 'wds-dropdown page-header__categories-dropdown'}).append(
						(i18n.msg('and').plain()+' '), $('<a>', {'class': 'wds-dropdown__toggle', text: i18n.msg('more', (cats.length-2)).parse() }),
						$('<div>', {'class': 'wds-dropdown__content page-header__categories-dropdown-content wds-is-left-aligned'}).append(	
							$('<ul>', { id: 'top-hidden-cat-dropdown', 'class': 'wds-list wds-is-linked'}) 
						)
					)
				);
				for (i = 2; i < cats.length; i++) {
					$('#top-hidden-cat-dropdown').append(
						$('<li>').append(createLink(i))
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