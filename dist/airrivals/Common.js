/* Any JavaScript here will be loaded for all users on every page load. */

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function get(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    return results[1];
}

function getFileName() {
    var url = document.location.href;
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    if (url.indexOf("wiki/") != -1) {
        url = url.substring(url.lastIndexOf("wiki/") + 5, url.length);
    } else {
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
    }
    if (url == 'index.php') {
        return get('title');
    } else {
        return url;
    }
}

/** BEGIN MUSIC PLAYER (by Deo Favente) **/
function addXSPFPlayer() {
    var loc = 'http://whitehat.servehttp.com/music/';
    var url = loc + '.xspf/Slim/xspf_player.swf?playlist_url=' + loc + '.airrivals/playlist.php&' +
        'alpha=100&' +
        'alphabetize=0&' +
        'autoload=1&' +
        'autoplay=0&' +
        'buffer=5&' +
        'color=000000&' +
        'gotoany=1&' +
        'player_title=Air Rivals Music Player&' +
        'repeat=0&' +
        'repeat_playlist=1&' +
        'setup=0&' +
        'shuffle=0&' +
        'start_track=1&' +
        'timedisplay=1&' +
        'volumelevel=100&' +
        'loaded=1&' +
        'autoresume=1';

 if(navigator.appName != "Microsoft Internet Explorer") {
    var parent = document.getElementById('navigation');
    var after = document.getElementById('menu-item_1');
    
    var player = document.createElement('div');
    player.setAttribute('id', 'mplayer');
    player.setAttribute('style', 'background-color: #3366CC;');
    
    var object = document.createElement('object');
    object.setAttribute('id', 'mplayer-object');
    object.setAttribute('type', 'application/x-shockwave-flash');
    object.setAttribute('width', '100%');
    object.setAttribute('height', '15');
    object.setAttribute('data', url);
    
    var param = document.createElement('param');
    param.setAttribute('name', 'movie');
    param.setAttribute('value', url);
    object.appendChild(param);
    player.appendChild(object);
    
    var text = document.createElement('div');
    text.setAttribute('style', 'font-size: 8px; text-align: right;');
    text.setAttribute('width', '100%');
    text.innerHTML = '<table style=\'margin-top: -2px;\'><tr><td width=\'100%\' style=\'text-align: left; padding-top: 1px; padding-left:3px; font-weight: bold;\'>Music Player</td><td><a href=\'http://airrivals.wikia.com/wiki/Playlist/Tracks\' id=\'mplayer-edit\'>[&nbsp;edit&nbsp;]</a></td><td><a href=\'JavaScript:popmplayer(true)\' id=\'mplayer-pop\'>[&nbsp;pop&nbsp;out&nbsp;]</a></td><td><a id=\'mplayer-hide\' href=\'JavaScript:showmplayer(false)\'>[&nbsp;hide&nbsp;]</a></td></tr></table>';
    player.appendChild(text);
    
    parent.insertBefore(player, after);
    if (readCookie('mplayer-visibility') == null) {
        showmplayer(true);
    }
    if (readCookie('mplayer-popmode') == 'out') {
        var pop = document.getElementById('mplayer-pop');
        pop.setAttribute('href', 'JavaScript:popmplayer(false)');
        pop.innerHTML = '[&nbsp;pop&nbsp;in&nbsp;]';
    }
    showmplayer(readCookie('mplayer-visibility') == 'show');
  } else {
    var parent = window.getElementById('navigation');
    var after = window.getElementById('menu-item_1');
    
    var player = window.createElement('div');
    player.setAttribute('id', 'mplayer');
    player.setAttribute('style', 'background-color: #3366CC;');

    var text = window.createElement('div');
    text.setAttribute('style', 'font-size: 8px; text-align: right;');
    text.setAttribute('width', '100%');
    text.innerHTML = '<table style=\'margin-top: -2px;\'><tr><td width=\'100%\' style=\'text-align: left; padding-top: 1px; padding-left:3px; font-weight: bold;\'>Your web browser does not support JavaScript. :(</td></tr></table>';
    player.appendChild(text);
  }
}
addOnloadHook( addXSPFPlayer );

