/* 
 * APIQuery.js, by Monchoman45
 * See http://c.wikia.com/api.php
 * 
 * Usage notes:
 * 
 */

APIQuery = function(props) {
	if(!(this instanceof APIQuery)) {return new APIQuery(props);}
	this.length = 0;
	this.incomplete = 0;
	this.succeeded = 0;
	this.failed = 0;
	this.requests = [];
	this.props = {};
	for(var i in this.defaults) {this.props[i] = this.defaults[i];} //Proxy all default values
	for(var i in props) {/*if(i != 'tokens') {*/this.props[i] = props[i];}//}
	/*if(props.tokens) {
		for(var i in props.tokens) {this.props.tokens[i] = props.tokens[i];}
	}*/
}

APIQuery.prototype.defaults = {
	params: {format: 'json'},
	headers: {'Content-type': 'application/x-www-form-urlencoded'},
	hash: {},
	baseurl: (wgServer.indexOf('wikia') != -1 ? '/api.php' : '/w/api.php'),
	logger: function($1, $2, query) {
		console.log('APIQuery: ' + $1 + ': ' + $2);
	}/*,
	tokens: {
		edit: {token: 'token', params: 'default'},
		rollback: {token: 'token', params: {action: 'query', prop: 'revisions', rvtoken: 'rollback', indexpageids: '1', titles: query.params.title}},
		upload: {token: 'token', params: 'default'},
		delete: {token: 'token', params: 'default'},
		undelete: {token: 'token', params: 'default'},
		move: {token: 'token', params: 'default'},
		protect: {token: 'token', params: 'default'},
		login: {token: 'lgtoken', post: true, params: {action: 'login', lgname: query.params.lgname, lgpassword: query.params.password}, json: result.login.token},
		userrights: {token: 'token', params: {action: 'query', indexpageids: '1', list: 'users', ustoken: 'userrights', ususers: query.params.user}},
		emailuser: {token: 'token', params: 'default'},
		import: {token: 'token', params: 'default'},
		block: {token: 'token', params: 'default'},
		unblock: {token: 'token', params: 'default'}
	}*/
};

//Function the user calls to add a query to the object
//Accepts type (GET or POST), parameters (action=edit&title=Page), and a callback function
//Returns newly added query
APIQuery.prototype.newQuery = function(type, params, success, fail) {
	this[this.length] = new this.Query(this, type, params, success, fail);
	this.length++;
	return this[this.length - 1];
}

//Function the system uses to add a query to the object
//Called by this.newQuery, has the same parameters
//Returns new query
APIQuery.prototype.Query = function(parent, type, params, success, fail) {
	if(!(this instanceof parent.Query)) {return new parent.Query();}
	this.type = type;
	this.params = {};
	this.headers = {};
	this.hash = {};
	this.onsuccess = success;
	this.onfail = fail;
	this.onabort = undefined;
	this.parent = parent;
	this.nested = undefined;
	this.baseurl = parent.props.baseurl;
	for(var i in parent.props.params) {this.params[i] = parent.props.params[i];}
	for(var i in parent.props.headers) {this.headers[i] = parent.props.headers[i];}
	for(var i in parent.props.hash) {this.hash[i] = parent.props.hash[i];}

	if(typeof params == 'string') {
		for(var i in params.split('&')) {
			this.params[params.split('&')[i].split('=')[0]] = params.split('&')[i].split('=').slice(1, params.split('&')[i].split('=').length).join('=');
		}
	}
	else if(typeof params == 'object') {
		for(var i in params) {
			this.params[i] = params[i];
		}
	}
}
	 
