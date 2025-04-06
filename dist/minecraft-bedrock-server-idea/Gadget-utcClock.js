var i18n = {
	en: {
		linkTitle: 'Click to purge the server cache for the current wiki page'
	},
	ar: {
		linkTitle: 'انقر لمسح ذاكرة التخزين المؤقت للخادم لصفحة الويكي الحالية'
	},
	de: {
		linkTitle: 'Klicke hier, um den Server-Cache der aktuellen Seite zu leeren'
	},
	es: {
		linkTitle: 'Da click para limpiar el cache del server para la actual pagina de la wiki'
	},
	fr: {
		linkTitle: 'Cliquez pour purger le cache du serveur de la page actuelle du wiki'
	},
	he: {
		linkTitle: 'לחץ כדי לנקות את מטמון השרת עבור דף הוויקי הנוכחי.'
	},
	ja: {
		linkTitle: 'クリックすると現在のwikiページのサーバーキャッシュが削除されます'
	},
	pt: {
		linkTitle: 'Clique para limpar o cache do servidor para a página da wiki atual'
	},
	"pt-br": {
		linkTitle: 'Clique para limpar o cache do servidor para a página da wiki atual'
	},
	ru: {
		linkTitle: 'Щёлкните здесь, чтобы очистить кэш сервера на текущей вики-странице'
	},
	vi: {
		linkTitle: 'Bấm để xóa bộ đệm máy chủ cho trang wiki hiện tại'
	}
};

var wuL = mw.config.get( 'wgUserLanguage' );

var lang = function ( message ) {
	if( i18n[wuL] && i18n[wuL][message] ) {
		return i18n[wuL][message];
	} else if ( i18n['en'] && i18n['en'][message] ) {
		return i18n['en'][message];
	} else {
		return message;
	}
}

var linkPurge = mw.config.get( 'wgScript' ) + '?title=' + 
	encodeURIComponent( mw.config.get( 'wgPageName' ) ) + '&action=purge';

var clockStyle = 'font-weight:bolder; color:#fff; font-size:170%;';

window.showTime = function() {
	var now = new Date();
	var hh = now.getUTCHours();
	var mm = now.getUTCMinutes();
	var ss = now.getUTCSeconds();
	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
	$('.dateNode').text( time );
	var ms = now.getUTCMilliseconds();
	setTimeout( function () {
		showTime();
	}, 1100 - ms );
}

$(function() {
	$('.wikia-bar .toolbar .tools').append('<li id="gadget-utc-clock" style="width: 70px;"><a class="dateNode" style="margin: auto;" href="' + linkPurge + '" title="' + lang('linkTitle') + '"></a></li>');
	showTime();
});