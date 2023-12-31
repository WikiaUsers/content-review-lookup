/************** Browser Based Bot **************
 *              A JS bot framework             *
 * ------------------------------------------- *
 *    Written and maintained by Monchoman45    *
 *      https://github.com/Monchoman45/B3      *
 ***********************************************/
// <nowiki>
if(window.B3) {throw new Error('B3 already loaded');}

var B3 = {
	version: 103,
	pretty_version: '1.0.3',

	init: false,

	token: '',

	action: {},
	prop: {},
	list: {},
	meta: {},
	api: {},

	classes: {},

	modules: {
		action: {},
		query: {},
		data_mergers: {},
		query_mergers: {},
	},

	m: {}, //FIXME:

	queue: {
		active: [], //Requests waiting for a response
		tasks: [], //All tasks
		listeners: {},
	},

	settings: {
		longpost: 8000, //POST requests where one parameter value is this length or greater will use multipart/form-data
		maxactive: 10, //Maximum active requests 
		maxretry: 5, //Maximum number of times to resend requests that are generically bounced

		wpmode: false, //Wikipedia mode, for lame bureaucracy
		wpdelay: 1000, //Time between requests (in ms)
	},

	listeners: {},

	util: {},
};

//Set apipath and indexpath
B3.settings.apipath = mw.config.get('wgScriptPath') + '/api.php';
B3.settings.indexpath = mw.config.get('wgScriptPath') + '/index.php';
B3.token = mw.user.tokens.get('csrfToken');

B3.util.debug = function() {console.log.apply(console, arguments);};
B3.util.null = function() {};

B3.util.add_listener = function(listener, func) {
	if(Array.isArray(func)) {
		for(var i = 0; i < func.length; i++) {this.add_listener(listener, func[i]);}
		return true;
	}
	else if(typeof func == 'function') {
		if(this.listeners[listener]) {this.listeners[listener].push(func);}
		else {this.listeners[listener] = [func];}
		return true;
	}
	return false;
};
B3.util.remove_listener = function(listener, func) {
	if(Array.isArray(func)) {
		for(var i = 0; i < func.length; i++) {this.remove_listener(listener, func[i]);}
		return true;
	}
	else if(typeof func == 'function') {
		if(this.listeners[listener]) {
			var index = this.listeners[listener].indexOf(func);
			if(index != -1) {
				this.listeners[listener].splice(index, 1);
				return true;
			}
		}
	}

	return false;
};
B3.util.call_listeners = function(listener) {
	if(this.listeners[listener]) {
		var args = Array.prototype.slice.call(arguments, 1);
		var ret = [];
		for(var i = 0; i < this.listeners[listener].length; i++) {ret.push(this.listeners[listener][i].apply(this, args));}
		return ret;
	}
	else {return false;}
};

B3.add_listener = B3.util.add_listener;
B3.remove_listener = B3.util.remove_listener;
B3.call_listeners = B3.util.call_listeners;

B3.util.flatten = function(params) {
	var ret = [];
	var maxindex = 1;
	for(var i = 0; i < maxindex; i++) {
		var p = {};
		for(var j in params) {
			if(Array.isArray(params[j])) {
				if(params[j].length > maxindex) {maxindex = params[j].length;}
				if(i >= params[j].length) {p[j] = params[j][params[j].length - 1];}
				else {p[j] = params[j][i];}
			}
			else {p[j] = params[j];}
		}
		ret.push(p);
	}
	return ret;
};

B3.util.cap = function(str) {return str.charAt(0).toUpperCase() + str.substring(1);};
B3.util.normalize_pagename = function(page) {
	if(page.indexOf(':') != -1) { //Namespace:Title
		var namespace = page.substring(0, page.indexOf(':'));
		var title = page.substring(page.indexOf(':') + 1);
		page = B3.util.cap(namespace) + ':' + B3.util.cap(title);
	}
	else {page = B3.util.cap(page);} //Title (mainspace)
	while(page.indexOf('_') != -1) {page = page.replace('_', ' ');}
	return page;
};

B3.util.find = function(arr, prop, val) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i][prop] == val) {return arr[i];}
	}
	return false;
};

B3.util.copy = function(obj) {
	if(Array.isArray(obj)) {
		var copy = [];
		for(var i = 0; i < obj.length; i++) {copy.push(obj[i]);}
		return copy;
	}
	else if(typeof obj == 'object') {
		var copy2 = {};
		for(var j in obj) {
			if (obj.hasOwnProperty(j)) {
				copy2[j] = obj[j];
			}
		}
		return copy2;
	}
	else {return obj;}
};
B3.util.deepcopy = function(obj) {
	if(Array.isArray(obj)) {
		var copy = [];
		for(var i = 0; i < obj.length; i++) {copy.push(B3.util.deepcopy(obj[i]));}
		return copy;
	}
	else if(typeof obj == 'object') {
		var copy2 = {};
		for(var j in obj) {
			if (obj.hasOwnProperty(j)) {
				copy2[j] = B3.util.deepcopy(obj[j]);
			}
		}
		return copy2;
	}
	else {return obj;}
};

B3.util.softmerge = function(dest, source, prefix) {
	if(!prefix) {prefix = '';}

	for(var i in source) {
		if (source.hasOwnProperty(i)) {
			if(!dest[prefix + i]) {dest[prefix + i] = source[i];}
		}
	}
};
B3.util.hardmerge = function(dest, source, prefix) {
	if(!prefix) {prefix = '';}

	for(var i in source) {
		if (source.hasOwnProperty(i)) {
			dest[prefix + i] = source[i];
		}
	}
};

B3.util.driver_merge = function(params, modules) {
	if(params.prop) {params.prop = [params.prop];}
	else {params.prop = [];}
	if(params.list) {params.list = [params.list];}
	else {params.list = [];}
	if(params.meta) {params.meta = [params.meta];}
	else {params.meta = [];}

	for(var i = 0; i < modules.length; i++) {
		for(var j in modules[i]) {
			if((j == 'prop' || j == 'list' || j == 'meta') && params[j].indexOf(modules[i][j]) == -1) {params[j].push(modules[i][j]);}
			else if(j == 'qmodule') {params.qmodule.push(modules[i][j]);}
			else if(!params[j]) {params[j] = modules[i][j];}
			else {} //TODO: throw error?
		}
	}

	if(params.prop.length > 0) {params.prop = params.prop.join('|');}
	else {delete params.prop;}
	if(params.list.length > 0) {params.list = params.list.join('|');}
	else {delete params.list;}
	if(params.meta.length > 0) {params.meta = params.meta.join('|');}
	else {delete params.meta;}

	return params;
};

B3.util.message = function(message) {
	if(!message) {return '';} //FIXME: complain?

	for(var i = 1; i < arguments.length; i++) {
		while(message.indexOf('$' + i) != -1) {message = message.replace('$' + i, arguments[i]);}
	}
	return message;
};

B3.util.pagelist = function(pages) {
	var list = new B3.classes.List();
	for(var i = 0; i < pages.length; i++) {list.pages[pages[i]] = {title: pages[i]};}
	return list;
};
B3.util.userlist = function(users) {
	var list = new B3.classes.List();
	for(var i = 0; i < users.length; i++) {list.users[users[i]] = {name: users[i]};}
	return list;
};

B3.util.output_join = function() {this.output_list.join(this.input_list);};
B3.util.output_intersect = function() {this.output_list.intersect(this.input_list);};
B3.util.output_subtract = function() {this.output_list.subtract(this.input_list);};
B3.util.output_xor = function() {this.output_list.xor(this.input_list);};
B3.util.output_cull = function() {this.output_list.cull(this.input_list);};
B3.util.output_empty = function() {this.output_list.empty();};

B3.util.load_js = function(url) {
	var js = document.createElement('script');
		js.className = 'b3-js';
		js.src = url;
		js.type = 'text/javascript';
	document.head.appendChild(js);
	return js;
};

B3.util.load_css = function(url) {
	var css = document.createElement('link');
		css.className = 'b3-css';
		css.href = url;
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.media = 'screen';
	document.head.appendChild(css);
	return css;
};

/*
 * Run waiting requests
 *
 * If settings.maxactive is 0, run every waiting request
 * Otherwise, run waiting requests until the number of active requests equals settings.maxactive
 */
B3.queue.flush = function() {
	if(B3.queue.tasks.length == 0) {return false;}

	var first_empty = false; //this is used to check if the entire queue is out of runnable tasks
	while(B3.queue.active.length < B3.settings.maxactive || B3.settings.maxactive == 0) {
		var request;
		if(!B3.settings.wpmode) {
			var task = B3.queue.tasks.shift();
			B3.queue.tasks.push(task);

			request = task.next_request();
			if(!request) {
				if(first_empty == task) {return true;} //entire queue is working, we have nothing to run
				else if(!first_empty) {first_empty = task;}
				continue;
			}
			else {first_empty = false;} //someone has a task, and they may have more, even if everyone else has none
		}
		else {
			request = B3.queue.tasks[0].next_request();
			if(!request) {return false;}
		}

		request.add_listener('complete', B3.queue.req_complete);
		B3.queue.active.push(request);
		request.send();
		B3.queue.call_listeners('run', request);
	}

	return true;
};

B3.queue.push = function(task) {
	if(B3.queue.tasks.indexOf(task) != -1) {return false;}

	B3.queue.tasks.push(task);
	B3.queue.flush();
	B3.queue.call_listeners('push');
	return true;
};

B3.queue.remove = function(task) {
	var index = B3.queue.tasks.indexOf(task);
	if(index == -1) {return false;}

	B3.queue.tasks.splice(index, 1);
	B3.queue.call_listeners('remove');
	return true;
};

B3.queue.req_complete = function(xhr) {
	this.remove_listener('complete', B3.queue.req_complete);

	B3.queue.active.splice(B3.queue.active.indexOf(this), 1);
	B3.queue.call_listeners('complete', this);
	if(!B3.settings.wpmode) {B3.queue.flush();}
	else {setTimeout(B3.queue.flush, B3.settings.wpdelay);}
};

B3.queue.add_listener = B3.util.add_listener;
B3.queue.remove_listener = B3.util.remove_listener;
B3.queue.call_listeners = B3.util.call_listeners;

B3.classes.Request = function(method, url, params, options, callback) {
	if(!(this instanceof B3.classes.Request)) {throw new Error('B3.classes.Request must be called with `new`.');}

	this.method = method;
	this.url = url;
	this.params = params;
	this.options = options;

	this.retry = 0;
	this.sending = false;
	this.complete = false;

	this.listeners = {};
	this.add_listener('complete', callback);

	this.xhr = new XMLHttpRequest();
	this.xhr.request = this;
	this.xhr.addEventListener('loadend', B3.classes.Request.loadend);
};

B3.classes.Request.prototype.send = function() {
	if(this.sending) {return false;}
	this.complete = false; //this allows us to resend completed requests

	if(this.method == 'POST') {
		this.xhr.open(this.method, this.url, true);
		this.xhr.setRequestHeader('Api-User-Agent', 'B3/' + B3.version);

		var upload = this.options.upload; //B3.settings.longpost may set this to true just for this one particular call
		if(!upload && B3.settings.longpost > 0) {
			for(var j in this.params) {
				if(this.params[j].length > B3.settings.longpost) {upload = true; break;}
			}
		}
		if(upload) {
			//two characters from the messed up end of the charset, and two numbers between 0 and 65536 in hex
			var boundary = String.fromCharCode(Math.floor(Math.random() * 128 + 128)) + String.fromCharCode(Math.floor(Math.random() * 128 + 128)) + Math.floor(Math.random() * 65536).toString(16) + Math.floor(Math.random() * 65536).toString(16);
			this.xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
			var data = '--' + boundary;
			for(var i in this.params) {
				if (this.params.hasOwnProperty(i)) {
					data += '\nContent-Disposition: form-data; name="' + i + '"\n\n' + this.params[i] + '\n--' + boundary;
				}
			}
			this.xhr.send(data + '--');
		}
		else {
			this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			var query = '';
			for(var k in this.params) {
				if (this.params.hasOwnProperty(k)) {
					query += k + '=' + encodeURIComponent(this.params[k]) + '&';
				}
			}
			this.xhr.send(query.substring(0, query.length - 1));
		}
	}
	else {
		var url = this.url + '?';
		for(var i in this.params) {
			if (this.params.hasOwnProperty(i)) {
				url += i + '=' + encodeURIComponent(this.params[i]) + '&';
			}
		}
		this.xhr.open(this.method, url.substring(0, url.length - 1), true);
		this.xhr.setRequestHeader('Api-User-Agent', 'B3/' + B3.version);
		this.xhr.send();
	}

	this.sending = true;
	this.call_listeners('send');
	return true;
};

B3.classes.Request.prototype.abort = function() {
	if(this.sending) {this.xhr.abort();}
};

B3.classes.Request.loadend = function(event) {
	this.request.sending = false;
	this.request.complete = true;
	this.request.call_listeners('complete', this);
};

B3.classes.Request.prototype.add_listener = B3.util.add_listener;
B3.classes.Request.prototype.remove_listener = B3.util.remove_listener;
B3.classes.Request.prototype.call_listeners = B3.util.call_listeners;

B3.classes.List = function() {
	if(!(this instanceof B3.classes.List)) {throw new Error('B3.classes.List must be called with `new`.');}

	this.pages = {};
	this.users = {};
	this.ext = {};
};
B3.classes.List.prototype.join = function(list) {
	for(var i in list) {
		if (list.hasOwnProperty(i)) {
			for(var j in list[i]) {
				if (list[i].hasOwnProperty(j)) {
					if(!this[i][j]) {
						this[i][j] = list[i][j];
					} else {
						B3.util.softmerge(this[i][j], list[i][j]);
					}
				}
			}
		}
	}
	return this;
};
B3.classes.List.prototype.intersect = function(list) {
	for(var i in this) {
		if (this.hasOwnProperty(i)) {
			for(var j in this[i]) {
				if (this[i].hasOwnProperty(j)) {
					if(!list[i][j]) {delete this[i][j];}
					else {B3.util.softmerge(this[i][j], list[i][j]);}
				}
			}
		}
	}
	return this;
};
B3.classes.List.prototype.subtract = function(list) {
	for(var i in this) {
		if (this.hasOwnProperty(i)) {
			for(var j in this[i]) {
				if (this[i].hasOwnProperty(j)) {
					if(list[i][j]) {
						delete this[i][j];
					} else {
						B3.util.softmerge(this[i][j], list[i][j]);
					}
				}
			}
		}
	}
	return this;
};
B3.classes.List.prototype.xor = function(list) {
	for(var i in list) {
		if (list.hasOwnProperty(i)) {
			for(var j in list[i]) {
				if (list[i].hasOwnProperty(j)) {
					if(this[i][j]) {
						delete this[i][j];
					} else {
						this[i][j] = list[i][j];
					}
				}
			}
		}
	}
	return this;
};
B3.classes.List.prototype.cull = function(list) {
	return this.xor(list).intersect(list);
};
B3.classes.List.prototype.empty = function() {
	for(var i in this) {
		if (this.hasOwnProperty(i)) {
			for(var j in this[i]) {
				if (this[i].hasOwnProperty(j)) {
					delete this[i][j];
				}
			}
		}
	}
	return this;
};

B3.classes.Scheduleable = function() {
	this.working = false;
	this.complete = false;
	this.listeners = {};
};
B3.classes.Scheduleable.prototype.next_request = function() {throw new Error('B3: Default function Scheduleable.next_request was called');};
B3.classes.Scheduleable.prototype.cancel = function() {throw new Error('B3: Default function Scheduleable.cancel was called');};
B3.classes.Scheduleable.prototype.run = function() {
	if(!this.working && !this.complete) {
		this.working = true;
		B3.queue.push(this);
		this.add_listener('complete', function() {B3.queue.remove(this);});
		this.call_listeners('run');
	}
	return this;
};

