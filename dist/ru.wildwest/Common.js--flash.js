/* Any JavaScript here will be loaded for all users on every page load. */
var displayFlashOverride = true

/** Embed flash movies **************************************************
 * Allows embedding of flash files in a page. Only enabled in userspace currently. 
 * See [[Template:Flash]]
 * By [[User:Olipro|Olipro]]
 */
var flashOk;

function embedFlashMovie( flashOk ) {
	mainbody = document.getElementById('bodyContent');
	mainbody.innerHTML = contentTempHolder;
	spancheck = document.getElementsByTagName('span');
	for( i = 0; i < spancheck.length; i++ ) {
		if( spancheck[i].getAttribute('id') != 'embedFlashDoc' )
			continue;
		obj = spancheck[i].innerHTML.split('@');
		flwidth = obj[0];
		flheight = obj[1];
		flfile = obj[2].replace('fullurl://', 'http://');
		showFlash = ' ';
		if( flashOk ) {
			showFlash = '<object width="' + flwidth + '" height="' + flheight + '"';
			showFlash += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
			showFlash += 'codebase="http://fpdownload.macromedia.com/pub/';
			showFlash += 'shockwave/cabs/flash/swflash.cab#version=8,0,0,0">';
			showFlash += '<param name="movie" value="' + flfile + '" />';
			showFlash += '<embed src="' + flfile + '" width="' + flwidth + '" height=';
			showFlash += '"' + flheight + '" type="application/x-shockwave-flash" ';
			showFlash += 'pluginspage="http://www.macromedia.com/go/getflashplayer" />';
			showFlash += '</object>';
		} else {
			showFlash = '<a class="plainlinks" href="javascript:embedFlashMovie(true)" onClick="embedFlashMovie(true)">' + flfile + '</a> (Click to Show)';
		}
		spancheck[i].innerHTML = showFlash;
		spancheck[i].style.display = 'inline';
	}
}

var contentTempHolder;
function embedFlashCheck() {
	if( !document.getElementById( 'embedFlashDoc' ) )
		return;
	mainbody = document.getElementById('bodyContent');
	contentTempHolder = mainbody.innerHTML;
	if( typeof displayFlashOverride != 'undefined' ) {
		embedFlashMovie(displayFlashOverride);
		return;
	}
	askmessage = '<div align="center" id="askflash">This page contains ';
	askmessage += '<a href="/wiki/Flash_Gordon" class="plainlinks">Flash</a>; would you ';
	askmessage += 'like to see it? <b><a href="javascript:embedFlashMovie(true)" ';
	askmessage += 'onClick="embedFlashMovie(true)">Yes</a> | <a ';
	askmessage += 'href="javascript:embedFlashMovie(false)" ';
	askmessage += 'onClick="embedFlashMovie(false)">No</a> | <a ';
	askmessage += 'href="/index.php?title=User:' + wgUserName + '/' + skin + '.js&';
	askmessage += 'action=edit&section=new&preload=Template:Flash/disable">';
	askmessage += 'Don\'t show this again</a></b></div>';
	mainbody.innerHTML = askmessage;
}
addOnloadHook( embedFlashCheck );
document.write('<style type="text/css">/*<![CDATA[*/@import "'
		+ '/index.php?title=Myown'
		+ '&action=raw&ctype=text/css";/*]]>*/</style>');