/* from en: - ChongDae. 2010년 3월 28일 (일) 22:52 (KST) */
function liveClock()
{
	if (typeof(UTCLiveClockConfig)=='undefined') UTCLiveClockConfig = {};
	var portletId = UTCLiveClockConfig.portletId || 'p-personal';
	var nextNode =  UTCLiveClockConfig.nextNodeId ? document.getElementById(UTCLiveClockConfig.nextNodeId) : undefined;
	liveClock.node = addPortletLink( portletId, wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge', '', 'utcdate', undefined, undefined, nextNode );
        if( !liveClock.node ) return;
	if (skin !== "vector") { //Looks bad on vector 
liveClock.node.style.fontSize = 'larger'; 
}  
	liveClock.node.style.fontWeight = 'bolder';
 
	showTime();
}
addOnloadHook(liveClock)
 
function showTime()
{
 
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