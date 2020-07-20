/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

// <syntaxhighlight lang="JavaScript">

function liveClock() {
	var link = wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent( wgPageName ) + '&action=purge';
	if ( skin === 'monobook' ) {
		$( '#p-personal .pBody ul' ).append( '<li id="utcdate"><a href="' + link + '"></a></li>' );
	} else if ( skin === 'oasis' ) {
		$( '#WikiaPage #WikiHeader div.buttons' ).prepend( '<div id="utcdate"><a href="' + link + '"></a></div>' );
	}
	$( '#utcdate' ).css( { fontSize: 'larger', fontWeight: 'bolder', textTransform: 'none' } );

	showTime();
}
$( liveClock );

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

// </syntaxhighlight>

/*==================================================*/
 
<script type="text/javascript">

<!--

// Version 0 - No deleting of name or pw (best for handys)

// Version 1 - Deleting name and pw with uni selection

// Version 2 - Deleting name with click on name - Best for FF and IE (8)

var IkariamBoardLogin = 2

function changeAction(type) {

if(document.loginForm.uni_url.value != '') { /// alert (type)

if ((type == 'change') & (IkariamBoardLogin == 1)) {

document.loginForm.name.value = ""

document.loginForm.password.value = ""

}

document.loginForm.action = 'http://' + document.loginForm.uni_url.value + '/?action=loginAvatar&function=login';

} else {

if(type == 'login') {

alert('Proszę wybrać serwer!');

}

}

}

function changeLogin(obj) {//alert("test")

if (IkariamBoardLogin == 2) {

obj.value = ""

}

}

-->

</script>