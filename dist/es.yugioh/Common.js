/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

$(document).ready(function() {
    $(".decktable tr:nth-child(even)").addClass("even");
    $(".decktable tr:nth-child(odd)").addClass("odd");
});


/* Compatibilidad, al inicio del resto de carga de elementos. Necesario para que todas las utilidades que funcionan en Monobook y Monaco funcionen en oasis. Wikia: ¿Quién tuvo la estupenda idea de no respetar los ID's comunes del wiki? */
function oasisCompatElements() {
	$(document.body).append('<section id="positioned_elements"></section>');
	var fb = $('#WikiaArticle').children('#fb-root').eq(0);
	if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Listusers') return; // Wikia is too incompatible
	if (fb.exists()) {
		$('<div id="bodyContent"></div>').insertAfter(fb);
		if ($('#wikiPreview').exists()) {
			$('#wikiPreview').appendTo('#bodyContent');
		} else {
			var pf = $('#WikiaArticle').children('div.printfooter').eq(0);
			if (pf.exists()) {
				$('#bodyContent').nextAll().not(pf).not(pf.nextAll()).appendTo('#bodyContent');
			}
		}
	}
}

if (window.skin == 'oasis') {
	$(oasisCompatElements);
}

/* El código CSS de esta página proviene de WikiDex. Para los autores del mismo, ver el historial de [[w:c:es.pokemon:MediaWiki:Common.css]]. Favor de mantener este mensaje si copian el código a otro wiki. */

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

var $UT = UtilityTools;

//<pre>
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

(function(){
/*
 * Configurable variables.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
	return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input) {
	var output = Array(input.length >> 2);
	for(var i = 0; i < output.length; i++) {
		output[i] = 0;
	}
	for(var i = 0; i < input.length * 8; i += 8) {
		output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
	}
	return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input) {
	var output = "";
	for(var i = 0; i < input.length * 32; i += 8) {
		output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
	}
	return output;
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
	return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t) {
	return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
	return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
	return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
	return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len) {
	/* append padding */
	x[len >> 5] |= 0x80 << ((len) % 32);
	x[(((len + 64) >>> 9) << 4) + 14] = len;

	var a =  1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d =  271733878;

	for(var i = 0; i < x.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;

		a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
		d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
		c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
		b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
		a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
		d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
		c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
		b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
		a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
		d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
		c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
		b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
		a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
		d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
		c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
		b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

		a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
		d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
		c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
		b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
		a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
		d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
		c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
		b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
		a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
		d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
		c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
		b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
		a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
		d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
		c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
		b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

		a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
		d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
		c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
		b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
		a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
		d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
		c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
		b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
		a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
		d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
		c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
		b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
		a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
		d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
		c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
		b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

		a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
		d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
		c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
		b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
		a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
		d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
		c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
		b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
		a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
		d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
		c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
		b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
		a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
		d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
		c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
		b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
	}
	return Array(a, b, c, d);
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
	var output = "";
	var i = -1;
	var x, y;

	while(++i < input.length) {
		/* Decode utf-16 surrogate pairs */
		x = input.charCodeAt(i);
		y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
		if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
			x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
			i++;
		}

		/* Encode output as utf-8 */
		if(x <= 0x7F) {
			output += String.fromCharCode(x);
		} else if(x <= 0x7FF) {
			output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
			                              0x80 | ( x         & 0x3F));
		} else if(x <= 0xFFFF) {
			output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
			                              0x80 | ((x >>> 6 ) & 0x3F),
			                              0x80 | ( x         & 0x3F));
		} else if(x <= 0x1FFFFF) {
			output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
			                              0x80 | ((x >>> 12) & 0x3F),
			                              0x80 | ((x >>> 6 ) & 0x3F),
			                              0x80 | ( x         & 0x3F));
		}
	}
	return output;
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s) {
	return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
	try { hexcase } catch(e) { hexcase=0; }
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	var output = "";
	var x;
	for(var i = 0; i < input.length; i++) {
		x = input.charCodeAt(i);
		output += hex_tab.charAt((x >>> 4) & 0x0F)
			+ hex_tab.charAt( x & 0x0F);
	}
	return output;
}

