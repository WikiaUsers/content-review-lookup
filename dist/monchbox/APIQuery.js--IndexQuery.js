/* 
 * IndexQuery.js, by Monchoman45
 * Modified from APIQuery.js, also by Monchoman45
 * See http://www.mediawiki.org/wiki/Manual:Parameters_to_index.php
 * 
 * Usage is essentially the same as with APIQuery (see http://monchbox.wikia.com/wiki/MediaWiki:APIQuery.js)
 * While APIQuery is capable of pagecrawling via index.php, this framework is easier to work with.
 */

IndexQuery = function() {
	if(!(this instanceof IndexQuery)) {return new IndexQuery();}
	this.length = 0;

	//Function the user calls to add a query to the object
	//Accepts type (GET or POST), parameters (action=edit&title=Page), and a callback function
	//Returns newly added query
	this.newQuery = function(type, params, callback) {
		this[this.length] = new this.Query(this, type, params, callback);
		this.length++;
		return this[this.length - 1];
	}

	//Function the system uses to add a query to the object
	//Called by this.newQuery, has the same parameters
	//Returns nothing, but automatically adds the new query to the object
	this.Query = function(parent, type, params, callback) {
		if(!(this instanceof parent.Query)) {return new parent.Query();}
		this.type = type;
		this.params = {useskin: 'wikia'};
		this.headers = {};
		this.hash = {};
		this.callback = callback;
		this.parent = parent;
		this.nested = undefined;
		this.baseurl = '/index.php';
		this.send = function() {this.parent.send(this);};
		this.read = function() {this.parent.read(this);};

		switch(typeof params) {
			case 'string':
				for(var i in params.split('&')) {
					this.params[params.split('&')[i].split('=')[0]] = params.split('&')[i].split('=').slice(1, params.split('&')[i].split('=').length).join('=');
				}
				break;
			case 'array':
				for(var i in params) {
					this.params[params[i].split('=')[0]] = params[i].split('=').slice(1, params[i].split('=').length).join('=');
				}
				break;
			case 'object':
				for(var i in params) {
					this.params[i] = params[i];
				}
				break;
		}
	}
	 
	//Function for compiling and sending a query to the server
	//Accepts the array index for the query or the query object itself, and a boolean for deleting when finished.
	//Returns the sent query. Server-side success/failure of the query is logged in console.
	this.send = function(req, clear) {
		if(typeof req == 'number') {var query = this[req];}
		else if(typeof req == 'object') {var query = req;}
		else {
			throw new TypeError('Invalid reference parameter');
		}
		if(query.type != 'GET' && query.type != 'POST') {
			throw new ReferenceError('Invalid type');
		}
		if(!query.params.title) {
			throw new ReferenceError('No title');
		}
		
		var page = query.params.title;
 		
		var params = '';
		for(var j in query.params) {params += (query.params[j] ? '&' + j + '=' + encodeURIComponent(query.params[j]) : '&' + j);}
		params = params.substring(1, params.length);
		if(query.type == 'GET') {url = query.baseurl + '?' + params;}
		else {url = query.baseurl;}
		var xhr = sajax_init_object();
		xhr.open(query.type, url, true);
		for(var j in query.headers) {xhr.setRequestHeader(j, query.headers[j]);}
		xhr.hash = {};
		for(var j in query.hash) {xhr.hash[j] = query.hash[j];}
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				if(!xhr.response) {
					console.log('indexQuery: ' + page + ': Error: No text received');
				}
				else {
					//Nifty little setup here: can't put the plain text into a document node,
					//so instead we create an html element and put everything relevant in that.
					//But since <html> isn't a document, it doesn't have document.getElementById,
					//so we create a pseudo getElementById and bind that.
					var result = document.createElement('html');
					result.innerHTML = xhr.response.substring(xhr.response.indexOf('>', xhr.response.indexOf('<html')) + 1, xhr.response.lastIndexOf('</html>'));
					result.getElementById = function(id) {var els = this.getElementsByTagName('*'); for(var i in els) {if(els[i].id == id) {return els[i];}}}
					console.log('indexQuery: ' + page + ': Retrieved');
					if(typeof query.callback == 'function') {query.callback(result);}
					if(query.nested) {query.parent.send(query.nested);} //Send nested query
					else if(typeof query.callback == 'object') { //If nothing in .nested, check if the callback is a valid object
						if(query.callback.type && query.callback.headers && query.callback.params.action) { //If it has a type, headers, and an action, it can be evaluated as a query
							query.parent.send(query.callback);
						}
					}
				}
				if(query.params.token) {delete query.params.token;}
			}
			else if(xhr.readyState == 4) { //request completed, but status is not ok
				console.log('indexQuery: ' + page + ': Error: Protocol error');
				throw new Error('Terminating query');
			}
		}
		console.log('indexQuery: ' + page + ': Query sent');
		if(query.type == 'GET') {xhr.send();}
		else {xhr.send(params);}
 	
		if(clear == true) {
			return this.clear(req);
		}
	}
	//Sends all queries
	//Accepts a boolean for clearing all queries once sent
	//Returns the object. Success/failure of all queries is logged in console.
	this.sendAll = function(clear) {
		for(var i = 0; i < this.length; i++) {
			this.send(i);
		}
		if(clear) {this.clearAll();}
		return this;
	}
	 
	//Function for reading formatted info of a query
	//Accepts index of query or the query itself
	//Returns info on the query
	this.read = function(req) {
		if(typeof req == 'number') {var query = this[req];}
		else if(typeof req == 'object') {var query = req;}
		else {
			throw new TypeError('Invalid reference parameter');
		}
		var page = query.params.title;
		var params = '';
		var headers = '';
		for(var i in query.params) {params += ', ' + i + '=' + query.params[i];}
		params = params.substring(2, params.length);
		for(var i in query.headers) {headers += ', ' + i + ': ' + query.headers[i];}
		headers = headers.substring(2, headers.length);
		return query.type + ': ' + query.params.action + ' ' + page + '\n    ' + params + '\n    ' + headers;
	}
	//Get info of all queries
	//Void
	//Returns info on all queries
	this.readAll = function() {
		var info = [];
		for(var i = 0; i < this.length; i++) {
			var query = this[i];
			var page = query.params.title
			var params = '';
			var headers = '';
			for(var j in query.params) {params += ', ' + j + '=' + query.params[j];}
			params = params.substring(2, params.length);
			for(var j in query.headers) {headers += ', ' + j + ': ' + query.headers[j];}
			headers = headers.substring(2, headers.length);
			info.push(query.type + ': ' + page + '\n    ' + params + '\n    ' + headers);
		}
		return info.join('\n ');
	}
	
	//Function for removing a query
	//Accepts the index of the query or the query itself
	//Returns the removed query
	this.clear = function(ref) {
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
	this.clearAll = function() {
		for(var i = 0; i < this.length; i++) {
			delete this[i];
		}
		this.length = 0;
	}
}

function sajax_init_object() {var a;try{a=new XMLHttpRequest()}catch(d){try{a=new ActiveXObject("Msxml2.XMLHTTP")}catch(d){try{a=new ActiveXObject("Microsoft.XMLHTTP")}catch(b){a=null}}}return a}
 
window.index = new IndexQuery();
//These make it easier to make new queries, because you won't need to use quotes
window.GET = 'GET';
window.POST = 'POST';