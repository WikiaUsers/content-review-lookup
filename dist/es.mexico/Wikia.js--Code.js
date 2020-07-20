{{:MediaWiki:Common.js/Code.js}}
/*<pre> MediaWiki:Wikia.js v1.31 */
/* Sin popup de crear artículo */
window.WikiaDisableDynamicLinkCreatePagePopup = true;
/*SkinNotification: Agrega una notificación para los que usen oasis. */
window.SkinNotification = {
	article: 'Méxicoteca:Acerca del cambio de apariencia de Méxicoteca',
	key: 'NfSkin',
	init: function() {
		if (!document.cookie || document.cookie.length == 0) return;
		var pref = $.cookies.get(SkinNotification.key);
		if (pref) return;
		SkinNotification.render();
	},
	render: function() {
		var tb = $('#WikiaFooter').children('div.toolbar');
		if (!tb.exists()) return;
		var nf = $('#WikiaNotifications');
		if (!nf.exists()) {
			tb.prepend('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>');
			nf = $('#WikiaNotifications');
			$(document.body).addClass('notifications');
		}
		var sn = $('<li><div data-type="100"><a class="sprite close-notification"></a>Wikia ha forzado el cambio de apariencia a Méxicoteca. Descubre <a href="'+mw.config.get('wgArticlePath').replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'">cómo volver a verla como antes</a>.</div></li>');
		nf.append(sn);
		sn.find('a.sprite').eq(0).click(SkinNotification.dismiss);
	},
	dismiss: function(e) {
		$(this).parents('li').eq(0).remove();
		$.cookies.set(SkinNotification.key,'1',{hoursToLive:8640});
	}
};

function agregarEnlaceSkinMenu() {
	if (!window.SkinPropagation) return;
	var url = SkinPropagation.parseURL(window.location.href);
	url.query.useskin = 'monobook';
	var surl = SkinPropagation.getURL(url);
	var a = $('<a></a>').text('Usar Monobook').attr({'class':'subnav-2a', title:'Ver Méxicoteca con la piel Monobook', href:surl, id:'mn-changeskin'}).wrap('<li></li>');
	$('#WikiHeader').children('nav').children('ul').children('li').eq(0).children('ul').append(a.parent());
	a.bind('click', function() {
		return confirm('La apariencia cambiará temporalmente a Monobook, el estilo anterior, pero con muchas más funcionalidades y más accesible. Si quieres volverlo a ver como ahora tendrás que quitar el useskin=monobook que aparece en la barra de direcciones del navegador.');
	});
}

function sinCategorySwitch() {
	if (!mw.config.get('wgUserName', false)) {
		appendCSS('#CategorySelectAdd {display:none;}');
	}
}

function extrasPaginasUsuario() {
	var ns = mw.config.get('wgNamespaceNumber');
	if (ns == 2 || ns == 3 || mw.config.get('wgCanonicalSpecialPageName', '') == 'Contributions') {
		// Etiquetas de permisos adicionales
		importScript('MediaWiki:Wikia.js/userRightsIcons.js');

		// Etiqueta para usuarios inactivos por mas de 3 meses
		window.InactiveUsers = (window.InactiveUsers || { text: 'Inactivo' });
		importScriptPage('InactiveUsers/code.js', 'dev');
	}
}

function Méxicoteca_WikiaSkinLoad() {
	var ug = '', loadsafe = (typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$);
	if (mw.config.get('wgUserGroups')) {
		ug = mw.config.get('wgUserGroups').join(',').toLowerCase();
	}
	if (ug.indexOf('s'+'taf'+'f') == -1 && ug.indexOf('h'+'elp'+'er') == -1) {
		loadsafe(SkinNotification.init);
		loadsafe(agregarEnlaceSkinMenu);
		loadsafe(sinCategorySwitch);
		loadsafe(extrasPaginasUsuario);
		loadsafe(function() { // Restaura la funcionalidad del formulario de subida de archivos. This does not block core functionality
			$('#WikiaRail').on('click', '.upphotos', function(e) {if (e.target && e.target.href) { document.location.href = e.target.href; return false;}});
		});
		loadsafe(function() { // Reescribe el enlace de crear artículo para que apunte a la ayuda. This does not block core functionality
			$('#WikiaPage').find('a.createpage').unbind('click').attr('href', mw.config.get('wgArticlePath').replace('$1', 'Ayuda:Crear_un_artículo'));
		});
		loadsafe(function() { // Quita popup "create page" en páginas inexistentes
			$('#mw-content-text').children('div.noarticletext').find('a').unbind();
		});
		if (mw.config.get('wgNamespaceNumber') == 6) {
			loadsafe(function() { // Wikia ha cambiado el texto del título de las imágenes. Restaurando...
				$('#WikiaPageHeader').find('h1').eq(0).text(mw.config.get('wgPageName').replace(/_/g, ' '));
			});
		}
	}
}

// Parche para la búsqueda
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
	var f = $('#WikiaSearch');
	if (f && f.attr('action') && f.attr('action').indexOf('index.php') == 0) {
		f.attr('action', mw.config.get('wgScript'));
		f.prepend('<input type="hidden" name="title" value="Especial:Buscar"/>');
	}
});

// Reportar páginas en blanco
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(function() {
	if ($('#mw-content-text').children(':not(noscript)').length == 0) {
		mw.config.set('varnish_stat', $.cookie('varnish-stat'));
		importScript('MediaWiki:Common.js/Clases/ReportBlankPages.js');
	}
});

// Wikia no carga jquery.ui.theme.css. Hacemos que se cargue cuando RL haya cargado jquery.ui.core
(function() {
	var loadJQueryCoreCssOnDemand = function () {
		var loadState = mw.loader.getState('jquery.ui.core');
		if (loadState !== null) {
			if (loadState == 'ready') {
				mw.loader.load( mw.config.get('wgResourceBasePath') + '/resources/jquery.ui/themes/default/jquery.ui.theme.css', 'text/css' );
			} else {
				window.setTimeout(loadJQueryCoreCssOnDemand, 1000);
			}
		}
	};

	(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(loadJQueryCoreCssOnDemand);
})();

try {
	if (window.CreaEnlacesWiki) {
		CreaEnlacesWiki.registerRenderFn(function() {
			// Agregando loading por lazyload de rail
			$('#LatestPhotosModule').add('#WikiaRail > .loading').eq(0).before('<section class="CreaEnlacesWikiModule module" id="CreaEnlacesWikiModule"><h1>Enlaces a otras Wikis</h1><ul></ul></section>');
		});
		CreaEnlacesDex.registerLinkFn(function(url, text, caption) {
			$('#CreaEnlacesWikiModule').find('ul').eq(0).append($('<li></li>').append($('<a class="external"></a>').attr({href:url, title:caption}).text(text)));
		});
		(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(CreaEnlacesWiki.init);
	}
} catch(e) {
	typeof(window.trataError)=='function'&&trataError(e);
}

try {
	Méxicoteca_WikiaSkinLoad();
} catch(e) {
	typeof(window.trataError)=='function'&&trataError(e);
}
/*</pre>*/