/* @public
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
window.hex_md5 = function(s) { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }

}());


/*
* Image Switch v1.2: Muestra imágenes al pasar el mouse sobre un enlace que apunte a la imagen a mostrar
* REQUIERE: hex_md5
*
* Copyright (C) 2009  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 2 of the License, or
*   (at your option) any later version

La estructura que deben seguir los elementos es:
	.imageswitch_section
		.imageswitch_image [imageswitch_scale (mantiene la imagen dentro de las dimensiones, pero conservando la relación de aspecto) | imageswitch_preservewidth (mantiene el ancho) | imageswitch_preserveheight (mantiene el alto) ]
			img
		.imageswitch_links [imageswitch_episodio (especial para plantilla episodio) ]
			a[title^=Archivo:]+

También para episodios, si el contenido del enlace es un texto de 3 cifras y el elemento .imageswitch_links es también .imageswitch_episodio
No puede haber más de 1 elemento de profundidad en a, ni más de 5 de distancia entre .imageswitch_section e .imageswitch_links
*/
(function(){

var fileNS = 'Archivo:';

var k = 'imageswitch_',
	ks = k+'state_',
	kCur = k+'current';

ImageSwitcher = function(){
	this.init();
};

ImageSwitcher.prototype = {
	re: {ep: /\d{3}/},
	targetimgs: [],
	sizecache: {},
	init: function() {
		$UT.addHandler('bodyContent', 'mouseover', function(thisArg) {
			return function(e) {
				thisArg.eEnter(e);
			};
		}(this));
	},
	eEnter: function(e) {
		var url = null;
		var link = this.getParentEl($UT.getTarget(e), 'a', 1);
		if (link === null || $UT.hasClass(link, 'image')) return;
		var linkcheck = this.getParentClass(link, k+'links', 2);
		if (linkcheck === null) return;
		if ($UT.hasClass(linkcheck, k+'episodio')) {
			var EPCode = $UT.trim($UT.getInnerText(link));
			if (!this.re.ep.test(EPCode)) return;
			url = this.getWikiImage('EP'+EPCode+(parseInt(EPCode, 10) > window.wgEPLastGif ? '.png' : '.gif'));
		} else {
			if ($UT.hasClass(link, 'new') || link.title.toString().indexOf(fileNS) != 0) {
				return;
			}
			url = this.getWikiImage(link.title.replace(fileNS, ''));
		}
		var section = this.getParentClass(linkcheck, k+'section', 6);
		if (section === null) return;
		var ims = section;
		if (!$UT.hasClass(ims, k+'image')) {
			var imgsecs = $UT.getElementsByClassName(k+'image', '*', section);
			if (imgsecs.length == 0) return;
			ims = imgsecs[0];
		}
		var imgs = ims.getElementsByTagName('img');
		if (imgs.length == 0) return;
		var ima = imgs[0];
		if (decodeURI(ima.src) != url) {
			var index = this.setupTarget(ima, ims);
			this.setState('loading', index);
			plink = this.getParentEl(ima, 'a', 1);
			if (plink !== null) {
				plink.href = link.href;
			}
			if (!this.adaptSize(index, url)) {
				setTimeout(function(img, url) {
					return function() {
						img.src = url;
					};
				}(ima,url), 10);
			}
		}
		for (var i = 0, as = $UT.getElementsByClassName(kCur, 'a', linkcheck); i < as.length; i++) {
			as[i].className = $UT.trim((' '+as[i].className+' ').replace(' '+kCur+' ', ''));
		}
		link.className += ' '+kCur;
	},
	getParentEl: function(node, el, max) {
		max = max || 0;
		while (node != null && node.nodeType == 1 && max+1) {
			if (node.tagName.toLowerCase() == el.toLowerCase()) {
				return node;
			}
			node = node.parentNode;
			max--;
		}
		return null;
	},
	getParentClass: function(node, cn, max) {
		max = max || 0;
		while (node != null && node.nodeType == 1 && max+1) {
			if ($UT.hasClass(node, cn)) {
				return node;
			}
			node = node.parentNode;
			max--;
		}
		return null;
	},
	setupTarget: function(imgTarget, imgWrap) {
		for (var i = 0; i < this.targetimgs.length; i++) {
			if ((imgTarget.isSameNode && imgTarget.isSameNode(this.targetimgs[i].node)) || imgTarget === this.targetimgs[i].node) { // DOM || IE
				return i;
			}
		}
		var s = [imgTarget.width,imgTarget.height];
		for (var i = 0, p = ['width', 'height']; i < 2; i++) {
			if (!$UT.hasClass(imgWrap, k+'preserve'+p[i])) {
				imgTarget.removeAttribute(p[i]);
			}
		}
		var preserve = $UT.hasClass(imgWrap, k+'scale');
		var index = this.targetimgs.length;
		this.targetimgs[index] = {
			node:imgTarget,
			state:null,
			wrapper:imgWrap,
			preserve:preserve,
			size:s,
			original:imgTarget.src
		};
		if (preserve) {
			var cont = $UT.create('span', {'class':'imageswitch_imagecontainer'});
			var a = imgTarget.parentNode;
			if (a.tagName.toLowerCase() != 'a') {
				a = imgTarget;
			}
			a.parentNode.insertBefore(cont,a);
			cont.appendChild(a);
			cont.style.width = s[0]+'px';
			cont.style.height = s[1]+'px';
			var loader = new Image();
			$UT.addHandler(loader, 'load', function(thisArg, idx) {
				return function() {
					thisArg.sizeLoader(idx);
				};
			}(this, index));
			$UT.addHandler(loader, 'error', function(thisArg, idx) {
				return function() {
					thisArg.error(idx);
				};
			}(this, index));
			this.targetimgs[index].loader = loader;
		}
		$UT.addHandler(imgTarget, 'load', function(thisArg, idx) {
			return function() {
				thisArg.loaded(idx);
			};
		}(this, index));
		$UT.addHandler(imgTarget, 'error', function(thisArg, idx) {
			return function() {
				thisArg.error(idx);
			};
		}(this, index));
		return index;
	},
	loaded: function(index) {
		this.setState('loaded', index);
	},
	error: function(index) {
		this.setState('error', index);
		var ori = this.targetimgs[index].original;
		var img = this.targetimgs[index].node;
		if (img.src != ori) {
			img.src = ori;
		}
	},
	setState: function(state, index) {
		var node = this.targetimgs[index].wrapper;
		var oldState = this.targetimgs[index].state;
		if (oldState !== null) {
			node.className = $UT.trim((' '+node.className+' ').replace(' '+ks+oldState+' ', ' '+ks+state+' '));
		} else {
			node.className += ' '+ks+state;
		}
		this.targetimgs[index].state = state;
	},
	// Si el modo de imagen es mantener las dimensiones máximas, retorna true si este método se encarga de cambiar la imagen, o false si ya tenemos las dimensiones y se puede cambiar directamente.
	adaptSize: function(index, url) {
		if (!this.targetimgs[index].preserve) return false;
		if (typeof this.sizecache[url] == 'undefined') {
			this.targetimgs[index].loader.src = url;
			return true;
		}
		this.setSize(index, url);
		return false;
	},
	setSize: function(index, url) {
		var img = this.targetimgs[index].node;
		for (var i = 0, p = ['width', 'height']; i < 2; i++) {
			img.removeAttribute(p[i]);
		}
		var ms = this.targetimgs[index].size;
		var s = this.sizecache[url];
		if (s[0] / s[1] > ms[0] / ms[1]) { // La nueva es más horizontal
			img.width = ms[0];
			img.height = parseInt(s[1]*ms[0]/s[0]);
		} else {
			img.height = ms[1];
			img.width = parseInt(s[0]*ms[1]/s[1]);
		}
	},
	sizeLoader: function(index) {
		var loader = this.targetimgs[index].loader;
		var url = loader.src;
		this.sizecache[url] = [loader.width, loader.height];
		this.setSize(index, url);
		this.targetimgs[index].node.src = url;
	},
	getWikiImage: function(title) {
		title = title.replace(/ /g, '_');
		// para pruebas //return wgServer+wgArticlePath.replace('$1', 'Especial:RutaDeArchivo/'+title);
		var mdSrc = window.hex_md5(title);
		return 'https://images.wikia.nocookie.net/yugiohenespanol/es/images/'+mdSrc.substr(0,1)+'/'+mdSrc.substr(0,2)+'/'+title;
	},
};

}());