//Function for compiling and sending a query to the server
//Accepts the array index for the query or the query object itself, and a boolean for deleting when finished.
//Returns the xhr. Server-side success/failure of the query is logged in console.
APIQuery.prototype.send = function(req, clear) {
	if(typeof req == 'number') {var query = this[req];}
	else if(typeof req == 'object') {var query = req;}
	else {
		throw new TypeError('Invalid reference parameter');
	}
	if(query.type != 'GET' && query.type != 'POST') {
		throw new ReferenceError('Invalid type');
	}
	if(!query.params.action && query.baseurl.indexOf('/api.php') != -1) {
		throw new ReferenceError('No action');
	}
	if(!query.params.token && !query.params.lgtoken && (query.params.action == 'edit' || query.params.action == 'rollback' || query.params.action == 'upload' || query.params.action == 'delete' || query.params.action == 'undelete' || query.params.action == 'move' || query.params.action == 'protect' || query.params.action == 'login' || query.params.action == 'userrights' || query.params.action == 'emailuser' || query.params.action == 'import' || query.params.action == 'block' || query.params.action == 'unblock')) {
		switch(query.params.action) {
			case 'rollback':
				var qtoken = new this.Query(query.parent, 'GET', {action: 'query', prop: 'revisions', rvtoken: 'rollback', indexpageids: '1', titles: query.params.title}, function(result) {
					query.nested.params.token = result.query.pages[result.query.pageids[0]].revisions[0].rollbacktoken;
					query.nested.params.user = result.query.pages[result.query.pageids[0]].revisions[0].user;
					//make sure we have the token - otherwise, we get infinite loops, which is really, really bad with this stuff.
					if(!query.nested.params.token) {
						query.parent.incomplete--;
						query.parent.failed++;
						query.parent.log(query.params.action.charAt(0).toUpperCase() + query.params.action.substring(1) + ' error', 'No token found');
						if(typeof query.nested.onfail == 'function') {query.nested.onfail(result);}
						query.nested = undefined;
					}
					else {query.parent.succeeded--;} //don't count this in final tallies

				});
				break;
			case 'login':
				var qtoken = new this.Query(query.parent, 'POST', {action: 'login', format: 'json', lgname: query.params.lgname, lgpassword: query.params.password}, function(result) {
					query.nested.params.lgtoken = result.login.token;
					if(!query.nested.params.lgtoken) {
						query.parent.incomplete--;
						query.parent.failed++;
						query.parent.log(query.params.action.charAt(0).toUpperCase() + query.params.action.substring(1) + ' error', 'No token found');
						if(typeof query.nested.onfail == 'function') {query.nested.onfail(result);}
						query.nested = undefined;
					}
					else {query.parent.succeeded--;}
				});
				break;
			case 'userrights':
				var qtoken = new this.Query(query.parent, 'GET', {action: 'query', format: 'json', indexpageids: '1', list: 'users', ustoken: 'userrights', ususers: query.params.user}, function(result) {
					query.nested.params.token = result.query.users[0].userrightstoken;
					if(!query.nested.params.token) {
						query.parent.incomplete--;
						query.parent.failed++;
						query.parent.log(query.params.action.charAt(0).toUpperCase() + query.params.action.substring(1) + ' error', 'No token found');
						if(typeof query.nested.onfail == 'function') {query.nested.onfail(result);}
						query.nested = undefined;
					}
					else {query.parent.succeeded--;}
				});
				break;
			default:
				var qtoken = new this.Query(query.parent, 'GET', {action: 'query', format: 'json', prop: 'info', indexpageids: '1', intoken: 'edit', titles: query.params.title || query.params.titles || 'Page'}, function(result) {
					query.nested.params.token = result.query.pages[result.query.pageids[0]].edittoken;
					if(!query.nested.params.token) {
						query.parent.incomplete--;
						query.parent.failed++;
						query.parent.log(query.params.action.charAt(0).toUpperCase() + query.params.action.substring(1) + ' error', 'No token found');
						if(typeof query.nested.onfail == 'function') {query.nested.onfail(result);}
						query.nested = undefined;
					}
					else {query.parent.succeeded--;}
				});
				break;
		}
		for(var j in query.hash) {qtoken.hash[j] = query.hash[j];}
		qtoken.nested = query;
		query = qtoken; //voila, it's nested
	}
 
	query.parent.incomplete++;

	var params = '';
	for(var j in query.params) {params += (query.params[j] != undefined ? '&' + j + '=' + encodeURIComponent(query.params[j]) : '&' + j);}
	params = params.substring(1);
	if(query.type == 'GET') {url = query.baseurl + '?' + params;}
	else {url = query.baseurl;}
	var xhr = sajax_init_object();
	xhr.open(query.type, url, true);
	for(var j in query.headers) {xhr.setRequestHeader(j, query.headers[j]);}
	xhr.hash = {};
	for(var j in query.hash) {xhr.hash[j] = query.hash[j];}
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var cont = true;
			if(query.baseurl.indexOf('/api.php') != -1) {
				if(query.params.format == 'json') {
					eval('var result = ' + xhr.responseText);
					if(result.error) {
						query.parent.incomplete--;
						query.parent.failed++;
						query.parent.log(query.params.action.charAt(0).toUpperCase() + query.params.action.substring(1) + ' error', result.error.code + ' - ' + result.error.info, query);
						if(typeof query.onfail == 'function') {query.onfail(result);}
						cont = false;
					}
				}
				else if(query.params.format == 'xml') {
					var result = xhr.responseXML;
					if(result.getElementsByTagName('error').length > 0) {
						query.parent.incomplete--;
						query.parent.failed++;
						query.parent.log(query.params.action.charAt(0).toUpperCase() + query.params.action.substring(1) + ' error',  result.getElementsByTagName('error')[0].code + ' - ' + result.getElementsByTagName('error')[0].info, query);
						if(typeof query.onfail == 'function') {query.onfail(result);}
						cont = false;
					}
				}
			}
			if(query.baseurl.indexOf('/index.php') != -1) {
				//Nifty little setup here: can't put the plain text into a document node,
				//so instead we create an html element and put everything relevant in that.
				//But since <html> isn't a document, it doesn't have document.getElementById,
				//so we create a pseudo getElementById and bind that.
				//There's probably a better way to do this, so I'll have to search around for something.
				var result = document.createElement('html');
				result.innerHTML = xhr.response.substring(xhr.response.indexOf('>', xhr.response.indexOf('<html')) + 1, xhr.response.lastIndexOf('</html>'));
				result.getElementById = function(id) {var els = this.getElementsByTagName('*'); for(var i in els) {if(els[i].id == id) {return els[i];}}}
			}
			if(cont) {
				query.parent.incomplete--;
				query.parent.succeeded++;
				for(var i in query.parent.requests) {
					if(query.parent.requests[i] == xhr) {query.parent.requests.splice(i, 1);}
				}
				query.parent.log(query.params.action.charAt(0).toUpperCase() + query.params.action.substring(1), 'Success', query);
				if(typeof query.onsuccess == 'function') {query.onsuccess(result);}
				if(query.nested) {query.parent.send(query.nested);} //Send nested query
			}
			if(query.params.token) {delete query.params.token;}

			if(query.parent.incomplete == 0) {
				if(typeof query.parent.props.oncomplete == 'function') {query.parent.props.oncomplete(query.parent);}
				if(query.parent.incomplete == 0) { //make sure nothing was sent in the oncomplete function
					query.parent.log('Action complete', 'Succeeded: ' + query.parent.succeeded + ', Failed: ' + query.parent.failed, query);
					query.parent.succeeded = 0;
					query.parent.failed = 0;
				}
			}
		}
		else if(xhr.readyState == 4) { //request completed, but status is not ok
			query.parent.incomplete--;
			query.parent.failed++;
			query.parent.log(query.params.action.charAt(0).toUpperCase() + query.params.action.substring(1), 'Protocol error - Response returned with code ' + xhr.status, query);
			throw new Error('Terminating query');
		}
	}
	if(query.type == 'GET') {xhr.send();}
	else {xhr.send(params);}
	query.parent.log(query.params.action.charAt(0).toUpperCase() + query.params.action.substring(1), 'Query sent', query);
	query.parent.requests.push(xhr);
	
	if(clear == true) {
		this.clear(req);
	}
	return xhr;
}
//Sends all queries
//Accepts a boolean for clearing all queries once sent
//Returns the object. Success/failure of all queries is logged in console.
APIQuery.prototype.sendAll = function(clear) {
	for(var i = 0; i < this.length; i++) {
		this.send(i);
	}
	if(clear) {this.clearAll();}
	return this;
}

