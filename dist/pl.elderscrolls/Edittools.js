var postloadFunctionData = {
	'tablemanager': [],
	'charinsert': {
		"MediaWiki": [ '\x7E\x7E\x7E\x7E', ['\x7B{','}}'], ['[[',']]'], '\x7B{PAGENAME}}', '\x7B{SITENAME}}' ],
		"HTML": [ ['<span class="plainlinks">','</span>'], ['<blockquote>','</blockquote>'], ['<includeonly>','</includeonly>'], ['<noinclude>','</noinclude>'], ['<nowiki>','</nowiki>'], ['<code>','</code>'], ['<ref>','</ref>'], '<references />' ]
	}
};
 
function loadEditJS(){
	if (mw.config.get('wgAction', '') == 'edit' || mw.config.get('wgAction', '') == 'submit' ||
		mw.config.get('wgCanonicalSpecialPageName', '') == 'Upload' ||
		mw.config.get('wgCanonicalSpecialPageName', '') == 'MultipleUpload') {

		// Versión comprimida. Véase [[MediaWiki:Common.js/Clases/PlantillaPlegable.js]] <pre>
		/**
		* CharInsert: Caracteres y expresiones que aparecen debajo de la caja de edición para insertar en el texto. 
		* El siguiente módulo genera regiones de texto que se pueden clickear para insertar caracteres extraños no presentes en el teclado, o conjuntos de texto útiles. Extensible por el usuario.
		* Detalles sobre su funcionamiento en [[w:User:Ciencia Al Poder/CharInsert]].
		* Copyright (C) 2007-2009  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
		* 
		* This program is free software; you can redistribute it and/or modify
		*   it under the terms of the GNU General Public License as published by
		*   the Free Software Foundation; either version 2 of the License, or
		*   (at your option) any later version
		*/
		CharInsert=function(a,b){this.bindId=a;this.groups=b||{};this.actionPanel=null;this.init()};CharInsert.prototype={version:'2.0',init:function(){this.actionPanel=$UT.get(this.bindId);if(!this.actionPanel){return}var b=$UT.create('select',{id:'chargroup-select'});var c=this.actionPanel.getElementsByTagName('div');for(var i=0;i<c.length;i++){var p=c[i];if($UT.hasClass(p,'chargroup')){var d=$UT.create('option',{value:p.title},[p.title]);d.groupRef=p;b.appendChild(d);p.title='';/*@cc_on var f=p.firstChild;if(f){do{if(f.nodeType==1&&f.tagName.toLowerCase()=='span'){var g=f.firstChild;if(!g){continue}var a=$UT.create('a',{href:'#'});do{var h=g;g=g.nextSibling;a.appendChild(h)}while(g);f.appendChild(a)}}while(f=f.nextSibling)}@*/}}if(this.groups!==null){for(grupo in this.groups){var d=$UT.create('option',{value:grupo},[grupo]);d.groupRef=null;d.groupArray=this.groups[grupo];b.appendChild(d)}}if(b.options.length>1){this.actionPanel.insertBefore(b,this.actionPanel.firstChild);$UT.addHandler(b,'change',function(a){return function(e){a.eSelectChanged(e)}}(this));var j=b.options[0].value,cookieVal=$UT.cookie('chargroup');if(cookieVal!==null){j=cookieVal}b.value=j;this.selectChargroup(b.options[b.selectedIndex])}else{delete b}$UT.addHandler(this.actionPanel,'click',function(a){return function(e){a.specialCharClick(e)}}(this))},eSelectChanged:function(e){var a=$UT.getTarget(e);this.selectChargroup(a.options[a.selectedIndex]);$UT.cookie('chargroup',a.options[a.selectedIndex].value)},selectChargroup:function(a){var b=this.actionPanel.getElementsByTagName('div');for(var i=0;i<b.length;i++){var p=b[i];if($UT.hasClass(p,'chargroup')){if((p.isSameNode&&p.isSameNode(a.groupRef))||p==a.groupRef){p.style.display='inline'}else{p.style.display='none'}}}if(!a.groupRef&&a.groupArray){var p=this.addGroup(a.groupArray);a.groupRef=p;p.style.display='inline'}},addGroup:function(a){var b=$UT.create('div',{'class':'chargroup'}),car=null;for(var i=0;i<a.length;i++){/*@cc_on if(true){car=$UT.create('a',{href:'#'})}else{@*/car=$UT.create('span');/*@cc_on}@*/if(typeof a[i]=='string'){$UT.makeChildren([a[i]],car)}else if(a[i]instanceof Array&&a[i].length==2){$UT.makeChildren([$UT.create('span',[a[i][0]]),$UT.create('span',[a[i][1]])],car)}/*@cc_on if(true){b.appendChild($UT.create('span',[car]))}else{@*/b.appendChild(car);/*@cc_on}@*/$UT.makeChildren([' '],b)}this.actionPanel.appendChild(b);return b},specialCharClick:function(e){var a=$UT.getTarget(e);/*@cc_on if(a.parentNode.tagName.toLowerCase()=='a'){a=a.parentNode}if(a.tagName.toLowerCase()=='a'){a=a.parentNode;e.returnValue=false}@*/if(a.nodeType!=1||a.tagName.toLowerCase()!='span'){return}if(!$UT.hasClass(a.parentNode,'chargroup')){if($UT.hasClass(a.parentNode.parentNode,'chargroup')){a=a.parentNode}else{return}}var b=a.getElementsByTagName('span');if(b.length<2){insertTags($UT.getInnerText(a),'','')}else{insertTags($UT.getInnerText(b[0]),$UT.getInnerText(b[1]),'')}}};
		/**** END código CharInsert ****/

		if (window.location.toString().indexOf('undo=') == -1 && window.location.toString().indexOf('undoafter=') == -1) {
			if (mw.config.get('wgNamespaceNumber', 0) == 0) {
				mw.loader.using(['jquery.ui.dialog', 'mediawiki.api'], function() {
					if (typeof(window.fixBugMixedUIversionsDialog)=='function') { fixBugMixedUIversionsDialog(); }
					importScript('u:es.pokemon:MediaWiki:Common.js/Clases/AvisoCuriosidades.js');
				});
			}
			if (mw.config.get('wgNamespaceNumber', 0) == 2 && window.location.toString().indexOf('action=edit') != -1) {
				mw.loader.using(['jquery.ui.dialog', 'mediawiki.api'], function() {
					if (typeof(window.fixBugMixedUIversionsDialog)=='function') { fixBugMixedUIversionsDialog(); }
					importScript('u:es.pokemon:MediaWiki:Common.js/Clases/DisableFirstSubmit.js');
				});
			}
		}
	}
}
 
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(loadEditJS);

// Esto se pondría en el load, pero asumiendo que este archivo se carga después del load, se llama directamente.
if (window.postloadFunctionData && postloadFunctionData['charinsert']) {
	new CharInsert('charinsert-block', postloadFunctionData['charinsert']);
} else {
	new CharInsert('charinsert-block');
}
// </pre>