/* <pre> */

/* Chat IRC */

importScript('MediaWiki:Chat.js');


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

/*****************/
/* NOMBREUSUARIO */
/*****************/

function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
  
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}

addOnloadHook(UserNameReplace);

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="regresiva">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
//
// If the date is in the format "x|January 01 2007 00:00:00 PST", then the timer is periodic with period x seconds using the given date as the starting time.
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // reduce modulo period if necessary
  if(timers[i].period > 0){
    if(diff<0) diff = timers[i].period - ((-diff)%timers[i].period); else diff = diff%timers[i].period;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' segundos';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutos ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' horas ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' días ' + left
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'regresiva');
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    var str = timers[i].firstChild.nodeValue;
    var j = str.indexOf('|');
    if(j == -1) timers[i].period = 0; else {
      timers[i].period = parseInt(str.substr(0, j));
      if(isNaN(timers[i].period) || timers[i].period < 0) timers[i].period = 0;
      str = str.substr(j + 1);
    }
    timers[i].eventdate = new Date(str);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

// Incluir Gadget-HotCat.js
// Para desactivar, agrega "window.noHotCat = true" en tu Monobook.js
if (wgAction == 'view' && (wgNamespaceNumber == 0 || wgNamespaceNumber == 6 || wgNamespaceNumber == 14)) {
	$(function() {
		if (!document.getElementById('csAddCategorySwitch') && !window.noHotCat) {
			importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js');
		}
	});
}

/* Actualizar página mediante un botón al lado de editar */
importScriptPage('MediaWiki:Common.js/Actualizar.js');

/* skin change buttons - 2/1/11 */
function CreateSkinChangeButtons() {
//Oasis buttons
$('section header div.buttons a:first-child').before('<a style="margin:0 3px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=monobook" title="Cambiar a Monobook" accesskey="b" class="wikia-button secondary" id="skinChangeButton" data-id="monobookbutton">Cambia la apariencia del Wiki a Monobook</a>')

}

/**
* SkinPropagation: Propaga el &useskin= de la URL (siempre que sea posible) por los enlaces y formularios
* Copyright (C) 2010  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 2 of the License, or
*   (at your option) any later version
*/
window.SkinPropagation = {
	skin: '',
	init: function() {
		if (window.location.href.indexOf('useskin=') == -1) return;
		var url = SkinPropagation.parseURL(window.location.href);
		if (url.query.useskin) {
			SkinPropagation.skin = (url.query.propagateskin || url.query.useskin);
		}
		if (SkinPropagation.skin != '') {
			$(document.body).bind('click.skinpropagation', SkinPropagation.clicEvent);
			$('form').bind('submit.skinpropagation', SkinPropagation.submitEvent);
		}
	},
	parseURL: function(url) {
		var ret = {base:'',qs:'',query:{},hash:''};
		var loc = url.indexOf('#');
		if (loc != -1) {
			ret.hash = url.substr(loc+1);
			url = url.substr(0,loc);
		}
		loc = url.indexOf('?');
		if (loc != -1) {
			ret.qs = url.substr(loc+1);
			url = url.substr(0,loc);
			var paras = ret.qs.split('&');
			for (var i = 0; i < paras.length; i++) {
				var p = paras[i].split('=');
				if (p.length == 2) {
					ret.query[p[0]] = p[1];
				}
			}
		}
		ret.base = url;
		return ret;
	},
	getURL: function(url) {
		var nurl = url.base + '?';
		for (var p in url.query) {
			nurl += p + '=' + url.query[p] + '&';
		}
		nurl = nurl.substr(0,nurl.length-1);
		if (url.hash != '') {
			nurl += '#'+ url.hash;
		}
		return nurl;
	},
	clicEvent: function(e) {
		if (e.target.tagName.toLowerCase() != 'a') return;
		if (e.target.href.indexOf(window.wgServer) != 0) return;
		var url = SkinPropagation.parseURL(e.target.href);
		var thisloc = SkinPropagation.parseURL(window.location.href);
		if (url.base == thisloc.base && url.qs == thisloc.qs && url.hash != '') {
			return;
		}
		if (url.query.useskin && url.query.useskin != SkinPropagation.skin) {
			url.query.propagateskin = SkinPropagation.skin;
		} else {
			url.query.useskin = SkinPropagation.skin;
		}
		e.target.href = SkinPropagation.getURL(url);
	},
	submitEvent: function(e) {
		if (this.action.indexOf(window.wgServer) != 0) return;
		if (this.method == 'post') {
			var url = SkinPropagation.parseURL(this.action);
			url.query.useskin = SkinPropagation.skin;
			this.action = SkinPropagation.getURL(url);
		} else {
			$(this).append('<input type="hidden" name="useskin" value="'+SkinPropagation.skin+'"/>');
		}
	},
	stop: function() {
		$(document.body).unbind('click.skinpropagation');
		$('form').unbind('submit.skinpropagation');
	}
};

$(SkinPropagation.init);

/* contador de visitas, de Ben 10 Wiki */

$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-size:70%'>PÁGINAS VISTAS</td><td style='text-align:right'><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=781949&counter=37' alt='Contador' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Contador</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:80%; background:transparent'>Número de visitas</td></tr><tr><td><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=781949&counter=37' alt='Contador' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});