//Shortcut for logging messages
//Accepts message params
//Returns whatever the logger returns
APIQuery.prototype.log = function($1, $2, query) {
	return this.props.logger($1, $2, query);
}

//Function for killing a query that has not been finished yet
//Accepts index of query or the query itself
//Returns whatever xhr.abort() returns
APIQuery.prototype.abort = function(req) {
	if(typeof req == 'number') {
		var xhr = this.requests.splice(req, 1)[0];
		return xhr.abort();
	}
	else if(typeof req == 'object') {
		for(var i in this.requests) {
			if(this.requests[i] == req) {
				var xhr = this.requests.splice(i, 1)[0];
				return xhr.abort();
			}
		}
	}
}
//Function for killing all pending queries
//Void
//Returns nothing
APIQuery.prototype.abortAll = function() {
	for(var i in this.requests) {
		this.requests[i].abort();
	}
	this.requests = [];
}
	 
//Function for reading formatted info of a query
//Accepts index of query or the query itself
//Returns info on the query
APIQuery.prototype.read = function(req) {
	if(typeof req == 'number') {var query = this[req];}
	else if(typeof req == 'object') {var query = req;}
	else {
		throw new TypeError('Invalid reference parameter');
	}
	var params = '';
	var headers = '';
	for(var i in query.params) {params += ', ' + i + '=' + query.params[i];}
	params = params.substring(2);
	for(var i in query.headers) {headers += ', ' + i + ': ' + query.headers[i];}
	headers = headers.substring(2);
	return query.type + ': ' + query.params.action.charAt(0).toUpperCase() + query.params.action.substring(1) + '\n    ' + params + '\n    ' + headers;
}
//Get info of all queries
//Void
//Returns info on all queries
APIQuery.prototype.readAll = function() {
	var info = [];
	for(var i = 0; i < this.length; i++) {
		var query = this[i];
		var params = '';
		var headers = '';
		for(var j in query.params) {params += ', ' + j + '=' + query.params[j];}
		params = params.substring(2, params.length);
		for(var j in query.headers) {headers += ', ' + j + ': ' + query.headers[j];}
		headers = headers.substring(2, headers.length);
		info.push(query.type + ': ' + query.params.action.charAt(0).toUpperCase() + query.params.action.substring(1) + '\n    ' + params + '\n    ' + headers);
	}
	return info.join('\n ');
}
	
//Function for removing a query
//Accepts the index of the query or the query itself
//Returns the removed query
APIQuery.prototype.clear = function(ref) {
	var reqs = [];
	var query = this[ref];
	for(var i = 0; i < this.length; i++) {reqs[i] = this[i]; delete this[i];}
	reqs.splice(ref, 1);
	for(var i in reqs) {this[i] = reqs[i];}
	this.length--;
	return query;
}
//Remove all queries
//Void
//Returns nothing
APIQuery.prototype.clearAll = function() {
	for(var i = 0; i < this.length; i++) {
		delete this[i];
	}
	this.length = 0;
}

function sajax_init_object() {var a;try{a=new XMLHttpRequest()}catch(d){try{a=new ActiveXObject('Msxml2.XMLHTTP')}catch(d){try{a=new ActiveXObject('Microsoft.XMLHTTP')}catch(b){a=null}}}return a}

window.api = new APIQuery();