/* 
 * APIQuery.js, by Monchoman45
 * See http://community.wikia.com/api.php
 * 
 * Usage notes: 
 *   Create a new query with api.newQuery().
 *   Accepts type (GET or POST), parameters (action=edit&title=Page), and a callback function.
 *   The new query is stored at api[0], subsequent queries are stored at api[1], api[2], etc.
 *   The callback function and type can be read or set with api[0].callback and api[0].type.
 *   Headers and parameters can be read or set with api[0].headers.nameofheader and api[0].params.nameofparam.
 *   All headers and parameters will be accounted when the query is sent.
 *   To send your query, use api.send(0) or api[0].send().
 *   To see formatted info on your query, use api.read(0) or api[0].read().
 *   To delete your query, use api.clear(0).
 *   To delete your query after sending it, use api.send(0, true) or api[0].send(true).
 *   To send, read, or clear all queries, use api.sendAll(), api.readAll(), or api.clearAll() respectively.
 *   
 *   Queries requiring tokens will have their tokens auto-fetched before they are sent.
 *   All callback functions have one parameter passed into them, which is the object returned by the query.
 *   Query type can be defined without quotes, just GET or POST.
 *   Query parameters in this.newQuery () can be specified 3 ways:
 *     In a string separated by commas or ampersands: 'action=edit,title=Page' or 'action=edit&title=Page', 
 *     In an array: ['action=edit', 'title=Page'],
 *     Or in an object: {action: 'edit', title: 'Page'}.
 *   Queries can be nested (eg, perform a query, and use information from that in another query) by
 *     creating the first query as a normal query, and setting the callback as another query object, eg:
 *     api.newQuery(GET, 'action=query,prop=info', api.newQuery(POST, 'action=edit'));
 *     The above will send a query to action=query&prop=info, then will send a query to action=edit after the first is received.
 */

