$( function() {

if (!$("body").hasClass("action-view")) return false;

var tu = [];
var tu2= [];
var api = new mw.Api();

function getAll(start) {
	return api.get({
		action: "query",
		prop: "templates",
		titles: mw.config.get("wgPageName"),
		tlcontinue: start,
		tllimit: '500',
		format: "json",
		formatversion: 2
	}).done(function(data){
		if (!Object.hasOwn(data.query.pages[0], 'templates')) return;
		data.query.pages[0].templates.forEach(function(tem){
			if ((tem.ns === 10) || (tem.ns === 828)) tu.push(tem.title);
			else tu2.push(tem.title);
		});
		if (typeof data.continue !== 'undefined') getAll(data.continue.tlcontinue);
	});
}

function init(i18n) {
	
$.when( 
	getAll('||')
).done(function() {
	$.merge( tu, tu2 );
	var container = ($('.page__right-rail div.right-rail-wrapper').length > 0) ? '.page__right-rail div.right-rail-wrapper' : '.page .page-footer';
	$(container).prepend(
		$('<div>', {
			id: 'TU-Module',
			'class': 'rail-module wds-collapsible-panel wds-is-collapsed' 
		}).css('padding-bottom', '10px').prepend(
			$('<h2>', { 
				'class': 'wds-collapsible-panel__header',
				text: i18n.msg('templatesused').plain()
			}).css({
				'padding': '5px 0',
				'margin-left': '0',
				'margin-right': '15px',
				'display': 'inline-flex'
			}).append(
				$('<svg class="wds-icon wds-icon-tiny wds-collapsible-panel__chevron"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg>')),
			$('<div>', { 'class': 'wds-collapsible-panel__content'}).prepend(
				$('<ul>').css('font-size', '13px')
			)
		)
	);
	for (i = 0; i < tu.length; i++) {
		$('#TU-Module .wds-collapsible-panel__content ul').append(
			$('<li>').append(
				$('<a>',{
					href: mw.util.getUrl(tu[i]),
					text: tu[i]
				})
			)
		);
	}
});

}

mw.hook('dev.i18n').add(function (i18n) {
	i18n.loadMessages('TemplatesUsedModule').then(init);
});

importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });	
} );