B3.classes.Scheduleable.prototype.add_listener = B3.util.add_listener;
B3.classes.Scheduleable.prototype.remove_listener = B3.util.remove_listener;
B3.classes.Scheduleable.prototype.call_listeners = B3.util.call_listeners;

// Queue up a request to the API
//
// method - HTTP method to use (GET or POST)
// url - URL of the request (you probably want B3.settings.apipath)
// params - Object of parameters to send
// options - Assorted options
// complete - A function run when all requests have been processed, successfully or otherwise
// success - A function run when a single request is completed without errors
// failure - A function run when a single request was unable to be completed
//
// `params` can contain arrays of properties to send, to indicate different parameters for similar requests.
// Example: {
//      action: 'delete',
//      title: ['Foo', 'Bar', 'Baz'],
//      token: ['1+\\', '2+\\', '3+\\']
// }
// The above will send 3 requests, the first being action=delete&title=Foo&token=1%2B\, the second will be Bar and 2+\, etc.
// `success` or `failure` will be called when any one of these requests returns.
// `complete` will be called when all 3 have returned.
//
// If one or more arrays are shorter than others, the last value in the array will be repeated.
// For example, if 'token' above was ['1+\\', '2+\\'], both Bar and Baz would have the token 2+\.
//
// Requests that receive generic random errors will be retried up to settings.maxretry times.
// If a failure callback returns true, the request will be retried.
// The request can be retried as many times as desired, but it will not be automatically resent if it receives a generic error and has been retried more than settings.maxretry times.
// If a success callback returns false, it will be unflagged as successful and flagged as failed, and then the failure callback will be run.
B3.classes.Task = function(method, url, params, options, complete, success, failure) {
	if(!(this instanceof B3.classes.Task)) {throw new Error('B3.classes.Task must be called with `new`.');}
	B3.classes.Scheduleable.call(this);

	this.method = method;
	this.url = url;
	this.options = options;

	this.input_list = new B3.classes.List();
	this.output_list = new B3.classes.List();

	this.params = params;

	this.active = [];
	this.waiting = [];
	this.succeeded = [];
	this.failed = [];

	this.add_listener('complete', complete);
	this.add_listener('success', success);
	this.add_listener('failure', failure);

	this.length = 0;

	var module = B3.modules.action[params.module];
	if(!module) {throw new Error('B3 Task: tried to create task with invalid module `' + params.module + '`');}

	for(var i in module.param_generators) {
		if (module.param_generators.hasOwnProperty(i)) {
			this.add_listener('generate_' + i, module.param_generators[i]);
		}
	}

	this.compiled = false;
};
B3.classes.Task.prototype = Object.create(B3.classes.Scheduleable.prototype);

B3.classes.Task.prototype.req_callback = function(xhr) {
	this.task.active.splice(this.task.active.indexOf(this), 1);

	if(xhr.status == 200) {
		if(xhr.responseText == '[]' || xhr.responseText == '') {
			var code = 'empty';
			var info = 'Server returned empty response';
		}
		else {
			try {var response = JSON.parse(xhr.responseText);}
			catch(err) {var response = xhr.responseText;}

			if(response.error) {
				var code = response.error.code;
				var info = response.error.info;
			}
			else {return this.task.req_success(this, response);} //success
		}
	}
	else if(xhr.status == 414 && this.method == 'GET') { //request too long
		this.method = 'POST';
		this.task.waiting.push(this);
		return;
	}
	else if(xhr.status == 0) {
		var code = 'aborted';
		var info = 'Request was aborted by client';
	}
	else {
		var code = 'http';
		var info = xhr.status;
	}

	//failure
	this.task.req_failure(this, code, info);
};

B3.classes.Task.prototype.req_success = function(request, response) {
	this.merge_data(response);

	var callbacks = this.call_listeners('success', request, response);
	for(var i = 0; i < callbacks.length; i++) {
		if(callbacks[i] === false) { //someone rejected this
			this.req_failure(request, 'rejected', 'A success callback rejected the response.');
			return;
		}
	}

	this.succeeded.push(request);
	if(this.waiting.length == 0 && this.active.length == 0) {this.done();}
};

B3.classes.Task.prototype.req_failure = function(request, code, info) {
	if(code == 'internal_api_error_DBQueryError') {
		request.retry++;
		if(B3.settings.maxretry == 0 || request.retry < B3.settings.maxretry) {
			this.waiting.push(request);
			return;
		}
	}

	var callbacks = this.call_listeners('failure', request, code, info);
	for(var i = 0; i < callbacks.length; i++) {
		if(callbacks[i]) { //someone wanted this to be retried
			request.retry++;
			this.waiting.push(request);
			return;
		}
	}

	this.failed.push(request);
	if(this.waiting.length == 0 && this.active.length == 0) {this.done();}
};

B3.classes.Task.prototype.compile = function() {
	if(this.compiled) {return false;}

	for(var i in this.input_list) {
		if (this.input_list.hasOwnProperty(i)) {
			if(!this.listeners['generate_' + i] || this.listeners['generate_' + i].length == 0) {continue;}

				for(var j in this.input_list[i]) {
					if (this.input_list[i].hasOwnProperty(j)) {
						var params = {};
						this.call_listeners('generate_' + i, params, this.input_list[i][j]);
						if(Object.getOwnPropertyNames(params).length > 0) {
						if(this.url == B3.settings.apipath) { //FIXME: do we need this
							params.format = 'json';
							params.bot = '1';
						}

						this.add(params);
					}
				}
			}
		}
	}
	this.call_listeners('compile');
	this.compiled = true;
	return true;
};

B3.classes.Task.prototype.add = function(params) {
	var reqs = B3.util.flatten(params);
	for(var i = 0; i < reqs.length; i++) {
		var request = new B3.classes.Request(this.method, this.url, reqs[i], this.options, this.req_callback);
		request.task = this;
		this.waiting.push(request);
		this.length++;
	}
};

B3.classes.Task.prototype.next_request = function() {
	if(!this.compiled) {this.compile();}
	if(this.waiting.length == 0) {return false;}

	var request = this.waiting.shift();
	this.active.push(request);
	this.call_listeners('next', request);
	return request;
};

B3.classes.Task.prototype.done = function() {
	this.working = false;
	this.complete = true;
	this.call_listeners('complete', this.output_list);
};

B3.classes.Task.prototype.cancel = function() {
	//fail everything waiting first, then abort all active requests
	//when all the async settles, there should be no requests left to run and complete will get called
	while(this.waiting.length > 0) {
		var request = this.waiting.shift();
		this.failed.push(request);
		this.call_listeners('failure', request, 'aborted', 'Request was aborted by client');
	}
	if(this.active.length > 0) {
		for(var i = 0; i < this.active.length; i++) {this.active[i].abort();}
	}
	else {this.done();} //nothing was running, so everything is definitely dead
};

B3.classes.Task.prototype.merge_data = function(query) {
	for(var i in query) {
		if (query.hasOwnProperty(i)) {
			if(i == 'query') {
				for(var j in query[i]) {
					if(B3.modules.query_mergers[j]) {
						for(var k = 0; k < B3.modules.query_mergers[j].length; k++) {B3.modules.query_mergers[j][k].call(this, query[i][j], j);}
					}
				}
			}
			if(B3.modules.data_mergers[i]) {
				for(var j = 0; j < B3.modules.data_mergers[i].length; j++) {B3.modules.data_mergers[i][j].call(this, query[i], i);}
			}
		}
	}
};

/* Job, for scheduling Tasks
 * each task is run and completed in order
 */
B3.classes.Job = function(tasks, complete, success, failure) {
	if(!(this instanceof B3.classes.Job)) {throw new Error('B3.classes.Job must be called with `new`.');}
	B3.classes.Scheduleable.call(this);

	this.tasks = [];
	this.index = 0;

	this.add_listener('complete', complete);
	this.add_listener('success', success);
	this.add_listener('failure', failure);

	this.add(tasks);
};
B3.classes.Job.prototype = Object.create(B3.classes.Scheduleable.prototype);

B3.classes.Job.prototype.add = function(tasks) {
	for(var i = 0; i < tasks.length; i++) {
		if(!(tasks[i] instanceof B3.classes.Scheduleable)) {throw new Error('B3: Tried to add non-schedulable object to Job:', tasks[i]);}

		tasks[i].job = this;
		tasks[i].add_listener('complete', this.task_complete);
		this.tasks.push(tasks[i]);
	}
	return tasks.length;
};

B3.classes.Job.prototype.next_request = function() {return this.tasks[this.index].next_request();};
B3.classes.Job.prototype.task_complete = function() {
	this.job.index++;
	if(this.job.index == this.job.tasks.length) {this.job.done();}
	else {this.job.tasks[this.job.index].input_list = this.ouput_list;}
};
B3.classes.Job.prototype.done = function() {
	this.working = false;
	this.complete = true;
	this.call_listeners('complete', this.tasks[this.tasks.length - 1].output_list);
};
B3.classes.Job.prototype.cancel = function() {
	//keep this.index where it is
	for(var i = this.index; i < this.tasks.length; i++) {this.tasks[i].remove_listener('complete', this.task_complete);}
	this.tasks[this.index].cancel();
	//TODO: what do we do with tasks that were never run?
};

/* AsyncJob, for running multiple Scheduleables at the same time
 * mostly, this allows you to bind listeners to a group of Tasks or Jobs that can be run at the same time
 */
B3.classes.AsyncJob = function(list, tasks, complete, success, failure) {
	if(!(this instanceof B3.classes.AsyncJob)) {throw new Error('B3.classes.AsyncJob must be called with `new`.');}
	B3.classes.Scheduleable.call(this);

	this.input_list = list;

	this.queue = [];
	this.completed = [];

	this.add_listener('complete', complete);
	this.add_listener('success', success);
	this.add_listener('failure', failure);

	this.add(tasks);
};
B3.classes.AsyncJob.prototype = Object.create(B3.classes.Scheduleable.prototype);

B3.classes.AsyncJob.prototype.add = function(tasks) {
	for(var i = 0; i < tasks.length; i++) {
		if(!(tasks[i] instanceof B3.classes.Scheduleable)) {throw new Error('B3: Tried to add non-schedulable object to Job');}

		tasks[i].job = this;
		tasks[i].input_list = this.input_list;
		tasks[i].add_listener('complete', this.task_complete);
		this.queue.push(tasks[i]);
	}
	return tasks.length;
};

B3.classes.AsyncJob.prototype.task_complete = function() {
	this.job.queue.splice(this.job.queue.indexOf(this), 1);
	this.job.completed.push(this);
	if(this.job.queue.length == 0) {this.job.done();}
};

B3.classes.AsyncJob.prototype.next_request = function() {
	var request = false;
	while(!request) {
		var task = this.queue.shift();
		this.queue.push(task);

		request = task.next_request();
		if(!request) {
			if(first_empty == task) {return false;} //entire queue is working, we have nothing to run
			else if(!first_empty) {first_empty = task;}
		}
		else {first_empty = false;} //someone has a task, and they may have more, even if everyone else has none
	}

	return request;
};
B3.classes.AsyncJob.prototype.done = function() {
	this.working = false;
	this.complete = true;
	var lists = [];
	for(var i = 0; i < this.tasks.length; i++) {lists.push(this.tasks[i].output_list);}
	this.call_listeners('complete', lists);
};
B3.classes.AsyncJob.prototype.cancel = function() {
	for(var i = 0; i < this.tasks.length; i++) {this.tasks[i].cancel();}
};

B3.modules.register_action = function(name, module) {
	if(typeof module.task_generator != 'function') {throw new Error('B3: tried to register a bad action module `' + name + '`: typeof task_generator != \'function\'');}
	if(B3.modules.action[name]) {throw new Error('B3: tried to reregister action module `' + name + '`');}
	//TODO: other validating things

	B3.modules.action[name] = module;
	B3.action[name] = module.task_generator;

	for(var i in module.data_mergers) {
		if (module.data_mergers.hasOwnProperty(i)) {
			if(!B3.modules.data_mergers[i]) {B3.modules.data_mergers[i] = [];}
			B3.modules.data_mergers[i].push(module.data_mergers[i]);
		}
	}


	B3.call_listeners('action_module', name, module);
};

B3.modules.register_query = function(name, module) {
	if((!module.type || (module.type != 'prop' && module.type != 'list' && module.type != 'meta')) && name != '') {
		throw new Error('B3: tried to register a bad query module `' + name + '`: invalid type `' + module.type + '`');
	}
	if(B3.modules.query[name]) {throw new Error('B3: tried to reregister query module `' + name + '`');}
	//TODO: other validating things

	B3.modules.query[name] = module;
	for(var i in module.query_generators) {
		if (module.query_generators.hasOwnProperty(i)) {
			B3[module.type][i] = module.query_generators[i];
		}
  }

	for(var i in module.query_mergers) {
		if (module.query_mergers.hasOwnProperty(i)) {
			if(!B3.modules.query_mergers[i]) {B3.modules.query_mergers[i] = [];}
			B3.modules.query_mergers[i].push(module.query_mergers[i]);
		}
	}

	B3.call_listeners('query_module', name, module);
};

B3.modules.page_querymerger = function(query) {
	for(var i = 0; i < query.length; i++) {
		var title = query[i].title;
		if(this.output_list.pages[title]) {B3.util.hardmerge(this.output_list.pages[title], query[i]);}
		else {this.output_list.pages[title] = query[i];}
	}
};
B3.modules.user_querymerger = function(query) {
	for(var i = 0; i < query.length; i++) {
		var user = query[i].name;
		if(this.output_list.users[user]) {B3.util.hardmerge(this.output_list.users[user], query[i]);}
		else {this.output_list.users[user] = query[i];}
	}
};

B3.modules.register_action('', {
	task_generator: function() {throw new Error('B3: task generator was called for null action');},
	param_generators: {
		pages: function() {throw new Error('B3: param generator was called for null action');},
		users: function() {throw new Error('B3: param generator was called for null action');},
	},
	data_mergers: {
		limits: B3.util.null,
		'query-continue': B3.util.null, //FIXME:
		warnings: B3.util.null, //FIXME:
		normalized: function(query) {
			for(var i = 0; i < query.length; i++) {
				var from = query[i].from;
				var to = query[i].to;
				if(this.output_list.pages[from]) {
					this.output_list.pages[to] = this.output_list.pages[from];
					delete this.output_list.pages[from];
				}
			}
		},
	},
});

B3.modules.register_query('', {
	type: '',
	prefix: '',
	generator: false,
	query_generators: {},
	param_generators: {},
	query_mergers: {
		pages: function(query) { //?action=query&titles=anything
			for(var i in query) {
				if (query.hasOwnProperty(i)) {
					var title = query[i].title;
					if(this.output_list.pages[title]) {B3.util.hardmerge(this.output_list.pages[title], query[i]);}
					else {this.output_list.pages[title] = query[i];}
				}
			}
		},
	},
});






/*------------------------------------------------------------------------------------------------
	api.php?action=query

	Common arguments:
		complete: A function run when all targets have been processed, whether successfully or otherwise
		success: A function run when a single action has been completed without errors (eg. one page deleted)
		failure: A function run when a single action was unable to be completed (eg. one page wasn't deleted because it doesn't exist)
  ------------------------------------------------------------------------------------------------*/

