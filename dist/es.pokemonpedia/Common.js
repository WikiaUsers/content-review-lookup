/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* A JavaScript implementation of the SHA family of hashes, as defined in FIPS
 * PUB 180-2 as well as the corresponding HMAC implementation as defined in
 * FIPS PUB 198a
 *
 * Version 1.3 Copyright Brian Turek 2008-2010
 * Distributed under the BSD License
 * See http://jssha.sourceforge.net/ for more information
 *
 * Several functions taken from Paul Johnson
 */
(function(){var charSize=8,b64pad="",hexCase=0,str2binb=function(a){var b=[],mask=(1<<charSize)-1,length=a.length*charSize,i;for(i=0;i<length;i+=charSize){b[i>>5]|=(a.charCodeAt(i/charSize)&mask)<<(32-charSize-(i%32))}return b},hex2binb=function(a){var b=[],length=a.length,i,num;for(i=0;i<length;i+=2){num=parseInt(a.substr(i,2),16);if(!isNaN(num)){b[i>>3]|=num<<(24-(4*(i%8)))}else{return"INVALID HEX STRING"}}return b},binb2hex=function(a){var b=(hexCase)?"0123456789ABCDEF":"0123456789abcdef",str="",length=a.length*4,i,srcByte;for(i=0;i<length;i+=1){srcByte=a[i>>2]>>((3-(i%4))*8);str+=b.charAt((srcByte>>4)&0xF)+b.charAt(srcByte&0xF)}return str},binb2b64=function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"+"0123456789+/",str="",length=a.length*4,i,j,triplet;for(i=0;i<length;i+=3){triplet=(((a[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((a[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((a[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(j=0;j<4;j+=1){if(i*8+j*6<=a.length*32){str+=b.charAt((triplet>>6*(3-j))&0x3F)}else{str+=b64pad}}}return str},rotl=function(x,n){return(x<<n)|(x>>>(32-n))},parity=function(x,y,z){return x^y^z},ch=function(x,y,z){return(x&y)^(~x&z)},maj=function(x,y,z){return(x&y)^(x&z)^(y&z)},safeAdd_2=function(x,y){var a=(x&0xFFFF)+(y&0xFFFF),msw=(x>>>16)+(y>>>16)+(a>>>16);return((msw&0xFFFF)<<16)|(a&0xFFFF)},safeAdd_5=function(a,b,c,d,e){var f=(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF)+(e&0xFFFF),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(e>>>16)+(f>>>16);return((msw&0xFFFF)<<16)|(f&0xFFFF)},coreSHA1=function(f,g){var W=[],a,b,c,d,e,T,i,t,appendedMessageLength,H=[0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0],K=[0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6];f[g>>5]|=0x80<<(24-(g%32));f[(((g+65)>>9)<<4)+15]=g;appendedMessageLength=f.length;for(i=0;i<appendedMessageLength;i+=16){a=H[0];b=H[1];c=H[2];d=H[3];e=H[4];for(t=0;t<80;t+=1){if(t<16){W[t]=f[t+i]}else{W[t]=rotl(W[t-3]^W[t-8]^W[t-14]^W[t-16],1)}if(t<20){T=safeAdd_5(rotl(a,5),ch(b,c,d),e,K[t],W[t])}else if(t<40){T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}else if(t<60){T=safeAdd_5(rotl(a,5),maj(b,c,d),e,K[t],W[t])}else{T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}e=d;d=c;c=rotl(b,30);b=a;a=T}H[0]=safeAdd_2(a,H[0]);H[1]=safeAdd_2(b,H[1]);H[2]=safeAdd_2(c,H[2]);H[3]=safeAdd_2(d,H[3]);H[4]=safeAdd_2(e,H[4])}return H},jsSHA=function(a,b){this.sha1=null;this.strBinLen=null;this.strToHash=null;if("HEX"===b){if(0!==(a.length%2)){return"TEXT MUST BE IN BYTE INCREMENTS"}this.strBinLen=a.length*4;this.strToHash=hex2binb(a)}else if(("ASCII"===b)||('undefined'===typeof(b))){this.strBinLen=a.length*charSize;this.strToHash=str2binb(a)}else{return"UNKNOWN TEXT INPUT TYPE"}};jsSHA.prototype={getHash:function(a){var b=null,message=this.strToHash.slice();switch(a){case"HEX":b=binb2hex;break;case"B64":b=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}if(null===this.sha1){this.sha1=coreSHA1(message,this.strBinLen)}return b(this.sha1)},getHMAC:function(a,b,c){var d,keyToUse,i,retVal,keyBinLen,keyWithIPad=[],keyWithOPad=[];switch(c){case"HEX":d=binb2hex;break;case"B64":d=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}if("HEX"===b){if(0!==(a.length%2)){return"KEY MUST BE IN BYTE INCREMENTS"}keyToUse=hex2binb(a);keyBinLen=a.length*4}else if("ASCII"===b){keyToUse=str2binb(a);keyBinLen=a.length*charSize}else{return"UNKNOWN KEY INPUT TYPE"}if(64<(keyBinLen/8)){keyToUse=coreSHA1(keyToUse,keyBinLen);keyToUse[15]&=0xFFFFFF00}else if(64>(keyBinLen/8)){keyToUse[15]&=0xFFFFFF00}for(i=0;i<=15;i+=1){keyWithIPad[i]=keyToUse[i]^0x36363636;keyWithOPad[i]=keyToUse[i]^0x5C5C5C5C}retVal=coreSHA1(keyWithIPad.concat(this.strToHash),512+this.strBinLen);retVal=coreSHA1(keyWithOPad.concat(retVal),672);return(d(retVal))}};window.jsSHA=jsSHA}());

/*
* UserWikiInfo v1.3: Una colección de enlaces útiles relacionados con el usuario que aparece en contribuciones, página de usuario y discusión, con recuento de ediciones y avatar, para Monobook
* 
* Copyright (C) 2010  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation; either version 2 of the License, or
*   (at your option) any later version
*/
var UserWikiInfo = {
	tmpl: '<div id="UserWikiInfo"><div class="useravatar"><a href="/wiki/Usuario:{u}" title="Avatar de {U}"><img src="https://images.wikia.nocookie.net/__cb20081128203240/messaging/images/thumb/1/19/Avatar.jpg/50px-Avatar.jpg" width="75" height="75" alt="Avatar" /></a>{editavatar}</div>' +
		'<span class="userlink"><a href="/wiki/Usuario:{u}" title="Págia de usuario">Usuario:{U}</a></span> &#124; <span class="talklink"><a href="/wiki/Usuario_Discusión:{u}" title="Página de discusión">Discusión</a> <a href="/index.php?title=Usuario_Discusión:{u}&amp;action=edit&amp;section=new" title="Dejar un nuevo mensaje en la página de discusión">[+]</a></span> &#124; <span class="bloglink"><a href="/wiki/Usuario_Blog:{u}" title="Blog del usuario">Blog</a></span>{email} &#124; <span class="contribslink"><a href="/wiki/Especial:Contribuciones/{u}" title="Contribuciones de usuario">Contribuciones</a></span>{group}'+
		'<div class="contribdetails"></div></div>',
	emailtmpl: ' &#124; <span class="emaillink"><a href="/wiki/Especial:MandarEmailUsuario/{u}" title="Enviar correo electrónico a usuario">Enviar correo</a></span>',
	contrtmpl: '{U} ha realizado {c} ediciones desde el {fe}<br /><span class="contenteditcount"><a href="/wiki/Especial:Editcount/{U}" title="{cu} (el {r}% de las ediciones) se ha hecho en artículos, categorías, imágenes y plantillas. Ver estadísticas avanzadas."><span class="psmax"><span class="psact pslvl{l}" style="width:{r}%;"></span></span></a></span>',
	grouptmpl: ' &#124; <span class="usergroups" title="Grupos a los que pertenece el usuario">Grupos: {g}</span>',
	datefm: '{d} de {m} de {y}',
	editavatar: '<a class="editavatar" href="/wiki/Especial:Preferencias#wkUserChooseDivText">Cambiar avatar</a>',
	months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
	groupseparator: ', ',
	groups: {
		bureaucrat: '<a href="/wiki/WikiDex:Administradores">burócrata</a>',
		sysop: '<a href="/wiki/WikiDex:Administradores">administrador</a>',
		rollback: '<a href="/wiki/WikiDex:Reversores">reversor</a>',
		asistente: '<a href="/wiki/WikiDex:Asistentes">asistente</a>'
	},
	avatarWidth: 100, // Initial width
	avatarHeight: 75, // Max height
	avatarImg: null,
	username: null,
	firstEdit: null,
	init: function() {
		var u = null, infoURL = wgServer+wgScriptPath+'/api.php?action=query&list=users|usercontribs|allusers&ususers={u}&usprop=groups|editcount|registration|emailable&ucuser={u}&uclimit=1&ucdir=newer&ucprop=timestamp&aufrom={u}&auprop=&aulimit=1&smaxage=3600&maxage=3600&format=json';
		if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Contributions') {
			var cbu = $('#user');
			if (cbu.exists() && cbu.get(0).checked) {
				u = cbu.parent().children('input[name=target]').eq(0).val();
			}
		} else if (window.wgCanonicalNamespace == 'User' || window.wgCanonicalNamespace == 'User_talk' || window.wgCanonicalNamespace == 'Usuario_Blog') {
			u = window.wgTitle;
			var sl = u.indexOf('/');
			if (sl != -1) {
				u = u.substr(0, sl);
			}
		}
		if (!u) return;
		if (u.search(new RegExp('^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$')) != -1) return; // IP
		$.getJSON(infoURL.replace(new RegExp('\\{u\\}','g'), encodeURIComponent(u.replace(new RegExp(' ','g'), '_'))), UserWikiInfo.dataRecv);
	},
	dataRecv: function(data) {
		var q = data.query;
		if (q.users.length == 0 || typeof q.users[0].missing != 'undefined') return;
		var u = q.users[0].name, editcount = (q.users[0].editcount||0), groups = q.users[0].groups, emailable = (typeof q.users[0].emailable == 'string'), firstedit = (q.usercontribs.length == 0 ? '' : q.usercontribs[0].timestamp), userid = q.allusers[0].id, grouptext = '';
		u.replace(new RegExp('\<', 'g'), '&lt;').replace(new RegExp('\>', 'g'), '&gt;').replace(new RegExp('"', 'g'), '&quot;');
		if (firstedit != '') {
			UserWikiInfo.firstEditDate = new Date(Date.UTC(firstedit.substr(0,4), parseInt(firstedit.substr(5,2),10)-1, firstedit.substr(8,2)));
		}
		if (groups && groups.length > 0) {
			var g = '';
			for (var i = 0; i < groups.length; i++) {
				if (i) {
					g += UserWikiInfo.groupseparator;
				}
				g += (UserWikiInfo.groups[groups[i]] || groups[i]);
			}
			grouptext = UserWikiInfo.grouptmpl.replace(new RegExp('\\{g\\}', 'g'), g);
		}
		$('#bodyContent').prepend(
			UserWikiInfo.tmpl.replace('{email}', (emailable ? UserWikiInfo.emailtmpl : '')).replace(
				new RegExp('\\{U\\}', 'g'), u).replace(
				new RegExp('\\{u\\}', 'g'), encodeURIComponent(u.replace(new RegExp(' ', 'g'), '_'))).replace(
				new RegExp('\\{editavatar\\}'), ((window.wgUserName && window.wgUserName == u) ? UserWikiInfo.editavatar : '')).replace(
				new RegExp('\\{group\\}'), grouptext));
		// Avatar
		var img = new Image();
		UserWikiInfo.avatarImg = img;
		img.onload = UserWikiInfo.avatarLoaded;
		var avatar = userid.toString()+'.png';
		var shaObj = new jsSHA(userid.toString(), 'ASCII');
		var hash = shaObj.getHash('HEX');
		img.alt = 'avatar';
		img.src = 'https://images.wikia.nocookie.net/common/avatars/thumb/'+hash.substr(0,1)+'/'+hash.substr(0,2)+'/'+avatar+'/'+UserWikiInfo.avatarWidth.toString()+'px-'+avatar;
		// Contribs
		UserWikiInfo.username = u;
		if (editcount > 0) {
			$.getJSON(wgServer+wgScriptPath+'/api.php?action=parse&text={{:MediaWiki:UserWikiInfoContribs}}&title=User:'+encodeURIComponent(u)+'&prop=text&smaxage=3600&maxage=3600&format=json', UserWikiInfo.contribsData);
		}
	},
	avatarLoaded: function() {
		var img = UserWikiInfo.avatarImg;
		var h = img.height, w = img.width;
		if (h < 1) return;
		if (h > UserWikiInfo.avatarHeight) {
			img.style.height = UserWikiInfo.avatarHeight+'px';
		}
		$('#UserWikiInfo').children('.useravatar').eq(0).find('img').eq(0).replaceWith(img);
	},
	contribsData: function(data) {
		var text = data.parse.text['*'], c = 0, cu = 0, acontr = [], rate = 0, lvl = 0, d = UserWikiInfo.firstEditDate, fe = '';
		if (text.indexOf('class="new"') != -1 || text.indexOf('<p>') == -1) return; // Template does not exist/sanity check
		text = text.substring(3, text.indexOf('</p>')).replace(new RegExp('[\.,]', 'g'), '');
		acontr = text.split('|');
		for (var i = 0; i < acontr.length; i++) {
			var n = parseInt(acontr[i], 10);
			if (isNaN(n)) return;
			if (i == 0) {
				c = n;
			} else {
				cu += n;
			}
		}
		if (c == 0) return;
		rate = parseInt((cu*10000/c), 10)/100;
		lvl = parseInt((cu/c*4), 10);
		fe = UserWikiInfo.datefm.replace('{d}', d.getDate()).replace('{m}', UserWikiInfo.months[d.getMonth()]).replace('{y}', d.getFullYear());
		$('#UserWikiInfo').children('.contribdetails').eq(0).append(
			UserWikiInfo.contrtmpl.replace(new RegExp('\\{U\\}', 'g'), UserWikiInfo.username).replace(
				new RegExp('\\{c\\}', 'g'), c).replace(
				new RegExp('\\{cu\\}', 'g'), cu).replace(
				new RegExp('\\{l\\}', 'g'), lvl).replace(
				new RegExp('\\{r\\}', 'g'), rate).replace(
				new RegExp('\\{fe\\}', 'g'), fe));
	}
};

$(UserWikiInfo.init);
// </pre>

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
if (!window.$G){
	window.$G = $UT.get;
}

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
// Cuantas plantillas plegables se muestran desplegadas, como máximo. Si se alcanza el límite se pliegan todas.
var MaxDesplegadas = 2;

$(function() {
	var plegables = [],
		nDesplegadas = 0,
		cnPlegables = [],
		tp,
		bc = $UT.get('bodyContent');

	if ( window.PlantillaPlegable && !window.disablePlantillaPlegable ) {
		cnPlegables = $UT.getElementsByClassName('plegable', 'table', bc);
		for (var i=0; i < cnPlegables.length; i++) {
			var t = cnPlegables[i];
			if ($UT.hasClass(t, 'plegable-plegada')) {
				tp = new PlantillaPlegable(t, true);
			} else {
				tp = new PlantillaPlegable(t);
				if (! $UT.hasClass(t, 'plegable-desplegada')){
					plegables[plegables.length] = tp;
				}
				nDesplegadas++;
			}
		}
		if (MaxDesplegadas != -1 && nDesplegadas > MaxDesplegadas) {
			for (var i=0; i < plegables.length; i++) {
				plegables[i].cambiarEstado(true);
			}
		}
	}
});

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