function ImageSwitcher_loader(){
	new ImageSwitcher();
}

$(ImageSwitcher_loader);
//</pre>
//<pre>
/************************************/
/* PlantillaPlegable: Principalmente para plantillas, aunque solo soporta tablas (no div)
 * Añade un botón para plegar/desplegar la plantilla, útil para plantillas que ocupan mucho.
 *
 * Copyright (C) 2008  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 *
 * Funcionamiento:
 *  Se ocultan todas las filas excepto la primera.
 *  El control se muestra en la primera fila y se sitúa en la última columna, como primer elemento (porque será float:right)
 *  Si se crea un span de clase "plegable-ctrl", se usará ese para ubicar el control
 *  Para que las plantillas que no tienen ancho fijo, se comprueba si ha cambiado el ancho de la tabla al plegar y, de seer así, fuerza el ancho anterior.
 *
 * parámetros:
 *  el: [HTMLTable] Tabla a plegar/desplegar
 *  iniPlegada: [bool] Opcional. Indica si debe plegarse automáticamente tras usarlo
 *
 * Código copiado de http://es.pokemon.wikia.com/wiki/MediaWiki:Common.js/Clases/PlantillaPlegable.js
 */
(function(){
 
// Frameworks y funciones externas
var $ = jQuery,
	$UT = UtilityTools;
//Constantes
var K_CTRL = 'plegable-ctrl',
	K_MOSTRAR = 'mostrar',
	K_OCULTAR = 'ocultar';
 
PlantillaPlegable = function(el, iniPlegada){
	// Elemento a convertir en plegable
	this.oElem = el;
	// Elemento con el control a plegar/desplegar
	this.oCtrl = null;
	// Estado
	this.bPlegada = false;
	// Estado inicial
	this.bInicialPlegada = (iniPlegada||false);
	// Indica si se ha ajustado el ancho al plegar
	this.bAjustado = false;
	this.init();
};
 
PlantillaPlegable.prototype = {
	version:'1.2',
	// Inicialización. Por ahora solo soporte para tablas
	init: function(){
		if (this.oElem.tagName.toLowerCase() != 'table' || !this.oElem.rows.length) return;
		var r0 = this.oElem.rows[0];
		// Miramos si ya existe
		for (var i = 0, ss = r0.getElementsByTagName('span'); i < ss.length; i++){
			if ($UT.hasClass(ss[i], K_CTRL)){
				ss[i].tabIndex = '0';
				this.oCtrl = ss[i];
				break;
			}
		}
		if (!this.oCtrl){
			var c = r0.cells[r0.cells.length-1];
			this.oCtrl = $UT.create('span', {'class':K_CTRL,tabindex:'0'});
			c.hasChildNodes() ? c.insertBefore(this.oCtrl, c.firstChild) : c.appendChild(this.oCtrl);
		}
		$UT.addHandler(this.oCtrl, 'click', function(thisArg) {
			return function() {
				thisArg.cambiarEstado(!thisArg.bPlegada);
			};
		}(this));
		$UT.addHandler(this.oCtrl, 'keyup', function(thisArg) {
			return function(e) {
				var key = e.keyCode || e.charCode || 0;
				if (key == 13) {
					thisArg.cambiarEstado(!thisArg.bPlegada);
				}
			};
		}(this));
		this.cambiarEstado(this.bInicialPlegada);
	},
	// Evento de cambio. plegar: [bool] indica si cambiar a estado plegado
	cambiarEstado: function(plegar){
		// Control
		this.oCtrl.innerHTML='';
		$UT.makeChildren([( plegar ? K_MOSTRAR : K_OCULTAR )], this.oCtrl);
		// Almacenamos dimensiones antes y después de aplicar visibilidad
		var jqElem = $(this.oElem);
		var oldWidth = jqElem.width();
		for (var i = 1, rs = this.oElem.rows; i < rs.length && plegar != this.bPlegada; i++){
			var jqRow = $(rs[i]);
			if (plegar){
				jqRow.hide();
			} else {
				jqRow.show();
			}
		}
		this.bPlegada = plegar;
		var newWidth = jqElem.width();
		// Si ha cambiado el ancho, forzamos el mismo que tenía, para evitar que se redimensione al plegar
		if (plegar && newWidth !== oldWidth && this.oElem.style.width === ''){
			this.bAjustado = true;
			jqElem.width(oldWidth);
		}
		if (this.bAjustado && !plegar)
			this.oElem.style.width = '';
	}
};
})();
//</pre>
//<pre>
 // This is a 3 set parts script
 // This script is from Wikipedia. For author attribution, please see
 // http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js
 