//FIXME: these task generators are very similar
B3.modules.register_action('query', {
	task_generator: function(titles, modules, complete, success, failure) {
		if(typeof titles != 'string') {titles = titles.join('|');}

		var params = {
			module: 'query',
			qmodule: [],
			action: 'query',
			format: 'json', //FIXME:
		};
		if(titles) {params.titles = titles;} //api.list will pass an empty string

		B3.util.driver_merge(params, modules);

		var task = new B3.classes.Task(
			'GET', B3.settings.apipath, params, {},
			complete, success, failure
		);
		if(params.qmodule.length > 0) {
			var seen = {};
			for(var i = 0; i < params.qmodule.length; i++) {
				var pgens = B3.modules.query[params.qmodule[i]].param_generators;
				for(var j in pgens) {
					if (pgens.hasOwnProperty(j)) {
						if(!seen[j]) {
							task.add_listener('generate_' + j, function(params) {
								var p = B3.util.copy(this.params);
								delete p.module;
								delete p.qmodule;
								B3.util.hardmerge(params, p);
							});
							seen[j] = true;
						}
						task.add_listener('generate_' + j, pgens[j]);
					}
				}
			}
		}
		else {
			task.add_listener('compile', function() {
				var params = B3.util.copy(this.params);
				delete params.module;
				delete params.qmodule;
				this.add(params);
			});
		}
		return task;
	},
	param_generators: {},
	data_mergers: {},
});

B3.modules.register_action('generator', {
	task_generator: function(generator, modules, complete, success, failure) {
		var params = {
			module: 'generator',
			qmodule: [],
			action: 'query',
			format: 'json', //FIXME:
		};
		for(var i in generator) {
			if(i == 'prop' || i == 'list' || i == 'meta') {
				if(!B3.modules.query[generator[i]].generator) {throw new Error('B3: can\'t use `' + i + '=' + generator[i] + '` as a generator');}
				else {params.generator = generator[i];}
			}
			else {params['g' + i] = generator[i];}
		}
		B3.util.driver_merge(params, modules);

		var task = new B3.classes.Task(
			'GET', B3.settings.apipath, params, {},
			complete, success, failure
		);
		if(params.qmodule.length > 0) {
			var seen = {};
			for(var i = 0; i < params.qmodule.length; i++) {
				var pgens = B3.modules.query[params.qmodule[i]].param_generators;
				for(var j in pgens) {
					if (pgens.hasOwnProperty(j)) {
						if(!seen[j]) {
							task.add_listener('generate_' + j, function(params) {
								var p = B3.util.copy(this.params);
								delete p.module;
								delete p.qmodule;
								B3.util.hardmerge(params, p);
							});
							seen[j] = true;
						}
						task.add_listener('generate_' + j, pgens[j]);
					}
				}
			}
		}
		else {
			task.add_listener('compile', function() {
				var params = B3.util.copy(this.params);
				delete params.module;
				delete params.qmodule;
				this.add(params);
			});
		}
		return task;
	},
	param_generators: {},
	data_mergers: {},
});

B3.api.token_regen = function(success, failure) {
	if(!B3.token) {return;} //already getting a new one

	//FIXME: put at the beginning of the queue
	B3.action.query('#', [B3.api.token('edit')], success, function(request, response) {
		B3.token = response.query.pages[-1].edittoken;
	}, failure).run();
};

B3.api.token = function(token) {
	switch(token) {
		case 'edit':
		case 'delete':
		case 'protect':
		case 'move':
		case 'block':
		case 'unblock':
		case 'email':
		case 'import':
		case 'watch':
			return {
				prop: 'info',
				intoken: token,
			};
		case 'undelete':
			return {
				list: 'deletedrevs',
				drprop: 'token',
			};
		case 'rollback':
			return {
				prop: 'revisions',
				rvtoken: 'rollback',
			};
		/*case 'patrol': //FIXME: limit
			var params = {
				list: 'recentchanges',
				rcprop: 'title|ids',
				rctoken: 'patrol',
			};
			if(limit) {params.rclimit = limit;}
			return params;
		case 'userrights': //FIXME: needs users
			return {
				list: 'users',
				ususers: users.join('|'),
				ustoken: 'userrights',
			};*/
		case 'preferences':
			return {
				meta: 'userinfo',
				uiprop: 'preferencestoken',
			};
		default:
			return {
				prop: 'info',
				intoken: 'edit',
			};
	}
};





/*------------------------------------------------------------------------------------------------
	api.php?action=
	TODO: expandtemplates, parse, compare, upload, filerevert, watch, patrol
	Maybe: opensearch, abusefilterchecksyntax, abusefilterevalexpression, abusefilterunblockautopromote, abusefiltercheckmatch

	Common arguments:
		complete: A function run when all targets have been processed, whether successfully or otherwise
		success: A function run when a single action has been completed without errors (eg. one page deleted)
		failure: A function run when a single action was unable to be completed (eg. one page wasn't deleted because it doesn't exist)
  ------------------------------------------------------------------------------------------------*/

/* Custom action for when there's no module for what you want to do
 * 
 * Args:
 * 	params: Params to send
 * 
 * Options:
 *
 * Examples:
 * 	B3.action.custom({
 * 		action: 'edit',
 * 		title: 'Foo',
 * 		text: 'bar'
 * 		token: B3.token,
 * 	})
 */
B3.modules.register_action('custom', {
	task_generator: function(params, complete, success, failure) {
		params.module = 'custom';

		var task = new B3.classes.Task(
			'POST', B3.settings.apipath, params, {},
			complete, success, failure
		);
		task.add_listener('compile', function() {
			var params = B3.util.copy(this.params);
			delete params.module;
			this.add(params);
		});
		return task;
	},
	param_generators: {},
	data_mergers: {},
});

/* Block users
 * 
 * Args:
 * 	expiry: Block length
 * 	reason: Edit summary
 * 
 * Options: (see [[mw:Help:Blocking users#Blocking]])
 * 	anononly: Only block IPs
 * 	nocreate: Prevent account creation
 * 	autoblock: Autoblock
 * 	noemail: Prevent user from sending email
 * 	hidename: Hide user from block log (requires revisiondelete)
 * 	allowusertalk: Allow user to edit their own talk page while blocked
 * 	reblock: Overwrite existing block (if one exists)
 * Default: nocreate, autoblock, noemail, reblock
 * 
 * Examples:
 * 	B3.action.block('3 days', 'trolling')
 * 	B3.action.block('infinite', 'school IP', {anononly: true})
 */
