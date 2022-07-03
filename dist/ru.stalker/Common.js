// Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// <nowiki>

/* Переменные */
window.InactiveUsers = {text: 'Неактивен'};

/**
 * Локальная функция загрузки скриптов с поддержкой указания проекта
 */
var importScript_ = importScript;
importScript = function (page, proj) {
	if (!proj) {
		importScript_(page);
	} else {
		if (proj.indexOf( '.' ) === -1) {
			proj += '.fandom.com';
		}
		mw.loader.using('mediawiki.util').done( function () {
			mw.loader.load('//' + proj + '/wiki/' + mw.util.wikiUrlencode(page) + '?action=raw&ctype=text/javascript');
		});
	}
};

/**
 * Часто те или иные манипуляции со страницей нужно выполнить как можно раньше, но нет гарантии, что
 * к моменту выполнения кода нужный участок DOM готов, а событие полной загрузки страницы происходит
 * слишком поздно. В этой функции проверяется наличие элемента $testElement и в случае успеха
 * функция-колбэк выполняется, иначе же её выполнение поручается другой функции. Если элемент
 * в $testElement имеет содержимое, правильнее указать следующий за ним элемент, чтобы быть
 * уверенным, что он загрузился до конца.
 */
window.runAsEarlyAsPossible = function (callback, $testElement, func) {
	func = func || $;
	$testElement = $testElement || $('.page-footer');

	if ($testElement.length) {
		callback();
	} else {
		func(callback);
	}
};

/**
 * Загрузка стилей, скриптов и гаджетов, указанных в URL
 * См. также: https://www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 */
mw.loader.using( ['mediawiki.util'], function () {
	var withCSS    = mw.util.getParamValue('withcss'),
		withJS     = mw.util.getParamValue('withjs'),
		withGadget = mw.util.getParamValue('withgadget');

	if (withCSS) {
		mw.loader.load( '/ru/wiki/MediaWiki:' + mw.util.wikiUrlencode(withCSS) + '.css?action=raw&ctype=text/css', 'text/css' );
	}
	
	if (withJS) {
		mw.loader.load( '/ru/wiki/MediaWiki:' + mw.util.wikiUrlencode(withJS) + '.js?action=raw&ctype=text/javascript' );
	}
	
	if (withGadget) {
		mw.loader.load( 'ext.gadget.' + mw.util.wikiUrlencode(withGadget) );
	}
});


/**
 * Код, который нужно выполнить как можно раньше. Он выполняется, если загружен подвал страницы,
 * иначе же ждёт наступления события wikipage.content (см. выше определение runAsEarlyAsPossible
 * и ниже про wikipage.content).
 */
runAsEarlyAsPossible(function () {

	/**
	 * {{executeJS}}
	 */
	var namesExempt = {};
	$('.executeJS').each( function () {
		var names = $(this).data('scriptnames');
		if (names) {
			names.split(' ').forEach(function (name) {
				name = name.replace( /[^\w_-]/g, '' );
				if (name && !namesExempt[name]) {
					namesExempt[name] = true;
					importScript('MediaWiki:Script/' + name + '.js');
				}
			} );
		}
	} );
	
	// Очистка кэша по клику (без перехода на страницу очистки кэша)
	$('.purgelink a, #ca-purge').click( function (e) {
		mw.loader.using([
			'mediawiki.api', 
			'mediawiki.util' 
		]).done( function () {
			var pageName = $(this).parent('.purgelink').data('pagename') || mw.config.get('wgPageName');
			new mw.Api().post({
				action: 'purge',
				titles: pageName
			}).then( function () {
				var url = mw.util.getUrl(pageName);
				if (e.ctrlKey) {
					if ( !window.open(url) ) {
						location.assign(url);
					}
				} else {
					location.assign(url);
				}
			}, function () {
				new BannerNotification('Не удалось очистить кэш.', 'error').show();
			} );
			e.preventDefault();
		} );
	} );


}, $('.page-footer'), mw.hook('wikipage.content').add );

/**
 * Код, выполняемый по событию wikipage.content (его обработчики выполняются раньше колбэков для $,
 * хотя в глубине это одно и то же событие, просто колбэк, инициирующий wikipage.content, становится
 * в очередь раньше). Так как wikipage.content инициируется после обновления страницы в результате
 * Ajax-запросов (например, гаджетом динамической навигации), не добавляйте сюда коды, которые
 * должны гарантированно выполниться не более одного раза на странице.
 */
mw.hook('wikipage.content').add( function () {
	$('#toc h2 svg').remove();
});

// Число раскрытых по умолчанию навигационных шаблонов, 
// если им задан параметр autocollapse. 
mw.hook( 'wikipage.collapsibleContent' ).add( function() {
	if ( 
		$('.navbox-inner.mw-collapsed').length == 1
	) {
		$('.navbox-autocollapse > tbody > tr:first-child .mw-collapsible-toggle').click();
	}
});

// </nowiki>