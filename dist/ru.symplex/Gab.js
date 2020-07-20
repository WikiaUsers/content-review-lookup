(function(window, callbacks) {
	var document = window.document,
		Element = window.Element,
		Node = window.Node,
		Object = window.Object,
		Array = window.Array,
		Function = window.Function,
		RegExp = window.RegExp,
		Error = window.Error,
		Math = window.Math,
		Date = window.Date,
		XMLHttpRequest,
		getComputedStyle,
		localStorage,
		JSON,
		Event,
		Core,
		$ = {},
		global = window,
		Gabriel = function(s, p) {
			return new Core(s, p, Gabriel);
		},
		VERSION = '0.11',
		g = 'Gabriel' + (Math.random().toString().slice(2));
	//Chrome 8.0+; FF 8.0+; Opera 12.0+; Safari 5.1+; Edge 12.0+; not: IE;
	if (document.implementation.createHTMLDocument, [(XMLHttpRequest = window.XMLHttpRequest), (getComputedStyle = window.getComputedStyle), (localStorage = window.localStorage), (JSON = window.JSON), ($.matches = (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.matchesSelector)), Element.prototype.querySelectorAll, Element.prototype.querySelector, Element.prototype.getBoundingClientRect, Object.create, Object.keys, document.createElement('div').classList, Element.prototype.addEventListener, Element.prototype.removeEventListener, Element.prototype.dispatchEvent, (Event = window.Event)].some(function(e) {
			return !e;
		})) {
		throw new Error('Exception');
	}
	var die = function(from, target, callback) {
			if (Gabriel.isEmptyObject(from[target])) {
				delete from[target];
				Gabriel.isFunction(callback) && callback();
			}
		},
		trim = function(target) {
			if (Gabriel.isString(target)) {
				return target.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
			}
		};
	(function(Gabriel) {
		Gabriel.isNumber = function(target) {
			return target !== null && !this.isBoolean(target) && typeof + target == 'number' && !window.isNaN(target);
		};
		Gabriel.isString = function(target) {
			return typeof target == 'string';
		};
		Gabriel.isObject = function(target) {
			return target instanceof Object;
		};
		Gabriel.isArray = function(target) {
			return target instanceof Array;
		};
		Gabriel.isFunction = function(target) {
			return typeof target == 'function';
		};
		Gabriel.isRegExp = function(target) {
			return target instanceof RegExp;
		};
		Gabriel.isNode = function(target) {
			return target instanceof Node;
		};
		Gabriel.isGabriel = function(target) {
			return target instanceof Gabriel;
		};
		Gabriel.isBoolean = function(target) {
			return typeof target == 'boolean';
		};
		Gabriel.isEmptyObject = function(target) {
			var p,
				i = 0;
			if (this.isObject(target)) {
				if (this.isArray(target)) {
					for (; i < target.length;) {
						return false;
					}
					return true;
				}
				for (p in target) {
					return false;
				}
				return true;
			} else {
				return true;
			}
		};
		Gabriel.isEmptyArray = function() {
			return this.isEmptyObject.apply(this, arguments);
		};
		Gabriel.isCommonObject = function(target) {
			return this.isObject(target) && target.constructor == Object;
		};
	})(Gabriel);
	Gabriel.toArray = function() {
		return Array.prototype.slice.call(arguments[0]);
	};
	Gabriel.inArray = function(array, target) {
		if (this.isArray(array)) {
			return (!!(~array.indexOf(target)));
		} else {
			return null;
		}
	};
	Gabriel.fn = function() {};
	Gabriel.isLikeArray = function(target) {
		var keys;
		if (this.isObject(target)) {
			keys = Object.keys(target);
			if (this.inArray(keys, 'length') ? target.length === (keys.length - 1) : target.length === keys.length) {
				return true;
			}
			return false;
		}
	};
	Gabriel.extend = function(settings, gtarget) {
		settings = this.isCommonObject(settings) && settings || {};
		gtarget = this.isObject(gtarget) && gtarget || {};
		var deep = settings.deep || false,
			rewrite = settings.rewrite || false,
			clone,
			extend = function extend(target) {
				for (var i = 1; i < arguments.length; i++) {
					for (var prop in arguments[i]) {
						if (prop in target && (rewrite || gtarget == arguments[i][prop]) || !Object.hasOwnProperty.call(arguments[i], prop)) {
							continue;
						}
						if (deep && (this.isCommonObject(arguments[i][prop]) || this.isArray(arguments[i][prop]))) {
							this.isArray(arguments[i][prop]) ? (clone = []) : (clone = {});
							target[prop] = extend.call(this, clone, arguments[i][prop]);
							continue;
						}
						target[prop] = arguments[i][prop];
					}
				}
				return target;
			};
		return (gtarget = extend.apply(this, this.toArray(arguments).slice(1)));
	};
	Gabriel.createPrototype = function(initial, prototype) {
		if (this.isObject(initial)) {
			if (this.isCommonObject(initial)) {
				return this.extend(null, Object.create(prototype), initial);
			}
			if (this.isFunction(initial)) {
				return (initial.prototype = prototype), initial;
			}
		} else {
			return {};
		}
	};
	Gabriel.forEach = function(target, callback, context) {
		var i = 0,
			prop;
		if (this.isFunction(callback)) {
			context ? (callback = callback.bind(context)) : undefined;
			if (this.isArray(target) || this.isGabriel(target)) {
				for (; i < target.length; i++) {
					if (callback(target[i], i) === false) {
						break;
					}
				}
				return target;
			}
			if (this.isObject(target)) {
				for (prop in target) {
					if (callback(target[prop], i++) === false) {
						break;
					}
				}
				return target;
			}
		}
	};
	Gabriel.fetch = (function(Gabriel) {
		Gabriel.parseJSON = function(target) {
			if (!Gabriel.isString(target) || !target) {
				return null;
			}
			try {
				try {
					return JSON.parse(target);
				} catch (err) {
					return target;
				}
			} catch (err) {
				return target;
			}
		};
		Gabriel.parseHTML = function(markup) {
			var pseudoDocument = document.implementation.createHTMLDocument();
			pseudoDocument = Gabriel(pseudoDocument);
			pseudoDocument.find('html').html(markup);
			return pseudoDocument.children();
		};
		serialize.parse = function(u, o) {
			var f = !f;
			for (var k in o) {
				if (f) {
					u += '?' + window.encodeURIComponent(window.decodeURIComponent(k)) + '=' + window.encodeURIComponent(window.decodeURIComponent(o[k]));
					f = !f;
					continue;
				}
				u += '&' + window.encodeURIComponent(window.decodeURIComponent(k)) + '=' + window.encodeURIComponent(window.decodeURIComponent(o[k]));
			}
			return (u).replace(/\s/g, '_');
		};

		function serialize(url, params) {
			if (url === null && Gabriel.isCommonObject(params)) {
				return (serialize.parse('', params)).replace('?', '');
			}
			if (url === undefined) {
				if (Gabriel.isCommonObject(params)) {
					return serialize.parse(window.location.pathname, params);
				}
				return serialize.parse(window.location.pathname);
			}
			if (Gabriel.isString(url)) {
				return params === undefined ? url : Gabriel.isCommonObject(params) ? serialize.parse(url, params) : '';
			}
			if (Gabriel.isCommonObject(url) && params === undefined) {
				return serialize.parse(window.location.pathname, url);
			}
		}

		function fetch(url, setup) {
			setup = setup || {};
			var ajaxAccept = Gabriel.isArray(setup.accept) ? setup.accept : ['*/*'],
				ajaxContentType = Gabriel.isString(setup.contentType) && setup.contentType ? setup.contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				ajaxHeaders = Gabriel.isCommonObject(setup.headers) ? Gabriel.extend(null, {
					'X-Requested-With': 'XMLHttpRequest'
				}, setup.headers) : {
					'X-Requested-With': 'XMLHttpRequest'
				},
				ajax = new XMLHttpRequest(),
				ajaxRequestMethod = setup.method || 'GET',
				ajaxRequestUrl = Gabriel.isCommonObject(setup.params) && !(Gabriel.isEmptyObject(setup.params)) && ajaxRequestMethod != 'POST' ? serialize(url, setup.params) : serialize(url) || window.location.pathname,
				prop,
				i = 0,
				self = this;
			Gabriel.extend(null, ajax, {
				onloadstart: function() {
					self.before();
				},
				onloadend: function() {
					if (this.status >= 400 && this.status < 600) {
						self.error(Gabriel.parseJSON(this.response), this);
					}
					self.complete(Gabriel.parseJSON(this.response), this);
				},
				onload: function() {
					if (this.status >= 200 && this.status < 400 || this.status === 0) {
						self.success(Gabriel.parseJSON(this.response), this);
					}
				}
			});
			ajax.open(ajaxRequestMethod.toUpperCase(), ajaxRequestUrl, true);
			for (prop in ajaxHeaders) {
				ajax.setRequestHeader(prop, ajaxHeaders[prop]);
			}
			ajax.setRequestHeader('Content-Type', ajaxContentType);
			for (; i < ajaxAccept.length; i++) {
				ajax.setRequestHeader('Accept', ajaxAccept[i]);
			}
			ajax.send(ajaxRequestMethod == 'POST' && Gabriel.isCommonObject(setup.params) && !(Gabriel.isEmptyObject(setup.params)) ? serialize(null, setup.params) : null);
		}
		Gabriel.createPrototype(fetch, {
			success: function(fn) {
				if (Gabriel.isFunction(fn)) {
					this.success = fn;
				}
				return this;
			},
			error: function(fn) {
				if (Gabriel.isFunction(fn)) {
					this.error = fn;
				}
				return this;
			},
			complete: function(fn) {
				if (Gabriel.isFunction(fn)) {
					this.complete = fn;
				}
				return this;
			},
			before: function(fn) {
				if (Gabriel.isFunction(fn)) {
					this.before = fn;
				}
				return this;
			}
		});
		return function(url, params) {
			return new fetch(url, params);
		};
	})(Gabriel);
	(function(Gabriel) {
		Gabriel.storage = function() {
			return localStorage;
		};
		Gabriel.extend(null, Gabriel.storage, {
			get: function(target) {
				if (Gabriel.isString(target) || Gabriel.isNumber(target)) {
					return Gabriel.parseJSON(localStorage.getItem(target));
				}
			},
			set: function(target, value) {
				if (Gabriel.isString(target) || Gabriel.isNumber(target)) {
					if (Gabriel.isObject(value)) {
						try {
							value = JSON.stringify(value);
						} catch (err) {}
					}
					localStorage.setItem(target, value);
					return value;
				}
			},
			remove: function(target) {
				if (Gabriel.isString(target) || Gabriel.isNumber(target)) {
					localStorage.removeItem(target);
					return target;
				}
			},
			clear: function() {
				return localStorage.clear();
			}
		});
	})(Gabriel);

	function push(target, elems) {
		for (var i = 0; i < elems.length; i++) {
			target[i] = elems[i];
		}
		target.length = elems.length || 0;
	}
	Core = function(selector, extend, Gabriel) {
		if (selector) {
			if (Gabriel.isGabriel(selector)) {
				return selector;
			}
			if (Gabriel.isFunction(selector)) {
				return selector(Gabriel), this;
			}
			if (Gabriel.isArray(selector)) {
				push(this, selector.filter(function(e) {
					return Gabriel.isNode(e) || e === window || e === document;
				}));
			}
			if (Gabriel.isString(selector) && !/\d/.test(selector[0])) {
				push(this, document.querySelectorAll(selector));
			}
			if (Gabriel.isNode(selector) || selector === window) {
				push(this, [selector]);
			}
		}
	};

	function iargs(message) {
		this.name = 'IncorrectArguments';
		this.message = (message || '');
		return this;
	}

	function IncorrectArguments(message) {
		throw new iargs(message);
	}
	Gabriel.createPrototype(iargs, Error.prototype);

	function error(exception) {
		throw new Error(exception);
	}
	Gabriel.extend(null, $, {
		each: function(fn, ctx) {
			if (!this.isFunction(fn)) {
				IncorrectArguments('.each(function, context*)');
			}
			return this.length && this.forEach(this, fn, ctx) || this;
		},
		equal: function(eq) {
			if (this.isNumber(eq)) {
				return Gabriel(this[eq >= 0 ? eq : this.length + eq]);
			} else {
				IncorrectArguments('.equal(number)');
			}
		},
		first: function() {
			return this.equal(0);
		},
		last: function() {
			return this.equal(-1);
		},
		odd: function() {
			if (this.length < 2) {
				return Gabriel();
			}
			return Gabriel(Array.prototype.filter.call(this, function() {
				return !!(arguments[1] % 2);
			}));
		},
		even: function() {
			if (this.length < 1) {
				return Gabriel();
			}
			return Gabriel(Array.prototype.filter.call(this, function() {
				return !(arguments[1] % 2);
			}));
		}
	});
	Gabriel.forEach([['next', 'nextElementSibling'], ['prev', 'previousElementSibling'], ['parent', 'parentElement']], function(p, y) {
		y = p[0];
		p = p[1];
		$[y] = function(steps) {
			var elem = this[0],
				i = 0;
			if (!this.length || !elem) {
				return this;
			}
			steps = this.isNumber(steps) && steps || 1;
			for (; i < steps; i++) {
				if (!elem[p]) {
					return Gabriel();
				}
				elem = elem[p];
			}
			return Gabriel(elem);
		};
	});
	var matchesSelector = $.matches;
	Gabriel.extend(null, $, {
		remove: function() {
			return this.each(function(e) {
				e.parentElement && e.parentElement.removeChild(e);
			}, this);
		},
		save: function(scope, name) {
			if (arguments.length == 1 && (this.isString(scope) || this.isNumber(scope))) {
				name = scope;
				scope = Gabriel;
			}
			if (this.isObject(scope) && (this.isString(name) || this.isNumber(name))) {
				if (scope == Gabriel && name in Gabriel) {
					error(name + ' already defined in Gabriel, use other scope');
				}
				scope[name] = this;
			} else {
				IncorrectArguments('.save(name|scope, name)');
			}
			return this;
		},
		matches: function(selector) {
			if (!this[0]) {
				return false;
			}
			if (!this.isString(selector)) {
				IncorrectArguments('.matches(stringSelector)');
			}
			return matchesSelector.call(this[0], selector);
		},
		children: function() {
			if (!this.length) {
				return Gabriel();
			}
			return Gabriel(this[0] && this.toArray(this[0].children));
		},
		closest: function(selector) {
			var target = this[0],
				self = target,
				empty = Gabriel();
			if (target) {
				if (this.isString(selector)) {
					while (target) {
						if (matchesSelector.call(target, selector) && target != self) {
							return Gabriel(target);
						} else {
							target = target.parentElement;
							if (target === null) {
								return empty;
							}
						}
					}
				}
				if (this.isNumber(selector)) {
					return this.parent(selector);
				}
			} else {
				return empty;
			}
		},
		find: function(selector) {
			if (this.isString(selector)) {
				var result = [];
				this.each(function(e) {
					if (e === window) {
						return;
					}
					result = result.concat(this.toArray(e.querySelectorAll(selector)));
				}, this);
				for (var i = 0; i < result.length; i++) {
					for (var j = (1 + i); j < result.length; j++) {
						if (result[i] === result[j]) {
							result.splice(j, 1);
							j--;
						}
					}
				}
				return Gabriel(result);
			}
			IncorrectArguments('.find(stringSelector)');
		},
		attr: function(attr, value) {
			var target = this[0],
				attrs,
				i = 0,
				map = {};
			if (target) {
				if (!arguments.length) {
					attrs = Array.prototype.slice.call(this[0].attributes);
					for (; i < attrs.length; ++i) {
						map[attrs[i].name] = attrs[i].value;
					}
					return map;
				}
				if (value === undefined) {
					return target.getAttribute(attr) || null;
				}
				if (value === null) {
					return this.each(function(e) {
						e.removeAttribute(attr);
					});
				}
				return this.each(function(e) {
					e.setAttribute(attr, value);
				});
			}
		}
	});
	Gabriel.forEach([['addClass', 'add'], ['removeClass', 'remove'], ['toggleClass', 'toggle']], function(q, z) {
		z = q[1];
		q = q[0];
		$[q] = function(className) {
			if (className === undefined) {
				IncorrectArguments('.' + q + '(className|array[classNames{1, }])');
			}
			var i;
			if (this.isArray(className)) {
				return this.each(function(e) {
					for (i = 0; i < className.length; i++) {
						e.classList[z](className[i]);
					}
				});
			}
			return this.each(function(e) {
				e.classList[z](className);
			});
		};
	});
	$.hasClass = function(className) {
		if (!this.isNumber(className) && !this.isString(className)) {
			IncorrectArguments('.hasClass(className)');
		}
		return this[0] ? (this[0]).classList.contains(className) : false;
	};
	Gabriel.forEach([['text', 'textContent'], ['html', 'innerHTML']], function(r, i) {
		i = r[1];
		r = r[0];
		$[r] = function(content) {
			return content !== undefined ? this.each(function(e) {
				e[i] = content;
			}) : this[0] && this[0][i] || null;
		};
	});
	Gabriel.extend(null, $, {
		prop: function(prop, value) {
			if (prop !== undefined && this[0]) {
				return value !== undefined ? this.each(function(e) {
					e[prop] = value;
				}) : !this[0] ? this : this.isFunction(this[0][prop]) ? this[0][prop].bind(this[0]) : this[0][prop];
			}
			IncorrectArguments('.prop(nodeProperty, newNodeValue*)');
		},
		style: function(prop, value) {
			var target = this[0],
				fn;
			if (prop !== undefined && target) {
				if (this.isCommonObject(prop)) {
					fn = function(e) {
						for (var key in prop) {
							e.style[key] = prop[key];
						}
					};
					value = null;
				} else {
					fn = function(e) {
						e.style[prop] = value;
					};
				}
				return value !== undefined ? this.each(fn) : getComputedStyle(target)[prop];
			}
			IncorrectArguments('.style(get: nodeProperty, set: NewPropertyValue*)');
		},
		value: function(val) {
			return val === undefined ? this.prop('value') : this.prop('value', val);
		},
		match: function(expr, txt) {
			var target = this[0],
				content = txt && this.isBoolean(txt) ? Gabriel(target).text() : Gabriel(target).html();
			if (!target) {
				return false;
			}
			if (!expr) {
				IncorrectArguments('.match(regexp|number|string, textOnly*)');
			}
			if (target && expr) {
				return this.isRegExp(expr) ? expr.test(content) : this.isString(expr) || this.isNumber(expr) ? new RegExp(expr, 'g').test(content) : false;
			}
		}
	});
	$.among = function(selector) {
		var matches = [];
		return this.each(function(e) {
			Gabriel(e).matches(selector) ? matches.push(e) : undefined;
		}), Gabriel(matches);
	};
	$.load = function(url, params, selector, callback) {
		var outerHTML = false,
			html;
		url = url || window.location.pathname;
		if (this.isString(params)) {
			callback = selector;
			selector = params;
			params = undefined;
		}
		callback = callback || function() {};
		if (/:outer/g.test(selector)) {
			outerHTML = true;
			selector = selector.replace(/:outer$/g, '');
		}
		this.fetch(url, {
			params: params,
			accept: ['text/html']
		}).complete((function(data) {
			var target = this.parseHTML(data).find(selector).equal(0);
			if (outerHTML) {
				html = (target.length && target.prop('outerHTML')) || null;
			} else {
				html = (target.length && target.html()) || null;
			}
			this.each(function(e) {
				Gabriel(e).html(html);
				callback.call(e);
			});
		}).bind(this));
		return this;
	};
	$.quick = function(fn) {
		return (this.isFunction(fn) && fn.call(this, Gabriel)), this;
	};
	var keygen = Gabriel.keygen = function() {
		return +(Math.random() + '').slice(2);
	};
	Gabriel.ikeys = Gabriel.createPrototype({
		add: function(target) {
			return this.isObject(target) ? (target[g] = {}) : undefined;
		},
		has: function(target) {
			return this.isObject(target) && g in target;
		},
		get: function(target) {
			return this.isObject(target) && g in target ? target[g] : null;
		},
		remove: function(target) {
			return this.has(target) ? ((delete target[g]), true) : false;
		}
	}, Gabriel.prototype);
	Gabriel.extend(null, (Gabriel.modules = {}), {
		Event: Gabriel.createPrototype({
			add: function(target, type, handler) {
				var ev,
					handlers,
					qdata,
					queue,
					i = 0;
				if (this.isCommonObject(type)) {
					for (ev in type) {
						this.add(target, ev, type[ev]);
					}
					return;
				}
				handler = this.isArray(handler) ? handler.filter(function(e) {
					return Gabriel.isFunction(e);
				}) : handler;
				if (this.isString(type) && (this.isFunction(handler) || this.isArray(handler) && !this.isEmptyArray(handler))) {
					qdata = !this.ikeys.has(target) ? this.ikeys.add(target) : this.ikeys.get(target);
					handlers = !('handlers' in qdata) ? (qdata.handlers = {}) : qdata.handlers;
					queue = this.isArray(handler) ? handler : [handler];
					if (type in handlers) {
						handlers[type] = handlers[type].concat(queue);
					} else {
						handlers[type] = queue;
					}
					for (; i < queue.length; ++i) {
						target.addEventListener(type, queue[i]);
					}
				}
			},
			clear: function(target) {
				die(target[g], 'handlers');
				die(target, g);
				return true;
			},
			remove: function(target, type, handler) {
				var qdata = this.ikeys.get(target),
					ev,
					i,
					handlers;
				if (Gabriel.isCommonObject(qdata)) {
					handlers = qdata.handlers;
					if (!type) {
						for (ev in handlers) {
							for (i = 0; i < handlers[ev].length; i++) {
								target.removeEventListener(ev, handlers[ev][i]);
							}
							delete handlers[ev];
						}
						this.clear(target);
					}
					if (this.isString(type) && type in handlers) {
						if (this.isNumber(handler) && ((handler = +handler), (handler >= 0 && handler in handlers[type])) || handler < 0 && (handler = handler + handlers[type].length) in handlers[type]) {
							target.removeEventListener(type, handlers[type][handler]);
							handlers[type].splice(handler, 1);
						} else if (Gabriel.isFunction(handler) && Gabriel.inArray(handlers[type], handler)) {
							i = handlers[type].indexOf(handler);
							target.removeEventListener(type, handlers[type][i]);
							handlers[type].splice(i, 1);
						} else {
							for (i = 0; i < handlers[type].length; i++) {
								target.removeEventListener(type, handlers[type][i]);
								handlers[type].splice(i, 1);
							}
						}
						if (!handlers[type].length) {
							delete handlers[type];
							this.clear(target);
						}
					}
				}
			}
		}, Gabriel.prototype),
		Data: Gabriel.createPrototype({
			clear: function(target) {
				die(target[g], 'data');
				die(target, g);
			},
			get: function(target, prop) {
				if (this.ikeys.has(target) && 'data' in target[g]) {
					return prop ? target[g].data[prop] : target[g].data;
				}
			},
			add: function(target, prop, value) {
				var qdata = this.ikeys.has(target) ? this.ikeys.get(target) : this.ikeys.add(target),
					data;
				if (qdata !== null) {
					data = 'data' in qdata ? qdata.data : (qdata.data = {});
					data[prop] = value;
				}
			},
			remove: function(target, prop) {
				var qdata = this.ikeys.get(target);
				if (qdata !== null && 'data' in qdata) {
					if (prop) {
						delete qdata.data[prop];
					} else {
						delete qdata.data;
					}
					this.clear(target);
				}
			},
			rewrite: function(target) {}
		}, Gabriel.prototype)
	});
	Gabriel.forEach([['off', 'remove'], ['on', 'add']], function(l, s) {
		s = l[0];
		l = l[1];
		$[s] = function(type, fn) {
			return this.each(function(elem) {
				Gabriel.modules.Event[l](elem, type, fn);
			});
		};
	});
	Gabriel.extend(null, $, {
		once: function(type, fn) {
			if (this.isArray(fn)) {
				for (var i = 0; i < fn.length; i++) {
					this.once(type, fn[i]);
				}
				return this;
			}
			if (!this.isFunction(fn)) {
				IncorrectArguments('.once(eventType, function)');
			}
			return this.each(function(elem) {
				Gabriel.modules.Event.add(elem, type, function h() {
					fn.apply(this, arguments);
					Gabriel.modules.Event.remove(elem, type, h);
				});
			});
		},
		toggle: function(type) {
			var queue = this.isArray(arguments[1]) && arguments[1] || this.toArray(arguments).filter((function(e) {
					return this.isFunction(e);
				}).bind(this)),
				f = 0,
				h = function() {
					return function h() {
						queue[f].apply(this, arguments);
						f++;
						f = (f > queue.length - 1) ? 0 : f;
					};
				};
			return queue.length > 1 ? this.each(function(elem) {
				Gabriel.modules.Event.add(elem, type, h());
			}) : this.on(type, queue);
		},
		data: function(prop, value) {
			var target;
			if (prop === null) {
				return this.each(function(e) {
					this.modules.Data.remove(e);
				}, this);
			}
			if ((target = this[0]) && value === undefined) {
				return this.modules.Data.get(target, prop);
			}
			if (this.isString(prop) || this.isNumber(prop)) {
				return value === null ? this.each(function(e) {
					this.modules.Data.remove(e, prop);
				}, this) : this.each(function(e) {
					this.modules.Data.add(e, prop, value);
				}, this);
			}
		}
	});
	Gabriel.forEach(['keydown', 'keypress', 'keyup', 'mouseenter', 'mouseover', 'mousemove', 'mousedown', 'mouseup', 'click', 'dblclick', 'contextmenu', 'wheel', 'mouseleave', 'mouseout', 'select', 'resize', 'scroll'], function(b) {
		$[b] = function(fn) {
			return this.on(b, fn);
		};
	});
	Gabriel.forEach(['focus', 'blur'], function(z) {
		$[z] = function() {
			var t = this[0];
			return t && t[z]() || this;
		};
	});
	Gabriel.forEach([['append', 'beforeend'], ['prepend', 'afterbegin'], ['after', 'afterend'], ['before', 'beforebegin']], function(x, m) {
		m = x[0];
		x = x[1];
		$[m] = function(html) {
			return this.each(function(e) {
				e.insertAdjacentHTML(x, html);
			});
		};
	});
	var ins = {
		appendChild: function(parent, child) {
			parent.appendChild(child);
		},
		prependChild: function(parent, child) {
			parent.insertBefore(child, parent.firstChild || null);
		},
		insertAfter: function(parent, child) {
			if (parent.parentElement) {
				parent.parentElement.insertBefore(child, parent.nextElementSibling || null);
			}
		},
		insertBefore: function(parent, child) {
			if (parent.parentElement) {
				parent.parentElement.insertBefore(child, parent);
			}
		}
	};
	Gabriel.forEach(['appendChild', 'prependChild', 'insertAfter', 'insertBefore'], function(s) {
		$[s] = function(child, live) {
			return this.each(function(e, i) {
				ins[s](e, child);
				child = child.cloneNode(true);
			}, this);
		};
	});
	Gabriel.forEach(['appendTo', 'prependTo'], function(d) {
		$[d] = function(selector) {
			var t = this[0];
			return t && Gabriel(selector)[d.slice(0, -2) + 'Child'](t) || this;
		};
	});
	Gabriel.forEach(['height', 'width'], function(j) {
		$[j] = function() {
			var target = this[0];
			if (target) {
				j = j[0].toUpperCase() + j.slice(1);
				if (target === window) {
					return document.documentElement['client' + j];
				}
				if (target === document) {
					return document.documentElement['offset' + j];
				}
				return target['offset' + j];
			}
		};
	});
	$.isHidden = function() {
		var target = this[0];
		if (!target) {
			return false;
		}
		if (!target.offsetHeight && !target.offsetWidth) {
			return true;
		}
		return false;
	};
	$.offset = function() {
		var target = this[0],
			rect,
			pageYOffset = window.pageYOffset,
			pageXOffset = window.pageXOffset,
			_default = {
				top: null,
				left: null
			};
		if (!target) {
			return this;
		}
		if (this.isHidden()) {
			return _default;
		}
		if (target !== window || target !== document) {
			rect = target.getBoundingClientRect();
			return {
				top: pageYOffset + rect.top,
				left: pageXOffset + rect.left,
				width: rect.width
			};
		}
		return _default;
	};
	(function(Gabriel) {
		var animations = {
			fadeOut: function(target, duration) {
				target = Gabriel(target);
				if (target.style('display') !== 'none') {
					target.style('animation', 'fadeOut ' + (duration / 1000) + 's linear 0s forwards');
					window.setTimeout(function() {
						target.style({
							display: 'none',
							animation: null
						});
					}, duration);
				}
			},
			fadeIn: function(target, duration, display) {
				target = Gabriel(target);
				if (target.style('display') === 'none') {
					target.style({
						animation: 'fadeIn ' + (duration / 1000) + 's linear 0s',
						display: Gabriel.isString(display) ? display : 'block'
					});
					window.setTimeout(function() {
						target.style('animation', null);
					}, duration);
				}
			}
		};

		function find(target) {
			for (var i = 0; i < this.current.length; i++) {
				if (this.current[i].target === target) {
					return this.current[i];
				}
			}
			return false;
		}
		var Sequence = Gabriel.Sequence = Gabriel.createPrototype(function() {
				var queue = Gabriel.toArray(arguments).filter(function(e, i) {
						return !(i % 2) && Gabriel.isFunction(e);
					}),
					delays = Gabriel.toArray(arguments).filter(function(e, i) {
						return !!(i % 2) && Gabriel.isNumber(e);
					}),
					init = {},
					length;
				if (queue.length === delays.length && ![queue.length, delays.length].some(function(e) {
						return e === 0;
					})) {
					length = queue.length;
					for (var i = 0; i < length; i++) {
						init[i] = {
							delay: delays[i],
							fn: queue[i]
						};
					}
				}
				init.length = length || 0;
				this.init = init;
			}, {
				add: function(fn, delay) {
					if (Gabriel.isFunction(fn) && Gabriel.isNumber(delay)) {
						this.init[this.init.length++] = {
							delay: delay,
							fn: fn
						};
					}
					return this;
				},
				remove: function(i) {
					if (i in this.init) {
						Array.prototype.splice.call(this.init, i, 1);
					}
					return this;
				},
				fncomplete: function(fn) {
					if (Gabriel.isFunction(fn)) {
						this.fncomplete = fn;
					}
					return this;
				},
				success: function(fn) {
					if (Gabriel.isFunction(fn)) {
						this.success = fn;
					}
					return this;
				},
				start: function() {
					var i = 0;

					function Q(sequence) {
						if (sequence[i]) {
							window.setTimeout((function() {
								sequence[i].fn();
								Array.prototype.splice.call(sequence, i, 1);
								this.fncomplete();
								Q.call(this, sequence);
							}).bind(this), sequence[i].delay);
						} else {
							this.success();
						}
					}
					Q.call(this, this.init);
					return this;
				}
			}),
			AnimateProto = {},
			Animate = Gabriel.Animate = Gabriel.createPrototype({
				current: [],
			}, AnimateProto);
		Gabriel.forEach(['fadeIn', 'fadeOut'], function(n) {
			AnimateProto[n] = function(target, duration, a3, a4, a5, a6, a7) {
				duration = Gabriel.isNumber(duration) ? duration : 500;
				var sequence;
				if ((sequence = find.call(this, target))) {
					sequence.add(animations[n].bind(animations, target, duration, a3, a4, a5, a6, a7), duration);
					return;
				}
				this.current.push(sequence = new Gabriel.Sequence(animations[n].bind(animations, target, duration, a3, a4, a5, a6, a7), 0));
				sequence.target = target;
				sequence.success((function() {
					this.current.splice(this.current.indexOf(target), 1);
				}).bind(this));
				sequence.start();
			};
		});
		Gabriel.forEach(['fadeIn', 'fadeOut'], function(d) {
			$[d] = function() {
				var args = this.toArray(arguments);
				return this.each(function(e) {
					this.Animate[d].apply(this.Animate, [e].concat(args));
				}, this);
			};
		});
	})(Gabriel);
	(function(Gabriel) {
		var CSS;
		Gabriel.addCSSRule = function(cssCode) {
			if (!cssCode || !this.isString(cssCode)) {
				IncorrectArguments('.addCSSRule(cssRuleString)');
			}
			var ret = [],
				i;
			cssCode = cssCode.replace(/(\t|\n|\s*\/.+?\/\s*)/g, '').match(/[\w\d\-\_\.\[\]\s\#\"\=\,\>\~\+\(\)\:\*]+(\{.+?\})/g);
			if (!CSS) {
				CSS = (function(styleSheets, stylenode) {
					Gabriel(stylenode).appendTo('head');
					for (i = 0; i < styleSheets.length; i++) {
						if (styleSheets[i].ownerNode == stylenode) {
							return styleSheets[i];
						}
					}
				}).call(this, document.styleSheets, document.createElement('style'));
			}
			if (cssCode.length >= 1) {
				for (i = 0; i < cssCode.length; i++) {
					cssCode[i] = trim(cssCode[i]);
				}
			}
			if (cssCode.length == 1) {
				return CSS.insertRule(cssCode[0], CSS.cssRules.length);
			} else {
				for (i = 0; i < cssCode.length; i++) {
					ret.push(CSS.insertRule(cssCode[i], CSS.cssRules.length));
				}
				return ret;
			}
		};
		Gabriel.removeCSSRule = function(index) {
			var deletedRules = [];
			if (CSS) {
				if (this.isArray(index) && index.every(function(e) {
						return this.isNumber(e);
					})) {
					for (var i = 0; i < index.length; i++) {
						deletedRules.push(CSS.cssRules[index[i] - (i ? 1 : 0)].cssText);
						CSS.deleteRule(index[i] - (i ? 1 : 0));
					}
				} else if (this.isNumber(index)) {
					deletedRules.push(CSS.cssRules[index].cssText);
					CSS.deleteRule(index);
				}
			}
			return deletedRules;
		};

		function parseCSSRules(props) {
			var t = {},
				temp;
			for (var i = 0; i < props.length; i++) {
				if (!props[i]) {
					continue;
				}
				temp = props[i].split(':');
				t[trim(temp[0])] = trim(temp[1]);
			}
			return t;
		}
		Gabriel.getCSSRules = function(index) {
			var rules = {
				length: 0
			};
			if (CSS) {
				for (var i = 0; i < CSS.cssRules.length; i++) {
					rules[i] = {
						selector: CSS.cssRules[i].selectorText,
						properties: parseCSSRules(trim(CSS.cssRules[i].cssText.replace(/(\t|\n|\s*\/.+?\/\s*)/g, '').match(/(\{.+?\})/g).join('').replace(/\{|\}/g, '')).split(';'))
					};
					rules.length++;
				}
			}
			return this.isNumber(index) && index in rules ? rules[index] : rules;
		};
	})(Gabriel);
	Gabriel.createPrototype(Core, Gabriel.createPrototype(Gabriel.extend(null, {
		length: 0
	}, $), Gabriel.extend(null, Gabriel.prototype, Core, Gabriel)));
	(function(Gabriel) {
		document.addEventListener('DOMContentLoaded', function f() {
			for (var i = 0; i < callbacks.length; i++) {
				callbacks[i](Gabriel, window, document, Object, Math, Date, RegExp, Array, JSON);
			}
			this.removeEventListener('DOMContentLoaded', f);
		});
	})(Gabriel);
	window.Gabriel = Gabriel;
})(window, []);