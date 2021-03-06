// <pre>
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
* UserWikiInfo v1.3b: Una colección de enlaces útiles relacionados con el usuario que aparece en contribuciones, página de usuario y discusión, con recuento de ediciones y avatar, para Monobook
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
		'<span class="userlink"><a href="/wiki/Usuario:{u}" title="Página de usuario">Usuario:{U}</a></span> &#124; <span class="talklink"><a href="/wiki/Usuario_Discusión:{u}" title="Página de discusión">Discusión</a> <a href="/index.php?title=Usuario_Discusión:{u}&amp;action=edit&amp;section=new" title="Dejar un nuevo mensaje en la página de discusión">[+]</a></span> &#124; <span class="bloglink"><a href="/wiki/Usuario_Blog:{u}" title="Blog del usuario">Blog</a></span>{email} &#124; <span class="contribslink"><a href="/wiki/Especial:Contribuciones/{u}" title="Contribuciones de usuario">Contribuciones</a></span>{group}'+
		'<div class="contribdetails"></div></div>',
	emailtmpl: ' &#124; <span class="emaillink"><a href="/wiki/Especial:MandarEmailUsuario/{u}" title="Enviar correo electrónico a usuario">Enviar correo</a></span>',
	contrtmpl: '{U} ha realizado {c} ediciones desde el {fe}<br /><span class="contenteditcount"><a href="/wiki/Especial:Editcount/{U}" title="{cu} ediciones (el {r}% del total) se han hecho en artículos, categorías, imágenes y plantillas. Ver estadísticas avanzadas."><span class="psmax"><span class="psact pslvl{l}" style="width:{r}%;"></span></span></a></span>',
	grouptmpl: ' &#124; <span class="usergroups" title="Grupos a los que pertenece el usuario">Grupos: {g}</span>',
	datefm: '{d} de {m} de {y}',
	editavatar: '<a class="editavatar" href="/wiki/Especial:Preferencias#wkUserChooseDivText">Cambiar avatar</a>',
	months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
	groupseparator: ', ',
	groups: {
		bureaucrat: '<a href="/wiki/World Wrestling Enciclopedia:Administradores">burócrata</a>',
		sysop: '<a href="/wiki/World Wrestling Enciclopedia:Administradores">administrador</a>',
		rollback: '<a href="/wiki/World Wrestling Enciclopedia:Reversores">reversor</a>'
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