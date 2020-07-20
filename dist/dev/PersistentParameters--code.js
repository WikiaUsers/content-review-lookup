// <nowiki>
function persistentGETParameters() {
	if(typeof window.persistentParameterList == 'undefined') window.persistentParameterList = ['useskin', 'uselang', 'oasisbreakpoints', 'oasistypography'] // Defaults
	if(typeof window.persistentParameterList == 'string') window.persistentParameterList = [window.persistentParameterList]
	
	var blacklist = ['action']
	for(var x=0;x<blacklist.length;x++) {
		var index = window.persistentParameterList.indexOf(blacklist[x])
		if (index > -1) window.persistentParameterList.splice(index, 1);
	}
	
	var values = getParameters(location.href, window.persistentParameterList);
	if(values == false) return
	var allLinks = document.getElementsByTagName('a')
	
	for(var x=0;x<allLinks.length;x++) {
		var link = allLinks[x]
		if(link.hostname != location.hostname) continue
		
		var href = allLinks[x].href
		var vals = getParameters(link.href, window.persistentParameterList);
		
		var list = []
		for(key in values)	{
			if(typeof vals[key] != 'undefined') continue
			list.push(encodeURIComponent(key)+'='+encodeURIComponent(values[key]))
		}
		list = list.join('&')
		
		if(list) link.search = link.search + ((link.search) ? ('&'+list) : ('?'+list))
	}
}
function getParameters(url, params) {
	var obj = {}
	var empty = true;
	if(url.indexOf('?') == -1) return false;
	for(var x=0;x<params.length;x++) {
		var p = params[x].replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?&]" + p + "=([^&#]*)");
		var results = regex.exec(url);
		if(results == null) continue;
		empty = false
		var value = decodeURIComponent(results[1].replace(/\+/g, " "));
		obj[params[x]] = value;
	}
	if(empty) return false;
	return obj;
}

addOnloadHook(persistentGETParameters);