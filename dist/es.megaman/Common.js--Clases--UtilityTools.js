/* <pre> */
/**
* @class UtilityTools
* @description A static class with useful JS functions!
* Modified version of YAHOO.Tools by Dav Glass <http://github.com/davglass/yui-tools/> under BSD License
* Includes a modified version of getElementsByClassName by Robert Nyman <http://www.robertnyman.com/2008/05/27/the-ultimate-getelementsbyclassname-anno-2008/> under MIT License
* All you guys rock!
* Compiled and tweaked by Ciencia_Al_Poder
*/
(function() {

	/**
	* @private
	* @property regExs
	* @description All regexes at the top level object to cache them.
	*/
	var regExs = {
			startspace: /^\s+/,
			endspace: /\s+$/
		};

	var _getElementsByClassName = null;

	UtilityTools = {
		/**
		* @method trim
		*/
		trim: function(str) {
			return str.toString().replace(regExs.startspace, '').replace(regExs.endspace, '');
		},
		/**
		* @method get
		* @description Returns an HTMLElement reference.
		* @param {HTMLElement/String} elm A reference or ID to the Element
		*/
		get: function(elm) {
			if ((elm && elm.nodeType) || elm === window) {
				return elm;
			}
			if (typeof elm == 'string') {
				return document.getElementById(elm);
			}
		},
		/**
		* Developed by Robert Nyman, http://www.robertnyman.com
		* Code/licensing: http://code.google.com/p/getelementsbyclassname/  under a MIT license
		* @param {String} className One or several class names, separated by space. Multiple class names demands that each match have all of the classes specified
		* @param {String} tag Specifies the tag name of the elements to match, "*" for all elements.
		* @param {HTMLElement}/{String} elm Reference to a DOM element/ID to look amongst its children for matches. Recommended for better performance in larger documents
		* @type Array
		*/
		getElementsByClassName: function (className, tag, elm){
			var _el = UtilityTools.get(elm);
			if (_getElementsByClassName) {
				return _getElementsByClassName(className, tag, _el);
			}
			if (document.getElementsByClassName) {
				_getElementsByClassName = function (className, tag, elm) {
					elm = elm || document;
					var elements = elm.getElementsByClassName(className),
						nodeName = (tag && tag!=='*')? tag.toLowerCase() : null,
						returnElements = [],
						current;
					for(var i=0, il=elements.length; i<il; i++){
						current = elements[i];
						if(!nodeName || nodeName === current.nodeName.toLowerCase()) {
							returnElements[returnElements.length] = current;
						}
					}
					return returnElements;
				};
			} else if (document.evaluate) {
				_getElementsByClassName = function (className, tag, elm) {
					tag = (tag || '*');
					elm = (elm || document);
					var classes = className.split(' '),
						classesToCheck = '',
						xhtmlNamespace = 'http://www.w3.org/1999/xhtml',
						namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
						returnElements = [],
						elements,
						node;
					for(var j=0, jl=classes.length; j<jl; j++){
						classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
					}
					try {
						elements = document.evaluate('.//' + tag + classesToCheck, elm, namespaceResolver, 0, null);
					}
					catch (e) {
						elements = document.evaluate('.//' + tag + classesToCheck, elm, null, 0, null);
					}
					while ((node = elements.iterateNext())) {
						returnElements[returnElements.length] = node;
					}
					return returnElements;
				};
			} else {
				_getElementsByClassName = function (className, tag, elm) {
					tag = (tag || '*');
					elm = elm || document;
					var classes = className.split(' '),
						elements = (tag === '*' && elm.all)? elm.all : elm.getElementsByTagName(tag),
						current,
						returnElements = [],
						match,
						currentclassname;
					for(var l=0, ll=elements.length; l<ll; l++){
						current = elements[l];
						match = false;
						currentclassname = (' ' + current.className + ' ');
						for(var m=0, ml=classes.length; m<ml; m++){
							match = (currentclassname.indexOf(' ' + classes[m] + ' ') != -1);
							if (!match) {
								break;
							}
						}
						if (match) {
							returnElements[returnElements.length] = current;
						}
					}
					return returnElements;
				};
			}
			return UtilityTools.getElementsByClassName(className, tag, elm);
		},
		/**
		* @method makeChildren
		* @description Takes an Array of DOM objects and appends them as a child to the main Element
		* @param {Array} arr Array of elements to append to elm.
		* @param {HTMLElement/String} elm A reference or ID to the main Element that the children will be appended to
		*/
		makeChildren: function(arr, elm) {
			elm = UtilityTools.get(elm);
			for (var i = 0; i < arr.length; i++) {
				var _val = arr[i];
				if (typeof _val == 'string') {
					_val = document.createTextNode(_val);
				}
				elm.appendChild(_val);
			}
		},
		/**
		* @method insertAfter
		* @description Inserts an HTML Element after another in the DOM Tree.
		* @param {HTMLElement} elm The element to insert
		* @param {HTMLElement} curNode The element to insert it before
		*/
		insertAfter: function(elm, curNode) {
			if (curNode.nextSibling) {
				curNode.parentNode.insertBefore(elm, curNode.nextSibling);
			} else {
				curNode.parentNode.appendChild(elm);
			}
		},
		/**
		* @method create
		* @description Usage:
		* div = UtilityTools.create('div', 'Single DIV. This is some test text.', {
		*			className:'test1'
		*		}
		* );
		* @param {String} tagName Tag name to create
		* @param {Object} attrs Element attributes in object notation
		* @param {Array} children Array of children to append to the created element
		* @param {String} txt Text string to insert into the created element
		* @returns A reference to the newly created element
		* @type HTMLReference
		*/
		create: function(tagName) {
			tagName = tagName.toLowerCase();
			var elm = document.createElement(tagName),
				txt = false,
				attrsObj = false;

			if (!elm) { return false; }

			for (var i = 1; i < arguments.length; i++) {
				txt = arguments[i];
				if (typeof txt == 'string') {
					UtilityTools.makeChildren([txt], elm);
				} else if (txt instanceof Array) {
					UtilityTools.makeChildren(txt, elm);
				} else if (typeof txt == 'object') {
					UtilityTools.setAttr(txt, elm);
				}
			}
			return elm;
		},
		/**
		* @method removeElement
		* @description Remove the element from the document.
		* @param {HTMLElement/Array/String} el Single element, array of elements or id string to remove from the document
		*/
		removeElement: function(el) {
			 if (!(el instanceof Array)) {
				 el = [UtilityTools.get(el)];
			 }
			 for (var i = 0; i < el.length; i++) {
				 if (el[i].parentNode) {
					 el[i].parentNode.removeChild(el[i]);
				 }
			 }
		},
		/**
		* @method setAttr
		* @description Set Mass Attributes on an Element
		* @param {Object} attrObj Object containing the attributes to set.
		* @param {HTMLElement/String} elm The element you want to apply the attribute to
		*/
		setAttr: function(attrsObj, elm) {
			if (typeof elm == 'string') {
				elm = UtilityTools.get(elm);
			}
			for (var i in attrsObj) {
				switch (i.toLowerCase()) {
					case 'classname':
					case 'class':
						elm.className = attrsObj[i];
						break;
					case 'listener':
						UtilityTools.addHandler(elm, attrsObj[i][0], attrsObj[i][1]);
						break;
					case 'style':
						if (typeof attrsObj[i] === 'object') {
							for (var attr in attrsObj[i]) {
								elm.style[attr] = attrsObj[i][attr];
							}
						}
						break;
					default:
						elm.setAttribute(i, attrsObj[i]);
						break;
				}
			}
		},
		/**
		* @method hasClass
		* @description Test if a element has a specified CSS class
		* @param {HTMLElement}/{String} elm DOM element/ID to test
		* @param {String} classname CSS class
		* @type Bool
		*/
		hasClass: function(elm, classname) {
			elm = UtilityTools.get(elm);
			var _elcn = (' '+elm.className+' ');
			classname = (' '+classname+' ');
			if (_elcn.indexOf(classname) != -1) {
				return true;
			}
			return false;
		},
		/**
		* @method getInnerText
		* @description Return the text representation of the specified element and its children. When an image is found, return its alt attribute
		* @param {HTMLElement} el DOM element
		* @type String
		*/
		getInnerText: function(el){
			if (typeof el === 'string') return el;
			if (typeof el === 'undefined') return '';
			if (el.nodeType !== 1 || (el.nodeType === 1 && el.getElementsByTagName('img').lenght == 0)) {
				return (el.textContent || el.innerText || '');
			}
			var str = '',
				cs = el.childNodes;
			for (var i = 0; i < cs.length; i++) {
				switch (cs[i].nodeType) {
					case 1: //ELEMENT_NODE
						if (cs[i].tagName.toLowerCase() == 'img')
							str += cs[i].alt;
						else
							str += UtilityTools.getInnerText(cs[i]);
						break;
					case 3: //TEXT_NODE
						str += cs[i].nodeValue;
						break;
				}
			}
			return str;
		},
		/**
		* @method addHandler
		* @description Add an event handler to an element. From MediaWiki wikibits.js
		* @param {HTMLElement}/{String} element Element to add handler to
		* @param {String} type Event to attach to
		* @param {Function} handler Event handler callback
		*/
		addHandler: function( element, type, handler ) {
			element = UtilityTools.get(element);
			if (!element) {
				return;
			}
			if ( window.addEventListener ) {
				element.addEventListener( type, handler, false );
			} else if ( window.attachEvent ) {
				element.attachEvent( 'on' + type, handler );
			}
		},
		/**
		* @method removeHandler
		* @description Removes an event handler from an element. From MediaWiki wikibits.js
		* @param {HTMLElement}/{String} element Element to remove handler from
		* @param {String} type Event to attach to
		* @param {Function} handler Event handler callback
		*/
		removeHandler: function( element, type, handler ) {
			element = UtilityTools.get(element);
			if (!element) {
				return;
			}
			if( window.removeEventListener ) {
				element.removeEventListener( type, handler, false );
			} else if( window.detachEvent ) {
				element.detachEvent( 'on' + type, handler );
			}
		},
		/**
		* @method getTarget
		* @description Gets the target element of an event. For IE compatibility
		* @param {DOMEvent} e The event (first parameter in an event handler)
		* @type Object
		*/
		getTarget: function(e){
			var target = null;
			if (e.target) {
				target = e.target;
			} else if (e.srcElement) { //IE
				target = e.srcElement;
			}
			// Get the parent element if we hit a text node
			if (target !== null && target.nodeType == 3) {
				target = target.parentNode;
			}
			return target;
		},
		/**
		* @method getQueryString
		* @description Parses a Query String, if one is not provided, it will look in location.href
		* @param {String} str The string to parse as a query string
		* @return An object of the parts of the parsed query string
		* @type Object
		*/
		getQueryString: function(str) {
			var qstr = {}, arr = null;
			if (!str) {
				str = location.href;
			}
			arr = location.href.split('?');
			if (arr.length != 2) {
				str = '';
			}
			if (str.indexOf('#') != -1) {
				str = str.split('#')[0];
			}
			str = str.split('&');
			for (var i = 0; i < str.length; i++) {
				var part = str[i].split('=');
				if (part.length != 2) {
					part[1] = '';
				}
				qstr[part[0]] = part[1];
			}
			return qstr;
		},
		/**
		* @method getQueryStringVar
		* @description Parses a Query String Var
		* @param {String} str The var to get from the query string
		* @param {String} qstr The optional query string to parse, will use location.href as default
		* @return The value of the var in the querystring.
		* @type String/Array
		*/
		getQueryStringVar: function(str, qstr) {
			var qs = UtilityTools.getQueryString(qstr);
			if (qs[str]) {
				return qs[str];
			} else {
				return false;
			}
		},
		/**
		* @method cookie
		* @description Get/set/delete a cookie.
		* @param {String} name The name of the cookie
		* @param {String} value The value of the cookie to set, null to delete
		* @param {String} expires A valid Javascript Date object
		* @param {String} path The path of the cookie (Deaults to /)
		* @param {String} domain The domain to attach the cookie to
		* @param {Boolean} secure Boolean True or False
		*/
		cookie: function(name, value, expires, path, domain, secure) {
			 var argv = arguments,
				argc = arguments.length,
				dc = document.cookie,
				settings = '';
			if (argc == 1) {
				var arr = dc.split(';');
				for (var i = 0; i < arr.length; i++) {
					var _val = UtilityTools.trim(arr[i]);
					if (_val.indexOf(name + '=') == 0) {
						return decodeURIComponent(_val.split('=')[1]);
					}
				}
				return null;
			}
			expires = (argc > 2) ? argv[2] : null;
			path = (argc > 3) ? argv[3] : '/';
			domain = (argc > 4) ? argv[4] : null;
			secure = (argc > 5) ? argv[5] : false;
			if (argc >= 2 && value === null) { // delete the cookie
				expires = new Date(0);
				value = '';
			}
			if (expires !== null) {
				settings += ("; expires=" + expires.toGMTString());
			}
			if (path !== null) {
				settings += ("; path=" + path);
			}
			if (domain !== null) {
				settings += ("; domain=" + domain);
			}
			if (secure === true) {
				settings += "; secure";
			}
			document.cookie = name + "=" + encodeURIComponent(value) + settings;
		}
	};
})();
/* </pre> */