//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝【Clock】＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
;(function() {
    var attributes = {
        src: 'http://www.machine-doll.com/bp/yaya_watch.swf',
        wmode: 'transparent',
        quality: 'best',
        bgcolor: '#000000',
        width: 150,
        height: 300,
        name: 'index',
        align: 'middle',
        type: 'application/x-shockwave-flash',
        pluginspage: 'http://www.macromedia.com/gog/getflashplayer'
    };
    var embed = document.createElement('embed');
    for (var i in attributes) {
        embed.setAttribute(i, attributes[i]);
    }
    if (document.getElementById('yaya_watch')) {
        document.getElementById('yaya_watch').appendChild(embed);
    }
})();
//if (mw.config.get("wgIsMainpage")) {
//	importScriptURL("http://www.machine-doll.com/bp/bp.js");
//}

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//