var mplayerpopup;
function popmplayer(popmode) {
    var loc = 'http://whitehat.servehttp.com/music/';
    var url = loc + '.xspf/Slim/xspf_player.swf?playlist_url=' + loc + '.airrivals/playlist.php&' +
        'alpha=100&' +
        'alphabetize=0&' +
        'autoload=1&' +
        'autoplay=1&' +
        'buffer=5&' +
        'color=000000&' +
        'gotoany=1&' +
        'player_title=Air Rivals Music Player&' +
        'repeat=0&' +
        'repeat_playlist=1&' +
        'setup=0&' +
        'shuffle=0&' +
        'start_track=1&' +
        'timedisplay=1&' +
        'volumelevel=100&' +
        'loaded=1&' +
        'autoresume=1';

    if (popmode) {
        var pop = document.getElementById('mplayer-pop');
        pop.setAttribute('href', 'JavaScript:popmplayer(false)');
        pop.innerHTML = '[&nbsp;pop&nbsp;in&nbsp;]';
        showmplayer(false);
        mplayerpopup = window.open('','Music Player - Air Rivals Wiki Wiki', 'width=309, height=5, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, copyhistory=no, resizable=no');

    var player = mplayerpopup.document.createElement('div');
    player.setAttribute('id', 'mplayer');
    player.setAttribute('style', 'background-color: #3366CC;');
    
    var object = mplayerpopup.document.createElement('object');
    object.setAttribute('id', 'mplayer-object');
    object.setAttribute('type', 'application/x-shockwave-flash');
    object.setAttribute('width', '100%');
    object.setAttribute('height', '100%');
    object.setAttribute('data', url);
    
    var param = mplayerpopup.document.createElement('param');
    param.setAttribute('name', 'movie');
    param.setAttribute('value', url);
    object.appendChild(param);
    player.appendChild(object);
        mplayerpopup.document.getElementsByTagName('body')[0].appendChild(player);
        mplayerpopup.document.getElementsByTagName('body')[0].setAttribute('onunload', 'JavaScript:window.opener.popmplayer(false);');
        createCookie('mplayer-popmode', 'out', 90);
    } else {
        var pop = document.getElementById('mplayer-pop');
        pop.setAttribute('href', 'JavaScript:popmplayer(true)');
        pop.innerHTML = '[&nbsp;pop&nbsp;out&nbsp;]';
        showmplayer(true);
        mplayerpopup.close();
        createCookie('mplayer-popmode', 'in', 90);
    }
}

function showmplayer(show) {
    if (show) {
        var object = document.getElementById('mplayer-object');
        object.setAttribute('style', 'display: block;');
        var edit = document.getElementById('mplayer-edit');
        edit.setAttribute('style', 'display: block;');
        var hide = document.getElementById('mplayer-hide');
        hide.setAttribute('href', 'JavaScript:showmplayer(false)');
        hide.innerHTML = '[&nbsp;hide&nbsp;]';
        createCookie('mplayer-visibility', 'show', 90);
    } else {
        var object = document.getElementById('mplayer-object');
        object.setAttribute('style', 'display: none;');
        var edit = document.getElementById('mplayer-edit');
        edit.setAttribute('style', 'display: none;');
        var hide = document.getElementById('mplayer-hide');
        hide.setAttribute('href', 'JavaScript:showmplayer(true)');
        hide.innerHTML = '[&nbsp;show&nbsp;]';
        createCookie('mplayer-visibility', 'hide', 90);
    }
}

/** END MUSIC PLAYER **/

function initControlButtons() {
    var fileName = document.location.href.split
    var controlBar = document.getElementById('page_controls');
    
    var purge = document.createElement('li');
    purge.setAttribute('id', 'control_purge');
    purge.setAttribute('class', '');
    var purgeIcon = document.createElement('div');
    purgeIcon.setAttribute('style', 'clip:rect(0px, 224px, 16px, 208px); left:-208px;');
    purgeIcon.innerHTML = ' ';
    purge.appendChild(purgeIcon);
    var purgeLink = document.createElement('a');
    purgeLink.setAttribute('id', 'ca-purge');
    purgeLink.setAttribute('accesskey', 'p');
    purgeLink.setAttribute('title', 'Clear the server-side cache of this page [p]');
    purgeLink.setAttribute('href', '/index.php?title=' + getFileName() + '&action=purge');
    purgeLink.setAttribute('rel', 'nofollow');
    purgeLink.innerHTML = 'Purge';
    purge.appendChild(purgeLink);
    controlBar.appendChild(purge);
    
    var space = document.createElement('li');
    space.setAttribute('id', 'control_vr');
    space.setAttribute('class', '');
    space.setAttribute('style', 'padding-left: 0px;');
    space.innerHTML = '|';
    controlBar.appendChild(space);
    
    var render = document.createElement('li');
    render.setAttribute('id', 'control_render');
    render.setAttribute('class', '');
    var renderIcon = document.createElement('div');
    renderIcon.setAttribute('style', 'clip:rect(0px, 416px, 16px, 400px); left:-400px;');
    renderIcon.innerHTML = ' ';
    render.appendChild(renderIcon);
    var renderLink = document.createElement('a');
    renderLink.setAttribute('id', 'ca-render');
    renderLink.setAttribute('title', 'Render only the article part of this page');
    renderLink.setAttribute('href', '/index.php?title=' + getFileName() + '&action=render');
    renderLink.setAttribute('rel', 'nofollow');
    renderLink.innerHTML = 'Article only';
    render.appendChild(renderLink);
    controlBar.appendChild(render);
    
    var control_raw = document.createElement('li');
    control_raw.setAttribute('id', 'control_raw');
    control_raw.setAttribute('class', '');
    var rawIcon = document.createElement('div');
    rawIcon.setAttribute('style', 'clip:rect(0px, 416px, 16px, 400px); left:-400px;');
    rawIcon.innerHTML = ' ';
    control_raw.appendChild(rawIcon);
    var rawLink = document.createElement('a');
    rawLink.setAttribute('id', 'ca-raw');
    rawLink.setAttribute('title', 'Render only the text of this article');
    rawLink.setAttribute('href', '/index.php?title=' + getFileName() + '&action=raw&ctype=text/css&templates=expand');
    rawLink.setAttribute('rel', 'nofollow');
    rawLink.innerHTML = 'Text only';
    control_raw.appendChild(rawLink);
    controlBar.appendChild(control_raw);
}
addOnloadHook(initControlButtons);

