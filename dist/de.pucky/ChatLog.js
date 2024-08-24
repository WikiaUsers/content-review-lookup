/* Chat logger */
//From:http://community.wikia.com/wiki/User:Joeytje50/Chat_logger.js
//Edited by Dragon_Rainbow
 
//When using this script, please remember to import chathacks too, and set your ping phrases to a long random string that will never be said in the chat, so that the logs won't show the red highlight.

//To set an interval of submitting logs, put var logInterval = (amount of milliseconds); above the import. Default is 1 hour.
 
//cookie functions
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" )
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		} 
	}
	return "";
}
 
//Script
 
if (wgCanonicalSpecialPageName=="Chat" && skin=="oasis") {
 
$('form#Write').append('<a class="wikia-button" href="javascript:submitLog()" style="position:absolute; right:50px; top:0;" title="submit chat log">submit</a>');
 
if (getCookie('lastRestart') == "") {
	setCookie('lastRestart', 0, 1000)
}
 
//-------
 
function restartChat() {
	window.chatwindow = window.open('/index.php?title=Special:Chat&useskin=wikia');
	window.chatwindow.onload = function() {
		window.chatwindow.$('body').prepend('<script>\nfunction importScript(b){var a=wgScript+"?title="+encodeURIComponent(b.replace(/ /g,"_")).replace(/%2F/ig,"/").replace(/%3A/ig,":")+"&action=raw&ctype=text/javascript";return importScriptURI(a)}\nfunction importScriptURI(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(b);return b}\nfunction importScriptPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/javascript";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importScriptURI(a)}\nfunction importStylesheet(a){return importStylesheetURI(wgScript+"?action=raw&ctype=text/css&title="+encodeURIComponent(a.replace(/ /g,"_")))}\nfunction importStylesheetURI(b,d){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";a.href=b;if(d){a.media=d}document.getElementsByTagName("head")[0].appendChild(a);return a}\nfunction importStylesheetPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/css";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importStylesheetURI(a)}\n//This isn\'t the same as the regular addOnloadHook, because the regular one runs from a script tag in the body that I don\'t feel like appending. It\'s easier to just make it $(function), which is essentially equivalent\nfunction addOnloadHook(func) {$(func);}\n</script>');
		//global.js
		window.chatwindow.importScriptURI('http://community.wikia.com/index.php?title=User:' + wgUserName + '/global.js&action=raw&ctype=text/javascript');
		//wikia.js
		window.chatwindow.importScriptURI(wgServer + '/index.php?title=User:' + wgUserName + '/wikia.js&action=raw&ctype=text/javascript');
		//global.css
		window.chatwindow.importStylesheetURI('http://community.wikia.com/index.php?title=User:' + wgUserName + '/global.css&action=raw&ctype=text/css');
		//wikia.css
		window.chatwindow.importStylesheetURI(wgServer + '/index.php?title=User:' + wgUserName + '/wikia.css&action=raw&ctype=text/css');
		window.close()
	}
}
function dcRestart() {
	if ($('.inline-alert:contains("Die Verbindung wurde getrennt")').length > 0) {
		submitLog('restart')
	}
	callAPI({
		'action': 'query',
		'prop': 'info|revisions',
		'titles': 'User:'+wgUserName+'/Restart',
		'rvprop': 'content',
		'rvlimit': '1',
		'indexpageids': 'true',
	}, 'GET', function(response) {
		var page = response.query.pages[response.query.pageids[0]];
		var restartPage = page.revisions[0]['*'].split('\n')[0]
		if (escape(restartPage) != getCookie('lastRestart')) {
			setCookie('lastRestart', restartPage, 1000)
			submitLog('restartChat()')
		}
	})
}
 
//-------
 
var d = new Date()
var curTime = ['','','']
curTime[0] = d.getUTCHours();
curTime[1] = d.getUTCMinutes();
curTime[2] = d.getUTCSeconds();
var timeTillMidnight = ((23-curTime[0])*60*60000)+((59-curTime[1])*60000)+((60-curTime[2])*1000)
setTimeout('setInterval("submitLog()",86400000)',timeTillMidnight)
setTimeout('submitLog()',timeTillMidnight)
setInterval('dcRestart()',60000)
var logInterval = logInterval?logInterval:3600000;
 
//-------
 
function toUTCTime(ts) {
	var tz = d.getTimezoneOffset()/60;
	var hour = parseInt(ts.split(':')[0]);
	var UTChour = hour+tz;
	if (UTChour<1) {
		UTChour = 12+UTChour;
	} else if (UTChour>12) {
		UTChour = UTChour-12;
	}
	var UTCtime = ((UTChour+'').length==1?'0':'')+UTChour+':'+ts.split(':')[1]+(ts.split(':').length>=3?':'+ts.split(':')[2]:'');
	return UTCtime;
}
 
//-------
 
function getLog(exists,content) {
	//Getting arrays with messages and senders
	var allmsgs = document.getElementsByClassName('Chat')[0].getElementsByClassName('message');
	var message = allmsgs[0].innerHTML;
	var msguser = allmsgs[0].parentNode.getAttribute('data-user');
	var msgtime = toUTCTime(allmsgs[0].parentNode.getElementsByClassName('time')[0].innerHTML);
	for (i=1;allmsgs[i];i++) {
		message += '<|>'+allmsgs[i].innerHTML;
		msguser += '<|>'+allmsgs[i].parentNode.getAttribute('data-user');
		msgtime += '<|>'+toUTCTime(allmsgs[i].parentNode.getElementsByClassName('time')[0].innerHTML);
	}
	message = message.split('<|>')
	msguser = msguser.split('<|>')
	msgtime = msgtime.split('<|>')
	//Turning the format into a log instead of arrays
	var ChatLog='';
	for (i=0;message[i];i++) {
		ChatLog += '['+msgtime[i]+'] <'+msguser[i]+'> '+message[i]+'\n'
	}
	while (ChatLog.match(/\n[^\[]/)) {
		ChatLog = ChatLog.replace(/\[(\d\d?:\d\d)\] <([^>]*)> (.*)\n([^\[<])/g, '[$1] <$2> $3\n[$1] <$2> $4')
	}
	var wikilinks = new RegExp('<a href="'+wgServer+'/wiki/([^"]*)">([^<]*)</a>','g')
	ChatLog = ChatLog.replace(/( |	){2,}/g, ' ').replace(/<img src="[^"]+".*?alt="([^"]+)"[^>]*>/g, '$1').replace(wikilinks, function(match,page,title) {return '[['+page.replace(/_/g,' ')+'|'+title+']]'}).replace(/\[\[([^\]]*?) {2,}/g, '[[$1 ').replace(/\[\[([^|]*)\|\1]]/g, '[[$1]]').replace(/<a href="([^"]+)">[^<]*<\/a>/g, '$1').replace('[['+wgServer+'/wiki/]]', wgServer+'/wiki/') //HTML img and a tag fixes
	active().clearWindow()
	var returnThis = exists?content.replace('</pre>',ChatLog+'</pre>'):'<pre class="ChatLog">\n'+ChatLog+'</pre>\n[[Category:Sprechstunde/Logs|<strong class="error">Error: Invalid time.</strong>]]'
	return returnThis
}
 
//-------
 
function callAPI(data, method, callback) {
	data['format'] = 'json';
	$.ajax({
		data: data,
		dataType: 'json',
		url: wgScriptPath + '/api.php',
		type: method,
		success: function(response) {
			if (response.error)
				showError('API error: ' + response.error.info);
			else 
				callback(response);
		},
		error: function(xhr, error) { showError('AJAX error: ' + error); }
	});
}
 
//-------
 
function submitLog(restart) {
	restart = restart?restart:false;
	var d = new Date()
	var monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
	var date = d.getUTCDate() + '_' + monthNames[d.getUTCMonth()] + '_' + d.getUTCFullYear()
	callAPI({
		'action': 'query',
		'prop': 'info|revisions',
		'intoken': 'edit',
		'titles': 'User:SpacePucky/Chat/Logs/'+date,
		'rvprop': 'content',
		'rvlimit': '1',
		'indexpageids': 'true',
	}, 'GET', function(response) {
		var page = response.query.pages[response.query.pageids[0]];
		var pageExists = response.query.pages["-1"]?false:true;
		var content = typeof(page["revisions"])!="undefined"?page.revisions[0]['*']:'';
		callAPI({
			'minor': 'yes',
			'bot': 'yes',
			'summary': 'Aktualisiere den Log',
			'action': 'edit',
			'title': 'User:SpacePucky/Chat/Logs/'+date,
			'startimestamp': page.starttimestamp,
			'token': page.edittoken,
			'text': getLog(pageExists,content)
		}, 'POST', function(response) {
			restart?restartChat():'';
		});
	});
}
setInterval('submitLog()', logInterval)
}