// 1st part will look for the class name
 /* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: [[Wikipedia:User:Mike Dillon]], [[Wikipedia:User:R. Koot]], [[Wikipedia:User:SG]]
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();
 
// 2nd part is the Scrip for Wikitables
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:Wikipedia:NavFrame]].
  *  Maintainers: [[Wikipedia:User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "ocultar";
 var expandCaption = "mostrar";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );
 
// 3er part is the Scrip for NavFram 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = ' [' + collapseCaption + ']';
  var NavigationBarShow = ' [' + expandCaption + ']';
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             for (
                  var NavChild = NavFrame.firstChild;
                  NavChild != null;
                  NavChild = NavChild.nextSibling
                 ) {
                 if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                     if (NavChild.style.display == 'none') {
                         NavToggleText = document.createTextNode(NavigationBarShow);
                         break;
                     }
                 }
             }
 
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
  }
 
  addOnloadHook( createNavigationBarToggleButton );
//</pre>


/* Buscador de cartas (desarrollado por [[Usuario:Rodri_cyberdog]] */
function crearSelectBuscador(sbNombre, sbItems){
	var Selector = document.createElement('select');
	Selector.name = sbNombre;
	Selector.size = 10;
	Selector.setAttribute('id', sbNombre);
	var SelItems = sbItems.split('<br>');
	for(j=0;j<SelItems.length;j++){
		Selector.add(new Option(SelItems[j],j));
		if(j==0)
		{	Selector.options[0].selected = true;	}
	}
	return Selector;
}