APIQuery = function() {
	if(!(this instanceof APIQuery)) {return new APIQuery();}
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
		this.params = {format: 'json'};
		this.headers = {'Content-type': 'application/x-www-form-urlencoded'};
		this.hash = {};
		this.callback = callback;
		this.parent = parent;
		this.nested = undefined;
		this.baseurl = '/api.php';
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
		if(!query.params.action) {
			throw new ReferenceError('No action');
		}
		//This isn't in the switch statement because the error has to be set up the way it is
		if(query.params.action == 'insert' || query.params.action == 'update' ||  query.params.action == 'wdelete' || query.params.action == 'featuredcontent' || query.params.action == 'partnerwikiconfig' || query.params.action == 'runjob' || query.params.action == 'blob' || query.params.action == 'blogs' || query.params.action == 'logout' || query.params.action == 'opensearch' || query.params.action == 'feedwatchlist' || query.params.action == 'help' || query.params.action == 'paraminfo' || query.params.action == 'import' || query.params.list == 'logevents' || query.baseurl != '/api.php') {var page = '';} //these actions have no target
		else {
			if(query.params.action == 'emailuser') {var page = query.params.target;}
			else if(query.params.action == 'createmultiplepages') {var page = query.params.pagelist;}
			else if(query.params.action == 'upload') {var page = query.params.filename;}
			else if(query.params.action == 'login') {var page = query.params.lgname;}
			else if(query.params.action == 'imagecrop') {var page = query.params.imgId;}
			else if(query.params.action == 'move') {var page = query.params.from;}
			else if(query.params.list == 'backlinks') {var page = query.params.bltitle;}
			else if(query.params.list == 'categorymembers') {var page = query.params.cmtitle;}
			else if(query.params.list == 'embeddedin') {var page = query.params.eititle;}
			else if(query.params.list == 'imageusage') {var page = query.params.iutitle;}
			else if(query.params.list == 'users') {var page = query.params.ususers;}
			else if(query.params.list == 'usercontribs') {var page = query.params.ucuser;}
			else if(query.params.list == 'watchlist') {var page = query.params.wlowner;}
			else if(query.params.action == 'block' || query.params.action == 'unblock' || query.params.action == 'userrights') {var page = query.params.user;}
			else if(query.params.action == 'edit' || query.params.action == 'delete' || query.params.action == 'protect' || query.params.action == 'expandtemplates' || query.params.action == 'parse' || query.params.action == 'rollback' || query.params.action == 'undelete' || query.params.action == 'watch') {var page = query.params.title;}
			else {var page = query.params.titles;}
			if(!page) {
				throw new ReferenceError('No target for action that requires target, or unrecognized/unsupported action');
			}
		}
		if(!query.params.token && !query.params.lgtoken && (query.params.action == 'edit' || query.params.action == 'rollback' || query.params.action == 'upload' || query.params.action == 'delete' || query.params.action == 'undelete' || query.params.action == 'move' || query.params.action == 'protect' || query.params.action == 'login' || query.params.action == 'userrights' || query.params.action == 'emailuser' || query.params.action == 'import' || query.params.action == 'block' || query.params.action == 'unblock')) {
			switch(query.params.action) {
				case 'rollback':
					var qtoken = new this.Query(query.parent, GET, 'action=query&format=json&indexpageids=1&prop=revisions&rvtoken=rollback&indexpageids=1&titles=' + page, function(result) {
						query.nested.params.token = result.query.pages[result.query.pageids[0]].revisions[0].rollbacktoken;
						//make sure we have the token - otherwise, we get infinite loops, which is really, really bad with this stuff.
						if(!query.nested.params.token) {throw new Error('No token found. Query chain automatically terminated to prevent infinite looping.');}
					});
					break;
				case 'import':
				case 'undelete':
					var qtoken = new this.Query(query.parent, GET, 'action=query&format=json&indexpageids=1&prop=info&intoken=edit&titles=' + page, function(result) {
						query.nested.params.token = result.query.pages[result.query.pageids[0]]['edittoken'];
						if(!query.nested.params.token) {throw new Error('No token found. Query chain automatically terminated to prevent infinite looping.');}
					});
					break;
				case 'login':
					var qtoken = new this.Query(query.parent, POST, 'action=login&format=json&lgname=' + page + '&lgpassword=' + query.params.password, function(result) {
						query.nested.params.lgtoken = result.login.token;
						if(!query.nested.params.lgtoken) {throw new Error('No token found. Query chain automatically terminated to prevent infinite looping.');}
					});
					break;
				case 'userrights':
					var qtoken = new this.Query(query.parent, GET, 'action=query&format=json&indexpageids=1&list=users&ustoken=userrights&ususers=' + page, function(result) {
						query.nested.params.token = result.query.users[0].userrightstoken;
						if(!query.nested.params.token) {throw new Error('No token found. Query chain automatically terminated to prevent infinite looping.');}
						});
					break;
				default:
					var qtoken = new this.Query(query.parent, GET, 'action=query&format=json&prop=info&indexpageids=1&intoken=' + ((query.params.action == 'upload') ? 'edit' : query.params.action) + ((query.params.action == 'import') ? '' : '&titles=' + page), function(result) {
						query.nested.params.token = result.query.pages[result.query.pageids[0]][query.nested.params.action + 'token'];
						if(!query.nested.params.token) {throw new Error('No token found. Query chain automatically terminated to prevent infinite looping.');}
						});
					break;
			}
			for(var j in query.hash) {if(j != 'log') {qtoken.hash[j] = query.hash[j];}}
			qtoken.nested = query;
			query = qtoken; //voila, it's nested
 		}
 
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
				var cont = true;
				if(query.params.format == 'json') {
					eval('var result = ' + xhr.responseText);
					if(result.error) {
						console.log('apiQuery: ' + query.params.action + (page ? ' ' + page : '') + ': Error: ' + result.error.code + ' - ' + result.error.info);
						cont = false;
					}
				}
				if(query.params.format == 'xml') {
					var result = xhr.responseXML;
					if(result.getElementsByTagName('error').length > 0) {
						console.log('apiQuery: ' + query.params.action + (page ? ' ' + page : '') + ': Error: ' + result.getElementsByTagName('error')[0].code + ' - ' + result.getElementsByTagName('error').info);
						cont = false;
					}
				}
				if(cont) {
					console.log('apiQuery: ' + query.params.action + (page ? ' ' + page : '') + ': Success');
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
				console.log('apiQuery: ' + query.params.action + (page ? ' ' + page : '') + ': Error: Protocol error', true);
				throw new Error('Terminating query');
			}
		}
		console.log('apiQuery: ' + query.params.action + (page ? ' ' + page : '') + ': Query sent');
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
		if(query.params.action == 'email') {var page = query.params.target;}
		else if(query.params.action == 'block' || query.params.action == 'unblock') {var page = query.params.user;}
		else if(query.params.action == 'edit' || query.params.action == 'delete' || query.params.action == 'protect' || query.params.action == 'move') {var page = query.params.title;}
		else {var page = query.params.titles;}
		if(!page) {
			var page = '';
		}
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
			if(query.params.action == 'email') {var page = query.params.target;}
			else if(query.params.action == 'block' || query.params.action == 'unblock') {var page = query.params.user;}
			else if(query.params.action == 'edit' || query.params.action == 'delete' || query.params.action == 'protect' || query.params.action == 'move') {var page = query.params.title;}
			else {var page = query.params.titles;}
			if(!page) {
				var page = '';
			}
			var query = this[i];
			var params = '';
			var headers = '';
			for(var j in query.params) {params += ', ' + j + '=' + query.params[j];}
			params = params.substring(2, params.length);
			for(var j in query.headers) {headers += ', ' + j + ': ' + query.headers[j];}
			headers = headers.substring(2, headers.length);
			info.push(query.type + ': ' + query.params.action + ' ' + page + '\n    ' + params + '\n    ' + headers);
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
 
window.api = new APIQuery();
//These make it easier to make new queries, because you won't need to use quotes
window.GET = 'GET';
window.POST = 'POST';