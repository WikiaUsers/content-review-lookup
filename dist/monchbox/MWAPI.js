window.MWAPI = {
	api: '/api.php', //for wikia, on most installations, /w/api.php
	index: '/index.php' //same as above
};

MWAPI.request = function(method, url, params, headers, success, failure) {
	if(!method || typeof method != 'string') {throw new Error('Must specify a request method');}
	if(!url) {url = '/w/api.php';}
	if(!params) {params = {};}
	else if(typeof params != 'object') {throw new Error('Params argument must be an object');}
	else {
		if(!params.format) {params.format = 'json';}
		if(!params.bot) {params.bot = 1;}
	}
	if(!headers) {headers = {'Content-Type': 'application/x-www-form-urlencoded'};}
	else if(typeof headers != 'object') {throw new Error('Headers argument must be an object');}
	else if(!headers['Content-Type']) {headers['Content-Type'] = 'application/x-www-form-urlencoded';}
	if(!success) {success = function() {console.log.apply(console, arguments);}}
	if(!failure) {failure = function() {console.log.apply(console, arguments);}}
	
	var query = '';
	for(var i in params) {
		if(params[i]) {query += '&' + encodeURIComponent(i) + '=' + encodeURIComponent(params[i]);}
		else {query += '&' + encodeURIComponent(i);}
	}
	query = query.substring(1);
	if(method != 'POST') {url = url + '?' + query;}
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	for(var i in headers) {xhr.setRequestHeader(i, headers[i]);}
	xhr.onreadystatechange = function() {
		if(this.readyState == 4) {
			if(this.status == 200) {
				if(typeof success == 'function') {
					switch(params.format) {
						case 'json': var data = JSON.parse(this.responseText); break;
						case 'xml': var data = this.responseXML; break;
						default: var data = this.responseText;
					}
					success(data);
				}
			}
			else if(typeof failure == 'function') {failure(this.status);}
		}
	}
	if(method == 'POST') {xhr.send(query);}
	else {xhr.send();}
}

MWAPI.token = function(token, title, success, failure) {
	if(!token || !title) {throw new Error('Must specify a token name and a page title');}
	if(!success) {success = function() {console.log.apply(console, arguments);}}
	
	switch(token) {
		case 'userrights':
			MWAPI.request('GET', MWAPI.api, {action: 'query', list: 'users', ususers: title, ustoken: 'userrights'}, {}, function(result) {
				if(typeof success == 'function') {success(result.query.users[0].userrightstoken);}
			}, failure);
			break;
		case 'rollback':
			break;
		default:
			MWAPI.request('GET', MWAPI.api, {action: 'query', prop: 'info', titles: title, intoken: token, indexpageids: 1}, {}, function(result) {
				if(typeof success == 'function') {success(result.query.pages[result.query.pageids[0]][token + 'token']);}
			}, failure);
			break;
	}
}

MWAPI.edit = function(title, text, summary, success, failure) {
	if(!title) {throw new Error('Must specify title');}
	
	MWAPI.token('edit', title, function(token) {
		MWAPI.request('POST', MWAPI.api, {action: 'edit', text: text, title: title, summary: summary, token: token}, {}, success, failure);
	}, failure);
}

MWAPI.append = function(title, text, summary, success, failure) {
	if(!title) {throw new Error('Must specify title');}
	
	MWAPI.token('edit', title, function(token) {
		MWAPI.request('POST', MWAPI.api, {action: 'edit', appendtext: text, title: title, summary: summary, token: token}, {}, success, failure);
	}, failure);
}

MWAPI.prepend = function(title, text, summary, success, failure) {
	if(!title) {throw new Error('Must specify title');}

	MWAPI.token('edit', title, function(token) {
		MWAPI.request('POST', MWAPI.api, {action: 'edit', prependtext: text, title: title, summary: summary, token: token}, {}, success, failure);
	}, failure);
}

MWAPI.delete = function(title, reason, success, failure) {
	if(!title) {throw new Error('Must specify title');}

	MWAPI.token('delete', title, function(token) {
		MWAPI.request('POST', MWAPI.api, {action: 'delete', title: title, reason: reason, token: token}, {}, success, failure);
	}, failure);
}

MWAPI.move = function(from, to, reason, success, failure) {
	if(!from || !to) {throw new Error('Must specify a target and a new name');}

	MWAPI.token('move', from, function(token) {
		MWAPI.request('POST', MWAPI.api, {action: 'move', from: from, to: to, reason: reason, token: token}, {}, success, failure);
	}, failure);
}

MWAPI.protect = function(title, protections, expiry, reason, success, failure) {
	if(!title || !protections) {throw new Error('Must specify title and protections');}
	else if(typeof protections != 'object') {throw new Error('Protections must be an object');}
	if(!expiry) {expiry = [];}
	
	var levels = '';
	for(var i in protections) {levels += '|' + i + '=' + protections[i];}
	levels.substring(1);
	MWAPI.token('protect', title, function(token) {
		MWAPI.request('POST', MWAPI.api, {action: 'protect', title: title, protections: levels, expiry: expiry.join('|'), reason: reason, token: token}, {}, success, failure);
	}, failure);
}

MWAPI.block = function(user, expiry, reason, options, success, failure) {
	MWAPI.token('block', 'User:' + user, function(token) {
		var params = {action: 'block', user: user, expiry: expiry, reason: reason, token: token};
		for(var i in options) {
			if(!params[i]) {params[i] = options[i];}
		}
		MWAPI.request('POST', MWAPI.api, params, {}, success, failure);
	}, failure);
}

MWAPI.unblock = function(user, reason, success, failure) {
	MWAPI.token('unblock', 'User:' + user, function(token) {
		MWAPI.request('POST', MWAPI.api, {action: 'unblock', user: user, reason: reason, token: token}, {}, success, failure);
	});
}

MWAPI.rights = function(user, add, remove, reason, success, failure) {
	MWAPI.token('userrights', user, function(token) {
		MWAPI.request('POST', MWAPI.api, {action: 'userrights', user: user, add: add.join('|'), remove: remove.join('|'), reason: reason, token: token}, {}, success, failure);
	});
}

MWAPI.upload = function(title, file, reason, success, failure) {
	MWAPI.token('edit', 'File:' + title, function(token) {
		MWAPI.request('POST', MWAPI.api, {action: 'upload', filename: title, file: file, reason: reason, token: token}, {}, success, failure);
	}, failure);
}