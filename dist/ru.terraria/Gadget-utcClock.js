var i18n = {
	en: {
		linkTitle: 'Click to purge the server cache for the current wiki page'
	},
	fr: {
		linkTitle: 'Cliquer pour purger le cache du serveur pour la page actuelle du wiki'
	},
	ru: {
		linkTitle: 'Щёлкните здесь, чтобы очистить кэш сервера на текущей вики-странице'
	}
};

var wuL = mw.config.get( 'wgUserLanguage' );

var lang = function ( message ) {
	if( i18n[wuL] && i18n[wuL][message] ) {
		return i18n[wuL][message];
	} else if ( i18n['ru'] && i18n['ru'][message] ) {
		return i18n['ru'][message];
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
	$('.netbar-box.right:first').before('<div style="margin-right:1em;margin-top: -3px;"><a title="' + lang('linkTitle') + '" href="' + linkPurge + '" class="dateNode" style="' + clockStyle + '"></a></div>');
	showTime();
});