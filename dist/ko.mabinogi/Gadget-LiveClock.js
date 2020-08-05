/* modified version of [[MediaWiki:Gadget-UTCLiveClock.js]] --[[사용자:PuzzletChung|Puzzlet Chung]] ([[사용자토론:PuzzletChung|토론]]) 2010년 4월 14일 (수) 20:27 (KST) */
function localLiveClock()
{
	if (typeof(LiveClockConfig)=='undefined') LiveClockConfig = {};
	var portletId = LiveClockConfig.portletId || 'p-personal';
	var nextNode =  LiveClockConfig.nextNodeId ? document.getElementById(LiveClockConfig.nextNodeId) : undefined;
	localLiveClock.node = addPortletLink( portletId, wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge', '', 'localdate', undefined, undefined, nextNode );
        if( !localLiveClock.node ) return;
	if (skin !== "vector") { //Looks bad on vector
		localLiveClock.node.style.fontSize = 'larger';
	}
	localLiveClock.node.style.fontWeight = 'bolder';
 
	showLocalTime();
}
addOnloadHook(localLiveClock);
 
function showLocalTime()
{
	var dateNode = localLiveClock.node;
	if( !dateNode ) {
		return;
	}
	var now = new Date();
	var hh = now.getHours();
	var mm = now.getMinutes();
	var ss = now.getSeconds();
	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
	dateNode.firstChild.replaceChild( document.createTextNode( time ), dateNode.firstChild.firstChild );
 
	window.setTimeout(showLocalTime, 1000);
}