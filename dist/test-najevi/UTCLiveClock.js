/* Warning! Global gadget file! */

function liveClock(){
	liveClock.node = addPortletLink( 'p-personal', wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge', '', 'utcdate' );
	liveClock.node.style.fontSize = 'larger';
	liveClock.node.style.fontWeight = 'bolder';

	showTime();
}
addOnloadHook(liveClock);

function showTime(){
	var dateNode = liveClock.node;
	if( !dateNode ) {
		return;
	}

	var now = new Date();
	var hh = now.getUTCHours();
	var mm = now.getUTCMinutes();
	var ss = now.getUTCSeconds();
	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
	dateNode.firstChild.replaceChild( document.createTextNode( time ), dateNode.firstChild.firstChild );

	window.setTimeout(showTime, 1000);
}