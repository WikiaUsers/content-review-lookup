function showTime() {
	var	now = new Date(),
		hh = now.getUTCHours(),
		mm = now.getUTCMinutes(),
		ss = now.getUTCSeconds(),
		dd = now.getUTCDate(),
		months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		month  = months[now.getUTCMonth()],
		year   = now.getUTCFullYear(),
		time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss ) + ', ' + ( dd < 10 ? '0' + dd : dd ) + ' ' + month + ' ' + year + ' (UTC)';
	$( '#utcdate a' ).text( time );

	window.setTimeout( showTime, 1000 );
}

function liveClock() {
	var link = wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent( wgPageName ) + '&action=purge';
	if ( skin === 'monobook' ) {
		$( '#p-personal .pBody ul' ).append( '<li id="utcdate"><a href="' + link + '"></a></li>' );
	} else if ( skin === 'oasis' ) {
		$( '#GlobalNavigation' ).prepend( '<li id="utcdate" style="float:right;"><a href="' + link + '"></a></li>' );
	}
	$( '#utcdate' ).css( { fontSize: 'smaller', fontWeight: 'bolder', textTransform: 'none' } );

	showTime();
}
if (wgUserName) {
importStylesheetPage('MediaWiki:Common.css/Clock.css');
	$( liveClock );
}