function realizarBusquedaCarta(){
	try
	{
		var getNewUrl = "http://es.yugioh.wikia.com/wiki/Wiki_Yu-Gi-Oh!_en_espa%C3%B1ol/Buscador_de_cartas/Resultado";
		
		tabla = document.getElementById( 'buscadorcarta1' );
		tablaColumns = tabla.rows[1].getElementsByTagName('td').length;
		//alert(tablaColumns);
		for(a=0;a<tablaColumns;a++){
			//alert(tabla.rows[0].cells[a].innerText);
			var atributo = document.getElementById( tabla.rows[0].cells[a].innerText );
			var atributoValor = atributo.options[atributo.selectedIndex].text;
			if(atributoValor == "--Cualquiera--")
			{	atributoValor = "";	}
			if(a==0)
			{	getNewUrl += "?";	}
			else
			{	getNewUrl += "&";	}
			getNewUrl += "DPL_arg" + (a + 1) + "=" + atributoValor.replace(/ /g,"_");
		}
		window.location.href = getNewUrl;
	}
	catch(err)
	{	alert(err);	}
}



function crearBuscadorCartas(){
	try{
		var divIndex = 0;
		var Buscador = new Object();
		var tablas = document.getElementsByTagName( 'table' );
		for(i=0;i<tablas.length;i++ ){
			if(hasClass(tablas[i],'buscadorcarta')){
				if(divIndex == 0){
					divIndex = 1;
					//Buscador[divIndex] = tablas[i];
					tablas[i].setAttribute('id', 'buscadorcarta1');
					var Cells = tablas[i].rows[1].getElementsByTagName( 'td' );
					if ( !mw.user.anonymous() ) {
						for(c=0; c<Cells.length; c++){
							var Cell = tablas[i].rows[1].getElementsByTagName( 'td' )[c];
							if ( !Cell )
							{	continue;	}
							divSelector = crearSelectBuscador(tablas[i].rows[0].cells[c].innerText, tablas[i].rows[1].cells[c].innerHTML);
							Cell.innerHTML = "";
							Cell.appendChild(divSelector);
						}
						var buttonRow = tablas[i].insertRow(2);
						var buttonCell = buttonRow.insertCell(0);
						buttonCell.setAttribute('colspan',5)
						buttonCell.setAttribute('align','right')
						var newButton = document.createElement('INPUT');
						newButton.type = "button";
						newButton.value = "Buscar";
						newButton.setAttribute("onclick", "realizarBusquedaCarta()");
						buttonCell.appendChild(newButton);
					}else{
						var fLength = Cells.length;
						 for(d=1; d<fLength; d++){
							tablas[i].rows[1].deleteCell(0);
						}
						Cell = tablas[i].rows[1].cells[0];
						Cell.innerText = "Para usar el buscador, debes tener una cuenta en Wikia e iniciar sesión.";
						Cell.setAttribute('colspan',5);
						Cell.setAttribute('style', 'text-align:center');
					}
				}else
				{break;}
			}
		}
	}
	catch(err)
	{  alert("Error crearBuscadorCartas: " + err);  }
}

try
{
	addOnloadHook(crearBuscadorCartas);
	//window.onload = crearBuscadorCartas;
}
catch(err)
{  alert("Error addOnloadHook: " + err);  }