//function initWidgetMinMaxButtons() {
//     addWidgetMinMaxButtons(1);
//     addWidgetMinMaxButtons(3);
//     addWidgetMinMaxButtons(4);
//     addWidgetMinMaxButtons(5);
//}
//function addWidgetMinMaxButtons(sidebarnum) {
//    var sidebar = document.getElementById('sidebar_' + sidebarnum);
//    var widgets = sidebar.childNodes;
//    for (i = 0; i < widgets.length; i++) {
//        var widget = widgets[i];
//        if (widget.tagName == "DL") {
//            widgetID = widget.id;
//            widgetHeader = document.getElementById(widgetID + "_header");
//            
//            minmaxLink = document.createElement('a');
//            minmaxLink.setAttribute('id', widgetID + '_minmax');
//            minmaxLink.setAttribute('href', 'javascript:minMaxWidget(\'' + widgetID + '\');');
//            minmaxLink.setAttribute('rel', 'nofollow');
//            minmaxLink.innerHTML = '[&nbsp;-&nbsp;]';
//            minmaxLink.setAttribute('title','Minimize');
//            
//            closeLink = document.createElement('a');
//            closeLink.setAttribute('id', widgetID + '_close');
//            closeLink.setAttribute('rel', 'nofollow');
//            closeLink.innerHTML = '[&nbsp;x&nbsp;]';
//            closeLink.setAttribute('title','Close');
//            
//            minmaxSpan = document.createElement('span');
//            minmaxSpan.setAttribute('style', 'position: absolute; right: 32px;');
//            minmaxSpan.appendChild(minmaxLink);
//            
//            closeSpan = document.createElement('span');
//            closeSpan.setAttribute('style', 'position: absolute; right: 6px;');
//            closeSpan.appendChild(closeLink);
//            
//            widgetHeader.appendChild(minmaxSpan);
//            widgetHeader.appendChild(closeSpan);
//
//            $('#' + widgetID + '_close').click(WidgetFramework.close);
//        }
//    }
//}
//addOnloadHook(initWidgetMinMaxButtons);

function minMaxWidget(widgetID) {
    var widgetContent = document.getElementById(widgetID + '_content');
    var widgetHeader = document.getElementById(widgetID + '_header');
    var widgetMinMaxLink = document.getElementById(widgetID + '_minmax');
    var visibility = widgetContent.style['display'];
    if (visibility == '' || visibility == 'block') {
        widgetContent.style['display'] = 'none';
        widgetHeader.setAttribute('style','-moz-border-radius-bottomleft:3px;-moz-border-radius-bottomright:3px;');
        widgetMinMaxLink.innerHTML = '[&nbsp;+&nbsp;]';
        widgetMinMaxLink.setAttribute('title','Unminimize');
    } else {
        widgetContent.style['display'] = 'block';
        widgetHeader.setAttribute('style','-moz-border-radius-bottomleft:0px;-moz-border-radius-bottomright:0px;');
        widgetMinMaxLink.innerHTML = '[&nbsp;-&nbsp;]';
        widgetMinMaxLink.setAttribute('title','Minimize');
    }
}