B3.modules.register_action('block', {
	task_generator: function(expiry, reason, options, complete, success, failure) {
		if(!options) {options = {};}
		B3.util.softmerge(options, {
			anononly: false,
			nocreate: true,
			autoblock: true,
			noemail: true,
			hidename: false,
			allowusertalk: false,
			reblock: true,
		});

		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'block',
				expiry: expiry,
				reason: reason,
				options: options,
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		users: function(params, user) {
			params.action = 'block';
			params.user = user.name;
			params.expiry = this.params.expiry;
			params.reason = this.params.reason;
			if(user.blocktoken) {params.token = user.blocktoken;}
			else {params.token = B3.token;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {
		block: B3.util.null, //TODO:
	},
});

/* Delete pages
 * 
 * Args:
 * 	reason: Edit summary
 * 
 * Options:
 * 
 * Examples:
 * 	B3.action.delete('spam')
 */
B3.modules.register_action('delete', {
	task_generator: function(reason, options, complete, success, failure) {
		if(!options) {options = {};}

		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'delete',
				reason: reason,
				options: options,
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		pages: function(params, page) {
			params.action = 'delete';
			params.title = page.title;
			params.reason = this.params.reason;
			if(page.deletetoken) {params.token = page.deletetoken;}
			else {params.token = B3.token;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {
		delete: function(query) {
			//if(!this.input_list.pages[query.title]) {
				this.output_list.pages[query.title] = {
					title: query.title,
					missing: '',
				};
			/*}
			else {
				var page = this.input_list.pages[query.title];

				page.missing = '';
				if(page.new !== undefined) {delete page.new;}
				if(page.lastrevid) {delete page.lastrevid;}
				if(page.length) {delete page.length;}
				if(page.pageid) {delete page.pageid;}
				if(page.revisions) {delete page.revisions;}
				this.output_list.pages[query.title] = page;
			}*/
		},
	},
});

/* Save page text (requires the current pagelist to have revision content)
 * 
 * Args:
 * 	summary: Edit summary
 * 
 * Options:
 * 	minor: Mark as a minor edit
 * 	notminor: Mark as a not minor edit (if your prefs default to minor)
 * 	bot: Mark as bot
 * 	recreate: Ignore warnings about page deletion
 * 	createonly: Only save if the page doesn't exist
 * 	nocreate: Return an error (fail the request) if page exists already
 * 	md5: Hash of text, disqualify edit if text and hash don't match
 * 	redirect: Resolve redirects
 * 
 * Examples:
 * 	B3.action.edit('summary')
 */
B3.modules.register_action('edit', {
	task_generator: function(summary, options, complete, success, failure) {
		if(!options) {options = {};}
		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'edit',
				summary: summary,
				options: options,
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		pages: function(params, page) {
			if(!page.revisions || !page.revisions[0]) {return false;}

			params.action = 'edit';
			params.title = page.title;
			params.summary = summary;
			params.text = page.revisions[0]['*'];
			if(page.edittoken) {params.token = page.edittoken;}
			else {params.token = B3.token;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {
		edit: function(query) {
			if(!this.input_list.pages[query.title]) {
				this.output_list.pages[query.title] = {
					title: query.title,
					lastrevid: query.newrevid,
					pageid: query.pageid,
				};
			}
			else {
				var page = this.input_list.pages[query.title];

				page.lastrevid = query.newrevid;
				if(page.missing !== undefined) {
					delete page.missing;
					page.pageid = query.pageid;
				}
				else if(page.new !== undefined) {delete page.new;}
				this.output_list.pages[query.title] = page;
			}
		},
	},
});

/* Prepend text to page
 * 
 * Args:
 * 	summary: Edit summary
 * 
 * Options:
 * 	minor: Mark as a minor edit
 * 	notminor: Mark as a not minor edit (if your prefs default to minor)
 * 	bot: Mark as bot
 * 	md5: Hash of text, disqualify edit if text and hash don't match
 * 	redirect: Resolve redirects
 * 
 * Examples:
 * 	B3.action.prependtext('{{delete|spam}}', 'spam')
 */
B3.modules.register_action('prependtext', {
	task_generator: function(text, summary, complete, success, failure) {
		if(!options) {options = {};}
		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'prependtext',
				text: text,
				summary: summary,
				options: options,
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		pages: function(params, page) {
			params.action = 'edit';
			params.title = page.title;
			params.summary = summary;
			params.prependtext = this.params.text;
			if(page.edittoken) {params.token = page.edittoken;}
			else {params.token = B3.token;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {},
});

/* Append text to page
 * 
 * Args:
 * 	summary: Edit summary
 * 
 * Options:
 * 	minor: Mark as a minor edit
 * 	notminor: Mark as a not minor edit (if your prefs default to minor)
 * 	bot: Mark as bot
 * 	md5: Hash of text, disqualify edit if text and hash don't match
 * 	redirect: Resolve redirects
 * 
 * Examples:
 * 	B3.action.appendtext('[[Category:Foo]]', 'categorizing')
 */
B3.modules.register_action('appendtext', {
	task_generator: function(text, summary, complete, success, failure) {
		if(!options) {options = {};}
		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'appendtext',
				text: text,
				summary: summary,
				options: options,
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		pages: function(params, page) {
			params.action = 'edit';
			params.title = page.title;
			params.summary = summary;
			params.appendtext = this.params.text;
			if(page.edittoken) {params.token = page.edittoken;}
			else {params.token = B3.token;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {},
});

/* Email users
 * 
 * Args:
 * 	subject: Subject
 * 	text: Message body
 * 
 * Options:
 * 	ccme: Send a copy of the email to yourself
 * 
 * Examples:
 * 	B3.action.email('Spam', 'Visit my annoying website!')
 */
B3.modules.register_action('email', {
	task_generator: function(subject, text, options, complete, success, failure) {
		if(!options) {options = {};}

		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'email',
				subject: subject,
				text: text,
				options: options,
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		users: function(params, user) {
			params.action = 'emailuser';
			params.target = user.name;
			params.subject = this.params.subject;
			params.text = this.params.text;
			params.token = user.emailtoken;
			if(page.emailtoken) {params.token = page.emailtoken;}
			else {params.token = B3.token;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {
		email: B3.util.null,
	},
});

/* Import an XML file
 * 
 * Args:
 * 	xml: File to import
 * 	summary: Edit summary
 * 
 * Options:
 *
 * Examples:
 * 	B3.action.import(some_xml, 'merge from otherwiki.wikia.com')
 */
B3.modules.register_action('import', {
	task_generator: function(xml, summary, options, complete, success, failure) {
		var params = {
			action: 'import',
			xml: xml,
			token: B3.token,
		};
		if(summary) {params.summary = summary;}

		return new B3.classes.Task(
			'POST', B3.settings.apipath, params, {upload: true},
			complete, success, failure
		);
	},
	param_generators: {}, //FIXME: should we just not define this?
	data_mergers: {
		import: B3.util.null, //TODO:
	},
});

/* Move pages
 * 
 * Args:
 * 	translator: function(from) {}
 * 		Converts a source page name into a destination page name. If you return `false`, the page won't be moved.
 * 	reason: Edit summary
 * 
 * Options:
 * 	movetalk: Move associated talk page
 * 	movesubpages: Move any subpages
 * 	noredirect: Don't leave a redirect behind
 * 	ignorewarnings: Ignore warnings
 * Default: movetalk, movesubpages
 * 
 * Examples:
 * 	B3.action.move(function(from) {
 * 		return from.replace(' (book)', ' (novel)');
 * 	}, 'book -> novel')
 */
B3.modules.register_action('move', {
	task_generator: function(translator, reason, options, complete, success, failure) {
		if(!options) {options = {};}
		B3.util.softmerge(options, {
			movetalk: true,
			movesubpages: true,
		});

		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'move',
				translator: translator,
				reason: reason,
				options: options,
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		pages: function(params, page) {
			var to = this.params.translator(page.title);
			if(!to || to == page.title) {return;}

			params.action = 'move';
			params.from = page.title;
			params.to = to;
			params.reason = this.params.reason;
			if(page.movetoken) {params.token = page.movetoken;}
			else {params.token = B3.token;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {
		move: function(list, query) {
			if(!this.input_list.pages[query.from]) {
				this.output_list.pages[query.to] = {
					title: query.to,
				};
				this.output_list.pages[query.talkto] = {
					title: query.talkto,
				};
			}
			else {
				var page = this.input_list.pages[query.from];
				if(page) {
					if(this.output_list.pages[query.from]) {delete this.output_list.pages[query.from];}
					page.title = query.to;
					this.output_list.pages[page.title] = page;
				}
				page = this.input_list.pages[query.talkfrom];
				if(page) {
					if(this.output_list.pages[query.talkfrom]) {delete list.pages[query.talkfrom];}
					page.title = query.talkto;
					this.output_list.pages[page.title] = page;
				}
			}
		},
	},
});

/* Protect pages
 * 
 * Args:
 * 	protections: Protections to apply (eg. {edit: 'sysop', move: 'sysop'})
 * 	expiry: Protection expiry (eg. '1 day')
 * 	reason: Edit summary
 * 
 * Options:
 * 	cascade: See [[mw:Manual:Administrators#Protection]]
 * 
 * Examples:
 * 	B3.action.protect({edit: 'autoconfirmed', move: 'autoconfirmed'}, 'infinite', 'high traffic page')
 */
B3.modules.register_action('protect', {
	task_generator: function(protections, expiry, reason, options, complete, success, failure) {
		if(!options) {options = {};}
		if(typeof protections != 'string') {
			var str = '';
			for(var i in protections) {
				if (protections.hasOwnProperty(i)) {
					str += i + '=' + protections[i] + '|';
				}
			}
			if(str) {protections = str.substring(0, str.length - 1);}
			else {protections = '';}
		}

		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'protect',
				protections: protections,
				expiry: expiry,
				reason: reason,
				options: options,
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		pages: function(params, page) {
			params.action = 'protect';
			params.title = page.title;
			params.protections = this.params.protections;
			params.expiry = this.params.expiry;
			params.reason = this.params.reason;
			if(page.protecttoken) {params.token = page.protecttoken;}
			else {params.token = B3.token;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {
		protect: function(query) {
			if(!this.input_list.pages[query.title]) {
				this.output_list.pages[query.title] = {
					title: query.title,
					protections: query.protections,
				};
			}
			else {
				var page = this.input_list.pages[query.title];

				page.protections = [];
				for(var i = 0; i < query.protections.length; i++) {
					var prot = {};
					for(var j in query.protections[i]) {
						if(j == 'expiry') {prot[j] = query.protections[i][j];}
						else { //this one minor difference is so annoying
							prot.type = j;
							prot.level = query.protections[i][j];
						}
					}
					page.protections.push(prot);
				}
				this.output_list.pages[query.title] = page;
			}
		},
	},
});

/* Purge pages
 * 
 * Args:
 * 
 * Options:
 * 	forcelinkupdate: Update the links table
 * 
 * Examples:
 * 	B3.action.purge() //no, really
 */
B3.modules.register_action('purge', {
	task_generator: function(options, complete, success, failure) {
		if(!options) {options = {};}

		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'purge',
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		pages: function(params, page) {
			//purge can do more than one page, so lump them together and then reject every other request
			//TODO: get this to only run once, then unbind itself so that we don't call this 20349390 times for no reason
			if(page == this.data.pages[0]) {
				params.action = 'purge';
				params.titles = page.title;
				for(var i = 1; i < this.pages.length; i++) {params.titles += '|' + this.pages[i].title;}
			}
		},
	},
	data_mergers: {
		purge: B3.util.null,
	},
});

/* Rollback pages
 * 
 * Args:
 * 	user: User who made the edits being rollbacked; you can leave this blank to get the default summary
 * 	      (this is to prevent revert conflicts - if someone gets there first, you could rollback their revert)
 * 	summary: Edit summary
 * 
 * Options:
 * 	markbot: Mark the rollback as a bot edit
 * 
 * Examples:
 * 	B3.action.rollback('A troll', '')
 */
B3.modules.register_action('rollback', {
	task_generator: function(user, summary, options, complete, success, failure) {
		if(!options) {options = {};}

		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'rollback',
				user: user,
				summary: summary,
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		pages: function(params, page) {
			params.action = 'rollback';
			params.title = page.title;
			params.user = this.params.user;
			if(page.rollbacktoken) {params.token = page.rollbacktoken;}
			else {params.token = B3.token;}
			if(this.params.summary) {params.summary = this.params.summary;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {
		rollback: function(query) {
			if(!this.input_list.pages[query.title]) {
				this.output_list.pages[query.title] = {
					title: query.title,
					lastrevid: query.revid,
					revisions: [{
						revid: query.revid,
						parentid: query.old_revid,
						user: B3.m.userinfo.name,
						userid: B3.m.userinfo.id,
						comment: query.summary,
					}],
				};
			}
			else {
				var page = this.input_list.pages[query.title];

				page.lastrevid = query.revid;
				if(!page.revisions) {page.revisions = [];}
				page.revisions.unshift({
					revid: query.revid,
					parentid: query.old_revid,
					user: B3.m.userinfo.name,
					userid: B3.m.userinfo.id,
					comment: query.summary,
				});
				this.output_list.pages[query.title] = page;
			}
		},
	},
});

/* Unblock users
 * 
 * Args:
 * 	reason: Edit summary
 * 
 * Options:
 * 
 * Examples:
 * 	B3.action.unblock('exonerated')
 */
B3.modules.register_action('unblock', {
	task_generator: function(reason, options, complete, success, failure) {
		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'unblock',
				reason: reason,
				options: options,
			}, {},
			complete, success, failure
		);
	},
	param_generator: {
		users: function(params, user) {
			params.action = 'unblock';
			params.user = user.name;
			params.reason = this.params.reason;
			if(page.unblocktoken) {params.token = page.unblocktoken;}
			else {params.token = B3.token;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {
		unblock: function(query) {
			if(!this.input_list.users[query.user]) {
				this.output_list.users[query.user] = {
					name: query.user,
				};
			}
			else {
				var user = this.input_list.users[query.user];

				if(user.blockedby) {delete user.blockedby;}
				if(user.blockedreason) {delete user.blockedreason;}
				if(user.blockedexpiry) {delete user.blockedexpiry;}
				this.output_list.users[query.user] = user;
			}
		},
	},
});

/* Undelete pages
 * 
 * Args:
 * 	reason: Edit summary
 * 
 * Options:
 * 	timestamps: Array of specific timestamps to restore; if unspecified, all deleted revisions are restored
 * 
 * Examples:
 * 	B3.action.undelete('petition successful')
 * 	B3.action.undelete('unhiding', {timestamps: ['2016-02-13T21:15:37Z']})
 */
B3.modules.register_action('undelete', {
	task_generator: function(reason, options, complete, success, failure) {
		if(!options) {options = {};}
		else if(typeof options.timestamps != 'string') {options.timestamps = options.timestamps.join('|');}

		return new B3.classes.Task(
			'POST', B3.settings.apipath, {
				module: 'undelete',
				reason: reason,
				options: options,
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		pages: function(params, page) {
			params.action = 'undelete';
			params.title = page.title;
			params.reason = this.params.reason;
			if(page.token) {params.token = page.token;}
			else {params.token = B3.token;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {
		undelete: function(query) {
			if(!this.input_list.pages[query.title]) {
				this.output_list.pages[query.title] = {
					title: query.title,
				};
			}
			else{ 
				var page = this.input_list.pages[query.title];

				if(page.missing !== undefined) {delete page.missing;}
				this.output_list.pages[query.title] = page;
			}
		},
	},
});

/* Modify user rights
 * 
 * Args:
 * 	add: Array of rights to add to all users (eg. ['sysop', 'bureaucrat']
 * 	remove: Same as add, except specified rights will be removed
 * 
 * Options:
 * 
 * Examples:
 * 	B3.action.userrights(['sysop', 'bureaucrat'], 'rollback', 'RFA successful')
 */
B3.modules.register_action('userrights', {
	task_generator: function(add, remove, reason, options, complete, success, failure) {
		if(!options) {options = {};}
		if(typeof add != 'string') {add = add.join('|');}
		if(typeof remove != 'string') {remove = remove.join('|');}

		return new B3.classes.Task('POST', B3.settings.apipath, {
				module: 'userrights',
				add: add,
				remove: remove,
				reason: reason,
				options: options,
			}, {},
			complete, success, failure
		);
	},
	param_generators: {
		users: function(params, user) {
			params.action = 'userrights';
			params.user = user.name;
			params.add = this.params.add;
			params.remove = this.params.remove;
			params.reason = this.params.reason;
			if(page.userrightstoken) {params.token = page.userrightstoken;}
			else {params.token = B3.token;}

			B3.util.softmerge(params, this.params.options);
		},
	},
	data_mergers: {
		userrights: function(query) {
			if(!this.input_list.users[query.user]) {
				this.output_list.users[query.user] = {
					name: query.user,
					groups: query.added,
				};
			}
			else {
				var user = this.input_list.users[query.user];

				if(user.groups) {
					for(var i = 0; i < query.removed.length; i++) {
						var index = user.groups.indexOf(query.removed[i]);
						if(index != -1) {user.groups.splice(index, 1);}
					}
					for(var i = 0; i < query.added.length; i++) {user.groups.push(query.added[i]);}
				}
				else {user.groups = query.added;}
				this.output_list.users[query.user] = user;
			}
		},
	},
});

/*----------- index.php functions -----------*/

// Delete pages via index.php
//
// Parameters are identical to delete
/*B3.api.indexdelete = function(titles, reason, success, failure, error, complete) {
	if(!error) {error = B3.settings.defaulterror;}

	return B3.api.deletetoken(titles, function(tokens) {
		for(var i = 0; i < tokens.length; i++) {
			if(!tokens[i]) {
				if(typeof failure == 'function') {failure('missing', titles[i]);}
				titles.splice(i, 1);
				tokens.splice(i, 1);
			}
		}

		if(titles.length > 0) {
			this.task.add('POST', wgScript, {
				action: 'delete',
				title: titles,
				wpDeleteReasonList: 'other',
				wpReason: reason,
				wpEditToken: tokens,
				wpConfirmB: 'Delete page'
			}, success, failure, complete);
		}
	}, error);
}*/





/*------------------------------------------------------------------------------------------------
	api.php?action=query&prop=
	TODO: imageinfo, stashimageinfo, categoryinfo, duplicatefiles
 
	Common arguments:
		titles or users - A single page/user or an array of pages/users to act on
		props - Optional array of properties to get
		limit - Optional number of results to show
		options - Optional object of extra parameters to send with the params
  ------------------------------------------------------------------------------------------------*/

B3.modules.register_query('revisions', {
	type: 'prop',
	prefix: 'rv',
	generator: false,
	query_generators: {
		/* Get information on page revisions
		 * 
		 * Props:
		 * 	ids: Revision ID
		 * 	flags: Flags like minor
		 * 	timestamp: Timestamp
		 * 	user: Editor
		 * 	userid: ID of user
		 * 	size: Page size
		 * 	sha1: Hash of text
		 * 	comment: Edit summary
		 * 	parsedcomment: HTML of summary
		 * 	content: Full page text
		 * 	tags: Tags
		 * 
		 * Options:
		 * 	tag: Filter by tag
		 * 	expandtemplates: Expand templates in page text
		 * 	generatexml: XML parse tree of text
		 *	parse: HTML of page text
		 * 	section: Limit content to this section
		 */
		revisions: function(props, limit, options) {
			if(typeof props != 'string') {props.join('|');}

			var params = {
				prop: 'revisions',
				rvprop: props,
			};
			if(limit) {params.rvlimit = limit;}
			B3.util.softmerge(params, options, 'rv');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {},
});


B3.modules.register_query('info', {
	type: 'prop',
	prefix: 'in',
	generator: false,
	query_generators: {
		/* Get basic page info
		 * 
		 * Args:
		 * 	props: Props
		 * 
		 * Props:
		 * 	protection: Protections on the page
		 * 	talkid: ID of talkpage
		 * 	watched: Whether you're watching the page
		 * 	subjectid: ID of content page associated with talk page
		 * 	url: Full URL to page
		 * 	readable: Read rights
		 * 	preload: EditFormPreloadText
		 * 	displaytitle: DISPLAYTITLE
		 * 
		 * Options:
		 */
		info: function(props, options) {
			if(typeof props != 'string') {props.join('|');}

			var params = {
				prop: 'info',
				inprop: props,
			};
			B3.util.softmerge(params, options, 'in');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {},
});

// Get a list of links/images/templates/categories on pages
//
// module - name of module to query
// short - the two letter short for the module
B3.modules.linklist_pgen = function(module, short, limit, options) {
	var params = {
		prop: module,
	};
	if(limit) {params[short + 'limit'] = limit;}
	B3.util.softmerge(params, options, short);
	return params;
};
B3.modules.register_query('links', {
	type: 'prop',
	prefix: 'pl',
	generator: true,
	query_generators: {
		links: function(limit, options) {B3.modules.linklist_pgen('links', 'pl', limit, options);},
	},
	param_generators: {},
	query_mergers: {},
});
B3.modules.register_query('iwlinks', {
	type: 'prop',
	prefix: 'iwlinks',
	generator: false,
	query_generators: {
		iwlinks: function(limit, options) {B3.modules.linklist_pgen('iwlinks', 'iw', limit, options);},
	},
	param_generators: {},
	query_mergers: {},
});
B3.modules.register_query('langlinks', {
	type: 'prop',
	prefix: 'll',
	generator: false,
	query_generators: {
		langlinks: function(limit, options) {B3.modules.linklist_pgen('langlinks', 'll', limit, options);},
	},
	param_generators: {},
	query_mergers: {},
});
B3.modules.register_query('images', {
	type: 'prop',
	prefix: 'im',
	generator: true,
	query_generators: {
		images: function(limit, options) {B3.modules.linklist_pgen('images', 'im', limit, options);},
	},
	param_generators: {},
	query_mergers: {},
});
B3.modules.register_query('templates', {
	type: 'prop',
	prefix: 'tl',
	generator: true,
	query_generators: {
		templates: function(limit, options) {B3.modules.linklist_pgen('templates', 'tl', limit, options);},
	},
	param_generators: {},
	query_mergers: {},
});
B3.modules.register_query('categories', {
	type: 'prop',
	prefix: 'cl',
	generator: true,
	query_generators: {
		categories: function(limit, options) {B3.modules.linklist_pgen('categories', 'cl', limit, options);},
	},
	param_generators: {},
	query_mergers: {},
});
B3.modules.register_query('extlinks', {
	type: 'prop',
	prefix: 'el',
	generator: false,
	query_generators: {
		extlinks: function(limit, options) {B3.modules.linklist_pgen('extlinks', 'el', limit, options);},
	},
	param_generators: {},
	query_mergers: {},
});





/*------------------------------------------------------------------------------------------------
	action=query&list=
	TODO: filearchive, tags, watchlist, watchlistraw, protectedtitles, checkuser, checkuserlog, abuselog, abusefilters

	Common arguments:
		titles, users or namespaces - A single page/user/namespace or an array of pages/users/namespaces to act on
		props - Array of properties to get
		limit - Optional number of results to return
		options - Optional object of parameters to send with the params
  ------------------------------------------------------------------------------------------------*/

B3.modules.register_query('deletedrevs', {
	type: 'list',
	prefix: 'dr',
	generator: false,
	query_generators: {
		/* Get deleted contributions
		 * 
		 * Args:
		 * 	props: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	revid: Revision ID
		 * 	parentid: ID of previous revision
		 * 	user: User who made the edit
		 * 	userid: ID of user
		 * 	comment: Edit summary
		 * 	parsedcomment: HTML of summary
		 * 	minor: Minor flag
		 * 	len: Page length
		 * 	sha1: Hash of page text
		 * 	content: Content of revision
		 * 	token: Get an undelete token (you can also just use B3.token)
		 * 
		 * Options:
		 * 	start: Start timestamp
		 * 	end: End timestamp
		 * 	dir: Oldest or newest first
		 * 	excludeuser: Don't list revisions by this user
		 */
		deletedrevs: function(props, limit, options) {
			if(typeof props != 'string' && props !== true) {props = props.join('|');}

			var params = {
				list: 'deletedrevs',
			};
			if(limit) {params.drlimit = limit;}
			if(props) {params.drprop = props;}
			B3.util.softmerge(params, options, 'dr');
			return params;
		},
		/* Get deleted contributions
		 * 
		 * Args:
		 * 	props: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	revid: Revision ID
		 * 	parentid: ID of previous revision
		 * 	user: User who made the edit
		 * 	userid: ID of user
		 * 	comment: Edit summary
		 * 	parsedcomment: HTML of summary
		 * 	minor: Minor flag
		 * 	len: Page length
		 * 	sha1: Hash of page text
		 * 	content: Content of revision
		 * 	token: Get an undelete token (you can also just use B3.token)
		 * 
		 * Options:
		 * 	start: Start timestamp
		 * 	end: End timestamp
		 * 	excludeuser: Don't list revisions by this user
		 */
		deletedcontribs: function(props, limit, options) {
			if(typeof props != 'string' && props !== true) {props = props.join('|');}

			var params = {
				qmodule: 'deletedrevs',
				list: 'deletedrevs',
			};
			if(limit) {params.drlimit = limit;}
			if(props) {params.drprop = props;}
			B3.util.softmerge(params, options, 'dr');
			return params;
		},
		/* Get all deleted revisions in namespace
		 * 
		 * Args:
		 * 	namespace: Namespace to get deleted revisions from
		 * 	props: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	revid: Revision ID
		 * 	parentid: ID of previous revision
		 * 	user: User who made the edit
		 * 	userid: ID of user
		 * 	comment: Edit summary
		 * 	parsedcomment: HTML of summary
		 * 	minor: Minor flag
		 * 	len: Page length
		 * 	sha1: Hash of page text
		 * 	content: Content of revision
		 * 	token: Get an undelete token (you can also just use B3.token)
		 * 
		 * Options:
		 * 	dir: Oldest or newest first
		 * 	from: Start from this page
		 * 	to: End at this page
		 * 	prefix: Filter by prefix
		 * 	unique: List only one revision per page
		 */
		alldeletedrevs: function(namespace, props, limit, options) {
			if(typeof props != 'string' && props !== true) {props = props.join('|');}

			var params = {
				list: 'deletedrevs',
				drnamespace: namespace,
			};
			if(limit) {params.drlimit = limit;}
			if(props) {params.drprop = props;}
			B3.util.softmerge(params, options, 'dr');
			return params;
		},
	},
	param_generators: {
		users: function(params, user) {
			params.druser = user.name;
		},
	},
	query_mergers: {
		deletedrevs: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('logevents', {
	type: 'list',
	prefix: 'le',
	generator: false,
	query_generators: {
		/* Get recent log actions
		 * 
		 * Args:
		 * 	type: Array of event actions to get. Use `true` to get all events
		 * 	props: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	ids: Log ID
		 * 	title: Page title
		 * 	type: Log type
		 * 	user: User who performed action
		 * 	userid: ID of user
		 * 	timestamp: Timestamp
		 * 	comment: Edit summary
		 * 	parsedcomment: HTML of comment
		 * 	details: Details
		 * 	tags: Tags
		 * Default: ids, title, type, user, timestamp, comment, details
		 * 
		 * Options:
		 * 	start: Start timestamp
		 * 	end: End timestamp
		 * 	dir: Oldest or newest first
		 *	tag: Filter to this tag
		 */
		logevents: function(type, props, limit, options) {
			if(typeof type != 'string' && type !== true) {type = type.join('|');}
			if(typeof props != 'string' && props !== true) {props = props.join('|');}

			var params = {
				list: 'logevents'
			};
			if(type !== true) {params.letype = type;}
			if(props !== true) {params.leprop = props;}
			if(limit) {params.lelimit = limit;}
			B3.util.softmerge(params, options, 'le');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		logevents: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('recentchanges', {
	type: 'list',
	prefix: 'rc',
	generator: true,
	query_generators: {
		/* Get recent edits and log actions
		 * 
		 * Args:
		 * 	type: Array of event types to get (edit, new, log). Use `true` to get all events
		 * 	props: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	user: User who made edit
		 * 	userid: ID of user
		 * 	comment: Edit summary
		 * 	parsedcomment: HTML of summary
		 * 	flags: Flags like minor
		 * 	timestamp: Timestamp
		 * 	title: Page title
		 * 	ids: Page id, revision id, old id
		 * 	sizes: Current size, old size
		 * 	redirect: Notes if page is a redirect
		 * 	patrolled: Notes if edit is patrolled
		 * 	loginfo: Log info
		 * 	tags: Tags
		 * Default: title, timestamp, ids
		 * 
		 * Options:
		 * 	start: Start timestamp
		 * 	end: End timestamp
		 * 	dir: Oldest or newest first
		 * 	namespace: Filter to this namespace
		 * 	user: Filter to this user
		 * 	excludeuser: Don't show edits by this user
		 * 	tag: Filter to this tag
		 * 	show: 
		 * 	toponly: Only show the last edit to a page
		 */
		recentchanges: function(type, props, limit, options) {
			if(typeof type != 'string' && type !== true) {type = type.join('|');}
			if(typeof props != 'string' && props !== true) {props = props.join('|');}

			var params = {
				list: 'recentchanges'
			};
			if(type !== true) {params.rctype = type;}
			if(props !== true) {params.rcprop = props;}
			if(limit) {params.rclimit = limit;}
			B3.util.softmerge(params, options, 'rc');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		recentchanges: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('allimages', {
	type: 'list',
	prefix: 'ai',
	generator: true,
	query_generators: {
		/* List all images
		 * 
		 * Args:
		 * 	props: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	timestamp: Timestamp of last edit
		 * 	user: Last user to edit
		 * 	userid: ID of user
		 * 	comment: Edit summary
		 * 	parsedcomment: HTML of summary
		 * 	url: URL of image
		 * 	size: File size and width/height
		 * 	dimensions: Same as size
		 * 	sha1: Hash of image
		 * 	mime: MIME type
		 * 	thumbmime: MIME type of thumbnail
		 * 	mediatype: Media type
		 * 	metadata: EXIF
		 * 	bitdepth: Bit depth
		 * Default: timestamp, url
		 * 
		 * Options:
		 * 	prefix: Filter to this prefix
		 * 	minsize: Filter out images smaller than this
		 * 	maxsize: Filter out images larger than this
		 * 	dir: Ascending or descending
		 * 	sha1: Hash of image
		 * 	sha1base36: Hash in base 36
		 * 	mime: Filter to only this MIME type
		 */
		allimages: function(props, limit, options) {
			if(typeof props != 'string') {props = props.join('|');}
		 
			var params = {
				list: 'allimages',
				aiprop: props
			};
			if(limit) {params.ailimit = limit;}
			B3.util.softmerge(params, options, 'ai');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		allimages: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('allpages', {
	type: 'list',
	prefix: 'allpages',
	generator: true,
	query_generators: {
		/* List all pages in a namespace
		 * 
		 * Args:
		 * 	namespace: Namespace
		 * 	limit: Limit
		 * 
		 * Options:
		 * 	prefix: Filter to this prefix
		 * 	filterredir: Filter to all, redirects, or nonredirects
		 * 	minsize: Filter out pages smaller than this
		 * 	maxsize: Filter out pages larger than this
		 * 	prtype: Filter to only pages that are edit, move, or upload protected
		 * 	prlevel: Filter to only pages that are autoconfirmed or sysop protected
		 * 	prfiltercascade: Filter to all, cascading, or noncascading
		 * 	prexpiry: Filter to all, indefinite, or definite
		 * 	dir: Ascending or descending
		 * 	filterlanglinks: Filter to all, withlanglinks, or withoutlanglinks
		 */
		allpages: function(namespace, limit, options) {
			var params = {
				list: 'allpages',
				apnamespace: namespace
			};
			if(limit) {params.aplimit = limit;}
			B3.util.softmerge(params, options, 'ap');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		allpages: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('alllinks', {
	type: 'list',
	prefix: 'al',
	generator: true,
	query_generators: {
		/* List all links in a namespace
		 * 
		 * Args:
		 * 	namespace: Namespace
		 * 	props: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	ids: Page id link is from
		 * 	title: Page that link goes to
		 * 
		 * Options:
		 * 	prefix: Filter to this prefix
		 * 	unique: Unique only
		 */
		alllinks: function(namespace, props, limit, options) {
			if(typeof props != 'string') {props = props.join('|');}

			var params = {
				list: 'alllinks',
				alnamespace: namespace
			};
			if(props) {params.alprop = props;}
			if(limit) {params.allimit = limit;}
			B3.util.softmerge(params, options, 'al');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		allinks: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('allcategories', {
	type: 'list',
	prefix: 'ac',
	generator: true,
	query_generators: {
		/* List all categories
		 * 
		 * Args:
		 * 	props: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	size: Number of pages in category
		 * 	hidden: __HIDDENCAT__
		 * 	id: Category ID
		 * 
		 * Options:
		 * 	prefix: Filter by prefix
		 * 	dir: Ascending or descending
		 * 	min: Filter out categories with fewer pages than this
		 * 	max: Filter out categories with more pages than this
		 */
		allcategories: function(props, limit, options) {
			if(typeof props != 'string') {props = props.join('|');}
		 
			var params = {
				list: 'allcategories',
				acprop: props
			};
			if(limit) {params.aclimit = limit;}
			B3.util.softmerge(params, options, 'ac');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		allcategories: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('allusers', {
	type: 'list',
	prefix: 'au',
	generator: false,
	query_generators: {
		/* List all users
		 * 
		 * Args:
		 * 	groups: Single group or array of groups to list. Use true to show all
		 * 	props: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	blockinfo: Whether or not the user is blocked
		 * 	groups: Groups the user is in
		 * 	implicitgroups: Auto groups
		 * 	rights: Full rights list
		 * 	editcount: Edit count
		 * 	registration: Registration timestmap
		 * 
		 * Options:
		 * 	witheditsonly: Filter out users with 0 edits
		 * 	activeusers: Filter out users who haven't edited in 30 days
		 * 	dir: Ascending or descending
		 */
		allusers: function(groups, props, limit, options) {
			if(typeof groups != 'string' && groups !== true) {groups = groups.join('|');}
			if(typeof props != 'string') {props = props.join('|');}
		 
			var params = {
				list: 'allusers',
				auprop: props
			};
			if(groups !== true) {params.augroup = groups;}
			if(limit) {params.aulimit = limit;}
			B3.util.softmerge(params, options, 'au');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		allusers: B3.modules.user_querymerger,
	},
});

B3.modules.register_query('blocks', {
	type: 'list',
	prefix: 'bk',
	generator: false,
	query_generators: {
		/* List all blocks
		 * 
		 * Args:
		 * 	props: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	id: Block id
		 * 	user: Blocked user
		 * 	userid: ID of user
		 * 	by: Blocker
		 * 	byid: ID of blocker
		 * 	timestamp: Timestamp
		 * 	expiry: Block expiry
		 * 	reason: Edit summary
		 * 	range: Range affected
		 * 	flags: Flags
		 * 
		 * Options:
		 * 	start: Start timestamp
		 * 	end: End timestamp
		 * 	dir: Oldest or newest first
		 * 	show: Criteria: account, temp, ip, range 
		 */
		blocks: function(props, limit, options) {
			if(typeof props != 'string') {props = props.join('|');}
		 
			var params = {
				list: 'blocks',
				bkprop: props
			};
			if(users !== true) {params.bkusers = users;}
			if(limit) {params.bklimit = limit;}
			B3.util.softmerge(params, options, 'bk');
			return params;
		},
		//TODO: bkusers, bkip
	},
	param_generators: {},
	query_mergers: {
		blocks: B3.modules.user_querymerger,
	},
});

// List pages that link/transclude/include specified pages/templates/files
//
// module - The name of the module to use
// short - The abbreviation for `module`
B3.modules.includes_pgen = function(titles, module, short, limit, options) {
	if(typeof titles == 'string') {titles = [titles];}

	var params = {
		list: module,
	};
	params[short + 'title'] = titles;
	if(limit) {params[short + 'limit'] = limit;}
	B3.util.softmerge(params, options, short);
	return params;
};
B3.modules.register_query('backlinks', {
	type: 'list',
	prefix: 'bl',
	generator: true,
	query_generators: {
		backlinks: function(titles, limit, options) {return B3.modules.includes_pgen(titles, 'backlinks', 'bl', limit, options);},
	},
	param_generators: {},
	query_mergers: {
		backlinks: B3.modules.page_querymerger,
	},
});
B3.modules.register_query('categorymembers', {
	type: 'list',
	prefix: 'cm',
	generator: true,
	query_generators: {
		categorymembers: function(titles, limit, options) {return B3.modules.includes_pgen(titles, 'categorymembers', 'cm', limit, options);},
	},
	param_generators: {},
	query_mergers: {
		categorymembers: B3.modules.page_querymerger,
	},
});
B3.modules.register_query('embeddedin', {
	type: 'list',
	prefix: 'ei',
	generator: true,
	query_generators: {
		embeddedin: function(titles, limit, options) {return B3.modules.includes_pgen(titles, 'embeddedin', 'ei', limit, options);},
	},
	param_generators: {},
	query_mergers: {
		embeddedin: B3.modules.page_querymerger,
	},
});
B3.modules.register_query('imageusage', {
	type: 'list',
	prefix: 'iu',
	generator: true,
	query_generators: {
		imageusage: function(titles, limit, options) {return B3.modules.includes_pgen(titles, 'imageusage', 'iu', limit, options);},
	},
	param_generators: {},
	query_mergers: {
		imageusage: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('iwbacklinks', {
	type: 'list',
	prefix: 'iwbl',
	generator: true,
	query_generators: {
		/* List pages that use the specified interwiki links
		 * 
		 * Args:
		 * 	prefixes: Prefixes to get (eg. 'wikipedia' of 'wikipedia:Chicken')
		 * 	titles: Titles to get (eg. 'Chicken' of 'wikipedia:Chicken')
		 * 	limit: Limit
		 * 
		 * Options:
		 */
		iwbacklinks: function(prefixes, titles, limit, options) {
			var params = {
				list: 'iwbacklinks',
				iwblprefix: prefixes
			};
			if(titles !== true) {params.iwbltitle = titles;}
			if(limit) {params.iwbllimit = limit;}
			B3.util.softmerge(params, options, 'iwbl');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		iwbacklinks: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('langbacklinks', {
	type: 'list',
	prefix: 'lbl',
	generator: true,
	query_generators: {
		/* List pages that use the specified language links
		 * 
		 * Args:
		 * 	langs: Languages to get (eg. 'es' of 'es:Cerveza')
		 * 	titles: Titles to get (eg. 'Cerveza' of 'es:Cerveza')
		 * 	limit: Limit
		 * 
		 * Options:
		 */
		langbacklinks: function(langs, titles, limit, options) {
			var params = {
				list: 'langbacklinks',
				lbllang: langs
			};
			if(titles !== true) {params.lbltitle = titles;}
			if(limit) {params.lbllimit = limit;}
			B3.util.softmerge(params, options, 'lbl');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		langbacklinks: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('exturlusage', {
	type: 'list',
	prefix: 'eu',
	generator: true,
	query_generators: {
		/* List pages that use the specified external links
		 * 
		 * Args:
		 * 	protocol: the protocol to look for (eg. 'http://' of 'http://www.google.com')
		 * 	links: the url to look for (eg. 'www.google.com' of 'http://www.google.com')
		 * 	limit: Limit
		 * 
		 * Options:
		 */
		exturlusage: function(protocol, links, limit, options) {
			var params = {
				list: 'exturlusage',
			};
			if(protocol !== true) {params.euprotocol = titles;}
			if(links !== true) {params.euquery = titles;}
			if(limit) {params.eulimit = limit;}
			B3.util.softmerge(params, options, 'eu');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		exturlusage: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('search', {
	type: 'list',
	prefix: 'sr',
	generator: true,
	query_generators: {
		/* Get search results
		 * 
		 * Args:
		 * 	search: The title to search for, or an array of titles to search for
		 * 	namespaces: namespaces to search in
		 * 	prop: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	size: Page size
		 * 	wordcount: Word count
		 * 	timestamp: Time of last edit
		 * 	score: Search score
		 * 	snippet: HTML snippet of page text
		 * 	titlesnippet: HTML snippet of page title
		 * 	redirectsnippet: HTML snippet of redirect
		 * 	redirecttitle: Page pointed to by redirect
		 * 	sectionsnippet: HTML snippet of section
		 * 	sectiontitle: Title of section
		 * 	hasrelated: Did you mean?
		 * 
		 * Options:
		 * 	what: Find title, text, or nearmatch
		 * 	redirects: Include redirects
		 */
		search: function(search, namespaces, prop, limit, options) {
			if(typeof namespaces != 'string') {namespaces = namespaces.join('|');}
			if(typeof prop != 'string') {prop = prop.join('|');}

			var params = {
				list: 'search',
				srsearch: search,
			};
			if(namespaces !== true) {params.srnamespace = namespaces;}
			if(prop !== true) {params.srprop = prop;}
			B3.util.softmerge(params, options, 'sr');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		search: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('random', {
	type: 'list',
	prefix: 'rn',
	generator: true,
	query_generators: {
		/* Return a random page
		 * 
		 * Args:
		 * 	namespace: Namespace to find pages in
		 * 
		 * Options:
		 * 	redirect: Find a random redirect instead of page
		 */
		random: function(namespace, options) {
			var params = {
				list: 'random',
				rnnamespace: namespace,
			};
			B3.util.softmerge(params, options, 'rn');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		random: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('protectedtitles', {
	type: 'list',
	prefix: 'pt',
	generator: true,
	query_generators: {
		/* List create protected titles
		 * 
		 * Args:
		 * 	namespace: Namespace to list titles in
		 * 
		 * Props:
		 * 	timestamp: Timestamp from protection log
		 * 	user: User who protected the page
		 * 	userid: ID of user
		 * 	comment: Summary
		 * 	parsedcomment: HTML of summary
		 * 	expiry: Protection expiry
		 * 	level: Protection level
		 * Default: timestamp, level
		 * 
		 * Options:
		 * 	level: Only show pages at this protection level
		 * 	dir: Oldest or newest first
		 * 	start: Timestamp to start from
		 * 	end: Timestamp to end at	
		 */
		protectedtitles: function(namespace, prop, limit, options) {
			if(typeof prop != 'string' && prop !== true) {prop = prop.join('|');}

			var params = {
				list: 'protectedtitles',
				ptnamespace: namespace,
				ptlimit: limit,
			};
			if(prop !== true) {params.ptprop = prop;}
			B3.util.softmerge(params, options, 'pt');
			return params;
		}
	},
	param_generators: {},
	query_mergers: {
		protectedtitles: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('querypage', {
	type: 'list',
	prefix: 'qp',
	generator: true,
	query_generators: {
		/* Get maintenance reports
		 * 
		 * Args:
		 * 	page: Page to get results from
		 * 	limit: Limit
		 * 
		 * Pages:
		 * 	Ancientpages: Pages that haven't been edited in a while
		 * 	BrokenRedirects: Redirects that go pages that don't exist
		 * 	Deadendpages: Pages that don't link to anything
		 * 	Disambiguations: 
		 * 	DoubleRedirects: Redirects that go to other redirects
		 * 	Listredirects: All redirects
		 * 	Lonelypages: Pages that aren't linked to
		 * 	Longpages: Large pages
		 * 	Mostcategories: 
		 * 	Mostimages: 
		 * 	Mostlinkedcategories: 
		 * 	Mostlinkedtemplates: 
		 * 	Mostlinked: 
		 * 	Mostrevisions: 
		 * 	Fewestrevisions: 
		 * 	Shortpages: Small pages
		 * 	Uncategorizedcategories: Categories that haven't been categorized
		 * 	Uncategorizedpages: Pages with no categories
		 * 	Uncategorizedimages: Files with no categories
		 * 	Uncategorizedtemplates: Templates with no categories
		 * 	Unusedcategories: Categories with no pages in them
		 * 	Unusedimages: Files that aren't used on any page
		 * 	Wantedcategories: Redlink categories
		 * 	Wantedfiles: Redlink files
		 * 	Wantedpages: Redlink pages
		 * 	Wantedtemplates: Redlink templates
		 * 	Unwatchedpages: Pages no one is watching
		 * 	Unusedtemplates: Templates that aren't transcluded anywhere
		 * 	Withoutinterwiki: Pages with no interwiki links
		 * 
		 * Options:
		 */
		querypage: function(page, limit, options) {
			var params = {
				list: 'querypage',
				qppage: page,
			};
			if(limit) {params.qplimit = limit;}
			B3.util.softmerge(params, options, 'qp');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		querypage: B3.modules.page_querymerger,
	},
});

B3.modules.register_query('usercontribs', {
	type: 'list',
	prefix: 'uc',
	generator: false,
	query_generators: {
		/* List users' contributions
		 * 
		 * Args:
		 * 	props: Props
		 * 	limit: Limit
		 * 
		 * Props:
		 * 	ids: Page id, revision id
		 * 	title: Page title
		 * 	timestamp: Timestamp
		 * 	comment: Edit summary
		 * 	parsedcomment: HTML of summary
		 * 	size: Page size
		 * 	flags: Flags
		 * 	patrolled: Notes if edit was patrolled
		 * 	tags: Tags
		 * Default: ids, title, timestamp, comment, size, flags
		 * 
		 * Options:
		 * 	start: Start timestamp
		 * 	end: End timestamp
		 * 	dir: Oldest or newest first
		 * 	namespace: Filter to this namespace
		 * 	show: 
		 * 	tag: Filter to this tag
		 * 	toponly: Only show the last edit to a page
		 */
		usercontribs: function(props, limit, options) {
			if(typeof props != 'string' && props !== true) {props = props.join('|');}

			var params = {
				qmodule: 'usercontribs',
				list: 'usercontribs',
			};
			if(props !== true) {params.ucprop = props;}
			if(limit) {params.uclimit = limit;}

			B3.util.softmerge(params, options, 'uc');
			return params;
		},
	},
	param_generators: {
		users: function(params, user) {
			params.ucuser = user.name;
		},
	},
	query_mergers: {
		usercontribs: B3.modules.page_querymerger,
	},
});





/*------------------------------------------------------------------------------------------------
	action=query&meta=
 
	Common arguments:
		props - properties to get
		options - optional additional module-specific parameters to send with the request
  ------------------------------------------------------------------------------------------------*/

//FIXME: hack for making these visible when we register metainfo
var dm_set = function(query, module) {B3.m[module] = query;};
var dm_name_map = function(query, module) {
	B3.m[module] = {};
	for(var i = 0; i < query.length; i++) {B3.m[module][query[i].name] = query[i];}
};
var dm_code_all = function(query, module) {
	B3.m[module] = {};
	for(var i = 0; i < query.length; i++) {B3.m[module][query[i].code] = query[i]['*'];}
};
window.dm_set = dm_set;
window.dm_name_map = dm_name_map;
window.dm_code_all = dm_code_all;

B3.modules.metainfo_pgen = function(module, short, props, options) {
	if(typeof props != 'string') {props = props.join('|');}

	var params = {
		meta: module,
	};
	params[short + 'prop'] = props;
	B3.util.softmerge(params, options, short);
	return params;
};

B3.modules.register_query('siteinfo', {
	type: 'meta',
	prefix: 'si',
	generator: false,
	query_generators: {
		siteinfo: function(props, options) {return B3.modules.metainfo_pgen('siteinfo', 'si', props, options);},
	},
	param_generators: {},
	query_mergers: {
		dbreplag: function(query) {
			if(!B3.m.dbreplag) {B3.m.dbreplag = {};}
			for(var i = 0; i < query.length; i++) {B3.m.dbreplag[query[i].host] = query[i].lag;}
		},
		extensions: dm_name_map,
		extensiontags: dm_set,
		fileextensions: function(query) {
			B3.m.fileextensions = [];
			for(var i = 0; i < query.length; i++) {B3.m.fileextensions.push(query[i].ext);}
		},
		functionhooks: dm_set,
		general: dm_set,
		interwikimap: function(query) {
			if(!B3.m.interwikimap) {B3.m.interwikimap = {};}
			for(var i = 0; i < query.length; i++) {B3.m.interwikimap[query[i].prefix] = query[i];}
		},
		languages: dm_code_all,
		magicwords: dm_name_map,
		namespacealiases: function(query) {
			B3.m.namespacealiases = {};
			for(var i = 0; i < query.length; i++) {
				var id = query[i].id;
				if(!B3.m.namespacealiases[id]) {B3.m.namespacealiases[id] = [];}
				B3.m.namespacealiases[id].push(query[i]['*']);
			}
		},
		namespaces: dm_set,
		protocols: dm_set,
		rightsinfo: dm_set,
		showhooks: function(query) {
			B3.m.showhooks = {};
			for(var i = 0; i < query.length; i++) {B3.m.showhooks[query[i].name] = query[i].subscribers;}
		},
		skins: dm_code_all,
		specialpagealiases: function(query) {
			B3.m.specialpagealiases = {};
			for(var i = 0; i < query.length; i++) {B3.m.specialpagealiases[query[i].realname] = query[i].aliases;}
		},
		statistics: dm_set,
		usergroups: dm_name_map,
	},
});
B3.modules.register_query('userinfo', {
	type: 'meta',
	prefix: 'ui',
	generator: false,
	query_generators: {
		userinfo: function(props, options) {return B3.modules.metainfo_pgen('userinfo', 'ui', props, options);},
	},
	param_generators: {},
	query_mergers: {
		userinfo: dm_set,
	},
});

delete window.dm_set;
delete window.dm_name_map;
delete window.dm_code_all;

B3.modules.register_query('allmessages', {
	type: 'meta',
	prefix: 'am',
	generator: false,
	query_generators: {
		allmessages: function(messages, options) {
			if(typeof messages != 'string') {messages = messages.join('|');}

			var params = {
				meta: 'allmessages',
				ammessages: messages,
			};

			B3.util.softmerge(params, options, 'am');
			return params;
		},
	},
	param_generators: {},
	query_mergers: {
		allmessages: function(query) {
			if(!B3.m.allmessages) {B3.m.allmessages = {};}
			for(var i = 0; i < query.length; i++) {B3.m.allmessages[query[i].name] = query[i]['*'];}
		},
	},
});


B3.onload = function() {
	if(!B3.token) {B3.api.token_regen();}

	//FIXME: pull these props from a setting
	B3.action.query('', [
		B3.meta.siteinfo(['general', 'namespaces', 'namespacealiases', 'statistics', 'usergroups']),
		B3.meta.userinfo(['blockinfo', 'hasmsg', 'groups', 'rights', 'changeablegroups', 'options', 'ratelimits']),
		B3.meta.allmessages(['revertpage']), //TODO: other useful messages
	]).run();

	B3.call_listeners('init');
	B3.init = true;
};

if(document.readyState == 'complete') {B3.onload();}
else {window.addEventListener('load', B3.onload);}




B3.ui = {
	init: false,
	window: null,
	ids: {},
};

B3.settings.framerate = 60;
B3.settings.minwidth = 150;
B3.settings.maxwidth = 500;
B3.settings.minqueueheight = 150;
B3.settings.maxqueueheight = 500;

B3.util.load_css('https://monchbox.fandom.com/load.php?mode=articles&articles=MediaWiki:B3.js/ui/main.css&only=styles');

/*------------------------------------------------------------------------------------------------
     UI modules
  ------------------------------------------------------------------------------------------------*/
B3.ui.modules = {};

/*----------- Basic -----------*/
B3.ui.modules.delete = {
	group: 'Basic',
	label: 'Mass delete',
	params: '<div><label for="b3-delete-summary">Summary:</label> <input type="text" id="b3-delete-summary" name="summary" /></div>',
	prepare: function(params) {return params;},
	run: function(list, params) {
		var task = B3.action.delete(params.summary, {});
		task.input_list = list;
		task.run();
	},
};

/*----------- Maintenance -----------*/
B3.ui.modules.doubleredirects = {
	group: 'Maintenance',
	label: 'Resolve double redirects',
	notargets: true,
	params:
		'<div><label for="b3-doubleredirects-summary">Summary:</label> <input id="b3-doubleredirects-summary" type="text" name="summary" /></div>' +
		'<div><label for="b3-doubleredirects-batch">Batch size:</label> <input id="b3-doubleredirects-batch" type="number" name="batch" value="50" /></div>' +
		'<div><label for="b3-doubleredirects-poly">Resolve poly redirects</label><input type="checkbox" id="b3-doubleredirects-poly" name="poly" /></div>',
	/*+ '<p>A poly redirect is any double redirect that, when resolved, is still a double redirect. This makes them triple, quadruple, quintuple, etc redirects. Consider this case:</p>'
	+ '<pre>Redir 3 -> Redir 2 -> Redir 1 -> Page</pre>'
	+ '<p>Both <code>Redir 2</code> and <code>Redir 3</code> are listed as double redirects, because they redirect to a redirect. However, when resolved, the result will be:</p>'
	+ '<pre>'
		+ 'Redir 3 -> Redir 1 -> Page\n'
		+ '           Redir 2 -> Page'
	+ '</pre>'
	+ '<p><code>Redir 2</code> is fixed, but <code>Redir 3</code> is still a double redirect. <a href="/wiki/Special:DoubleRedirects" title="Special:DoubleRedirects">Special:DoubleRedirects</a> will list <code>Redir 3</code> as fixed, and will not detect that it is still a double redirect until the page is cached again.</p>'
	+ '<p>Poly redirects are rare, and most of the poly redirects that do exist are likely triple redirects. Resolving them directly is processor intensive, and particularly for large batch sizes, can result in your browser flagging the page as unresponsive (you can safely dismiss the message, but the script may take a long time to finish). In most cases, you can resolve double redirects faster without checking for poly redirects, and not have to worry about leaving anything behind. Particularly if you have a large number of double redirects to resolve, it\'ll be easier on your computer to ignore poly redirects, and simply check the list again the next day.</p>'*/
	prepare: function(params) {return params;},
	run: function(titles, params) {
		//do stuff and things
	},
};

/*------------------------------------------------------------------------------------------------
     Target modules
  ------------------------------------------------------------------------------------------------*/
B3.ui.targets = {};

B3.ui.targets.titles = {
	html: '<label for="b3-targets-titles-select">These targets (one on each line):</label> <textarea id="b3-targets-titles" name="titles"></textarea>',
	label: function(params) {
		var ol = document.createElement('ol');
			ol.start = 0;
			for(var i = 0; i < params.length; i++) {
				var li = document.createElement('li');
					var a = document.createElement('a');
						var url = encodeURIComponent(params[i]);
						while(url.indexOf('%20') != -1) {url = url.replace('%20', '_');}
						while(url.indexOf('%2F') != -1) {url = url.replace('%2F', '/');}
						while(url.indexOf('%3A') != -1) {url = url.replace('%3A', ':');}
						a.href = '/wiki/' + url;
						a.title = params[i];
						a.addEventListener('click', B3.ui.listeners.links.click);
						a.target = '_blank';
						a.textContent = params[i];
					li.appendChild(a);
				ol.appendChild(li);
			}
		return ol;
	},
	prepare: function(params) {
		var titles = params.titles.split('\n');
		for(var i = 0; i < titles.length; i++) {
			if(!titles[i] || titles[i].indexOf('|') != -1 || titles[i].indexOf('#') != -1) {
				titles.splice(i, 1);
				i--;
			}
			else {
				var colon = titles[i].indexOf(':');
				var namespace = titles[i].substring(0, colon).toLowerCase();
				while(namespace.indexOf(' ') != -1) {namespace = namespace.replace(' ', '_');}
				if(mw.config.get('wgNamespaceIds')[namespace]) {titles[i] = mw.config.get('wgFormattedNamespaces')[mw.config.get('wgNamespaceIds')[namespace]] + ':' + titles[i].charAt(colon + 1).toUpperCase() + titles[i].substring(colon + 2);}
				else {titles[i] = titles[i].charAt(0).toUpperCase() + titles[i].substring(1);} //mainspace
				while(titles[i].indexOf('_') != -1) {titles[i] = titles[i].replace('_', ' ');}
			}
		}
		return titles;
	},
	fetch: function(params, success, failure) {
		success(params);
	}
};

B3.ui.targets.category = {
	html: '<label for="b3-targets-category-select">Pages in Category:</label><input id="b3-targets-category" name="category" />',
	prepare: function(params) {
		if(params.category.toLowerCase().indexOf('category:') != 0) {params.category = 'Category:' + params.category;}
		params.category = B3.util.normalize_pagename(params.category);
		return params;
	},
	label: function(params) {
		var text = document.createTextNode('All pages in ');
		var a = document.createElement('a');
			a.href = B3.util.page_url(params.category);
			a.title = params.category;
			a.addEventListener('click', B3.ui.listeners.links.click);
			a.target = '_blank';
			a.textContent = params.category;
		return [text, a];
	},
	fetch: function(params, success, failure) {
		B3.action.generator(B3.list.categorymembers(params.category, 'max', {}), [
			B3.api.token('edit'),
		], success, false, failure).run();
	}
};

/*------------------------------------------------------------------------------------------------
     Animation functions
  ------------------------------------------------------------------------------------------------*/

B3.ui.animation = {
	showing: 'actions',
	in: null,
	out: null,
	frames: 0,
	interval: 0
};

B3.ui.animation.show = function(wind, render) {
	if(B3.ui.animation.showing == wind || !B3.ui.ids['controls-windows-' + wind]) {return false;}

	var tabs = B3.ui.ids['controls-titlebar'].getElementsByTagName('a');
	for(var i = 0; i < tabs.length; i++) {tabs[i].className = 'disabled';}
	B3.ui.ids['controls-titlebar-jobs'].className = '';
	B3.ui.ids['controls-titlebar-settings'].className = '';

	if(B3.ui.selection.module) {
		B3.ui.ids['controls-titlebar-actions'].className = 'hilighted';

		if(B3.ui.selection.targets) {
			B3.ui.ids['controls-titlebar-targets'].className = 'hilighted';
			B3.ui.ids['controls-titlebar-params'].className = '';
		}
		else if(B3.ui.modules[B3.ui.selection.module].notargets) {
			B3.ui.ids['controls-titlebar-targets'].className = 'hilighted disabled';
			B3.ui.ids['controls-titlebar-params'].className = '';
		}
		else {B3.ui.ids['controls-titlebar-targets'].className = '';}

		if(B3.ui.selection.params) {
			B3.ui.ids['controls-titlebar-params'].className = 'hilighted';
			B3.ui.ids['controls-titlebar-run'].className = '';
		}
	}
	else {B3.ui.ids['controls-titlebar-actions'].className = '';}

	B3.ui.ids['controls-titlebar-' + wind].className = 'hilighted';
	B3.ui.ids['controls-titlebar-' + wind].className += ' active';

	if(!B3.ui.animation.out) {B3.ui.animation.out = B3.ui.ids['controls-windows-' + B3.ui.animation.showing];}
	B3.ui.animation.showing = wind;
	if(render || render == undefined) {B3.ui.render[wind]();}

	if(B3.ui.animation.interval != 0) { //something is already running
		clearInterval(B3.ui.animation.interval);
		B3.ui.animation.in.style.left = 0;
		B3.ui.animation.out.style.display = 'none';
		B3.ui.animation.out = B3.ui.animation.in;
	}
	B3.ui.animation.in = B3.ui.ids['controls-windows-' + wind];
	B3.ui.animation.in.style.left = B3.ui.ids['controls-windows'].offsetWidth + 'px';
	B3.ui.animation.in.style.display = 'block';
	B3.ui.animation.frames = Math.floor(B3.settings.framerate * 0.3);
	B3.ui.animation.interval = setInterval(B3.ui.animation.frame, 1000 / B3.settings.framerate);

	return true;
};

B3.ui.animation.frame = function() {
	if(B3.ui.animation.frames <= 0) { //last frame
		clearInterval(B3.ui.animation.interval);
		B3.ui.animation.interval = 0;
		B3.ui.animation.frames = 0;

		B3.ui.animation.in.style.left = '';
		B3.ui.animation.out.style.display = '';
		B3.ui.animation.out = null;
		B3.ui.animation.in = null;
	}
	else {
		B3.ui.animation.out.style.left = B3.ui.animation.out.offsetLeft - (B3.ui.animation.in.offsetLeft / B3.ui.animation.frames) + 'px';
		B3.ui.animation.in.style.left = B3.ui.animation.in.offsetLeft - (B3.ui.animation.in.offsetLeft / B3.ui.animation.frames) + 'px';
		B3.ui.animation.frames--;
	}
};
/*------------------------------------------------------------------------------------------------
     Selection functions
  ------------------------------------------------------------------------------------------------*/

B3.ui.selection = {
	module: null,
	targets: null,
	params: null
};

B3.ui.selection.run = function(targets) {
	if(!B3.ui.selection.module || !B3.ui.selection.params) {return;} //complain?

	if(!targets && !B3.ui.modules[B3.ui.selection.module].notargets) {B3.ui.targets[B3.ui.selection.targets.module].fetch(B3.ui.selection.targets.params, B3.ui.selection.run/*, some failure callback*/);}
	else {
		B3.ui.modules[B3.ui.selection.module].run(targets, B3.ui.selection.params);
		B3.ui.selection.module = null;
		B3.ui.selection.targets = null;
		B3.ui.selection.params = null;
	}
};

/*------------------------------------------------------------------------------------------------
     Render functions
  ------------------------------------------------------------------------------------------------*/
B3.ui.render = {};

B3.ui.render.actions = function() {
	var form = B3.ui.ids['controls-windows-actions-form'];
	while(form.children.length > 0) {form.removeChild(form.children[0]);}

	var groups = {};
	for(var i in B3.ui.modules) {
		if (B3.ui.modules.hasOwnProperty(i)) {
			if(!groups[B3.ui.modules[i].group]) {
				var fieldset = document.createElement('fieldset');
				fieldset.id = 'b3-module-' + i;
				var legend = document.createElement('legend');
				legend.textContent = B3.ui.modules[i].group;
				fieldset.appendChild(legend);
				groups[B3.ui.modules[i].group] = fieldset;
			}
			var a = document.createElement('a');
			a.id = 'b3-module-' + encodeURIComponent(B3.ui.modules[i].group) + '-' + encodeURIComponent(B3.ui.modules[i].label);
			a.setAttribute('data-module', i);
			a.addEventListener('click', B3.ui.listeners.windows.moduleclick);
			a.textContent = B3.ui.modules[i].label;
			groups[B3.ui.modules[i].group].appendChild(a);
		}
	}

	for(var i in groups) {
		if (groups.hasOwnProperty(i)) {
			form.appendChild(groups[i]);
		}
	}
};

B3.ui.render.targets = function() {
	if(B3.ui.selection.targets) {return;}

	var form = B3.ui.ids['controls-windows-targets-form'];
	while(form.children.length > 0) {form.removeChild(form.children[0]);}

	for(var i in B3.ui.targets) {
		if (B3.ui.targets.hasOwnProperty(i)) {
			var div = document.createElement('div');
			var radio = document.createElement('input');
				radio.type = 'radio';
				radio.id = 'b3-targets-' + i + '-select';
				radio.name = 'module';
				radio.value = i;
			div.appendChild(radio);

			var html = B3.ui.targets[i].html;
			if(typeof html == 'function') {html = html();}
			if(typeof html == 'string') {div.innerHTML += html;}
			else if(html.length > 0) { //array of DOM elements
				for(var j = 0; j < html.length; j++) {div.appendChild(html[j]);}
			}
			else {div.appendChild(html);}
			form.appendChild(div);
		}
	}
	form.elements['module'][0].checked = true;

	var next = document.createElement('a');
		next.id = 'b3-targets-next';
		next.addEventListener('click', B3.ui.listeners.windows.nextclick);
		next.textContent = 'Next';
	form.appendChild(next);
};

B3.ui.render.params = function() {
	if(B3.ui.selection.params) {return;}

	var form = B3.ui.ids['controls-windows-params-form'];
	while(form.children.length > 0) {form.removeChild(form.children[0]);}

	var params = B3.ui.modules[B3.ui.selection.module].params;
	if(typeof params == 'function') {params = params();}
	if(typeof params == 'string') {form.innerHTML = params;}
	else if(params.length > 0) { //array of DOM elements
		for(var i = 0; i < params.length; i++) {form.appendChild(params[i]);}
	}
	else {form.appendChild(params);}

	var ready = document.createElement('a');
		ready.id = 'b3-params-ready';
		ready.textContent = 'Ready';
		ready.addEventListener('click', B3.ui.listeners.windows.readyclick);
	form.appendChild(ready);
};

B3.ui.render.run = function() {
	var form = B3.ui.ids['controls-windows-run-form'];
	while(form.children.length > 0) {form.removeChild(form.children[0]);}

	var actionheader = document.createElement('h2');
		actionheader.id = 'b3-run-action-header';
		actionheader.textContent = 'Action';
	form.appendChild(actionheader);
	var action = document.createElement('p');
		action.id = 'b3-run-action';
		action.textContent = B3.ui.selection.module;
	form.appendChild(action);

	if(!B3.ui.modules[B3.ui.selection.module].notargets) {
		var targetsheader = document.createElement('h2');
			targetsheader.id = 'b3-run-targets-header';
			targetsheader.textContent = 'Targets';
		form.appendChild(targetsheader);
		var targets = document.createElement('p');
			targets.id = 'b3-run-targets';
			var label = B3.ui.targets[B3.ui.selection.targets.module].label;
			if(typeof label == 'function') {label = label(B3.ui.selection.targets.params);}
			if(typeof label == 'string') {targets.innerHTML = label;}
			else if(label.length > 0) { //array of DOM elements
				for(var i = 0; i < label.length; i++) {targets.appendChild(label[i]);}
			}
			else {targets.appendChild(label);}
		form.appendChild(targets);
	}

	var paramsheader = document.createElement('h2');
		paramsheader.id = 'b3-run-params-header';
		paramsheader.textContent = 'Parameters';
	form.appendChild(paramsheader);
	var ul = B3.util.paramlist(B3.ui.selection.params);
		ul.id = 'b3-run-params';
	form.appendChild(ul);

	var confirm = document.createElement('div');
		confirm.id = 'b3-run-confirm';
		var back = document.createElement('a');
			back.id = 'b3-run-back';
			back.addEventListener('click', B3.ui.listeners.windows.backclick);
			back.textContent = 'Go back';
		confirm.appendChild(back);
		var span = document.createElement('span');
			span.textContent = 'Perform this action?';
		confirm.appendChild(span);
		var run = document.createElement('a');
			run.id = 'b3-run-run';
			run.addEventListener('click', B3.ui.listeners.windows.runclick);
			run.textContent = 'Run';
		confirm.appendChild(run);
	form.appendChild(confirm);
};

B3.ui.render.jobs = function() {
	
};

B3.ui.render.settings = function() {
	
};

/*------------------------------------------------------------------------------------------------
     Listener functions
  ------------------------------------------------------------------------------------------------*/

B3.ui.listeners = {
	window: {},
	titlebar: {},
	resize: {},
	queueresize: {},
	windows: {},
	links: {}
};

B3.ui.listeners.window.resize = function(event) {
	B3.ui.ids['controls-titlebar'].style.bottom = ''; //offsetHeight has to be accurate

	B3.ui.window.style.height = window.innerHeight - 50 + 'px';

	B3.ui.ids['controls-titlebar'].style.bottom = B3.ui.ids['controls'].offsetHeight - B3.ui.ids['controls-titlebar'].offsetHeight + 'px';
	B3.ui.ids['controls-windows'].style.top = B3.ui.ids['controls-titlebar'].offsetHeight + 'px';
};

B3.ui.listeners.resize.mousedown = function(event) {
	event.preventDefault(); //try to avoid hilighting
	B3.ui.window.addEventListener('mousemove', B3.ui.listeners.resize.mousemove);
};
B3.ui.listeners.resize.mouseup = function(event) {
	B3.ui.window.removeEventListener('mousemove', B3.ui.listeners.resize.mousemove);
};
B3.ui.listeners.resize.mousemove = function(event) {
	var el = event.target;
	var x = event.offsetX;
	while(el != B3.ui.window) {
		x += el.offsetLeft;
		el = el.parentNode;
	}
	if(B3.ui.window.offsetWidth - x < B3.settings.minwidth) {x = B3.ui.window.offsetWidth - B3.settings.minwidth;} //TODO: make this use percentages
	else if(B3.ui.window.offsetWidth - x > B3.settings.maxwidth) {x = B3.ui.window.offsetWidth - B3.settings.maxwidth;}

	B3.ui.ids['controls'].style.right = (B3.ui.window.offsetWidth - (x - 2)) / B3.ui.window.offsetWidth * 100 + '%';
	B3.ui.ids['resize'].style.right = (B3.ui.window.offsetWidth - (x + 3)) / B3.ui.window.offsetWidth * 100 + '%';
	B3.ui.ids['queue'].style.left = (x + 3) / B3.ui.window.offsetWidth * 100 + '%';
};

B3.ui.listeners.queueresize.mousedown = function(event) {
	event.preventDefault();
	B3.ui.ids['queue'].addEventListener('mousemove', B3.ui.listeners.queueresize.mousemove);
};
B3.ui.listeners.queueresize.mouseup = function(event) {
	B3.ui.ids['queue'].removeEventListener('mousemove', B3.ui.listeners.queueresize.mousemove);
};
B3.ui.listeners.queueresize.mousemove = function(event) {
	var el = event.target;
	var y = event.offsetY;
	while(el != B3.ui.ids['queue']) {
		y += el.offsetTop;
		el = el.parentNode;
	}
	if(B3.ui.window.offsetHeight - y < B3.settings.minqueueheight) {y = B3.ui.window.offsetHeight - B3.settings.minqueueheight;}
	else if(B3.ui.window.offsetHeight - y > B3.settings.maxqueueheight) {y = B3.ui.window.offsetHeight - B3.settings.maxqueueheight;}

	B3.ui.ids['queue-active'].style.bottom = (B3.ui.ids['queue'].offsetHeight - (y - 2)) / B3.ui.ids['queue'].offsetHeight * 100 + '%';
	B3.ui.ids['queue-resize'].style.top = (y - 2) / B3.ui.ids['queue'].offsetHeight * 100 + '%';
	B3.ui.ids['queue-waiting'].style.top = (y + 3) / B3.ui.ids['queue'].offsetHeight * 100 + '%';
};

B3.ui.listeners.windows.moduleclick = function(event) {
	var module = this.getAttribute('data-module');
	B3.ui.selection.module = module;
	B3.ui.selection.targets = null;
	B3.ui.selection.params = null;

	if(!B3.ui.modules[module].notargets) {B3.ui.animation.show('targets');}
	else {B3.ui.animation.show('params');}
};

B3.ui.listeners.windows.nextclick = function(event) {
	var radios = B3.ui.ids['controls-windows-targets-form'].elements['module'];
	for(var i = 0; i < radios.length; i++) {
		if(radios[i].checked) {
			var params = B3.util.formharvest(radios[i].parentNode);

			if(typeof B3.ui.targets[radios[i].value].prepare == 'function') {params = B3.ui.targets[radios[i].value].prepare(params);}
			B3.ui.selection.targets = {
				module: radios[i].value,
				params: params
			};
			break;
		}
	}

	B3.ui.animation.show('params');
};

B3.ui.listeners.windows.readyclick = function(event) {
	var params = B3.util.formharvest(B3.ui.ids['controls-windows-params-form']);

	if(typeof B3.ui.modules[B3.ui.selection.module].prepare == 'function') {B3.ui.selection.params = B3.ui.modules[B3.ui.selection.module].prepare(params);}
	else {B3.ui.selection.params = params;}

	B3.ui.animation.show('run');
};

B3.ui.listeners.windows.backclick = function(event) {
	B3.ui.animation.show('params');
};

B3.ui.listeners.windows.runclick = function(event) {
	B3.ui.selection.run();

	B3.ui.animation.show('jobs');
};

B3.ui.listeners.titlebar.click = function(event) {
	var classes = this.className.split(' ');
	for(var i = 0; i < classes.length; i++) {
		if(classes[i] == 'disabled') {return;}
	}
	B3.ui.animation.show(this.getAttribute('data-window'));
};

B3.ui.listeners.links.click = function(event) {
	event.preventDefault();
	window.open(this.href, 'B3');
};
/*------------------------------------------------------------------------------------------------
     Onload listener / HTML
  ------------------------------------------------------------------------------------------------*/

B3.ui.onload = function(event) {
	if(mw.config.get('wgCanonicalNamespace') == 'Special' && mw.config.get('wgTitle') == 'B3') {
		var body;
		document.title = 'B3 - ' + mw.config.get('wgSiteName');
		if(mw.config.get('skin') == 'oasis') {
			body = document.getElementById('WikiaArticle');
			if(document.getElementById('WikiaPageHeader')) {
				document.getElementById('WikiaPageHeader').getElementsByTagName('h1')[0].textContent = 'B3';
				document.getElementById('WikiaPageHeader').getElementsByTagName('h2')[0].textContent = 'Browser-based bot framework';
			}
		}
		else {
			body = document.getElementById('bodyContent');
			document.getElementById('firstHeading').textContent = 'B3';
		}

		while(body.children.length > 0) {body.removeChild(body.children[0]);}
		if(document.getElementById('AdminDashboardHeader')) {
			var div = document.createElement('div');
				div.className = 'AdminDashboardGeneralHeader AdminDashboardArticleHeader';
				var h1 = document.createElement('h1');
					h1.textContent = 'B3';
				div.appendChild(h1);
			body.appendChild(div);
		}

		B3.ui.window = document.createElement('div');
			B3.ui.window.id = 'b3';
			B3.ui.ids['b3'] = B3.ui.window;
			B3.ui.window.style.height = window.innerHeight - 50 + 'px';
			B3.ui.window.addEventListener('mouseup', B3.ui.listeners.resize.mouseup);

			var controls = document.createElement('div');
				B3.ui.ids['controls'] = controls;
				controls.id = 'b3-controls';

				var titlebar = document.createElement('div');
					B3.ui.ids['controls-titlebar'] = titlebar;
					titlebar.id = 'b3-controls-titlebar';

					var t_actions = document.createElement('a');
						B3.ui.ids['controls-titlebar-actions'] = t_actions;
						t_actions.id = 'b3-controls-titlebar-actions';
						t_actions.className = 'hilighted active';
						t_actions.setAttribute('data-window', 'actions');
						t_actions.textContent = 'Action';
						t_actions.addEventListener('click', B3.ui.listeners.titlebar.click);
					titlebar.appendChild(t_actions);
					var t_span = document.createElement('span');
						t_span.className = 'B3-titlebar-arrow';
						t_span.innerHTML = '&raquo;';
					titlebar.appendChild(t_span);
					var t_targets = document.createElement('a');
						B3.ui.ids['controls-titlebar-targets'] = t_targets;
						t_targets.id = 'b3-controls-titlebar-targets';
						t_targets.className = 'disabled';
						t_targets.setAttribute('data-window', 'targets');
						t_targets.textContent = 'Targets';
						t_targets.addEventListener('click', B3.ui.listeners.titlebar.click);
					titlebar.appendChild(t_targets);
					titlebar.appendChild(t_span.cloneNode(true));
					var t_params = document.createElement('a');
						B3.ui.ids['controls-titlebar-params'] = t_params;
						t_params.id = 'b3-controls-titlebar-params';
						t_params.className = 'disabled';
						t_params.setAttribute('data-window', 'params');
						t_params.textContent = 'Params';
						t_params.addEventListener('click', B3.ui.listeners.titlebar.click);
					titlebar.appendChild(t_params);
					titlebar.appendChild(t_span.cloneNode(true));
					var t_run = document.createElement('a');
						B3.ui.ids['controls-titlebar-run'] = t_run;
						t_run.id = 'b3-controls-titlebar-run';
						t_run.className = 'disabled';
						t_run.setAttribute('data-window', 'run');
						t_run.textContent = 'Run';
						t_run.addEventListener('click', B3.ui.listeners.titlebar.click);
					titlebar.appendChild(t_run);
					titlebar.appendChild(t_span.cloneNode(true));
					var t_jobs = document.createElement('a');
						B3.ui.ids['controls-titlebar-jobs'] = t_jobs;
						t_jobs.id = 'b3-controls-titlebar-jobs';
						t_jobs.setAttribute('data-window', 'jobs');
						t_jobs.textContent = 'Jobs';
						t_jobs.addEventListener('click', B3.ui.listeners.titlebar.click);
					titlebar.appendChild(t_jobs);
					var t_settings = document.createElement('a');
						B3.ui.ids['controls-titlebar-settings'] = t_settings;
						t_settings.id = 'b3-controls-titlebar-settings';
						t_settings.setAttribute('data-window', 'settings');
						t_settings.textContent = 'Settings';
						t_settings.addEventListener('click', B3.ui.listeners.titlebar.click);
					titlebar.appendChild(t_settings);
				controls.appendChild(titlebar);

				var windows = document.createElement('div');
					B3.ui.ids['controls-windows'] = windows;
					windows.id = 'b3-controls-windows';
					var w_actions = document.createElement('div');
						B3.ui.ids['controls-windows-actions'] = w_actions;
						w_actions.id = 'b3-controls-windows-actions';
						w_actions.style.display = 'block';
						var w_actions_form = document.createElement('form');
							B3.ui.ids['controls-windows-actions-form'] = w_actions_form;
							w_actions_form.id = 'b3-controls-windows-actions-form';
						w_actions.appendChild(w_actions_form);
					windows.appendChild(w_actions);
					var w_targets = document.createElement('div');
						B3.ui.ids['controls-windows-targets'] = w_targets;
						w_targets.id = 'b3-controls-windows-targets';
						var w_targets_form = document.createElement('form');
							B3.ui.ids['controls-windows-targets-form'] = w_targets_form;
							w_targets_form.id = 'b3-controls-windows-targets-form';
						w_targets.appendChild(w_targets_form);
					windows.appendChild(w_targets);
					var w_params = document.createElement('div');
						B3.ui.ids['controls-windows-params'] = w_params;
						w_params.id = 'b3-controls-windows-params';
						var w_params_form = document.createElement('form');
							B3.ui.ids['controls-windows-params-form'] = w_params_form;
							w_params_form.id = 'b3-controls-windows-params-form';
						w_params.appendChild(w_params_form);
					windows.appendChild(w_params);
					var w_run = document.createElement('div');
						B3.ui.ids['controls-windows-run'] = w_run;
						w_run.id = 'b3-controls-windows-run';
						var w_run_form = document.createElement('form');
							B3.ui.ids['controls-windows-run-form'] = w_run_form;
							w_run_form.id = 'b3-controls-windows-run-form';
						w_run.appendChild(w_run_form);
					windows.appendChild(w_run);
					var w_jobs = document.createElement('div');
						B3.ui.ids['controls-windows-jobs'] = w_jobs;
						w_jobs.id = 'b3-controls-windows-jobs';
						var w_jobs_form = document.createElement('form');
							B3.ui.ids['controls-windows-jobs-form'] = w_jobs_form;
							w_jobs_form.id = 'b3-controls-windows-jobs-form';
						w_jobs.appendChild(w_jobs_form);
					windows.appendChild(w_jobs);
					var w_settings = document.createElement('div');
						B3.ui.ids['controls-windows-settings'] = w_settings;
						w_settings.id = 'b3-controls-windows-settings';
						var w_settings_form = document.createElement('form');
							B3.ui.ids['controls-windows-settings-form'] = w_settings_form;
							w_settings_form.id = 'b3-controls-windows-settings-form';
						w_settings.appendChild(w_settings_form);
					windows.appendChild(w_settings);
				controls.appendChild(windows);
			B3.ui.window.appendChild(controls);

			var resize = document.createElement('div');
				B3.ui.ids['resize'] = resize;
				resize.id = 'b3-resize';
				resize.addEventListener('mousedown', B3.ui.listeners.resize.mousedown);
			B3.ui.window.appendChild(resize);

			var queue = document.createElement('div');
				B3.ui.ids['queue'] = queue;
				queue.id = 'b3-queue';
				queue.addEventListener('mouseup', B3.ui.listeners.queueresize.mouseup);
				var q_active = document.createElement('ul');
					B3.ui.ids['queue-active'] = q_active;
					q_active.id = 'b3-queue-active';
				queue.appendChild(q_active);
				var q_resize = document.createElement('div');
					B3.ui.ids['queue-resize'] = q_resize;
					q_resize.id = 'b3-queue-resize';
					q_resize.addEventListener('mousedown', B3.ui.listeners.queueresize.mousedown);
				queue.appendChild(q_resize);
				var q_waiting = document.createElement('ul');
					B3.ui.ids['queue-waiting'] = q_waiting;
					q_waiting.id = 'b3-queue-waiting';
				queue.appendChild(q_waiting);
			B3.ui.window.appendChild(queue);
		body.appendChild(B3.ui.window);

		titlebar.style.bottom = controls.offsetHeight - titlebar.offsetHeight + 'px';
		windows.style.top = titlebar.offsetHeight + 'px';

		//B3-queue has width:20em; in the stylesheet, calc the left and right properties, then set it to auto so it scales
		queue.style.left = (B3.ui.window.offsetWidth - queue.offsetWidth) / B3.ui.window.offsetWidth * 100 + '%';
		resize.style.right = queue.offsetWidth / B3.ui.window.offsetWidth * 100 + '%';
		controls.style.right = (queue.offsetWidth + 5) / B3.ui.window.offsetWidth * 100 + '%';
		queue.style.width = 'auto';

		q_active.style.bottom = (queue.offsetHeight - q_active.offsetHeight) / queue.offsetHeight * 100 + '%';
		q_resize.style.top = q_active.offsetHeight / queue.offsetHeight * 100 + '%';
		q_waiting.style.top = (q_active.offsetHeight + 5) / queue.offsetHeight * 100 + '%';
		q_active.style.height = 'auto';

		B3.ui.render.actions();

		window.addEventListener('resize', B3.ui.listeners.window.resize);

		B3.ui.init = true;
	}
};

if(B3.init) {B3.ui.onload();}
else {B3.add_listener('init', B3.ui.onload);}

/*------------------------------------------------------------------------------------------------
     UI utilities
  ------------------------------------------------------------------------------------------------*/

B3.util.formharvest = function(form) {
	var params = {};

	//HARVEST THEIR INPUTS FOR SUSTENANCE
	var inputs = form.getElementsByTagName('input');
	for(var i = 0; i < inputs.length; i++) {
		var name = inputs[i].name;
		if(!name) {continue;}
		else if(name.indexOf('[]') == name.length - 2 && params[name.substring(0, name.length - 2)] == undefined) {params[name.substring(0, name.length - 2)] = [];}
		switch(inputs[i].type) {
			case 'text':
				if(params[i] instanceof Array) {params[name.substring(0, name.length - 2)].push(inputs[i].value);}
				else {params[name] = inputs[i].value;}
				break;
			case 'number':
				if(params[i] instanceof Array) {params[name.substring(0, name.length - 2)].push(inputs[i].value * 1);}
				else {params[name] = inputs[i].value * 1;}
				break;
			case 'checkbox':
				if(params[i] instanceof Array) {
					if(inputs[i].checked) {params[name.substring(0, name.length - 2)].push(inputs[i].value);}
				}
				else {
					if(inputs[i].checked) {params[name] = true;}
					else {params[name] = false;} //if it wasn't clicked at all, .checked will be undefined
				}
				break;
			case 'radio':
				if(inputs[i].checked) {
					if(params[i] instanceof Array) {params[name.substring(0, name.length - 2)].push(inputs[i].value);}
					else {params[name] = inputs[i].value;}
				}
				break;
		}
	}
	var textareas = form.getElementsByTagName('textarea');
	for(var i = 0; i < textareas.length; i++) {
		var name = textareas[i].name;
		if(!name) {continue;}
		else if(name.indexOf('[]') == name.length - 2) {
			if(params[name.substring(0, name.length - 2)] == undefined) {params[name.substring(0, name.length - 2)] = [];}
			params[name.substring(0, name.length - 2)].push(textareas[i].value);
		}
		else {params[name] = textareas[i].value;}
	}
	var selects = form.getElementsByTagName('select');
	for(var i = 0; i < selects.length; i++) {
		var name = selects[i].name;
		if(!name) {continue;}
		else if(name.indexOf('[]') == name.length - 2) {
			if(params[name.substring(0, name.length - 2)] == undefined) {params[name.substring(0, name.length - 2)] = [];}
			params[name.substring(0, name.length - 2)].push(selects[i].options[selects[i].selectedIndex].value);
		}
		else {params[name] = selects[i].options[selects[i].selectedIndex].value;}
	}
	return params;
};

B3.util.paramlist = function(params) {
	if(params instanceof Array) {
		var ol = document.createElement('ol');
		ol.start = 0;
		for(var i = 0; i < params.length; i++) {
			var li2;
			switch(typeof params[i]) {
				case 'number':
				case 'string':
					li2 = document.createElement('li');
					li2.textContent = params[i];
					ol.appendChild(li2);
					break;
				case 'undefined':
					li2 = document.createElement('li');
					li2.textContent = 'None';
					ol.appendChild(li2);
					break;
				case 'boolean':
					li2 = document.createElement('li');
					if(params[i]) {li2.textContent = 'Yes';}
					else {li2.textContent = 'No';}
					ol.appendChild(li2);
					break;
				case 'object':
					ol.appendChild(B3.util.paramlist(params[i]));
					break;
			}
		}
		return ol;
	}
	else {
		var ul = document.createElement('ul');
		for(var j in params) {
			if (params.hasOwnProperty(j)) {
				var li;
				switch(typeof params[j]) {
					case 'number':
					case 'string':
						li = document.createElement('li');
						li.textContent = j + ': ' + params[j];
						ul.appendChild(li);
						break;
					case 'undefined':
						li = document.createElement('li');
						li.textContent = j + ': None';
						ul.appendChild(li);
						break;
					case 'boolean':
						li = document.createElement('li');
						if(params[j]) {li.textContent = j + ': Yes';}
						else {li.textContent = j + ': No';}
						ul.appendChild(li);
						break;
					case 'object':
						ul.appendChild(B3.util.paramlist(params[j]));
						break;
				}
			}
		}
		return ul;
	}
};

B3.util.page_url = function(page) {
	if(!page) {return '/wiki/';} //FIXME: complain?
	var url;
	page = encodeURIComponent(B3.util.normalize_pagename(page));
	if(B3.m.general) {url = B3.util.message(B3.m.general.articlepath, page);} //articlepath from meta
	else { //no meta (for some probably bad reason), guess /wiki/
		console.log('B3: util.page_url found no metadata: B3.m.general = ', B3.m.general);
		url = '/wiki/' + page;
	}

	while(url.indexOf('%20') != -1) {url = url.replace('%20', '_');}
	while(url.indexOf('%2F') != -1) {url = url.replace('%2F', '/');}
	while(url.indexOf('%3A') != -1) {url = url.replace('%3A', ':');}

	return url;
};

window.B3 = B3;
// </nowiki>